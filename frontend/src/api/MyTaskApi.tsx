import { useBoardStore } from "@/store/boardStore";
import { TaskType } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useUpdateMyTask = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const updateMyTask = async (taskToUpdate: TaskType) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/task`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskToUpdate }),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    return response.json();
  };

  const {
    mutateAsync: updateApiTask,
    isLoading,
    error,
    reset,
  } = useMutation(updateMyTask);
  const updateStoreTask = useBoardStore((state) => state.updateTask);
  const updateBoardLocalStorage = useBoardStore(
    (state) => state.updateLocalStorage,
  );
  const updateTask = async (taskToUpdate: TaskType) => {
    if (isLoading) return;
    if (isAuthenticated) {
      if (!navigator.onLine) {
        toast.error(
          "Error: Unable to establish internet connection. Please check your network settings and try again",
        );
        return;
      }
      const { taskToUpdate: taskToUpdateApi } =
        await updateApiTask(taskToUpdate);
      updateStoreTask(taskToUpdateApi);
    } else {
      updateStoreTask(taskToUpdate);
      updateBoardLocalStorage();
    }
  };

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    updateTask,
  };
};

export const useAddMyTask = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const addMyTask = async (taskToAdd: TaskType) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/task`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskToAdd }),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    return response.json();
  };

  const {
    mutateAsync: addApiTask,
    isLoading,
    error,
    reset,
  } = useMutation(addMyTask);
  const addStoreTask = useBoardStore((state) => state.addTask);
  const updateBoardLocalStorage = useBoardStore(
    (state) => state.updateLocalStorage,
  );
  const addTask = async (taskToAdd: TaskType) => {
    if (isLoading) return;
    if (isAuthenticated) {
      if (!navigator.onLine) {
        toast.error(
          "Error: Unable to establish internet connection. Please check your network settings and try again",
        );
        return;
      }
      const { taskToAdd: taskToAddApi } = await addApiTask(taskToAdd);
      addStoreTask(taskToAddApi);
    } else {
      addStoreTask(taskToAdd);
      updateBoardLocalStorage();
    }
  };

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    addTask,
  };
};

export const useDeleteMyTask = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const deleteMyTask = async (taskIdToDelete: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/task`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskIdToDelete }),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    return response.json();
  };

  const {
    mutateAsync: deleteApiTask,
    isLoading,
    error,
    reset,
  } = useMutation(deleteMyTask);
  const deleteStoreTask = useBoardStore((state) => state.deleteTask);
  const updateBoardLocalStorage = useBoardStore(
    (state) => state.updateLocalStorage,
  );
  const deleteTask = async (taskIdToDelete: string) => {
    if (isLoading) return;
    if (isAuthenticated) {
      if (!navigator.onLine) {
        toast.error(
          "Error: Unable to establish internet connection. Please check your network settings and try again",
        );
        return;
      }
      const { taskIdToDelete: taskIdToDeleteApi } =
        await deleteApiTask(taskIdToDelete);
      deleteStoreTask(taskIdToDeleteApi);
    } else {
      deleteStoreTask(taskIdToDelete);
      updateBoardLocalStorage();
    }
  };

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    deleteTask,
  };
};
