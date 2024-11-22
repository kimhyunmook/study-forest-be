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

export default router;
