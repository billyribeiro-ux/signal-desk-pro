"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/features/projects/components/project-card";
import type { Project } from "@/features/projects/types";

const mockProjects: Project[] = [
  { id: "1", name: "Website Redesign", description: "Complete overhaul of the corporate website with modern design system", clientId: "1", clientName: "Acme Corp", status: "active", priority: "high", startDate: "2024-03-01T00:00:00Z", dueDate: "2024-07-15T00:00:00Z", budget: 45000, spent: 28000, progress: 65, tags: ["design", "web"], createdAt: "2024-03-01T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "2", name: "Mobile App MVP", description: "Build a cross-platform mobile application for client portal access", clientId: "2", clientName: "TechStart", status: "in_review", priority: "urgent", startDate: "2024-04-01T00:00:00Z", dueDate: "2024-08-01T00:00:00Z", budget: 80000, spent: 55000, progress: 80, tags: ["mobile", "react-native"], createdAt: "2024-04-01T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "3", name: "Brand Identity", description: "Full brand identity package including logo, typography, and guidelines", clientId: "3", clientName: "BrandCo", status: "completed", priority: "medium", startDate: "2024-01-15T00:00:00Z", dueDate: "2024-04-30T00:00:00Z", completedDate: "2024-04-28T00:00:00Z", budget: 25000, spent: 23000, progress: 100, tags: ["branding"], createdAt: "2024-01-15T00:00:00Z", updatedAt: "2024-04-28T00:00:00Z" },
  { id: "4", name: "Analytics Dashboard", description: "Custom analytics dashboard with real-time data visualization", clientId: "4", clientName: "GlobalFin", status: "draft", priority: "low", startDate: "2024-06-01T00:00:00Z", dueDate: "2024-09-30T00:00:00Z", budget: 60000, spent: 0, progress: 0, tags: ["analytics", "dashboard"], createdAt: "2024-05-20T00:00:00Z", updatedAt: "2024-05-20T00:00:00Z" },
  { id: "5", name: "E-commerce Platform", description: "Headless e-commerce solution with custom checkout flow", clientId: "5", clientName: "Creative Lab", status: "active", priority: "high", startDate: "2024-02-15T00:00:00Z", dueDate: "2024-06-30T00:00:00Z", budget: 95000, spent: 72000, progress: 78, tags: ["ecommerce", "nextjs"], createdAt: "2024-02-15T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "6", name: "SEO Audit", description: "Comprehensive SEO audit and optimization recommendations", clientId: "1", clientName: "Acme Corp", status: "active", priority: "medium", startDate: "2024-05-01T00:00:00Z", dueDate: "2024-06-15T00:00:00Z", budget: 8000, spent: 5500, progress: 70, tags: ["seo"], createdAt: "2024-05-01T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockProjects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.clientName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-1 font-bold text-text">Projects</h1>
          <p className="mt-1 text-body text-text-muted">Track and manage all your projects</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <Input
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16">
          <p className="text-body font-medium text-text">No projects found</p>
          <p className="mt-1 text-body-sm text-text-muted">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
}
