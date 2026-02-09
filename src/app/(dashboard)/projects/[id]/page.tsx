"use client";

import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatDate, formatCurrency } from "@/lib/utils/format";

const mockProject = {
  id: "1", name: "Website Redesign", description: "Complete overhaul of the corporate website with modern design system and improved UX patterns.", clientId: "1", clientName: "Acme Corp", status: "active" as const, priority: "high" as const, startDate: "2024-03-01T00:00:00Z", dueDate: "2024-07-15T00:00:00Z", budget: 45000, spent: 28000, progress: 65, tags: ["design", "web"], createdAt: "2024-03-01T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z",
};

export default function ProjectDetailPage() {
  const params = useParams();
  const project = { ...mockProject, id: params.id as string };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/projects">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="text-heading-1 font-bold text-text">{project.name}</h1>
          <p className="text-body text-text-muted">{project.clientName}</p>
        </div>
        <Badge variant="info" className="ml-auto">{project.status}</Badge>
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
          <Badge variant="danger" className="mt-2">{project.priority}</Badge>
        </Card>
      </div>
    </div>
  );
}
