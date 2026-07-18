"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll — desktop only. On touch devices Lenis adds nothing
 * (native momentum scrolling is already ideal) but its permanent
 * requestAnimationFrame loop costs main-thread time and battery, so we
 * never mount it there. Also skipped under prefers-reduced-motion.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    if (reduce || !finePointer || !wide) return;

    // Snappy profile: higher lerp = tighter tracking of the wheel (the
    // old 1.1s eased glide read as "slow scroll"); a slight wheel
    // multiplier keeps travel-per-notch familiar.
    const lenis = new Lenis({
      lerp: 0.16,
      wheelMultiplier: 1.1,
      smoothWheel: true
    });

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
