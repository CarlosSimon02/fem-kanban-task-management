import { Theme } from "@/types";
import { create } from "zustand";

const setRootElementTheme = (theme: Theme) => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
};

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>((set) => {
  return {
    theme: "light",
    setTheme: (theme: Theme) => {
      set({ theme });
      setRootElementTheme(theme);
    },
  };
});
