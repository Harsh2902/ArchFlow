"use client";

import { useEffect, useState } from "react";

export interface Chapter {
  id: string;
  n: string;
  label: string;
}

/**
 * The story spine — a fixed rail on the left edge (xl screens) that
 * tracks which chapter of the company story is on screen. Clicking a
 * chapter scrolls to it. Powered by one IntersectionObserver.
 */
export function ChapterRail({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <nav
      aria-label="Story chapters"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 xl:flex"
    >
      {chapters.map((c) => {
        const isActive = active === c.id;
        return (
          <button
            key={c.id}
            onClick={() =>
              document
                .getElementById(c.id)
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex items-center gap-2.5 text-left"
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`h-px transition-all duration-500 ${
                isActive
                  ? "w-8 bg-flow-400"
                  : "w-4 bg-foreground/20 group-hover:bg-foreground/40"
              }`}
            />
            <span
              className={`font-display text-[10px] font-bold uppercase tracking-eyebrow transition-all duration-500 ${
                isActive
                  ? "translate-x-0 text-flow-600 opacity-100 dark:text-flow-400"
                  : "-translate-x-1 text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:opacity-70"
              }`}
            >
              {c.n} · {c.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
