import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { pageOg } from "@/lib/og";
import { ChapterRail } from "@/components/layout/chapter-rail";
import { Hero } from "@/components/sections/hero";
import { CapabilitiesMarquee } from "@/components/sections/capabilities-marquee";
import { Problem } from "@/components/sections/problem";

// Below-fold chapters are code-split (SSR HTML still ships — this only
// splits the client JS) so phones hydrate the hero fast and pick up the
// rest of the story as its chunks stream in.
const FlowDiagram = dynamic(
  () => import("@/components/sections/flow-diagram").then((m) => m.FlowDiagram)
);
const ServicesPreview = dynamic(
  () =>
    import("@/components/sections/services-preview").then(
      (m) => m.ServicesPreview
    )
);
const CaseStudyFeature = dynamic(
  () =>
    import("@/components/sections/case-study-feature").then(
      (m) => m.CaseStudyFeature
    )
);
const People = dynamic(
  () => import("@/components/sections/people").then((m) => m.People)
);
const FinalCTA = dynamic(
  () => import("@/components/sections/final-cta").then((m) => m.FinalCTA)
);

export const metadata: Metadata = {
  title:
    "ArchFlow — Custom workflow & MIS platforms for Indian manufacturers",
  description:
    "ArchFlow builds custom MIS, ERP-alternative, and workflow platforms for Indian manufacturers, fabricators, fenestration companies, PEB, and modular interior businesses. Live deployment at Pranav Doors. Ship in weeks, not years.",
  alternates: { canonical: "/" },
  ...pageOg(
    "ArchFlow — Custom workflow platforms for Indian industry",
    "Custom MIS and workflow platforms for manufacturers, fabricators, and project-based businesses.",
    "/"
  )
};

const CHAPTERS = [
  { id: "story-company", n: "01", label: "The company" },
  { id: "story-problem", n: "02", label: "The problem" },
  { id: "story-flow", n: "03", label: "The flow" },
  { id: "story-platform", n: "04", label: "What we build" },
  { id: "story-proof", n: "05", label: "The proof" },
  { id: "story-people", n: "06", label: "The people" },
  { id: "story-next", n: "07", label: "Start yours" }
];

export default function HomePage() {
  return (
    <>
      <ChapterRail chapters={CHAPTERS} />
      <Hero />
      <CapabilitiesMarquee />
      <Problem />
      <FlowDiagram />
      <ServicesPreview />
      <CaseStudyFeature />
      <People />
      <FinalCTA />
    </>
  );
}
