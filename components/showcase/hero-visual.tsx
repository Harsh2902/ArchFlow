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
 * Both fade in softly.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const [allow3D, setAllow3D] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!reduce) {
      const fine = window.matchMedia("(pointer: fine)").matches;
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      if (fine && wide) setAllow3D(true);
    }
    const t = setTimeout(() => setShown(true), 60);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <div
      className="relative h-full w-full transition-opacity duration-1000 ease-out"
      style={{ opacity: shown ? 1 : 0 }}
    >
      {allow3D ? (
        <>
          {/* glow pedestal behind the 3D mark */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flow-600/25 blur-[110px]"
          />
          <div className="absolute inset-0">
            <Hero3D />
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center py-6">
          <BrandPlate className="w-full max-w-md" />
        </div>
      )}
    </div>
  );
}
