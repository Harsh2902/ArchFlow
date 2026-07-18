"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  Factory,
  Truck,
  Wrench,
  Bell,
  Search,
  TrendingUp,
  ArrowUpRight,
  Filter
} from "lucide-react";

/**
 * The premium Pranav dashboard mock. Built to be the visual proof
 * point for the Featured Case Study section.
 *
 * Features: 3D tilt on cursor, spotlight overlay, animated bar chart,
 * pipeline list with status pills, KPI tiles with sparklines.
 */

export function DashboardPranav() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [reduce ? 0 : 4, reduce ? 0 : -4]), {
    stiffness: 120,
    damping: 16
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [reduce ? 0 : -5, reduce ? 0 : 5]), {
    stiffness: 120,
    damping: 16
  });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
    ref.current.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    ref.current.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div className="relative" style={{ perspective: 1200 }}>
      {/* outer glow */}
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-gradient-to-br from-flow-500/20 via-blue-500/10 to-transparent blur-2xl" />

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="spotlight-surface relative overflow-hidden rounded-2xl border border-foreground/10 bg-[#07080d] bg-gradient-to-b from-foreground/[0.06] to-foreground/[0.02] shadow-2xl"
      >
        {/* top bar */}
        <div className="flex items-center justify-between border-b border-foreground/5 bg-background/40 px-4 py-2.5 backdrop-blur">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-flow-500/70" />
          </div>
          <div className="hidden items-center gap-2 rounded-md border border-foreground/5 bg-foreground/[0.03] px-2.5 py-1 text-[10px] text-muted-foreground sm:flex">
            <Search className="h-2.5 w-2.5" />
            archflow.app / pranav · dashboard
          </div>
          <div className="flex items-center gap-2">
            <Bell className="h-3 w-3 text-muted-foreground" />
            <div className="grid h-6 w-6 place-items-center rounded-full bg-flow-500/20 text-[10px] font-semibold text-flow-300">
              PD
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-0">
          {/* sidebar */}
          <aside className="col-span-3 border-r border-foreground/5 bg-background/30 p-3">
            <p className="px-2 py-1 text-[9px] uppercase tracking-eyebrow text-muted-foreground">
              Operations
            </p>
            <nav className="mt-1 space-y-0.5">
              {[
                { i: LayoutDashboard, l: "Dashboard", active: true },
                { i: ShoppingCart, l: "Orders" },
                { i: Factory, l: "Production" },
                { i: Truck, l: "Dispatch" },
                { i: Wrench, l: "Service" }
              ].map((n) => {
                const Icon = n.i;
                return (
                  <div
                    key={n.l}
                    className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] transition ${
                      n.active
                        ? "bg-flow-500/10 text-flow-300"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    {n.l}
                  </div>
                );
              })}
            </nav>

            <p className="mt-4 px-2 py-1 text-[9px] uppercase tracking-eyebrow text-muted-foreground">
              Regions
            </p>
            <nav className="mt-1 space-y-0.5">
              {/* Static counts — must be deterministic to avoid SSR/client
                  hydration mismatch (was Math.random → React error #418). */}
              {[
                ["Chandigarh", 92],
                ["Punjab", 74],
                ["Haryana", 61],
                ["Himachal", 38],
                ["Delhi NCR", 47]
              ].map(([r, count]) => (
                  <div
                    key={r as string}
                    className="flex items-center justify-between rounded-md px-2 py-1 text-[11px] text-foreground/70"
                  >
                    <span>{r}</span>
                    <span className="text-muted-foreground">
                      {count}
                    </span>
                  </div>
                )
              )}
            </nav>
          </aside>

          {/* main */}
          <main className="col-span-9 p-4">
            {/* header row */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-eyebrow text-muted-foreground">
                  Operations Dashboard
                </p>
                <p className="mt-0.5 font-display text-base">May 2026</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-md border border-foreground/5 bg-foreground/[0.03] px-2 py-1 text-[10px] text-muted-foreground">
                <Filter className="h-2.5 w-2.5" />
                Last 30 days
              </div>
            </div>

            {/* KPI tiles */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: "Active orders", value: 184, delta: "+18%", spark: [4, 5, 4, 6, 7, 9, 8, 11, 10, 13] },
                { label: "In production", value: 62, delta: "+7%", spark: [3, 4, 6, 5, 6, 6, 7, 8, 7, 9] },
                { label: "Dispatch today", value: 11, delta: "+24%", spark: [1, 2, 1, 3, 2, 4, 3, 5, 4, 6] }
              ].map((k, i) => (
                <KpiTile key={k.label} {...k} index={i} />
              ))}
            </div>

            {/* chart row */}
            <div className="mt-3 grid grid-cols-5 gap-2">
              <BarChart />
              <PipelineList />
            </div>
          </main>
        </div>

        {/* status strip */}
        <div className="flex items-center justify-between border-t border-foreground/5 bg-background/40 px-4 py-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-flow-400" />
            All systems operational · synced 2s ago
          </span>
          <span>v2.14.0</span>
        </div>
      </motion.div>
    </div>
  );
}

