import * as dotenv from "dotenv";
import express from "express";
import router from "./routes/index.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/", router);
const port = process.env.PORT;

app.listen(port, () => console.log(`${port}서버시작`));
