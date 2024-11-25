import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/main", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 6;
  const orderBy = req.query.orderBy || "desc";
  const keyword = req.query.keyword || "";

  const searchQuery = keyword
    ? {
        OR: [
          { studyName: { contains: keyword, mode: "insensitive" } },
          { introduce: { contains: keyword, mode: "insensitive" } },
        ],
      }
    : {};
  const sortOption =
    orderBy === "desc"
      ? { createdAt: "desc" }
      : orderBy === "asc"
        ? { createdAt: "asc" }
        : orderBy === "manyPoint"
          ? { point: "desc" }
          : { point: "asc" };

  const offset = (page - 1) * pageSize;

  const data = await prisma.study.findMany({
    where: searchQuery,
    orderBy: sortOption,
    skip: offset, //offset
    take: pageSize, // limit
    include: {
      emojis: true,
      habit: true,
    },
  });
  res.status(201).send({
    msg: "success",
    data,
  });
});

router.post("/create", async (req, res) => {
  const study = await prisma.study.create({
    data: req.body,
  });
  res.status(201).send(study);
});

router.post("/emojis", async (req, res) => {
  const { id } = req.body;

  const updatedEmoji = await prisma.emojis.update({
    where: { id },
    data: {
      value: {
        increment: 1,
      },
    },
    include: {
      study: true,
    },
  });

  res.status(200).send({ msg: "success" });
});

router.get("/study/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const study = await prisma.study.findUnique({
      where: { id },
      include: {
        emojis: true,
        habit: true,
      },
    });

    if (!study) {
      return res.status(404).json({ msg: "Study not found" });
    }

    res.status(200).json({
      msg: "success",
      data: study,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.patch("/habit/:id", async (req, res) => {
  const { id } = req.params;
  const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
    req.body;

  try {
    const habit = await Habit.findByPk(id);
    if (!habit) {
      return res.status(404).json({ message: "습관을 찾을 수 없습니다." });
    }

    await habit.update({
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    });

    res.status(200).json({ message: "습관 상태가 업데이트되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.patch("/habits/:habitItemId/status", async (req, res) => {
  const { habitItemId, dayKey, status } = req.body;

  try {
    const updatedHabit = await prisma.habit.update({
      where: { id: habitItemId },
      data: {
        [dayKey]: status, // dayKey에 해당하는 필드를 새 상태로 업데이트
      },
    });

    res.status(200).send(updatedHabit);
  } catch (error) {
    res.status(500).send({ error: "습관 상태 업데이트 실패" });
  }
});

router.post("/emoji", async (req, res) => {
  const { emojiIcon, studyId } = req.body;

  try {
    const existingEmoji = await prisma.emojis.findFirst({
      where: {
        emojiIcon: emojiIcon, // 전달받은 emojiIcon 값
        studyId: studyId, // 전달받은 studyId 값
      },
    });

    if (existingEmoji) {
      return res.status(400).json({ error: "이미 같은 이모지가 존재합니다." });
    }

    const newEmoji = await prisma.emojis.create({
      data: {
        emojiIcon, // 전달받은 emojiIcon 값
        value: 1, // 기본값 1로 설정
        study: {
          connect: { id: studyId }, // studyId로 Study와 연결
        },
      },
    });

    res.status(201).json(newEmoji);
  } catch (error) {
    console.error("이모지 생성 중 오류 발생:", error);
    res.status(500).json({ error: "이모지 생성 중 오류 발생" });
  }
});

router.delete("/study/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.study.delete({
      where: { id },
    });
    return res.status(200).json({
      success: true,
      message: "스터디가 성공적으로 삭제되었습니다.",
    });
  } catch (error) {
    console.error("스터디 삭제 중 오류 발생:", error);

    return res.status(500).json({
      success: false,
      message: "스터디 삭제에 실패했습니다.",
    });
  }
});

router.patch("/habitUpdate", async (req, res) => {
  const { habitId, dayKey, newValue } = req.body;

  try {
    const habit1 = await prisma.habit.findUnique({
      where: { id: habitId },
    });

    if (!habit1) {
      return res.status(404).json({ message: "Habit not found" });
    }
    await prisma.habit.update({
      where: {
        id: habitId,
      },
      data: {
        [dayKey]: newValue,
      },
    });

    return res.status(200).json({ message: "Habit updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버 오류" });
  }
});


router.get("/study/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const study = await prisma.study.findUnique({
            where: { id },
            include: {
                emojis: true,
                habit: true,
            },
        });

        if (!study) {
            return res.status(404).json({ msg: "Study not found" });
        }

        res.status(200).json({
            msg: "success",
            data: study,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

router.patch('/habit/:id', async (req, res) => {
    const { id } = req.params;
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

    try {
        const habit = await Habit.findByPk(id);
        if (!habit) {
            return res.status(404).json({ message: '습관을 찾을 수 없습니다.' });
        }

        await habit.update({
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
        });

        res.status(200).json({ message: '습관 상태가 업데이트되었습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

router.patch('/habits/:habitItemId/status', async (req, res) => {
    const { habitItemId, dayKey, status } = req.body;

    try {
        const updatedHabit = await prisma.habit.update({
            where: { id: habitItemId },
            data: {
                [dayKey]: status,  // dayKey에 해당하는 필드를 새 상태로 업데이트
            },
        });

        res.status(200).send(updatedHabit);
    } catch (error) {
        res.status(500).send({ error: '습관 상태 업데이트 실패' });
    }
});

router.post('/emoji', async (req, res) => {
    const { emojiIcon, studyId } = req.body;

    try {
        const existingEmoji = await prisma.emojis.findFirst({
            where: {
                emojiIcon: emojiIcon,  // 전달받은 emojiIcon 값
                studyId: studyId,      // 전달받은 studyId 값
            },
        });

        if (existingEmoji) {
            return res.status(400).json({ error: "이미 같은 이모지가 존재합니다." });
        }

        const newEmoji = await prisma.emojis.create({
            data: {
                emojiIcon,  // 전달받은 emojiIcon 값
                value: 1,    // 기본값 1로 설정
                study: {
                    connect: { id: studyId }, // studyId로 Study와 연결
                },
            },
        });

        res.status(201).json(newEmoji);
    } catch (error) {
        console.error("이모지 생성 중 오류 발생:", error);
        res.status(500).json({ error: "이모지 생성 중 오류 발생" });
    }
});

router.delete('/study/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.study.delete({
            where: { id },
        });
        return res.status(200).json({
            success: true,
            message: '스터디가 성공적으로 삭제되었습니다.',
        });
    } catch (error) {
        console.error('스터디 삭제 중 오류 발생:', error);

        return res.status(500).json({
            success: false,
            message: '스터디 삭제에 실패했습니다.',
        });
    }
});

export default router;
