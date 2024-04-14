import { z } from "zod";

export const taskFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "This field is required"),
  description: z.string(),
  status: z.string(),
  subtasks: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      isCompleted: z.boolean(),
    }),
  ),
});

export const columnFormSchema = z.object({
  id: z.string(),
  color: z.string(),
  name: z
    .string()
    .min(1, "This field is required")
    .max(12, "Max characters is 12"),
  tasks: z.array(taskFormSchema),
});

export const boardFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "This field is required"),
  columns: z.array(columnFormSchema),
});
