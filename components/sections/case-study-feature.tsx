"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StatCounter } from "@/components/motion/stat-counter";

const STATS = [
  { value: 10, suffix: "+", label: "Departments connected" },
  { value: 5, suffix: "+", label: "States coordinated" },
  { value: 1, suffix: "+ year", label: "In daily production" }
];

export function CaseStudyFeature() {
  return (
    <section
      aria-labelledby="case-heading"
      className="section-y relative overflow-hidden border-t border-white/5"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 mesh-bg opacity-60" />

      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-5">Case Study</p>
            <h2
              id="case-heading"
              className="heading-section text-[32px] sm:text-[40px] lg:text-[52px]"
            >
              Pranav Doors &amp; Windows runs its entire multi-state operation
              on ArchFlow.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              From the moment an enquiry comes in, through quotation,
              estimation, sales, production, dispatch, installation, and
              service — every department at Pranav works on a single ArchFlow
              instance. Built around their workflow, deployed in stages,
              evolving as they grow.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-6 sm:gap-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-3xl text-emerald-400 sm:text-4xl lg:text-5xl">
                    <StatCounter to={s.value} suffix={s.suffix} />
                  </dd>
                  <dt className="mt-2 text-xs uppercase tracking-eyebrow text-muted-foreground">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>

            <Link
              href="/work/pranav-doors"
              className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
            >
              Read the full case study
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <DashboardMock />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DashboardMock() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-emerald-500/15 via-transparent to-blue-500/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-background/80 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/5 bg-background/80 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          <span className="ml-3 text-[11px] tracking-tight text-muted-foreground">
            archflow.app / pranav · operations
          </span>
        </div>

        <div className="grid grid-cols-12 gap-3 p-4">
          <div className="col-span-3 space-y-2">
            {["Dashboard", "Enquiries", "Quotations", "Orders", "Production", "Dispatch", "Installation", "Service"].map(
              (item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  className={`rounded-md px-2 py-1.5 text-[11px] ${
                    i === 3
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "text-muted-foreground"
                  }`}
                >
                  {item}
                </motion.div>
              )
            )}
          </div>

          <div className="col-span-9 space-y-3">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Active orders", value: "184" },
                { label: "In production", value: "62" },
                { label: "Dispatch today", value: "11" }
              ].map((kpi, i) => (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="rounded-lg border border-white/10 bg-white/[0.02] p-3"
                >
                  <p className="text-[10px] uppercase tracking-eyebrow text-muted-foreground">
                    {kpi.label}
                  </p>
                  <p className="mt-1 font-display text-2xl text-foreground">
                    {kpi.value}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
              <p className="text-[10px] uppercase tracking-eyebrow text-muted-foreground">
                Order pipeline by state
              </p>
              <div className="mt-3 space-y-2">
                {[
                  ["Chandigarh", 92],
                  ["Punjab", 74],
                  ["Haryana", 61],
                  ["Himachal", 38],
                  ["Delhi NCR", 24]
                ].map(([state, pct], i) => (
                  <div key={state as string} className="flex items-center gap-3">
                    <span className="w-20 text-[11px] text-muted-foreground">
                      {state}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.2 + i * 0.08 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300"
                      />
                    </div>
                    <span className="w-8 text-right text-[11px] tabular-nums text-muted-foreground">
                      {pct}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
