import { boards as dataBoards } from "@/data/data.json";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import router from "./router";
import { useBoardStore } from "./store/boardStore";
import { useThemeStore } from "./store/themeStore";

const App = () => {
  const theme = useThemeStore((state) => state.theme);
  const systemTheme = useThemeStore((state) => state.systemTheme);
  const setBoards = useBoardStore((state) => state.setBoards);
  const setCurrentBoardIndex = useBoardStore(
    (state) => state.setCurrentBoardIndex,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      root.classList.add(systemTheme as string);
      return;
    }

    root.classList.add(theme);
  }, [theme, systemTheme]);

  useEffect(() => {
    setBoards(
      dataBoards.map((board) => ({
        ...board,
        id: uuidv4(),
        columns: board.columns.map((column) => ({
          ...column,
          id: uuidv4(),
          tasks: column.tasks.map((task) => ({
            ...task,
            id: uuidv4(),
            subtasks: task.subtasks.map((subtask) => ({
              ...subtask,
              id: uuidv4(),
            })),
          })),
        })),
      })),
    );

    setCurrentBoardIndex(0);
  }, [setBoards, setCurrentBoardIndex]);

  return <RouterProvider router={router} />;
};

export default App;
