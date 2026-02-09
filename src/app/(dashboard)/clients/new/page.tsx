"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  nextWizardStep,
  prevWizardStep,
  setWizardStep,
  updateWizardDraft,
  resetWizard,
} from "@/store/slices/workflow-slice";
import { useCreateClient } from "@/features/clients/hooks";
import {
  onboardingStep1Schema,
  onboardingStep2Schema,
  onboardingStep3Schema,
  onboardingStep4Schema,
} from "@/features/clients/schema";
import { WizardShell } from "@/components/forms/wizard-shell";
import { FormField } from "@/components/forms/form-field";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const steps = [
  { id: "basics", label: "Basics" },
  { id: "details", label: "Details" },
  { id: "project", label: "Project" },
  { id: "confirm", label: "Confirm" },
];

type StepData = Record<string, unknown>;

function Step1({ draft, onSave }: { draft: StepData; onSave: (_d: StepData) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(onboardingStep1Schema),
    defaultValues: { name: (draft.name as string) ?? "", email: (draft.email as string) ?? "", company: (draft.company as string) ?? "" },
  });
  return (
    <form id="wizard-step" onSubmit={handleSubmit(onSave)} className="space-y-5">
      <FormField label="Full Name" htmlFor="onb-name" error={errors.name?.message} required>
        <Input id="onb-name" {...register("name")} placeholder="John Doe" error={!!errors.name} />
      </FormField>
      <FormField label="Email" htmlFor="onb-email" error={errors.email?.message} required>
        <Input id="onb-email" type="email" {...register("email")} placeholder="john@company.com" error={!!errors.email} />
      </FormField>
      <FormField label="Company" htmlFor="onb-company" error={errors.company?.message} required>
        <Input id="onb-company" {...register("company")} placeholder="Acme Corp" error={!!errors.company} />
      </FormField>
    </form>
  );
}

function Step2({ draft, onSave }: { draft: StepData; onSave: (_d: StepData) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(onboardingStep2Schema),
    defaultValues: { industry: (draft.industry as string) ?? "", phone: (draft.phone as string) ?? "", website: (draft.website as string) ?? "" },
  });
  return (
    <form id="wizard-step" onSubmit={handleSubmit(onSave)} className="space-y-5">
      <FormField label="Industry" htmlFor="onb-industry" error={errors.industry?.message} required>
        <Input id="onb-industry" {...register("industry")} placeholder="Technology" error={!!errors.industry} />
      </FormField>
      <FormField label="Phone" htmlFor="onb-phone" error={errors.phone?.message}>
        <Input id="onb-phone" {...register("phone")} placeholder="+1 555-0100" />
      </FormField>
      <FormField label="Website" htmlFor="onb-website" error={errors.website?.message}>
        <Input id="onb-website" {...register("website")} placeholder="https://company.com" />
      </FormField>
    </form>
  );
}

function Step3({ draft, onSave }: { draft: StepData; onSave: (_d: StepData) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(onboardingStep3Schema),
    defaultValues: { notes: (draft.notes as string) ?? "", projectType: (draft.projectType as string) ?? "", budget: (draft.budget as string) ?? "" },
  });
  return (
    <form id="wizard-step" onSubmit={handleSubmit(onSave)} className="space-y-5">
      <FormField label="Project Type" htmlFor="onb-projectType" error={errors.projectType?.message} required>
        <Input id="onb-projectType" {...register("projectType")} placeholder="Website Redesign" error={!!errors.projectType} />
      </FormField>
      <FormField label="Budget Range" htmlFor="onb-budget" error={errors.budget?.message} required>
        <Input id="onb-budget" {...register("budget")} placeholder="$10,000 - $50,000" error={!!errors.budget} />
      </FormField>
      <FormField label="Notes" htmlFor="onb-notes" error={errors.notes?.message}>
        <Input id="onb-notes" {...register("notes")} placeholder="Any additional context..." />
      </FormField>
    </form>
  );
}

