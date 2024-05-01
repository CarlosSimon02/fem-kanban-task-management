import { useBoardStore } from "@/store/boardStore";
import { ColumnType } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useUpdateMyCol = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const updateMyCol = async (colToUpdate: ColumnType) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/column`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ colToUpdate }),
    });

    if (!response.ok) {
      throw new Error("Failed to update col");
    }

    return response.json();
  };

  const {
    mutateAsync: updateApiCol,
    isLoading,
    error,
    reset,
  } = useMutation(updateMyCol);
  const updateStoreCol = useBoardStore((state) => state.updateCol);
  const updateBoardLocalStorage = useBoardStore(
    (state) => state.updateLocalStorage,
  );
  const updateCol = async (colToUpdate: ColumnType) => {
    if (isLoading) return;
    if (isAuthenticated) {
      if (!navigator.onLine) {
        toast.error(
          "Error: Unable to establish internet connection. Please check your network settings and try again",
        );
        return;
      }
      const { colToUpdate: colToUpdateApi } = await updateApiCol(colToUpdate);
      updateStoreCol(colToUpdateApi);
    } else {
      updateStoreCol(colToUpdate);
      updateBoardLocalStorage();
    }
  };

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    updateCol,
  };
};

export const useAddMyCol = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const addMyCol = async (colToAdd: ColumnType) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/column`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ colToAdd }),
    });

    if (!response.ok) {
      throw new Error("Failed to update col");
    }

    return response.json();
  };

  const {
    mutateAsync: addApiCol,
    isLoading,
    error,
    reset,
  } = useMutation(addMyCol);
  const addStoreCol = useBoardStore((state) => state.addCol);
  const updateBoardLocalStorage = useBoardStore(
    (state) => state.updateLocalStorage,
  );
  const addCol = async (colToAdd: ColumnType) => {
    if (isLoading) return;
    if (isAuthenticated) {
      if (!navigator.onLine) {
        toast.error(
          "Error: Unable to establish internet connection. Please check your network settings and try again",
        );
        return;
      }
      const { colToAdd: colToAddApi } = await addApiCol(colToAdd);
      addStoreCol(colToAddApi);
    } else {
      addStoreCol(colToAdd);
      updateBoardLocalStorage();
    }
  };

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    addCol,
  };
};

export const useDeleteMyCol = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const deleteMyCol = async (colIdToDelete: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/column`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ colIdToDelete }),
    });

    if (!response.ok) {
      throw new Error("Failed to update col");
    }

    return response.json();
  };

  const {
    mutateAsync: deleteApiCol,
    isLoading,
    error,
    reset,
  } = useMutation(deleteMyCol);
  const deleteStoreCol = useBoardStore((state) => state.deleteCol);
  const updateBoardLocalStorage = useBoardStore(
    (state) => state.updateLocalStorage,
  );
  const deleteCol = async (colIdToDelete: string) => {
    if (isLoading) return;
    if (isAuthenticated) {
      if (!navigator.onLine) {
        toast.error(
          "Error: Unable to establish internet connection. Please check your network settings and try again",
        );
        return;
      }
      const { colIdToDelete: colIdToDeleteApi } =
        await deleteApiCol(colIdToDelete);
      deleteStoreCol(colIdToDeleteApi);
    } else {
      deleteStoreCol(colIdToDelete);
      updateBoardLocalStorage();
    }
  };

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    deleteCol,
  };
};
