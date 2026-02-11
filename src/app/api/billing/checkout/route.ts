import { NextRequest, NextResponse } from "next/server";
import { simulateLatency } from "@/lib/api/db";

export async function POST(req: NextRequest) {
  await simulateLatency(300);
  const { planId } = await req.json();

  // In production, this would create a Stripe Checkout session.
  // For demo, return a simulated success with a redirect back to billing.
  return NextResponse.json({
    url: `/billing?upgraded=${planId}`,
  });
}
