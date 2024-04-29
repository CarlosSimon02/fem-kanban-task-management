import express from "express";
import MyColumnsController from "../controllers/MyColumnsController";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

router.patch("/", jwtCheck, jwtParse, MyColumnsController.updateColumn);
router.post("/", jwtCheck, jwtParse, MyColumnsController.addColumn);
router.delete("/", jwtCheck, jwtParse, MyColumnsController.deleteColumn);

export default router;
