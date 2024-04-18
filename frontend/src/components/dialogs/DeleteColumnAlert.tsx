import { useBoardStore } from "@/store/boardStore";
import { ColumnType } from "@/types";
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

type DeleteColumnAlertProps = React.ComponentPropsWithoutRef<
  typeof AlertDialog
> & {
  columnToDelete: ColumnType;
};

const DeleteColumnAlert = ({
  children,
  columnToDelete,
  open,
  onOpenChange,
}: DeleteColumnAlertProps) => {
  const [defaultOpen, setDefaultOpen] = useState(false);
  const deleteColToCurrentBoard = useBoardStore(
    (state) => state.deleteColToCurrentBoard,
  );

  return (
    <AlertDialog
      open={open !== undefined ? open : defaultOpen}
      onOpenChange={onOpenChange !== undefined ? onOpenChange : setDefaultOpen}
    >
      {children && <AlertDialogTrigger>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this column?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the ‘{columnToDelete.name}’ column?
            This action will remove all tasks and cannot be reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => deleteColToCurrentBoard(columnToDelete.id)}
          >
            Delete
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteColumnAlert;
