import { PrismaClient, MemberRole, ClientStatus, ProjectStatus, ProjectPriority, RevisionStatus, SubscriptionPlan, SubscriptionStatus, ActivityAction, NotificationType } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding SignalDesk Pro database...");

  // ─── Organization ───────────────────────────────────────────────────────────
  const org = await prisma.organization.create({
    data: {
      name: "SignalDesk Agency",
      slug: "signaldesk-agency",
    },
  });

  // ─── Users ──────────────────────────────────────────────────────────────────
  const alex = await prisma.user.create({
    data: {
      name: "Alex Morgan",
      email: "alex@signaldesk.io",
    },
  });

  const jordan = await prisma.user.create({
    data: {
      name: "Jordan Lee",
      email: "jordan@signaldesk.io",
    },
  });

  const sam = await prisma.user.create({
    data: {
      name: "Sam Chen",
      email: "sam@signaldesk.io",
    },
  });

  // ─── Memberships ───────────────────────────────────────────────────────────
  await prisma.membership.createMany({
    data: [
      { userId: alex.id, organizationId: org.id, role: MemberRole.OWNER, inviteAccepted: true },
      { userId: jordan.id, organizationId: org.id, role: MemberRole.MANAGER, inviteAccepted: true },
      { userId: sam.id, organizationId: org.id, role: MemberRole.MANAGER, inviteAccepted: true },
    ],
  });

  // ─── Subscription ──────────────────────────────────────────────────────────
  await prisma.subscription.create({
    data: {
      organizationId: org.id,
      plan: SubscriptionPlan.GROWTH,
      status: SubscriptionStatus.ACTIVE,
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  // ─── Clients ───────────────────────────────────────────────────────────────
  const clientsData = [
    { name: "Sarah Johnson", email: "sarah@acmecorp.com", company: "Acme Corp", industry: "Technology", status: ClientStatus.ACTIVE, phone: "+1 555-0101", website: "https://acmecorp.com", totalRevenue: 145000 },
    { name: "Mike Chen", email: "mike@techstart.io", company: "TechStart", industry: "SaaS", status: ClientStatus.ONBOARDING, phone: "+1 555-0102", website: "https://techstart.io", totalRevenue: 12000 },
    { name: "Emily Davis", email: "emily@brandco.com", company: "BrandCo", industry: "Marketing", status: ClientStatus.ACTIVE, phone: "+1 555-0103", website: "https://brandco.com", totalRevenue: 278000 },
    { name: "James Wilson", email: "james@globalfin.com", company: "GlobalFin", industry: "Finance", status: ClientStatus.PAUSED, phone: "+1 555-0104", website: "https://globalfin.com", totalRevenue: 94000 },
    { name: "Lisa Park", email: "lisa@creativelab.co", company: "Creative Lab", industry: "Design", status: ClientStatus.ACTIVE, phone: "+1 555-0105", website: "https://creativelab.co", totalRevenue: 156000 },
    { name: "David Kim", email: "david@novahealth.com", company: "Nova Health", industry: "Healthcare", status: ClientStatus.ACTIVE, phone: "+1 555-0106", website: "https://novahealth.com", totalRevenue: 89000 },
    { name: "Rachel Torres", email: "rachel@edufirst.org", company: "EduFirst", industry: "Education", status: ClientStatus.CHURNED, phone: "+1 555-0107", website: "https://edufirst.org", totalRevenue: 23000 },
    { name: "Tom Bradley", email: "tom@urbandev.co", company: "Urban Dev", industry: "Real Estate", status: ClientStatus.ACTIVE, phone: "+1 555-0108", website: "https://urbandev.co", totalRevenue: 210000 },
  ];

  const clients = [];
  for (const c of clientsData) {
    const client = await prisma.client.create({
      data: {
        organizationId: org.id,
        name: c.name,
        email: c.email,
        company: c.company,
        industry: c.industry,
        status: c.status,
        phone: c.phone,
        website: c.website,
        totalRevenue: c.totalRevenue,
        accountManagerId: alex.id,
      },
    });
    clients.push(client);
  }

  // ─── Projects ──────────────────────────────────────────────────────────────
  const projectsData = [
    { clientIdx: 0, name: "Website Redesign", description: "Complete overhaul of the corporate website with modern design system", status: ProjectStatus.IN_PROGRESS, priority: ProjectPriority.HIGH, budget: 45000, spent: 28000, progress: 65, tags: ["design", "web"] },
    { clientIdx: 1, name: "Mobile App MVP", description: "Cross-platform mobile application for client portal access", status: ProjectStatus.REVIEW, priority: ProjectPriority.URGENT, budget: 80000, spent: 55000, progress: 80, tags: ["mobile", "react-native"] },
    { clientIdx: 2, name: "Brand Identity", description: "Full brand identity package including logo, typography, and guidelines", status: ProjectStatus.DELIVERED, priority: ProjectPriority.MEDIUM, budget: 25000, spent: 23000, progress: 100, tags: ["branding"] },
    { clientIdx: 3, name: "Analytics Dashboard", description: "Custom analytics dashboard with real-time data visualization", status: ProjectStatus.INTAKE, priority: ProjectPriority.LOW, budget: 60000, spent: 0, progress: 0, tags: ["analytics", "dashboard"] },
    { clientIdx: 4, name: "E-commerce Platform", description: "Headless e-commerce solution with custom checkout flow", status: ProjectStatus.IN_PROGRESS, priority: ProjectPriority.HIGH, budget: 95000, spent: 72000, progress: 78, tags: ["ecommerce", "nextjs"] },
    { clientIdx: 0, name: "SEO Audit", description: "Comprehensive SEO audit and optimization recommendations", status: ProjectStatus.IN_PROGRESS, priority: ProjectPriority.MEDIUM, budget: 8000, spent: 5500, progress: 70, tags: ["seo"] },
    { clientIdx: 5, name: "Patient Portal", description: "HIPAA-compliant patient portal with appointment scheduling", status: ProjectStatus.IN_PROGRESS, priority: ProjectPriority.HIGH, budget: 120000, spent: 45000, progress: 35, tags: ["healthcare", "portal"] },
    { clientIdx: 7, name: "Property Listings", description: "Real estate listing platform with virtual tour integration", status: ProjectStatus.REVIEW, priority: ProjectPriority.MEDIUM, budget: 55000, spent: 48000, progress: 90, tags: ["real-estate", "web"] },
  ];

  const projects = [];
  for (const p of projectsData) {
    const project = await prisma.project.create({
      data: {
        organizationId: org.id,
        clientId: clients[p.clientIdx].id,
        name: p.name,
        description: p.description,
        status: p.status,
        priority: p.priority,
        budget: p.budget,
        spent: p.spent,
        progress: p.progress,
        tags: p.tags,
        startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
    projects.push(project);
  }

  // ─── Revision Requests ─────────────────────────────────────────────────────
  const revisionsData = [
    { projectIdx: 0, title: "Homepage Hero v2", description: "Updated hero section with new copy and layout", status: RevisionStatus.PENDING, version: 2, submittedBy: jordan.id },
    { projectIdx: 1, title: "Onboarding Flow v3", description: "Revised onboarding with simplified steps", status: RevisionStatus.APPROVED, version: 3, submittedBy: sam.id, reviewedBy: alex.id },
    { projectIdx: 2, title: "Logo Concepts v1", description: "Initial logo concepts for review", status: RevisionStatus.CHANGES_REQUESTED, version: 1, submittedBy: jordan.id, reviewedBy: alex.id },
    { projectIdx: 4, title: "Checkout Flow v4", description: "Streamlined checkout with fewer steps", status: RevisionStatus.REJECTED, version: 4, submittedBy: sam.id, reviewedBy: alex.id },
    { projectIdx: 0, title: "Navigation Redesign v1", description: "New responsive navigation with mega-menu", status: RevisionStatus.PENDING, version: 1, submittedBy: jordan.id },
    { projectIdx: 6, title: "Dashboard Wireframes v2", description: "Updated wireframes for patient dashboard", status: RevisionStatus.APPROVED, version: 2, submittedBy: sam.id, reviewedBy: alex.id },
    { projectIdx: 7, title: "Listing Card Design v1", description: "Property listing card component design", status: RevisionStatus.PENDING, version: 1, submittedBy: jordan.id },
  ];

  const revisions = [];
  for (const r of revisionsData) {
    const rev = await prisma.revisionRequest.create({
      data: {
        organizationId: org.id,
        projectId: projects[r.projectIdx].id,
        title: r.title,
        description: r.description,
        status: r.status,
        version: r.version,
        submittedBy: r.submittedBy,
        reviewedBy: r.reviewedBy,
      },
    });
    revisions.push(rev);
  }

  // ─── Revision Messages (threads) ───────────────────────────────────────────
  await prisma.revisionMessage.createMany({
    data: [
      { revisionRequestId: revisions[0].id, authorId: jordan.id, authorName: "Jordan Lee", authorRole: "MANAGER", content: "Updated the hero section with new copy and layout per client feedback." },
      { revisionRequestId: revisions[0].id, authorId: alex.id, authorName: "Alex Morgan", authorRole: "OWNER", content: "Looks good overall. Can we adjust the CTA button color to match the brand guide?" },
      { revisionRequestId: revisions[2].id, authorId: jordan.id, authorName: "Jordan Lee", authorRole: "MANAGER", content: "Here are three logo directions — wordmark, abstract mark, and combination." },
      { revisionRequestId: revisions[2].id, authorId: alex.id, authorName: "Alex Morgan", authorRole: "OWNER", content: "I like direction 2 but the colors feel too muted. Can we try bolder tones?" },
      { revisionRequestId: revisions[2].id, authorId: jordan.id, authorName: "Jordan Lee", authorRole: "MANAGER", content: "Sure — I'll revise with a more saturated palette and send v2." },
    ],
  });

  // ─── Activity Logs ─────────────────────────────────────────────────────────
  const activities = [
    { action: ActivityAction.CLIENT_CREATED, description: "TechStart completed onboarding", actorId: alex.id, actorName: "Alex Morgan" },
    { action: ActivityAction.PROJECT_CREATED, description: `Patient Portal created for Nova Health`, actorId: jordan.id, actorName: "Jordan Lee", projectId: projects[6].id },
    { action: ActivityAction.REVISION_SUBMITTED, description: `Homepage Hero v2 submitted for Website Redesign`, actorId: sam.id, actorName: "Sam Chen", projectId: projects[0].id },
    { action: ActivityAction.PROJECT_STATUS_CHANGED, description: `Brand Identity moved to Review`, actorId: alex.id, actorName: "Alex Morgan", projectId: projects[2].id },
    { action: ActivityAction.REVISION_APPROVED, description: `Onboarding Flow v3 approved`, actorId: alex.id, actorName: "Alex Morgan", projectId: projects[1].id },
    { action: ActivityAction.PROJECT_CREATED, description: `Marketing Automation delivered`, actorId: jordan.id, actorName: "Jordan Lee" },
  ];

  for (let i = 0; i < activities.length; i++) {
    const a = activities[i];
    await prisma.activityLog.create({
      data: {
        organizationId: org.id,
        actorId: a.actorId,
        actorName: a.actorName,
        action: a.action,
        description: a.description,
        projectId: a.projectId,
        createdAt: new Date(Date.now() - (i + 1) * 3600000),
      },
    });
  }

  // ─── Notifications ─────────────────────────────────────────────────────────
  await prisma.notification.createMany({
    data: [
      { organizationId: org.id, userId: alex.id, type: NotificationType.REVISION_UPDATE, title: "New revision submitted", body: "Jordan Lee submitted Homepage Hero v2 for review", href: "/revisions" },
      { organizationId: org.id, userId: alex.id, type: NotificationType.PROJECT_UPDATE, title: "Project milestone reached", body: "E-commerce Platform is 78% complete", href: "/projects" },
      { organizationId: org.id, userId: jordan.id, type: NotificationType.APPROVAL, title: "Revision approved", body: "Alex Morgan approved Onboarding Flow v3", href: "/revisions" },
      { organizationId: org.id, userId: sam.id, type: NotificationType.REJECTION, title: "Revision rejected", body: "Checkout Flow v4 was rejected — see feedback", href: "/revisions", read: true },
    ],
  });

  console.log("✅ Seed complete!");
  console.log(`   Organization: ${org.name} (${org.slug})`);
  console.log(`   Users: ${3}`);
  console.log(`   Clients: ${clients.length}`);
  console.log(`   Projects: ${projects.length}`);
  console.log(`   Revisions: ${revisions.length}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
