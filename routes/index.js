import express from "express";
import focusPage from "./focusPage/focusPage.js";
import detailPage from "./detailPage/detailPage.js";
import studyDetail from "./studyDetail/router.js";
import test from "./studyDetail/test.js";
import home from "./home/home.js";
const router = express.Router();
/**
 *  routes 안에 기능별 폴더로 이름을 구분해주시고 js파일을 만들어 router로 만들어주세요
 *  이곳에 import 후 router.use() 해주세요!
 */
router.use("/focus", focusPage);
router.use("/detailPage", detailPage);
router.use("/studydetail", studyDetail);
router.use("/test", test);
router.use("/home", home);

export default router;
