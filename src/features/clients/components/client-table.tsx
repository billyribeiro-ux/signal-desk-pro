"use client";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/utils/format";
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
  if (clients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16">
        <p className="text-body font-medium text-text">No clients found</p>
        <p className="mt-1 text-body-sm text-text-muted">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Projects</TableHead>
          <TableHead>Revenue</TableHead>
          <TableHead>Joined</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
