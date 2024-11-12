import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

//조회

router.get("/", async (req, res) => {
  const { id } = req.params;
  let result = {
    msg: "",
  };
  try {
    const data = await prisma.study.findMany({
      where: {
        id,
      },
    });
    result.data = data;
  } catch (error) {
    console.error("errorMsg : ", error);
    result.msg = error;
  }
  res.status(201).send(result);
});
// router.get("/", service.getMain);
// router.get("/about", service.getMianAbout);

export default router;
