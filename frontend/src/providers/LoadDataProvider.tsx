import { useGetMyBoards } from "@/api/MyBoardsApi";
import { useGetMyCurrentBoardIndex } from "@/api/MyCurrentBoardIndexApi";
import { useGetMyTheme } from "@/api/MyThemeApi";
import { boards as JSONDataBoards } from "@/data/data.json";
import LoadingPage from "@/pages/LoadingPage";
import { useBoardStore } from "@/store/boardStore";
import { useThemeStore } from "@/store/themeStore";
import { BoardState, Theme } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const getJSONDataBoards = () => {
  return JSONDataBoards.map((board) => ({
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
  }));
};

const getSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

type LoadDataProviderProps = {
  children: React.ReactNode;
};

const LoadDataProvider = ({ children }: LoadDataProviderProps) => {
  const { isAuthenticated } = useAuth0();
  const setStoreTheme = useThemeStore((state) => state.setTheme);
  const setStoreBoards = useBoardStore((state) => state.setBoards);
  const setStoreCurrentBoardIndex = useBoardStore(
    (state) => state.setCurrentBoardIndex,
  );
  const { getTheme, isLoading: isThemeLoading } = useGetMyTheme();
  const { getBoards, isLoading: isBoardsLoading } = useGetMyBoards();
  const { getCurrentBoardIndex } = useGetMyCurrentBoardIndex();

  useEffect(() => {
    const loadTheme = async () => {
      if (isAuthenticated) {
        const { theme } = await getTheme();
        setStoreTheme(theme ? theme : getSystemTheme());
      } else {
        const storedTheme = localStorage.getItem("vite-ui-theme");
        const theme: Theme = storedTheme
          ? (storedTheme as Theme)
          : getSystemTheme();
        setStoreTheme(theme);
      }
    };

    loadTheme();
  }, [getTheme, isAuthenticated, setStoreTheme]);

  useEffect(() => {
    const loadData = async () => {
      if (isAuthenticated) {
        const { boards } = await getBoards();
        const { currentBoardIndex } = await getCurrentBoardIndex();

        setStoreBoards(boards);
        setStoreCurrentBoardIndex(currentBoardIndex);
      } else {
        console.log();
        const storedBoardState = localStorage.getItem("board-state");
        let newState: BoardState;

        if (storedBoardState) {
          newState = JSON.parse(storedBoardState);
        } else {
          const boards = getJSONDataBoards();
          newState = {
            boards,
            currentBoardIndex: boards.length ? 0 : null,
          };
        }

        setStoreBoards(newState.boards);
        setStoreCurrentBoardIndex(newState.currentBoardIndex);
      }
    };

    loadData();
  }, [
    // getBoards,
    // getCurrentBoardIndex,
    isAuthenticated,
    // setStoreBoards,
    // setStoreCurrentBoardIndex,
  ]);

  if (isThemeLoading || isBoardsLoading) return <LoadingPage />;

  return <>{children}</>;
};

export default LoadDataProvider;
