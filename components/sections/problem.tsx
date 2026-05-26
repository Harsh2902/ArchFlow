"use client";

import { motion } from "framer-motion";
import { FileSpreadsheet, LayoutDashboard, Building2 } from "lucide-react";
import { Reveal, Stagger, staggerItem } from "@/components/motion/reveal";

const CARDS = [
  {
    icon: FileSpreadsheet,
    title: "Excel chaos",
    body: "Quotes lost in inboxes. Versions sprawl across 14 sheets. Nobody knows what's the source of truth past 50 employees."
  },
  {
    icon: LayoutDashboard,
    title: "Generic CRMs",
    body: "Salesforce and HubSpot were built for software sellers. They have no idea what a glazing job, a BOM, or a site dispatch is."
  },
  {
    icon: Building2,
    title: "Enterprise ERPs",
    body: "SAP, Oracle, Microsoft Dynamics — ₹50L+ to start, 18 months to deploy, and you still have to bend your workflow to fit theirs."
  }
];

export function Problem() {
  return (
    <section aria-labelledby="problem-heading" className="section-y">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-5">The problem</p>
            <h2
              id="problem-heading"
              className="heading-section text-[34px] sm:text-[44px] lg:text-[56px]"
            >
              Most businesses are running on systems that don&apos;t fit them.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Generic CRMs treat a fenestration company the same as a software
              startup. ERPs cost ₹50L+ and take 18 months. Excel breaks the
              moment you cross 50 employees. Your team deserves software built
              for how YOU actually work.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-4 md:grid-cols-3">
          {CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="surface surface-hover p-6 lg:p-8"
              >
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-emerald-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
