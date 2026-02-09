import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  timezone: z.string().min(1, "Timezone is required"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
