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
        columns: board.columns.map((column) => {
          const columnId = uuidv4();

          return {
            ...column,
            id: columnId,
            tasks: column.tasks.map((task) => ({
              id: uuidv4(),
              title: task.title,
              description: task.description,
              statusId: columnId,
              subtasks: task.subtasks.map((subtask) => ({
                ...subtask,
                id: uuidv4(),
              })),
            })),
          };
        }),
      })),
    );
  }, [setBoards]);

  return <RouterProvider router={router} />;
};

export default App;
