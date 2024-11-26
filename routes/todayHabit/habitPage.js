import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// 오늘의 습관 조회
router.get("/habits", async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10); // 오늘 날짜
    const habits = await prisma.habit.findMany({
      where: { isActive: true },
      include: {
        checks: {
          where: { checkDate: today },
        },
      },
    });
    res.json(habits);
  } catch (error) {
    console.error("오늘의 습관 조회 실패:", error);
    res.status(500).json({ error: error.message });
  }
});

// 습관 추가 (POST /habits)
router.post("/habits", async (req, res) => {
  const { name } = req.body;
  try {
    const newHabit = await prisma.habit.create({
      data: {
        name,
        isActive: true,
      },
    });
    res.status(201).json(newHabit);
  } catch (error) {
    console.error("습관 추가 실패:", error);
    res.status(400).json({ error: error.message });
  }
});

// 습관 수정 (PUT /habits/:id)
router.put("/habits/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedHabit = await prisma.todayHabit.update({
      where: { id },
      data: { name },
    });
    res.json(updatedHabit);
  } catch (error) {
    console.error("습관 수정 실패:", error);
    res.status(400).json({ error: error.message });
  }
});

// 습관 삭제 (DELETE /habits/:id)
router.delete("/habits/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.todayHabit.update({
      where: { id },
      data: { isActive: false },
    });
    res.status(204).send();
  } catch (error) {
    console.error("습관 삭제 실패:", error);
    res.status(400).json({ error: error.message });
  }
});

// 오늘의 습관 박스 체크/해제 (POST /habit/:id/check)
router.post("/habit/:id/check", async (req, res) => {
  const { id } = req.params;
  try {
    const today = new Date().toISOString().slice(0, 10); // 오늘 날짜
    const existingCheck = await prisma.habitCheck.findFirst({
      where: {
        habitId: id,
        checkDate: today,
      },
    });

    if (existingCheck) {
      // 체크 상태 토글
      const updatedCheck = await prisma.habitCheck.update({
        where: { id: existingCheck.id },
        data: { isChecked: !existingCheck.isChecked },
      });
      res.json(updatedCheck);
    } else {
      // 새로운 체크 생성
      const newCheck = await prisma.habitCheck.create({
        data: {
          habitId: id,
          checkDate: today,
          isChecked: true,
        },
      });
      res.status(201).json(newCheck);
    }
  } catch (error) {
    console.error("체크/해제 실패:", error);
    res.status(500).json({ error: error.message });
  }
});

// 특정 스터디 조회 (GET /study/:id)
router.get("/study/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const study = await prisma.study.findUnique({
      where: { id: parseInt(id) }, // ID가 숫자인 경우
      select: {
        nickName: true,
        studyName: true,
      },
    });

    if (!study) {
      return res.status(404).json({ error: "스터디를 찾을 수 없습니다." });
    }

    res.json({ data: study });
  } catch (error) {
    console.error("스터디 데이터 가져오기 실패:", error);
    res.status(500).json({ error: "서버 에러가 발생했습니다." });
  }
});

export default router;
