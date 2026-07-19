"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { Reveal, Stagger, staggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { founders } from "@/lib/founders";
import { Mark } from "@/components/brand/mark";

/**
 * Chapter 06 — the people. The client's words and the two founders in
 * one chapter: a force-dark quote plate spanning the top, founder
 * cards beneath.
 */
export function People() {
  return (
    <section
      id="story-people"
      aria-labelledby="people-heading"
      className="section-y border-t border-foreground/[0.06]"
    >
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-1 w-1 rounded-full bg-flow-400" />
            Chapter 06 · The people
          </p>
          <h2
            id="people-heading"
            className="heading-section mt-4 text-[30px] sm:text-[40px] lg:text-[48px]"
          >
            <span className="text-metal">Built by two founders. </span>
            <span className="text-flow">Trusted on the floor.</span>
          </h2>
        </Reveal>

        {/* Quote plate — always dark, like the brand */}
        <Reveal className="mt-14">
          {/* PLACEHOLDER: replace with real client testimonial */}
          <div className="dark relative overflow-hidden rounded-3xl border border-foreground/10 bg-[#07080d] p-8 text-foreground shadow-2xl sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_80%_0%,rgba(88,101,242,0.16),transparent_60%)]" />
            <Quote className="h-7 w-7 text-flow-400/70" aria-hidden />
            <blockquote className="mt-6 max-w-4xl font-display text-[22px] font-bold leading-[1.3] tracking-tight sm:text-[30px] lg:text-[36px]">
              &ldquo;ArchFlow rebuilt how we run our business. We&apos;ve
              stopped losing quotes, stopped losing time, and finally have{" "}
              <span className="text-flow">real-time visibility</span> across
              all our state offices.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-flow-500/30 bg-flow-500/10 font-display text-sm font-bold text-flow-300">
                PD
              </span>
              <div>
                <p className="text-sm font-semibold">
                  Pranav Doors &amp; Windows
                </p>
                <p className="text-[10px] uppercase tracking-eyebrow text-muted-foreground">
                  Leadership team · Mohali
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Founder cards */}
        <Stagger className="mt-6 grid gap-4 md:grid-cols-2">
          {founders.map((f) => (
            <motion.div key={f.slug} variants={staggerItem} className="h-full">
              <SpotlightCard className="group flex h-full flex-col p-7 lg:p-9">
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${f.accent} font-display text-xl font-extrabold text-foreground/80`}
                  >
                    {f.initials}
                  </span>
                  <Mark size={22} className="text-foreground/30 transition-colors group-hover:text-flow-400" />
                </div>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-eyebrow text-flow-600 dark:text-flow-400">
                  {f.role}
                </p>
                <h3 className="mt-1.5 font-display text-xl font-extrabold tracking-tight">
                  {f.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {f.short}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </Stagger>

        <Reveal className="mt-10 flex justify-center">
          <Link
            href="/about"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-flow-600 transition-colors hover:text-flow-700 dark:text-flow-400 dark:hover:text-flow-300"
          >
            <span className="link-underline">The full story</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
