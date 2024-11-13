import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

//조회

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let result = {
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
// router.get("/", service.getMain);
// router.get("/about", service.getMianAbout);

export default router;
