"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/use-is-mobile";

/**
 * Slow-drifting animated color blobs. The kind of background you
 * stare at without realising why the site feels alive.
 *
 * On mobile / touch devices the blob count, size, blur, and animation
 * are all dialled way down — four 720px blur(60px) elements animating
 * forever will crash memory-constrained mobile Safari on scroll.
 *
 * Variants:
 * - "hero"  → biggest, most saturated, sits behind the hero
 * - "soft"  → calmer, used as section ambience
 * - "edge"  → just a thin emerald wash for CTAs
 */
interface AuroraProps {
  variant?: "hero" | "soft" | "edge";
  className?: string;
}

export function Aurora({ variant = "soft", className }: AuroraProps) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();

  const desktopBlobs =
    variant === "hero"
      ? [
          { color: "rgba(16, 185, 129, 0.35)", size: 720, x: "10%", y: "20%" },
          { color: "rgba(59, 130, 246, 0.22)", size: 640, x: "80%", y: "10%" },
          { color: "rgba(99, 102, 241, 0.18)", size: 560, x: "60%", y: "85%" },
          { color: "rgba(16, 185, 129, 0.18)", size: 480, x: "5%", y: "90%" }
        ]
      : variant === "edge"
        ? [
            { color: "rgba(16, 185, 129, 0.25)", size: 600, x: "50%", y: "50%" }
          ]
        : [
            { color: "rgba(16, 185, 129, 0.14)", size: 520, x: "15%", y: "25%" },
            { color: "rgba(59, 130, 246, 0.10)", size: 480, x: "85%", y: "75%" }
          ];

  // Mobile: at most 2 blobs, capped size, lighter blur, never animated.
  const blobs = isMobile
    ? desktopBlobs.slice(0, 2).map((b) => ({ ...b, size: Math.min(b.size, 300) }))
    : desktopBlobs;

  const blurPx = isMobile ? 38 : 60;
  const animateOff = reduce || isMobile;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${b.color} 0%, transparent 60%)`,
            filter: `blur(${blurPx}px)`,
            willChange: animateOff ? undefined : "transform"
          }}
          animate={
            animateOff
              ? undefined
              : {
                  x: [0, 30, -20, 0],
                  y: [0, -25, 15, 0],
                  scale: [1, 1.08, 0.95, 1]
                }
          }
          transition={{
            duration: 18 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5
          }}
        />
      ))}
    </div>
  );
}
