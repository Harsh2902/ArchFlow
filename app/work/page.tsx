import type { Metadata } from "next";
import { pageOg } from "@/lib/og";
import { PageHero } from "@/components/layout/page-hero";
import { WorkGrid } from "@/components/sections/work-grid";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Work — Custom ERP & workflow deployments",
  description:
    "Live custom ERP and workflow deployments by ArchFlow. Pranav Doors & Windows runs full multi-state fenestration operations on ArchFlow daily — 10+ departments, 5+ states.",
  alternates: { canonical: "/work" },
  ...pageOg(
    "Work — Case studies and live deployments | ArchFlow",
    "ArchFlow's custom workflow platforms in production at Indian industrial businesses.",
    "/work"
  )
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Case studies and live deployments."
        subtitle="We launched ArchFlow with one deep deployment at Pranav Doors & Windows — every module, every workflow, every customisation, in daily production across five states and ten departments. Future case studies will come from clients who deserve the same depth."
      />
      <section className="section-y">
        <div className="container-page">
          <WorkGrid />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
