export interface WorkItem {
  slug: string;
  client: string;
  industry: string;
  year: string;
  summary: string;
  status: "live" | "in-progress" | "pipeline";
  href: string | null;
  accent: string;
}

export const workItems: WorkItem[] = [
  {
    slug: "pranav-doors",
    client: "Pranav Doors & Windows",
    industry: "Premium doors & windows · Manufacturing",
    year: "2024",
    summary:
      "From the first enquiry to the signed handover — 10 departments and 100+ employees working on one live platform.",
    status: "live",
    href: "/work/pranav-doors",
    accent: "from-flow-500/30 to-flow-700/10"
  }
];
