import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormTag,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useBoardStore } from "@/store/boardStore";
import { TaskType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import ColorPicker from "../ColorPicker";
import { taskFormSchema } from "../schemas";

type TaskFormType = {
  taskToEdit?: TaskType; //if undefined, it means form is on "Create New Board" phase
  afterSave?: () => void;
};

type TaskData = z.infer<typeof taskFormSchema>;

const ColumnForm = ({ taskToEdit, afterSave }: TaskFormType) => {
  const updateColToCurrentBoard = useBoardStore(
    (state) => state.updateColToCurrentBoard,
  );
  const addColToCurrentBoard = useBoardStore(
    (state) => state.addColToCurrentBoard,
  );
  const form = useForm<TaskData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: taskToEdit || {
      id: uuidv4(),
      title: "",
      description: "",
      status: "",
    },
  });

  const onSave = (taskData: TaskData) => {
    if (taskToEdit) {
      updateColToCurrentBoard(taskData as unknown as TaskType);
    } else {
      addColToCurrentBoard(taskData as unknown as TaskType);
    }

    afterSave && afterSave();
  };

  return (
    <Form {...form}>
      <FormTag onSubmit={form.handleSubmit(onSave)}>
        <div className="flex items-start gap-4">
          <FormField
            name="color"
            render={({ field }) => <ColorPicker name="color" field={field} />}
          />
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="e.g. To Do" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <button
          type="submit"
          className="clickable flex items-center justify-center rounded-full bg-accent p-2 text-sm font-bold text-accent-foreground hover:bg-accent-hover"
        >
          {taskToEdit ? "Save Changes" : "Create New Board"}
        </button>
      </FormTag>
    </Form>
  );
};

export default ColumnForm;
