import { useDialog } from "@/hooks/useDialog";
import { TaskType } from "@/types";
import { ReactNode } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/ContextMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropDownMenu";
import DeleteTaskAlert from "./DeleteTaskAlert";
import TaskFormDialog from "./TaskFormDialog";

type TaskOptionsContextMenuProps = {
  children: ReactNode;
  task: TaskType;
  onSelect?: () => void;
};

export const TaskOptionsContextMenu = ({
  children,
  task,
  onSelect,
}: TaskOptionsContextMenuProps) => {
  const taskFormDialog = useDialog<HTMLDivElement>();
  const deleteTaskAlertDialog = useDialog<HTMLDivElement>();

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            onSelect={() => onSelect && onSelect()}
            {...taskFormDialog.triggerProps}
          >
            Edit Task
          </ContextMenuItem>
          <ContextMenuItem
            onSelect={() => onSelect && onSelect()}
            className="text-destructive focus:text-destructive"
            {...deleteTaskAlertDialog.triggerProps}
          >
            Delete Task
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <TaskFormDialog
        taskToEdit={task}
        onSave={taskFormDialog.dismiss}
        {...taskFormDialog.dialogProps}
      />
      <DeleteTaskAlert
        taskToDelete={task}
        {...deleteTaskAlertDialog.dialogProps}
      />
    </>
  );
};

type DialogTriggerProps = {
  ref: React.RefObject<HTMLDivElement>;
  onClick: () => void;
};

type TaskOptionsDropdownMenuProps = {
  children: ReactNode;
  task: TaskType;
  taskFormDialogTriggerProps: DialogTriggerProps;
  deleteTaskAlertDialogTriggerProps: DialogTriggerProps;
  onSelect?: () => void;
};

export const TaskOptionsDropdownMenu = ({
  children,
  onSelect,
  taskFormDialogTriggerProps,
  deleteTaskAlertDialogTriggerProps,
}: TaskOptionsDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={() => onSelect && onSelect()}
          {...taskFormDialogTriggerProps}
        >
          Edit Task
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => onSelect && onSelect()}
          className="text-destructive focus:text-destructive"
          {...deleteTaskAlertDialogTriggerProps}
        >
          Delete Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
