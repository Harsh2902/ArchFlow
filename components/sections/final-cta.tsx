"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/motion/reveal";
import { Aurora } from "@/components/ambient/aurora";

export function FinalCTA() {
  const reduce = useReducedMotion();
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative isolate section-y overflow-hidden border-t border-white/5"
    >
      <Aurora variant="edge" className="-z-10" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="container-page relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <motion.h2
            id="final-cta-heading"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="heading-display text-[40px] sm:text-[60px] lg:text-[88px]"
          >
            Is your business ready for software that{" "}
            <span className="italic font-display text-emerald-400">fits it?</span>
          </motion.h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Let&apos;s talk. We&apos;ll show you what we built for Pranav and
            walk through what could work for yours.
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

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-eyebrow text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              Responses within 24 hours
            </span>
            <span className="text-white/15">·</span>
            <span>Free scoped estimate</span>
            <span className="text-white/15">·</span>
            <span>NDA-friendly</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
