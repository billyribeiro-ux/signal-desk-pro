"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatDate, formatCurrency } from "@/lib/utils/format";
import type { Project, ProjectStatus } from "../types";

const statusVariant: Record<ProjectStatus, "default" | "success" | "info" | "warning" | "danger"> = {
  draft: "default",
  active: "info",
  in_review: "warning",
  completed: "success",
  archived: "danger",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card hover className="h-full">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-body font-semibold text-text">{project.name}</h3>
            <p className="text-caption text-text-muted">{project.clientName}</p>
          </div>
          <Badge variant={statusVariant[project.status]}>{project.status.replace("_", " ")}</Badge>
        </div>
        <p className="mt-3 line-clamp-2 text-body-sm text-text-muted">{project.description}</p>
        <div className="mt-4 flex items-center justify-between text-caption text-text-muted">
          <span>Due {formatDate(project.dueDate)}</span>
          <span>{formatCurrency(project.budget)}</span>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between text-caption">
            <span className="text-text-muted">Progress</span>
            <span className="font-medium text-text">{project.progress}%</span>
          </div>
          <ProgressBar value={project.progress} className="mt-1.5" />
        </div>
      </Card>
    </Link>
  );
}