function Step4({ draft, onSave }: { draft: StepData; onSave: (_d: StepData) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(onboardingStep4Schema),
    defaultValues: { agreeToTerms: (draft.agreeToTerms as boolean) ?? false },
  });
  return (
    <form id="wizard-step" onSubmit={handleSubmit(onSave)} className="space-y-6">
      <Card>
        <h3 className="text-heading-3 font-semibold text-text">Review</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 text-body-sm">
          <div><span className="text-text-muted">Name:</span> <span className="font-medium text-text">{draft.name as string}</span></div>
          <div><span className="text-text-muted">Email:</span> <span className="font-medium text-text">{draft.email as string}</span></div>
          <div><span className="text-text-muted">Company:</span> <span className="font-medium text-text">{draft.company as string}</span></div>
          <div><span className="text-text-muted">Industry:</span> <span className="font-medium text-text">{draft.industry as string}</span></div>
          {draft.phone ? <div><span className="text-text-muted">Phone:</span> <span className="font-medium text-text">{String(draft.phone)}</span></div> : null}
          {draft.website ? <div><span className="text-text-muted">Website:</span> <span className="font-medium text-text">{String(draft.website)}</span></div> : null}
          <div><span className="text-text-muted">Project Type:</span> <span className="font-medium text-text">{draft.projectType as string}</span></div>
          <div><span className="text-text-muted">Budget:</span> <span className="font-medium text-text">{draft.budget as string}</span></div>
        </div>
      </Card>
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" {...register("agreeToTerms")} className="h-4 w-4 rounded border-border text-primary focus:ring-ring" />
        <span className="text-body-sm text-text">I agree to the terms of service and privacy policy</span>
      </label>
      {errors.agreeToTerms && (
        <p className="text-caption text-danger" role="alert">{errors.agreeToTerms.message}</p>
      )}
    </form>
  );
}

export default function ClientOnboardingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentStep, draft } = useAppSelector((s) => s.workflow.wizard);
  const createMutation = useCreateClient();

  const handleStepSave = useCallback(
    (data: StepData) => {
      dispatch(updateWizardDraft(data));
      if (currentStep < steps.length - 1) {
        dispatch(nextWizardStep());
      }
    },
    [dispatch, currentStep],
  );

  const handleNext = () => {
    const form = document.getElementById("wizard-step") as HTMLFormElement | null;
    form?.requestSubmit();
  };

  const handlePrev = () => {
    dispatch(prevWizardStep());
  };

  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      dispatch(setWizardStep(step));
    }
  };

  const handleSubmit = async () => {
    const form = document.getElementById("wizard-step") as HTMLFormElement | null;
    if (form) {
      // Trigger validation on the last step
      const submitPromise = new Promise<void>((resolve) => {
        const handler = () => {
          resolve();
          form.removeEventListener("submit", handler);
        };
        form.addEventListener("submit", handler);
        form.requestSubmit();
      });
      await submitPromise;
    }

    // Merge all draft data and create client
    const fullSchema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      company: z.string().min(1),
      industry: z.string().min(1),
      phone: z.string().optional(),
      website: z.string().optional(),
      notes: z.string().optional(),
    });

    const parsed = fullSchema.safeParse(draft);
    if (!parsed.success) {
      toast.error("Please complete all required fields");
      return;
    }

    try {
      await createMutation.mutateAsync(parsed.data);
      toast.success("Client onboarded successfully!");
      dispatch(resetWizard());
      router.push("/clients");
    } catch {
      toast.error("Failed to create client. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-heading-1 font-bold text-text">Onboard New Client</h1>
        <p className="mt-1 text-body text-text-muted">Complete the steps below to set up a new client.</p>
      </div>

      <WizardShell
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
        onNext={handleNext}
        onPrev={handlePrev}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending}
      >
        {currentStep === 0 && <Step1 draft={draft} onSave={handleStepSave} />}
        {currentStep === 1 && <Step2 draft={draft} onSave={handleStepSave} />}
        {currentStep === 2 && <Step3 draft={draft} onSave={handleStepSave} />}
        {currentStep === 3 && <Step4 draft={draft} onSave={handleStepSave} />}
      </WizardShell>
    </div>
  );
}
