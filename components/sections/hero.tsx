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
import { BrandPlate } from "@/components/showcase/brand-plate";
import { useIsMobile } from "@/lib/use-is-mobile";

/**
 * Chapter 01 — the opening frame. A centered monument: statement first,
 * then the brand plate rises beneath it with scroll parallax, as if the
 * company emerges out of the intro.
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
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const plateY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      ref={ref}
      id="story-company"
      className="relative isolate overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Aurora variant="hero" />
        <GridPattern interactive={fx} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-flow-500/40 to-transparent" />

      <div className="container-page relative z-10 flex flex-col items-center pt-32 pb-16 text-center lg:pt-40 lg:pb-24">
        {/* copy block — parallaxes up and fades as the story scrolls on */}
        <motion.div
          style={fx ? { y: copyY, opacity: copyOpacity } : undefined}
          className="flex flex-col items-center"
        >
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
            className="hero-rise heading-display mt-8 max-w-[15ch] text-[44px] sm:text-[64px] lg:text-[84px]"
            style={{ animationDelay: "70ms" }}
          >
            <span className="text-metal">Built for the businesses </span>
            <span className="text-flow">Excel</span>
            <span className="text-metal"> can&apos;t keep up with.</span>
          </h1>

          <p
            className="hero-rise mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: "140ms" }}
          >
            ArchFlow designs and builds custom MIS and workflow platforms for
            India&apos;s manufacturers, fabricators, and project-based
            businesses. From enquiry to installation &mdash; one platform,
            your entire business.
          </p>

          <div
            className="hero-rise mt-9 flex flex-wrap items-center justify-center gap-3"
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
        </motion.div>

        {/* the plate rises beneath the statement */}
        <motion.div
          style={fx ? { y: plateY, scale: plateScale } : undefined}
          className="hero-rise mt-16 w-full max-w-3xl lg:mt-20"

        >
          <BrandPlate />
        </motion.div>

        {/* stats line under the plate */}
        <div
          className="hero-rise mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          style={{ animationDelay: "350ms" }}
        >
          {[
            { v: "10+", l: "Departments live" },
            { v: "5+", l: "States coordinated" },
            { v: "<2 weeks", l: "Per module shipped" }
          ].map((s) => (
            <div key={s.l} className="flex items-baseline gap-2.5">
              <span className="font-display text-2xl font-extrabold sm:text-3xl">
                <span className="text-flow">{s.v}</span>
              </span>
              <span className="text-[10px] uppercase tracking-eyebrow text-muted-foreground">
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
