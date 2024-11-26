import express from "express";
import { PrismaClient } from "@prisma/client";
import { check } from "prisma";
import { parse } from "dotenv";

const prisma = new PrismaClient();
const router = express.Router();

//오늘의 습관 조회
router.get('/habits', async (req, res) => {
  try {
    const habits = await prisma.todayHabit.findMany({
      where: { isActive: true },
      include: {
        checks: {
          where: { checkDate: new Date().toISOString().slice(0, 10) },
        },
      },
    });
    res.json(habits);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 습관 추가
router.put('/habits/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedHabit = await prisma.todayHabit.update({
      where: { id },
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
    await prisma.todayHabit.update({
      where: { id },
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
    const today = new Date().toISOString().slice(0, 10); // 오늘 날짜
    const existingCheck = await prisma.todayHabitCheck.findFirst({
      where: {
        habitId: id,
        checkDate: today,
      },
    });

    if (existingCheck) {
      //체크상태
      const updatedCheck = await prisma.todayHabitCheck.update({
        where: { id: existingCheck.id },
        data: { isChecked: !existingCheck.isChecked },
      });
      res.json(updatedCheck);
    } else {
      // 새로운체크
      const newCheck = await prisma.todayHabitCheck.create({
        data: {
          habitId: id,
          checkDate: today,
          isChecked: true,
        },
      });
      res.status(201).json(newCheck);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


export default router;