import { useBoardStore } from "@/store/boardStore";
import { useThemeStore } from "@/store/themeStore";
import { BoardState } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";

type PersistDataProviderProps = {
  children: React.ReactNode;
};

const PersistDataProvider = ({ children }: PersistDataProviderProps) => {
  const { isAuthenticated } = useAuth0();
  const theme = useThemeStore((state) => state.theme);
  const boards = useBoardStore((state) => state.boards);
  const currentBoardIndex = useBoardStore((state) => state.currentBoardIndex);

  const isNotInitRender = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && isNotInitRender) {
      localStorage.setItem("vite-ui-theme", theme);
    }

    isNotInitRender.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(() => {
    if (!isAuthenticated && isNotInitRender) {
      const newBoardState: BoardState = { boards, currentBoardIndex };
      localStorage.setItem("board-state", JSON.stringify(newBoardState));
    }

    isNotInitRender.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards, currentBoardIndex]);

  return <>{children}</>;
};

export default PersistDataProvider;
