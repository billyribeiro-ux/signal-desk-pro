# ADR-006: Performance Strategy

## Status
Accepted

## Context
Enterprise SaaS must load fast and stay responsive. Poor performance erodes trust and increases churn.

## Decision

### Server Components by Default
- All layout and static pages are server components (no `"use client"`)
- Client components only where interactivity is required (forms, data views with hooks, motion)
- Dashboard layout wraps children in `ErrorBoundary` + `RouteTransition`

### Bundle Optimization
- `optimizePackageImports` enabled in `next.config.ts` for lucide-react, date-fns
- Tree-shaking via named imports (no barrel re-exports)
- GSAP loaded only in motion components

### Data Loading
- TanStack Query with `staleTime` to avoid redundant fetches
- Skeleton loading states prevent layout shift
- API routes simulate realistic latency (120-200ms) for development fidelity

### Animation Performance
- GSAP animates only `transform` and `opacity` (GPU-composited)
- All GSAP contexts cleaned up on unmount
- `will-change` applied sparingly and removed after animation

### Monitoring
- Sentry for error tracking and performance monitoring
- Core Web Vitals tracked via Next.js built-in reporting
- Bundle size tracked in CI via `next build` output

### Future
- Suspense boundaries for streaming data views
- React Server Components for data-heavy pages
- Edge runtime for API routes where possible

## Consequences
- Sub-second page loads for cached routes
- No layout shift from loading states
- Performance regressions caught in CI
