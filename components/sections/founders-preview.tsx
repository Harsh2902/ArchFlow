"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, staggerItem } from "@/components/motion/reveal";
import { founders } from "@/lib/founders";

export function FoundersPreview() {
  return (
    <section
      aria-labelledby="founders-heading"
      className="section-y border-t border-white/5"
    >
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-5">Founders</p>
          <h2
            id="founders-heading"
            className="heading-section text-[34px] sm:text-[44px] lg:text-[56px]"
          >
            Two founders. Engineering depth meets industry depth.
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
          {founders.map((f) => (
            <motion.article
              key={f.slug}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="surface surface-hover overflow-hidden p-6 lg:p-8"
            >
              <div
                aria-hidden
                className={`relative mb-6 aspect-[5/4] w-full overflow-hidden rounded-xl bg-gradient-to-br ${f.accent}`}
              >
                <div className="absolute inset-0 mesh-bg opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-7xl text-foreground/60">
                    {f.initials}
                  </span>
                </div>
                {/* PLACEHOLDER: replace with portrait photo */}
              </div>
              <p className="text-xs uppercase tracking-eyebrow text-emerald-400">
                {f.role}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">
                {f.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.short}
              </p>
            </motion.article>
          ))}
        </Stagger>

        <Reveal className="mt-12 flex justify-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
          >
            More about us
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
