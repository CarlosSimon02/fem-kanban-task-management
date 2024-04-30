import { useAddMyCol, useUpdateMyCol } from "@/api/MyColumnApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormTag,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { getRandomColor } from "@/lib/utils";
import { ColumnType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import ColorPicker from "../ColorPicker";
import { columnFormSchema } from "../schemas";

type ColumnFormType = {
  columnToEdit?: ColumnType; //if undefined, it means form is on "Create New Board" phase
  afterSave?: () => void;
};

type ColumnData = z.infer<typeof columnFormSchema>;

const ColumnForm = ({ columnToEdit, afterSave }: ColumnFormType) => {
  const { updateCol } = useUpdateMyCol();
  const { addCol } = useAddMyCol();
  const form = useForm<ColumnData>({
    resolver: zodResolver(columnFormSchema),
    defaultValues: columnToEdit || {
      id: uuidv4(),
      color: getRandomColor(),
      name: "",
      tasks: [],
    },
  });

  const onSave = (colData: ColumnData) => {
    if (columnToEdit) {
      updateCol(colData as unknown as ColumnType);
    } else {
      addCol(colData as unknown as ColumnType);
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
          {columnToEdit ? "Save Changes" : "Create New Column"}
        </button>
      </FormTag>
    </Form>
  );
};

export default ColumnForm;
