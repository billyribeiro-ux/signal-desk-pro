"use client";

import { useRevisions } from "@/features/revisions/hooks";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkeletonCard } from "@/components/ui/skeleton";
import { formatRelative } from "@/lib/utils/format";
import { AlertCircle } from "lucide-react";
import type { RevisionStatus } from "@/features/revisions/types";

const statusVariant: Record<RevisionStatus, "default" | "success" | "warning" | "danger"> = {
  pending: "default",
  approved: "success",
  changes_requested: "warning",
  rejected: "danger",
};

export default function RevisionsPage() {
  const { data, isLoading, isError, refetch } = useRevisions();

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <AlertCircle className="h-12 w-12 text-danger" />
        <h2 className="mt-4 text-heading-3 font-semibold text-text">Failed to load revisions</h2>
        <p className="mt-1 text-body-sm text-text-muted">Something went wrong fetching revision requests.</p>
        <Button variant="secondary" className="mt-4" onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  const revisions = data?.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-1 font-bold text-text">Revisions</h1>
        <p className="mt-1 text-body text-text-muted">Review and manage revision requests</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : revisions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16">
          <p className="text-body font-medium text-text">No revisions yet</p>
          <p className="mt-1 text-body-sm text-text-muted">Revisions will appear here when team members submit work for review.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {revisions.map((rev) => (
            <Card key={rev.id} hover>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-body font-semibold text-text">{rev.title}</h3>
                  <p className="text-body-sm text-text-muted">{rev.projectName} &middot; v{rev.version}</p>
                </div>
                <Badge variant={statusVariant[rev.status]}>{rev.status.replace("_", " ")}</Badge>
              </div>
              <p className="mt-2 text-body-sm text-text-muted">{rev.description}</p>
              <div className="mt-3 flex items-center gap-4 text-caption text-text-muted">
                <span>By {rev.submittedBy}</span>
                {rev.reviewedBy && <span>Reviewed by {rev.reviewedBy}</span>}
                <span className="ml-auto">{formatRelative(rev.createdAt)}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
