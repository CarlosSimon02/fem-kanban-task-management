import { Request, Response } from "express";
import User from "../models/user";

const getCurrentBoardIndex = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ currentBoardIndex: currentUser.currentBoardIndex });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const setCurrentBoardIndex = async (req: Request, res: Response) => {
  try {
    const { currentBoardIndex } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.currentBoardIndex = currentBoardIndex;
    await user.save();

    res.status(200).json({ currentBoardIndex });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error setting current board index" });
  }
};

export default {
  getCurrentBoardIndex,
  setCurrentBoardIndex,
};
