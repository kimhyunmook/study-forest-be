import express from "express";
import studyDetail from "./studyDetail";

const router = express.Router();
router.use("/studydetail", studyDetail);
export default router;
