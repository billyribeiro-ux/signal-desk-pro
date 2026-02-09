"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatRelative } from "@/lib/utils/format";
import type { Revision, RevisionStatus } from "@/features/revisions/types";

const statusVariant: Record<RevisionStatus, "default" | "success" | "warning" | "danger"> = {
  pending: "default",
  approved: "success",
  changes_requested: "warning",
  rejected: "danger",
};

const mockRevisions: Revision[] = [
  { id: "1", projectId: "1", projectName: "Website Redesign", title: "Homepage Hero v2", description: "Updated hero section with new copy and layout", status: "pending", version: 2, submittedBy: "Jordan Lee", createdAt: new Date(Date.now() - 3600000).toISOString(), updatedAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "2", projectId: "2", projectName: "Mobile App MVP", title: "Onboarding Flow v3", description: "Revised onboarding with simplified steps", status: "approved", version: 3, submittedBy: "Sam Chen", reviewedBy: "Alex Morgan", createdAt: new Date(Date.now() - 86400000).toISOString(), updatedAt: new Date(Date.now() - 43200000).toISOString() },
  { id: "3", projectId: "3", projectName: "Brand Identity", title: "Logo Concepts v1", description: "Initial logo concepts for review", status: "changes_requested", version: 1, submittedBy: "Jordan Lee", reviewedBy: "Emily Davis", createdAt: new Date(Date.now() - 172800000).toISOString(), updatedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "4", projectId: "5", projectName: "E-commerce Platform", title: "Checkout Flow v4", description: "Streamlined checkout with fewer steps", status: "rejected", version: 4, submittedBy: "Sam Chen", reviewedBy: "Alex Morgan", createdAt: new Date(Date.now() - 259200000).toISOString(), updatedAt: new Date(Date.now() - 172800000).toISOString() },
];

export default function RevisionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-1 font-bold text-text">Revisions</h1>
        <p className="mt-1 text-body text-text-muted">Review and manage revision requests</p>
      </div>

      <div className="space-y-4">
        {mockRevisions.map((rev) => (
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
    </div>
  );
}
