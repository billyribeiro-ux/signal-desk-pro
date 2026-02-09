"use client";

import { useState } from "react";
import { Plus, AlertCircle } from "lucide-react";
import { useClients, useCreateClient } from "@/features/clients/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { ClientTable } from "@/features/clients/components/client-table";
import { SkeletonTable } from "@/components/ui/skeleton";
import { FormField } from "@/components/forms/form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema, type ClientFormData } from "@/features/clients/schema";
import { toast } from "sonner";

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const { data, isLoading, isError, refetch } = useClients({ search: search || undefined });
  const createMutation = useCreateClient();

  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: { name: "", email: "", company: "", industry: "", phone: "", website: "", notes: "" },
  });

  const onCreateSubmit = async (formData: ClientFormData) => {
    try {
      await createMutation.mutateAsync(formData);
      toast.success("Client created successfully");
      setShowCreate(false);
      form.reset();
    } catch {
      toast.error("Failed to create client");
    }
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <AlertCircle className="h-12 w-12 text-danger" />
        <h2 className="mt-4 text-heading-3 font-semibold text-text">Failed to load clients</h2>
        <p className="mt-1 text-body-sm text-text-muted">Something went wrong fetching your client list.</p>
        <Button variant="secondary" className="mt-4" onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-1 font-bold text-text">Clients</h1>
          <p className="mt-1 text-body text-text-muted">Manage your client relationships</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Input
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
          aria-label="Search clients"
        />
      </div>

      {isLoading ? (
        <SkeletonTable />
      ) : (
        <ClientTable clients={data?.data ?? []} />
      )}

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Add New Client" size="lg">
        <form onSubmit={form.handleSubmit(onCreateSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Full Name" htmlFor="create-name" error={form.formState.errors.name?.message} required>
              <Input id="create-name" {...form.register("name")} error={!!form.formState.errors.name} placeholder="John Doe" />
            </FormField>
            <FormField label="Email" htmlFor="create-email" error={form.formState.errors.email?.message} required>
              <Input id="create-email" type="email" {...form.register("email")} error={!!form.formState.errors.email} placeholder="john@company.com" />
            </FormField>
            <FormField label="Company" htmlFor="create-company" error={form.formState.errors.company?.message} required>
              <Input id="create-company" {...form.register("company")} error={!!form.formState.errors.company} placeholder="Acme Corp" />
            </FormField>
            <FormField label="Industry" htmlFor="create-industry" error={form.formState.errors.industry?.message} required>
              <Input id="create-industry" {...form.register("industry")} error={!!form.formState.errors.industry} placeholder="Technology" />
            </FormField>
            <FormField label="Phone" htmlFor="create-phone" error={form.formState.errors.phone?.message}>
              <Input id="create-phone" {...form.register("phone")} placeholder="+1 555-0100" />
            </FormField>
            <FormField label="Website" htmlFor="create-website" error={form.formState.errors.website?.message}>
              <Input id="create-website" {...form.register("website")} placeholder="https://company.com" />
            </FormField>
          </div>
          <FormField label="Notes" htmlFor="create-notes" error={form.formState.errors.notes?.message}>
            <Input id="create-notes" {...form.register("notes")} placeholder="Any additional notes..." />
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setShowCreate(false)}>Cancel</Button>
            <SubmitButton isSubmitting={createMutation.isPending}>Create Client</SubmitButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
