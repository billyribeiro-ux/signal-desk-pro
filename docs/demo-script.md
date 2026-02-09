# SignalDesk Pro — Demo Script

## Prerequisites
```bash
cp .env.example .env.local
npm install
npm run dev
```
Open http://localhost:3000

## Flow 1: Marketing Landing
1. Visit `/` — observe GSAP hero intro animation (staggered text + visual reveals)
2. Scroll down — watch ScrollTrigger-powered scene animations with pinned elements
3. Note: reduced motion users see instant state changes

## Flow 2: Dashboard Overview
1. Navigate to `/dashboard`
2. Observe KPI cards with trend indicators (up/down/flat)
3. Review recent activity feed with relative timestamps
4. View throughput bar chart

## Flow 3: Client Management
1. Navigate to `/clients`
2. Use the search input to filter clients by name or company
3. Observe the table with status badges, project counts, and revenue
4. Click **Add Client** — fill out the modal form (Zod-validated), submit → toast confirmation
5. Click the trash icon on any row → **Confirm Dialog** appears → confirm deletion → toast
6. Note the empty state when no results match

## Flow 4: Project Command Center
1. Navigate to `/projects`
2. Browse project cards with progress bars, budgets, and status badges
3. Click a project card to view the detail page at `/projects/[id]`
4. Review project details: dates, budget, spent, progress, tags, priority

## Flow 5: Revision Management
1. Navigate to `/revisions`
2. Review revision cards with status badges (pending, approved, changes_requested, rejected)
3. Note version numbers, submitter/reviewer info, and relative timestamps

## Flow 6: Settings
1. Navigate to `/settings`
2. **Profile tab**: Edit name, email, timezone — submit to see toast notification
3. **Appearance tab**: Toggle between light, dark, and system themes
4. **Notifications tab**: Toggle notification preferences

## Flow 7: Motion Showcase
1. Navigate to `/motion-showcase`
2. Hover over cards to see GSAP-powered elevation animations
3. Click buttons to see press/release scale animations

## Architecture Highlights
- **State boundaries**: Server state (TanStack Query), local UI (useState), global (Context), workflows (Redux)
- **Design tokens**: CSS custom properties for light/dark themes
- **Motion tokens**: Centralized GSAP durations, easings, distances
- **Accessibility**: Reduced motion support, ARIA attributes, keyboard navigation
- **Responsive**: Mobile-first with sidebar collapse
