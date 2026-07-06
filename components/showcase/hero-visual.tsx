"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { BrandPlate } from "@/components/showcase/brand-plate";

// Code-split, client-only. No visible fallback while loading — the
// scene fades in when ready (no bright flash).
const Hero3D = dynamic(() => import("@/components/showcase/hero-3d"), {
  ssr: false,
  loading: () => null
});

/**
 * The hero's right-side visual:
 *   desktop + fine pointer + motion OK → the true 3D mark
 *   mobile / touch / reduced motion    → the interactive brand plate
 *
 * SSR-visible by design: the plate ships fully opaque in the server
 * HTML so phones see it on first paint with zero JS. Only the 3D
 * branch (client-only anyway) fades in on mount.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const [allow3D, setAllow3D] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    if (fine && wide) setAllow3D(true);
  }, [reduce]);

  return (
    <div className="relative h-full w-full">
      {allow3D ? (
        // Desktop only — mounts client-side, fades in via .page-enter
        <div className="page-enter absolute inset-0">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flow-600/25 blur-[110px]"
          />
          <div className="absolute inset-0">
            <Hero3D />
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center py-6">
          <BrandPlate className="w-full max-w-md" />
        </div>
      )}
    </div>
  );
}
