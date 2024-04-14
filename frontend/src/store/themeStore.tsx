import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "dark" | "light" | "system";

type ThemeStore = {
  systemTheme: Omit<Theme, "system">;
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      systemTheme: (() => {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      })(),
      theme: "system",
      setTheme: (theme: Theme) => {
        set({ theme });
      },
    }),
    {
      name: "vite-ui-theme",
    },
  ),
);
