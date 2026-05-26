# Content to replace

Every placeholder, by page and section. Search the codebase for the string
`PLACEHOLDER` or `TODO` to find any of these in source.

---

## Site-wide (`lib/site.ts`)

- **Phone number** — primary number is `+91 79880 19331` (Harsh).
  Tanishq's number `+91 70871 74974` is on the Contact page founder
  cards. Both are real and confirmed.
- **Address** — currently `Chandigarh, India`. Replace with the full
  registered/office address when ready.
- **Social URLs** — `linkedin.com/company/archflow` and `x.com/archflow`
  are placeholders. Confirm the real handles and update.

---

## Home page (`app/page.tsx`)

### Hero
- Trust strip names: currently `Pranav Doors & Windows` (real) plus
  `and growing teams across India`. Once additional clients sign, add
  them by name (with written approval).

### Logo / client marquee
- Removed entirely from the home page — with only one signed client
  (Pranav), a marquee or trust strip looked thin. When more clients
  sign, reintroduce a marquee section between Hero and Problem on
  `app/page.tsx`.

### Featured case study
- Stats (`10+ departments`, `5+ states`, `1+ year`) — confirm exact
  numbers with the Pranav team before launch.
- Dashboard mock is a stylised illustration. Replace with an actual
  screenshot of the live ArchFlow Pranav instance (blur any sensitive
  data first).

### Founders preview cards
- Replace gradient `H` / `T` blocks with real portraits.
- Confirm short tagline ("Director at Pranav Doors, bringing 20 years
  of fabrication industry experience.") matches what Tanishq prefers.

### Testimonial
- The quote is fabricated to read believably; replace with the actual,
  attributed quote from a Pranav director / leadership-team member.
  Marked with `<!-- PLACEHOLDER: replace with real client testimonial -->`.

---

## /work (`lib/work.ts`)

- Currently a single entry: Pranav Doors & Windows. Confirm `client`,
  `industry`, `year`, and `summary` match the real engagement scope.
- Add a real cover image (currently a 16:10 gradient block with the
  client's initials).
- When new clients sign, add them to the `workItems` array with
  `status: "in-progress"` or `"pipeline"` and an `href` if a full case
  study exists.

---

## /work/pranav-doors (`app/work/pranav-doors/page.tsx`)

- **Meta strip** (Client, Industry, Year, Role) — confirm wording.
- **The challenge** body — rewrite with real anecdotes from Tanishq once
  he reviews. Currently believable but generic.
- **The approach** body — same; replace with the real engagement
  timeline diagram or sequence.
- **Six modules** — confirm with the build team that the six listed
  match what shipped. Tighten descriptions for any custom features
  worth highlighting.
- **Stats** (`10+ / 5+ / 1+ yr / 100%`) — replace with audited
  post-deployment metrics before publishing externally.
- **Quote block** — same placeholder quote as on the home page;
  replace with named, attributed testimonial.

---

## /services (`lib/services.ts`)

- The six service entries are written to be honest and ship-ready but
  read every `long` / `includes` block once and edit anything that
  doesn't match how you currently pitch the offering.
- The pricing section deliberately does NOT publish a price band — the
  CTA is "Contact us for pricing". If you ever want to switch back to
  publishing a band, edit the Pricing section in `app/services/page.tsx`.

---

## /about (`app/about/page.tsx`)

- **Story** body — three paragraphs of origin story. Believable but
  general. Tighten with real anecdotes (which client conversation,
  which week, which floor visit triggered the company decision).
- **Founder bios** (`lib/founders.ts`) — Harsh's surname `Dhankhar` is
  still a placeholder (confirm spelling); Tanishq's full name is
  `Tanishq Trehan` (confirmed).
- **Founder portraits** — gradient blocks with `H` / `T` are
  placeholders. Drop in real headshots (5:3 aspect, dark background
  recommended).
- **Location block** — confirm the tricity + remote-elsewhere phrasing
  matches operating preference.

---

## /contact (`app/contact/page.tsx`)

- **Email** — `harsh@archflow.co.in` is the primary inbox.
  `tanishq@archflow.co.in` is Tanishq's. Confirm both inboxes exist
  and are monitored before launch (set up via Google Workspace / Zoho
  Mail).
- **Phone** — Harsh `+91 79880 19331`, Tanishq `+91 70871 74974`. Both
  real.
- **Calendly embed** — the right-column card has a placeholder div
  marked `{/* TODO: paste Calendly embed */}`. Replace with the real
  inline embed snippet.
- **FAQ answers** — written to ship as-is; verify the integration list
  (Tally, SAP) matches how the founders want to position it. The
  pricing answer intentionally points the prospect to a conversation
  rather than naming a number.
- **Form fields** — Zod schema currently requires phone (min 6 chars).
  If we want phone optional, relax `phone` in both
  `components/forms/contact-form.tsx` and `app/api/contact/route.ts`.
- **Resend / email forwarding** — `app/api/contact/route.ts` currently
  logs to console only. Wire up Resend (or SendGrid / SMTP) to forward
  enquiries to `harsh@archflow.co.in` (and optionally CC
  `tanishq@archflow.co.in`).

---

## /privacy and /terms

- Both files contain `<!-- PLACEHOLDER -->`-style markers and a
  "placeholder copy intended to be replaced by counsel before launch"
  notice in the page subtitle. Have a lawyer draft the real text
  before any external launch.

---

## Images and media (general)

- No real images are used anywhere yet. All hero/portrait/case-study
  visuals are gradient blocks. Replace with:
  - Real founder portraits (`/about`, home founders preview)
  - Real product / dashboard screenshots (case study, home featured
    case study)
  - Real cover images per work item (`/work` grid)
- Add an Open Graph image at `public/og.png` (1200x630) and a favicon
  set under `app/icon.tsx` or `public/favicon.ico` before launch.

---

## Quick search

In the source, every placeholder is marked one of these ways. Search to
audit:

```
PLACEHOLDER     # all visual / content swaps
TODO            # all engineering follow-ups (Resend, Calendly)
```
