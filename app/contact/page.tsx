import type { Metadata } from "next";
import { Mail, Phone, MapPin, Linkedin, Calendar } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to ArchFlow. We respond within 24 hours, Monday to Friday. Based in Chandigarh, working with businesses across India."
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
              <p className="eyebrow">Direct</p>
              <h2 className="mt-4 heading-display text-3xl sm:text-4xl">
                Prefer email or a call?
              </h2>

              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-emerald-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-eyebrow text-muted-foreground">
                      Email
                    </p>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-1 block text-foreground hover:text-emerald-400 transition-colors"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-emerald-400">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-eyebrow text-muted-foreground">
                      Phone
                    </p>
                    <p className="mt-1 text-foreground">{site.phone}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-emerald-400">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-eyebrow text-muted-foreground">
                      Based in
                    </p>
                    <p className="mt-1 text-foreground">{site.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-emerald-400">
                    <Linkedin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-eyebrow text-muted-foreground">
                      LinkedIn
                    </p>
                    <a
                      href={site.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-foreground hover:text-emerald-400 transition-colors"
                    >
                      /company/archflow
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="surface p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-emerald-400" />
                <p className="eyebrow !mb-0">Book directly</p>
              </div>
              <h3 className="mt-3 text-lg font-semibold">
                Grab 30 minutes on the calendar
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We&apos;ll walk through your operation and show you what we
                built for Pranav Doors.
              </p>
              {/* TODO: paste Calendly embed */}
              <div
                aria-label="Calendly placeholder"
                className="mt-4 grid h-32 place-items-center rounded-lg border border-dashed border-white/10 bg-white/[0.02] text-xs text-muted-foreground"
              >
                Calendly embed lands here
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="section-y border-t border-white/5"
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
