import Board from "./components/Board";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useBoardStore } from "./store/boardStore";

const Root = () => {
  const currentBoardIndex = useBoardStore((state) => state.currentBoardIndex);

  return (
    <>
      <Header />
      <div className="flex flex-1 items-stretch">
        <Sidebar />
        {currentBoardIndex !== null && <Board />}
      </div>
    </>
  );
};

export default Root;
