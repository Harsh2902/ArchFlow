"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// The Three.js scene is code-split and never server-rendered — keeps
// three/R3F (~140KB gz) out of the initial bundle and off the server.
const Hero3D = dynamic(() => import("@/components/showcase/hero-3d"), {
  ssr: false,
  loading: () => <StaticArch />
});

/**
 * Decides what renders behind/beside the hero headline:
 *   - desktop + fine pointer + motion allowed + in view → the 3D arch
 *   - reduced motion (any device)                       → static SVG arch
 *   - mobile (<768px)                                   → hidden (handled
 *     by the `hidden md:block` wrapper in the hero)
 */
export function HeroBackdrop() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [allow3D, setAllow3D] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const wideEnough = window.matchMedia("(min-width: 768px)").matches;
    if (finePointer && wideEnough) setAllow3D(true);
  }, [reduce]);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0">
      {allow3D && inView ? <Hero3D /> : <StaticArch />}
    </div>
  );
}

/** Static, motion-free fallback — an arch outline with an emerald glow. */
function StaticArch() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="h-3/4 w-3/4 opacity-70"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="arch-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id="arch-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M40 165 V95 A60 60 0 0 1 160 95 V165"
          stroke="url(#arch-stroke)"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#arch-glow)"
        />
      </svg>
    </div>
  );
}
