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
      whileHover={{ y: -lift }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={cn(
        "spotlight-surface shimmer-border relative h-full rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-colors duration-300 hover:border-white/10 hover:bg-white/[0.04]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
