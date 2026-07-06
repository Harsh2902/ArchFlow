"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/use-is-mobile";

/**
 * Slow-drifting royal-blue light field — the ambient signature of the
 * brand. Mobile gets fewer, smaller, static blobs (heavy blurred layers
 * animating forever crash memory-constrained mobile Safari).
 *
 * Variants:
 * - "hero"  → biggest, most saturated
 * - "soft"  → calmer section ambience
 * - "edge"  → a single wash for CTAs
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
          { color: "rgba(88, 101, 242, 0.22)", size: 720, x: "16%", y: "22%" },
          { color: "rgba(67, 83, 240, 0.16)", size: 640, x: "82%", y: "16%" },
          { color: "rgba(138, 150, 255, 0.10)", size: 560, x: "62%", y: "85%" },
          { color: "rgba(51, 64, 212, 0.14)", size: 480, x: "6%", y: "88%" }
        ]
      : variant === "edge"
        ? [
            { color: "rgba(88, 101, 242, 0.2)", size: 640, x: "50%", y: "50%" }
          ]
        : [
            { color: "rgba(88, 101, 242, 0.1)", size: 520, x: "15%", y: "25%" },
            { color: "rgba(67, 83, 240, 0.08)", size: 480, x: "85%", y: "75%" }
          ];

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
