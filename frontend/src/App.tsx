import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useBoardStore } from "./store/boardStore";
import { useThemeStore } from "./store/themeStore";

const App = () => {
  const initThemeState = useThemeStore((state) => state.initThemeState);
  const initBoardState = useBoardStore((state) => state.initBoardState);

  useEffect(() => {
    initThemeState();
  }, [initThemeState]);

  useEffect(() => {
    initBoardState();
  }, [initBoardState]);

  return <RouterProvider router={router} />;
};

export default App;
