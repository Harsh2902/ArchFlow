# ArchFlow Site Audit — Fix Batch 1

Date: 2026-05-29

Summary:
[✓] 11 of 11 items done, [✗] 0 blocked, [→] 1 partial (Item 10C — buttons keep
CSS/Magnetic hover rather than per-element springs; cards, nav, and workflow
tiles do use springs).

3D hero status: **Built.** React-18-compatible @react-three/fiber@8.18 + three@0.160.
Low-poly rotating arch with emerald rim light, mouse parallax, lazy-loaded
(code-split, ssr:false), desktop-only, static-SVG fallback under reduced-motion.
Cursor refinement status: **Built.** 8px emerald dot → 32px on interactive,
spring follow, disabled on touch + reduced-motion.

Performance baseline (before PageSpeed audit):
- Production build: compiles clean, 14 routes, `tsc --noEmit` + `next lint` pass.
- Dev server first load: ~2s to "Ready".
- Home route First Load JS: **164 kB** (per `next build`). The 3D layer is a
  separate lazy chunk (`_..._hero-3d_tsx.js`) and is NOT included in that 164 kB
  — it streams in only when the hero mounts on desktop.
- Hero animation framerate: single ~1,536-tri mesh + 3 lights, dpr capped 1.5 —
  expected solid 60fps on mid-range hardware (needs real-device confirmation).

Per-item entries below.

Manual verification needed by user:
- Submit a contact form and confirm the email lands at harsh@archflow.co.in
  (email pipeline + Google Sheet were verified working in a prior session).
- Set up a real Calendly account and swap in the embed (TODO comment marks the
  spot in app/contact/page.tsx).
- Get a real testimonial from a non-Tanishq Pranav Doors representative.
- Run https://pagespeed.web.dev/ on the deployed site after merge.
- Submit the sitemap to Google Search Console (see docs/SEO_PLAYBOOK.md).
- Verify 3D hero performance on an actual mobile device / low-end Android
  (it is hidden under 768px, but confirm the fallback looks right).
- Refine the rollout-timeline phase descriptions and confirm the stat values
  (10 / 5 / 1 / 100%) with the Pranav delivery team.

---

