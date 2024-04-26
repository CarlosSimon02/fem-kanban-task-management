import express from "express";
import MyCurrentBoardIndexController from "../controllers/MyCurrentBoardIndexController";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

router.get(
  "/",
  jwtCheck,
  jwtParse,
  MyCurrentBoardIndexController.getCurrentBoardIndex
);

export default router;
