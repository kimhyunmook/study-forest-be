import studyMock from "../mock/study.json" assert { type: "json" };
import emojiMock from "../mock/emoji.json" assert { type: "json" };
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function studySeed() {
  try {
    await prisma.study.deleteMany();
    const data = await prisma.study.createMany({
      data: studyMock,
    });
    console.log("데이터 삽입 성공");
  } catch (err) {
    console.log("데이터 삽입 실패 // ", err);
  }
}

async function emojis() {
  try {
    await prisma.emojis.deleteMany();
    const data = await prisma.emojis.createMany({
      data: emojiMock,
    });
  } catch (err) {
    console.log("데이터 삽입 실패 // ", err);
  }
}
emojis();
studySeed();
