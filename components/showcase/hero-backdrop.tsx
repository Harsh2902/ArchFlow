"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// The Three.js scene is code-split and never server-rendered. No visible
// loading fallback — the mark fades in once the chunk is ready.
const Hero3D = dynamic(() => import("@/components/showcase/hero-3d"), {
  ssr: false,
  loading: () => null
});

/**
 * The hero's logo showcase:
 *   - desktop + fine pointer + motion allowed → the real 3D mark
 *   - mobile / reduced motion                 → the actual logo PNG
 *     with a soft blue glow (zero GPU cost, identical brand)
 * Fades in gently either way — no pop.
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
    const t = setTimeout(() => setShown(true), 60);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative h-full w-full transition-opacity duration-1000 ease-out"
      style={{ opacity: shown ? 1 : 0 }}
    >
      {/* Blue glow pedestal behind the mark */}
      <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flow-600/25 blur-[100px]" />

      {allow3D && inView ? (
        <Hero3D />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Image
            src="/brand/logo-mark-512.png"
            alt=""
            width={420}
            height={420}
            priority
            className="h-auto w-[70%] max-w-[420px] drop-shadow-[0_0_60px_rgba(88,101,242,0.45)]"
          />
        </div>
      )}
    </div>
  );
}
