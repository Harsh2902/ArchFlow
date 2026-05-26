"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, staggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
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
            Two founders.{" "}
            <span className="italic font-display text-muted-foreground">
              Engineering depth meets industry depth.
            </span>
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
          {founders.map((f) => (
            <motion.div key={f.slug} variants={staggerItem} className="h-full">
              <SpotlightCard className="group overflow-hidden">
                <div
                  aria-hidden
                  className={`relative aspect-[5/4] w-full overflow-hidden bg-gradient-to-br ${f.accent}`}
                >
                  <div className="absolute inset-0 mesh-bg opacity-50" />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                      backgroundSize: "32px 32px"
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-8xl text-foreground/60 transition-transform duration-700 group-hover:scale-110">
                      {f.initials}
                    </span>
                  </div>
                  {/* PLACEHOLDER: replace with portrait photo */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="p-6 lg:p-8">
                  <p className="text-xs uppercase tracking-eyebrow text-emerald-400">
                    {f.role}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">
                    {f.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {f.short}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </Stagger>

        <Reveal className="mt-12 flex justify-center">
          <Link
            href="/about"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
          >
            <span className="link-underline">More about us</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
