import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  DoorOpen,
  Factory,
  Building2,
  Ruler,
  Layers,
  Database,
  Users
} from "lucide-react";
import { pageOg } from "@/lib/og";
import { site } from "@/lib/site";
import { solutions } from "@/lib/solutions";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { JsonLd, breadcrumbsSchema } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "Solutions — Manufacturing software by industry",
  description:
    "Custom MIS, ERP-alternative, and CRM platforms for India's manufacturers — door & window, fabrication, PEB, modular kitchens, glass processing, and more. Built for your vertical, live in weeks.",
  alternates: { canonical: "/solutions" },
  ...pageOg(
    "Solutions — Manufacturing software by industry | ArchFlow",
    "Custom workflow platforms built for how your industry actually runs — fenestration, fabrication, PEB, interiors, glass.",
    "/solutions"
  )
};

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "door-window-manufacturing-software": DoorOpen,
  "fabrication-management-software": Factory,
  "peb-manufacturing-software": Building2,
  "modular-kitchen-manufacturing-software": Ruler,
  "glass-processing-software": Layers,
  "custom-erp-development": Database,
  "crm-for-manufacturers": Users
};

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbsSchema([
          { name: "Home", url: site.url },
          { name: "Solutions", url: `${site.url}/solutions` }
        ])}
      />

      <PageHero
        eyebrow="Solutions"
        title="Built for how your industry actually runs."
        highlight="industry"
        subtitle="Generic software makes your business bend around it. We build the other way: one platform shaped around your vertical's real order lifecycle — quotation to installation — live in weeks, not financial years."
      />

      <section className="section-y">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s, i) => {
              const Icon = ICONS[s.slug] ?? Factory;
              return (
                <Reveal key={s.slug} delay={(i % 3) * 0.05}>
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-flow-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <SpotlightCard className="group flex h-full flex-col p-6 lg:p-7">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-flow-500/25 bg-gradient-to-br from-flow-500/15 to-transparent text-flow-600 dark:text-flow-400">
                          <Icon className="h-5 w-5" />
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-flow-600 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 dark:text-flow-400" />
                      </div>
                      <h2 className="mt-5 font-display text-lg font-bold tracking-tight">
                        {s.cardTitle}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {s.cardBlurb}
                      </p>
                    </SpotlightCard>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-foreground/[0.08] pt-10 lg:flex-row lg:items-center">
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Don&apos;t see your industry? The platform spine — enquiry,
                quotation, production, dispatch, installation, service — is
                custom-built every time. If your business runs on orders and
                Excel, we can build for it.
              </p>
              <Button asChild size="lg" className="group shrink-0">
                <Link href="/contact">
                  Talk to a founder
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
