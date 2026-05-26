import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { FlowDiagram } from "@/components/sections/flow-diagram";
import { Process } from "@/components/sections/process";
import { ServicesPreview } from "@/components/sections/services-preview";
import { CaseStudyFeature } from "@/components/sections/case-study-feature";
import { FoundersPreview } from "@/components/sections/founders-preview";
import { Testimonial } from "@/components/sections/testimonial";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "ArchFlow — Custom workflow platforms for Indian industry",
  description:
    "Custom MIS and workflow platforms for manufacturers, fabricators, and project-based businesses. From enquiry to installation — one platform, your entire business."
};

export default function HomePage() {
  return (
    <>
      <Hero />
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
