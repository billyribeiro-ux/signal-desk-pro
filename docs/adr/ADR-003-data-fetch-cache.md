# ADR-003: Data-Fetch and Cache Strategy

## Status
Accepted

## Context
Every data-driven page needs a consistent fetch/cache/error strategy. Inconsistent patterns lead to stale data, missing loading states, and poor UX.

## Decision

### Architecture
- **TanStack Query** is the single data-fetching layer for all client components
- **Query key factory** (`src/lib/query/query-keys.ts`) ensures consistent, hierarchical cache keys
- **Typed API client** (`src/lib/api/client.ts`) wraps `fetch` with JSON handling, error parsing, and typed generics
- **API error envelope**: `{ error: { message, code, status, fieldErrors?, requestId? } }`

### Patterns
1. Every page hook returns `{ data, isLoading, isError, refetch }`
2. Every page renders three states: **loading skeleton**, **error with retry**, **empty with guidance**
3. Mutations invalidate related query keys on success
4. At least one mutation path uses **optimistic updates** (client create)

### Cache Configuration
- `staleTime`: 30s for lists, 60s for details
- `gcTime`: 5 minutes
- Background refetch on window focus enabled

### Server Components
- Static/layout pages use server components by default
- Data-fetching pages use `"use client"` with TanStack Query hooks
- Future: migrate to RSC + Suspense boundaries as React Server Components mature

## Consequences
- Consistent UX across all pages
- No stale data from manual cache management
- Type-safe from API route → client → hook → component
