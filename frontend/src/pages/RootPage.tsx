import Board from "@/components/Board";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BoardDialog from "@/components/dialogs/BoardDialog";
import { EmptyBoardIcon } from "@/components/ui/Icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useBoardStore } from "../store/boardStore";

const RootPage = () => {
  const { isAuthenticated } = useAuth0();
  const currentBoardIndex = useBoardStore((state) => state.currentBoardIndex);
  const currentBoardIndexIsNumber =
    currentBoardIndex !== null && currentBoardIndex !== undefined;

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

  return (
    <>
      <Header />
      <div className="flex flex-1 items-stretch">
        <Sidebar />
        {currentBoardIndexIsNumber ? (
          <Board />
        ) : (
          <div className="flex h-full flex-1 items-center justify-center">
            <BoardDialog>
              <button className="clickable group flex flex-col items-center gap-5 font-bold text-secondary-foreground hover:text-accent">
                <EmptyBoardIcon className="[&_path]: h-32 w-32" />
                <div>
                  <span aria-hidden={true}>+</span> Create New Board
                </div>
              </button>
            </BoardDialog>
          </div>
        )}
      </div>
    </>
  );
};

export default RootPage;
