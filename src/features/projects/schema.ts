import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  clientId: z.string().min(1, "Client is required"),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  startDate: z.string().min(1, "Start date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  budget: z.coerce.number().min(0, "Budget must be positive"),
  tags: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
