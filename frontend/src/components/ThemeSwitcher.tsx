import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/themeStore";
import * as Switch from "@radix-ui/react-switch";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DarkThemeIcon, LightThemeIcon } from "./ui/Icons";

type ThemeSwitcherProps = {
  className?: string;
};

const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return (
    <fieldset
      className={cn(
        "flex justify-center gap-6 rounded-md bg-secondary py-[0.875rem]",
        className,
      )}
    >
      <VisuallyHidden>
        Switch to {theme === "dark" ? "light" : "dark"} theme
      </VisuallyHidden>
      <LightThemeIcon className="w-[1.145625rem] [&_path]:fill-secondary-foreground" />
      <Switch.Root
        className="clickable h-5 w-10 rounded-full bg-accent hover:bg-accent-hover"
        defaultChecked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      >
        <Switch.Thumb className="block h-[0.875rem] w-[0.875rem] translate-x-[0.1875rem] rounded-full bg-accent-foreground transition-transform data-[state=checked]:translate-x-[1.4375rem]" />
      </Switch.Root>
      <DarkThemeIcon className="w-[0.9375rem] [&_path]:fill-secondary-foreground" />
    </fieldset>
  );
};

export default ThemeSwitcher;
