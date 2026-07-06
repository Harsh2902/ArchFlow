"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue
} from "framer-motion";
import { Search, Hammer, Rocket, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Discovery",
    body: "We sit with your operators. We learn your departments, your workflow, your products, your reporting. We map the path from enquiry to fulfilment exactly as it works today — and where it breaks."
  },
  {
    n: "02",
    icon: Hammer,
    title: "Build",
    body: "We build a custom platform shaped around your operation. Not 200 generic modules you'll never use — the precise modules YOUR team needs, with the fields, workflows, and approvals you actually have."
  },
  {
    n: "03",
    icon: Rocket,
    title: "Deploy",
    body: "We roll out with your team on-site. Train your operators, your sales heads, your factory floor. Refine in real time. Most clients are running live within 3–4 weeks of kickoff."
  },
  {
    n: "04",
    icon: TrendingUp,
    title: "Evolve",
    body: "Your business doesn't freeze on launch day, and neither does ours. New product lines, new states, new departments — we keep building as you grow. Long-term partners, not vendors."
  }
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      aria-labelledby="process-heading"
      className="section-y border-t border-foreground/5"
    >
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-5">Process</p>
          <h2
            id="process-heading"
            className="heading-section text-[34px] sm:text-[44px] lg:text-[56px]"
          >
            <span className="text-metal">From whiteboard to live deployment </span>
            <span className="text-flow">in weeks, not years.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            A four-step build cadence, refined across deployments.
          </p>
        </Reveal>
      </div>

      <div ref={containerRef} className="relative mt-16 lg:mt-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="flex flex-col gap-24 lg:gap-[40vh]">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.n}>
                    <div className="max-w-xl">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="font-display text-3xl text-flow-400/80">
                          {step.n}
                        </span>
                        <span className="h-px flex-1 bg-foreground/10" />
                        <Icon className="h-5 w-5 text-flow-400" />
                      </div>
                      <h3 className="heading-section text-[28px] sm:text-[36px] lg:text-[44px]">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground lg:text-[17px]">
                        {step.body}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-32">
                <ProcessVisual progress={scrollYProgress} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessVisual({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/[0.04] to-transparent p-8">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-50" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="space-y-3">
          {STEPS.map((s, i) => (
            <StepRow key={s.n} step={s} index={i} progress={progress} />
          ))}
        </div>
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="h-px bg-foreground/10" />
          <p className="uppercase tracking-eyebrow">
            Typical engagement &middot; 3–4 weeks
          </p>
        </div>
      </div>
    </div>
  );
}

function StepRow({
  step,
  index,
  progress
}: {
  step: (typeof STEPS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const slice = 1 / STEPS.length;
  const start = index * slice;
  const end = (index + 1) * slice;
  const mid = (start + end) / 2;

  // Drive the active highlight via background + border (not text opacity).
  // Dimming text via opacity dropped the emerald number below the 4.5:1
  // WCAG contrast floor; keeping text at full opacity fixes that while
  // still conveying "active step" through the surface treatment.
  const backgroundColor = useTransform(
    progress,
    [start, mid, end],
    ["rgba(255,255,255,0.02)", "rgba(88,101,242,0.12)", "rgba(255,255,255,0.02)"]
  );
  const borderColor = useTransform(
    progress,
    [start, mid, end],
    ["rgba(255,255,255,0.08)", "rgba(88,101,242,0.45)", "rgba(255,255,255,0.08)"]
  );

  return (
    <motion.div
      style={{ backgroundColor, borderColor }}
      className="flex items-center gap-3 rounded-lg border px-4 py-3"
    >
      <span className="font-display text-base text-flow-400">{step.n}</span>
      <span className="text-sm font-medium text-foreground">{step.title}</span>
    </motion.div>
  );
}
