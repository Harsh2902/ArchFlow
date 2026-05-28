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
import { HeroBackdrop } from "@/components/showcase/hero-backdrop";
import { SplitText } from "@/components/motion/split-text";
import { useIsMobile } from "@/lib/use-is-mobile";

const HEADLINE = "Built for the businesses Excel can't keep up with.";

export function Hero() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Differential parallax (FIX 10D). Positive Y = lags the scroll (moves
  // up slower), creating layered depth. Background lags most (~0.3x),
  // headline lags a little (~0.7x), foreground (subtitle/CTAs) is 1x.
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Scroll-driven transforms on the heavy ambient layer are disabled on
  // mobile / reduced-motion — re-compositing blurred blobs every scroll
  // frame is a primary cause of mobile Safari memory crashes.
  const fx = !reduce && !isMobile;

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
      {/* Ambient + 3D backdrop layer (slowest parallax; static on mobile) */}
      <motion.div
        style={fx ? { y: bgY, opacity: bgOpacity } : undefined}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <Aurora variant="hero" />
        <GridPattern interactive={fx} />
        {/* 3D arch sits on the right, behind the OS preview, desktop only */}
        {fx && (
          <div className="absolute inset-y-0 right-0 hidden w-[46%] md:block">
            <HeroBackdrop />
          </div>
        )}
      </motion.div>

      {/* Subtle horizontal scanline at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="container-page relative z-10 grid items-center gap-10 pt-12 pb-24 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:pt-24 lg:pb-32">
        {/* Left: copy. Entrance uses the CSS .hero-rise class (not framer)
            so the text is visible in the server HTML — critical for mobile
            LCP, where the subhead is the largest contentful paint. */}
        <div>
          {/* Live status pill — w-fit keeps it content-width but block-level
              so the eyebrow sits on its own line below it (not inline). */}
          <div
            className="hero-rise mb-8 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs backdrop-blur-sm"
            style={{ animationDelay: "0ms" }}
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-foreground/80">Live deployment at Pranav Doors</span>
            <span className="text-muted-foreground">·</span>
            <span className="font-medium text-emerald-400">Chandigarh</span>
          </div>

          {/* Eyebrow */}
          <p className="hero-rise eyebrow mb-6" style={{ animationDelay: "60ms" }}>
            Custom Workflow Platforms
          </p>

          {/* Headline — character-level reveal (CSS, no-JS + reduced-motion
              safe). Parallax y only applies on desktop via fx. */}
          <motion.h1
            id="hero-heading"
            style={fx ? { y: headlineY } : undefined}
            className="heading-display max-w-[18ch] text-[44px] sm:text-[64px] lg:text-[80px] xl:text-[92px]"
          >
            <SplitText
              text={HEADLINE}
              highlight="Excel"
              startDelayMs={150}
              staggerMs={15}
            />
          </motion.h1>

          {/* Subhead — the mobile LCP element; rendered visible immediately */}
          <p
            className="hero-rise mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-[19px]"
            style={{ animationDelay: "120ms" }}
          >
            ArchFlow designs and builds custom MIS and workflow platforms for
            India&apos;s manufacturers, fabricators, and project-based
            businesses. From enquiry to installation &mdash; one platform, your
            entire business.
          </p>

          {/* CTAs */}
          <div
            className="hero-rise mt-10 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "180ms" }}
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
          </div>

          {/* Stats strip */}
          <div
            className="hero-rise mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-white/5 pt-6"
            style={{ animationDelay: "240ms" }}
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
          </div>
        </div>

        {/* Right: live OS preview widget */}
        <div className="hero-rise" style={{ animationDelay: "300ms" }}>
          <OSPreview />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
