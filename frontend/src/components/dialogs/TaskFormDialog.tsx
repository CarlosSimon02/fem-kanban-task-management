import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import TaskForm from "@/forms/taskForm/TaskForm";
import { TaskType } from "@/types";
import { useState } from "react";

type TaskFormDialog = React.ComponentPropsWithoutRef<typeof Dialog> & {
  taskToEdit?: TaskType;
  onSave?: () => void;
};

const TaskFormDialog = ({
  children,
  taskToEdit,
  open,
  onOpenChange,
  onSave,
}: TaskFormDialog) => {
  const [defaultOpen, setDefaultOpen] = useState(false);

  return (
    <Dialog
      open={open !== undefined ? open : defaultOpen}
      onOpenChange={onOpenChange !== undefined ? onOpenChange : setDefaultOpen}
    >
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{taskToEdit ? "Edit Task" : "Add New Task"}</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <TaskForm
          taskToEdit={taskToEdit}
          afterSave={
            onSave !== undefined ? onSave : () => setDefaultOpen(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
