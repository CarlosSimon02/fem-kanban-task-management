import Board from "@/components/Board";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
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
        {currentBoardIndexIsNumber && <Board />}
      </div>
    </>
  );
};

export default RootPage;
