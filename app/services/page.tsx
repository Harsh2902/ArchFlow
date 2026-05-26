import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Process } from "@/components/sections/process";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — What we build",
  description:
    "Custom-built workflow platforms, MIS dashboards, CRMs, and operational systems for Indian industrial businesses."
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What we build."
        subtitle="Six core platform types we deploy across industrial businesses. Each engagement is custom-scoped from the modules that fit your operation."
      />

      <section className="section-y">
        <div className="container-page space-y-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug}>
                <article
                  id={s.slug}
                  className="surface scroll-mt-24 p-6 sm:p-10 lg:p-12"
                >
                  <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-emerald-400">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="font-display text-2xl text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h2 className="heading-section mt-5 text-[26px] sm:text-[34px] lg:text-[40px]">
                        {s.title}
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {s.long}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <p className="text-xs uppercase tracking-eyebrow text-emerald-400">
                          What&apos;s included
                        </p>
                        <ul className="mt-3 space-y-2">
                          {s.includes.map((inc) => (
                            <li
                              key={inc}
                              className="flex items-start gap-2.5 text-sm text-foreground/85"
                            >
                              <Check className="mt-[3px] h-4 w-4 shrink-0 text-emerald-400" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Who it's for" value={s.audience} />
                        <Field label="Typical timeline" value={s.timeline} />
                      </div>

                      <div>
                        <Button asChild variant="secondary" size="sm">
                          <Link href="/contact">Talk to us about this</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Process />

      <section className="section-y border-t border-white/5">
        <div className="container-page mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow mb-5">Pricing</p>
            <h2 className="heading-section text-[28px] sm:text-[40px] lg:text-[52px]">
              Every project is scoped specifically.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Each engagement is custom — shaped around the modules you need,
              your team size, and the rollout cadence that fits your business.
              Talk to us and we&apos;ll share a scoped estimate after the first
              conversation.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">Contact us for pricing</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/5 bg-background/40 p-4">
      <p className="text-[11px] uppercase tracking-eyebrow text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-sm text-foreground/90">{value}</p>
    </div>
  );
}
