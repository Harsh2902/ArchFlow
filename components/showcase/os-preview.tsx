"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Circle
} from "lucide-react";
import { useIsMobile } from "@/lib/use-is-mobile";

/**
 * Live "ArchFlow OS" preview that sits in the hero. A mini dashboard
 * with a workflow timeline that progresses on a slow loop.
 *
 * The point of this widget: visitors see the product moving the
 * moment they land.
 */

type Stage = "enquiry" | "quote" | "order" | "production" | "dispatch" | "install" | "service";

const STAGES: { key: Stage; label: string }[] = [
  { key: "enquiry", label: "Enquiry received" },
  { key: "quote", label: "Quotation sent" },
  { key: "order", label: "Order confirmed" },
  { key: "production", label: "In production" },
  { key: "dispatch", label: "Dispatched" },
  { key: "install", label: "Installed on-site" },
  { key: "service", label: "Service & AMC" }
];

export function OSPreview() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const [active, setActive] = useState(2);

  useEffect(() => {
    // Freeze the looping timeline on mobile / reduced-motion — a forever
    // setInterval re-rendering 7 rows is a long main-thread task and a
    // non-composited animation on phones. Static state still looks complete.
    if (reduce || isMobile) return;
    const id = setInterval(() => {
      setActive((v) => (v + 1) % STAGES.length);
    }, 2400);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative">
      {/* glow */}
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-gradient-to-br from-emerald-500/20 via-blue-500/10 to-transparent blur-2xl" />

      {/* device frame */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-2xl">
        {/* tab bar */}
        <div className="flex items-center justify-between border-b border-white/5 bg-background/40 px-4 py-2.5 backdrop-blur">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <div className="hidden items-center gap-1.5 rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 text-[10px] text-muted-foreground sm:flex">
            <Sparkles className="h-2.5 w-2.5 text-emerald-400" />
            archflow.app / pranav · ORD-2407-184
          </div>
          <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] uppercase tracking-eyebrow text-emerald-300">
            Live
          </div>
        </div>

        {/* body */}
        <div className="p-5">
          {/* order header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-eyebrow text-muted-foreground">
                Order
              </p>
              <p className="mt-1 font-display text-xl">
                Acme Industries · 14 windows
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Site: Mohali, Punjab &middot; PO-2407-184
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-eyebrow text-muted-foreground">
                Value
              </p>
              <p className="mt-1 font-display text-lg text-foreground">
                ₹8.4L
              </p>
            </div>
          </div>

          {/* timeline */}
          <div className="mt-6 space-y-2">
            {STAGES.map((s, i) => {
              const status =
                i < active ? "done" : i === active ? "active" : "pending";
              return (
                <motion.div
                  key={s.key}
                  initial={false}
                  animate={{
                    backgroundColor:
                      status === "active"
                        ? "rgba(16,185,129,0.08)"
                        : "rgba(255,255,255,0.0)",
                    borderColor:
                      status === "active"
                        ? "rgba(16,185,129,0.3)"
                        : "rgba(255,255,255,0.06)"
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 rounded-lg border px-3 py-2"
                >
                  <span className="shrink-0">
                    {status === "done" && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    )}
                    {status === "active" && (
                      <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                    )}
                    {status === "pending" && (
                      <Circle className="h-4 w-4 text-muted-foreground/40" />
                    )}
                  </span>
                  <span
                    className={`text-xs ${
                      status === "pending"
                        ? "text-muted-foreground"
                        : status === "active"
                          ? "text-foreground"
                          : "text-foreground/90"
                    }`}
                  >
                    {s.label}
                  </span>
                  {status === "active" && (
                    <motion.span
                      key={`label-${active}`}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="ml-auto text-[10px] uppercase tracking-eyebrow text-emerald-300"
                    >
                      Now
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* footer chips */}
          <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Synced 2s ago
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-300">
              View order
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>

      {/* floating chip — KPIs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute -bottom-6 -left-6 hidden rounded-xl border border-white/10 bg-background/90 px-4 py-3 shadow-2xl backdrop-blur md:block"
      >
        <p className="text-[10px] uppercase tracking-eyebrow text-muted-foreground">
          Dispatch today
        </p>
        <p className="mt-1 font-display text-2xl">11 orders</p>
        <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400">
          <ArrowRight className="h-2.5 w-2.5 -rotate-45" />
          +24% vs avg
        </div>
      </motion.div>

      {/* floating chip — pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="absolute -right-6 -top-4 hidden rounded-xl border border-white/10 bg-background/90 px-4 py-3 shadow-2xl backdrop-blur md:block"
      >
        <p className="text-[10px] uppercase tracking-eyebrow text-muted-foreground">
          Open pipeline
        </p>
        <p className="mt-1 font-display text-2xl">₹3.6Cr</p>
      </motion.div>
    </div>
  );
}
