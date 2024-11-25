import express from "express";
import { PrismaClient } from "@prisma/client";
import auth from "../../middleware/auth.js";
import cookieParser from "cookie-parser";
const router = express.Router();
const prisma = new PrismaClient();

// router.use(auth);
router.use(cookieParser());

//조회
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
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

// 수정하기
// router.patch("/edit", auth, async (req, res) => {
//   const body = req.body;
//   const result = {
//     data: {},
//   };
//   try {
//     const data = await prisma.study.update({
//       data: {
//         body,
//       },
//       where: {
//         id: body.id,
//       },
//     });
//     result.data = data;
//     res.status(200).send(result);
//   } catch (error) {
//     console.error("errorMsg : ", error);
//     result.error = error;
//     res.status(400).send(result);
//   }
// });

// 이모지 추가하기
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

router.patch("/habits/status", async (req, res) => {
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

export default router;