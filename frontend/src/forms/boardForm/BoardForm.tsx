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
import { useBoardStore } from "@/store/boardStore";
import { BoardType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { boardFormSchema } from "../schemas";
import ColumnsSection from "./ColumnsSection";

type BoardFormType = {
  boardToEdit?: BoardType; //if undefined, it means form is on "Create New Board" phase
  afterSave?: () => void;
};

type BoardData = z.infer<typeof boardFormSchema>;

const BoardForm = ({ boardToEdit, afterSave }: BoardFormType) => {
  const updateBoard = useBoardStore((state) => state.updateBoard);
  const addBoard = useBoardStore((state) => state.addBoard);
  const form = useForm<BoardData>({
    resolver: zodResolver(boardFormSchema),
    defaultValues: boardToEdit || {
      id: uuidv4(),
      name: "",
      columns: [
        { id: uuidv4(), name: "To Do", color: "#49C4E5", tasks: [] },
        { id: uuidv4(), name: "Doing", color: "#8471F2", tasks: [] },
        { id: uuidv4(), name: "Done", color: "#67E2AE", tasks: [] },
      ],
    },
  });

  const onSave = (boardData: BoardData) => {
    if (boardToEdit) {
      updateBoard(boardData as unknown as BoardType);
    } else {
      addBoard(boardData as unknown as BoardType);
    }

    afterSave && afterSave();
  };

  return (
    <Form {...form}>
      <FormTag onSubmit={form.handleSubmit(onSave)}>
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Web Design" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ColumnsSection />
        <button
          type="submit"
          className="clickable flex items-center justify-center rounded-full bg-accent p-2 text-sm font-bold text-accent-foreground hover:bg-accent-hover"
        >
          {boardToEdit ? "Save Changes" : "Create New Board"}
        </button>
      </FormTag>
    </Form>
  );
};

export default BoardForm;
