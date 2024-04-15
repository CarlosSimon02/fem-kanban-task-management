import { createBrowserRouter } from "react-router-dom";
import Board from "./components/Board";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <div className="flex flex-1 items-stretch">
          <Sidebar />
          <Board />
        </div>
      </>
    ),
  },
]);

export default router;
