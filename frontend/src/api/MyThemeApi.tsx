import { useThemeStore } from "@/store/themeStore";
import { Theme } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

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

  const {
    mutateAsync: getTheme,
    isLoading,
    error,
    reset,
  } = useMutation(getMyTheme);

  if (error) {
    toast.error(error.toString());
    reset();
  }

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
      body: JSON.stringify({ theme }),
    });

    if (!response.ok) {
      throw new Error("Failed to set theme");
    }

    return response.json();
  };

  const {
    mutateAsync: setApiTheme,
    isLoading,
    error,
    reset,
  } = useMutation(setMyApiTheme);
  const setStoreTheme = useThemeStore((state) => state.setTheme);
  const updateThemeLocalStorage = useThemeStore(
    (state) => state.updateLocalStorage,
  );
  const setTheme = async (theme: Theme) => {
    if (isLoading) return;
    if (isAuthenticated) {
      if (!navigator.onLine) {
        toast.error(
          "Error: Unable to establish internet connection. Please check your network settings and try again",
        );
        return;
      }
      const { theme: themeApi } = await setApiTheme(theme);
      setStoreTheme(themeApi);
    } else {
      setStoreTheme(theme);
      updateThemeLocalStorage();
    }
  };

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    setTheme,
  };
};
