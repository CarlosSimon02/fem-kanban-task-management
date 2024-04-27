import { BoardState, BoardType, ColumnType, TaskType } from "@/types";
import { create } from "zustand";

type BoardStore = BoardState & {
  setCurrentBoardIndex: (index: number | null | undefined) => void;
  setBoards: (boards: BoardType[]) => void;
  updateBoard: (boardToUpdate: BoardType) => void;
  addBoard: (boardToAdd: BoardType) => void;
  deleteBoard: (boardIdToDelete: string) => void;
  addCol: (colToAdd: ColumnType) => void;
  deleteCol: (colIdToDelete: string) => void;
  updateCol: (colToUpdate: ColumnType) => void;
  addTask: (taskToAdd: TaskType) => void;
  deleteTask: (taskIdToDelete: string) => void;
  updateTask: (taskToUpdate: TaskType) => void;
};

const findTaskPosition = (currentBoard: BoardType, taskToUpdateId: string) => {
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

export const useBoardStore = create<BoardStore>()((set) => ({
  boards: [],
  currentBoardIndex: null,
  setCurrentBoardIndex: (index) =>
    set((state) => {
      return { boards: state.boards, currentBoardIndex: index };
    }),
  setBoards: (boards) => set({ boards }),
  updateBoard: (boardToUpdate) =>
    set((state) => {
      const newBoards = [...state.boards];
      const boardIndex = newBoards.findIndex(
        (board) => board.id === boardToUpdate.id,
      );
      if (boardIndex !== -1) {
        newBoards[boardIndex] = boardToUpdate;
      }

      return {
        boards: newBoards,
        currentBoardIndex: state.currentBoardIndex,
      };
    }),
  addBoard: (boardToAdd) =>
    set((state) => {
      const newBoards = [...state.boards, boardToAdd];

      return {
        boards: newBoards,
        currentBoardIndex: newBoards.length - 1,
      };
    }),
  deleteBoard: (boardIdToDelete) =>
    set((state) => {
      const newBoards = state.boards.filter(
        (board) => board.id !== boardIdToDelete,
      );
      let currentBoardIndex = state.currentBoardIndex;
      if (
        state.currentBoardIndex !== null &&
        state.currentBoardIndex !== undefined &&
        newBoards.length
      ) {
        currentBoardIndex = Math.min(
          state.currentBoardIndex,
          newBoards.length - 1,
        );
      } else {
        currentBoardIndex = null;
      }

      return { boards: newBoards, currentBoardIndex };
    }),
  addCol: (colToAdd) =>
    set((state) => {
      if (
        state.currentBoardIndex === null ||
        state.currentBoardIndex === undefined
      )
        return state;
      const newBoards = [...state.boards];
      const currentBoard = newBoards[state.currentBoardIndex];
      const updatedColumns = [...currentBoard.columns, colToAdd];
      currentBoard.columns = updatedColumns;

      return {
        boards: newBoards,
        currentBoardIndex: state.currentBoardIndex,
      };
    }),
  deleteCol: (colIdToDelete) =>
    set((state) => {
      if (
        state.currentBoardIndex === null ||
        state.currentBoardIndex === undefined
      )
        return state;
      const newBoards = [...state.boards];
      const currentBoard = newBoards[state.currentBoardIndex];
      currentBoard.columns = currentBoard.columns.filter(
        (col) => col.id !== colIdToDelete,
      );

      return {
        boards: newBoards,
        currentBoardIndex: state.currentBoardIndex,
      };
    }),
  updateCol: (colToUpdate) =>
    set((state) => {
      if (
        state.currentBoardIndex === null ||
        state.currentBoardIndex === undefined
      )
        return state;
      const newBoards = [...state.boards];
      const currentBoard = newBoards[state.currentBoardIndex];
      const colIndex = currentBoard.columns.findIndex(
        (col) => col.id === colToUpdate.id,
      );
      if (colIndex !== -1) {
        currentBoard.columns[colIndex] = colToUpdate;
      }

      return {
        boards: newBoards,
        currentBoardIndex: state.currentBoardIndex,
      };
    }),
  addTask: (taskToAdd) =>
    set((state) => {
      if (
        state.currentBoardIndex === null ||
        state.currentBoardIndex === undefined
      )
        return state;
      const newBoards = [...state.boards];
      const currentBoard = newBoards[state.currentBoardIndex];
      const destColIndex = currentBoard.columns.findIndex(
        (col) => col.id === taskToAdd.statusId,
      );
      currentBoard.columns[destColIndex].tasks.push(taskToAdd);

      return {
        boards: newBoards,
        currentBoardIndex: state.currentBoardIndex,
      };
    }),
  deleteTask: (taskIdToDelete) =>
    set((state) => {
      if (
        state.currentBoardIndex === null ||
        state.currentBoardIndex === undefined
      )
        return state;
      const newBoards = [...state.boards];
      const currentBoard = newBoards[state.currentBoardIndex];
      const taskPos = findTaskPosition(currentBoard, taskIdToDelete);
      if (taskPos.col !== -1 && taskPos.row !== -1) {
        currentBoard.columns[taskPos.col].tasks.splice(taskPos.row, 1);
      }

      return {
        boards: newBoards,
        currentBoardIndex: state.currentBoardIndex,
      };
    }),
  updateTask: (taskToUpdate) =>
    set((state) => {
      if (
        state.currentBoardIndex === null ||
        state.currentBoardIndex === undefined
      )
        return state;
      const newBoards = [...state.boards];
      const currentBoard = newBoards[state.currentBoardIndex];
      const taskPos = findTaskPosition(currentBoard, taskToUpdate.id);
      if (taskPos.col !== -1 && taskPos.row !== -1) {
        if (currentBoard.columns[taskPos.col].id !== taskToUpdate.statusId) {
          const destColIndex = currentBoard.columns.findIndex(
            (col) => col.id === taskToUpdate.statusId,
          );
          currentBoard.columns[taskPos.col].tasks.splice(taskPos.row, 1);
          currentBoard.columns[destColIndex].tasks.push(taskToUpdate);
        } else {
          currentBoard.columns[taskPos.col].tasks[taskPos.row] = taskToUpdate;
        }
      }

      return {
        boards: newBoards,
        currentBoardIndex: state.currentBoardIndex,
      };
    }),
}));
