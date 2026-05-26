"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, staggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { services } from "@/lib/services";

export function ServicesPreview() {
  return (
    <section
      aria-labelledby="services-heading"
      className="section-y relative border-t border-white/5"
    >
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-5">What we build</p>
          <h2
            id="services-heading"
            className="heading-section text-[34px] sm:text-[44px] lg:text-[56px]"
          >
            Software shaped around your operation —{" "}
            <span className="italic font-display text-muted-foreground">
              not the other way around.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Six core platform types we deploy. Every engagement is custom-scoped
            from the modules that fit your business.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.slug} variants={staggerItem} className="h-full">
                <Link
                  href={`/services#${s.slug}`}
                  className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
                >
                  <SpotlightCard className="group flex h-full flex-col p-6 lg:p-8">
                    <div className="flex items-start justify-between">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent text-emerald-400 transition-colors group-hover:border-emerald-500/30 group-hover:text-emerald-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-display text-sm text-muted-foreground/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {s.short}
                    </p>
                    <div className="mt-6 flex items-center justify-between text-sm font-medium">
                      <span className="link-underline text-emerald-400">
                        Learn more
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
