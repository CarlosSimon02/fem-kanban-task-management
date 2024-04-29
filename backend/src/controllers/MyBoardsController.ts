import { Request, Response } from "express";
import User from "../models/user";

const getBoards = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ boards: currentUser.boards });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const setBoards = async (req: Request, res: Response) => {
  try {
    const { boards } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.boards = boards;
    await user.save();

    res.status(200).json({ boards });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating board" });
  }
};

const updateBoard = async (req: Request, res: Response) => {
  try {
    const { boardToUpdate } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const boardToUpdateIndex = user.boards.findIndex(
      (board) => board.id === boardToUpdate.id
    );

    if (boardToUpdateIndex === -1) {
      return res.status(404).json({ message: "Board not found" });
    }

    user.boards[boardToUpdateIndex] = boardToUpdate;
    await user.save();

    res.status(200).json({ boardToUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating board" });
  }
};

const addBoard = async (req: Request, res: Response) => {
  try {
    const { boardToAdd } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.boards.push(boardToAdd);
    user.currentBoardIndex = user.boards.length - 1;
    await user.save();

    res.status(200).json({ boardToAdd });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding board" });
  }
};

const deleteBoard = async (req: Request, res: Response) => {
  try {
    const { boardIdToDelete } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const boardIdToDeleteIndex = user.boards.findIndex(
      (board) => board.id === boardIdToDelete
    );
    user.boards.splice(boardIdToDeleteIndex, 1);
    if (
      user.currentBoardIndex !== null &&
      user.currentBoardIndex !== undefined &&
      user.boards.length
    ) {
      user.currentBoardIndex = Math.min(
        user.currentBoardIndex,
        user.boards.length - 1
      );
    } else {
      user.currentBoardIndex = null;
    }

    await user.save();

    res.status(200).json({ boardIdToDelete });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting board" });
  }
};

export default {
  getBoards,
  setBoards,
  updateBoard,
  addBoard,
  deleteBoard,
};
