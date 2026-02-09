import { z } from "zod";

export const revisionActionSchema = z.object({
  action: z.enum(["approve", "reject", "request_changes"]),
  comment: z.string().min(1, "Comment is required"),
});

export type RevisionActionData = z.infer<typeof revisionActionSchema>;
