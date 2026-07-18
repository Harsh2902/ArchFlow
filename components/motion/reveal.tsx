"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-reveal that is INVISIBLE-NEVER on the server.
 *
 * The old version rendered motion elements with a hidden initial state,
 * which SSR'd as inline `opacity:0` — on phones, every wrapped section
 * stayed blank until framer-motion hydrated. Fatal for mobile.
 *
 * New contract:
 *   - Server/first paint: a plain, fully-visible element. Zero JS wait.
 *   - After mount, ONLY on desktop (fine pointer, lg+, motion allowed)
 *     and ONLY for elements still below the fold, the element upgrades
 *     to the animated variant. Above-fold content never flashes.
 *   - Mobile / reduced-motion: stays plain forever. Instant.
 */

function useAnimUpgrade() {
  const ref = useRef<HTMLDivElement>(null);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const desktop =
      window.matchMedia("(min-width: 1024px)").matches &&
      window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!desktop || reduce) return;
    // Upgrade only what the user hasn't seen yet. Measured via a
    // one-shot IntersectionObserver — dozens of Reveals mounting at
    // once with getBoundingClientRect caused a forced-reflow storm.
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && !entry.isIntersecting) setAnim(true);
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, anim };
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "header" | "footer";
  y?: number;
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  y = 30,
  once = true
}: RevealProps) {
  const { ref, anim } = useAnimUpgrade();

  if (!anim) {
    const Tag = as;
    return (
      <Tag ref={ref as never} className={cn(className)}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as];
  const variants: Variants = {
    hidden: { opacity: 0, y, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20, delay }
    }
  };

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}

export function Stagger({
  children,
  className,
  delay = 0,
  staggerChildren = 0.08
}: StaggerProps) {
  const { ref, anim } = useAnimUpgrade();

  if (!anim) {
    // Plain, visible. Child motion.divs carry `variants` but with no
    // parent variant context + no initial they render fully visible.
    return (
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren, delayChildren: delay }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};
