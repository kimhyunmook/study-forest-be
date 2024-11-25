import express from "express";
import { PrismaClient } from "@prisma/client";
import auth from "../../middleware/auth.js";
import cookieParser from "cookie-parser";
const router = express.Router();
const prisma = new PrismaClient();

router.use(auth);
router.use(cookieParser());

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

// pw 로 인증
router.post("/auth", auth, async (req, res) => {
  const result = {
    auth: false,
    data: {},
  };
  try {
    result.data = res.locals.study;
    result.auth = true;
    res.status(200).send(result);
  } catch (error) {
    console.error("errorMsg : ", error);
    result.error = error;
    res.send(result);
  }
});

// 수정하기
router.patch("/edit", auth, async (req, res) => {
  const body = req.body;
  const result = {
    data: {},
  };
  try {
    const data = await prisma.study.update({
      data: {
        body,
      },
      where: {
        id: body.id,
      },
    });
    result.data = data;
    res.status(200).send(result);
  } catch (error) {
    console.error("errorMsg : ", error);
    result.error = error;
    res.status(400).send(result);
  }
});

// 이모지 추가하기
router.post("/emoji/add", async (req, res) => {
  const body = req.body;
  const result = {
    data: {},
  };
  try {
    const data = await prisma.emojis.create({
      data: body,
    });
    result.data = data;
    res.status(201).send(result);
  } catch (error) {
    console.error("errorMsg : ", error);
    result.error = error;
    res.status(400).send(result);
  }
});

export default router;