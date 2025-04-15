import * as dotenv from "dotenv";
import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
app.use(cors());
app.use(
  cors({
    origin: "https://study-forest.netlify.app",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

// const prisma = new PrismaClient();

// /** 1분 마다 한 시간지난 인증키 지워버리는 코드 */
// cron.schedule("* * * * *", async () => {
//   const now = new Date();
//   const oneMius = new Date(now.getTime() - 60 * 60 * 1000);
//   console.log("delete Date :", oneMius);
//   try {
//     await prisma.authKey.deleteMany({
//       where: {
//         createdAt: {
//           lt: oneMius,
//         },
//       },
//     });
//   } catch (err) {
//     console.error("스케쥴 err", err);
//   }
// });

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`${port}서버시작`));
