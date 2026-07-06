"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

const QUOTE =
  "ArchFlow rebuilt how we run our business. We've stopped losing quotes, stopped losing time, and finally have real-time visibility across all our state offices.";

export function Testimonial() {
  const reduce = useReducedMotion();
  const words = QUOTE.split(" ");

  return (
    <section
      aria-labelledby="testimonial-heading"
      className="relative isolate overflow-hidden section-y border-t border-white/5"
    >
      {/* Massive decorative quote mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[420px] leading-none text-white/[0.03] sm:text-[560px] lg:text-[720px]"
      >
        &ldquo;
      </div>

      <div className="container-page relative">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="eyebrow mb-6">From the floor</p>
          {/* PLACEHOLDER: replace with real client testimonial */}
          <h2
            id="testimonial-heading"
            className="heading-display text-[28px] leading-[1.18] sm:text-[40px] lg:text-[60px]"
          >
            {words.map((w, i) => (
              <motion.span
                key={`${w}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.45,
                  delay: reduce ? 0 : i * 0.02,
                  ease: "easeOut"
                }}
                className="mr-[0.2em] inline-block"
              >
                {w === "ArchFlow" ||
                w === "real-time" ||
                w === "visibility" ||
                w === "rebuilt" ? (
                  <em className="not-italic text-flow-400">{w}</em>
                ) : (
                  w
                )}
              </motion.span>
            ))}
          </h2>
          <div className="mt-10 flex items-center justify-center gap-3 text-sm">
            <span
              aria-hidden
              className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-flow-400/30 to-flow-600/10 font-display text-base text-foreground/70"
            >
              PD
            </span>
            <div className="text-left">
              <p className="font-medium tracking-tight">
                Pranav Doors &amp; Windows
              </p>
              <p className="text-xs uppercase tracking-eyebrow text-muted-foreground">
                Leadership team · Chandigarh
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
