import { NextRequest, NextResponse } from "next/server";
import { clients, genId, simulateLatency } from "@/lib/api/db";

export async function GET(request: NextRequest) {
  await simulateLatency();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const client = clients.find((c) => c.id === id);
    if (!client) {
      return NextResponse.json(
        { error: { message: "Client not found", code: "NOT_FOUND", status: 404 } },
        { status: 404 },
      );
    }
    return NextResponse.json(client);
  }

  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const status = searchParams.get("status") ?? "";
  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 20);

  let filtered = [...clients];
  if (search) {
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.company.toLowerCase().includes(search) ||
        c.email.toLowerCase().includes(search),
    );
  }
  if (status) {
    filtered = filtered.filter((c) => c.status === status);
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return NextResponse.json({ data, meta: { total, page, pageSize, totalPages } });
}

export async function POST(request: NextRequest) {
  await simulateLatency(200);
  const body = await request.json();
  const now = new Date().toISOString();
  const newClient = {
    id: genId(),
    ...body,
    status: "onboarding" as const,
    projectCount: 0,
    totalRevenue: 0,
    createdAt: now,
    updatedAt: now,
  };
  clients.unshift(newClient);
  return NextResponse.json(newClient, { status: 201 });
}

export async function PUT(request: NextRequest) {
  await simulateLatency(150);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const body = await request.json();
  const idx = clients.findIndex((c) => c.id === id);
  if (idx === -1) {
    return NextResponse.json(
      { error: { message: "Client not found", code: "NOT_FOUND", status: 404 } },
      { status: 404 },
    );
  }
  clients[idx] = { ...clients[idx], ...body, updatedAt: new Date().toISOString() };
  return NextResponse.json(clients[idx]);
}

export async function DELETE(request: NextRequest) {
  await simulateLatency(100);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const idx = clients.findIndex((c) => c.id === id);
  if (idx === -1) {
    return NextResponse.json(
      { error: { message: "Client not found", code: "NOT_FOUND", status: 404 } },
      { status: 404 },
    );
  }
  clients.splice(idx, 1);
  return new NextResponse(null, { status: 204 });
}
