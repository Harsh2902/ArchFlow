import Image from "next/image";

const CAPABILITIES = [
  "Quotation Engine",
  "Sales CRM",
  "Production Planning",
  "Dispatch Coordination",
  "Installation Tracking",
  "Service & AMC",
  "Leadership MIS",
  "Multi-state Operations",
  "BOM & Pricing Rules",
  "Approval Workflows"
];

/**
 * Infinite capabilities strip under the hero — the brand mark itself
 * acts as the separator glyph. Pauses on hover; pure CSS animation.
 */
export function CapabilitiesMarquee() {
  const items = [...CAPABILITIES, ...CAPABILITIES];
  return (
    <section
      aria-label="Platform capabilities"
      className="relative border-y border-white/[0.06] bg-background/60"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="marquee-wrapper overflow-hidden py-5">
        <div className="marquee-track items-center gap-8">
          {items.map((c, i) => (
            <div key={`${c}-${i}`} className="flex shrink-0 items-center gap-8">
              <span className="text-sm font-medium tracking-tight text-foreground/60">
                {c}
              </span>
              <Image
                src="/brand/logo-mark-512.png"
                alt=""
                width={16}
                height={16}
                className="h-4 w-4 opacity-60"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
