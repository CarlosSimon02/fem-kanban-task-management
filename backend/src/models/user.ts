import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  statusId: { type: String, required: true },
  subtasks: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      isCompleted: { type: Boolean, default: false },
    },
  ],
});

const columnSchema = new mongoose.Schema({
  id: { type: String, required: true },
  color: { type: String },
  name: { type: String, required: true },
  tasks: [taskSchema], 
});

const boardSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  columns: [columnSchema], 
});

const userSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true },
  picture: { type: String, required: true },
  name: { type: String, required: true },
  theme: { type: String, enum: ["dark", "light"] },
  currentBoardIndex: { type: Number },
  boards: [boardSchema],
});

const User = mongoose.model("User", userSchema);
export default User;
