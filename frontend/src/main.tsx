import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Toaster } from "./components/ui/Sonner";
import "./global.css";
import Auth0ProviderWithNavigate from "./providers/Auth0ProviderWithNavigate";
import LoadDataProvider from "./providers/LoadDataProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNavigate>
        <LoadDataProvider>
          <AppRoutes />
          <Toaster visibleToasts={1} position="bottom-right" richColors />
        </LoadDataProvider>
      </Auth0ProviderWithNavigate>
    </QueryClientProvider>
  </Router>,
);
