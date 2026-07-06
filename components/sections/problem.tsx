"use client";

import { useRef } from "react";
import {
  motion,

  useScroll,
  useTransform,
  type MotionValue
} from "framer-motion";
import { FileSpreadsheet, MessagesSquare, EyeOff, ArrowDown } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

/**
 * Chapter 02 — the problem, told as a pinned card deck. The screen
 * holds while three "acts" of operational chaos slide over each other;
 * the exit line hands the story to chapter 03.
 *
 * Mobile / reduced-motion: plain stacked cards (no pinning).
 */

const ACTS = [
  {
    icon: FileSpreadsheet,
    act: "Act I",
    title: "The Excel era",
    body: "Quotes live in fourteen spreadsheet versions and three inboxes. Nobody can say which number the customer actually signed. Past 50 employees, every week adds another sheet — and another way to lose an order.",
    accent: "from-red-500/15 to-transparent",
    ring: "border-red-400/25"
  },
  {
    icon: MessagesSquare,
    act: "Act II",
    title: "The WhatsApp workaround",
    body: "Handoffs become forwarded messages. Production status lives in one supervisor's head and a 400-message group chat. When something slips, there is no trail — only memory and blame.",
    accent: "from-amber-500/15 to-transparent",
    ring: "border-amber-400/25"
  },
  {
    icon: EyeOff,
    act: "Act III",
    title: "Leadership flies blind",
    body: "The directors get numbers a week late, hand-compiled from every branch. Generic CRMs don't speak BOM or dispatch. Enterprise ERPs want ₹50L and 18 months. The business keeps growing anyway — on hope.",
    accent: "from-flow-500/15 to-transparent",
    ring: "border-flow-400/30"
  }
];

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Both layouts ship in the HTML and CSS picks one — never a JS branch.
  // Phones paint the stacked story on first byte (no hydration wait, no
  // re-layout flip); lg+ gets the pinned deck. motion-reduce falls back
  // to the stacked layout on any screen.
  return (
    <section id="story-problem" aria-labelledby="problem-heading">
      {/* ── Pinned deck (lg+, motion allowed) ── */}
      <div
        ref={ref}
        className="relative hidden h-[340vh] lg:block lg:motion-reduce:hidden"
      >
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
          <Header />
          {/* overflow-hidden: waiting cards stay hidden below the deck
              window until their slice, then slide up over the previous */}
          <div className="relative mt-10 h-[380px] w-full max-w-2xl overflow-hidden rounded-3xl">
            {ACTS.map((a, i) => (
              <DeckCard key={a.title} act={a} index={i} progress={scrollYProgress} />
            ))}
          </div>
          <ExitLine progress={scrollYProgress} />
        </div>
      </div>

      {/* ── Stacked story (mobile always; lg only under reduced motion) ── */}
      <div className="section-y lg:hidden lg:motion-reduce:block">
        <div className="container-page">
          <Header />
          <div className="mt-10 space-y-4">
            {ACTS.map((a) => (
              <Reveal key={a.title}>
                <StaticCard act={a} />
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center text-sm font-semibold text-flow-400">
            Then we rebuilt the whole thing. ↓
          </p>
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="container-page text-center">
      <p className="eyebrow justify-center">
        <span className="h-1 w-1 rounded-full bg-flow-400" />
        Chapter 02 · The problem
      </p>
      <h2
        id="problem-heading"
        className="heading-section mx-auto mt-4 max-w-3xl text-[30px] sm:text-[40px] lg:text-[50px]"
      >
        <span className="text-metal">Every growing operation hits </span>
        <span className="text-flow">the same wall.</span>
      </h2>
    </div>
  );
}

function DeckCard({
  act,
  index,
  progress
}: {
  act: (typeof ACTS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  // Each card owns a slice of the pinned scroll. It slides up over the
  // previous card; the previous shrinks and dims underneath.
  const start = index * 0.3;
  const y = useTransform(progress, [start, start + 0.22], ["112%", "0%"]);
  const scale = useTransform(
    progress,
    [start + 0.3, start + 0.52],
    [1, index < ACTS.length - 1 ? 0.93 : 1]
  );
  const dim = useTransform(
    progress,
    [start + 0.3, start + 0.52],
    [1, index < ACTS.length - 1 ? 0.45 : 1]
  );
  const Icon = act.icon;

  return (
    <motion.div
      style={{
        y: index === 0 ? 0 : y,
        scale,
        opacity: dim,
        zIndex: index
      }}
      className={`absolute inset-0 overflow-hidden rounded-3xl border ${act.ring} bg-card p-8 shadow-2xl lg:p-10`}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${act.accent}`} />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/[0.04]">
            <Icon className="h-5 w-5 text-foreground/80" />
          </span>
          <span className="font-display text-sm font-bold uppercase tracking-eyebrow text-muted-foreground">
            {act.act}
          </span>
        </div>
        <h3 className="mt-7 font-display text-2xl font-extrabold tracking-tight lg:text-3xl">
          {act.title}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
          {act.body}
        </p>
      </div>
    </motion.div>
  );
}

function ExitLine({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.88, 0.98], [0, 1]);
  const y = useTransform(progress, [0.88, 0.98], [12, 0]);
  return (
    <motion.p
      style={{ opacity, y }}
      className="mt-10 flex items-center gap-2 text-sm font-semibold text-flow-400"
    >
      Then we rebuilt the whole thing
      <ArrowDown className="h-3.5 w-3.5" />
    </motion.p>
  );
}

function StaticCard({ act }: { act: (typeof ACTS)[number] }) {
  const Icon = act.icon;
  return (
    <div className={`relative overflow-hidden rounded-2xl border ${act.ring} bg-card p-6`}>
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${act.accent}`} />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
            <Icon className="h-4 w-4 text-foreground/80" />
          </span>
          <span className="font-display text-xs font-bold uppercase tracking-eyebrow text-muted-foreground">
            {act.act}
          </span>
        </div>
        <h3 className="mt-5 font-display text-xl font-extrabold tracking-tight">
          {act.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {act.body}
        </p>
      </div>
    </div>
  );
}