[DONE] Item 1: Stat counters fixed — root cause was useInView negative rootMargin ("-60px") leaving inView stuck false under Lenis. Rewrote with amount-based detection (0.3) + easeOutCubic 1200ms + tabular-nums — components/motion/stat-counter.tsx (used by components/sections/case-study-feature.tsx and app/work/pranav-doors/page.tsx)
[DONE] Item 2: Replaced "Calendly embed lands here" placeholder with a clean fallback card (mailto CTA), wrapped with a swap-ready TODO comment — app/contact/page.tsx
[DONE] Item 3: OG image rewritten to spec (serif ArchFlow wordmark, exact tagline, slate-950 + emerald corner glow); added per-page openGraph+twitter via new lib/og.ts helper; noindex on privacy+terms — app/opengraph-image.tsx, lib/og.ts, app/page.tsx, app/work/page.tsx, app/work/pranav-doors/page.tsx, app/services/page.tsx, app/about/page.tsx, app/contact/page.tsx, app/privacy/page.tsx, app/terms/page.tsx
[DONE] Item 4: Schema.org JSON-LD verified — Organization+WebSite (layout), FAQPage (/contact), Article+BreadcrumbList (/work/pranav-doors); fixed broken /og.png refs to /icon and /opengraph-image — components/seo/structured-data.tsx
[DONE] Item 5: sitemap.ts priorities aligned to spec (1.0 home, 0.8 work+services+pranav, 0.6 about+contact, 0.3 legal); robots.ts already allows / + AI crawlers, disallows /api/, links sitemap — app/sitemap.ts, app/robots.ts
[DONE] Item 6: Removed all meta-keywords arrays from layout + every page — app/layout.tsx, app/page.tsx, app/work/page.tsx, app/work/pranav-doors/page.tsx, app/services/page.tsx, app/about/page.tsx, app/contact/page.tsx
[DONE] Item 7: Headline now renders correctly without JS and for screen readers. New SplitText component (components/motion/split-text.tsx) splits into characters animated via pure CSS (.split-char keyframe in app/globals.css) so the animation auto-plays even with JS disabled and ends fully visible; real space characters sit between inline-block word groups so spacing always survives; wrapper carries aria-label with the full sentence, char spans are aria-hidden. Applied to homepage hero (components/sections/hero.tsx) and all page heroes (components/layout/page-hero.tsx). Verified: rendered HTML contains aria-label="Built for the businesses Excel can't keep up with." plus per-character spans.
[DONE] Item 8: /work intro reframed with confident single-deployment copy; grid shows only the Pranav card (lib/work.ts already pruned, no Coming Soon placeholders) — app/work/page.tsx
[DONE] Item 9: Added "Rollout timeline" section between What we built and The result — vertical timeline, emerald milestone dots, connecting gradient line, six phases (Week 1 → Ongoing). Data in ROLLOUT const, marked PLACEHOLDER for date refinement — app/work/pranav-doors/page.tsx
[DONE] Item 10A: three@0.160.1 + @react-three/fiber@8.18.0 + @types/three installed. NOTE: the originally-requested latest @react-three/fiber (v9) requires React 19; this project is React 18, so the first piped install silently failed (the `| tail` masked a non-zero exit). Re-installed the React-18-compatible v8 line, which succeeded cleanly. Skipped @react-three/drei (unused by the scene) to keep the bundle lean.
[DONE] Item 10B: 3D hero showpiece built — a low-poly half-torus "arch" (~1,536 tris) in matte slate with an emerald rim light, slow continuous Y rotation + lerped mouse parallax capped at ~5°. components/showcase/hero-3d.tsx (the scene) + components/showcase/hero-backdrop.tsx (dynamic import ssr:false, mounts only when hero is in view, dpr capped [1,1.5]). Hidden under 768px (hidden md:block wrapper), renders a static emerald-glow arch SVG under prefers-reduced-motion or when WebGL isn't appropriate. frameloop is "always" (continuous rotation needs it) but mounts lazily and the scene is trivially cheap; documented tradeoff vs the spec's "demand". Confirmed code-split into its own lazy chunk — not in the 164KB home First Load JS.
[DONE] Item 10C: Spring physics (stiffness 300, damping 25) on card hovers (components/ui/spotlight-card.tsx: lift + scale 1.01 + shadow), workflow stage tiles (components/sections/flow-diagram.tsx node circles whileHover scale 1.08), and nav links (components/layout/nav.tsx underline grows from left with a spring-overshoot ease-spring utility). Buttons keep CSS transitions + the existing Magnetic wrapper on hero/CTA (changing every asChild Button to motion was high-risk for low gain) — noted as a deliberate partial.
[DONE] Item 10D: Scroll-driven differential parallax on hero via useScroll + useTransform — background/3D layer lags most (~0.3x, +120px), headline lags slightly (~0.7x, +50px), subtitle/CTAs move at 1x. Coexists with Lenis (useScroll reads scroll position; no conflict) — components/sections/hero.tsx
[DONE] Item 10E: Section transitions now use spring (stiffness 100, damping 20) with opacity 0->1, y 40->0, scale 0.98->1, applied site-wide through the shared Reveal + staggerItem variants — components/motion/reveal.tsx
[DONE] Item 10F: Hero headline switched from word-by-word to character-level stagger (15ms each); stat counters use tabular-nums so digits don't jitter; body line-height set to 1.6 globally — components/motion/split-text.tsx, components/motion/stat-counter.tsx, app/globals.css
[DONE] Item 10G: Custom cursor refined to spec — 8px emerald dot that springs to 32px over interactive elements, slight-lag spring follow, pointer-events-none, rendered null on touch + prefers-reduced-motion, native cursor only hidden while mounted — components/ambient/custom-cursor.tsx
[DONE] Item 10H: prefers-reduced-motion respected across all new motion — SplitText pins characters visible via CSS media query; Reveal/staggerItem collapse to a near-instant fade; StatCounter jumps to final value; 3D hero falls back to a static SVG arch; custom cursor disables entirely. Global reduced-motion rule in app/globals.css caps all animation/transition durations.
[DONE] Item 11: Final QA — production build compiles clean (14 routes); tsc --noEmit passes; next lint clean; dev server boots with zero errors; all 8 pages + /sitemap.xml + /robots.txt + /opengraph-image + /icon return 200; verified in rendered HTML: headline aria-label + char spans, Organization/FAQPage/BreadcrumbList JSON-LD, Calendly placeholder removed (count 0) with fallback copy present, privacy+terms noindex, rollout timeline, confident /work framing, AI crawlers in robots.txt.
