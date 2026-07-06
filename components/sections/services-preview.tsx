"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";

/**
 * Chapter 04 — what we build. Editorial split: the chapter title stays
 * pinned on the left while the six platform tiles cascade past it on
 * the right, alternating their entrance direction.
 */
export function ServicesPreview() {
  return (
    <section
      id="story-platform"
      aria-labelledby="services-heading"
      className="section-y relative border-t border-foreground/[0.06]"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Sticky chapter header */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow">
                <span className="h-1 w-1 rounded-full bg-flow-400" />
                Chapter 04 · What we build
              </p>
              <h2
                id="services-heading"
                className="heading-section mt-4 text-[32px] sm:text-[40px] lg:text-[48px]"
              >
                <span className="text-metal">Six platforms. </span>
                <span className="text-flow">One custom fit.</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                Every engagement is scoped from the modules that fit your
                operation — never a template, never a bloated suite.
              </p>
              <Button asChild variant="secondary" className="group mt-8">
                <Link href="/services">
                  Explore all services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </Reveal>
          </div>

          {/* Cascading tiles */}
          <div className="flex flex-col gap-4">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, x: i % 2 === 0 ? 48 : 24, y: 24 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 18,
                    delay: 0.04 * (i % 3)
                  }}
                >
                  <Link
                    href={`/services#${s.slug}`}
                    className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-flow-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <SpotlightCard className="group flex items-start gap-5 p-6 lg:p-7">
                      <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-flow-500/25 bg-gradient-to-br from-flow-500/15 to-transparent text-flow-400 transition-colors group-hover:border-flow-400/40">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-display text-lg font-bold tracking-tight">
                            {s.title}
                          </h3>
                          <span className="font-display text-xs font-bold text-muted-foreground/50">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {s.short}
                        </p>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-flow-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </SpotlightCard>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
