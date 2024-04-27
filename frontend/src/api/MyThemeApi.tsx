import { useThemeStore } from "@/store/themeStore";
import { Theme } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyTheme = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyTheme = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/theme`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get theme");
    }

    return response.json();
  };

  const { mutateAsync: getTheme, isLoading } = useMutation(getMyTheme);

  return {
    getTheme,
    isLoading,
  };
};

export const useSetMyTheme = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const setMyApiTheme = async (theme: Theme) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/theme`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ theme: theme }),
    });

    if (!response.ok) {
      throw new Error("Failed to set theme");
    }

    return response.json();
  };

  const { mutateAsync: setApiTheme, isLoading } = useMutation(setMyApiTheme);
  const { setTheme: setStoreTheme } = useThemeStore();
  const setTheme = async (newTheme: Theme) => {
    if (isLoading) return;
    if (isAuthenticated) {
      if (!navigator.onLine) return;
      const { theme } = await setApiTheme(newTheme);
      setStoreTheme(theme);
    } else {
      setStoreTheme(newTheme);
    }
  };

  return {
    setTheme,
  };
};
