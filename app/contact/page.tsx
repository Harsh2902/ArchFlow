import type { Metadata } from "next";
import { Mail, Phone, MapPin, Calendar, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { site } from "@/lib/site";
import { founders } from "@/lib/founders";
import { JsonLd, faqPageSchema } from "@/components/seo/structured-data";
import { pageOg } from "@/lib/og";

export const metadata: Metadata = {
  title: "Contact ArchFlow — Talk to a founder",
  description:
    "Talk to ArchFlow directly. Email harsh@archflow.co.in, call +91 79880 19331, or use the form — responses within 24 hours, Mon-Fri. Based in Chandigarh, working across India.",
  alternates: { canonical: "/contact" },
  ...pageOg(
    "Contact ArchFlow",
    "Talk to ArchFlow. We respond within 24 hours, Mon to Fri. Based in Chandigarh, working with businesses across India.",
    "/contact"
  )
};

const FAQS = [
  {
    q: "How long does a typical build take?",
    a: "Most modules ship in 1–2 weeks. A full multi-module engagement — quotation, sales, production, dispatch, MIS — typically lands in 3–4 weeks from kickoff. We deploy in stages so you see value from week one."
  },
  {
    q: "Do you work with companies outside Chandigarh?",
    a: "Yes. We're based in Chandigarh and work across the tricity in person, and remotely with clients anywhere in India. For larger engagements we travel on-site for discovery and rollout."
  },
  {
    q: "What industries do you specialize in?",
    a: "Fabrication and manufacturing — fenestration, premium aluminum, pre-engineered buildings, modular interiors, glass, and project-based industrial businesses of every size. The common thread is BOM complexity, multi-department workflows, and Excel that has stopped scaling."
  },
  {
    q: "What happens after deployment — support?",
    a: "We stay on as platform partners, not just vendors. That means ongoing support, evolution as your business grows, and a defined support plan (response SLAs, change windows, monthly review). Most clients keep us on an annual platform agreement."
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, gladly. We sign mutual NDAs before any deep discovery and treat client data as confidential by default. We don't reference client work publicly without explicit written approval."
  },
  {
    q: "Can you integrate with our existing software (Tally, SAP, etc.)?",
    a: "Yes. We routinely integrate with Tally for accounting, with SAP and other ERPs where they're already in use, and with WhatsApp Business, payment gateways, and logistics platforms. We map integration scope during discovery."
  },
  {
    q: "What does pricing look like?",
    a: "Every project is scoped specifically — there isn't a one-size-fits-all number, because there isn't a one-size-fits-all build. Get in touch and we'll share a scoped estimate after the first conversation."
  }
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(FAQS.map((f) => ({ q: f.q, a: f.a })))} />
      <PageHero
        eyebrow="Get in touch"
        title="Let's talk about your platform."
        subtitle="Tell us a little about your business and what you're trying to solve. We respond within 24 hours, Mon–Fri."
      />

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="space-y-6">
            <div className="surface p-6 sm:p-8">
              <p className="eyebrow">Talk to a founder directly</p>
              <h2 className="mt-4 heading-display text-3xl sm:text-4xl">
                Skip the form. Reach us.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Two founders, no gatekeepers. Pick whoever fits — or message
                both.
              </p>

              <div className="mt-6 space-y-4">
                {founders.map((f) => (
                  <div
                    key={f.slug}
                    className="rounded-xl border border-foreground/5 bg-background/40 p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold tracking-tight">
                          {f.name}
                        </p>
                        <p className="text-xs uppercase tracking-eyebrow text-flow-400">
                          {f.role}
                        </p>
                      </div>
                      <span
                        aria-hidden
                        className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${f.accent} font-display text-base text-foreground/80`}
                      >
                        {f.initials}
                      </span>
                    </div>
                    <div className="mt-4 space-y-2 text-sm">
                      <a
                        href={`mailto:${f.email}`}
                        className="flex items-center gap-2 text-foreground/90 hover:text-flow-400 transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5 text-flow-400" />
                        <span>{f.email}</span>
                      </a>
                      <a
                        href={`tel:${f.phone.replace(/\s+/g, "")}`}
                        className="flex items-center gap-2 text-foreground/90 hover:text-flow-400 transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5 text-flow-400" />
                        <span>{f.phone}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-foreground/5 pt-6 text-sm">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-flow-400" />
                  <div>
                    <p className="text-[11px] uppercase tracking-eyebrow text-muted-foreground">
                      Based in
                    </p>
                    <p className="mt-0.5 text-foreground/90">{site.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TODO: Replace with Calendly inline embed when account is set up */}
            <div className="surface p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-flow-400" />
                <p className="eyebrow !mb-0">Book directly</p>
              </div>
              <h3 className="mt-3 text-lg font-semibold">
                Grab 30 minutes on the calendar
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We&apos;ll share three slots in the next 48 hours after you
                email us. Direct booking is coming soon.
              </p>
              <Button asChild variant="secondary" size="sm" className="mt-5 group">
                <a href={`mailto:${site.email}`}>
                  <Mail className="h-3.5 w-3.5" />
                  Email {site.email}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="section-y border-t border-foreground/5"
      >
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-5">Questions</p>
            <h2
              id="faq-heading"
              className="heading-section text-[28px] sm:text-[40px] lg:text-[52px]"
            >
              Things people usually ask first.
            </h2>
          </Reveal>

          <Reveal className="mx-auto mt-12 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </>
  );
}
