/**
 * In-memory database for SignalDesk Pro.
 * In a real SaaS this would be Prisma/Drizzle + PostgreSQL.
 * This module is server-only (imported by API routes).
 */

import type { Client } from "@/features/clients/types";
import type { Project, ProjectStatus, ProjectPriority } from "@/features/projects/types";
import type { Revision, RevisionStatus } from "@/features/revisions/types";
import type { KpiMetric, ActivityItem } from "@/features/dashboard/types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
let nextId = 100;
export function genId() {
  return String(++nextId);
}

export async function simulateLatency(ms = 120) {
  await new Promise((r) => setTimeout(r, ms + Math.random() * 80));
}

// ---------------------------------------------------------------------------
// Clients
// ---------------------------------------------------------------------------
export const clients: Client[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah@acmecorp.com", company: "Acme Corp", status: "active", industry: "Technology", phone: "+1 555-0101", website: "https://acmecorp.com", notes: "Enterprise client since 2023", projectCount: 3, totalRevenue: 145000, createdAt: "2023-01-15T10:00:00Z", updatedAt: "2024-06-01T14:30:00Z" },
  { id: "2", name: "Mike Chen", email: "mike@techstart.io", company: "TechStart", status: "onboarding", industry: "SaaS", phone: "+1 555-0102", website: "https://techstart.io", projectCount: 1, totalRevenue: 12000, createdAt: "2024-03-20T09:00:00Z", updatedAt: "2024-06-01T11:00:00Z" },
  { id: "3", name: "Emily Davis", email: "emily@brandco.com", company: "BrandCo", status: "active", industry: "Marketing", phone: "+1 555-0103", website: "https://brandco.com", notes: "Referred by Sarah Johnson", projectCount: 5, totalRevenue: 278000, createdAt: "2023-06-10T08:00:00Z", updatedAt: "2024-05-28T16:45:00Z" },
  { id: "4", name: "James Wilson", email: "james@globalfin.com", company: "GlobalFin", status: "paused", industry: "Finance", phone: "+1 555-0104", website: "https://globalfin.com", notes: "Paused due to budget review", projectCount: 2, totalRevenue: 94000, createdAt: "2024-02-01T12:00:00Z", updatedAt: "2024-04-15T10:00:00Z" },
  { id: "5", name: "Lisa Park", email: "lisa@creativelab.co", company: "Creative Lab", status: "active", industry: "Design", phone: "+1 555-0105", website: "https://creativelab.co", projectCount: 4, totalRevenue: 156000, createdAt: "2023-09-05T14:00:00Z", updatedAt: "2024-06-01T09:15:00Z" },
  { id: "6", name: "David Kim", email: "david@novahealth.com", company: "Nova Health", status: "active", industry: "Healthcare", phone: "+1 555-0106", website: "https://novahealth.com", projectCount: 2, totalRevenue: 89000, createdAt: "2024-01-10T11:00:00Z", updatedAt: "2024-05-20T13:30:00Z" },
  { id: "7", name: "Rachel Torres", email: "rachel@edufirst.org", company: "EduFirst", status: "churned", industry: "Education", phone: "+1 555-0107", website: "https://edufirst.org", notes: "Churned — switched to in-house team", projectCount: 1, totalRevenue: 23000, createdAt: "2023-11-01T10:00:00Z", updatedAt: "2024-03-01T09:00:00Z" },
  { id: "8", name: "Tom Bradley", email: "tom@urbandev.co", company: "Urban Dev", status: "active", industry: "Real Estate", phone: "+1 555-0108", website: "https://urbandev.co", projectCount: 3, totalRevenue: 210000, createdAt: "2023-04-15T08:30:00Z", updatedAt: "2024-06-02T15:00:00Z" },
];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------
export const projects: Project[] = [
  { id: "1", name: "Website Redesign", description: "Complete overhaul of the corporate website with modern design system and improved UX patterns.", clientId: "1", clientName: "Acme Corp", status: "active" as ProjectStatus, priority: "high" as ProjectPriority, startDate: "2024-03-01T00:00:00Z", dueDate: "2024-07-15T00:00:00Z", budget: 45000, spent: 28000, progress: 65, tags: ["design", "web", "ux"], createdAt: "2024-03-01T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "2", name: "Mobile App MVP", description: "Native iOS and Android app for client self-service portal with push notifications.", clientId: "2", clientName: "TechStart", status: "active" as ProjectStatus, priority: "high" as ProjectPriority, startDate: "2024-04-01T00:00:00Z", dueDate: "2024-09-30T00:00:00Z", budget: 85000, spent: 32000, progress: 38, tags: ["mobile", "ios", "android"], createdAt: "2024-04-01T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "3", name: "Brand Identity System", description: "Complete brand identity including logo, typography, color system, and brand guidelines.", clientId: "3", clientName: "BrandCo", status: "in_review" as ProjectStatus, priority: "medium" as ProjectPriority, startDate: "2024-02-15T00:00:00Z", dueDate: "2024-06-30T00:00:00Z", budget: 28000, spent: 24000, progress: 88, tags: ["branding", "design"], createdAt: "2024-02-15T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "4", name: "Analytics Dashboard", description: "Real-time analytics dashboard with custom reporting and data visualization.", clientId: "4", clientName: "GlobalFin", status: "draft" as ProjectStatus, priority: "low" as ProjectPriority, startDate: "2024-06-01T00:00:00Z", dueDate: "2024-10-31T00:00:00Z", budget: 62000, spent: 0, progress: 0, tags: ["analytics", "dashboard"], createdAt: "2024-06-01T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "5", name: "E-commerce Platform", description: "Full-featured e-commerce platform with inventory management and payment processing.", clientId: "5", clientName: "Creative Lab", status: "active" as ProjectStatus, priority: "high" as ProjectPriority, startDate: "2024-01-15T00:00:00Z", dueDate: "2024-08-15T00:00:00Z", budget: 120000, spent: 78000, progress: 55, tags: ["ecommerce", "web", "payments"], createdAt: "2024-01-15T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "6", name: "Patient Portal", description: "HIPAA-compliant patient portal with appointment scheduling and medical records.", clientId: "6", clientName: "Nova Health", status: "active" as ProjectStatus, priority: "high" as ProjectPriority, startDate: "2024-03-15T00:00:00Z", dueDate: "2024-09-15T00:00:00Z", budget: 95000, spent: 41000, progress: 42, tags: ["healthcare", "portal", "compliance"], createdAt: "2024-03-15T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
  { id: "7", name: "Marketing Automation", description: "Email marketing automation with segmentation, A/B testing, and analytics.", clientId: "3", clientName: "BrandCo", status: "completed" as ProjectStatus, priority: "medium" as ProjectPriority, startDate: "2023-10-01T00:00:00Z", dueDate: "2024-02-28T00:00:00Z", budget: 35000, spent: 33000, progress: 100, tags: ["marketing", "automation", "email"], createdAt: "2023-10-01T00:00:00Z", updatedAt: "2024-02-28T00:00:00Z" },
  { id: "8", name: "Property Listings App", description: "Interactive property listings with virtual tours, map integration, and lead capture.", clientId: "8", clientName: "Urban Dev", status: "active" as ProjectStatus, priority: "medium" as ProjectPriority, startDate: "2024-02-01T00:00:00Z", dueDate: "2024-07-31T00:00:00Z", budget: 72000, spent: 48000, progress: 70, tags: ["real-estate", "web", "maps"], createdAt: "2024-02-01T00:00:00Z", updatedAt: "2024-06-01T00:00:00Z" },
];

// ---------------------------------------------------------------------------
// Revisions
// ---------------------------------------------------------------------------
export const revisions: Revision[] = [
  { id: "1", projectId: "1", projectName: "Website Redesign", title: "Homepage Hero v2", description: "Updated hero section with new copy, gradient background, and improved CTA placement.", status: "pending" as RevisionStatus, version: 2, submittedBy: "Jordan Lee", createdAt: new Date(Date.now() - 3600000).toISOString(), updatedAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "2", projectId: "2", projectName: "Mobile App MVP", title: "Onboarding Flow v3", description: "Revised onboarding with simplified 3-step process and progress indicator.", status: "approved" as RevisionStatus, version: 3, submittedBy: "Sam Chen", reviewedBy: "Alex Morgan", createdAt: new Date(Date.now() - 86400000).toISOString(), updatedAt: new Date(Date.now() - 43200000).toISOString() },
  { id: "3", projectId: "3", projectName: "Brand Identity System", title: "Logo Concepts v1", description: "Initial logo concepts — 3 directions: wordmark, abstract mark, and combination.", status: "changes_requested" as RevisionStatus, version: 1, submittedBy: "Jordan Lee", reviewedBy: "Emily Davis", createdAt: new Date(Date.now() - 172800000).toISOString(), updatedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "4", projectId: "5", projectName: "E-commerce Platform", title: "Checkout Flow v4", description: "Streamlined checkout with guest checkout option and saved payment methods.", status: "rejected" as RevisionStatus, version: 4, submittedBy: "Sam Chen", reviewedBy: "Alex Morgan", createdAt: new Date(Date.now() - 259200000).toISOString(), updatedAt: new Date(Date.now() - 172800000).toISOString() },
  { id: "5", projectId: "1", projectName: "Website Redesign", title: "Navigation Redesign v1", description: "Mega menu with product categories, search integration, and mobile hamburger.", status: "approved" as RevisionStatus, version: 1, submittedBy: "Jordan Lee", reviewedBy: "Sarah Johnson", createdAt: new Date(Date.now() - 432000000).toISOString(), updatedAt: new Date(Date.now() - 345600000).toISOString() },
  { id: "6", projectId: "6", projectName: "Patient Portal", title: "Dashboard Layout v2", description: "Reorganized dashboard with upcoming appointments widget and quick actions.", status: "pending" as RevisionStatus, version: 2, submittedBy: "Alex Morgan", createdAt: new Date(Date.now() - 7200000).toISOString(), updatedAt: new Date(Date.now() - 7200000).toISOString() },
  { id: "7", projectId: "8", projectName: "Property Listings App", title: "Map View v3", description: "Interactive map with clustering, filter overlay, and property preview cards.", status: "approved" as RevisionStatus, version: 3, submittedBy: "Sam Chen", reviewedBy: "Tom Bradley", createdAt: new Date(Date.now() - 518400000).toISOString(), updatedAt: new Date(Date.now() - 432000000).toISOString() },
];

// ---------------------------------------------------------------------------
// Dashboard metrics (computed)
// ---------------------------------------------------------------------------
export function computeMetrics(): { kpis: KpiMetric[]; activity: ActivityItem[]; throughput: number[] } {
  const activeClients = clients.filter((c) => c.status === "active").length;
  const openProjects = projects.filter((p) => p.status === "active" || p.status === "in_review").length;
  const pendingRevisions = revisions.filter((r) => r.status === "pending").length;
  const monthlyRevenue = clients.reduce((sum, c) => sum + c.totalRevenue, 0);

  return {
    kpis: [
      { label: "Active Clients", value: String(activeClients), change: 12, trend: "up" as const },
      { label: "Open Projects", value: String(openProjects), change: -3, trend: "down" as const },
      { label: "Pending Revisions", value: String(pendingRevisions), change: 2, trend: "up" as const },
      { label: "Monthly Revenue", value: `$${Math.round(monthlyRevenue / 1000)}K`, change: 8.5, trend: "up" as const },
    ],
    activity: [
      { id: "a1", type: "client_onboarded", title: "New client onboarded", description: "TechStart completed onboarding", actor: "Alex Morgan", createdAt: new Date(Date.now() - 3600000).toISOString() },
      { id: "a2", type: "project_created", title: "Project created", description: "Patient Portal for Nova Health", actor: "Jordan Lee", createdAt: new Date(Date.now() - 7200000).toISOString() },
      { id: "a3", type: "revision_submitted", title: "Revision submitted", description: "Homepage Hero v2 for Website Redesign", actor: "Sam Chen", createdAt: new Date(Date.now() - 14400000).toISOString() },
      { id: "a4", type: "status_changed", title: "Status updated", description: "Brand Identity moved to In Review", actor: "Alex Morgan", createdAt: new Date(Date.now() - 28800000).toISOString() },
      { id: "a5", type: "revision_submitted", title: "Revision approved", description: "Onboarding Flow v3 approved", actor: "Alex Morgan", createdAt: new Date(Date.now() - 43200000).toISOString() },
      { id: "a6", type: "project_created", title: "Project completed", description: "Marketing Automation delivered", actor: "Jordan Lee", createdAt: new Date(Date.now() - 86400000).toISOString() },
    ],
    throughput: [40, 55, 45, 70, 60, 80],
  };
}
