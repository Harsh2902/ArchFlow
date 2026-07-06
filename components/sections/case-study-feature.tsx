"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StatCounter } from "@/components/motion/stat-counter";
import { DashboardPranav } from "@/components/showcase/dashboard-pranav";

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
              <span className="text-metal">
                Pranav Doors &amp; Windows runs its entire multi-state
                operation on{" "}
              </span>
              <span className="text-flow">ArchFlow.</span>
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
                  <dd className="font-display text-3xl text-flow-400 sm:text-4xl lg:text-5xl">
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
              className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-flow-400 transition-colors hover:text-flow-300"
            >
              Read the full case study
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <DashboardPranav />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

