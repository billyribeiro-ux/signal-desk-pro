"use client";

import { cn } from "@/lib/utils/cn";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <fieldset className={cn("space-y-4", className)}>
      <div className="space-y-1">
        <legend className="text-heading-3 font-semibold text-text">
          {title}
        </legend>
        {description && (
          <p className="text-body-sm text-text-muted">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
}
