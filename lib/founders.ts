export interface Founder {
  slug: "harsh" | "tanishq";
  name: string;
  role: string;
  short: string;
  long: string;
  initials: string;
  accent: string;
  email: string;
  phone: string;
}

export const founders: Founder[] = [
  {
    slug: "harsh",
    name: "Harsh Dhankhar",
    role: "Founder, Engineering",
    short: "Built ArchFlow's platform end-to-end.",
    long: "Harsh leads engineering at ArchFlow. He designed and built the platform end-to-end — from the data model that lets us spin up a new client's MIS in weeks, to the workflow engine running live at Pranav Doors today. Background in product engineering with a focus on systems built to be customised, not configured.",
    initials: "H",
    accent: "from-flow-400/30 to-flow-600/10",
    email: "harsh@archflow.co.in",
    phone: "+91 79880 19331"
  },
  {
    slug: "tanishq",
    name: "Tanishq Trehan",
    role: "Co-founder, Industry & Strategy",
    short:
      "Director at Pranav Doors, bringing two decades of fabrication industry experience.",
    long: "Tanishq is a Director at Pranav Doors & Windows and Co-founder of ArchFlow. He brings two decades of operating experience inside the Indian fenestration industry — quoting, production, dispatch, installation, service — and the industry relationships that turn cold pitches into conversations. He keeps ArchFlow honest about what the floor actually needs.",
    initials: "T",
    accent: "from-blue-400/30 to-blue-600/10",
    email: "tanishq@archflow.co.in",
    phone: "+91 70871 74974"
  }
];
