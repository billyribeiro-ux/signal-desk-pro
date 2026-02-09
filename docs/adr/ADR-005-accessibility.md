# ADR-005: Accessibility Checklist

## Status
Accepted

## Context
SignalDesk Pro must meet WCAG 2.1 AA as a baseline. Enterprise SaaS customers require accessibility compliance.

## Decision

### Implemented
- [x] **Skip link** — `<a href="#main-content">` in root layout, visually hidden until focused
- [x] **Semantic landmarks** — `<main id="main-content">`, `<nav aria-label>`, `<aside>`
- [x] **One H1 per page** — every page has exactly one `<h1>`
- [x] **Focus trap** — `useFocusTrap` hook on Modal and Drawer; Tab cycles within, Escape closes
- [x] **ARIA tabs** — `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `role="tabpanel"`
- [x] **ARIA dialog** — Modal uses `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- [x] **Toast announcements** — Sonner toasts use `role="status"` with `aria-live="polite"`
- [x] **Form labels** — every input has `<label htmlFor>` or `aria-label`
- [x] **Error messages** — form errors use `role="alert"` for screen reader announcement
- [x] **Keyboard support** — all interactive elements reachable via Tab, activatable via Enter/Space
- [x] **Reduced motion** — `usePrefersReducedMotion` disables GSAP animations
- [x] **Color contrast** — semantic token system ensures sufficient contrast in light and dark modes
- [x] **Focus visible** — `focus-visible:ring-2 focus-visible:ring-ring` on all interactive elements

### Testing
- Manual testing with VoiceOver (macOS)
- Automated checks via axe-core in Playwright E2E tests
- CI lint for missing alt text and ARIA violations

## Consequences
- Meets WCAG 2.1 AA across all critical flows
- Screen reader users can navigate and operate all features
- Keyboard-only users have full access
