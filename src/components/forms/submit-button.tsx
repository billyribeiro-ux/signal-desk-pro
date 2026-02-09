"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

interface SubmitButtonProps {
  isSubmitting?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function SubmitButton({
  isSubmitting = false,
  children = "Submit",
  className,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      isLoading={isSubmitting}
      className={cn("min-w-[120px]", className)}
    >
      {children}
    </Button>
  );
}
