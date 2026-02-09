"use client";

import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface FormErrorProps {
  message?: string;
  className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border border-danger/30 bg-danger-muted p-3 text-body-sm text-danger",
        className,
      )}
      role="alert"
    >
      <AlertCircle className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
