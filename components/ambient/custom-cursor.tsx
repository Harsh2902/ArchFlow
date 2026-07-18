"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useMotionValue } from "framer-motion";

/**
 * Desktop-only custom cursor: a small emerald dot (8px) that follows
 * the pointer with a slight spring lag and grows to 32px over
 * interactive elements.
 *
 * Safe by construction:
 *   - pointer-events-none → never blocks clicks, text selection, or scroll
 *   - rendered null on touch devices and prefers-reduced-motion
 *   - the native cursor is only hidden (via the .custom-cursor-on class
 *     in globals.css) while this is mounted, and restored on unmount
 */
export function CustomCursor() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [active, setActive] = useState(false);

  // Instant tracking — raw motion values, no spring on position.
  // (A spring here made the cursor feel laggy; snappiness > smoothing.)
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse || reduce) {
      setDisabled(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setActive(
        !!target?.closest(
          "a, button, [role='button'], input, textarea, select, label, [data-cursor='pointer']"
        )
      );
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.classList.add("custom-cursor-on");
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("custom-cursor-on");
    };
  }, [reduce, x, y]);

  if (!mounted || disabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
    >
      <motion.div
        animate={{
          width: active ? 32 : 8,
          height: active ? 32 : 8,
          opacity: active ? 0.5 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-flow-400"
      />
    </motion.div>
  );
}
