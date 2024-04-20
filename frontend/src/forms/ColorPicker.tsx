import { FormControl, FormItem } from "@/components/ui/Form";
import { SelectContent, SelectGroup } from "@/components/ui/Select";
import { materialColors } from "@/data/colors";
import * as Select from "@radix-ui/react-select";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type ColorPickerProps<T extends string> = {
  name: T;
  field: ControllerRenderProps<FieldValues, T>;
};

const ColorPicker = <T extends string>({ field }: ColorPickerProps<T>) => {
  return (
    <FormItem>
      <FormControl>
        <Select.Root
          value={field.value}
          onValueChange={(value) => {
            if (value) {
              field.onChange(value);
            }
          }}
        >
          <Select.Trigger
            aria-label="Pick Color"
            className="mt-[0.6rem] h-5 w-5 rounded-full"
            style={{
              backgroundColor: field.value,
            }}
          />
          <SelectContent>
            <SelectGroup className="grid w-[7.5rem] grid-cols-3 gap-1 p-2">
              {materialColors.map((color, index) => (
                <Select.SelectItem
                  key={index}
                  className="h-[2rem] w-[2rem] cursor-pointer rounded-full"
                  value={color}
                  style={{ backgroundColor: color }}
                />
              ))}
            </SelectGroup>
          </SelectContent>
        </Select.Root>
      </FormControl>
    </FormItem>
  );
};

export default ColorPicker;
