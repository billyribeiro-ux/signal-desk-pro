import { NextResponse } from "next/server";
import { computeMetrics, simulateLatency } from "@/lib/api/db";

export async function GET() {
  await simulateLatency();
  const metrics = computeMetrics();
  return NextResponse.json(metrics);
}
