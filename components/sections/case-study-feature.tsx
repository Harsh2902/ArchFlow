"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,

  useScroll,
  useTransform,
  type MotionValue
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { StatCounter } from "@/components/motion/stat-counter";
import { DashboardPranav } from "@/components/showcase/dashboard-pranav";

/**
 * Chapter 05 — the proof. A pinned scene: the Pranav deployment story
 * plays out in four milestones on the left while the live dashboard
 * holds on the right (framed force-dark, like a product screenshot in
 * both themes).
 *
 * Mobile / reduced-motion: static column.
 */

const MILESTONES = [
  {
    when: "Week 1",
    title: "Discovery on the floor",
    body: "We started at Pranav Doors & Windows — design desk, dispatch yard, site visits. Mapping how a five-state fenestration business actually runs."
  },
  {
    when: "Weeks 2–3",
    title: "The quoting engine goes live",
    body: "Versioned, BOM-aware quotations with approval flows. The revenue engine moved onto ArchFlow first — within a fortnight."
  },
  {
    when: "Weeks 3–4",
    title: "Department by department",
    body: "Sales, production, dispatch, installation, service — each module shipped, trained on-site, refined in real time. Never a big-bang deploy."
  },
  {
    when: "Today",
    title: "The entire operation, flowing",
    body: "Every department works on one ArchFlow instance, every day — and the platform keeps evolving as Pranav grows.",
    stats: true
  }
];

const STATS = [
  { value: 10, suffix: "+", label: "Departments" },
  { value: 5, suffix: "+", label: "States" },
  { value: 100, suffix: "%", label: "Traceability" }
];

export function CaseStudyFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // CSS decides the layout (never a JS branch): phones get the static
  // proof block in the server HTML — instant paint, no hydration flip.

  return (
    <section
      id="story-proof"
      aria-labelledby="case-heading"
      /* NOTE: no overflow-hidden here — an overflow-hidden ancestor breaks
         position:sticky for the pinned scene inside (content scrolls away
         and the scroll runway renders blank). Clipping lives on the sticky
         child instead. */
      className="relative border-t border-foreground/[0.06]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 mesh-bg opacity-50" />

      <div
        ref={ref}
        className="relative hidden h-[340vh] lg:block lg:motion-reduce:hidden"
      >
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
              <div>
                <p className="eyebrow">
                  <span className="h-1 w-1 rounded-full bg-flow-400" />
                  Chapter 05 · The proof
                </p>
                <h2
                  id="case-heading"
                  className="heading-section mt-4 text-[28px] sm:text-[36px] lg:text-[42px]"
                >
                  <span className="text-metal">One deep deployment. </span>
                  <span className="text-flow">Running daily.</span>
                </h2>

                {/* Milestone crossfade */}
                <div className="relative mt-8 h-[240px]">
                  {MILESTONES.map((m, i) => (
                    <Milestone key={m.title} m={m} index={i} progress={scrollYProgress} />
                  ))}
                </div>

                <Link
                  href="/work/pranav-doors"
                  className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-flow-400 transition-colors hover:text-flow-300"
                >
                  <span className="link-underline">Read the full case study</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Product shot — force-dark frame so it reads as a screenshot
                  in both themes */}
              <DashboardFrame progress={scrollYProgress} />
            </div>
          </div>
      </div>

      {/* Static proof — mobile always; lg only under reduced motion */}
      <div className="section-y lg:hidden lg:motion-reduce:block">
          <div className="container-page">
            <p className="eyebrow">
              <span className="h-1 w-1 rounded-full bg-flow-400" />
              Chapter 05 · The proof
            </p>
            <h2 className="heading-section mt-4 max-w-2xl text-[28px] sm:text-[36px]">
              <span className="text-metal">
                Pranav Doors &amp; Windows runs its multi-state operation on{" "}
              </span>
              <span className="text-flow">ArchFlow.</span>
            </h2>
            <div className="dark mt-10 text-foreground">
              <DashboardPranav />
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-3xl font-extrabold text-flow-500">
                    <StatCounter to={s.value} suffix={s.suffix} />
                  </dd>
                  <dt className="mt-1.5 text-[10px] uppercase tracking-eyebrow text-muted-foreground">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
            <Link
              href="/work/pranav-doors"
              className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-flow-400"
            >
              Read the full case study
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
      </div>
    </section>
  );
}

function Milestone({
  m,
  index,
  progress
}: {
  m: (typeof MILESTONES)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const slice = 1 / MILESTONES.length;
  const mid = index * slice + slice / 2;
  const opacity = useTransform(
    progress,
    [mid - slice * 0.6, mid - slice * 0.18, mid + slice * 0.18, mid + slice * 0.6],
    [0, 1, 1, index === MILESTONES.length - 1 ? 1 : 0]
  );
  const y = useTransform(progress, [mid - slice * 0.6, mid - slice * 0.18], [24, 0]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0">
      <p className="font-display text-xs font-bold uppercase tracking-eyebrow text-flow-400">
        {m.when}
      </p>
      <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight">
        {m.title}
      </h3>
      <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
        {m.body}
      </p>
      {m.stats && (
        <dl className="mt-6 grid max-w-sm grid-cols-3 gap-5">
          {STATS.map((s) => (
            <div key={s.label}>
              <dd className="font-display text-2xl font-extrabold text-flow-500 lg:text-3xl">
                <StatCounter to={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-1 text-[9px] uppercase tracking-eyebrow text-muted-foreground">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      )}
    </motion.div>
  );
}

function DashboardFrame({ progress }: { progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [26, -26]);
  const rotate = useTransform(progress, [0, 1], [1.2, -1.2]);
  return (
    <motion.div style={{ y, rotate }} className="dark relative text-foreground">
      <DashboardPranav />
    </motion.div>
  );
}
