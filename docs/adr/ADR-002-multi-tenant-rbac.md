# ADR-002: Multi-Tenant Isolation and RBAC

## Status
Accepted

## Context
SignalDesk Pro is a multi-tenant SaaS. Every organization's data must be completely isolated. Role-based access control must enforce permissions at every API boundary.

## Decision

### Tenant Isolation
- Every business table includes `organizationId` as a required foreign key
- Every database query filters by `organizationId` from the authenticated session
- No cross-tenant data leakage is possible at the query level
- Prisma indexes on `[organizationId]` and `[organizationId, status]` for performance

### Role Hierarchy
| Role | Level | Capabilities |
|------|-------|-------------|
| OWNER | 40 | Full access, billing, delete org |
| ADMIN | 30 | Manage members, all CRUD |
| MANAGER | 20 | Manage clients/projects/revisions |
| CLIENT | 10 | View assigned projects, submit revisions |

### Enforcement
- `requireAuth(minRole)` server utility validates session + org + role on every API route
- RBAC middleware returns 401/403 before any business logic executes
- Client-side role checks are convenience only — server is authoritative

## Consequences
- Zero trust at the API boundary
- Role changes take effect immediately (JWT-based, short expiry)
- Adding new roles requires updating the hierarchy constant only
