# ArchFlow — Marketing Site

Production-grade marketing website for ArchFlow — custom workflow and MIS
platforms for India's manufacturers, fabricators, and project-based
businesses.

Built with Next.js 14 (App Router), TypeScript (strict), Tailwind CSS,
Framer Motion, shadcn-style primitives, Lucide icons, Lenis smooth scroll,
and next-themes (dark by default).

---

## Quick start

This project was built and tested on Windows with Node 22 and npm.

```powershell
# from the project root
npm install
npm run dev
```

Then open <http://localhost:3000>.

### Other commands

```powershell
npm run typecheck   # tsc --noEmit, strict
npm run lint        # next lint
npm run build       # production build
npm run start       # serve the production build
```

---

## Project structure

```
app/
  layout.tsx              Root layout — theme, fonts, Lenis, nav, footer, Toaster
  page.tsx                Home (10 sections)
  work/page.tsx           Case studies grid
  work/pranav-doors/      Pranav Doors full case study
  services/page.tsx       6 service tiles + process + pricing
  about/page.tsx          Story, founders, values, location, CTA
  contact/page.tsx        Contact form + alt contact + FAQ
  privacy/page.tsx        Placeholder legal copy
  terms/page.tsx          Placeholder legal copy
  api/contact/route.ts    POST endpoint — Zod-validates and logs payload
  globals.css             Design tokens + Tailwind layers
components/
  layout/                 Nav, footer, theme toggle, page hero
  brand/                  Logo
  sections/               Hero, marquee, problem, process, services,
                          case study, founders, testimonial, CTA, work grid
  motion/                 Reveal, Stagger, StatCounter
  providers/              Theme provider, Lenis provider
  forms/                  Contact form (React Hook Form + Zod)
  ui/                     Button, Input, Textarea, Label, Accordion
lib/
  site.ts                 Brand strings, nav config
  services.ts             Six service tiles (content + metadata)
  work.ts                 Work index entries
  founders.ts             Founder bios
  utils.ts                cn() class-merging helper
CONTENT_TO_REPLACE.md     Every placeholder, by page/section
DECISIONS.md              Judgment calls made during the build
```

---

## Design system

- **Background**: `slate-950` (`#020617`), never pure black.
- **Accent**: `emerald-500` (`#10B981`), used sparingly.
- **Surfaces**: `rounded-2xl` with `border border-white/5 bg-white/[0.02]`.
- **Display type**: `Instrument Serif`, tracking `-0.04em`, line-height `1.05`.
- **Body type**: `Inter`, line-height `1.5`.
- **Eyebrow labels**: 12–13 px, uppercase, `tracking-eyebrow` (0.1em),
  emerald-500.
- **Section padding**: `py-16 sm:py-20 lg:py-[120px]` (`section-y`).
- **Container**: max-width 1280px, horizontal padding 24/32/80 px
  (`container-page`).
- **Motion**: 600 ms fades with `y: 30 → 0` on scroll, 80 ms stagger,
  word-by-word hero, animated counters, marquee, sticky nav, hover lifts.
- **Reduced motion**: every animation respects `prefers-reduced-motion`.

Override design tokens in `app/globals.css` under `:root` (light) and
`.dark` (canonical) — they're plain CSS custom properties consumed by
Tailwind via `tailwind.config.ts`.

---

## Updating content

All copy lives in plain TypeScript files. No CMS for v1.

- **Brand strings, nav, contact** → `lib/site.ts`
- **Service tiles** → `lib/services.ts`
- **Case studies on /work** → `lib/work.ts`
- **Founder bios** → `lib/founders.ts`
- **Pranav case study body** → `app/work/pranav-doors/page.tsx`
- **About story** → `app/about/page.tsx`
- **FAQ entries** → `app/contact/page.tsx` (`FAQS` array)
- **Legal copy** → `app/privacy/page.tsx`, `app/terms/page.tsx`

Every placeholder is annotated with
`{/* PLACEHOLDER: replace with [what] */}` in the JSX and catalogued in
`CONTENT_TO_REPLACE.md`.

---

## Contact form

`POST /api/contact` validates payloads with Zod and currently logs the
enquiry to the server console (see the `// TODO: connect Resend` comment
in `app/api/contact/route.ts`). To wire up email forwarding:

1. Add a `RESEND_API_KEY` to `.env.local`.
2. Replace the `console.log` block in the route handler with a Resend
   send to `hello@archflow.co.in`.

The frontend form (`components/forms/contact-form.tsx`) handles loading,
success, and error states with Sonner toasts.

---

## Deployment

Designed for Vercel. Push to a Git remote, import the repo in Vercel,
and it will auto-detect Next.js — no extra config needed. The site
defaults to dark mode and works on Node 20+.

---

## What's intentionally minimal

- No CMS — content lives in TS files, easy to edit and version-control.
- No analytics — drop in Plausible or Vercel Analytics when ready.
- No real images yet — gradient placeholders are used everywhere a
  portrait/screenshot should go. See `CONTENT_TO_REPLACE.md`.
- No production legal copy — `/privacy` and `/terms` are placeholders.
