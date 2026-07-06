"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic-button";
import { Aurora } from "@/components/ambient/aurora";
import { GridPattern } from "@/components/ambient/grid-pattern";
import { HeroVisual } from "@/components/showcase/hero-visual";
import { useIsMobile } from "@/lib/use-is-mobile";

/**
 * Chapter 01 — the opening frame. Split stage: the statement on the
 * left, the living 3D mark holding the right half of the screen.
 * Fills the viewport exactly — no dead scroll below the fold.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const fx = !reduce && !isMobile;
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={ref}
      id="story-company"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Aurora variant="hero" />
        <GridPattern interactive={fx} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-flow-500/40 to-transparent" />

      <div className="container-page relative z-10 grid w-full items-center gap-10 pb-14 pt-28 lg:grid-cols-[1.02fr_0.98fr] lg:gap-4 lg:pb-16 lg:pt-24">
        {/* ── Left: the statement ── */}
        <motion.div style={fx ? { y: copyY, opacity: copyOpacity } : undefined}>
          <div
            className="hero-rise flex w-fit items-center gap-2 rounded-full border border-flow-500/30 bg-flow-500/[0.08] px-3.5 py-1.5 text-xs backdrop-blur-sm"
            style={{ animationDelay: "0ms" }}
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flow-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-flow-400" />
            </span>
            <span className="text-foreground/85">
              Live at Pranav Doors &amp; Windows
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="font-semibold text-flow-400">Chandigarh</span>
          </div>

          <h1
            id="hero-heading"
            className="hero-rise heading-display mt-7 max-w-[15ch] text-[42px] sm:text-[58px] lg:text-[64px] xl:text-[76px]"
            style={{ animationDelay: "70ms" }}
          >
            <span className="text-metal">Built for the businesses </span>
            <span className="text-flow">Excel</span>
            <span className="text-metal"> can&apos;t keep up with.</span>
          </h1>

          <p
            className="hero-rise mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: "140ms" }}
          >
            ArchFlow designs and builds custom MIS and workflow platforms for
            India&apos;s manufacturers, fabricators, and project-based
            businesses. From enquiry to installation &mdash; one platform,
            your entire business.
          </p>

          <div
            className="hero-rise mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "210ms" }}
          >
            <Magnetic>
              <Button asChild size="lg" className="group">
                <Link href="/work">
                  See our work
                  <span className="arrow-slide ml-1">
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </span>
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/contact">
                  Book a call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </Magnetic>
          </div>

          <div
            className="hero-rise mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-foreground/[0.08] pt-6"
            style={{ animationDelay: "280ms" }}
          >
            {[
              { v: "10+", l: "Departments live" },
              { v: "5+", l: "States" },
              { v: "<2w", l: "Per module" }
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-2xl font-extrabold sm:text-3xl">
                  <span className="text-flow">{s.v}</span>
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-eyebrow text-muted-foreground">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: the mark, alive ── */}
        <motion.div
          style={fx ? { y: visualY } : undefined}
          className="hero-rise relative h-[340px] w-full sm:h-[420px] lg:h-[560px]"
        >
          <HeroVisual />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-20 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
