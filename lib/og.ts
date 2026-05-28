import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Builds per-page OpenGraph + Twitter metadata blocks.
 *
 * The OG/Twitter image itself is inherited automatically from
 * app/opengraph-image.tsx (root segment applies to every route), so we
 * only need to vary the title, description, and canonical URL here.
 */
export function pageOg(
  title: string,
  description: string,
  path: string
): Pick<Metadata, "openGraph" | "twitter"> {
  const url = `${site.url}${path}`;
  return {
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: site.name,
      title,
      description
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}
