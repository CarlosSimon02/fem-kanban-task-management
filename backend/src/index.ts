import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import myBoardsRoute from "./routes/MyBoardsRoute";
import myColumnsRoute from "./routes/MyColumnsRoute";
import myCurrentBoardIndexRoute from "./routes/MyCurrentBoardIndexRoute";
import myTasksRoute from "./routes/MyTasksRoute";
import myThemeRoute from "./routes/MyThemeRoute";
import myUserRoute from "./routes/MyUserRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/my/user", myUserRoute);
app.use("/api/my/theme", myThemeRoute);
app.use("/api/my/current-board-index", myCurrentBoardIndexRoute);
app.use("/api/my/boards", myBoardsRoute);
app.use("/api/my/column", myColumnsRoute);
app.use("/api/my/task", myTasksRoute);

app.listen(7000, () => {
  console.log("server started on localhost:7000");
});
