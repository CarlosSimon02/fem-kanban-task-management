import { Request, Response } from "express";
import User from "../models/user";

const getTheme = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ theme: currentUser.theme });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const setTheme = async (req: Request, res: Response) => {
  try {
    const { theme } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.theme = theme;
    await user.save();

    res.status(200).json({ theme });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error setting theme" });
  }
};

export default {
  getTheme,
  setTheme,
};
