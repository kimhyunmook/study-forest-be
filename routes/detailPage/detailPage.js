import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const study = await prisma.study.create({
      data: req.body,
    });
    res.status(201).send(study);
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedStudy = await prisma.study.update({
    data: req.body,
    where: {
      id: id,
    },
  });
  res.status(200).send(updatedStudy);
});

export default router;
