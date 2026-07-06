"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A faint dotted/lined grid that fades on hover near the cursor.
 * The "spotlight" is a CSS radial-gradient mask that follows the mouse.
 *
 * Variants:
 * - "dots" (default) — 1px dots on a 28px grid
 * - "lines" — 1px lines
 */
interface GridPatternProps {
  variant?: "dots" | "lines";
  className?: string;
  fade?: boolean; // fade edges
  interactive?: boolean; // spotlight follows cursor
}

export function GridPattern({
  variant = "dots",
  className,
  fade = true,
  interactive = true
}: GridPatternProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!interactive) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [interactive]);

  const dots =
    "radial-gradient(circle, hsl(var(--foreground) / 0.10) 1px, transparent 1px)";
  const lines =
    "linear-gradient(hsl(var(--foreground) / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.06) 1px, transparent 1px)";

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: variant === "dots" ? dots : lines,
        backgroundSize: variant === "dots" ? "28px 28px" : "56px 56px",
        maskImage: fade
          ? interactive
            ? `radial-gradient(circle 360px at ${pos.x}% ${pos.y}%, rgba(0,0,0,0.9), rgba(0,0,0,0.2) 60%, transparent 90%)`
            : "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,0,0,1) 30%, transparent 100%)"
          : undefined,
        WebkitMaskImage: fade
          ? interactive
            ? `radial-gradient(circle 360px at ${pos.x}% ${pos.y}%, rgba(0,0,0,0.9), rgba(0,0,0,0.2) 60%, transparent 90%)`
            : "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,0,0,1) 30%, transparent 100%)"
          : undefined,
        transition: interactive ? "mask-image 0.25s ease-out" : undefined
      }}
    />
  );
}
