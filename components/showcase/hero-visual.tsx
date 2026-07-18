"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Code-split, client-only.
const Hero3D = dynamic(() => import("@/components/showcase/hero-3d"), {
  ssr: false,
  loading: () => null
});

/**
 * The hero's right-side visual — desktop only. The 3D mark mounts the
 * moment the page hydrates, straight into place: no placeholder, no
 * cross-fade, nothing to swap. Until the canvas paints, the space
 * holds only the ambient glow. Phones never see this stage at all —
 * the hero hides the whole column below lg — and the WebGL chunk is
 * additionally gated on a fine pointer.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const [allow3D, setAllow3D] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: fine)").matches) setAllow3D(true);
  }, [reduce]);

  return (
    <div className="relative h-full w-full">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flow-600/25 blur-[110px]"
      />
      {allow3D && (
        <div className="absolute inset-0">
          <Hero3D />
        </div>
      )}
    </div>
  );
}
