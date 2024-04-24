import * as React from "react";

import { cn } from "@/lib/utils";
import { useFormField } from "./Form";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const { error } = useFormField();

    return (
      <textarea
        className={cn(
          "flex h-[7rem] w-full rounded-[0.25rem] border-[0.09375rem] border-input bg-primary px-4 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground placeholder:opacity-25 focus-visible:border-accent focus-visible:!outline-none disabled:cursor-not-allowed disabled:opacity-50",
          error && "!border-destructive caret-destructive",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
