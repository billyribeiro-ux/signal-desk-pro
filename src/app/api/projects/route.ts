import { NextRequest, NextResponse } from "next/server";

const mockProjects = [
  { id: "1", name: "Website Redesign", description: "Complete overhaul of the corporate website", clientId: "1", clientName: "Acme Corp", status: "active", priority: "high", startDate: "2024-03-01T00:00:00Z", dueDate: "2024-07-15T00:00:00Z", budget: 45000, spent: 28000, progress: 65, tags: ["design", "web"], createdAt: "2024-03-01T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "2", name: "Mobile App MVP", description: "Cross-platform mobile application", clientId: "2", clientName: "TechStart", status: "in_review", priority: "urgent", startDate: "2024-04-01T00:00:00Z", dueDate: "2024-08-01T00:00:00Z", budget: 80000, spent: 55000, progress: 80, tags: ["mobile"], createdAt: "2024-04-01T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "3", name: "Brand Identity", description: "Full brand identity package", clientId: "3", clientName: "BrandCo", status: "completed", priority: "medium", startDate: "2024-01-15T00:00:00Z", dueDate: "2024-04-30T00:00:00Z", completedDate: "2024-04-28T00:00:00Z", budget: 25000, spent: 23000, progress: 100, tags: ["branding"], createdAt: "2024-01-15T00:00:00Z", updatedAt: "2024-04-28T00:00:00Z" },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    const project = mockProjects.find((p) => p.id === id);
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  }
  const page = parseInt(searchParams.get("page") ?? "1");
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const total = mockProjects.length;
  const data = mockProjects.slice((page - 1) * pageSize, page * pageSize);
  return NextResponse.json({ data, meta: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) } });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newProject = { id: `${Date.now()}`, ...body, status: "draft", progress: 0, spent: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  return NextResponse.json(newProject, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ ...body, updatedAt: new Date().toISOString() });
}

export async function DELETE() {
  return NextResponse.json({ success: true });
}
