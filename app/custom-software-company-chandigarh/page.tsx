import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { pageOg } from "@/lib/og";
import { site } from "@/lib/site";
import { chandigarhPage, solutions } from "@/lib/solutions";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import {
  JsonLd,
  breadcrumbsSchema,
  faqPageSchema,
  serviceSchema
} from "@/components/seo/structured-data";

const s = chandigarhPage;

/** The industrial belt we physically serve — crawlable, honest. */
const AREAS = [
  { name: "Mohali", detail: "HQ — Sector 82; Phase 8–9 industrial belt" },
  { name: "Chandigarh", detail: "Industrial Area Phase 1 & 2, IT Park" },
  { name: "Panchkula", detail: "Industrial Area Phase 1 & 2" },
  { name: "Zirakpur", detail: "Trade & dealer hub" },
  { name: "Derabassi", detail: "Manufacturing corridor" },
  { name: "Baddi", detail: "HP industrial cluster" }
];

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
  alternates: { canonical: "/custom-software-company-chandigarh" },
  ...pageOg(
    `${s.metaTitle} | ArchFlow`,
    s.metaDescription,
    "/custom-software-company-chandigarh"
  )
};

export default function ChandigarhPage() {
  const related = solutions.slice(0, 3);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: s.cardTitle,
          description: s.metaDescription,
          serviceType: s.keyword
        })}
      />
      <JsonLd data={faqPageSchema(s.faqs)} />
      <JsonLd
        data={breadcrumbsSchema([
          { name: "Home", url: site.url },
          {
            name: s.cardTitle,
            url: `${site.url}/custom-software-company-chandigarh`
          }
        ])}
      />

      <PageHero
        eyebrow={s.eyebrow}
        title={s.h1Metal}
        highlightTail={s.h1Flow}
        subtitle={s.intro}
      />

      {/* Why local goes wrong / the wall */}
      <section className="section-y border-b border-foreground/[0.06]">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">
              <span className="h-1 w-1 rounded-full bg-flow-400" />
              The problem with the usual options
            </p>
            <h2 className="heading-section mt-4 max-w-2xl text-[28px] sm:text-[36px]">
              <span className="text-metal">Why factories here still run on Excel.</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {s.pains.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <article className="surface h-full p-6 lg:p-7">
                  <span className="font-display text-sm font-bold text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="section-y border-b border-foreground/[0.06]">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">
              <span className="h-1 w-1 rounded-full bg-flow-400" />
              What we build
            </p>
            <h2 className="heading-section mt-4 max-w-2xl text-[28px] sm:text-[36px]">
              <span className="text-metal">Custom platforms, </span>
              <span className="text-flow">built across the table.</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.modules.map((m, i) => (
              <Reveal key={m.title} delay={(i % 3) * 0.05}>
                <SpotlightCard className="h-full p-6">
                  <h3 className="font-display text-base font-bold tracking-tight">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {m.body}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service area — the tricity belt */}
      <section className="section-y border-b border-foreground/[0.06]">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">
              <span className="h-1 w-1 rounded-full bg-flow-400" />
              Where we work in person
            </p>
            <h2 className="heading-section mt-4 max-w-2xl text-[28px] sm:text-[36px]">
              <span className="text-metal">The tricity and its </span>
              <span className="text-flow">industrial belt.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Discovery on your factory floor, rollout beside your team.
              Beyond the belt, we work remotely with clients across India —
              with on-site visits for discovery and go-live where they matter.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((a, i) => (
              <Reveal key={a.name} delay={(i % 3) * 0.04}>
                <div className="surface flex items-start gap-3 p-5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-flow-600 dark:text-flow-400" />
                  <div>
                    <h3 className="font-display text-sm font-bold tracking-tight">
                      {a.name}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {a.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Local proof */}
      <section className="section-y border-b border-foreground/[0.06]">
        <div className="container-page">
          <Reveal>
            <div className="glow-flow rounded-2xl border border-flow-500/30 bg-gradient-to-b from-flow-500/[0.08] to-transparent p-7 lg:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_auto]">
                <div>
                  <h2 className="heading-section text-[24px] sm:text-[30px]">
                    <span className="text-metal">{s.proof.title}</span>
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {s.proof.body}
                  </p>
                </div>
                <Button asChild variant="secondary" className="group w-fit">
                  <Link href="/work/pranav-doors">
                    Read the case study
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQs — static HTML for crawlers and AI answers */}
      <section className="section-y border-b border-foreground/[0.06]">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">
              <span className="h-1 w-1 rounded-full bg-flow-400" />
              Common questions
            </p>
            <h2 className="heading-section mt-4 text-[28px] sm:text-[36px]">
              <span className="text-metal">Asked across the table.</span>
            </h2>
          </Reveal>
          <div className="mt-8 max-w-3xl">
            {s.faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.03}>
                <div className="border-b border-foreground/[0.08] py-6">
                  <h3 className="font-display text-base font-bold tracking-tight sm:text-lg">
                    {f.q}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {f.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + cluster links */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <h2 className="heading-section text-[28px] sm:text-[36px]">
                  <span className="text-metal">Twenty minutes away, </span>
                  <span className="text-flow">or thirty minutes on a call.</span>
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Talk directly to the founders. We&apos;ll show you the live
                  platform and map what your version looks like.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    Book a call
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/solutions">Solutions by industry</Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-16 border-t border-foreground/[0.08] pt-8">
              <p className="text-[10px] uppercase tracking-eyebrow text-muted-foreground">
                Solutions we build here
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/solutions/${r.slug}`}
                    className="group surface surface-hover flex items-center justify-between gap-3 p-4"
                  >
                    <span className="text-sm font-semibold">{r.cardTitle}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-flow-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-flow-400" />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
