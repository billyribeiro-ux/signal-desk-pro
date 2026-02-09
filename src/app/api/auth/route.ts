import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.action === "logout") {
    return NextResponse.json({ success: true });
  }

  // Mock login
  const { email, password } = body;
  if (email === "alex@signaldesk.io" && password === "password123") {
    return NextResponse.json({
      user: {
        id: "usr_1",
        email: "alex@signaldesk.io",
        name: "Alex Morgan",
        role: "admin",
        createdAt: new Date().toISOString(),
      },
      token: "mock-jwt-token",
    });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (type === "profile") {
    return NextResponse.json({
      id: "usr_1",
      name: "Alex Morgan",
      email: "alex@signaldesk.io",
      role: "admin",
      timezone: "America/New_York",
    });
  }

  if (type === "notifications") {
    return NextResponse.json({
      emailDigest: true,
      projectUpdates: true,
      revisionAlerts: true,
      clientActivity: false,
    });
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ ...body, updatedAt: new Date().toISOString() });
}
