import type { Metadata } from "next";
import Link from "next/link";
import {
  FileSpreadsheet,
  Split,
  History,
  GitFork,
  Milestone,
  LayoutDashboard,
  FileStack,
  Zap,
  Handshake,
  BarChart3,
  Factory,
  ShieldCheck,
  Check,
  ArrowRight
} from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { StatCounter } from "@/components/motion/stat-counter";
import { Button } from "@/components/ui/button";
import {
  JsonLd,
  articleSchema,
  breadcrumbsSchema
} from "@/components/seo/structured-data";
import { site } from "@/lib/site";
import { pageOg } from "@/lib/og";

export const metadata: Metadata = {
  title:
    "Pranav Doors & Windows — End-to-End Manufacturing Workflow Platform",
  description:
    "How ArchFlow digitized a premium doors & windows manufacturer end to end — from the first sales enquiry to installation handover — across 10 departments and 100+ employees.",
  alternates: { canonical: "/work/pranav-doors" },
  ...pageOg(
    "Pranav Doors & Windows case study | ArchFlow",
    "How ArchFlow digitized a premium doors & windows manufacturer end to end — from the first sales enquiry to installation handover.",
    "/work/pranav-doors"
  )
};

/* ── Real numbers, from the deployment ─────────────────────────────── */
const STATS = [
  { value: 10, suffix: "", label: "Departments on one platform" },
  { value: 100, suffix: "+", label: "Employees working live" },
  { value: 3, suffix: "", label: "Product series tracked in parallel" },
  { value: 20, suffix: "+", label: "Lifecycle stages per order" }
];

/* ── The three pains before the platform ───────────────────────────── */
const PAINS = [
  {
    icon: FileSpreadsheet,
    title: "No single source of truth",
    body: "Enquiries in notebooks, quotations in Excel, approvals over calls, factory status on whiteboards. Every department kept its own records — and none of them agreed."
  },
  {
    icon: Split,
    title: "Product lines tangled together",
    body: "A home ordering aluminium and uPVC together was the worst case: a delay in one product line hid the progress of the others. Nobody had one honest picture of a project."
  },
  {
    icon: History,
    title: "No accountability trail",
    body: "Who did what, when, and how long it took was unrecoverable. When something slipped, there was no record to learn from — only memory."
  }
];

/* ── The five ideas the platform is built on ───────────────────────── */
const PILLARS = [
  {
    icon: GitFork,
    title: "Every product line moves on its own",
    body: "Each project tracks aluminium, uPVC, and premium series as separate parallel pipelines. One series can be in production while another is still in quotation — each with its own progress bar, documents, and approvals."
  },
  {
    icon: Milestone,
    title: "Work moves through gates",
    body: "An order can only move forward through defined checkpoints — quotation, client approval, accounts verification, drawings, sales order, payments, materials, finishing, production, dispatch, installation, closure. Every gate is recorded with who and when."
  },
  {
    icon: LayoutDashboard,
    title: "A screen for every role",
    body: "Twelve tailored dashboards — each department sees exactly its own queue and nothing else, including five focused views for the production floor itself."
  },
  {
    icon: FileStack,
    title: "Everything is a document",
    body: "Drawings, quotations, signed orders, material lists, challans, gate passes, handover papers — uploaded once, named consistently, and visible to every stage that needs them."
  },
  {
    icon: Zap,
    title: "Live by default",
    body: "Every screen in the company updates in real time. When we ship an improvement, every open screen upgrades itself within seconds — nobody works on a stale view."
  }
];

/* ── The order journey — the actual lifecycle ──────────────────────── */
const JOURNEY = [
  { title: "Enquiry", body: "Sales logs the client, source, architect, and chosen product series into their own pipeline." },
  { title: "Presentation & site visits", body: "Visits are checked in at the client's site with location and photos; every remark is saved against the enquiry." },
  { title: "Project creation", body: "One click turns an enquiry into a project — managers can watch its progress from day one." },
  { title: "Drawings & estimation", body: "Supporting documents go to the estimation team, series by series." },
  { title: "Quotation", body: "Per-series quotations with a full cost breakup — material, glass, installation, freight, packaging — with every revision kept." },
  { title: "Negotiation & verification", body: "Sales records the final negotiated value and discount; accounts verifies the quote, signed documents, and token payment." },
  { title: "Position drawings", body: "Engineering assigns site engineers and uploads site measurements — unlocking the sales order." },
  { title: "Sales order", body: "Versioned per series, with finish planning and the client-signed order captured." },
  { title: "Payment milestone", body: "Verified once at project level — unlocking materials and production paperwork in parallel." },
  { title: "Materials & procurement", body: "Every material — profile, glass, hardware, mesh — tracked per series and per batch, from requirement list to signed purchase order to receipt." },
  { title: "Surface finishing", body: "Powder coating and anodising per batch, with quality checks and mandatory challans before release to production." },
  { title: "Production floor", body: "Gate passes for every batch, production start to finish, quality approval, and dispatch with documents." },
  { title: "Site installation", body: "Unloading, five tracked installation milestones, and the final handover with a signed document." },
  { title: "Closure", body: "Final payment verified and each series closed by accounts — the project completes only when every series is done." }
];

