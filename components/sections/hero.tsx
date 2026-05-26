"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HEADLINE = "Built for the businesses Excel can't keep up with.";

export function Hero() {
  const reduce = useReducedMotion();
  const words = HEADLINE.split(" ");

  return (
    <section
      className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden mesh-bg"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="container-page relative pt-12 pb-24 lg:pt-24 lg:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="eyebrow mb-6"
        >
          Custom Workflow Platforms
        </motion.p>

        <h1
          id="hero-heading"
          className="heading-display max-w-[18ch] text-[44px] sm:text-[64px] lg:text-[88px] xl:text-[96px]"
        >
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: reduce ? 0 : 0.15 + i * 0.06,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="mr-[0.25em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.8, ease: "easeOut" }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-[20px]"
        >
          ArchFlow designs and builds custom MIS and workflow platforms for
          India&apos;s manufacturers, fabricators, and project-based
          businesses. From enquiry to installation &mdash; one platform, your
          entire business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.95, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Button asChild size="lg">
            <Link href="/work">
              See our work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Book a call</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 1.2 }}
          className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
        >
          <span>Trusted by</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-foreground/80">
            <span className="font-medium tracking-tight">Pranav Doors &amp; Windows</span>
            <span className="text-white/20">·</span>
            <span>and growing teams across India</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center sm:flex"
        aria-hidden
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 text-xs text-muted-foreground"
        >
          <span>Scroll</span>
          <ArrowDown className="h-3 w-3" />
        </motion.div>
      </motion.div>
    </section>
  );
}
