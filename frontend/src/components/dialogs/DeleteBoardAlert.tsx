import { useDeleteMyBoard } from "@/api/MyBoardsApi";
import { BoardType } from "@/types";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertDialog";

type DeleteBoardAlertProps = React.ComponentPropsWithoutRef<
  typeof AlertDialog
> & {
  boardToDelete: BoardType;
};

const DeleteBoardAlert = ({
  children,
  boardToDelete,
  open,
  onOpenChange,
}: DeleteBoardAlertProps) => {
  const [defaultOpen, setDefaultOpen] = useState(false);
  const { deleteBoard } = useDeleteMyBoard();

  return (
    <AlertDialog
      open={open !== undefined ? open : defaultOpen}
      onOpenChange={onOpenChange !== undefined ? onOpenChange : setDefaultOpen}
    >
      {children && <AlertDialogTrigger>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this board?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the ‘{boardToDelete.name}’ board?
            This action will remove all columns and tasks and cannot be
            reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => deleteBoard(boardToDelete.id)}>
            Delete
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBoardAlert;
