"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Wraps a child element so it gently pulls toward the cursor when
 * hovered. The pull is springy and respects prefers-reduced-motion.
 */
export function Magnetic({ children, className, strength = 18 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });

  // Rect cached on enter — measuring inside mousemove forces sync layout.
  const rectRef = useRef<DOMRect | null>(null);

  function onEnter() {
    rectRef.current = ref.current?.getBoundingClientRect() ?? null;
  }
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = rectRef.current;
    if (reduce || !rect) return;
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
