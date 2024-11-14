import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

//조회

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = {
    msg: "조회 성공",
  };
  try {
    const data = await prisma.study.findUnique({
      where: {
        id,
      },
      include: {
        emojis: true,
        habit: true,
      },
    });
    result.data = data;
    res.status(201).send(result);
  } catch (error) {
    console.error("errorMsg : ", error);
  }
});

router.post("/auth", async (req, res) => {
  const { id, pw } = req.body;
  const result = {
    auth: false,
  };
  try {
    const study = await prisma.study.findUnique({
      where: {
        id,
      },
      include: {
        emojis: true,
        habit: true,
      },
    });
    const studyPw = study.password;
    result.data = study;
    result.auth = true;
    res.status(201).send(result);
  } catch (error) {
    console.error("errorMsg : ", error);
    result.error = error;
    res.send(result);
  }
});

export default router;
