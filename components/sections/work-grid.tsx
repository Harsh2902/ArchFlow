"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock, CheckCircle2 } from "lucide-react";
import { Stagger, staggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { workItems } from "@/lib/work";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<string, string> = {
  live: "Live",
  "in-progress": "In progress",
  pipeline: "Coming soon"
};

export function WorkGrid() {
  return (
    <Stagger className="grid gap-6 md:grid-cols-2" staggerChildren={0.1}>
      {workItems.map((item) => {
        const isLinked = !!item.href;
        const Card = (
          <motion.article variants={staggerItem} className="h-full">
            <SpotlightCard className="group h-full overflow-hidden">
              <div
                aria-hidden
                className={cn(
                  "relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br",
                  item.accent
                )}
              >
                {/* mesh + grid + initials */}
                <div className="absolute inset-0 mesh-bg opacity-60" />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "32px 32px"
                  }}
                />
                {/* PLACEHOLDER: replace with project hero image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="font-display text-7xl tracking-tight text-foreground/40"
                    initial={{ scale: 0.95, opacity: 0.7 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {item.client
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </motion.span>
                </div>

                {/* Status badge */}
                <div className="absolute right-4 top-4">
                  {isLinked ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-flow-500/30 bg-flow-500/10 px-2.5 py-1 text-[10px] uppercase tracking-eyebrow text-flow-300 backdrop-blur">
                      <span className="relative inline-flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flow-400 opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-flow-400" />
                      </span>
                      {STATUS_LABEL[item.status]}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-foreground/10 bg-background/70 px-2.5 py-1 text-[10px] uppercase tracking-eyebrow text-muted-foreground backdrop-blur">
                      <Lock className="h-3 w-3" />
                      {STATUS_LABEL[item.status]}
                    </span>
                  )}
                </div>

                {/* Year stamp */}
                <div className="absolute left-4 top-4 font-display text-base text-foreground/70">
                  {item.year}
                </div>

                {/* Bottom gradient + reveal arrow */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/80 to-transparent" />
                {isLinked && (
                  <div className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-flow-500/95 px-3 py-1.5 text-[11px] font-medium text-slate-950 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1">
                    View case study
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                )}
              </div>

              <div className="p-6 lg:p-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-eyebrow text-muted-foreground">
                  <span>{item.industry}</span>
                </div>
                <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                  {item.client}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
              </div>
            </SpotlightCard>
          </motion.article>
        );

        return isLinked ? (
          <Link
            key={item.slug}
            href={item.href!}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-flow-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
          >
            {Card}
          </Link>
        ) : (
          <div key={item.slug}>{Card}</div>
        );
      })}
    </Stagger>
  );
}
