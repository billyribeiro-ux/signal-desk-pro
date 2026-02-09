"use client";

import { Badge } from "@/components/ui/badge";
import { formatRelative } from "@/lib/utils/format";
import type { RevisionMessage } from "../types";

const actionLabels: Record<string, { label: string; variant: "success" | "danger" | "warning" }> = {
  approve: { label: "Approved", variant: "success" },
  reject: { label: "Rejected", variant: "danger" },
  request_changes: { label: "Changes Requested", variant: "warning" },
};

export function RevisionThread({ messages }: { messages: RevisionMessage[] }) {
  if (messages.length === 0) {
    return (
      <div className="py-8 text-center text-body-sm text-text-muted">
        No messages yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className="rounded-xl border border-border bg-surface p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-muted text-caption font-semibold text-primary">
                {msg.author.charAt(0)}
              </div>
              <span className="text-body-sm font-medium text-text">{msg.author}</span>
              <Badge variant="outline">{msg.authorRole}</Badge>
            </div>
            <span className="text-caption text-text-muted">{formatRelative(msg.createdAt)}</span>
          </div>
          <p className="mt-2 text-body-sm text-text-muted">{msg.content}</p>
          {msg.action && actionLabels[msg.action] && (
            <div className="mt-2">
              <Badge variant={actionLabels[msg.action].variant}>
                {actionLabels[msg.action].label}
              </Badge>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
