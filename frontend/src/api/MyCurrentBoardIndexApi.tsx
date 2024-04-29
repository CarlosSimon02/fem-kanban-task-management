import { useBoardStore } from "@/store/boardStore";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyCurrentBoardIndex = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyCurrentBoardIndex = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/current-board-index`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get current board index");
    }

    return response.json();
  };

  const { mutateAsync: getCurrentBoardIndex, isLoading } = useMutation(
    getMyCurrentBoardIndex,
  );

  return {
    getCurrentBoardIndex,
    isLoading,
  };
};

export const useSetMyCurrentBoardIndex = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const setMyApiCurrentBoardIndex = async (
    currentBoardIndex: number | null | undefined,
  ) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/current-board-index`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentBoardIndex }),
    });

    if (!response.ok) {
      throw new Error("Failed to set current board index");
    }

    return response.json();
  };

  const {
    mutateAsync: setApiCurrentBoardIndex,
    isLoading,
    error,
    reset,
  } = useMutation(setMyApiCurrentBoardIndex);
  const storeCurrentBoardIndex = useBoardStore(
    (state) => state.currentBoardIndex,
  );
  const setStoreCurrentBoardIndex = useBoardStore(
    (state) => state.setCurrentBoardIndex,
  );
  const setCurrentBoardIndex = async (
    currentBoardIndex: number | null | undefined,
  ) => {
    if (isLoading) return;
    if (isAuthenticated) {
      if (!navigator.onLine) {
        toast.error(
          "Error: Unable to establish internet connection. Please check your network settings and try again",
        );
        return;
      }
      const prevCurrentBoardIndex = storeCurrentBoardIndex;
      try {
        setStoreCurrentBoardIndex(currentBoardIndex);
        await setApiCurrentBoardIndex(currentBoardIndex);
      } catch (error) {
        setStoreCurrentBoardIndex(prevCurrentBoardIndex);
      }
    } else {
      setStoreCurrentBoardIndex(currentBoardIndex);
    }
  };

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    setCurrentBoardIndex,
  };
};
