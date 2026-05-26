import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { WorkGrid } from "@/components/sections/work-grid";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies and live deployments — ArchFlow's custom workflow platforms in production at Indian industrial businesses."
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Case studies and live deployments."
        subtitle="Custom platforms built and shipped for industrial businesses across India. One live deployment in daily production at Pranav Doors & Windows."
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
