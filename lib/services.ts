import {
  FileText,
  Workflow,
  Users,
  Truck,
  MapPin,
  BarChart3,
  type LucideIcon
} from "lucide-react";

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  long: string;
  includes: string[];
  audience: string;
  timeline: string;
}

export const services: Service[] = [
  {
    slug: "quotation-mis",
    icon: FileText,
    title: "Quotation & MIS Platforms",
    short:
      "Replace messy quote sheets with a quoting engine that knows your products, your pricing logic, and your approval flow.",
    long: "A proper quoting engine purpose-built for product-configurable businesses — fenestration, modular interiors, PEB, fabricators. Catalogue-aware pricing, multi-level discount approvals, version history per enquiry, conversion-to-order in a click, and an MIS layer that shows leadership exactly where each rupee in the pipeline sits.",
    includes: [
      "Product catalogue with configurable BOM and pricing rules",
      "Versioned quotations with PDF export to your letterhead",
      "Approval matrix with role-based discount caps",
      "Lead-to-quote-to-order conversion tracking",
      "Daily, weekly, and monthly MIS reports out of the box"
    ],
    audience:
      "Fabricators, fenestration companies, modular interior firms, and any project-based business where quotes carry meaningful BOM complexity.",
    timeline: "1–2 weeks for an initial deployment."
  },
  {
    slug: "end-to-end-workflow",
    icon: Workflow,
    title: "End-to-End Workflow Systems",
    short:
      "One platform from enquiry to installation. No handoffs lost in WhatsApp. No status updates in Excel.",
    long: "The full operational backbone — enquiry, quotation, sales order, production planning, dispatch, installation, and service. Every department sees the same source of truth in real time. Handoffs happen with explicit status changes, not Forwarded messages. Leadership gets one pane of glass across the entire customer journey.",
    includes: [
      "Modular workflow per department with explicit handoff states",
      "Customer 360 view across every interaction",
      "Document and drawing attachment at every stage",
      "Audit log of who did what, when, and why",
      "Mobile-friendly views for site and shop-floor teams"
    ],
    audience:
      "Businesses where work crosses 4+ departments before fulfilment.",
    timeline: "1–2 weeks per module, layered in as you go."
  },
  {
    slug: "sales-crm",
    icon: Users,
    title: "Sales CRM (Custom-built)",
    short:
      "Sales pipelines designed around how your business actually closes work — not how SaaS startups close work.",
    long: "Industrial sales cycles aren't 'demo → trial → close'. They're 'site visit → measurement → quote → revision → site visit again → order'. We build a CRM around the real cycle: territory hierarchies, BDM/RM mapping, site visit logging, lost-reason analytics, and reminder logic that respects how your sales heads actually work.",
    includes: [
      "Custom pipeline stages mapped to your real sales motion",
      "Territory and BDM hierarchies with auto-routing of leads",
      "Site visit and measurement tracking with photo upload",
      "Follow-up cadences and missed-task escalation",
      "Lost reason analytics so you can act on it, not just log it"
    ],
    audience:
      "Sales-led businesses with 5+ BDMs spread across regions or states.",
    timeline: "1–2 weeks for an initial rollout."
  },
  {
    slug: "production-dispatch",
    icon: Truck,
    title: "Production & Dispatch Coordination",
    short:
      "Shop floor, stores, and dispatch on one platform. No more chasing on WhatsApp to figure out what shipped today.",
    long: "Production planning tied directly to confirmed orders. Job cards on the shop floor, ready-stock visibility from stores, and dispatch coordination with vehicle tracking. Built for plants that ship to multiple project sites across states, with installation teams that need to know what's arriving and when.",
    includes: [
      "Job card generation from confirmed orders",
      "Shop-floor status updates by operator",
      "Stores and inventory linkage",
      "Dispatch scheduling with vehicle and driver assignment",
      "Site-side acknowledgement and snag capture"
    ],
    audience:
      "Manufacturers and fabricators with their own production floor and outbound logistics.",
    timeline: "1–2 weeks per plant."
  },
  {
    slug: "multi-location-ops",
    icon: MapPin,
    title: "Multi-location Operations",
    short:
      "Branches, offices, project sites — coordinated on one platform with proper data hierarchies and access control.",
    long: "Growing businesses scale by opening new state offices and new project sites. We build proper organisational hierarchy, location-aware data scoping, and role-based access so each office sees what it needs to and leadership sees everything. Built for businesses already running across multiple states.",
    includes: [
      "Org hierarchy: company → region → branch → team",
      "Location-scoped data access with role-based overrides",
      "Inter-branch transfer workflows for stock and projects",
      "Consolidated and split MIS at every level",
      "Single-sign-on for the leadership team"
    ],
    audience:
      "Businesses operating across multiple states or with multiple distinct branches.",
    timeline: "1–2 weeks for an initial multi-location rollout."
  },
  {
    slug: "leadership-mis",
    icon: BarChart3,
    title: "Leadership MIS Dashboards",
    short:
      "Real-time dashboards for the founder and leadership team. The numbers you actually care about, not the ones the software ships with.",
    long: "Custom MIS dashboards designed in conversation with the founder and leadership team. Order book, dispatch status, collection due, regional pipeline, BDM-wise performance — the exact KPIs you currently chase across spreadsheets. Real-time, role-scoped, and mobile-first because leadership reviews don't always happen at a desk.",
    includes: [
      "Custom dashboards designed per leadership role",
      "Drill-down from KPI tile to the underlying transaction",
      "Daily, weekly, monthly digest emails",
      "Mobile-first layout for review on the move",
      "Export to Excel for board and investor reporting"
    ],
    audience:
      "Founders and leadership teams who currently rely on weekly spreadsheets from each department.",
    timeline: "1–2 weeks once the underlying workflow data exists."
  }
];
