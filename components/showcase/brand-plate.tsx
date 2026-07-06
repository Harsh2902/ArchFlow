"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform
} from "framer-motion";
import { useIsMobile } from "@/lib/use-is-mobile";
import { cn } from "@/lib/utils";

/**
 * The brand plate — the actual logo render presented like a product
 * shot on a dark glass slab. Interactive on desktop: cursor-driven 3D
 * tilt with springs, a specular shine that sweeps with the pointer,
 * and a floating blue glow. All transform/opacity only → 60fps, and
 * the deliberately-dark slab makes the PNG's black canvas intentional
 * in BOTH themes.
 *
 * Mobile / reduced-motion: static plate, no listeners.
 */
export function BrandPlate({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const interactive = !reduce && !isMobile;

  const px = useMotionValue(0.5); // pointer 0..1
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 120, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 120, damping: 18, mass: 0.6 });

  const rotateY = useTransform(sx, [0, 1], [-9, 9]);
  const rotateX = useTransform(sy, [0, 1], [7, -7]);
  const shineX = useTransform(sx, [0, 1], ["-30%", "130%"]);
  const markX = useTransform(sx, [0, 1], [14, -14]);
  const markY = useTransform(sy, [0, 1], [10, -10]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!interactive || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("relative", className)}
      style={{ perspective: 1300 }}
    >
      {/* ambient halo */}
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[48px] bg-flow-600/20 blur-[90px]" />

      <motion.div
        style={interactive ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#07080d] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(88,101,242,0.15)]"
      >
        {/* inner atmosphere */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(88,101,242,0.16),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />

        {/* the mark — floats against the plate for depth */}
        <motion.div
          style={interactive ? { x: markX, y: markY, translateZ: 40 } : undefined}
          className="relative flex items-center justify-center px-10 py-12 sm:px-14 sm:py-16"
        >
          <Image
            src="/brand/logo-mark-512.png"
            alt="The ArchFlow mark"
            width={512}
            height={512}
            priority
            sizes="(max-width: 768px) 80vw, 440px"
            className="h-auto w-full max-w-[440px] drop-shadow-[0_20px_60px_rgba(88,101,242,0.35)]"
          />
        </motion.div>

        {/* specular shine sweep */}
        {interactive && (
          <motion.div
            aria-hidden
            style={{ left: shineX }}
            className="pointer-events-none absolute top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
          />
        )}

        {/* plate footer strip */}
        <div className="relative flex items-center justify-between border-t border-white/[0.07] px-6 py-3.5 text-[10px] uppercase tracking-eyebrow text-white/45">
          <span>ArchFlow · Custom Workflow Platforms</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-flow-400" />
            Chandigarh, IN
          </span>
        </div>
      </motion.div>
    </div>
  );
}