/* ── Feature highlights, grouped ───────────────────────────────────── */
const FEATURE_GROUPS = [
  {
    icon: Handshake,
    group: "Sales & pipeline",
    items: [
      {
        title: "Enquiry-first sales flow",
        body: "Every salesperson runs their own enquiry pipeline — presentation remarks, linked site visits, convert to project, or mark lost with a reason. Nothing is ever deleted; everything stays reportable."
      },
      {
        title: "Site visits with location & photos",
        body: "Check-in and check-out at client sites, linked to enquiries and projects, exportable to Excel with photo links."
      },
      {
        title: "Architect relationship insights",
        body: "Every architect's enquiries, visits, win rate, and pipeline in one place — for sales, marketing, and management."
      }
    ]
  },
  {
    icon: BarChart3,
    group: "Money & reporting",
    items: [
      {
        title: "Active pipeline report",
        body: "For every quoted project: the list value, the negotiated value, and the discount floor — with the differences between all three. Filter by salesperson, stage, or month; export to Excel with full revision history."
      },
      {
        title: "Sales targets & incentives",
        body: "Monthly targets per salesperson, achievement tracked from verified values, and incentives computed automatically."
      },
      {
        title: "Turnaround tracking",
        body: "Every task has a time target. When something runs late, the reason is captured at that moment — so delays are visible and explainable, not forgotten."
      }
    ]
  },
  {
    icon: Factory,
    group: "Factory & operations",
    items: [
      {
        title: "Five production-floor roles",
        body: "Profile pass, hardware pass, production, quality, and dispatch — each a focused screen over its own work units, with mandatory gate-pass documents."
      },
      {
        title: "Surface-finish management",
        body: "Powder coating and anodising run as their own batches, with quality loops and challans required before anything returns to production."
      },
      {
        title: "Material tracking for procurement",
        body: "Every material tracked per series and per batch — requirement lists, signed purchase orders, vendor approvals, stock-versus-purchase splits, and receipt confirmation."
      }
    ]
  },
  {
    icon: ShieldCheck,
    group: "Trust & visibility",
    items: [
      {
        title: "Progress bars everywhere",
        body: "An 11-stage tracker per product line on every project, and a 6-stage tracker on every enquiry — anyone can see exactly where things stand."
      },
      {
        title: "A permanent history of everything",
        body: "Every action records who did it and when. Nothing is overwritten — versions accumulate, so the history is always truthful."
      },
      {
        title: "A tracker for the customer too",
        body: "Clients can follow their own order's status on a phone-verified page — no login, no phone calls to the office."
      }
    ]
  }
];

/* ── Deployed to live in four weeks ────────────────────────────────── */
const ROLLOUT = [
  {
    when: "Week 1",
    title: "Discovery on the floor",
    detail:
      "Days with the operators — design desk, dispatch yard, site visits. We mapped the real workflow before writing a line of code."
  },
  {
    when: "Week 2",
    title: "Quotation module live",
    detail:
      "The revenue engine moved first: per-series quotations with full cost breakups and versioned revisions — in production within days."
  },
  {
    when: "Week 3",
    title: "Sales pipeline live",
    detail:
      "Enquiries, site visits, negotiation, and accounts verification went live across the sales team."
  },
  {
    when: "Week 4",
    title: "Production, dispatch & installation live",
    detail:
      "Gate passes on the shop floor, surface finishing, dispatch, and site installation closed the loop — full deployment inside a month."
  },
  {
    when: "Ongoing",
    title: "Evolving with the business",
    detail:
      "Reports, targets, the customer tracker, and refinements from the floor — the platform keeps growing as Pranav grows."
  }
];

/* ── What changed — honest, qualitative ────────────────────────────── */
const OUTCOMES = [
  "One live source of truth across all 10 departments — no more parallel registers.",
  "Multi-series projects finally move independently; a stalled series no longer hides the others.",
  "Management sees the full pipeline — every enquiry, every value, every stage — in real time, with exportable reports.",
  "Every rupee of negotiated discount and every turnaround delay is now visible and attributable.",
  "The factory floor runs on gate passes and challans instead of verbal handoffs."
];

