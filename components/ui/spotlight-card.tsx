"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Premium card surface: cursor-following spotlight + shimmer border +
 * spring lift. The element's rect is measured ONCE on pointer-enter and
 * cached — calling getBoundingClientRect on every mousemove forces a
 * synchronous layout (the "forced reflow" Lighthouse flag).
 */
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  lift?: number;
}

export function SpotlightCard({
  children,
  className,
  lift = 4
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  function onEnter() {
    rectRef.current = ref.current?.getBoundingClientRect() ?? null;
  }

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    const rect = rectRef.current;
    if (!el || !rect) return;
    el.style.setProperty(
      "--mx",
      `${((e.clientX - rect.left) / rect.width) * 100}%`
    );
    el.style.setProperty(
      "--my",
      `${((e.clientY - rect.top) / rect.height) * 100}%`
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      whileHover={{ y: -lift, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "spotlight-surface shimmer-border relative h-full rounded-2xl border border-foreground/[0.08] bg-foreground/[0.025] shadow-sm backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-foreground/[0.16] hover:bg-foreground/[0.05] hover:shadow-xl hover:shadow-flow-500/5",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
