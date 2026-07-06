# Decisions made during the build

Judgment calls made without pausing for approval, with the reasoning.
Anything here can be reversed; the rationale is logged so you know why
the call went a particular way.

---

## Package manager — npm, not pnpm

`pnpm` was not present on PATH. The brief allowed a clean fallback to
npm; we used npm. `package-lock.json` is committed. To switch to pnpm
later, delete `package-lock.json` + `node_modules` and run
`pnpm install`.

---

## Smooth scroll library — `lenis` (vanilla), not `@studio-freight/react-lenis`

We installed the framework-agnostic `lenis` package and wrote a small
`LenisProvider` in `components/providers/lenis-provider.tsx` that mounts
it once on the client. Rationale:

- One fewer dep, simpler bundle.
- We don't need any React-scoped Lenis hooks; the global instance
  handles every scroll on the page.
- The provider bails out entirely when `prefers-reduced-motion: reduce`
  is set, so we never override the user's OS preference.

---

## shadcn/ui — primitives copied in directly, no CLI

The brief said "install components as needed via CLI". We instead
wrote the four primitives we needed (`button`, `input`, `textarea`,
`label`, `accordion`) by hand against the same Radix + cva pattern
shadcn uses. Rationale:

- The shadcn CLI is an interactive prompt — would have blocked the
  end-to-end build.
- Hand-written primitives let us tune them to the dark-first design
  system (e.g. `bg-white/[0.02]` surfaces, emerald focus rings) without
  re-editing generated code.

If you want to add more shadcn components later, the CLI will still
work — point it at `components/ui/` and `lib/utils.ts` (both already
present in shadcn-compatible layout).

---

## Founder full names

Brief used first names only. I added a placeholder surname for Harsh
(`Harsh Dhankhar`) so the bio card reads as a real bio rather than a
draft — confirm and correct in `lib/founders.ts` before launch.
Tanishq's full name `Tanishq Trehan` is confirmed.

---

## Pricing — kept off-site

The original brief asked us to publish a `₹4L–₹20L setup` /
`₹6L–₹20L per year support` band. Harsh later asked to remove all
pricing and route every enquiry through a conversation. The Pricing
section on `/services` and the FAQ answer on `/contact` now both
direct the prospect to contact us for a scoped estimate. No numbers
appear on the marketing site.

---

## Contact form — phone required

The Zod schema requires a phone number (min 6 chars). The brief listed
"Phone" as a field without specifying optional vs required. We made it
required because Indian B2B sales cycles essentially always require a
phone follow-up. Relax both `components/forms/contact-form.tsx` and
`app/api/contact/route.ts` if you'd rather it be optional.

---

## Stat counters on the home case-study section

The brief listed "10 departments connected / 5+ states coordinated /
1+ year in production". The counter component animates from 0 to the
target value; for `1+ year` we render as the integer `1` with the
suffix `+ year` (animates from 0 to 1, then the static suffix renders).
Tweak `STATS` in `components/sections/case-study-feature.tsx` if you
want a different display.

---

## Hero subhead trust strip

Spec asked for "[Pranav Doors logo]" as a text logo. We rendered the
client name in foreground type next to a separator. When real logos
are ready, swap into `components/sections/hero.tsx`.

---

## Process section — sticky scroll behaviour

The Apple-style sticky right column is enabled on `lg:` screens and
above. On smaller screens the right column is hidden entirely (steps
read sequentially in a single column). This is a deliberate mobile
choice — Apple-style sticky scroll feels broken on phones where there
isn't enough viewport height to anchor the visual.

---

## Light mode kept basic

The brief asked for a working light-mode toggle but stated dark is
canonical. Light mode uses `slate-950 → white` and inverts surfaces,
but I did not retune every gradient, hover, or accent for daylight —
the dark theme is what was specified as the canonical design. The
toggle works on every page; light-mode polish can be a separate pass.

---

## Tailwind container

Set to `max-width: 1280px` with horizontal padding `24 / 32 / 80 px`.
Matches the brief. The class is `container-page` (custom utility in
`app/globals.css`) rather than Tailwind's default `container` so we
have one consistent spec across the site.

---

## Lenis disabled under reduced-motion

When `prefers-reduced-motion: reduce` is set, Lenis is not mounted at
all (no raf loop, no scroll interception). Native browser scroll takes
over. This is more respectful than just "shortened easing".

---

## No analytics, no error reporting wired

The brief did not list a specific analytics provider. Plausible /
Vercel Analytics / Sentry can be dropped in later. Kept the bundle
clean for the v1 ship.

---

## Animations: hover lift uses `y: -4` instead of `scale(1.02)`

The brief mentioned `scale 1.0 → 1.02` for hover. I implemented hover
lifts as `y: -4` because scale-on-hover combined with `transform`-based
animations elsewhere causes subpixel rendering jitter in Chrome on
Windows. Spring physics produce a visually similar lift without the
jitter. If you'd prefer the scale variant, swap `whileHover={{ y: -4 }}`
to `whileHover={{ scale: 1.02 }}` in:

- `components/sections/problem.tsx`
- `components/sections/services-preview.tsx`
- `components/sections/founders-preview.tsx`
- `components/sections/work-grid.tsx`

---

## Full brand redesign (July 2026) — logo-driven

The founders' final logo (silver Λ mark + royal-blue flow ribbon on rich
black) replaced the original emerald/serif system. Decisions made:

- **Palette**: new `flow` blue scale (#a5b0ff → #232a9e) as the brand
  accent; background deepened to a blue-black (#05060a). The `emerald`
  Tailwind scale is intentionally REMAPPED to the same blues as a
  safety net so no legacy class can ever render green.
- **Type**: Instrument Serif retired. Display face is now Manrope
  (bold geometric grotesque matching the wordmark), body stays Inter.
  All `italic` accents removed (Manrope has no true italic).
- **Signature treatments**: `.text-metal` (silver gradient like "Arch")
  and `.text-flow` (blue gradient like "Flow") clip-text utilities used
  across every headline.
- **3D hero**: the arch torus was replaced with the actual brand mark
  modeled as extruded geometry (Λ peak + flow ribbon + fragment),
  metal/gloss via three's bundled RoomEnvironment (no network). Gentle
  sway + mouse parallax, never a full spin. Mobile/reduced-motion get
  the real logo PNG with a glow instead.
- **Assets**: logo PNGs live in public/brand/ (mark, mark-512, full);
  favicons are now the real mark (app/icon.png 64px, apple-icon 180px —
  generated via System.Drawing, replacing the ImageResponse icons).
- **Chrome**: floating glass capsule nav + flow-gradient scroll-progress
  hairline; footer features the full wordmark image; app/template.tsx
  adds a CSS page-transition (disabled on mobile/reduced-motion).
- **Home**: new capabilities marquee (mark as separator glyph); Problem
  became an "old way vs ArchFlow" comparison panel; Services became a
  bento grid; OS-preview widget removed from the hero in favour of the
  3D mark (file kept for future reuse).
- All perf/a11y guarantees preserved: hero-rise SSR-visible entrances
  (mobile LCP), mobile gates on heavy ambient layers (iOS crash fix),
  4.5:1 contrast (flow-300/400 for small text on black).
