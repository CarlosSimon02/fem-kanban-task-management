import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./global.css";
import Auth0ProviderWithNavigate from "./providers/Auth0ProviderWithNavigate";
import LoadDataProvider from "./providers/LoadDataProvider";
import PersistDataProvider from "./providers/PersistDataProvider";

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
        <PersistDataProvider>
          <LoadDataProvider>
            <AppRoutes />
          </LoadDataProvider>
        </PersistDataProvider>
      </Auth0ProviderWithNavigate>
    </QueryClientProvider>
  </Router>,
);
