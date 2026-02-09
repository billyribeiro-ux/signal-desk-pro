"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useDeleteClient } from "../hooks";
import { formatDate, formatCurrency } from "@/lib/utils/format";
import { toast } from "sonner";
import type { Client, ClientStatus } from "../types";

const statusVariant: Record<ClientStatus, "success" | "info" | "warning" | "danger"> = {
  active: "success",
  onboarding: "info",
  paused: "warning",
  churned: "danger",
};

interface ClientTableProps {
  clients: Client[];
}

export function ClientTable({ clients }: ClientTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<Client | null>(null);
  const deleteMutation = useDeleteClient();

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success(`${deleteTarget.name} has been removed`);
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete client");
    }
  };

  if (clients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16">
        <p className="text-body font-medium text-text">No clients found</p>
        <p className="mt-1 text-body-sm text-text-muted">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Projects</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                <div>
                  <p className="font-medium text-text">{client.name}</p>
                  <p className="text-caption text-text-muted">{client.email}</p>
                </div>
              </TableCell>
              <TableCell>{client.company}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[client.status]}>{client.status}</Badge>
              </TableCell>
              <TableCell>{client.projectCount}</TableCell>
              <TableCell>{formatCurrency(client.totalRevenue)}</TableCell>
              <TableCell>{formatDate(client.createdAt)}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteTarget(client)}
                  aria-label={`Delete ${client.name}`}
                >
                  <Trash2 className="h-4 w-4 text-text-muted hover:text-danger" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Client"
        description={`Are you sure you want to delete ${deleteTarget?.name ?? "this client"}? This action cannot be undone and will remove all associated data.`}
        confirmLabel="Delete"
        variant="danger"
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
