"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, staggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { services } from "@/lib/services";

/**
 * Bento grid — six services in an asymmetric layout: flagship cards get
 * the wide tiles, the final tile runs full width as a feature strip.
 */
const SPANS = [
  "lg:col-span-2", // Quotation & MIS — flagship
  "", // End-to-End Workflow
  "", // Sales CRM
  "", // Production & Dispatch
  "", // Multi-location
  "lg:col-span-3" // Leadership MIS — full-width strip
];

export function ServicesPreview() {
  return (
    <section
      aria-labelledby="services-heading"
      className="section-y relative border-t border-white/[0.06]"
    >
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-5 justify-center">
            <span className="h-1 w-1 rounded-full bg-flow-400" />
            What we build
          </p>
          <h2
            id="services-heading"
            className="heading-section text-[32px] sm:text-[42px] lg:text-[54px]"
          >
            <span className="text-metal">Software shaped around </span>
            <span className="text-flow">your operation.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Six core platform types. Every engagement is custom-scoped from the
            modules that fit your business.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            const wide = SPANS[i]?.includes("col-span");
            return (
              <motion.div
                key={s.slug}
                variants={staggerItem}
                className={`h-full ${SPANS[i] ?? ""}`}
              >
                <Link
                  href={`/services#${s.slug}`}
                  className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-flow-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <SpotlightCard
                    className={`group flex h-full p-6 lg:p-8 ${
                      wide && i === 5
                        ? "flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between"
                        : "flex-col"
                    }`}
                  >
                    <div className={wide && i === 5 ? "flex items-start gap-5" : ""}>
                      <div className="flex items-start justify-between">
                        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-flow-500/25 bg-gradient-to-br from-flow-500/15 to-transparent text-flow-300 transition-colors group-hover:border-flow-400/40">
                          <Icon className="h-5 w-5" />
                        </div>
                        {!(wide && i === 5) && (
                          <span className="font-display text-sm font-bold text-muted-foreground/50">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        )}
                      </div>
                      <div className={wide && i === 5 ? "" : "mt-6"}>
                        <h3 className="font-display text-lg font-bold tracking-tight">
                          {s.title}
                        </h3>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                          {s.short}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 text-sm font-semibold text-flow-300 ${
                        wide && i === 5 ? "shrink-0" : "mt-6 justify-between"
                      }`}
                    >
                      <span className="link-underline">Learn more</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
