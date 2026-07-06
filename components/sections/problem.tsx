"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { Reveal, Stagger, staggerItem } from "@/components/motion/reveal";

/**
 * "The old way vs. running on ArchFlow" — a split comparison panel.
 * Left: the chaos every mid-market operator recognises. Right: the
 * same operation on one platform, glowing blue.
 */

const OLD_WAY = [
  "Quotes lost across 14 Excel versions and three inboxes",
  "Production status lives in one supervisor's head",
  "WhatsApp forwards standing in for handoffs",
  "Leadership waits a week for numbers from each branch",
  "Generic CRM that has never heard of a BOM or a site dispatch"
];

const FLOW_WAY = [
  "One quoting engine — versioned, approved, BOM-aware",
  "Live production board from the shop floor itself",
  "Explicit handoffs with an audit trail at every stage",
  "Real-time MIS across every state and department",
  "Built around your workflow — not a template's"
];

export function Problem() {
  return (
    <section aria-labelledby="problem-heading" className="section-y">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-5 justify-center">
            <span className="h-1 w-1 rounded-full bg-flow-400" />
            The problem
          </p>
          <h2
            id="problem-heading"
            className="heading-section text-[32px] sm:text-[42px] lg:text-[54px]"
          >
            <span className="text-metal">Most businesses run on systems </span>
            <span className="text-flow">that don&apos;t fit them.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Generic CRMs treat a fenestration company the same as a software
            startup. ERPs cost ₹50L+ and take 18 months. Excel breaks the moment
            you cross 50 employees.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {/* The old way */}
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7 lg:p-9">
              <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                The old way
              </p>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-foreground/80">
                Excel, WhatsApp, and tribal knowledge
              </h3>
              <ul className="mt-6 space-y-4">
                {OLD_WAY.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03]">
                      <X className="h-3 w-3 text-red-400/80" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* The ArchFlow way */}
          <Reveal delay={0.12}>
            <div className="glow-flow relative h-full overflow-hidden rounded-2xl border border-flow-500/30 bg-gradient-to-b from-flow-500/[0.08] to-transparent p-7 lg:p-9">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-flow-500/20 blur-[80px]" />
              <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-flow-300">
                Running on ArchFlow
              </p>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight">
                One platform, your entire operation
              </h3>
              <ul className="mt-6 space-y-4">
                {FLOW_WAY.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-flow-500/40 bg-flow-500/15">
                      <Check className="h-3 w-3 text-flow-300" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
