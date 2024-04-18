import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import ColumnForm from "@/forms/columnForm/ColumnForm";
import { ColumnType } from "@/types";
import { useState } from "react";

type ColumnDialogProps = React.ComponentPropsWithoutRef<typeof Dialog> & {
  columnToEdit?: ColumnType;
  onSave?: () => void;
};

const ColumnDialog = ({
  children,
  columnToEdit,
  open,
  onOpenChange,
  onSave,
}: ColumnDialogProps) => {
  const [defaultOpen, setDefaultOpen] = useState(false);

  return (
    <Dialog
      open={open !== undefined ? open : defaultOpen}
      onOpenChange={onOpenChange !== undefined ? onOpenChange : setDefaultOpen}
    >
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {columnToEdit ? "Edit Column" : "Add New Column"}
          </DialogTitle>
          <DialogClose />
        </DialogHeader>
        <ColumnForm
          columnToEdit={columnToEdit}
          afterSave={
            onSave !== undefined ? onSave : () => setDefaultOpen(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default ColumnDialog;
