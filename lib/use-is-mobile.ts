"use client";

import { useEffect, useState } from "react";

/**
 * True on small or touch viewports — used to switch off GPU-heavy
 * ambient effects (large blurred blobs, mix-blend layers, scroll
 * parallax) that crash memory-constrained mobile browsers.
 *
 * Returns false on the server and on first client paint so SSR markup
 * matches hydration; flips after mount if the device qualifies.
 */
export function useIsMobile(
  query = "(max-width: 767px), (pointer: coarse)"
) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(query);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, [query]);

  return isMobile;
}
