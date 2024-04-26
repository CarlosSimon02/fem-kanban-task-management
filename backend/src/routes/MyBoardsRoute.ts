import express from "express";
import MyBoardsController from "../controllers/MyBoardsController";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

router.get("/", jwtCheck, jwtParse, MyBoardsController.getBoards);

export default router;
