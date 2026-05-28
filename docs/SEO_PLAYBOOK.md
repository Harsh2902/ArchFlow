# ArchFlow SEO / AEO / GEO Playbook

What's been shipped in code, and what you (Harsh) need to do off-platform
to actually rank. Honest, realistic timelines included.

---

## What's now live in the code

### Technical SEO foundation
- `app/sitemap.ts` — dynamic XML sitemap at `/sitemap.xml`
- `app/robots.ts` — explicit allow for Googlebot + every major AI crawler (GPTBot, ChatGPT-User, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, etc.)
- `public/llms.txt` — markdown brief written specifically for LLMs to consume when they need to summarise ArchFlow
- `app/opengraph-image.tsx` — branded OG image (1200×630) auto-generated for social shares
- `app/icon.tsx` + `app/apple-icon.tsx` — branded favicons across all sizes
- Canonical URLs set per page
- Proper `robots: { index, follow, googleBot: { ... } }` directives

### Structured data (JSON-LD) — the AEO win
Site-wide:
- `Organization` + `LocalBusiness` + `ProfessionalService` schema with full founders, address, services, regions served, and `knowsAbout` array of 11 topical entities
- `WebSite` schema enabling Google sitelinks

Per page:
- **`/contact`** — `FAQPage` schema with all 7 Q&A pairs (this is the highest-value AEO asset — when someone asks "how long does custom ERP take in India?" or "alternative to SAP for fabricators", we're a candidate answer)
- **`/work/pranav-doors`** — `Article` + `BreadcrumbList` schemas
- **`/services`** — keyword-rich metadata
- **`/about`** — founder-named keywords

### Keyword targeting in metadata
Every page now has:
- Title tags with primary + supporting keywords
- ~150-character descriptions that read naturally and hit search intent
- Per-page `keywords` arrays (Google ignores them but Bing/Yandex/DuckDuckGo still use them)

---

## What only you can do — the off-platform playbook

Ranked by ROI. **Items 1-5 are mandatory** before any meaningful ranking happens. Items 6+ are leverage multipliers.

### 1. ⚡ Google Search Console (do this today, takes 10 min)
The single most important step. Without this, Google can't tell us how we're being indexed.

1. Go to <https://search.google.com/search-console>
2. Sign in with your Google account
3. **Add property** → **Domain** → enter `archflow.co.in`
4. Verify via DNS — Search Console gives you a TXT record like:
   `google-site-verification=abc123...`
   Add this TXT record at GoDaddy → DNS, Name: `@`, Value: the full string.
5. Once verified:
   - **Sitemaps** → submit `https://archflow.co.in/sitemap.xml`
   - **URL Inspection** → paste your homepage URL → **Request indexing**
   - Repeat URL Inspection + Request indexing for `/work/pranav-doors`, `/services`, `/contact`
6. Optional: paste the verification string into `app/layout.tsx` under `verification: { google: "..." }` so it survives if DNS changes.

**Expected timeline:** indexed within 2-14 days. Branded searches ("archflow") will start working as soon as you're indexed.

### 2. ⚡ Bing Webmaster Tools (5 min)
Same as Google but for Bing — which also powers ChatGPT web search, DuckDuckGo, and Yahoo.

1. <https://www.bing.com/webmasters>
2. Sign in → **Add a site** → `https://archflow.co.in`
3. Import from Google Search Console (1-click after step 1) OR verify via DNS
4. Submit `https://archflow.co.in/sitemap.xml`

### 3. ⚡ Google Business Profile (15 min — high-leverage for local + AI Overviews)
This is non-optional if you want to rank for "ERP company Chandigarh", "custom software Chandigarh", etc. It also drives Google Maps results and AI Overview citations.

1. <https://business.google.com>
2. Click **Manage now** → create a profile
3. Business name: **ArchFlow**
4. Category: **Software Company** (primary) + **Business Management Consultant** (additional)
5. Location: tick "I deliver goods and services" (since you're B2B, no walk-in)
6. Service areas: Chandigarh, Mohali, Panchkula, Punjab, Haryana, Delhi NCR, India
7. Contact: `+91 79880 19331`, `harsh@archflow.co.in`, `https://archflow.co.in`
8. Verification: GBP will mail a postcard to your registered address with a code (takes 5-14 days). Confirm the code when it arrives.
9. After verification: add **photos** (office, team, dashboard screenshots), **services** (each of the 6 ArchFlow services), and **posts** (write a short update weekly — even just "this week we shipped X").

### 4. ⚡ LinkedIn Company Page (15 min)
LinkedIn pages rank surprisingly well for branded searches and B2B decision-makers spend their day there.

1. <https://www.linkedin.com/company/setup/new/>
2. Page name: **ArchFlow**
3. URL: `linkedin.com/company/archflow`
4. Tagline: "Custom workflow and MIS platforms for India's manufacturers."
5. Industry: **Software Development**
6. Company size: 2-10
7. Headquarters: Chandigarh, India
8. Upload the logo (use the favicon at <https://archflow.co.in/icon> or generate a 400×400 version)
9. Cover image: use the OG image at <https://archflow.co.in/opengraph-image>
10. **About**: paste the description from `lib/site.ts` plus 1-2 paragraphs of detail
11. Hit publish, then:
    - Both founders should **add the company as their current employer** on their personal profiles
    - Both founders should post about ArchFlow once a week. The personal profile reach is 50× the company page reach early on.

Once the URL is created, re-add a `social` object to `lib/site.ts` with the real LinkedIn URL, wire it into the footer + contact card, and add it to `sameAs` in the Organization schema (`components/seo/structured-data.tsx`), then push.

### 5. ⚡ Verify the OG image works (5 min)
Once Vercel finishes deploying:

1. Test in Twitter/X validator: <https://cards-dev.twitter.com/validator>
2. Test in LinkedIn validator: <https://www.linkedin.com/post-inspector/>
3. Test in WhatsApp: send the link to yourself in a chat
4. All three should show the branded OG image with the headline + tagline

If any tool shows a stale preview, hit the "Scrape again" / "Refresh" button — most have one.

---

## Higher-leverage moves (next 4 weeks)

### 6. Industry directory submissions (1-2 hours total)
Free, slow-burn backlinks from India-specific B2B directories:

| Directory | Why | Effort |
|---|---|---|
| [IndiaMART](https://seller.indiamart.com) | Industrial-B2B specific | 15 min |
| [JustDial](https://jdseller.justdial.com) | Local discovery | 10 min |
| [Sulekha](https://www.sulekha.com) | Local services | 10 min |
| [Clutch](https://clutch.co/profile/get-listed) | Global B2B services | 20 min |
| [GoodFirms](https://www.goodfirms.co/companies/add) | Software directory | 15 min |
| [G2](https://www.g2.com/products/new) | Most influential for B2B SaaS | 30 min |
| [Capterra](https://www.capterra.com/vendors/sign-up) | Global software listings | 20 min |
| [GetApp](https://www.getapp.com/vendor-sign-up) | Sister to Capterra | 15 min |

**Don't fill these in a single afternoon.** Spread over 4 weeks. Search engines penalise blast-pattern link building. 1-2 per week looks natural.

### 7. Content / blog (highest long-term leverage)
You don't have a blog yet. This is the single best long-term SEO investment. Even 1 post a month, with proper internal linking, will compound.

Suggested first 6 posts (writing once a week is fine):

1. **"How a fenestration company runs five-state operations on one platform"** — case study deep dive on Pranav. Targets `fenestration software India`, `multi-state fenestration ERP`.
2. **"SAP vs custom ERP for Indian fabricators — when each makes sense"** — comparison piece. Targets `SAP alternative India`, `custom ERP fabricators`.
3. **"Why generic CRMs fail for industrial sales — and what to build instead"** — opinion + framework. Targets `industrial CRM India`, `B2B sales pipeline`.
4. **"The actual cost of bad quoting software"** — case-built argument with numbers. Targets `quotation software fenestration`, `BOM software India`.
5. **"What 'modular ERP' really means for a 50-person manufacturer"** — explainer. Targets `modular ERP India`, `ERP for mid-size manufacturers`.
6. **"A six-week deployment plan for a fenestration MIS"** — playbook format. Targets long-tail like `fenestration ERP deployment time`.

I can scaffold a `/blog` route and the first post when you're ready.

### 8. Founder personal branding on LinkedIn
Far higher organic reach than the company page. Both you and Tanishq should:

- Post 2-3 times a week (operations stories, lessons learned, photos from the floor, screenshots of the platform with permission)
- Engage in comments on posts by fenestration / PEB / modular kitchen industry leaders
- Use hashtags sparingly — `#fenestration #manufacturing #india` mostly

Within 3 months of consistent posting, your personal profiles will rank for `Harsh Dhankhar ArchFlow`, `Tanishq Trehan ArchFlow`, and incoming-warm-lead Sales DMs become a real channel.

### 9. Backlink outreach (slowest but highest authority)
The single hardest SEO discipline. Targets that would link to ArchFlow naturally:

- **Glassview India**, **Fenestration Today**, **Stairs India** — trade pubs that profile young Indian B2B SaaS companies
- **The Fabricator India** — magazine; pitch a guest article
- **YourStory**, **Inc42** — Indian startup media; pitch a founder story after Pranav signs off on quotes
- **ProductHunt** — submit ArchFlow once the site is polished (good for one-time burst, not ongoing)

Pitch template I can draft when you want to start outreach.

### 10. Reviews / testimonials (AEO gold)
When ChatGPT cites a B2B vendor, it disproportionately favours vendors with **named, verified reviews** on G2 / Capterra / Trustpilot.

Once Pranav is willing, ask them for a public quote (separate from the website testimonial — those count differently). Ideally:

- A G2 review by a named Pranav director (1 review = enormous AEO weight)
- A 200-word case study post on LinkedIn from the Pranav team tagging ArchFlow
- A short founder-tagged video testimonial we can put on the site + LinkedIn

---

## Realistic timeline summary

| Outcome | Realistic timeline |
|---|---|
| Indexed in Google | 2-14 days after Search Console submission |
| Ranks for `archflow` brand search | 2-4 weeks |
| Ranks for `ArchFlow Chandigarh`, `ArchFlow founders` | 4-8 weeks |
| Surfaces in ChatGPT / Perplexity for niche queries (`custom ERP fenestration India`) | 1-3 months *if* structured data + content + at least 5 referring domains |
| Ranks page 1 for long-tail `custom ERP fenestration India` style | 6-12 months with consistent content |
| Ranks page 1 for broad `ERP services India` | 18-36 months and serious investment, if ever |
| Local pack appearance for `software company Chandigarh` | 3-6 months after GBP verification |
| First inbound lead from organic search | 2-4 months if items 1-5 are done in week 1 |

**Don't measure success at week 1.** SEO is compounding interest, not a button. The work you do today shows up two months from now. The work you skip today, you can't catch up on in two months.

---

## What I'd literally do this week if I were you

**Monday (today):**
- Add the Search Console TXT record at GoDaddy
- Verify in Search Console, submit the sitemap
- Verify Bing
- Test the OG image preview

**Tuesday:**
- Set up Google Business Profile (start postcard verification)
- Set up LinkedIn company page
- Update both founder LinkedIn profiles to list ArchFlow

**Wednesday:**
- IndiaMART + JustDial submissions

**Thursday:**
- G2 + Capterra + GetApp submissions

**Friday:**
- Draft your first LinkedIn post about ArchFlow
- Outline blog post #1

That's a complete SEO foundation week. Total time investment: maybe 4-5 hours spread across the week.

---

## Tools I'd recommend

| Tool | Why | Cost |
|---|---|---|
| Google Search Console | Mandatory, see how Google sees you | Free |
| Bing Webmaster Tools | Same for Bing | Free |
| [Plausible Analytics](https://plausible.io) | Lightweight, privacy-friendly visitor analytics | $9/mo |
| [Ahrefs Webmaster Tools](https://ahrefs.com/webmaster-tools) | Backlink monitoring | Free for verified domains |
| [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/) | On-page SEO audit | Free up to 500 URLs |
| [Schema.org Validator](https://validator.schema.org) | Test our JSON-LD | Free |
| [Rich Results Test](https://search.google.com/test/rich-results) | Test how Google parses our schemas | Free |

After Vercel finishes building, hit the **Schema.org Validator** and **Rich Results Test** with `https://archflow.co.in` — both should report green checkmarks for Organization, WebSite, and (on /contact) FAQPage.

---

## When you've finished items 1-5

Tell me, and we'll move to:

- Add the Google Search Console verification string to `app/layout.tsx`
- Update `lib/site.ts` with the real LinkedIn URL
- Scaffold a `/blog` route + write the first post together
- Add a `/sitemap.xml` link in the footer for discoverability
- Set up Plausible or Vercel Analytics so we can see what's actually working
