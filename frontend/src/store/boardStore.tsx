import { boards as JSONDataBoards } from "@/data/data.json";
import { BoardType, ColumnType, TaskType } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

type BoardState = {
  boards: BoardType[];
  currentBoardIndex: number | null;
};

type BoardStore = BoardState & {
  updateLocalStorage: (state: BoardState) => void;
  initBoardState: () => void;
  setCurrentBoardIndex: (index: number) => void;
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

const getJSONDataBoards = () => {
  return JSONDataBoards.map((board) => ({
    ...board,
    id: uuidv4(),
    columns: board.columns.map((column) => {
      const columnId = uuidv4();

      return {
        ...column,
        id: columnId,
        tasks: column.tasks.map((task) => ({
          id: uuidv4(),
          title: task.title,
          description: task.description,
          statusId: columnId,
          subtasks: task.subtasks.map((subtask) => ({
            ...subtask,
            id: uuidv4(),
          })),
        })),
      };
    }),
  }));
};

export const useBoardStore = create<BoardStore>()((set) => ({
  boards: [],
  currentBoardIndex: null,
  updateLocalStorage: (state) =>
    localStorage.setItem("boardState", JSON.stringify(state)),
  initBoardState: () =>
    set((state) => {
      const storedBoardState = localStorage.getItem("boardState");
      let newState: BoardState;

      if (storedBoardState) {
        newState = JSON.parse(storedBoardState) as BoardState;
      } else {
        const boards = getJSONDataBoards();
        newState = {
          boards,
          currentBoardIndex: boards.length ? 0 : null,
        };
      }

      state.updateLocalStorage(newState);
      return newState;
    }),
  setCurrentBoardIndex: (index) =>
    set((state) => {
      const newState = { boards: state.boards, currentBoardIndex: index };
      state.updateLocalStorage(newState);
      return newState;
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

      const newState = {
        boards: newBoards,
        currentBoardIndex: state.currentBoardIndex,
      };
      state.updateLocalStorage(newState);
      return newState;
    }),
  addBoard: (boardToAdd) =>
    set((state) => {
      const newBoards = [...state.boards, boardToAdd];

      const newState = {
        boards: newBoards,
        currentBoardIndex: newBoards.length - 1,
      };
      state.updateLocalStorage(newState);
      return newState;
    }),
  deleteBoard: (boardIdToDelete) =>
    set((state) => {
      const newBoards = state.boards.filter(
        (board) => board.id !== boardIdToDelete,
      );
      let currentBoardIndex = state.currentBoardIndex;
      if (state.currentBoardIndex !== null && newBoards.length) {
        currentBoardIndex = Math.min(
          state.currentBoardIndex,
          newBoards.length - 1,
        );
      } else {
        currentBoardIndex = null;
      }

      const newState = { boards: newBoards, currentBoardIndex };
      state.updateLocalStorage(newState);
      return newState;
    }),
  addCol: (colToAdd) =>
    set((state) => {
      if (state.currentBoardIndex === null) return state;
      const newBoards = [...state.boards];
      const currentBoard = newBoards[state.currentBoardIndex];
      const updatedColumns = [...currentBoard.columns, colToAdd];
      currentBoard.columns = updatedColumns;

      const newState = {
        boards: newBoards,
        currentBoardIndex: state.currentBoardIndex,
      };
      state.updateLocalStorage(newState);
      return newState;
    }),
  deleteCol: (colIdToDelete) =>
    set((state) => {
      if (state.currentBoardIndex === null) return state;
      const newBoards = [...state.boards];
      const currentBoard = newBoards[state.currentBoardIndex];
      currentBoard.columns = currentBoard.columns.filter(
        (col) => col.id !== colIdToDelete,
      );

      const newState = {
        boards: newBoards,
        currentBoardIndex: state.currentBoardIndex,
      };
      state.updateLocalStorage(newState);
      return newState;
    }),
  updateCol: (colToUpdate) =>
    set((state) => {
      if (state.currentBoardIndex === null) return state;
      const newBoards = [...state.boards];
      const currentBoard = newBoards[state.currentBoardIndex];
      const colIndex = currentBoard.columns.findIndex(
        (col) => col.id === colToUpdate.id,
      );
      if (colIndex !== -1) {
        currentBoard.columns[colIndex] = colToUpdate;
      }

      const newState = {
        boards: newBoards,
        currentBoardIndex: state.currentBoardIndex,
      };
      state.updateLocalStorage(newState);
      return newState;
    }),
  addTask: (taskToAdd) =>
    set((state) => {
      if (state.currentBoardIndex === null) return state;
      const newBoards = [...state.boards];
      const currentBoard = newBoards[state.currentBoardIndex];
      const destColIndex = currentBoard.columns.findIndex(
        (col) => col.id === taskToAdd.statusId,
      );
      currentBoard.columns[destColIndex].tasks.push(taskToAdd);

      const newState = {
        boards: newBoards,
        currentBoardIndex: state.currentBoardIndex,
      };
      state.updateLocalStorage(newState);
      return newState;
    }),
  deleteTask: (taskIdToDelete) =>
    set((state) => {
      if (state.currentBoardIndex === null) return state;
      const newBoards = [...state.boards];
      const currentBoard = newBoards[state.currentBoardIndex];
      const taskPos = findTaskPosition(currentBoard, taskIdToDelete);
      if (taskPos.col !== -1 && taskPos.row !== -1) {
        currentBoard.columns[taskPos.col].tasks.splice(taskPos.row, 1);
      }

      const newState = {
        boards: newBoards,
        currentBoardIndex: state.currentBoardIndex,
      };
      state.updateLocalStorage(newState);
      return newState;
    }),
  updateTask: (taskToUpdate) =>
    set((state) => {
      if (state.currentBoardIndex === null) return state;
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

      const newState = {
        boards: newBoards,
        currentBoardIndex: state.currentBoardIndex,
      };
      state.updateLocalStorage(newState);
      return newState;
    }),
}));
