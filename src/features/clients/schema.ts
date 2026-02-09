import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(1, "Company is required"),
  industry: z.string().min(1, "Industry is required"),
  phone: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  notes: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;

export const onboardingStep1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(1, "Company is required"),
});

export const onboardingStep2Schema = z.object({
  industry: z.string().min(1, "Industry is required"),
  phone: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

export const onboardingStep3Schema = z.object({
  notes: z.string().optional(),
  projectType: z.string().min(1, "Project type is required"),
  budget: z.string().min(1, "Budget range is required"),
});

export const onboardingStep4Schema = z.object({
  agreeToTerms: z.literal(true, { message: "You must agree to terms" }),
});
