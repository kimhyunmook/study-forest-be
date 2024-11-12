import express from "express";
import studyDetail from "./studyDetail/router.js";

const router = express.Router();
router.use("/studydetail", studyDetail);
export default router;
