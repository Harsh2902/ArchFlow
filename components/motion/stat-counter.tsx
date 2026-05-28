"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCounterProps {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

/**
 * Counts from 0 → `to` the first time it scrolls into view, then holds.
 *
 * Why the rewrite: the previous version used useInView with a negative
 * rootMargin ("-60px"), which is the classic reason a counter never
 * fires — the shrunk intersection box, combined with Lenis smooth
 * scroll, could leave `inView` stuck false so the value sat at 0.
 * We now trigger on `amount: 0.3` (30% of the element visible), which
 * is far more reliable, and animate with an easeOut cubic over 1200ms.
 * Digits use tabular-nums so they don't jitter while counting.
 */
export function StatCounter({
  to,
  duration = 1200,
  prefix = "",
  suffix = "",
  decimals = 0,
  className
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Respect reduced motion: jump straight to the final value.
    if (reduce) {
      setValue(to);
      return;
    }
    if (!inView) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(to * eased);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setValue(to); // pin exact final value
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  const display =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
