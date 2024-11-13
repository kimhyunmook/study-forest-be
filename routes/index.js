import express from "express";
import studyDetail from "./studyDetail/router.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();
router.use("/studydetail", studyDetail);

//home 용 임시
router.get("/home", async (req, res) => {
  let status = 0;
  let result = {};
  try {
    status = 201;
  } catch (err) {
    console.error(err);
    status = 400;
  }
  res.status(status).send(result);
});

export default router;
