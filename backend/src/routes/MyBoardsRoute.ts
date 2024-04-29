import express from "express";
import MyBoardsController from "../controllers/MyBoardsController";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

router.get("/", jwtCheck, jwtParse, MyBoardsController.getBoards);
router.patch("/", jwtCheck, jwtParse, MyBoardsController.setBoards);
router.patch("/board", jwtCheck, jwtParse, MyBoardsController.updateBoard);
router.post("/board", jwtCheck, jwtParse, MyBoardsController.addBoard);
router.delete("/board", jwtCheck, jwtParse, MyBoardsController.deleteBoard);

export default router;
