"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
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
import { useIsMobile } from "@/lib/use-is-mobile";

/**
 * Chapter 03 — the flow, pinned. The screen holds while the seven
 * stages of an order light up one after another: a giant stage
 * counter, the stage's story line, and the node rail filling with
 * blue as the order travels from enquiry to service.
 *
 * Mobile / reduced-motion: a simple vertical stage list.
 */

const NODES = [
  { icon: Inbox, label: "Enquiry", detail: "A lead lands. BDM assigned, site visit logged — nothing lost in an inbox." },
  { icon: FileText, label: "Quotation", detail: "BOM-aware pricing, versioned quotes, approvals — sent in hours, not days." },
  { icon: CheckCircle2, label: "Order", detail: "PO confirmed. The customer's entire history in one 360° view." },
  { icon: Hammer, label: "Production", detail: "Job cards hit the shop floor. Status flows back live, not by phone call." },
  { icon: Truck, label: "Dispatch", detail: "Vehicles scheduled, site teams notified, every crate accounted for." },
  { icon: Wrench, label: "Installation", detail: "On-site checklists, snag capture, sign-off — while the office watches live." },
  { icon: Headphones, label: "Service", detail: "AMC and complaints with a full audit trail. The relationship continues." }
];

export function FlowDiagram() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const pinned = !reduce && !isMobile;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  return (
    <section
      id="story-flow"
      aria-labelledby="flow-heading"
      className="relative border-t border-foreground/[0.06]"
    >
      {pinned ? (
        <div ref={ref} className="relative h-[420vh]">
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            <div className="container-page">
              <div className="text-center">
                <p className="eyebrow justify-center">
                  <span className="h-1 w-1 rounded-full bg-flow-400" />
                  Chapter 03 · The flow
                </p>
                <h2
                  id="flow-heading"
                  className="heading-section mx-auto mt-4 max-w-3xl text-[30px] sm:text-[38px] lg:text-[46px]"
                >
                  <span className="text-metal">Watch one order travel </span>
                  <span className="text-flow">the whole way.</span>
                </h2>
              </div>

              {/* Giant stage counter + narrative crossfade */}
              <div className="relative mx-auto mt-12 flex h-[190px] max-w-3xl items-center justify-center text-center">
                {NODES.map((n, i) => (
                  <StageStory key={n.label} node={n} index={i} progress={scrollYProgress} />
                ))}
              </div>

              {/* Node rail */}
              <div className="relative mx-auto mt-10 max-w-5xl">
                <RailLine progress={scrollYProgress} />
                <div className="relative grid grid-cols-7">
                  {NODES.map((n, i) => (
                    <RailNode key={n.label} node={n} index={i} progress={scrollYProgress} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="section-y">
          <div className="container-page">
            <div className="text-center">
              <p className="eyebrow justify-center">
                <span className="h-1 w-1 rounded-full bg-flow-400" />
                Chapter 03 · The flow
              </p>
              <h2 className="heading-section mx-auto mt-4 max-w-3xl text-[30px] sm:text-[38px]">
                <span className="text-metal">Watch one order travel </span>
                <span className="text-flow">the whole way.</span>
              </h2>
            </div>
            <div className="mt-12 grid gap-3">
              {NODES.map((n, i) => {
                const Icon = n.icon;
                return (
                  <Reveal key={n.label} delay={i * 0.04}>
                    <div className="surface flex items-start gap-4 p-5">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-flow-500/30 bg-flow-500/10 text-flow-400">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-eyebrow text-muted-foreground">
                          Stage {String(i + 1).padStart(2, "0")} / 07
                        </p>
                        <h3 className="mt-0.5 font-display text-base font-bold tracking-tight">
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
          </div>
        </div>
      )}
    </section>
  );
}

/* Story block for one stage — fades in/out inside its scroll slice. */
function StageStory({
  node,
  index,
  progress
}: {
  node: (typeof NODES)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const slice = 1 / NODES.length;
  const mid = index * slice + slice / 2;
  const opacity = useTransform(
    progress,
    [mid - slice * 0.62, mid - slice * 0.2, mid + slice * 0.2, mid + slice * 0.62],
    [0, 1, 1, index === NODES.length - 1 ? 1 : 0]
  );
  const y = useTransform(
    progress,
    [mid - slice * 0.62, mid - slice * 0.2],
    [26, 0]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      <p className="font-display text-[64px] font-extrabold leading-none tracking-tightest lg:text-[84px]">
        <span className="text-flow">{String(index + 1).padStart(2, "0")}</span>
        <span className="text-muted-foreground/40"> / 07</span>
      </p>
      <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight">
        {node.label}
      </h3>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground lg:text-base">
        {node.detail}
      </p>
    </motion.div>
  );
}

function RailLine({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [0.04, 0.96], [0, 1]);
  return (
    <div className="absolute inset-x-8 top-[27px] h-px overflow-hidden bg-foreground/10">
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-left bg-gradient-to-r from-flow-400 via-flow-500 to-flow-600"
      />
    </div>
  );
}

function RailNode({
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
  const at = index * slice + slice * 0.4;
  const accent = useTransform(progress, [at - 0.04, at + 0.02], [0, 1]);
  const borderColor = useTransform(
    accent,
    [0, 1],
    ["hsla(230, 20%, 50%, 0.25)", "rgba(88,101,242,0.7)"]
  );
  const backgroundColor = useTransform(
    accent,
    [0, 1],
    ["rgba(88,101,242,0.0)", "rgba(88,101,242,0.14)"]
  );
  const boxShadow = useTransform(
    accent,
    [0, 1],
    ["0 0 0 0 rgba(88,101,242,0)", "0 0 26px -4px rgba(88,101,242,0.55)"]
  );
  const iconColor = useTransform(
    accent,
    [0, 1],
    ["hsla(230, 15%, 55%, 0.8)", "rgb(138,150,255)"]
  );

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        style={{ borderColor, backgroundColor, boxShadow }}
        className="relative z-10 grid h-14 w-14 place-items-center rounded-full border bg-background"
      >
        <motion.span style={{ color: iconColor }}>
          <Icon className="h-5 w-5" />
        </motion.span>
      </motion.div>
      <span className="text-xs font-semibold tracking-tight text-foreground/80">
        {node.label}
      </span>
    </div>
  );
}
