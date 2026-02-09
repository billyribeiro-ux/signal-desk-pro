# ADR-003: API Architecture

## Status
Accepted

## Context
SignalDesk Pro needs a consistent API layer for client-server communication with typed error handling and form validation integration.

## Decision
We adopt a **typed API client abstraction** with consistent error envelopes.

### Architecture
- **API Client** (`src/lib/api/client.ts`): Generic `apiClient` with methods for GET, POST, PUT, PATCH, DELETE. Handles URL building, error parsing, and response typing.
- **Error System** (`src/lib/api/errors.ts`): `ApiError` class with status, code, and field-level details. `ErrorEnvelope` interface for consistent error responses. `mapFormErrors` utility for React Hook Form integration.
- **Server Utilities** (`src/lib/api/server.ts`): Helpers for consistent JSON responses, paginated responses, and search parameter parsing in API routes.
- **Query Keys** (`src/lib/query/query-keys.ts`): Centralized, hierarchical query key factory for TanStack Query cache management.

### API Routes
All API routes live under `src/app/api/` and return mock data for demo purposes. They follow REST conventions:
- `GET` — list or detail (via `?id=` param)
- `POST` — create
- `PUT` — update
- `DELETE` — delete

## Consequences
- Type-safe API calls throughout the application.
- Consistent error handling and form validation integration.
- Easy to swap mock API routes for real backend endpoints.