function KpiTile({
  label,
  value,
  delta,
  spark,
  index
}: {
  label: string;
  value: number;
  delta: string;
  spark: number[];
  index: number;
}) {
  const max = Math.max(...spark);
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 * index, duration: 0.5 }}
      className="rounded-lg border border-foreground/5 bg-foreground/[0.02] p-3"
    >
      <div className="flex items-start justify-between">
        <p className="text-[9px] uppercase tracking-eyebrow text-muted-foreground">
          {label}
        </p>
        <span className="flex items-center gap-0.5 rounded-full bg-flow-500/10 px-1.5 py-0.5 text-[9px] font-medium text-flow-300">
          <ArrowUpRight className="h-2 w-2" />
          {delta}
        </span>
      </div>
      <p className="mt-1.5 font-display text-2xl">{value}</p>

      {/* sparkline */}
      <svg viewBox="0 0 100 28" className="mt-1.5 h-6 w-full">
        <motion.polyline
          fill="none"
          stroke="rgb(88,101,242)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={spark
            .map((v, i) => `${(i / (spark.length - 1)) * 100},${28 - (v / max) * 24}`)
            .join(" ")}
          initial={false}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 + index * 0.1 }}
        />
        <motion.polygon
          fill="url(#spark-fill)"
          opacity="0.6"
          points={`0,28 ${spark
            .map((v, i) => `${(i / (spark.length - 1)) * 100},${28 - (v / max) * 24}`)
            .join(" ")} 100,28`}
          initial={false}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.4 + index * 0.1 }}
        />
        <defs>
          <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(88,101,242,0.4)" />
            <stop offset="100%" stopColor="rgba(88,101,242,0)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

function BarChart() {
  const data = [
    { label: "Mon", value: 62 },
    { label: "Tue", value: 78 },
    { label: "Wed", value: 54 },
    { label: "Thu", value: 92 },
    { label: "Fri", value: 84 },
    { label: "Sat", value: 41 }
  ];
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="col-span-3 rounded-lg border border-foreground/5 bg-foreground/[0.02] p-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-eyebrow text-muted-foreground">
          Orders by day
        </p>
        <div className="flex items-center gap-1 text-[9px] text-flow-300">
          <TrendingUp className="h-2.5 w-2.5" />
          Trending up
        </div>
      </div>
      <div className="mt-4 flex h-[100px] items-end gap-1.5">
        {data.map((d, i) => (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-1.5">
            <motion.div
              initial={false}
              whileInView={{ height: `${(d.value / max) * 100}%`, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="w-full rounded-t-sm bg-gradient-to-t from-flow-500/60 to-flow-400/90"
            />
            <span className="text-[8px] uppercase tracking-eyebrow text-muted-foreground">
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PipelineList() {
  const items = [
    { client: "Acme Inds.", state: "Production", color: "emerald" },
    { client: "Sky Mall", state: "Dispatch", color: "blue" },
    { client: "TVS Group", state: "Quoted", color: "amber" },
    { client: "Tata Realty", state: "Install", color: "purple" }
  ];
  return (
    <div className="col-span-2 rounded-lg border border-foreground/5 bg-foreground/[0.02] p-3">
      <p className="text-[10px] uppercase tracking-eyebrow text-muted-foreground">
        Live pipeline
      </p>
      <div className="mt-3 space-y-1.5">
        {items.map((it, i) => (
          <motion.div
            key={it.client}
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.06 }}
            className="flex items-center justify-between rounded-md border border-foreground/5 bg-foreground/[0.02] px-2 py-1.5"
          >
            <span className="text-[10px] text-foreground/85">{it.client}</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[8px] uppercase tracking-eyebrow ${
                it.color === "emerald"
                  ? "bg-flow-500/15 text-flow-300"
                  : it.color === "blue"
                    ? "bg-blue-500/15 text-blue-300"
                    : it.color === "amber"
                      ? "bg-amber-500/15 text-amber-300"
                      : "bg-purple-500/15 text-purple-300"
              }`}
            >
              {it.state}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
