"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormData } from "../schema";
import { FormField } from "@/components/forms/form-field";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/forms/submit-button";
import { toast } from "sonner";

export function ProfileForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "Alex Morgan", email: "alex@signaldesk.io", timezone: "America/New_York" },
  });

  const onSubmit = async (_data: ProfileFormData) => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Profile updated successfully");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-5">
      <FormField label="Full Name" htmlFor="name" error={errors.name?.message} required>
        <Input id="name" {...register("name")} error={!!errors.name} />
      </FormField>
      <FormField label="Email" htmlFor="email" error={errors.email?.message} required>
        <Input id="email" type="email" {...register("email")} error={!!errors.email} />
      </FormField>
      <FormField label="Timezone" htmlFor="timezone" error={errors.timezone?.message} required>
        <Input id="timezone" {...register("timezone")} error={!!errors.timezone} />
      </FormField>
      <SubmitButton isSubmitting={isSubmitting}>Save Changes</SubmitButton>
    </form>
  );
}
