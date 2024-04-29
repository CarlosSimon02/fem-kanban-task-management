import { Request, Response } from "express";
import { Types } from "mongoose";
import User from "../models/user";

type BoardType = Types.Subdocument<Types.ObjectId> & {
  id: string;
  name: string;
  columns: Types.DocumentArray<{
    id: string;
    name: string;
    tasks: Types.DocumentArray<{
      id: string;
      title: string;
      statusId: string;
      subtasks: Types.DocumentArray<{
        id: string;
        title: string;
        isCompleted: boolean;
      }>;
    }>;
  }>;
};

const findTaskPosition = (currentBoard: BoardType, taskToUpdateId: string) => {
  let taskToUpdatePos = { col: -1, row: -1 };

  for (let col = 0; col < currentBoard.columns.length; col++) {
    let found = false;

    for (let row = 0; row < currentBoard.columns[col].tasks.length; row++) {
      if (currentBoard.columns[col].tasks[row].id === taskToUpdateId) {
        taskToUpdatePos = { col, row };
        found = true;
        break;
      }
    }
    if (found) {
      break;
    }
  }

  return taskToUpdatePos;
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskToUpdate } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      user.currentBoardIndex === null ||
      user.currentBoardIndex === undefined
    ) {
      return res.status(404).json({ message: "Current board index not found" });
    }

    const currentBoard = user.boards[user.currentBoardIndex];
    const taskPos = findTaskPosition(currentBoard, taskToUpdate.id);

    if (taskPos.col === -1 || taskPos.row === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (currentBoard.columns[taskPos.col].id !== taskToUpdate.statusId) {
      const destColIndex = currentBoard.columns.findIndex(
        (col) => col.id === taskToUpdate.statusId
      );
      currentBoard.columns[taskPos.col].tasks.splice(taskPos.row, 1);
      currentBoard.columns[destColIndex].tasks.push(taskToUpdate);
    } else {
      currentBoard.columns[taskPos.col].tasks[taskPos.row] = taskToUpdate;
    }
    await user.save();

    res.status(200).json({ taskToUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating task" });
  }
};

export const addTask = async (req: Request, res: Response) => {
  try {
    const { taskToAdd } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      user.currentBoardIndex === null ||
      user.currentBoardIndex === undefined
    ) {
      return res.status(404).json({ message: "Current board index not found" });
    }

    const currentBoard = user.boards[user.currentBoardIndex];
    const destColIndex = currentBoard.columns.findIndex(
      (col) => col.id === taskToAdd.statusId
    );
    currentBoard.columns[destColIndex].tasks.push(taskToAdd);
    await user.save();

    res.status(200).json({ taskToAdd });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskIdToDelete } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      user.currentBoardIndex === null ||
      user.currentBoardIndex === undefined
    ) {
      return res.status(404).json({ message: "Current board index not found" });
    }

    const currentBoard = user.boards[user.currentBoardIndex];
    const taskPos = findTaskPosition(currentBoard, taskIdToDelete);

    if (taskPos.col === -1 || taskPos.row === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    currentBoard.columns[taskPos.col].tasks.splice(taskPos.row, 1);
    await user.save();

    res.status(200).json({ taskIdToDelete });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting task" });
  }
};

export default {
  updateTask,
  addTask,
  deleteTask,
};
