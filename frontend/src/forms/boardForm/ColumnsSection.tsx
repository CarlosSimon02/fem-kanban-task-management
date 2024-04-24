import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Cross } from "@/components/ui/Icons";
import { Input } from "@/components/ui/Input";
import { getRandomColor } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useFieldArray, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import ColorPicker from "../ColorPicker";

const ColumnsSection = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <FormField
        control={control}
        name="columns"
        render={() => (
          <FormItem className="flex w-full flex-col gap-2">
            <FormLabel>Columns</FormLabel>
            {fields.map((_, index) => (
              <div key={index} className="flex items-start gap-4">
                <FormField
                  name={`columns.${index}.color`}
                  render={({ field }) => (
                    <ColorPicker
                      name={`columns.${index}.color`}
                      field={field}
                    />
                  )}
                />
                <FormField
                  name={`columns.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="e.g. To Do" {...field} />
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
        onClick={() =>
          append({ id: uuidv4(), name: "", color: getRandomColor() })
        }
      >
        <span aria-hidden>+</span>Add New Column
      </button>
    </div>
  );
};

export default ColumnsSection;
