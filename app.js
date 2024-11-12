import * as dotenv from "dotenv";
import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api", router);
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`${port}서버시작`));
