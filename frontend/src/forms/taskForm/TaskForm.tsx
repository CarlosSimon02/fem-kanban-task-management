import StatusDropdown from "@/components/StatusDropdown";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormTag,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useBoardStore } from "@/store/boardStore";
import { TaskType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { taskFormSchema } from "../schemas";
import SubtasksSection from "./SubtasksSection";

type TaskFormType = {
  taskToEdit?: TaskType; //if undefined, it means form is on "Create New Board" phase
  afterSave?: () => void;
};

type TaskData = z.infer<typeof taskFormSchema>;

const TaskForm = ({ taskToEdit, afterSave }: TaskFormType) => {
  const updateTask = useBoardStore((state) => state.updateTask);
  const addTask = useBoardStore((state) => state.addTask);
  const form = useForm<TaskData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: taskToEdit || {
      id: uuidv4(),
      title: "",
      description: "",
      statusId: "",
      subtasks: [
        {
          id: uuidv4(),
          title: "",
          isCompleted: false,
        },
        {
          id: uuidv4(),
          title: "",
          isCompleted: false,
        },
      ],
    },
  });

  const onSave = (taskData: TaskData) => {
    if (taskToEdit) {
      updateTask(taskData as unknown as TaskType);
    } else {
      addTask(taskData as unknown as TaskType);
    }

    afterSave && afterSave();
  };

  return (
    <Form {...form}>
      <FormTag onSubmit={form.handleSubmit(onSave)}>
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Take coffee break" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubtasksSection />
        <FormField
          name="statusId"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <StatusDropdown
                  className={
                    fieldState.error && "!border-destructive caret-destructive"
                  }
                  currentStatusId={field.value}
                  onSelect={(value) => {
                    if (value) {
                      field.onChange(value);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          type="submit"
          className="clickable flex items-center justify-center rounded-full bg-accent p-2 text-sm font-bold text-accent-foreground hover:bg-accent-hover"
        >
          {taskToEdit ? "Save Changes" : "Create New Task"}
        </button>
      </FormTag>
    </Form>
  );
};

export default TaskForm;
