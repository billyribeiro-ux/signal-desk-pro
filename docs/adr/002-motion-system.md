# ADR-002: Motion System Architecture

## Status
Accepted

## Context
SignalDesk Pro requires premium motion design for hero sections, scroll-triggered reveals, route transitions, and micro-interactions while respecting accessibility preferences.

## Decision
We adopt **GSAP + ScrollTrigger** as the motion engine with a centralized token system.

### Architecture
- **Motion tokens** (`src/lib/motion/tokens.ts`): Centralized durations, easings, distances, staggers, and scales.
- **Motion presets** (`src/lib/motion/presets.ts`): Reusable animation configurations built from tokens.
- **Reduced motion** (`src/lib/motion/reduced-motion.ts`): `usePrefersReducedMotion` hook and `getReducedMotionProps` utility.
- **Motion components** (`src/components/motion/`): `HeroIntro`, `ScrollScenes`, `RouteTransition`, `MicroInteractionDemo`.

### Rules
1. All animations must use tokens from `MOTION_TOKENS` — no magic numbers.
2. Every animation must check `prefers-reduced-motion` and degrade gracefully.
3. GSAP timelines must be cleaned up in `useEffect` return functions.
4. ScrollTrigger instances must be killed on unmount.

## Consequences
- Consistent animation feel across the entire application.
- Easy to tune global animation speed/feel by changing tokens.
- Accessible by default — reduced motion users see instant state changes.
