import type { Metadata } from "next";
import Link from "next/link";
import { Quote } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { StatCounter } from "@/components/motion/stat-counter";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pranav Doors & Windows — Case Study",
  description:
    "How Pranav Doors runs its full multi-state fenestration operation on ArchFlow — from enquiry to installation, across 10 departments and 5+ states."
};

const FEATURES = [
  {
    title: "Quotation engine",
    body: "Configurable BOM per product family, versioned quotes, role-based discount approvals, branded PDF output."
  },
  {
    title: "Sales pipeline",
    body: "Territory hierarchy across 5+ states, BDM-level routing, site visit logging, lost-reason analytics."
  },
  {
    title: "Production planning",
    body: "Job cards generated from confirmed orders, shop-floor status updates, store and dispatch linkage."
  },
  {
    title: "Dispatch & installation",
    body: "Vehicle scheduling, site acknowledgement on delivery, installation team task lists and snag capture."
  },
  {
    title: "Service & AMC",
    body: "Post-install service requests, AMC tracking, complaint resolution with audit trail."
  },
  {
    title: "Leadership MIS",
    body: "Real-time dashboards for the directors — order book, dispatch, collection, region-wise pipeline."
  }
];

const STATS = [
  { value: 10, suffix: "+", label: "Departments connected" },
  { value: 5, suffix: "+", label: "States coordinated" },
  { value: 1, suffix: "+ yr", label: "In daily production" },
  { value: 100, suffix: "%", label: "Quote-to-order traceability" }
];

export default function PranavCaseStudy() {
  return (
    <>
      <PageHero
        eyebrow="Case Study · Live deployment"
        title="Pranav Doors & Windows — one platform, the entire fenestration business."
        subtitle="A multi-state fenestration company running quotation, sales, production, dispatch, installation, and service on a single custom-built ArchFlow instance."
      />

      <section className="border-b border-white/5">
        <div className="container-page py-10">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            <Meta label="Client" value="Pranav Doors & Windows" />
            <Meta label="Industry" value="Fenestration" />
            <Meta label="Year" value="2024 — present" />
            <Meta label="ArchFlow role" value="Design, build, deploy, evolve" />
          </dl>
        </div>
      </section>

      {/* Challenge */}
      <section className="section-y border-b border-white/5">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-5">The challenge</p>
            <h2 className="heading-section text-[28px] sm:text-[36px] lg:text-[44px]">
              A business outgrowing its tools.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              Pranav had scaled across five states, half a dozen branches, and
              ten functional departments — but the operating system underneath
              was still a tangle of Excel sheets, WhatsApp groups, and tribal
              knowledge.
            </p>
            <p>
              Quotes lived in inboxes. Production status lived in the head of
              one floor supervisor. The leadership team chased weekly
              spreadsheets from every branch just to know how the business was
              doing. Generic CRMs and off-the-shelf ERPs had been evaluated;
              none of them spoke the language of fenestration.
            </p>
            {/* PLACEHOLDER: replace with verified pre-deployment metrics */}
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="section-y border-b border-white/5">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-5">The approach</p>
            <h2 className="heading-section text-[28px] sm:text-[36px] lg:text-[44px]">
              Custom platform, modular rollout.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              We spent the first weeks on the floor — at the design desk, on
              site visits, inside the dispatch yard. Then we built the data
              model and workflows around exactly how Pranav already worked, not
              how a generic ERP wished they worked.
            </p>
            <p>
              Rollout happened in stages. Quotation and sales first, so the
              revenue engine moved on day one. Production and dispatch next, so
              the floor stopped flying blind. Installation, service, and the
              leadership MIS layered in over the following months.
            </p>
            {/* PLACEHOLDER: replace with engagement timeline diagram */}
          </Reveal>
        </div>
      </section>

      {/* What we built */}
      <section className="section-y border-b border-white/5">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-5">What we built</p>
            <h2 className="heading-section text-[28px] sm:text-[40px] lg:text-[52px]">
              Six tightly integrated modules. One source of truth.
            </h2>
          </Reveal>

          <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <Reveal key={f.title} className="surface p-6 lg:p-8">
                <h3 className="text-base font-semibold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Results */}
      <section className="section-y border-b border-white/5">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-5">The result</p>
            <h2 className="heading-section text-[28px] sm:text-[40px] lg:text-[52px]">
              Running live, every day, across the business.
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {STATS.map((s) => (
              <Reveal key={s.label} className="text-center">
                <p className="font-display text-4xl text-emerald-400 sm:text-5xl lg:text-6xl">
                  <StatCounter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-xs uppercase tracking-eyebrow text-muted-foreground">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </Stagger>
          {/* PLACEHOLDER: replace stats with audited post-deployment metrics */}
        </div>
      </section>

      {/* Quote */}
      <section className="section-y border-b border-white/5">
        <div className="container-page mx-auto max-w-3xl text-center">
          <Quote className="mx-auto h-7 w-7 text-emerald-400/60" aria-hidden />
          {/* PLACEHOLDER: replace with named, attributed testimonial */}
          <Reveal>
            <blockquote className="heading-display mt-6 text-[24px] leading-[1.25] sm:text-[32px] lg:text-[40px]">
              &ldquo;ArchFlow rebuilt how we run our business. We&apos;ve
              stopped losing quotes, stopped losing time, and finally have
              real-time visibility across all our state offices.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm uppercase tracking-eyebrow text-muted-foreground">
              — Pranav Doors &amp; Windows leadership team
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y">
        <div className="container-page mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="heading-display text-[32px] sm:text-[44px] lg:text-[56px]">
              Want something similar? Let&apos;s talk.
            </h2>
            <p className="mt-5 text-muted-foreground sm:text-lg">
              Every deployment is custom. We&apos;ll scope it around what your
              business actually needs.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/contact">Book a 30-min call</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/work">More work</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-eyebrow text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
