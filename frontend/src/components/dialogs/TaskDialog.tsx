import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { useDialog } from "@/hooks/useDialog";
import { cn } from "@/lib/utils";
import { useBoardStore } from "@/store/boardStore";
import { TaskType } from "@/types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import StatusDropdown from "../StatusDropdown";
import { Checkbox } from "../ui/Checkbox";
import { VerticalEllipsis } from "../ui/Icons";
import DeleteTaskAlert from "./DeleteTaskAlert";
import TaskFormDialog from "./TaskFormDialog";
import { TaskOptionsDropdownMenu } from "./TaskOptions";

type TaskDialogProps = React.ComponentPropsWithoutRef<typeof Dialog> & {
  task: TaskType;
};

const TaskDialog = ({
  children,
  task,
  open,
  onOpenChange,
}: TaskDialogProps) => {
  const [defaultOpen, setDefaultOpen] = useState(false);
  const taskFormDialog = useDialog<HTMLDivElement>();
  const deleteTaskAlertDialog = useDialog<HTMLDivElement>();
  const updateTask = useBoardStore((state) => state.updateTask);
  const completedSubtasksCount = task.subtasks.filter(
    ({ isCompleted }) => isCompleted,
  ).length;
  const subTasksCount = task.subtasks.length;

  const selectStatusHandle = (statusId: string) => {
    const newTask = { ...task };
    newTask.statusId = statusId;
    updateTask(newTask);
  };

  return (
    <>
      <Dialog
        open={open !== undefined ? open : defaultOpen}
        onOpenChange={
          onOpenChange !== undefined ? onOpenChange : setDefaultOpen
        }
      >
        {children && <DialogTrigger asChild>{children}</DialogTrigger>}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{task.title}</DialogTitle>
            <div className="flex gap-2">
              <TaskOptionsDropdownMenu
                task={task}
                taskFormDialogTriggerProps={taskFormDialog.triggerProps}
                deleteTaskAlertDialogTriggerProps={
                  deleteTaskAlertDialog.triggerProps
                }
                onSelect={() => {
                  setDefaultOpen(false);
                }}
              >
                <button className="clickable group flex w-[2rem] justify-center">
                  <VerticalEllipsis className="h-[1.25rem] [&_g]:fill-secondary-foreground group-hover:[&_g]:fill-primary-foreground" />
                  <VisuallyHidden>Close</VisuallyHidden>
                </button>
              </TaskOptionsDropdownMenu>
              <DialogClose />
            </div>
          </DialogHeader>
          {task.description && (
            <DialogDescription>{task.description}</DialogDescription>
          )}
          <div>
            <p className="mb-4 text-xs font-bold">
              Subtasks ({completedSubtasksCount} of {subTasksCount})
            </p>
            <ul className="grid gap-2">
              {task.subtasks.map((subtask) => {
                const checkedChangeHandler = (checked: boolean) => {
                  const newTask = { ...task };
                  const subTaskIndex = newTask.subtasks.findIndex(
                    ({ id }) => id === subtask.id,
                  );

                  if (subTaskIndex === -1) return;

                  newTask.subtasks[subTaskIndex].isCompleted = checked;
                  updateTask(newTask);
                };

                return (
                  <li
                    key={subtask.id}
                    className="flex items-center gap-4 rounded bg-secondary p-3"
                  >
                    <Checkbox
                      id={subtask.id}
                      checked={subtask.isCompleted}
                      onCheckedChange={checkedChangeHandler}
                    />
                    <label
                      htmlFor={subtask.id}
                      className={cn(
                        "text-xs font-bold peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                        subtask.isCompleted
                          ? "line-through opacity-50"
                          : "text-primary-foreground",
                      )}
                    >
                      {subtask.title}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold">Current Status</p>
            <StatusDropdown
              currentStatusId={task.statusId}
              onSelect={selectStatusHandle}
            />
          </div>
        </DialogContent>
      </Dialog>
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

export default TaskDialog;
