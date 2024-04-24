import { z } from "zod";

export const taskFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "This field is required" }),
  description: z.string().min(1, { message: "This field is required" }),
  statusId: z.string().min(1, { message: "This field is required" }),
  subtasks: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(1, { message: "This field is required" }),
      isCompleted: z.boolean(),
    }),
  ),
});

export const columnFormSchema = z.object({
  id: z.string(),
  color: z.string(),
  name: z.string().min(1, { message: "This field is required" }),
  tasks: z.array(taskFormSchema),
});

export const boardFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "This field is required" }),
  columns: z.array(columnFormSchema),
});
