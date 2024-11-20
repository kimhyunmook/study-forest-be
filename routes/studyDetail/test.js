import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

// 모든조회
router.get("/g", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 6;
  const orderBy = req.query.orderBy || "desc";
  const keyword = req.query.keyword || "";
  const offset = (page - 1) * pageSize;
  try {
    const data = await prisma.study.findMany({
      skip: offset,
      take: pageSize,
      orderBy: {
        createdAt: orderBy,
      },
      include: {
        emojis: true,
      },
    });
    res.status(201).send({
      msg: "success",
      data,
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/g", async (req, res) => {
  try {
    const { id } = req.body;
    const data = await Promise.all(
      id.map(async (v) => {
        return await prisma.study.findUnique({
          where: { id: v },
          include: { emojis: true },
        });
      })
    );

    res.status(201).send({
      msg: "success",
      data: data.slice(0, 3),
    });
  } catch (err) {
    console.error(err);
  }
});
export default router;
