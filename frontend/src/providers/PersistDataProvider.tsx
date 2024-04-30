import { useBoardStore } from "@/store/boardStore";
import { useThemeStore } from "@/store/themeStore";
import { BoardState } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { toast } from "sonner";

type PersistDataProviderProps = {
  children: React.ReactNode;
};

const PersistDataProvider = ({ children }: PersistDataProviderProps) => {
  const { isAuthenticated } = useAuth0();
  const theme = useThemeStore((state) => state.theme);
  const boards = useBoardStore((state) => state.boards);
  const currentBoardIndex = useBoardStore((state) => state.currentBoardIndex);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("vite-ui-theme", theme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(() => {
    if (!isAuthenticated) {
      const newBoardState: BoardState = { boards, currentBoardIndex };
      localStorage.setItem("board-state", JSON.stringify(newBoardState));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards, currentBoardIndex]);

  useEffect(() => {
    if (isAuthenticated) {
      toast("HI THERE!!", {
        description: "You're now logged in and ready to access all features.",
      });
    } else {
      toast("HI THERE!!", {
        description:
          "This web app utilizes 'localStorage' to store your data. Please log in to access your data across devices.",
      });
    }
  }, [isAuthenticated]);

  return <>{children}</>;
};

export default PersistDataProvider;
