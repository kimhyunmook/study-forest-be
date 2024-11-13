import studyMock from "../mock/study.json" assert { type: "json" };
import emojiMock from "../mock/emoji.json" assert { type: "json" };
import habitMock from "../mock/habit.json" assert { type: "json" };
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function studySeed() {
  try {
    await prisma.study.deleteMany();
    const data = await prisma.study.createMany({
      data: studyMock,
    });
    console.log("스터디 데이터 삽입 성공");
  } catch (err) {
    console.log("스터디 데이터 삽입 실패 // ", err);
  }
}

async function emojis() {
  try {
    await prisma.emojis.deleteMany();
    const data = await prisma.emojis.createMany({
      data: emojiMock,
    });
    console.log("이모지 데이터 삽입 성공");
  } catch (err) {
    console.log("이모지 데이터 삽입 실패 // ", err);
  }
}

async function habit() {
  try {
    await prisma.habit.deleteMany();
    const data = await prisma.habit.createMany({
      data: habitMock,
    });
    console.log("습관 데이터 삽입 성공");
  } catch (err) {
    console.log("습관 데이터 삽입 실패 // ", err);
  }
}

habit();
// emojis();
// studySeed();
