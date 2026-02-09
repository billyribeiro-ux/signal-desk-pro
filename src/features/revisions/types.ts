export type RevisionStatus = "pending" | "approved" | "rejected" | "changes_requested";

export interface Revision {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  description: string;
  status: RevisionStatus;
  version: number;
  submittedBy: string;
  reviewedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RevisionMessage {
  id: string;
  revisionId: string;
  author: string;
  authorRole: "client" | "manager" | "member";
  content: string;
  action?: "approve" | "reject" | "request_changes";
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  revisionId: string;
  action: string;
  actor: string;
  details: string;
  createdAt: string;
}
