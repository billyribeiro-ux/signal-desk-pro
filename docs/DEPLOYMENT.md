# Deployment Guide — SignalDesk Pro

## Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Stripe account (test mode)
- Sentry project
- Vercel account (recommended)

## Local Development

```bash
# 1. Clone and install
git clone <repo-url> && cd signal-desk-pro
npm install

# 2. Environment
cp .env.example .env.local
# Fill in DATABASE_URL, NEXTAUTH_SECRET, Stripe keys, Sentry DSN

# 3. Database
npx prisma generate
npx prisma db push
npx prisma db seed

# 4. Run
npm run dev
```

## Production Deployment (Vercel)

### 1. Database (Vercel Postgres or Neon)
- Create a PostgreSQL database on Vercel Postgres, Neon, or Supabase
- Copy the connection string to `DATABASE_URL`

### 2. Vercel Project
```bash
vercel link
vercel env add DATABASE_URL
vercel env add NEXTAUTH_URL        # https://your-domain.vercel.app
vercel env add NEXTAUTH_SECRET     # openssl rand -base64 32
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
vercel env add STRIPE_STARTER_PRICE_ID
vercel env add STRIPE_GROWTH_PRICE_ID
vercel env add STRIPE_PRO_PRICE_ID
vercel env add SENTRY_DSN
vercel env add NEXT_PUBLIC_SENTRY_DSN
```

### 3. Prisma on Vercel
Add to `package.json` scripts:
```json
"postinstall": "prisma generate"
```

### 4. Deploy
```bash
vercel --prod
```

### 5. Run migrations
```bash
npx prisma db push --accept-data-loss  # first deploy only
npx prisma db seed                      # seed demo data
```

### 6. Stripe Webhook
- In Stripe Dashboard → Webhooks → Add endpoint
- URL: `https://your-domain.vercel.app/api/billing/webhook`
- Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
- Copy signing secret to `STRIPE_WEBHOOK_SECRET`

### 7. Sentry
- `@sentry/nextjs` auto-instruments via `next.config.js`
- Source maps uploaded via `SENTRY_AUTH_TOKEN` in CI

## CI Pipeline
GitHub Actions runs on every push/PR to `main`:
1. `npm ci`
2. `npm run lint`
3. `npx tsc --noEmit`
4. `npm run test -- --run`
5. `npm run build`

## Health Checks
- `/api/health` — returns 200 if app is running
- Sentry dashboard for error rates
- Vercel Analytics for Core Web Vitals
