import { useBoardStore } from "@/store/boardStore";
import { BoardType } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyBoards = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyBoards = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/boards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get boards");
    }

    return response.json();
  };

  const { mutateAsync: getBoards, isLoading } = useMutation(getMyBoards);

  return {
    getBoards,
    isLoading,
  };
};

export const useSetMyBoards = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const setMyBoards = async (boards: BoardType[]) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/boards`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ boards }),
    });

    if (!response.ok) {
      throw new Error("Failed to update board");
    }

    return response.json();
  };

  const {
    mutateAsync: setApiBoards,
    isLoading,
    error,
    reset,
  } = useMutation(setMyBoards);
  const storeBoards = useBoardStore((state) => state.boards);
  const setStoreBoards = useBoardStore((state) => state.setBoards);
  const updateBoardLocalStorage = useBoardStore(
    (state) => state.updateLocalStorage,
  );
  const setBoards = async (boards: BoardType[]) => {
    if (isLoading) return;
    if (isAuthenticated) {
      if (!navigator.onLine) {
        toast.error(
          "Error: Unable to establish internet connection. Please check your network settings and try again",
        );
        return;
      }
      const prevBoardState = JSON.parse(JSON.stringify(storeBoards));
      try {
        setStoreBoards(boards);
        await setApiBoards(boards);
      } catch (error) {
        setStoreBoards(prevBoardState);
      }
    } else {
      setStoreBoards(boards);
      updateBoardLocalStorage();
    }
  };

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    setBoards,
  };
};

export const useUpdateMyBoard = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const updateMyBoard = async (boardToUpdate: BoardType) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/boards/board`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ boardToUpdate }),
    });

    if (!response.ok) {
      throw new Error("Failed to update board");
    }

    return response.json();
  };

  const {
    mutateAsync: updateApiBoard,
    isLoading,
    error,
    reset,
  } = useMutation(updateMyBoard);
  const storeBoards = useBoardStore((state) => state.boards);
  const updateStoreBoard = useBoardStore((state) => state.updateBoard);
  const updateBoardLocalStorage = useBoardStore(
    (state) => state.updateLocalStorage,
  );
  const updateBoard = async (boardToUpdate: BoardType) => {
    if (isLoading) return;
    if (isAuthenticated) {
      if (!navigator.onLine) {
        toast.error(
          "Error: Unable to establish internet connection. Please check your network settings and try again",
        );
        return;
      }
      const prevBoardState = JSON.parse(
        JSON.stringify(
          storeBoards.find((board) => board.id === boardToUpdate.id),
        ),
      );
      try {
        updateStoreBoard(boardToUpdate);
        await updateApiBoard(boardToUpdate);
      } catch (error) {
        updateStoreBoard(prevBoardState);
      }
    } else {
      updateStoreBoard(boardToUpdate);
      updateBoardLocalStorage();
    }
  };

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    updateBoard,
  };
};

export const useAddMyBoard = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const addMyBoard = async (boardToAdd: BoardType) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/boards/board`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ boardToAdd }),
    });

    if (!response.ok) {
      throw new Error("Failed to add board");
    }

    return response.json();
  };

  const {
    mutateAsync: addApiBoard,
    isLoading,
    error,
    reset,
  } = useMutation(addMyBoard);
  const addStoreBoard = useBoardStore((state) => state.addBoard);
  const updateBoardLocalStorage = useBoardStore(
    (state) => state.updateLocalStorage,
  );
  const addBoard = async (boardToAdd: BoardType) => {
    if (isLoading) return;
    if (isAuthenticated) {
      if (!navigator.onLine) {
        toast.error(
          "Error: Unable to establish internet connection. Please check your network settings and try again",
        );
        return;
      }
      const { boardToAdd: boardToAddApi } = await addApiBoard(boardToAdd);
      addStoreBoard(boardToAddApi);
    } else {
      addStoreBoard(boardToAdd);
      updateBoardLocalStorage();
    }
  };

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    addBoard,
  };
};

export const useDeleteMyBoard = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const deleteMyBoard = async (boardIdToDelete: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/boards/board`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ boardIdToDelete }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete board");
    }

    return response.json();
  };

  const {
    mutateAsync: deleteApiBoard,
    isLoading,
    error,
    reset,
  } = useMutation(deleteMyBoard);
  const deleteStoreBoard = useBoardStore((state) => state.deleteBoard);
  const updateBoardLocalStorage = useBoardStore(
    (state) => state.updateLocalStorage,
  );
  const deleteBoard = async (boardIdToDelete: string) => {
    if (isLoading) return;
    if (isAuthenticated) {
      if (!navigator.onLine) {
        toast.error(
          "Error: Unable to establish internet connection. Please check your network settings and try again",
        );
        return;
      }
      const { boardIdToDelete: boardIdToDeleteApi } =
        await deleteApiBoard(boardIdToDelete);
      deleteStoreBoard(boardIdToDeleteApi);
    } else {
      deleteStoreBoard(boardIdToDelete);
      updateBoardLocalStorage();
    }
  };

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    deleteBoard,
  };
};
