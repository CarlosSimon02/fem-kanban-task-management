import { useDeleteMyTask } from "@/api/MyTaskApi";
import { TaskType } from "@/types";
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
  taskToDelete: TaskType;
};

const DeleteBoardAlert = ({
  children,
  taskToDelete,
  open,
  onOpenChange,
}: DeleteBoardAlertProps) => {
  const [defaultOpen, setDefaultOpen] = useState(false);
  const { deleteTask } = useDeleteMyTask();

  return (
    <AlertDialog
      open={open !== undefined ? open : defaultOpen}
      onOpenChange={onOpenChange !== undefined ? onOpenChange : setDefaultOpen}
    >
      {children && <AlertDialogTrigger>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this task?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the ‘{taskToDelete.title}’ task and
            its subtasks? This action cannot be reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => deleteTask(taskToDelete.id)}>
            Delete
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBoardAlert;
