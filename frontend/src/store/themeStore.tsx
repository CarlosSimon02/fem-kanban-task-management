import { Theme } from "@/types";
import { create } from "zustand";

const setRootElementTheme = (theme: Theme) => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
};

type ThemeStore = {
  theme: Theme;
  updateLocalStorage: () => void;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>((set, get) => {
  return {
    theme: "light",
    updateLocalStorage: () => {
      localStorage.setItem("vite-ui-theme", get().theme);
    },
    setTheme: (theme: Theme) => {
      set({ theme });
      setRootElementTheme(theme);
    },
  };
});
