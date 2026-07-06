"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic-button";
import { Aurora } from "@/components/ambient/aurora";
import { Mark } from "@/components/brand/mark";
import { useIsMobile } from "@/lib/use-is-mobile";

/**
 * Chapter 07 — the close. The mark returns, scaling up out of the dark
 * as you arrive; the story ends where it began — with the brand — and
 * an invitation to start yours.
 */
export function FinalCTA() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const fx = !reduce && !isMobile;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });
  const markScale = useTransform(scrollYProgress, [0, 1], [0.55, 1]);
  const markOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  return (
    <section
      ref={ref}
      id="story-next"
      aria-labelledby="final-cta-heading"
      className="relative isolate overflow-hidden border-t border-foreground/[0.06] py-28 lg:py-40"
    >
      <Aurora variant="edge" className="-z-10" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flow-500/40 to-transparent" />

      {/* the mark rises behind the closing statement */}
      <motion.div
        aria-hidden
        style={fx ? { scale: markScale, opacity: markOpacity } : undefined}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
      >
        <Mark size={620} className="text-foreground" />
      </motion.div>

      <div className="container-page relative text-center">
        <p className="eyebrow justify-center">
          <span className="h-1 w-1 rounded-full bg-flow-400" />
          Chapter 07 · Start yours
        </p>
        <h2
          id="final-cta-heading"
          className="heading-display mx-auto mt-6 max-w-4xl text-[40px] sm:text-[56px] lg:text-[76px]"
        >
          <span className="text-metal">Your operation could </span>
          <span className="text-flow">flow like this.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Let&apos;s talk. We&apos;ll show you what we built for Pranav and walk
          through what could work for yours.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Book a 30-min call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild size="lg" variant="secondary" className="group">
              <Link href="/work">
                See our work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </Magnetic>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-eyebrow text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-flow-400" />
            Responses within 24 hours
          </span>
          <span className="opacity-30">·</span>
          <span>Free scoped estimate</span>
          <span className="opacity-30">·</span>
          <span>NDA-friendly</span>
        </div>
      </div>
    </section>
  );
}
