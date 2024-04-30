import { useDeleteMyCol } from "@/api/MyColumnApi";
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
  const { deleteCol } = useDeleteMyCol();

  return (
    <AlertDialog
      open={open !== undefined ? open : defaultOpen}
      onOpenChange={onOpenChange !== undefined ? onOpenChange : setDefaultOpen}
    >
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this column?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the ‘{columnToDelete.name}’ column
            and its associated task(s)? This action cannot be reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => deleteCol(columnToDelete.id)}>
            Delete
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteColumnAlert;
