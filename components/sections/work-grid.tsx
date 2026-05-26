"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { Stagger, staggerItem } from "@/components/motion/reveal";
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
        const card = (
          <motion.article
            variants={staggerItem}
            whileHover={isLinked ? { y: -4 } : {}}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-all",
              isLinked && "hover:border-white/15 hover:bg-white/[0.04]"
            )}
          >
            <div
              aria-hidden
              className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${item.accent}`}
            >
              <div className="absolute inset-0 mesh-bg opacity-60" />
              {/* PLACEHOLDER: replace with project hero image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-5xl tracking-tight text-foreground/30">
                  {item.client
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}
                </span>
              </div>
              {!isLinked && (
                <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-white/10 bg-background/70 px-2.5 py-1 text-[10px] uppercase tracking-eyebrow text-muted-foreground backdrop-blur">
                  <Lock className="h-3 w-3" />
                  {STATUS_LABEL[item.status]}
                </div>
              )}
              {isLinked && (
                <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] uppercase tracking-eyebrow text-emerald-300 backdrop-blur">
                  {STATUS_LABEL[item.status]}
                </div>
              )}
            </div>
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-3 text-xs uppercase tracking-eyebrow text-muted-foreground">
                <span>{item.industry}</span>
                <span className="text-white/15">·</span>
                <span>{item.year}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                {item.client}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.summary}
              </p>
              {isLinked && (
                <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View case study
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </p>
              )}
            </div>
          </motion.article>
        );

        return isLinked ? (
          <Link
            key={item.slug}
            href={item.href!}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
          >
            {card}
          </Link>
        ) : (
          <div key={item.slug}>{card}</div>
        );
      })}
    </Stagger>
  );
}
