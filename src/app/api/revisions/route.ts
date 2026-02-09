import { NextRequest, NextResponse } from "next/server";
import { revisions, genId, simulateLatency } from "@/lib/api/db";
import type { RevisionStatus } from "@/features/revisions/types";

const threads: Record<string, Array<{ id: string; revisionId: string; author: string; authorRole: string; content: string; createdAt: string }>> = {
  "1": [
    { id: "m1", revisionId: "1", author: "Jordan Lee", authorRole: "member", content: "Updated the hero section with new copy and layout per client feedback.", createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: "m2", revisionId: "1", author: "Alex Morgan", authorRole: "manager", content: "Looks good overall. Can we adjust the CTA button color to match the brand guide?", createdAt: new Date(Date.now() - 1800000).toISOString() },
  ],
  "3": [
    { id: "m3", revisionId: "3", author: "Jordan Lee", authorRole: "member", content: "Here are three logo directions — wordmark, abstract mark, and combination.", createdAt: new Date(Date.now() - 172800000).toISOString() },
    { id: "m4", revisionId: "3", author: "Emily Davis", authorRole: "admin", content: "I like direction 2 but the colors feel too muted. Can we try bolder tones?", createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: "m5", revisionId: "3", author: "Jordan Lee", authorRole: "member", content: "Sure — I'll revise with a more saturated palette and send v2.", createdAt: new Date(Date.now() - 43200000).toISOString() },
  ],
};

export async function GET(req: NextRequest) {
  await simulateLatency();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const revisionId = searchParams.get("revisionId");

  if (type === "thread" && revisionId) {
    return NextResponse.json(threads[revisionId] ?? []);
  }

  if (id) {
    const rev = revisions.find((r) => r.id === id);
    if (!rev) {
      return NextResponse.json(
        { error: { message: "Revision not found", code: "NOT_FOUND", status: 404 } },
        { status: 404 },
      );
    }
    return NextResponse.json(rev);
  }

  const status = searchParams.get("status") ?? "";
  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 20);

  let filtered = [...revisions];
  if (status) {
    filtered = filtered.filter((r) => r.status === status);
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return NextResponse.json({ data, meta: { total, page, pageSize, totalPages } });
}

export async function POST(req: NextRequest) {
  await simulateLatency(200);
  const body = await req.json();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  // Add a thread message
  if (type === "thread") {
    const revisionId = body.revisionId as string;
    if (!threads[revisionId]) threads[revisionId] = [];
    const msg = { id: genId(), revisionId, author: body.author ?? "Alex Morgan", authorRole: body.authorRole ?? "admin", content: body.content, createdAt: new Date().toISOString() };
    threads[revisionId].push(msg);
    return NextResponse.json(msg, { status: 201 });
  }

  // Update revision status (approve/reject/request_changes)
  if (type === "action") {
    const revisionId = body.revisionId as string;
    const action = body.action as RevisionStatus;
    const idx = revisions.findIndex((r) => r.id === revisionId);
    if (idx === -1) {
      return NextResponse.json(
        { error: { message: "Revision not found", code: "NOT_FOUND", status: 404 } },
        { status: 404 },
      );
    }
    revisions[idx] = { ...revisions[idx], status: action, reviewedBy: "Alex Morgan", updatedAt: new Date().toISOString() };
    return NextResponse.json(revisions[idx]);
  }

  // Create new revision
  const now = new Date().toISOString();
  const newRev = { id: genId(), ...body, status: "pending" as const, createdAt: now, updatedAt: now };
  revisions.unshift(newRev);
  return NextResponse.json(newRev, { status: 201 });
}
