# ADR-001: State Management Strategy

## Status
Accepted

## Context
SignalDesk Pro requires multiple forms of state management across server data, local UI state, global UI state, and complex multi-step workflows.

## Decision
We adopt a **four-tier state management** approach:

| Tier | Tool | Use Case |
|------|------|----------|
| Server state | TanStack Query | All API data fetching, caching, and synchronization |
| Local UI state | React `useState`/`useReducer` | Component-scoped toggles, form inputs, ephemeral UI |
| Light global state | React Context | Theme, auth session, mobile menu |
| Complex workflows | Redux Toolkit | Multi-step wizard state, revision drafting, sidebar/drawer orchestration |

## Rationale
- **TanStack Query** handles cache invalidation, background refetching, and optimistic updates out of the box, eliminating the need to store server data in Redux.
- **React Context** is sufficient for infrequently changing global values (theme, auth) without the boilerplate of Redux.
- **Redux Toolkit** is reserved for genuinely complex client-side workflows where multiple components need to read/write shared mutable state that doesn't originate from the server.

## Consequences
- Developers must choose the correct tier for each piece of state.
- Server data must never be duplicated into Redux.
- Query keys are centralized in `src/lib/query/query-keys.ts` for consistency.
