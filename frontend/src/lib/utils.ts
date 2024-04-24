import { materialColors } from "@/data/colors";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * materialColors.length);
  return materialColors[randomIndex];
};
