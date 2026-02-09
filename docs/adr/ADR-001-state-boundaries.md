# ADR-001: State Boundaries

## Status
Accepted

## Context
SignalDesk Pro uses multiple state management tools. Without clear boundaries, state duplication and cache staleness become inevitable.

## Decision

| Concern | Tool | Rationale |
|---------|------|-----------|
| Server state (entities, lists) | TanStack Query | Automatic cache, refetch, stale-while-revalidate |
| Local UI state | `useState` / `useReducer` | Scoped, no global pollution |
| Light global state (theme, auth convenience, mobile menu) | React Context | Simple, no boilerplate |
| Complex multi-step workflows (onboarding wizard) | Redux Toolkit | Predictable, time-travel debug, persists across steps |

## Anti-patterns forbidden
- No server data in Redux (use TanStack Query)
- No duplicate auth source-of-truth (NextAuth session is canonical)
- No mock arrays in page files (all data via hooks → API → DB)

## Consequences
- Clear ownership of every piece of state
- No cache staleness from manual Redux sync
- Redux reserved only for wizard/workflow orchestration
