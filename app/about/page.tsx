import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { pageOg } from "@/lib/og";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { founders } from "@/lib/founders";

export const metadata: Metadata = {
  title: "About ArchFlow — Founders, story, principles",
  description:
    "ArchFlow is a 2-founder company building custom workflow and ERP platforms for Indian industrial businesses. Founded by Harsh Dhankhar (engineering) and Tanishq Trehan (industry). Based in Chandigarh.",
  alternates: { canonical: "/about" },
  ...pageOg(
    "About ArchFlow",
    "ArchFlow is a 2-founder company building custom workflow platforms for Indian industrial businesses. Engineering depth meets industry depth.",
    "/about"
  )
};

const VALUES = [
  {
    title: "Custom over generic",
    body: "We don't bend your workflow to fit our software. We build software around your workflow."
  },
  {
    title: "Speed over scale",
    body: "Two founders, full ownership, no layers. Decisions in hours, not weeks. Deployments in weeks, not years."
  },
  {
    title: "Industry depth over horizontal breadth",
    body: "We go deep into fabrication, manufacturing, and project-based businesses — not wide across every vertical."
  },
  {
    title: "Long-term partners, not vendors",
    body: "We stay with the businesses we deploy with. The platform evolves as you evolve."
  }
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We build software for businesses we understand."
        subtitle="ArchFlow is a two-founder company. We build custom workflow and MIS platforms for India's manufacturers, fabricators, and project-based businesses — and we ship them in weeks, not years."
      />

      {/* Story */}
      <section className="section-y border-b border-foreground/5">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-5">Our story</p>
            <h2 className="heading-section text-[28px] sm:text-[40px] lg:text-[48px]">
              We built it for Pranav first.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              ArchFlow started inside a fenestration company. Tanishq, a
              director at Pranav Doors &amp; Windows, was watching his business
              scale across five states and run on a tangle of Excel sheets,
              WhatsApp groups, and tribal knowledge. Generic CRMs treated his
              fabrication company the same as a SaaS startup. ERPs wanted ₹50L
              and 18 months.
            </p>
            <p>
              Harsh sat with the floor, the design desk, the dispatch yard, the
              installation team. Then he built a platform shaped around exactly
              how Pranav worked. Quotation first. Sales next. Production and
              dispatch after that. The leadership MIS on top.
            </p>
            <p>
              The platform is live in daily production. And in the conversations
              that followed — with manufacturers and fabricators across the
              region — we realised the same pain exists right across the
              industrial ecosystem. So we packaged what we&apos;d learned into
              a company. That&apos;s ArchFlow.
            </p>
            {/* PLACEHOLDER: tighten origin story with real anecdotes once Tanishq reviews */}
          </Reveal>
        </div>
      </section>

      {/* Founders */}
      <section className="section-y border-b border-foreground/5">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-5">Founders</p>
            <h2 className="heading-section text-[28px] sm:text-[40px] lg:text-[52px]">
              Engineering depth meets industry depth.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
            {founders.map((f) => (
              <Reveal key={f.slug}>
                <article className="surface overflow-hidden">
                  <div
                    aria-hidden
                    className={`relative aspect-[5/3] w-full overflow-hidden bg-gradient-to-br ${f.accent}`}
                  >
                    <div className="absolute inset-0 mesh-bg opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-8xl text-foreground/40">
                        {f.initials}
                      </span>
                    </div>
                    {/* PLACEHOLDER: replace with portrait photo */}
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-xs uppercase tracking-eyebrow text-flow-600 dark:text-flow-400">
                      {f.role}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                      {f.name}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {f.long}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-y border-b border-foreground/5">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-5">How we work</p>
            <h2 className="heading-section text-[28px] sm:text-[40px] lg:text-[52px]">
              Four principles we hold to.
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-4 md:grid-cols-2">
            {VALUES.map((v) => (
              <Reveal key={v.title} className="surface p-6 sm:p-8">
                <h3 className="text-lg font-semibold tracking-tight">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {v.body}
                </p>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Location */}
      <section className="section-y border-b border-foreground/5">
        <div className="container-page">
          <Reveal className="surface mx-auto flex max-w-3xl flex-col items-center gap-4 p-10 text-center sm:p-12">
            <MapPin className="h-6 w-6 text-flow-400" />
            <h2 className="heading-display text-[28px] sm:text-[36px]">
              Based in Chandigarh.
              <br />
              Building for Indian industry.
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              We work across the tricity, into Delhi NCR, and remotely with
              clients anywhere in India.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y">
        <div className="container-page mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="heading-display text-[32px] sm:text-[44px] lg:text-[56px]">
              Want to work with us?
            </h2>
            <div className="mt-8 flex justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/contact">Get in touch</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/work">See our work</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
