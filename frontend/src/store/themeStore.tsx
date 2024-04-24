import { create } from "zustand";

type Theme = "dark" | "light";

const setRootElementTheme = (theme: Theme) => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
};

const getSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

type ThemeStore = {
  theme: Theme;
  initThemeState: () => void;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "light",
  initThemeState: () => {
    const storedTheme = localStorage.getItem("vite-ui-theme");
    const theme: Theme = storedTheme
      ? (storedTheme as Theme)
      : getSystemTheme();
    setRootElementTheme(theme);
    set({ theme });
  },
  setTheme: (theme: Theme) => {
    localStorage.setItem("vite-ui-theme", theme);
    setRootElementTheme(theme);
    set({ theme });
  },
}));
