"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

/**
 * Custom cursor — a small dot with a trailing ring that grows over
 * interactive elements. Uses mix-blend-mode: difference so it inverts
 * over any background.
 *
 * Disabled on touch devices and on prefers-reduced-motion.
 */
export function CustomCursor() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);

  // smooth springs for trailing ring
  const ringX = useSpring(-40, { stiffness: 220, damping: 28, mass: 0.4 });
  const ringY = useSpring(-40, { stiffness: 220, damping: 28, mass: 0.4 });
  // dot tracks 1:1 (no spring) for crispness
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setIsCoarse(coarse);
    if (coarse || reduce) return;

    const onMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }
      ringX.set(e.clientX - 18);
      ringY.set(e.clientY - 18);

      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive =
        !!target.closest(
          "a, button, [role='button'], input, textarea, select, [data-cursor='pointer']"
        );
      setIsPointer(interactive);
    };

    const onLeave = () => setIsPointer(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    document.documentElement.classList.add("custom-cursor-on");
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("custom-cursor-on");
    };
  }, [reduce, ringX, ringY]);

  if (!mounted || isCoarse || reduce) return null;

  return (
    <>
      {/* trailing ring */}
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      >
        <motion.div
          animate={{
            width: isPointer ? 56 : 36,
            height: isPointer ? 56 : 36,
            borderColor: isPointer
              ? "rgba(16,185,129,0.9)"
              : "rgba(255,255,255,0.6)"
          }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}
          className="rounded-full border bg-transparent"
        />
      </motion.div>

      {/* center dot */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
      />
    </>
  );
}
