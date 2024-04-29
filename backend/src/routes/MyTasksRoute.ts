import express from "express";
import MyTasksController from "../controllers/MyTasksController";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

router.patch("/", jwtCheck, jwtParse, MyTasksController.updateTask);
router.post("/", jwtCheck, jwtParse, MyTasksController.addTask);
router.delete("/", jwtCheck, jwtParse, MyTasksController.deleteTask);

export default router;
