import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { preload } from "react-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { NoiseOverlay } from "@/components/ambient/noise";
import { CustomCursor } from "@/components/ambient/custom-cursor";
import {
  JsonLd,
  organizationSchema,
  websiteSchema
} from "@/components/seo/structured-data";
import { site } from "@/lib/site";
import "./globals.css";

// display:"optional" — the font either makes the FIRST paint (fast
// networks, warm cache: preload below almost always wins the race) or
// sits this page-load out. No mid-load swap repaint means the LCP is
// the first paint of the hero text, not a re-render queued behind
// hydration — worth ~1.5s of measured mobile LCP. Slow first visits
// render the metric-matched fallback; the font is cached for the next
// navigation.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "optional"
});

// Display face — bold geometric grotesque matching the wordmark.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "optional"
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`
  },
  description: site.description,
  applicationName: site.name,
  authors: [
    { name: "Harsh Dhankhar" },
    { name: "Tanishq Trehan" }
  ],
  creator: "ArchFlow",
  publisher: "ArchFlow",
  category: "Technology",
  classification: "B2B SaaS · Custom Software Development",
  // NOTE: meta keywords intentionally omitted — Google has ignored them
  // since 2009 and they offer no SEO value.
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    siteName: site.name
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  verification: {
    // Once you verify in Google Search Console, paste the verification
    // string here. Format: { google: "abc123..." }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // next/font marks these for preload (the ".p." suffix) but Next 14's
  // app-router font manifest comes out empty, so the <link rel=preload>
  // tags are never emitted — leaving fonts discovered only after the
  // blocking CSS parses (~+1.4s on the mobile LCP, which is the hero
  // h1's font-swap repaint). Preload them explicitly. The hashes are
  // content-based and stable across builds; re-check them (ls
  // .next/static/media/*.p.woff2) only after changing fonts or
  // upgrading next/font.
  preload("/_next/static/media/4c9affa5bc8f420e-s.p.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous"
  }); // Manrope — every heading incl. the LCP h1
  preload("/_next/static/media/e4af272ccee01ff0-s.p.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous"
  }); // Inter — body text (the LCP element on /services is a <p>)

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable}`}
    >
      <body className="font-sans antialiased">
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LenisProvider>
            <NoiseOverlay />
            <CustomCursor />
            <Nav />
            <main id="main" className="min-h-screen pt-16">
              {children}
            </main>
            <Footer />
          </LenisProvider>
          {/* Toaster lives in the contact form — the only place that
              fires toasts — so sonner stays out of the global bundle */}
        </ThemeProvider>
      </body>
    </html>
  );
}
