"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClientTable } from "@/features/clients/components/client-table";
import type { Client } from "@/features/clients/types";

const mockClients: Client[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah@acmecorp.com", company: "Acme Corp", status: "active", industry: "Technology", projectCount: 3, totalRevenue: 45000, createdAt: "2024-01-15T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "2", name: "Mike Chen", email: "mike@techstart.io", company: "TechStart", status: "onboarding", industry: "SaaS", projectCount: 1, totalRevenue: 12000, createdAt: "2024-03-20T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "3", name: "Emily Davis", email: "emily@brandco.com", company: "BrandCo", status: "active", industry: "Marketing", projectCount: 5, totalRevenue: 78000, createdAt: "2023-11-10T00:00:00Z", updatedAt: "2024-05-28T00:00:00Z" },
  { id: "4", name: "James Wilson", email: "james@globalfin.com", company: "GlobalFin", status: "paused", industry: "Finance", projectCount: 2, totalRevenue: 34000, createdAt: "2024-02-01T00:00:00Z", updatedAt: "2024-04-15T00:00:00Z" },
  { id: "5", name: "Lisa Park", email: "lisa@creativelab.co", company: "Creative Lab", status: "active", industry: "Design", projectCount: 4, totalRevenue: 56000, createdAt: "2023-09-05T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockClients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-1 font-bold text-text">Clients</h1>
          <p className="mt-1 text-body text-text-muted">Manage your client relationships</p>
        </div>
        <Button>
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
        />
      </div>

      <ClientTable clients={filtered} />
    </div>
  );
}
