import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative section-y overflow-hidden border-t border-white/5"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2
            id="final-cta-heading"
            className="heading-display text-[36px] sm:text-[52px] lg:text-[72px]"
          >
            Is your business ready for software that fits it?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Let&apos;s talk. We&apos;ll show you what we built for Pranav and
            walk through what could work for yours.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">Book a 30-min call</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/work">See our work</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
