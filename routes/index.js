import express from "express";
import studyDetail from "./studyDetail/router.js";
import test from "./studyDetail/test.js"
const router = express.Router();
/**
 *  routes 안에 기능별 폴더로 이름을 구분해주시고 js파일을 만들어 router로 만들어주세요 
 *  이곳에 import 후 router.use() 해주세요!
*/
router.use("/studydetail", studyDetail);
router.use("/test", test);

export default router;
