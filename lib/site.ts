export const site = {
  name: "ArchFlow",
  tagline: "Custom workflow platforms for businesses that have outgrown Excel.",
  description:
    "ArchFlow designs and builds custom MIS and workflow platforms for India's manufacturers, fabricators, and project-based businesses.",
  url: "https://archflow.co.in",
  email: "harsh@archflow.co.in",
  phone: "+91 79880 19331",
  address: "Sector 82, Mohali, Punjab, India",
  nav: [
    { label: "Work", href: "/work" },
    { label: "Solutions", href: "/solutions" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ]
};

export type NavItem = (typeof site.nav)[number];
