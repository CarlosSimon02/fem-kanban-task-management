import { BoardType, ColumnType } from "@/types";
import { create } from "zustand";

type BoardStore = {
  boards: BoardType[];
  currentBoardIndex: number | null;
  setBoards: (boards: BoardType[]) => void;
  setCurrentBoardIndex: (index: number) => void;
  updateBoard: (boardToUpdate: BoardType) => void;
  addBoard: (boardToAdd: BoardType) => void;
  deleteBoard: (boardIdToDelete: string) => void;
  addColToCurrentBoard: (colToAdd: ColumnType) => void;
  deleteColToCurrentBoard: (colIdToDelete: string) => void;
  updateColToCurrentBoard: (colToUpdate: ColumnType) => void;
};

export const useBoardStore = create<BoardStore>()((set) => ({
  boards: [],
  currentBoardIndex: null,
  setBoards: (boards) => set({ boards }),
  setCurrentBoardIndex: (index) => set({ currentBoardIndex: index }),
  updateBoard: (boardToUpdate) =>
    set((state) => {
      const newBoards = Array.from(state.boards);
      const boardToUpdateIndex = state.boards.findIndex(
        (board) => board.id === boardToUpdate.id,
      );

      if (boardToUpdateIndex === -1) {
        return state;
      }

      newBoards[boardToUpdateIndex] = boardToUpdate;

      return { boards: newBoards };
    }),
  addBoard: (boardToAdd) =>
    set((state) => ({ boards: [...state.boards, boardToAdd] })),
  deleteBoard: (boardIdToDelete) =>
    set((state) => ({
      boards: state.boards.filter((board) => board.id !== boardIdToDelete),
    })),
  addColToCurrentBoard: (colToAdd) =>
    set((state) => {
      const newBoards = Array.from(state.boards);

      if (state.currentBoardIndex === null) return state;

      newBoards[state.currentBoardIndex].columns.push(colToAdd);
      return { boards: newBoards };
    }),
  deleteColToCurrentBoard: (colIdToDelete) =>
    set((state) => {
      const newBoards = Array.from(state.boards);

      if (state.currentBoardIndex === null) return state;

      newBoards[state.currentBoardIndex].columns = newBoards[
        state.currentBoardIndex
      ].columns.filter((column) => column.id !== colIdToDelete);
      console.log("run");
      return { boards: newBoards };
    }),
  updateColToCurrentBoard: (colToUpdate) =>
    set((state) => {
      const newBoards = Array.from(state.boards);

      if (state.currentBoardIndex === null) return state;

      const colToUpdateIndex = state.boards[
        state.currentBoardIndex
      ].columns.findIndex((column) => column.id === colToUpdate.id);

      if (colToUpdateIndex === -1) return state;

      newBoards[state.currentBoardIndex].columns[colToUpdateIndex] =
        colToUpdate;

      return { boards: newBoards };
    }),
}));
