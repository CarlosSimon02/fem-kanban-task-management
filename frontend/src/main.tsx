import ReactDOM from "react-dom/client";
import App from "./App";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0ProviderWithNavigate>
    <App />
  </Auth0ProviderWithNavigate>,
);
