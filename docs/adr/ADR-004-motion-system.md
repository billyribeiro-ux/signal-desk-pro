# ADR-004: Motion System and Reduced-Motion Policy

## Status
Accepted

## Context
Premium SaaS products use motion to communicate hierarchy, state changes, and brand personality. Motion must be performant and accessible.

## Decision

### GSAP Motion System
- **Motion tokens** (`src/lib/motion/tokens.ts`): centralized duration, ease, stagger, distance, scale values
- **Hero intro**: cinematic GSAP timeline on marketing landing page
- **ScrollTrigger scenes**: ≥3 narrative sections with scroll-driven animations
- **Micro-interactions**: hover elevation, button press feedback via GSAP
- **Route transitions**: fade/slide choreography keyed to `usePathname()` changes

### Performance Rules
- Animate only `transform` and `opacity` (GPU-composited properties)
- All GSAP contexts cleaned up on unmount via `gsap.context().revert()`
- No layout-triggering animations (no width/height/top/left)
- ScrollTrigger instances killed on component unmount

### Reduced Motion
- `usePrefersReducedMotion()` hook checks `prefers-reduced-motion: reduce`
- When active: durations → 0, distances → 0, staggers → 0
- `getReducedMotionProps()` helper returns safe defaults
- All motion components check this before animating

## Consequences
- Consistent, branded motion language across the app
- Zero jank from layout thrashing
- WCAG 2.1 AA compliant for vestibular disorders
