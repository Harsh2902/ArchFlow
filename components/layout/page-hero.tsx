"use client";

import { Aurora } from "@/components/ambient/aurora";
import { GridPattern } from "@/components/ambient/grid-pattern";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** word (matched loosely) to render in the flow-blue gradient */
  highlight?: string;
}

/**
 * Interior page hero — metallic display type over the blue light field.
 * Entrances are the CSS .hero-rise pattern: visible in server HTML,
 * animated at first paint, pinned visible on mobile/reduced-motion.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  align = "left",
  highlight
}: PageHeroProps) {
  const words = title.split(" ");

  return (
    <section className="relative isolate overflow-hidden border-b border-foreground/[0.06] bg-background">
      <Aurora variant="soft" className="-z-10" />
      <div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        <GridPattern fade interactive={false} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flow-500/30 to-transparent" />

      <div
        className={`container-page relative pt-32 pb-20 lg:pt-40 lg:pb-28 ${
          align === "center" ? "text-center" : ""
        }`}
      >
        {eyebrow && (
          <p className="hero-rise eyebrow mb-5" style={{ animationDelay: "0ms" }}>
            <span className="h-1 w-1 rounded-full bg-flow-400" />
            {eyebrow}
          </p>
        )}

        <h1
          className={`hero-rise heading-display text-[38px] sm:text-[52px] lg:text-[68px] ${
            align === "center" ? "mx-auto max-w-4xl" : "max-w-4xl"
          }`}
          style={{ animationDelay: "70ms" }}
        >
          {words.map((w, i) => {
            const bare = w.replace(/[.,!?'"—]/g, "").toLowerCase();
            const isHl =
              !!highlight && bare.includes(highlight.toLowerCase());
            return (
              <span key={i} className={isHl ? "text-flow" : "text-metal"}>
                {w}
                {i < words.length - 1 ? " " : ""}
              </span>
            );
          })}
        </h1>

        {subtitle && (
          <p
            className={`hero-rise mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg ${
              align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
            }`}
            style={{ animationDelay: "140ms" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
