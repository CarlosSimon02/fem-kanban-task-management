import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Cross } from "@/components/ui/Icons";
import { Input } from "@/components/ui/Input";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useFieldArray, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const SubtasksSection = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <FormField
        control={control}
        name="subtasks"
        render={() => (
          <FormItem className="flex w-full flex-col gap-2">
            <FormLabel>Subtasks</FormLabel>
            {fields.map((_, index) => (
              <div key={index} className="flex items-start gap-4">
                <FormField
                  name={`subtasks.${index}.title`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="e.g. Make coffee" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button
                  type="button"
                  className="clickable group mt-[0.8rem]"
                  onClick={() => remove(index)}
                >
                  <Cross className="w-[0.7rem] [&_g]:fill-accent group-hover:[&_g]:fill-accent-hover" />
                  <VisuallyHidden>Close</VisuallyHidden>
                </button>
              </div>
            ))}
          </FormItem>
        )}
      />
      <button
        type="button"
        className="clickable text px-2 text-sm font-bold text-accent hover:text-accent-hover"
        onClick={() => append({ id: uuidv4(), title: "", isCompleted: false })}
      >
        <span aria-hidden>+</span>Add New Subtask
      </button>
    </div>
  );
};

export default SubtasksSection;
