import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    kpis: [
      { label: "Active Clients", value: "48", change: 12, trend: "up" },
      { label: "Open Projects", value: "23", change: -3, trend: "down" },
      { label: "Pending Revisions", value: "7", change: 0, trend: "flat" },
      { label: "Monthly Revenue", value: "$142K", change: 8.5, trend: "up" },
    ],
    recentActivity: [
      { id: "1", type: "client_onboarded", title: "New client onboarded", description: "Acme Corp completed onboarding", actor: "Alex Morgan", createdAt: new Date(Date.now() - 3600000).toISOString() },
      { id: "2", type: "project_created", title: "Project created", description: "Website Redesign for TechStart", actor: "Jordan Lee", createdAt: new Date(Date.now() - 7200000).toISOString() },
      { id: "3", type: "revision_submitted", title: "Revision submitted", description: "Logo v3 for BrandCo", actor: "Sam Chen", createdAt: new Date(Date.now() - 14400000).toISOString() },
    ],
    throughputData: [
      { month: "Jan", completed: 8, submitted: 12 },
      { month: "Feb", completed: 11, submitted: 15 },
      { month: "Mar", completed: 9, submitted: 10 },
      { month: "Apr", completed: 14, submitted: 18 },
      { month: "May", completed: 12, submitted: 14 },
      { month: "Jun", completed: 16, submitted: 20 },
    ],
  });
}
