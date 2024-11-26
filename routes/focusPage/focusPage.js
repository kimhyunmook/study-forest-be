import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   const study = await prisma.study.findUnique({
//     where: {
//       id: id,
//     },
//   });
//   res.status(200).send(study);
// });

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { point } = req.body;
  const update = await prisma.study.update({
    where: {
      id: id,
    },
    data: {
      point: point,
    },
  });
  res.status(202).send(update);
});

// 특정 스터디 조회 (GET /study/:id)
router.get("/study/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const study = await prisma.study.findUnique({
      where: { id: id },
      select: {
        nickName: true,
        studyName: true,
        point: true,
      },
    });

    if (!study) {
      return res.status(404).json({ error: "스터디를 찾을 수 없습니다." });
    }

    res.json({ data: study });
  } catch (error) {
    console.error("스터디 데이터 가져오기 실패:", error);
    res.status(500).json({ error: "서버 에러가 발생했습니다." });
  }
});

export default router;
