import { useGetMyBoards } from "@/api/MyBoardsApi";
import { useGetMyCurrentBoardIndex } from "@/api/MyCurrentBoardIndexApi";
import { useGetMyTheme } from "@/api/MyThemeApi";
import { useCreateMyUser } from "@/api/MyUserApi";
import { boards as JSONDataBoards } from "@/data/data.json";
import LoadingPage from "@/pages/LoadingPage";
import ReloadPage from "@/pages/ReloadPage";
import { useBoardStore } from "@/store/boardStore";
import { useThemeStore } from "@/store/themeStore";
import { BoardState, Theme } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
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
  const {
    isAuthenticated,
    user,
    isLoading: isAuthLoading,
    error: authError,
  } = useAuth0();
  const setStoreTheme = useThemeStore((state) => state.setTheme);
  const setStoreBoards = useBoardStore((state) => state.setBoards);
  const setStoreCurrentBoardIndex = useBoardStore(
    (state) => state.setCurrentBoardIndex,
  );
  const {
    getTheme,
    isLoading: isThemeLoading,
    isError: isThemeError,
  } = useGetMyTheme();
  const {
    getBoards,
    isLoading: isBoardsLoading,
    isError: isBoardsError,
  } = useGetMyBoards();
  const {
    createUser,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useCreateMyUser();
  const { getCurrentBoardIndex } = useGetMyCurrentBoardIndex();

  const hasLoaded = useRef(false);

  useEffect(() => {
    const init = async () => {
      const loadUser = async () => {
        if (
          user?.sub &&
          (user?.given_name || user?.email) &&
          user?.picture &&
          isAuthenticated
        ) {
          await createUser({
            auth0Id: user.sub,
            name:
              user.given_name ||
              (user.email ? user.email.split("@")[0] : "User"),
            picture: user.picture,
          });
        }
      };
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
      const loadData = async () => {
        if (isAuthenticated) {
          const { boards } = await getBoards();
          const { currentBoardIndex } = await getCurrentBoardIndex();

          setStoreBoards(boards);
          setStoreCurrentBoardIndex(currentBoardIndex);
        } else {
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

      await loadUser();
      await loadTheme();
      await loadData();

      hasLoaded.current = true;
    };

    init();
  }, [
    createUser,
    getBoards,
    getCurrentBoardIndex,
    getTheme,
    isAuthenticated,
    setStoreBoards,
    setStoreCurrentBoardIndex,
    setStoreTheme,
    user,
  ]);

  if (
    isAuthLoading ||
    isUserLoading ||
    isThemeLoading ||
    isBoardsLoading ||
    !hasLoaded
  )
    return <LoadingPage />;

  if (
    authError ||
    isUserError ||
    isThemeError ||
    isBoardsError ||
    !navigator.onLine
  )
    return <ReloadPage />;

  return <>{children}</>;
};

export default LoadDataProvider;
