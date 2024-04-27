import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

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
