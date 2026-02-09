import { NextRequest, NextResponse } from "next/server";
import { simulateLatency } from "@/lib/api/db";

// In-memory notifications store (replaced by Prisma in production)
const notifications = [
  { id: "n1", type: "REVISION_UPDATE", title: "New revision submitted", body: "Jordan Lee submitted Homepage Hero v2 for review", href: "/revisions", read: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "n2", type: "PROJECT_UPDATE", title: "Project milestone reached", body: "E-commerce Platform is 78% complete", href: "/projects", read: false, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: "n3", type: "APPROVAL", title: "Revision approved", body: "Alex Morgan approved Onboarding Flow v3", href: "/revisions", read: false, createdAt: new Date(Date.now() - 14400000).toISOString() },
  { id: "n4", type: "REJECTION", title: "Revision rejected", body: "Checkout Flow v4 was rejected — see feedback", href: "/revisions", read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "n5", type: "INVITE", title: "New team member", body: "Sam Chen joined the organization", href: "/settings", read: true, createdAt: new Date(Date.now() - 172800000).toISOString() },
];

export async function GET(req: NextRequest) {
  await simulateLatency();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (type === "unread-count") {
    const count = notifications.filter((n) => !n.read).length;
    return NextResponse.json({ count });
  }

  return NextResponse.json({ data: notifications });
}

export async function POST(req: NextRequest) {
  await simulateLatency(100);
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");

  if (action === "mark-read") {
    const body = await req.json();
    const id = body.id as string;
    const notif = notifications.find((n) => n.id === id);
    if (notif) notif.read = true;
    return NextResponse.json({ success: true });
  }

  if (action === "mark-all-read") {
    notifications.forEach((n) => { n.read = true; });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: { message: "Unknown action", code: "BAD_REQUEST", status: 400 } },
    { status: 400 },
  );
}
