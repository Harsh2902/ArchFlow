export const site = {
  name: "ArchFlow",
  tagline: "Custom workflow platforms for businesses that have outgrown Excel.",
  description:
    "ArchFlow designs and builds custom MIS and workflow platforms for India's manufacturers, fabricators, and project-based businesses.",
  url: "https://archflow.co.in",
  email: "hello@archflow.co.in",
  phone: "+91 98XXX XXXXX",
  address: "Chandigarh, India",
  social: {
    linkedin: "https://linkedin.com/company/archflow",
    twitter: "https://x.com/archflow"
  },
  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ]
};

export type NavItem = (typeof site.nav)[number];
