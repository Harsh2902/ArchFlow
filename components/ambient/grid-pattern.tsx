"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A faint dotted/lined grid with a spotlight mask that follows the
 * cursor. The follow is driven by CSS variables written straight to the
 * element inside the mousemove handler — zero React re-renders, zero
 * style-string rebuilds per frame.
 */
interface GridPatternProps {
  variant?: "dots" | "lines";
  className?: string;
  fade?: boolean;
  interactive?: boolean;
}

export function GridPattern({
  variant = "dots",
  className,
  fade = true,
  interactive = true
}: GridPatternProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive) return;
    const el = ref.current;
    if (!el) return;

    // Cache the rect; refresh only on resize (not per mousemove — a
    // getBoundingClientRect inside the handler forces sync layout).
    let rect = el.getBoundingClientRect();
    const onResize = () => {
      rect = el.getBoundingClientRect();
    };
    const onMove = (e: MouseEvent) => {
      el.style.setProperty(
        "--gx",
        `${((e.clientX - rect.left) / rect.width) * 100}%`
      );
      el.style.setProperty(
        "--gy",
        `${((e.clientY - rect.top) / rect.height) * 100}%`
      );
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [interactive]);

  const dots =
    "radial-gradient(circle, hsl(var(--foreground) / 0.10) 1px, transparent 1px)";
  const lines =
    "linear-gradient(hsl(var(--foreground) / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.06) 1px, transparent 1px)";

  const mask = fade
    ? interactive
      ? "radial-gradient(circle 360px at var(--gx, 50%) var(--gy, 50%), rgba(0,0,0,0.9), rgba(0,0,0,0.2) 60%, transparent 90%)"
      : "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,0,0,1) 30%, transparent 100%)"
    : undefined;

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: variant === "dots" ? dots : lines,
        backgroundSize: variant === "dots" ? "28px 28px" : "56px 56px",
        maskImage: mask,
        WebkitMaskImage: mask
      }}
    />
  );
}
