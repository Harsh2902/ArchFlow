"use client";

import { motion } from "framer-motion";

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
    <section className="relative isolate overflow-hidden border-b border-white/5 mesh-bg">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>
      <div
        className={`container-page py-24 lg:py-32 ${
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
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`heading-display text-[40px] sm:text-[56px] lg:text-[80px] ${
            align === "center" ? "mx-auto max-w-4xl" : "max-w-4xl"
          }`}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
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
