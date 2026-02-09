# SignalDesk Pro

A production-grade client operations platform built with Next.js 15, React, TypeScript, and Tailwind CSS.

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| Forms | React Hook Form + Zod |
| Server State | TanStack Query |
| Client State | Redux Toolkit + React Context |
| Motion | GSAP + ScrollTrigger |
| Icons | Lucide React |
| Dates | date-fns |
| Toasts | Sonner |
| Testing | Vitest + Testing Library + Playwright |

## Getting Started

```bash
# Clone and install
git clone <repo-url>
cd signal-desk-pro
cp .env.example .env.local
npm install

# Development
npm run dev          # Start dev server at http://localhost:3000

# Build & verify
npm run build        # Production build
npm run lint         # ESLint
npm run typecheck    # TypeScript check
npm run format       # Prettier

# Testing
npm run test         # Unit + component tests (Vitest)
npm run test:e2e     # E2E tests (Playwright)
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/        # Dashboard route group
│   │   ├── clients/        # Client management
│   │   ├── dashboard/      # Analytics dashboard
│   │   ├── motion-showcase/ # Motion demos
│   │   ├── projects/       # Project command center
│   │   ├── revisions/      # Revision management
│   │   └── settings/       # User settings
│   ├── api/                # API routes (mock)
│   ├── globals.css         # Design tokens + base styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Marketing landing
│   └── providers.tsx       # Client providers wrapper
├── components/
│   ├── forms/              # Form primitives
│   ├── layout/             # App shell, sidebar, topbar
│   ├── motion/             # GSAP-powered animations
│   └── ui/                 # UI primitives
├── context/                # React Context providers
├── features/               # Feature modules
│   ├── auth/               # Authentication
│   ├── clients/            # Client management
│   ├── dashboard/          # Dashboard analytics
│   ├── projects/           # Project management
│   ├── revisions/          # Revision workflow
│   └── settings/           # User settings
├── lib/                    # Shared utilities
│   ├── api/                # API client + errors
│   ├── constants/          # Routes, theme constants
│   ├── motion/             # Motion tokens + presets
│   ├── query/              # TanStack Query config
│   ├── utils/              # cn, format utilities
│   └── validation/         # Zod error mapping
└── store/                  # Redux Toolkit store
    └── slices/             # UI, workflow, session slices
```

## State Management

| Tier | Tool | Use Case |
|------|------|----------|
| Server state | TanStack Query | API data fetching, caching |
| Local UI | `useState` / `useReducer` | Component-scoped toggles |
| Global UI | React Context | Theme, auth, mobile menu |
| Workflows | Redux Toolkit | Wizard state, revision drafting |

## Design System

- **Tokens**: CSS custom properties for colors, with light/dark mode
- **Typography**: Inter font with semantic size scale
- **Spacing**: 4px base grid
- **Motion**: Centralized GSAP tokens for consistent animations
- **Accessibility**: Reduced motion support, ARIA attributes, keyboard navigation

## Documentation

- [ADR-001: State Management](docs/adr/001-state-management.md)
- [ADR-002: Motion System](docs/adr/002-motion-system.md)
- [ADR-003: API Architecture](docs/adr/003-api-architecture.md)
- [Demo Script](docs/demo-script.md)

## License

Private — All rights reserved.
