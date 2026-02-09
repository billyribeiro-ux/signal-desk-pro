import { prisma } from "@/lib/db";
import type { ActivityAction } from "@prisma/client";

interface AuditLogParams {
  organizationId: string;
  actorId: string;
  actorName: string;
  action: ActivityAction;
  description: string;
  projectId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Create an immutable audit log entry.
 * Fire-and-forget — does not throw on failure to avoid blocking mutations.
 */
export async function logActivity(params: AuditLogParams): Promise<void> {
  try {
    await prisma.activityLog.create({
      data: {
        organizationId: params.organizationId,
        actorId: params.actorId,
        actorName: params.actorName,
        action: params.action,
        description: params.description,
        projectId: params.projectId,
        metadata: params.metadata ? JSON.parse(JSON.stringify(params.metadata)) : undefined,
      },
    });
  } catch (err) {
    console.error("[audit] Failed to log activity:", err);
  }
}
