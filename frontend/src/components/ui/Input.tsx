import * as React from "react";

import { cn } from "@/lib/utils";
import { useFormField } from "./Form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { error } = useFormField();

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-[0.25rem] border-[0.09375rem] border-input bg-primary px-4 py-2 text-sm text-primary-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary-foreground placeholder:opacity-25 focus-visible:border-accent focus-visible:!outline-none disabled:cursor-not-allowed disabled:opacity-50",
          error && "!border-destructive caret-destructive",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
