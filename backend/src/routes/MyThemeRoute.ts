import express from "express";
import MyThemeController from "../controllers/MyThemeController";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

router.get("/", jwtCheck, jwtParse, MyThemeController.getTheme);
router.patch("/", jwtCheck, jwtParse, MyThemeController.setTheme);

export default router;
