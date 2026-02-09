import { NextRequest, NextResponse } from "next/server";

const mockRevisions = [
  { id: "1", projectId: "1", projectName: "Website Redesign", title: "Homepage Hero v2", description: "Updated hero section", status: "pending", version: 2, submittedBy: "Jordan Lee", createdAt: new Date(Date.now() - 3600000).toISOString(), updatedAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "2", projectId: "2", projectName: "Mobile App MVP", title: "Onboarding Flow v3", description: "Revised onboarding", status: "approved", version: 3, submittedBy: "Sam Chen", reviewedBy: "Alex Morgan", createdAt: new Date(Date.now() - 86400000).toISOString(), updatedAt: new Date(Date.now() - 43200000).toISOString() },
  { id: "3", projectId: "3", projectName: "Brand Identity", title: "Logo Concepts v1", description: "Initial logo concepts", status: "changes_requested", version: 1, submittedBy: "Jordan Lee", reviewedBy: "Emily Davis", createdAt: new Date(Date.now() - 172800000).toISOString(), updatedAt: new Date(Date.now() - 86400000).toISOString() },
];

const mockThread = [
  { id: "m1", revisionId: "1", author: "Jordan Lee", authorRole: "member", content: "Updated the hero section with new copy and layout per client feedback.", createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "m2", revisionId: "1", author: "Alex Morgan", authorRole: "manager", content: "Looks good overall. Can we adjust the CTA button color?", createdAt: new Date(Date.now() - 1800000).toISOString() },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const revisionId = searchParams.get("revisionId");

  if (type === "thread" && revisionId) {
    return NextResponse.json(mockThread.filter((m) => m.revisionId === revisionId));
  }

  if (id) {
    const rev = mockRevisions.find((r) => r.id === id);
    if (!rev) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(rev);
  }

  const page = parseInt(searchParams.get("page") ?? "1");
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const total = mockRevisions.length;
  const data = mockRevisions.slice((page - 1) * pageSize, page * pageSize);
  return NextResponse.json({ data, meta: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) } });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ ...body, updatedAt: new Date().toISOString() });
}
