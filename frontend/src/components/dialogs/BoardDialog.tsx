import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import BoardForm from "@/forms/boardForm/BoardForm";
import { BoardType } from "@/types";
import { useState } from "react";

type BoardDialogProps = React.ComponentPropsWithoutRef<typeof Dialog> & {
  boardToEdit?: BoardType;
  onSave?: () => void;
};

const BoardDialog = ({
  children,
  boardToEdit,
  open,
  onOpenChange,
  onSave,
}: BoardDialogProps) => {
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
            {boardToEdit ? "Edit Board" : "Add New Board"}
          </DialogTitle>
          <DialogClose />
        </DialogHeader>
        <BoardForm
          boardToEdit={boardToEdit}
          afterSave={
            onSave !== undefined ? onSave : () => setDefaultOpen(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default BoardDialog;
