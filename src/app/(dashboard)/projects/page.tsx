"use client";

import { useState } from "react";
import { Plus, AlertCircle } from "lucide-react";
import { useProjects } from "@/features/projects/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/features/projects/components/project-card";
import { SkeletonCard } from "@/components/ui/skeleton";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, refetch } = useProjects({ search: search || undefined });

  const projects = data?.data ?? [];

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <AlertCircle className="h-12 w-12 text-danger" />
        <h2 className="mt-4 text-heading-3 font-semibold text-text">Failed to load projects</h2>
        <p className="mt-1 text-body-sm text-text-muted">Something went wrong fetching your projects.</p>
        <Button variant="secondary" className="mt-4" onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

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
        aria-label="Search projects"
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16">
          <p className="text-body font-medium text-text">No projects found</p>
          <p className="mt-1 text-body-sm text-text-muted">Try adjusting your search or create a new project</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
