"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { BrandPlate } from "@/components/showcase/brand-plate";
import { Mark } from "@/components/brand/mark";

// Code-split, client-only.
const Hero3D = dynamic(() => import("@/components/showcase/hero-3d"), {
  ssr: false,
  loading: () => null
});

/**
 * The hero's right-side visual.
 *
 * CSS decides the layout: mobile always gets the BrandPlate (in the
 * server HTML, instant); desktop gets the 3D stage. While the WebGL
 * chunk loads, desktop shows a large GHOST of the vector mark — the
 * same silhouette in the same spot — and the 3D cross-fades in over
 * it. One object materializing, never a visual swap.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const [allow3D, setAllow3D] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || reduce) return;
    if (window.matchMedia("(pointer: fine)").matches) setAllow3D(true);
  }, [reduce]);

  return (
    <div className="relative h-full w-full">
      {/* ── Desktop stage (lg+) ── */}
      <div className="absolute inset-0 hidden lg:block">
        {/* glow pedestal — always on, from first paint */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flow-600/25 blur-[110px]"
        />

        {/* ghost mark — the placeholder silhouette; fades out as 3D lands.
            If 3D never loads (reduced motion / coarse pointer), it simply
            stays as the visual. */}
        <div
          aria-hidden
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-out ${
            ready ? "opacity-0" : "opacity-70"
          }`}
        >
          <Mark size={380} className="text-foreground/85 drop-shadow-[0_20px_50px_rgba(88,101,242,0.35)]" />
        </div>

        {/* the living mark — cross-fades over the ghost when the GPU
            scene is actually rendering */}
        {allow3D && (
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          >
            <Hero3D onReady={() => setReady(true)} />
          </div>
        )}
      </div>

      {/* ── Mobile visual (always in server HTML, instant paint) ── */}
      <div className="flex h-full w-full items-center justify-center py-6 lg:hidden">
        <BrandPlate className="w-full max-w-md" />
      </div>
    </div>
  );
}
