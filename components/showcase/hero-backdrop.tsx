"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// The Three.js scene is code-split and never server-rendered. The loading
// fallback is `null` (not a visible arch) so there is no bright flash
// while the chunk downloads — the scene simply fades in once ready.
const Hero3D = dynamic(() => import("@/components/showcase/hero-3d"), {
  ssr: false,
  loading: () => null
});

/**
 * Decides what renders behind/beside the hero headline:
 *   - desktop + fine pointer + motion allowed + in view → the 3D arch
 *   - reduced motion                                     → static SVG arch
 *   - mobile (<768px)                                    → not mounted
 *     (the `hidden md:block` wrapper in the hero handles that)
 *
 * The whole layer fades from 0 → 0.6 opacity over ~1s after mount, so the
 * arch gently materialises in the background rather than popping in.
 */
export function HeroBackdrop() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [allow3D, setAllow3D] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!reduce) {
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const wideEnough = window.matchMedia("(min-width: 768px)").matches;
      if (finePointer && wideEnough) setAllow3D(true);
    }
    // Begin the fade-in on the next tick so the transition actually runs.
    const t = setTimeout(() => setShown(true), 80);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-0 transition-opacity duration-1000 ease-out"
      style={{ opacity: shown ? 0.6 : 0 }}
    >
      {allow3D && inView ? <Hero3D /> : <StaticArch />}
    </div>
  );
}

/** Subtle motion-free fallback — a faint arch outline. */
function StaticArch() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="h-3/4 w-3/4 opacity-50"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="arch-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path
          d="M40 165 V95 A60 60 0 0 1 160 95 V165"
          stroke="url(#arch-stroke)"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
