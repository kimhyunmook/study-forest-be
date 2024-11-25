import express from "express";
import { PrismaClient } from "@prisma/client";
import { check } from "prisma";
import { parse } from "dotenv";

const prisma = new PrismaClient();
const router = express.Router();

//오늘의 습관 조회
router.get('/habits', async (req, res) => {
  try {
    const habits = await prisma.habit.findMany({
      where: { isActive: true },
      include: {
        checks: {
          where: { checkDate: new Date().toISOString().slice(0, 10) },
        },
      },
    });
    res, json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 습관 추가
router.put('/habits/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedHabit = await prisma.habit.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json(updatedHabit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//습관 삭제
router.delete('/habits/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.habit.update({
      where: { id: parseInt(id) },
      data: { isActive: false },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//오늘의 습관 박스 체크/해제
router.post('/habit/:id/check', async (req, res) => {
  const { id } = req.params;
  try {
    const today = new Date().toDateString().slice(0, 10); // 오늘 날짜
    const existingCheck = await prisma.habitCheck.findFirst({
      where: {
        habitId: parseInt(id),
        checkDate: today,
      },
    });

    if (existingCheck) {
      //체크상태
      const updatedCheck = await prisma.habitCheck.update({
        where: { id: existingCheck.id },
        data: { isChecked: !existingCheck.isChecked },
      });
      res.json(updatedCheck);
    } else {
      // 새로운체크
      const newCheck = await prisma.habitCheck.create({
        data: {
          habitId: parseInt(id),
          checkDate: today,
          isChecked: true,
        },
      });
      res.status(201).json(newCheck);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/study/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const study = await prisma.study.findUnique({
      where: { id },
      select: {
        nickName: true, // nickName만 가져옴
      },
    });

    if (!study) {
      return res.status(404).json({ error: "스터디를 찾을 수 없습니다." });
    }

    res.json({ data: study });
  } catch (error) {
    console.error("스터디 닉네임 가져오기 실패:", error);
    res.status(500).json({ error: "서버 에러가 발생했습니다." });
  }
});


export default router;