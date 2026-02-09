"use client";

import { cn } from "@/lib/utils/cn";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  error,
  description,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="block text-body-sm font-medium text-text"
      >
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </label>
      {description && (
        <p className="text-caption text-text-muted">{description}</p>
      )}
      {children}
      {error && (
        <p className="text-caption text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
