"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue
} from "framer-motion";
import {
  Inbox,
  FileText,
  CheckCircle2,
  Hammer,
  Truck,
  Wrench,
  Headphones
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { GridPattern } from "@/components/ambient/grid-pattern";

/**
 * The flagship "Watch the flow" section. A horizontal workflow
 * diagram with 7 stages, connecting paths that animate as you scroll,
 * and nodes that light up sequentially.
 *
 * This is the section that demonstrates what we actually build.
 */

const NODES = [
  { icon: Inbox, label: "Enquiry", detail: "Lead captured, BDM assigned, site visit logged." },
  { icon: FileText, label: "Quotation", detail: "Configurable BOM, versioned, approved." },
  { icon: CheckCircle2, label: "Order", detail: "PO confirmed, customer 360 view updated." },
  { icon: Hammer, label: "Production", detail: "Job card on the shop floor, status live." },
  { icon: Truck, label: "Dispatch", detail: "Vehicle scheduled, site team notified." },
  { icon: Wrench, label: "Installation", detail: "Site team checklist, snags captured." },
  { icon: Headphones, label: "Service", detail: "AMC, complaint resolution, audit trail." }
];

export function FlowDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"]
  });

  return (
    <section
      ref={containerRef}
      aria-labelledby="flow-heading"
      className="relative isolate overflow-hidden border-t border-white/5 section-y"
    >
      <GridPattern className="-z-10" interactive={false} fade />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-flow-500/30 to-transparent" />

      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-5">The flow</p>
          <h2
            id="flow-heading"
            className="heading-section text-[34px] sm:text-[44px] lg:text-[56px]"
          >
            <span className="text-metal">One platform from </span>
            <span className="text-flow">enquiry</span>
            <span className="text-metal"> to </span>
            <span className="text-flow">service</span>
            <span className="text-metal">.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            No handoffs lost in WhatsApp. No status updates in Excel. Every stage
            on a single source of truth — operators on the floor, sales heads on
            site, leadership at the desk.
          </p>
        </Reveal>

        {/* Desktop horizontal flow */}
        <div className="relative mt-20 hidden lg:block">
          <FlowSVG progress={scrollYProgress} reduce={!!reduce} />

          <div className="relative grid grid-cols-7 gap-2">
            {NODES.map((n, i) => (
              <FlowNode
                key={n.label}
                node={n}
                index={i}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Mobile/tablet vertical stack */}
        <div className="mt-16 grid gap-3 lg:hidden">
          {NODES.map((n, i) => {
            const Icon = n.icon;
            return (
              <Reveal key={n.label} delay={i * 0.05}>
                <div className="surface relative flex items-start gap-4 p-5">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-flow-500/30 bg-flow-500/10 text-flow-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-eyebrow text-muted-foreground">
                      Stage {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-0.5 text-base font-semibold tracking-tight">
                      {n.label}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {n.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Caption strip */}
        <Reveal className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/5 pt-8 text-center text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-flow-400" />
            Single source of truth
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-flow-400" />
            Mobile-first for the floor
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-flow-400" />
            Audit trail at every handoff
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-flow-400" />
            Modular — turn on what you need
          </span>
        </Reveal>
      </div>
    </section>
  );
}

function FlowSVG({
  progress,
  reduce
}: {
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const pathProgress = useTransform(progress, [0, 1], [0, 1]);
  const dashOffset = useTransform(pathProgress, (v) => 1000 - v * 1000);

  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-[60px] h-[120px] w-full"
    >
      <defs>
        <linearGradient id="flow-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(88,101,242,0.0)" />
          <stop offset="20%" stopColor="rgba(88,101,242,0.6)" />
          <stop offset="80%" stopColor="rgba(88,101,242,0.6)" />
          <stop offset="100%" stopColor="rgba(88,101,242,0.0)" />
        </linearGradient>
      </defs>

      {/* underlying faint line */}
      <line
        x1="40"
        y1="60"
        x2="1160"
        y2="60"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        strokeDasharray="4 6"
      />
      {/* progress overlay */}
      <motion.line
        x1="40"
        y1="60"
        x2="1160"
        y2="60"
        stroke="url(#flow-grad)"
        strokeWidth="2"
        strokeDasharray="1000"
        style={{ strokeDashoffset: reduce ? 0 : dashOffset }}
      />
    </svg>
  );
}

function FlowNode({
  node,
  index,
  progress
}: {
  node: (typeof NODES)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const Icon = node.icon;
  const slice = 1 / NODES.length;
  // No opacity-dimming on the node: fading the step number/label below
  // full opacity dropped small muted text under the 4.5:1 WCAG contrast
  // floor. The sequential "active" cue is carried entirely by the circle
  // (border, background, glow, icon color), so the labels stay readable.
  const accent = useTransform(
    progress,
    [index * slice - 0.05, index * slice + 0.05],
    [0, 1]
  );
  const borderColor = useTransform(
    accent,
    [0, 1],
    ["rgba(255,255,255,0.08)", "rgba(88,101,242,0.5)"]
  );
  const backgroundColor = useTransform(
    accent,
    [0, 1],
    ["rgba(255,255,255,0.02)", "rgba(88,101,242,0.08)"]
  );
  const boxShadow = useTransform(
    accent,
    [0, 1],
    [
      "0 0 0 0 rgba(88,101,242,0)",
      "0 0 30px -6px rgba(88,101,242,0.5)"
    ]
  );
  const iconColor = useTransform(
    accent,
    [0, 1],
    ["rgba(255,255,255,0.45)", "rgb(88,101,242)"]
  );

  return (
    <div className="group relative flex flex-col items-center text-center">
      <div className="relative flex h-32 flex-col items-center">
        <div className="relative z-10">
          <motion.div
            style={{ borderColor, backgroundColor, boxShadow }}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="grid h-14 w-14 place-items-center rounded-full border backdrop-blur"
          >
            <motion.div style={{ color: iconColor }}>
              <Icon className="h-5 w-5" />
            </motion.div>
          </motion.div>
        </div>

        <p className="mt-4 font-display text-xs text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </p>

        <p className="mt-1 text-sm font-semibold tracking-tight text-foreground">
          {node.label}
        </p>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-52 -translate-x-1/2 rounded-lg border border-white/10 bg-background/95 p-3 text-xs text-muted-foreground opacity-0 shadow-xl backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
        {node.detail}
      </div>
    </div>
  );
}
