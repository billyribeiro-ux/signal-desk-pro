"use client";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface WizardStep {
  id: string;
  label: string;
}

interface WizardShellProps {
  steps: WizardStep[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function WizardShell({
  steps,
  currentStep,
  onStepClick,
  onNext,
  onPrev,
  onSubmit,
  isSubmitting = false,
  children,
  className,
}: WizardShellProps) {
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className={cn("space-y-8", className)}>
      <nav aria-label="Wizard progress">
        <ol className="flex items-center gap-2">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            return (
              <li key={step.id} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onStepClick?.(index)}
                  disabled={index > currentStep}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-caption font-semibold transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isCompleted && "bg-primary text-text-inverse",
                    isCurrent &&
                      "bg-primary text-text-inverse ring-4 ring-primary-muted",
                    !isCompleted &&
                      !isCurrent &&
                      "bg-elevated text-text-muted",
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </button>
                <span
                  className={cn(
                    "hidden text-body-sm font-medium sm:inline",
                    isCurrent ? "text-text" : "text-text-muted",
                  )}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "hidden h-px w-8 sm:block lg:w-16",
                      isCompleted ? "bg-primary" : "bg-border",
                    )}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="min-h-[300px]">{children}</div>

      <div className="flex items-center justify-between border-t border-border pt-6">
        <Button
          variant="ghost"
          onClick={onPrev}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        {isLastStep ? (
          <Button onClick={onSubmit} isLoading={isSubmitting}>
            Complete Setup
          </Button>
        ) : (
          <Button onClick={onNext}>Continue</Button>
        )}
      </div>
    </div>
  );
}
