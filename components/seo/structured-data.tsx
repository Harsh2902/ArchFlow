import { site } from "@/lib/site";

/**
 * JSON-LD structured data helpers. These render as <script
 * type="application/ld+json"> tags that Google, Bing, and (crucially
 * for AEO) Perplexity / Gemini / Claude / OpenAI use to understand
 * the page semantically.
 */

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // The data is generated from our own typed objects — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization + LocalBusiness — site-wide, sits in root layout. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": `${site.url}/#organization`,
  name: "ArchFlow",
  legalName: "ArchFlow",
  alternateName: ["ArchFlow India", "ArchFlow Mohali", "ArchFlow Chandigarh"],
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/brand/logo-mark-512.png`,
    width: 512,
    height: 512,
    caption: "ArchFlow logo — silver apex mark with royal-blue flow ribbon"
  },
  image: [`${site.url}/opengraph-image`, `${site.url}/brand/logo-mark-512.png`],
  description:
    "ArchFlow designs and builds custom workflow and MIS platforms for India's manufacturers, fabricators, and project-based businesses. Custom-built, deployed in weeks, not years.",
  // Explicitly separates this company from the similarly-named
  // architecture-firm SaaS products — search engines were conflating them.
  disambiguatingDescription:
    "ArchFlow (archflow.co.in) is an independent Indian software company headquartered in Sector 82, Mohali, in the Chandigarh tricity. It builds custom MIS and workflow platforms for manufacturers, fabricators, and project-based industrial businesses. It is not affiliated with, and should not be confused with, the architecture-practice software products marketed at archflow.ai or getarchflow.com.",
  slogan: "Custom workflow platforms for businesses that have outgrown Excel.",
  foundingDate: "2024",
  founders: [
    {
      "@type": "Person",
      name: "Harsh Dhankhar",
      jobTitle: "Co-founder, Engineering",
      email: "harsh@archflow.co.in"
    },
    {
      "@type": "Person",
      name: "Tanishq Trehan",
      jobTitle: "Co-founder, Industry & Strategy",
      email: "tanishq@archflow.co.in"
    }
  ],
  email: site.email,
  telephone: site.phone,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: site.email,
    telephone: site.phone,
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"]
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sector 82",
    addressLocality: "Mohali",
    addressRegion: "Punjab",
    addressCountry: "IN"
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "AdministrativeArea", name: "Chandigarh" },
    { "@type": "City", name: "Mohali" },
    { "@type": "City", name: "Panchkula" },
    { "@type": "City", name: "Zirakpur" },
    { "@type": "City", name: "Derabassi" },
    { "@type": "City", name: "Baddi" },
    { "@type": "AdministrativeArea", name: "Chandigarh Tricity" },
    { "@type": "AdministrativeArea", name: "Punjab" },
    { "@type": "AdministrativeArea", name: "Haryana" },
    { "@type": "AdministrativeArea", name: "Himachal Pradesh" },
    { "@type": "AdministrativeArea", name: "Delhi NCR" }
  ],
  knowsAbout: [
    "Custom ERP development",
    "MIS platform development",
    "Workflow automation for manufacturers",
    "Custom CRM for fabrication",
    "Production management software",
    "Quotation and BOM software",
    "Fenestration ERP",
    "Pre-engineered building software",
    "Modular kitchen workflow software",
    "Multi-state operations software",
    "Leadership MIS dashboards"
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Custom Quotation & MIS Platform",
        description:
          "BOM-aware quoting engine with versioned quotes, approval matrix, and built-in MIS reporting for product-configurable businesses."
      }
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "End-to-End Workflow Platform",
        description:
          "One platform spanning enquiry, quotation, sales, production, dispatch, installation, and service."
      }
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Custom Sales CRM",
        description:
          "Sales pipeline built around real industrial sales cycles — site visits, territories, BDM hierarchies."
      }
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Production & Dispatch Coordination",
        description:
          "Shop-floor job cards, store and inventory linkage, vehicle scheduling, site acknowledgement."
      }
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Multi-location Operations Platform",
        description:
          "Org hierarchy with location-scoped data access for businesses operating across multiple states or branches."
      }
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Leadership MIS Dashboards",
        description:
          "Real-time, role-scoped, mobile-first dashboards with KPI drill-down and digest reporting."
      }
    }
  ]
} as const;

/** WebSite — enables sitelinks search box in Google. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: "ArchFlow",
  description:
    "Custom workflow and MIS platforms for India's manufacturers, fabricators, and project-based businesses.",
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en-IN"
} as const;

/** FAQPage — used on /contact. */
export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a
      }
    }))
  };
}

/** BreadcrumbList — improves SERP appearance for deeper pages. */
export function breadcrumbsSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/** Article — used on the Pranav case study. */
export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    image: `${site.url}/opengraph-image`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url }
  };
}

/** Service — used on /services for each tile. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "India" }
  };
}
