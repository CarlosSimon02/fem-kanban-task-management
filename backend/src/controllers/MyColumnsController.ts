import { Request, Response } from "express";
import User from "../models/user";

const updateColumn = async (req: Request, res: Response) => {
  try {
    const { colToUpdate } = req.body;
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
    const colToUpdateIndex = currentBoard.columns.findIndex(
      (col) => col.id === colToUpdate.id
    );

    if (colToUpdateIndex !== -1) {
      return res.status(404).json({ message: "Column not found" });
    }

    currentBoard.columns[colToUpdateIndex] = colToUpdate;
    await user.save();

    res.status(200).json({ colToUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating column" });
  }
};

const addColumn = async (req: Request, res: Response) => {
  try {
    const { colToAdd } = req.body;
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
    currentBoard.columns.push(colToAdd);
    await user.save();

    res.status(200).json({ colToAdd });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding column" });
  }
};

const deleteColumn = async (req: Request, res: Response) => {
  try {
    const { colIdToDelete } = req.body;
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
    currentBoard.columns.filter((col) => col.id !== colIdToDelete);
    await user.save();

    res.status(200).json({ colIdToDelete });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding column" });
  }
};

export default {
  updateColumn,
  addColumn,
  deleteColumn,
};
