"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, staggerItem } from "@/components/motion/reveal";
import { services } from "@/lib/services";

export function ServicesPreview() {
  return (
    <section
      aria-labelledby="services-heading"
      className="section-y border-t border-white/5"
    >
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-5">What we build</p>
          <h2
            id="services-heading"
            className="heading-section text-[34px] sm:text-[44px] lg:text-[56px]"
          >
            Software shaped around your operation — not the other way around.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Six core platform types we deploy. Every engagement is custom-scoped
            from the modules that fit your business.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.slug}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="surface surface-hover group relative flex h-full flex-col p-6 lg:p-8"
              >
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-emerald-400 transition-colors group-hover:border-emerald-500/30">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.short}
                </p>
                <Link
                  href={`/services#${s.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
