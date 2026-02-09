import { NextRequest, NextResponse } from "next/server";

const mockClients = [
  { id: "1", name: "Sarah Johnson", email: "sarah@acmecorp.com", company: "Acme Corp", status: "active", industry: "Technology", projectCount: 3, totalRevenue: 45000, createdAt: "2024-01-15T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "2", name: "Mike Chen", email: "mike@techstart.io", company: "TechStart", status: "onboarding", industry: "SaaS", projectCount: 1, totalRevenue: 12000, createdAt: "2024-03-20T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "3", name: "Emily Davis", email: "emily@brandco.com", company: "BrandCo", status: "active", industry: "Marketing", projectCount: 5, totalRevenue: 78000, createdAt: "2023-11-10T00:00:00Z", updatedAt: "2024-05-28T00:00:00Z" },
  { id: "4", name: "James Wilson", email: "james@globalfin.com", company: "GlobalFin", status: "paused", industry: "Finance", projectCount: 2, totalRevenue: 34000, createdAt: "2024-02-01T00:00:00Z", updatedAt: "2024-04-15T00:00:00Z" },
  { id: "5", name: "Lisa Park", email: "lisa@creativelab.co", company: "Creative Lab", status: "active", industry: "Design", projectCount: 4, totalRevenue: 56000, createdAt: "2023-09-05T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    const client = mockClients.find((c) => c.id === id);
    if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(client);
  }
  const page = parseInt(searchParams.get("page") ?? "1");
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const search = searchParams.get("search") ?? "";
  let filtered = mockClients;
  if (search) filtered = filtered.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase()));
  const total = filtered.length;
  const data = filtered.slice((page - 1) * pageSize, page * pageSize);
  return NextResponse.json({ data, meta: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) } });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newClient = { id: `${Date.now()}`, ...body, status: "onboarding", projectCount: 0, totalRevenue: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  return NextResponse.json(newClient, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ ...body, updatedAt: new Date().toISOString() });
}

export async function DELETE() {
  return NextResponse.json({ success: true });
}
