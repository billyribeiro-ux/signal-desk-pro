"use client";

import { useParams } from "next/navigation";
import { useProject } from "@/features/projects/hooks";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";
import { formatDate, formatCurrency } from "@/lib/utils/format";
import type { ProjectStatus, ProjectPriority } from "@/features/projects/types";

const statusVariant: Record<ProjectStatus, "default" | "success" | "info" | "warning" | "danger"> = {
  draft: "default",
  active: "info",
  in_review: "warning",
  completed: "success",
  archived: "danger",
};

const priorityVariant: Record<ProjectPriority, "default" | "success" | "info" | "warning" | "danger"> = {
  low: "default",
  medium: "info",
  high: "warning",
  urgent: "danger",
};

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: project, isLoading, isError, refetch } = useProject(id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="mt-1 h-5 w-32" />
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2"><SkeletonCard /></div>
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <AlertCircle className="h-12 w-12 text-danger" />
        <h2 className="mt-4 text-heading-3 font-semibold text-text">Project not found</h2>
        <p className="mt-1 text-body-sm text-text-muted">This project may have been deleted or you don&apos;t have access.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/projects"><Button variant="secondary">Back to Projects</Button></Link>
          <Button variant="ghost" onClick={() => refetch()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/projects">
          <Button variant="ghost" size="icon" aria-label="Back to projects"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="text-heading-1 font-bold text-text">{project.name}</h1>
          <p className="text-body text-text-muted">{project.clientName}</p>
        </div>
        <Badge variant={statusVariant[project.status]} className="ml-auto">{project.status.replace("_", " ")}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="text-heading-3 font-semibold text-text">Details</h2>
          <p className="mt-3 text-body text-text-muted">{project.description}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div><p className="text-caption text-text-muted">Start Date</p><p className="text-body font-medium text-text">{formatDate(project.startDate)}</p></div>
            <div><p className="text-caption text-text-muted">Due Date</p><p className="text-body font-medium text-text">{formatDate(project.dueDate)}</p></div>
            <div><p className="text-caption text-text-muted">Budget</p><p className="text-body font-medium text-text">{formatCurrency(project.budget)}</p></div>
            <div><p className="text-caption text-text-muted">Spent</p><p className="text-body font-medium text-text">{formatCurrency(project.spent)}</p></div>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between text-body-sm"><span className="text-text-muted">Progress</span><span className="font-medium text-text">{project.progress}%</span></div>
            <ProgressBar value={project.progress} className="mt-2 h-2" barClassName="h-full" />
          </div>
        </Card>

        <Card>
          <h2 className="text-heading-3 font-semibold text-text">Tags</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (<Badge key={tag} variant="outline">{tag}</Badge>))}
          </div>
          <h2 className="mt-6 text-heading-3 font-semibold text-text">Priority</h2>
          <Badge variant={priorityVariant[project.priority]} className="mt-2">{project.priority}</Badge>
        </Card>
      </div>
    </div>
  );
}
