import { NextResponse } from "next/server";
import { simulateLatency } from "@/lib/api/db";

// In production, this would use prisma + stripe SDK.
// For now, returns mock subscription data from the in-memory DB.

export async function GET() {
  await simulateLatency();
  return NextResponse.json({
    plan: "GROWTH",
    status: "ACTIVE",
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  });
}
