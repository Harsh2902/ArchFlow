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
    industry: "Fenestration · Multi-state operations",
    year: "2024",
    summary:
      "End-to-end platform from enquiry to installation. 10 departments, 5+ states, running daily.",
    status: "live",
    href: "/work/pranav-doors",
    accent: "from-emerald-500/30 to-emerald-700/10"
  }
];
