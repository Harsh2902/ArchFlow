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
import { OSPreview } from "@/components/showcase/os-preview";

const HEADLINE = ["Built", "for", "the", "businesses", "Excel", "can't", "keep", "up", "with."];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
      {/* Ambient layers */}
      <Aurora variant="hero" className="-z-10" />
      <GridPattern className="-z-10" interactive />

      {/* Subtle horizontal scanline at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="container-page relative z-10 grid items-center gap-10 pt-12 pb-24 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:pt-24 lg:pb-32"
      >
        {/* Left: copy */}
        <div>
          {/* Live status pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs backdrop-blur-sm"
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-foreground/80">Live deployment at Pranav Doors</span>
            <span className="text-muted-foreground">·</span>
            <span className="font-medium text-emerald-400">Chandigarh</span>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="eyebrow mb-6"
          >
            Custom Workflow Platforms
          </motion.p>

          {/* Headline — word-by-word skew + fade */}
          <h1
            id="hero-heading"
            className="heading-display max-w-[18ch] text-[44px] sm:text-[64px] lg:text-[80px] xl:text-[92px]"
          >
            {HEADLINE.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="mr-[0.22em] inline-block overflow-hidden align-bottom"
              >
                <motion.span
                  initial={{ y: "120%", rotate: reduce ? 0 : -6, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: reduce ? 0 : 0.15 + i * 0.055,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="inline-block"
                >
                  {word === "Excel" ? (
                    <span className="italic text-emerald-400">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.9 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-[19px]"
          >
            ArchFlow designs and builds custom MIS and workflow platforms for
            India&apos;s manufacturers, fabricators, and project-based
            businesses. From enquiry to installation &mdash; one platform, your
            entire business.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 1.0 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Button asChild size="lg" className="group">
                <Link href="/work">
                  See our work
                  <span className="arrow-slide ml-1">
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
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
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 1.15 }}
            className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-white/5 pt-6"
          >
            {[
              { v: "10+", l: "Departments live" },
              { v: "5+", l: "States" },
              { v: "<2w", l: "Per module" }
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-2xl text-foreground sm:text-3xl">
                  {s.v}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-eyebrow text-muted-foreground">
                  {s.l}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: live OS preview widget */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.9,
            delay: reduce ? 0 : 0.4,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <OSPreview />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
