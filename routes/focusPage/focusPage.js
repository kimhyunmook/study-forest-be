import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const study = await prisma.study.findUnique({
    where: {
      id: id,
    },
  });
  res.status(200).send(study);
});
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

export default router;
