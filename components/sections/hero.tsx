"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic-button";
import { Aurora } from "@/components/ambient/aurora";
import { GridPattern } from "@/components/ambient/grid-pattern";
import { HeroBackdrop } from "@/components/showcase/hero-backdrop";
import { useIsMobile } from "@/lib/use-is-mobile";

export function Hero() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const markY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // Scroll-driven transforms + 3D disabled on mobile / reduced motion —
  // re-compositing heavy layers per scroll frame crashes mobile Safari.
  const fx = !reduce && !isMobile;

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
      {/* Ambient layer (slow parallax; static on mobile) */}
      <motion.div
        style={fx ? { y: bgY, opacity: bgOpacity } : undefined}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <Aurora variant="hero" />
        <GridPattern interactive={fx} />
      </motion.div>

      {/* top scanline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-flow-500/40 to-transparent" />

      <div className="container-page relative z-10 grid items-center gap-12 pt-14 pb-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pt-20 lg:pb-28">
        {/* ── Left: copy ── */}
        <div>
          {/* Live status pill */}
          <div
            className="hero-rise mb-7 flex w-fit items-center gap-2 rounded-full border border-flow-500/25 bg-flow-500/[0.08] px-3.5 py-1.5 text-xs backdrop-blur-sm"
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
            <span className="font-semibold text-flow-300">Chandigarh</span>
          </div>

          {/* Headline — metallic silver with the pain-point in flow blue */}
          <h1
            id="hero-heading"
            className="hero-rise heading-display max-w-[16ch] text-[42px] sm:text-[60px] lg:text-[72px] xl:text-[82px]"
            style={{ animationDelay: "70ms" }}
          >
            <span className="text-metal">Built for the businesses </span>
            <span className="text-flow">Excel</span>
            <span className="text-metal"> can&apos;t keep up with.</span>
          </h1>

          {/* Subhead — the mobile LCP element; visible in server HTML */}
          <p
            className="hero-rise mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: "140ms" }}
          >
            ArchFlow designs and builds custom MIS and workflow platforms for
            India&apos;s manufacturers, fabricators, and project-based
            businesses. From enquiry to installation &mdash; one platform, your
            entire business.
          </p>

          {/* CTAs */}
          <div
            className="hero-rise mt-9 flex flex-wrap items-center gap-3"
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

          {/* Stats strip */}
          <div
            className="hero-rise mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/[0.06] pt-6"
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
        </div>

        {/* ── Right: the mark, monumental ── */}
        <motion.div
          style={fx ? { y: markY } : undefined}
          className="hero-rise relative mx-auto h-[300px] w-full max-w-[520px] sm:h-[380px] lg:h-[480px]"
        >
          <HeroBackdrop />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 hidden justify-center lg:flex">
        <div className="flex flex-col items-center gap-1 text-muted-foreground/60">
          <span className="text-[10px] uppercase tracking-eyebrow">Scroll</span>
          <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
