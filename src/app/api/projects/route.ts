import { NextRequest, NextResponse } from "next/server";
import { projects, genId, simulateLatency } from "@/lib/api/db";

export async function GET(req: NextRequest) {
  await simulateLatency();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const project = projects.find((p) => p.id === id);
    if (!project) {
      return NextResponse.json(
        { error: { message: "Project not found", code: "NOT_FOUND", status: 404 } },
        { status: 404 },
      );
    }

    const type = searchParams.get("type");
    if (type === "activity") {
      const activity = [
        { id: "act-1", action: "PROJECT_CREATED", description: `Project "${project.name}" was created`, actorName: "Alex Morgan", createdAt: project.createdAt },
        { id: "act-2", action: "STATUS_CHANGED", description: `Status changed to ${project.status.replace("_", " ")}`, actorName: "Jordan Lee", createdAt: new Date(Date.now() - 7 * 86400000).toISOString() },
        { id: "act-3", action: "BUDGET_UPDATED", description: `Budget set to $${Number(project.budget).toLocaleString()}`, actorName: "Alex Morgan", createdAt: new Date(Date.now() - 5 * 86400000).toISOString() },
        { id: "act-4", action: "PROGRESS_UPDATED", description: `Progress updated to ${project.progress}%`, actorName: "Sam Chen", createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
      ];
      return NextResponse.json(activity);
    }

    return NextResponse.json(project);
  }

  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const status = searchParams.get("status") ?? "";
  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 20);

  let filtered = [...projects];
  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.clientName.toLowerCase().includes(search) ||
        p.tags.some((t) => t.toLowerCase().includes(search)),
    );
  }
  if (status) {
    filtered = filtered.filter((p) => p.status === status);
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
  const now = new Date().toISOString();
  const newProject = {
    id: genId(),
    ...body,
    status: "draft" as const,
    progress: 0,
    spent: 0,
    createdAt: now,
    updatedAt: now,
  };
  projects.unshift(newProject);
  return NextResponse.json(newProject, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await simulateLatency(150);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const body = await req.json();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) {
    return NextResponse.json(
      { error: { message: "Project not found", code: "NOT_FOUND", status: 404 } },
      { status: 404 },
    );
  }
  projects[idx] = { ...projects[idx], ...body, updatedAt: new Date().toISOString() };
  return NextResponse.json(projects[idx]);
}

export async function DELETE(req: NextRequest) {
  await simulateLatency(100);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) {
    return NextResponse.json(
      { error: { message: "Project not found", code: "NOT_FOUND", status: 404 } },
      { status: 404 },
    );
  }
  projects.splice(idx, 1);
  return new NextResponse(null, { status: 204 });
}
