import Board from "@/components/Board";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BoardDialog from "@/components/dialogs/BoardDialog";
import { EmptyBoardIcon } from "@/components/ui/Icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useBoardStore } from "../store/boardStore";
import LoadingPage from "./LoadingPage";

const RootPage = () => {
  const { isLoading } = useAuth0();
  const currentBoardIndex = useBoardStore((state) => state.currentBoardIndex);
  const currentBoardIndexIsNumber =
    currentBoardIndex !== null && currentBoardIndex !== undefined;

  if (isLoading) return <LoadingPage />;

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
