import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Toaster } from "sonner";
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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

// Display face — bold geometric grotesque matching the wordmark.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
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
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "hsl(230 25% 8%)",
                border: "1px solid rgba(88,101,242,0.25)",
                color: "hsl(216 25% 97%)"
              }
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
