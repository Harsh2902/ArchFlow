import { Quote } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function Testimonial() {
  return (
    <section
      aria-labelledby="testimonial-heading"
      className="section-y border-t border-white/5"
    >
      <div className="container-page">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Quote
            className="mx-auto h-8 w-8 text-emerald-400/60"
            aria-hidden
          />
          {/* PLACEHOLDER: replace with real client testimonial */}
          <h2
            id="testimonial-heading"
            className="heading-display mt-6 text-[28px] leading-[1.2] sm:text-[36px] lg:text-[48px]"
          >
            &ldquo;ArchFlow rebuilt how we run our business. We&apos;ve stopped
            losing quotes, stopped losing time, and finally have real-time
            visibility across all our state offices.&rdquo;
          </h2>
          <p className="mt-8 text-sm uppercase tracking-eyebrow text-muted-foreground">
            — Pranav Doors &amp; Windows team
          </p>
        </Reveal>
      </div>
    </section>
  );
}
