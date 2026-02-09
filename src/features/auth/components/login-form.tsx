"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schema";
import { useAuth } from "@/context/auth-context";
import { FormField } from "@/components/forms/form-field";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/forms/submit-button";
import { FormError } from "@/components/forms/form-error";
import { useState } from "react";

export function LoginForm() {
  const { signIn, isLoading } = useAuth();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "alex@signaldesk.io", password: "password123" },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError("");
    try {
      await signIn(data.email, data.password);
    } catch {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormError message={error} />
      <FormField label="Email" htmlFor="email" error={errors.email?.message} required>
        <Input id="email" type="email" error={!!errors.email} {...register("email")} />
      </FormField>
      <FormField label="Password" htmlFor="password" error={errors.password?.message} required>
        <Input id="password" type="password" error={!!errors.password} {...register("password")} />
      </FormField>
      <SubmitButton isSubmitting={isLoading}>Sign In</SubmitButton>
    </form>
  );
}
