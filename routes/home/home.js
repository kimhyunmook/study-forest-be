import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/main", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 6;
  const orderBy = req.query.orderBy || "desc";
  const keyword = req.query.keyword || "";

  const searchQuery = keyword
    ? {
        OR: [
          { studyName: { contains: keyword, mode: "insensitive" } },
          { introduce: { contains: keyword, mode: "insensitive" } },
        ],
      }
    : {};
  const sortOption =
    orderBy === "desc"
      ? { createdAt: "desc" }
      : orderBy === "asc"
        ? { createdAt: "asc" }
        : orderBy === "manyPoint"
          ? { point: "desc" }
          : { point: "asc" };

  const offset = (page - 1) * pageSize;

    const data = await prisma.study.findMany({
        where: searchQuery,
        orderBy: sortOption,
        skip: offset,  //offset
        take: pageSize,   // limit
        include: {
            emojis: true,
            habit: true
        },
    });
    res.status(201).send({
        msg: "success",
        data,
    });
});

router.post("/create", async (req, res) => {
    const study = await prisma.study.create({
        data: req.body,
    });
    res.status(201).send(study);
})

router.post("/emojis", async (req, res) => {
    const { id, emojiIcon, value, studyId } = req.body;

    const existingEmoji = await prisma.emojis.findFirst({
        where: {
            studyId,
            emojiIcon,
        },
    });
    if (existingEmoji) {
        const updatedEmoji = await prisma.emojis.update({
            where: { id: existingEmoji.id },
            data: { value: existingEmoji.value + 1 },
        });

        return res.status(200).send(updatedEmoji);
    }
});

export default router;
