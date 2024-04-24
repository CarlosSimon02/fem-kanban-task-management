import { materialColors } from "@/data/colors";
import { BoardType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * materialColors.length);
  return materialColors[randomIndex];
};

export const findTaskPosition = (
  currentBoard: BoardType,
  taskToUpdateId: string,
) => {
  let taskToUpdatePos = { col: -1, row: -1 };

  for (let col = 0; col < currentBoard.columns.length; col++) {
    let found = false;

    for (let row = 0; row < currentBoard.columns[col].tasks.length; row++) {
      if (currentBoard.columns[col].tasks[row].id === taskToUpdateId) {
        taskToUpdatePos = { col, row };
        found = true;
        break;
      }
    }
    if (found) {
      break;
    }
  }

  return taskToUpdatePos;
};
