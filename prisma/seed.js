import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";

const studyMock = JSON.parse(
  await readFile(new URL("../mock/study.json", import.meta.url))
);
const emojiMock = JSON.parse(
  await readFile(new URL("../mock/emoji.json", import.meta.url))
);
const habitMock = JSON.parse(
  await readFile(new URL("../mock/habit.json", import.meta.url))
);

const prisma = new PrismaClient();
/// studyId 넣어주기
async function studyIdSearch(type) {
  try {
    const studyId = await prisma.study.findMany({
      select: {
        id: true,
      },
    });
    let insertData = [];

    [...type].map((e, i) => {
      const ran = Math.floor(studyId.length * Math.random());
      insertData.push({
        ...e,
        studyId: studyId[ran].id,
      });
    });
    return insertData;
  } catch (error) {
    console.log("스터디 아이디 찾기 실패 // ", error);
  }
}
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
    const data = await studyIdSearch(emojiMock);
    await prisma.emojis.deleteMany();
    await prisma.emojis.createMany({
      data,
    });
    console.log("이모지 데이터 삽입 성공");
  } catch (err) {
    console.log("이모지 데이터 삽입 실패 // ", err);
  }
}

async function habit() {
  try {
    const data = await studyIdSearch(habitMock);
    await prisma.habit.deleteMany();
    await prisma.habit.createMany({
      data,
    });
    console.log("습관 데이터 삽입 성공");
  } catch (err) {
    console.log("습관 데이터 삽입 실패 // ", err);
  }
}

// studySeed();
// habit();
// emojis();
