import type { Metadata } from "next";
import { pageOg } from "@/lib/og";
import { Hero } from "@/components/sections/hero";
import { CapabilitiesMarquee } from "@/components/sections/capabilities-marquee";
import { Problem } from "@/components/sections/problem";
import { FlowDiagram } from "@/components/sections/flow-diagram";
import { Process } from "@/components/sections/process";
import { ServicesPreview } from "@/components/sections/services-preview";
import { CaseStudyFeature } from "@/components/sections/case-study-feature";
import { FoundersPreview } from "@/components/sections/founders-preview";
import { Testimonial } from "@/components/sections/testimonial";
import { FinalCTA } from "@/components/sections/final-cta";

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

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilitiesMarquee />
      <Problem />
      <FlowDiagram />
      <Process />
      <ServicesPreview />
      <CaseStudyFeature />
      <FoundersPreview />
      <Testimonial />
      <FinalCTA />
    </>
  );
}
