"use client";

import { motion } from "framer-motion";
import { Aurora } from "@/components/ambient/aurora";
import { GridPattern } from "@/components/ambient/grid-pattern";
import { SplitText } from "@/components/motion/split-text";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  align = "left"
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/5 bg-background">
      <Aurora variant="soft" className="-z-10" />
      <GridPattern className="-z-10" fade interactive />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div
        className={`container-page relative py-24 lg:py-32 ${
          align === "center" ? "text-center" : ""
        }`}
      >
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-5"
          >
            {eyebrow}
          </motion.p>
        )}

        <h1
          className={`heading-display text-[40px] sm:text-[56px] lg:text-[80px] ${
            align === "center" ? "mx-auto max-w-4xl" : "max-w-4xl"
          }`}
        >
          <SplitText text={title} startDelayMs={100} staggerMs={14} />
        </h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className={`mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg ${
              align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
            }`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
