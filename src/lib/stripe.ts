import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export type PlanId = "STARTER" | "GROWTH" | "PRO";

export const PLAN_CONFIG: Record<PlanId, { name: string; priceEnv: string; limits: { clients: number; projects: number; members: number } }> = {
  STARTER: {
    name: "Starter",
    priceEnv: "STRIPE_STARTER_PRICE_ID",
    limits: { clients: 10, projects: 20, members: 3 },
  },
  GROWTH: {
    name: "Growth",
    priceEnv: "STRIPE_GROWTH_PRICE_ID",
    limits: { clients: 50, projects: 100, members: 10 },
  },
  PRO: {
    name: "Pro",
    priceEnv: "STRIPE_PRO_PRICE_ID",
    limits: { clients: -1, projects: -1, members: -1 }, // unlimited
  },
};

/**
 * Check if an org has exceeded a plan limit.
 * Returns true if within limits, false if exceeded.
 * -1 means unlimited.
 */
export function withinPlanLimit(current: number, limit: number): boolean {
  if (limit === -1) return true;
  return current < limit;
}

/**
 * Get the Stripe price ID for a plan from env vars.
 */
export function getPriceId(plan: PlanId): string {
  const envKey = PLAN_CONFIG[plan].priceEnv;
  return process.env[envKey] ?? "";
}
