"use client";

import { useEffect, useState } from "react";

/**
 * A tiny live IST clock badge for the footer.
 * Renders only after mount to avoid SSR/locale mismatches.
 */
export function IstClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function tick() {
      const now = new Date();
      const s = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      setTime(s);
    }
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-eyebrow text-muted-foreground">
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flow-400 opacity-50" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-flow-400" />
      </span>
      Mohali{time ? ` · ${time} IST` : ""}
    </span>
  );
}
