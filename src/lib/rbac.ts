import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./auth";

export type Role = "OWNER" | "ADMIN" | "MANAGER" | "CLIENT";

const ROLE_HIERARCHY: Record<Role, number> = {
  OWNER: 40,
  ADMIN: 30,
  MANAGER: 20,
  CLIENT: 10,
};

/**
 * Check if a role meets the minimum required level.
 */
export function hasMinRole(userRole: Role, minRole: Role): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[minRole];
}

/**
 * Server-side session + tenant guard for API routes.
 * Returns the authenticated session with organizationId or a 401/403 response.
 */
export async function requireAuth(minRole: Role = "CLIENT") {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      authorized: false as const,
      response: NextResponse.json(
        { error: { message: "Unauthorized", code: "UNAUTHORIZED", status: 401 } },
        { status: 401 },
      ),
    };
  }

  if (!session.user.organizationId) {
    return {
      authorized: false as const,
      response: NextResponse.json(
        { error: { message: "No organization", code: "NO_ORG", status: 403 } },
        { status: 403 },
      ),
    };
  }

  if (!hasMinRole(session.user.role as Role, minRole)) {
    return {
      authorized: false as const,
      response: NextResponse.json(
        { error: { message: "Insufficient permissions", code: "FORBIDDEN", status: 403 } },
        { status: 403 },
      ),
    };
  }

  return {
    authorized: true as const,
    session,
    userId: session.user.id,
    organizationId: session.user.organizationId,
    role: session.user.role as Role,
  };
}
