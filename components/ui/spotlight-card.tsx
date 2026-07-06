"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A premium card surface used across services, work, founders, and
 * any list that benefits from a cursor-following spotlight + lift on
 * hover. Wraps content. Spreads any extra props onto the root.
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

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mx", `${x}%`);
    ref.current.style.setProperty("--my", `${y}%`);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      whileHover={{ y: -lift, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "spotlight-surface shimmer-border relative h-full rounded-2xl border border-white/5 bg-white/[0.02] shadow-sm backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-white/10 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-flow-500/5",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