export default function PranavCaseStudy() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline:
              "Pranav Doors & Windows — one platform, every department, the entire order lifecycle",
            description:
              "How ArchFlow digitized a premium doors & windows manufacturer end to end — from the first sales enquiry to installation handover — across 10 departments and 100+ employees.",
            url: `${site.url}/work/pranav-doors`,
            datePublished: "2024-09-01",
            dateModified: "2026-07-07"
          }),
          breadcrumbsSchema([
            { name: "Home", url: site.url },
            { name: "Work", url: `${site.url}/work` },
            {
              name: "Pranav Doors & Windows",
              url: `${site.url}/work/pranav-doors`
            }
          ])
        ]}
      />

      <PageHero
        eyebrow="Case Study · Live deployment"
        title="One platform. Every department. The entire order lifecycle."
        subtitle="For Pranav Doors & Windows, we replaced registers, spreadsheets and WhatsApp threads with a single live workflow platform — from the first enquiry to the signed handover document."
        highlight="lifecycle."
      />

      {/* Meta strip */}
      <section className="border-b border-foreground/[0.06]">
        <div className="container-page py-10">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            <Meta label="Client" value="Pranav Doors & Windows" />
            <Meta label="Industry" value="Premium doors & windows" />
            <Meta label="Live since" value="2024" />
            <Meta label="ArchFlow role" value="Design, build, deploy, evolve" />
          </dl>
        </div>
      </section>

      {/* Stats band — real numbers */}
      <section className="border-b border-foreground/[0.06]">
        <div className="container-page py-14">
          <Reveal>
            <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <dd className="font-display text-4xl font-extrabold sm:text-5xl">
                    <span className="text-flow">
                      <StatCounter to={s.value} suffix={s.suffix} />
                    </span>
                  </dd>
                  <dt className="mt-2 text-[10px] uppercase tracking-eyebrow text-muted-foreground">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
          {/* SCREENSHOT SLOT: admin dashboard overview */}
        </div>
      </section>

      {/* The problem */}
      <section className="section-y border-b border-foreground/[0.06]">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">
                <span className="h-1 w-1 rounded-full bg-flow-400" />
                The problem
              </p>
              <h2 className="heading-section mt-4 text-[28px] sm:text-[36px] lg:text-[44px]">
                <span className="text-metal">An order&apos;s life was </span>
                <span className="text-flow">scattered everywhere.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                Pranav Doors &amp; Windows is a premium doors-and-windows
                manufacturer. Before the platform, an order&apos;s life was
                scattered: enquiries in notebooks, quotations in Excel,
                approvals over calls, factory status on whiteboards. Projects
                combining more than one product line were the hardest — one
                series would stall while another moved, and nobody had one
                honest picture of a project.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {PAINS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 0.06}>
                  <div className="surface h-full p-6 lg:p-8">
                    <div className="flex items-start justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/[0.04]">
                        <Icon className="h-5 w-5 text-foreground/80" />
                      </span>
                      <span className="font-display text-sm font-bold text-muted-foreground/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-lg font-bold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* The solution — five pillars */}
      <section className="section-y border-b border-foreground/[0.06]">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">
              <span className="h-1 w-1 rounded-full bg-flow-400" />
              The solution
            </p>
            <h2 className="heading-section mt-4 text-[28px] sm:text-[38px] lg:text-[46px]">
              <span className="text-metal">Five ideas the platform </span>
              <span className="text-flow">is built on.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              const wide = i === PILLARS.length - 1;
              return (
                <Reveal
                  key={p.title}
                  delay={i * 0.05}
                  className={wide ? "md:col-span-2 lg:col-span-1" : ""}
                >
                  <div className="surface surface-hover h-full p-6 lg:p-8">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-flow-500/25 bg-gradient-to-br from-flow-500/15 to-transparent text-flow-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-6 font-display text-lg font-bold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* The order journey — the centerpiece */}
      <section className="section-y border-b border-foreground/[0.06]">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">
              <span className="h-1 w-1 rounded-full bg-flow-400" />
              The order journey
            </p>
            <h2 className="heading-section mt-4 text-[28px] sm:text-[38px] lg:text-[46px]">
              <span className="text-metal">From first enquiry to </span>
              <span className="text-flow">signed handover.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Fourteen stages, every one gated and recorded — this is the
              actual path an order takes through the platform.
            </p>
          </Reveal>

          <div className="relative mx-auto mt-14 max-w-2xl">
            <div
              aria-hidden
              className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-flow-500/50 via-foreground/10 to-transparent"
            />
            <ol className="space-y-7">
              {JOURNEY.map((step, i) => (
                <Reveal as="div" key={step.title} delay={(i % 4) * 0.04}>
                  <li className="relative flex gap-5 pl-9">
                    <span
                      aria-hidden
                      className="absolute left-0 top-1 grid h-[18px] w-[18px] place-items-center rounded-full border border-flow-400/40 bg-background"
                    >
                      <span className="h-2 w-2 rounded-full bg-flow-400" />
                    </span>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-flow-400">
                        Stage {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-0.5 font-display text-lg font-bold tracking-tight">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
          {/* SCREENSHOT SLOT: per-series progress bar on a project */}
        </div>
      </section>

      {/* Feature highlights, grouped */}
      <section className="section-y border-b border-foreground/[0.06]">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">
              <span className="h-1 w-1 rounded-full bg-flow-400" />
              What the platform does
            </p>
            <h2 className="heading-section mt-4 text-[28px] sm:text-[38px] lg:text-[46px]">
              <span className="text-metal">Built for the office, the floor, </span>
              <span className="text-flow">and the customer.</span>
            </h2>
          </Reveal>

          <div className="mt-14 space-y-12">
            {FEATURE_GROUPS.map((g) => {
              const GIcon = g.icon;
              return (
                <div key={g.group}>
                  <Reveal>
                    <div className="mb-5 flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-flow-500/25 bg-flow-500/10 text-flow-400">
                        <GIcon className="h-4 w-4" />
                      </span>
                      <h3 className="font-display text-sm font-bold uppercase tracking-eyebrow text-muted-foreground">
                        {g.group}
                      </h3>
                      <span className="h-px flex-1 bg-foreground/[0.08]" />
                    </div>
                  </Reveal>
                  <div className="grid gap-4 md:grid-cols-3">
                    {g.items.map((f, i) => (
                      <Reveal key={f.title} delay={i * 0.05}>
                        <div className="surface surface-hover h-full p-6">
                          <h4 className="font-display text-base font-bold tracking-tight">
                            {f.title}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {f.body}
                          </p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          {/* SCREENSHOT SLOT: active pipeline report */}
          {/* SCREENSHOT SLOT: production floor gate-pass view */}
        </div>
      </section>

      {/* Rollout timeline */}
      <section className="section-y border-b border-foreground/[0.06]">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">
              <span className="h-1 w-1 rounded-full bg-flow-400" />
              Rollout timeline
            </p>
            <h2 className="heading-section mt-4 text-[28px] sm:text-[38px] lg:text-[46px]">
              <span className="text-metal">Phased rollout, </span>
              <span className="text-flow">never a big-bang deploy.</span>
            </h2>
          </Reveal>

          <div className="relative mx-auto mt-14 max-w-2xl">
            <div
              aria-hidden
              className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-flow-500/50 via-foreground/10 to-transparent"
            />
            <ol className="space-y-8">
              {ROLLOUT.map((phase, i) => (
                <Reveal as="div" key={phase.when} delay={i * 0.05}>
                  <li className="relative flex gap-5 pl-9">
                    <span
                      aria-hidden
                      className="absolute left-0 top-1.5 grid h-[18px] w-[18px] place-items-center rounded-full border border-flow-400/40 bg-background"
                    >
                      <span className="h-2 w-2 rounded-full bg-flow-400" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-eyebrow text-flow-400">
                        {phase.when}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-bold tracking-tight">
                        {phase.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {phase.detail}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* What changed */}
      <section className="section-y border-b border-foreground/[0.06]">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">
                <span className="h-1 w-1 rounded-full bg-flow-400" />
                The result
              </p>
              <h2 className="heading-section mt-4 text-[28px] sm:text-[36px] lg:text-[44px]">
                <span className="text-metal">What changed for </span>
                <span className="text-flow">Pranav Doors.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glow-flow rounded-2xl border border-flow-500/30 bg-gradient-to-b from-flow-500/[0.08] to-transparent p-7 lg:p-9">
                <ul className="space-y-4">
                  {OUTCOMES.map((o) => (
                    <li
                      key={o}
                      className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90 sm:text-base"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-flow-500/40 bg-flow-500/15">
                        <Check className="h-3 w-3 text-flow-300" />
                      </span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y">
        <div className="container-page mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="heading-display text-[30px] sm:text-[42px] lg:text-[52px]">
              <span className="text-metal">
                ArchFlow builds this depth of workflow for{" "}
              </span>
              <span className="text-flow">one company at a time.</span>
            </h2>
            <p className="mt-5 text-muted-foreground sm:text-lg">
              Yours could be next.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Start a conversation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/services">See what we build</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-eyebrow text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}
