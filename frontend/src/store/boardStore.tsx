import { findTaskPosition } from "@/lib/utils";
import { BoardType, ColumnType, TaskType } from "@/types";
import { create } from "zustand";

type BoardStore = {
  boards: BoardType[];
  currentBoardIndex: number | null;
  setBoards: (boards: BoardType[]) => void;
  setCurrentBoardIndex: (index: number) => void;
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

export const useBoardStore = create<BoardStore>()((set) => ({
  boards: [],
  currentBoardIndex: null,
  setBoards: (boards) =>
    set(() => {
      let currentBoardIndex: number | null = null;

      if (boards.length) currentBoardIndex = 0;

      return { boards, currentBoardIndex };
    }),
  setCurrentBoardIndex: (index) => set({ currentBoardIndex: index }),
  updateBoard: (boardToUpdate) =>
    set((state) => {
      const newBoards = Array.from(state.boards);
      const boardToUpdateIndex = state.boards.findIndex(
        (board) => board.id === boardToUpdate.id,
      );

      if (boardToUpdateIndex === -1) return state;

      newBoards[boardToUpdateIndex] = boardToUpdate;

      return { boards: newBoards };
    }),
  addBoard: (boardToAdd) =>
    set((state) => {
      const newBoards = [...state.boards, boardToAdd];

      return { boards: newBoards, currentBoardIndex: newBoards.length - 1 };
    }),
  deleteBoard: (boardIdToDelete) =>
    set((state) => {
      const newBoards = state.boards.filter(
        (board) => board.id !== boardIdToDelete,
      );
      let currentBoardIndex: number | null = null;

      if (state.currentBoardIndex !== null) {
        currentBoardIndex = state.currentBoardIndex;

        if (newBoards.length && newBoards.length <= state.currentBoardIndex) {
          currentBoardIndex = newBoards.length - 1;
        } else if (newBoards.length === 0) {
          currentBoardIndex = null;
        }
      }

      return {
        boards: newBoards,
        currentBoardIndex,
      };
    }),
  addCol: (colToAdd) =>
    set((state) => {
      if (state.currentBoardIndex === null) return state;

      const newBoards = Array.from(state.boards);
      newBoards[state.currentBoardIndex].columns.push(colToAdd);

      return { boards: newBoards };
    }),
  deleteCol: (colIdToDelete) =>
    set((state) => {
      if (state.currentBoardIndex === null) return state;

      const newBoards = Array.from(state.boards);
      newBoards[state.currentBoardIndex].columns = newBoards[
        state.currentBoardIndex
      ].columns.filter((column) => column.id !== colIdToDelete);

      return { boards: newBoards };
    }),
  updateCol: (colToUpdate) =>
    set((state) => {
      if (state.currentBoardIndex === null) return state;

      const newBoards = Array.from(state.boards);
      const colToUpdateIndex = state.boards[
        state.currentBoardIndex
      ].columns.findIndex((column) => column.id === colToUpdate.id);

      if (colToUpdateIndex === -1) return state;

      newBoards[state.currentBoardIndex].columns[colToUpdateIndex] =
        colToUpdate;

      return { boards: newBoards };
    }),
  addTask: (taskToAdd) =>
    set((state) => {
      if (state.currentBoardIndex === null) return state;

      const newBoards = Array.from(state.boards);
      const currentBoard = newBoards[state.currentBoardIndex];
      const taskToDeletePos = findTaskPosition(currentBoard, taskToAdd.id);

      if (taskToDeletePos.col === -1 || taskToDeletePos.row === -1)
        return state;

      const destinationColIndex = currentBoard.columns.findIndex(
        (column) => column.id === taskToAdd.statusId,
      );

      currentBoard.columns[destinationColIndex].tasks.push(taskToAdd);

      return { boards: newBoards };
    }),
  deleteTask: (taskIdToDelete) =>
    set((state) => {
      if (state.currentBoardIndex === null) return state;

      const newBoards = Array.from(state.boards);
      const currentBoard = newBoards[state.currentBoardIndex];
      const taskToDeletePos = findTaskPosition(currentBoard, taskIdToDelete);

      if (taskToDeletePos.col === -1 || taskToDeletePos.row === -1)
        return state;

      currentBoard.columns[taskToDeletePos.col].tasks.splice(
        taskToDeletePos.row,
        1,
      );

      return { boards: newBoards };
    }),
  updateTask: (taskToUpdate) =>
    set((state) => {
      if (state.currentBoardIndex === null) return state;

      const newBoards = Array.from(state.boards);
      const currentBoard = newBoards[state.currentBoardIndex];
      const taskToUpdatePos = findTaskPosition(currentBoard, taskToUpdate.id);

      if (taskToUpdatePos.col === -1 || taskToUpdatePos.row === -1)
        return state;

      if (
        currentBoard.columns[taskToUpdatePos.col].id !== taskToUpdate.statusId
      ) {
        const destinationColIndex = currentBoard.columns.findIndex(
          (column) => column.id === taskToUpdate.statusId,
        );

        currentBoard.columns[taskToUpdatePos.col].tasks.splice(
          taskToUpdatePos.row,
          1,
        );

        currentBoard.columns[destinationColIndex].tasks.push(taskToUpdate);
      } else {
        currentBoard.columns[taskToUpdatePos.col].tasks[taskToUpdatePos.row] =
          taskToUpdate;
      }

      return { boards: newBoards };
    }),
}));
