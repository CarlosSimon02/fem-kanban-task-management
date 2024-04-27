import { Route, Routes } from "react-router-dom";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import RootPage from "./pages/RootPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RootPage />} />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
    </Routes>
  );
};

export default AppRoutes;
