/**
 * ArchFlow company brochure — print build.
 *
 * Generates an A4, print-ready HTML file from content.json, then Chrome
 * (headless) prints it to PDF. Fonts and logos are embedded as data URIs
 * so the PDF is self-contained and renders identically everywhere.
 *
 *   node brochure/build.js
 *
 * Assets are read from the repo; regenerate assets.json with
 * `node brochure/assets.js` if the logo or fonts change.
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = __dirname;
const content = JSON.parse(
  fs.readFileSync(path.join(OUT_DIR, "content.json"), "utf8")
);
const assets = JSON.parse(
  fs.readFileSync(path.join(OUT_DIR, "assets.json"), "utf8")
);

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Renders text with the final sentence-fragment accented in flow blue. */
const accent = (text, tail) =>
  tail
    ? `${esc(text)} <span class="accent">${esc(tail)}</span>`
    : esc(text);

const { cover, who, build, process: proc, proof, close } = content;

/* ── page furniture ──────────────────────────────────────────────── */

const head = (eyebrow) => `
  <header class="ph">
    <span class="ph-brand"><img src="${assets.logoMark}" alt="" /> ArchFlow</span>
    <span class="ph-eyebrow">${esc(eyebrow)}</span>
  </header>`;

const foot = (n) => `
  <footer class="pf">
    <span>archflow.co.in</span>
    <span>${n}</span>
  </footer>`;

const page = (n, eyebrow, body, cls = "") => `
<section class="page ${cls}">
  ${eyebrow ? head(eyebrow) : ""}
  <div class="page-body">${body}</div>
  ${n ? foot(n) : ""}
</section>`;

/* ── pages ───────────────────────────────────────────────────────── */

const p1 = `
<section class="page cover">
  <div class="cover-glow"></div>
  <div class="cover-inner">
    <img class="cover-mark" src="${assets.logoMark}" alt="ArchFlow" />
    <h1 class="cover-h1">${esc(cover.headline)}</h1>
    <p class="cover-sub">${esc(cover.subline)}</p>
    <div class="chips">
      ${cover.chips.map((c) => `<span class="chip">${esc(c)}</span>`).join("")}
    </div>
  </div>
  <div class="cover-foot">
    <span>Custom workflow &amp; MIS platforms</span>
    <span>archflow.co.in</span>
  </div>
</section>`;

const p2 = page(
  "02",
  "The problem",
  `
  <h2 class="h2">${esc(cover.problemTitle)}</h2>
  <div class="lede-2col">
    ${cover.problemParas.map((p) => `<p class="lede">${esc(p)}</p>`).join("")}
  </div>
  <div class="stack">
    ${cover.problemPains
      .map(
        (p, i) => `
      <article class="pain">
        <span class="pain-n">${String(i + 1).padStart(2, "0")}</span>
        <div>
          <h3 class="h3">${esc(p.title)}</h3>
          <p class="body">${esc(p.body)}</p>
        </div>
      </article>`
      )
      .join("")}
  </div>`
);

const p3 = page(
  "03",
  "Who we are",
  `
  <h2 class="h2">${esc(who.title)}</h2>
  <p class="lede lede-wide">${esc(who.lead)}</p>
  <div class="grid-3">
    ${who.points
      .map(
        (p) => `
      <article class="card">
        <h3 class="h4">${esc(p.title)}</h3>
        <p class="body-sm">${esc(p.body)}</p>
      </article>`
      )
      .join("")}
  </div>
  <div class="founders">
    ${who.founders
      .map(
        (f) => `
      <article class="founder">
        <div class="founder-top">
          <span class="mono">${esc(f.name.charAt(0))}</span>
          <div>
            <h3 class="h4">${esc(f.name)}</h3>
            <p class="role">${esc(f.role)}</p>
          </div>
        </div>
        <p class="body-sm">${esc(f.bio)}</p>
      </article>`
      )
      .join("")}
  </div>
  <p class="hq">${esc(who.hqLine)}</p>`
);

const p4 = page(
  "04",
  "What we build",
  `
  <h2 class="h2">${esc(build.title)}</h2>
  <p class="lede lede-wide">${esc(build.lead)}</p>
  <div class="grid-2">
    ${build.platforms
      .map(
        (p, i) => `
      <article class="card card-num">
        <span class="card-n">${String(i + 1).padStart(2, "0")}</span>
        <h3 class="h4">${esc(p.name)}</h3>
        <p class="body-sm">${esc(p.body)}</p>
      </article>`
      )
      .join("")}
  </div>`
);

const p5 = page(
  "05",
  "The order lifecycle",
  `
  <h2 class="h2">${esc(build.flowTitle)}</h2>
  <p class="lede lede-wide">${esc(build.flowLead)}</p>
  <ol class="flow">
    ${build.stages
      .map(
        (s, i) => `
      <li class="flow-step">
        <span class="flow-dot">${i + 1}</span>
        <div class="flow-text">
          <h3 class="h4">${esc(s.name)}</h3>
          <p class="body-sm">${esc(s.body)}</p>
        </div>
      </li>`
      )
      .join("")}
  </ol>`
);

const p6 = page(
  "06",
  "How we work",
  `
  <h2 class="h2">${esc(proc.title)}</h2>
  <p class="lede lede-wide">${esc(proc.lead)}</p>
  <div class="steps">
    ${proc.steps
      .map(
        (s) => `
      <article class="step">
        <span class="step-when">${esc(s.when)}</span>
        <div class="step-main">
          <h3 class="h4">${esc(s.title)}</h3>
          <p class="body-sm">${esc(s.body)}</p>
          <p class="step-deliver"><span>You get</span> ${esc(s.deliverable)}</p>
        </div>
      </article>`
      )
      .join("")}
  </div>`
);

const p7 = page(
  "07",
  "Why ArchFlow",
  `
  <h2 class="h2">${esc(proc.whyTitle)}</h2>
  <p class="lede lede-wide">${esc(proc.whyLead)}</p>
  <div class="compare">
    <div class="compare-head">
      <span></span>
      <span class="ch-them">What usually happens</span>
      <span class="ch-us">With ArchFlow</span>
    </div>
    ${proc.comparisons
      .map(
        (c) => `
      <div class="compare-row">
        <span class="c-option">${esc(c.option)}</span>
        <span class="c-them">${esc(c.reality)}</span>
        <span class="c-us">${esc(c.archflow)}</span>
      </div>`
      )
      .join("")}
  </div>`
);

const p8 = page(
  "08",
  "The proof",
  `
  <h2 class="h2">${esc(proof.title)}</h2>
  <p class="lede lede-wide">${esc(proof.lead)}</p>
  <div class="stat-band">
    ${proof.stats
      .map(
        (s) => `
      <div class="stat">
        <span class="stat-v">${esc(s.value)}</span>
        <span class="stat-l">${esc(s.label)}</span>
      </div>`
      )
      .join("")}
  </div>
  <div class="proof-cols">
    <div class="proof-narr">
      ${proof.narrative.map((p) => `<p class="body">${esc(p)}</p>`).join("")}
    </div>
    <aside class="proof-changes">
      <h3 class="h4">What changed</h3>
      <ul>
        ${proof.changes.map((c) => `<li>${esc(c)}</li>`).join("")}
      </ul>
    </aside>
  </div>
  <p class="visit">${esc(proof.visitLine)}</p>`
);

const p9 = page(
  "09",
  "Industries",
  `
  <h2 class="h2">${esc(close.industriesTitle)}</h2>
  <p class="lede lede-wide">${esc(close.industriesLead)}</p>
  <div class="grid-2 tight">
    ${close.industries
      .map(
        (v) => `
      <article class="vert">
        <h3 class="h4">${esc(v.name)}</h3>
        <p class="body-sm">${esc(v.line)}</p>
      </article>`
      )
      .join("")}
  </div>
  <p class="note">${esc(close.industriesNote)}</p>`
);

const p10 = page(
  "10",
  "Questions",
  `
  <h2 class="h2">Before you decide.</h2>
  <div class="faqs">
    ${close.faqs
      .map(
        (f) => `
      <article class="faq">
        <h3 class="h4">${esc(f.q)}</h3>
        <p class="body-sm">${esc(f.a)}</p>
      </article>`
      )
      .join("")}
  </div>`
);

const p11 = `
<section class="page back">
  <div class="cover-glow"></div>
  <div class="back-inner">
    <h2 class="back-h">${esc(close.closeTitle)}</h2>
    <p class="back-body">${esc(close.closeBody)}</p>
    <p class="back-action">${esc(close.closeAction)}</p>
    <div class="back-contact">
      <div>
        <span class="bc-label">Email</span>
        <span class="bc-value">harsh@archflow.co.in</span>
      </div>
      <div>
        <span class="bc-label">Phone</span>
        <span class="bc-value">+91 79880 19331</span>
      </div>
      <div>
        <span class="bc-label">Web</span>
        <span class="bc-value">archflow.co.in</span>
      </div>
      <div>
        <span class="bc-label">Office</span>
        <span class="bc-value">Sector 82, Mohali, Punjab</span>
      </div>
    </div>
  </div>
  <img class="back-logo" src="${assets.logoFull}" alt="ArchFlow" />
</section>`;

/* ── document ────────────────────────────────────────────────────── */

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>ArchFlow — Company Brochure</title>
<style>
@font-face {
  font-family: 'Manrope'; src: url('${assets.manrope}') format('woff2');
  font-weight: 200 800; font-display: block;
}
@font-face {
  font-family: 'InterVar'; src: url('${assets.inter}') format('woff2');
  font-weight: 100 900; font-display: block;
}

:root {
  --ink: #0b0d14;
  --ink-soft: #3d4557;
  --muted: #6b7386;
  --line: #e3e6ec;
  --line-soft: #eef0f4;
  --paper: #ffffff;
  --paper-2: #f7f8fa;
  --flow: #4353f0;
  --flow-dark: #3340d4;
  --flow-light: #eef0fe;
  --dark: #05060a;
}

* { margin: 0; padding: 0; box-sizing: border-box;
    -webkit-print-color-adjust: exact; print-color-adjust: exact; }

html { font-size: 10.5pt; }
body {
  font-family: 'InterVar', system-ui, sans-serif;
  color: var(--ink); background: var(--paper);
  -webkit-font-smoothing: antialiased;
}

@page { size: A4; margin: 0; }

.page {
  position: relative; width: 210mm; height: 297mm;
  overflow: hidden; background: var(--paper);
  page-break-after: always; break-after: page;
}
.page:last-child { page-break-after: auto; break-after: auto; }
.page-body { padding: 26mm 20mm 22mm; }

/* running heads */
.ph {
  position: absolute; top: 12mm; left: 20mm; right: 20mm;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 7.5pt; letter-spacing: .14em; text-transform: uppercase;
  color: var(--muted); border-bottom: 0.4pt solid var(--line);
  padding-bottom: 3mm;
}
.ph-brand { display: flex; align-items: center; gap: 2.2mm;
  font-family: 'Manrope'; font-weight: 800; letter-spacing: .02em;
  text-transform: none; font-size: 9pt; color: var(--ink); }
.ph-brand img { width: 4.6mm; height: 4.6mm; border-radius: 1mm; }
.ph-eyebrow { color: var(--flow); font-weight: 600; }
.pf {
  position: absolute; bottom: 12mm; left: 20mm; right: 20mm;
  display: flex; justify-content: space-between;
  font-size: 7.5pt; color: var(--muted);
  border-top: 0.4pt solid var(--line); padding-top: 3mm;
}

/* type */
.h2 { font-family: 'Manrope'; font-weight: 800; font-size: 25pt;
  line-height: 1.08; letter-spacing: -0.025em; margin-bottom: 5mm; }
.h3 { font-family: 'Manrope'; font-weight: 800; font-size: 12pt;
  letter-spacing: -0.01em; margin-bottom: 1.6mm; }
.h4 { font-family: 'Manrope'; font-weight: 800; font-size: 10.5pt;
  letter-spacing: -0.01em; margin-bottom: 1.6mm; }
.accent { color: var(--flow); }
.lede { font-size: 11pt; line-height: 1.55; color: var(--ink-soft); }
.lede-wide { max-width: 150mm; margin-bottom: 7mm; }
.lede-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 7mm;
  margin-bottom: 10mm; }
.body { font-size: 9.6pt; line-height: 1.6; color: var(--ink-soft); }
.body-sm { font-size: 9pt; line-height: 1.55; color: var(--muted); }

/* cover */
.cover { background: var(--dark); color: #fff; }
.cover-glow {
  position: absolute; inset: 0;
  background:
    radial-gradient(60% 45% at 78% 12%, rgba(88,101,242,0.30), transparent 70%),
    radial-gradient(55% 40% at 12% 88%, rgba(51,64,212,0.24), transparent 70%);
}
.cover-inner { position: relative; padding: 42mm 22mm 0; }
.cover-mark { width: 20mm; height: 20mm; border-radius: 4mm; margin-bottom: 14mm; }
.cover-h1 {
  font-family: 'Manrope'; font-weight: 800; font-size: 42pt;
  line-height: 1.03; letter-spacing: -0.035em; max-width: 160mm;
}
.cover-sub {
  margin-top: 9mm; max-width: 128mm; font-size: 12pt; line-height: 1.55;
  color: rgba(255,255,255,0.72);
}
.chips { margin-top: 16mm; display: flex; flex-wrap: wrap; gap: 3mm; }
.chip {
  border: 0.5pt solid rgba(138,150,255,0.45);
  background: rgba(88,101,242,0.14);
  color: #c9cfff; border-radius: 20mm;
  padding: 2.2mm 5mm; font-size: 8.4pt; font-weight: 600;
}
.cover-foot {
  position: absolute; bottom: 16mm; left: 22mm; right: 22mm;
  display: flex; justify-content: space-between;
  font-size: 8pt; letter-spacing: .12em; text-transform: uppercase;
  color: rgba(255,255,255,0.42);
  border-top: 0.5pt solid rgba(255,255,255,0.12); padding-top: 4mm;
}

/* problem */
.stack { display: flex; flex-direction: column; gap: 5mm; }
.pain {
  display: grid; grid-template-columns: 14mm 1fr; align-items: start;
  border: 0.5pt solid var(--line); border-radius: 3mm;
  padding: 6mm 6mm 6mm 4mm; background: var(--paper-2);
}
.pain-n { font-family: 'Manrope'; font-weight: 800; font-size: 13pt;
  color: var(--flow); }

/* cards */
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm;
  margin-bottom: 10mm; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 4.5mm; }
.grid-2.tight { gap: 3.5mm; }
.card { border: 0.5pt solid var(--line); border-radius: 3mm;
  padding: 5.5mm; background: var(--paper-2); }
.card-num { position: relative; padding-top: 7mm; }
.card-n { position: absolute; top: 4.5mm; right: 5.5mm;
  font-family: 'Manrope'; font-weight: 800; font-size: 9pt; color: #c3c8d4; }

/* founders */
.founders { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm;
  margin-bottom: 7mm; }
.founder { border: 0.5pt solid var(--line); border-left: 1.6pt solid var(--flow);
  border-radius: 3mm; padding: 6mm; }
.founder-top { display: flex; gap: 4mm; align-items: center; margin-bottom: 3.5mm; }
.mono {
  width: 11mm; height: 11mm; flex: none; border-radius: 50%;
  background: var(--flow-light); color: var(--flow);
  font-family: 'Manrope'; font-weight: 800; font-size: 13pt;
  display: flex; align-items: center; justify-content: center;
}
.role { font-size: 8.4pt; color: var(--flow); font-weight: 600; }
.hq { font-size: 9pt; color: var(--muted); border-top: 0.5pt solid var(--line);
  padding-top: 4mm; }

/* flow */
.flow { list-style: none; position: relative; }
.flow::before {
  content: ''; position: absolute; left: 5.5mm; top: 6mm; bottom: 6mm;
  width: 0.6pt; background: linear-gradient(180deg, var(--flow), #c9cfff);
}
.flow-step { position: relative; display: grid;
  grid-template-columns: 16mm 1fr; align-items: start; padding: 3.6mm 0; }
.flow-dot {
  width: 11mm; height: 11mm; border-radius: 50%; background: var(--flow);
  color: #fff; font-family: 'Manrope'; font-weight: 800; font-size: 10pt;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 0 1.6mm #fff;
}
.flow-text { padding-top: 1mm; }

/* steps */
.steps { display: flex; flex-direction: column; gap: 3.2mm; }
.step { display: grid; grid-template-columns: 26mm 1fr; gap: 5mm;
  border: 0.5pt solid var(--line); border-radius: 3mm; padding: 4.6mm 5mm;
  background: var(--paper-2); }
.step-when { font-family: 'Manrope'; font-weight: 800; font-size: 9.5pt;
  color: var(--flow); letter-spacing: -0.01em; }
.step-deliver { margin-top: 2.2mm; font-size: 8.4pt; color: var(--ink-soft); }
.step-deliver span { display: inline-block; background: var(--flow-light);
  color: var(--flow-dark); font-weight: 700; border-radius: 1.4mm;
  padding: 0.6mm 2mm; margin-right: 2mm; font-size: 7.6pt;
  text-transform: uppercase; letter-spacing: .08em; }

/* compare */
.compare { border: 0.5pt solid var(--line); border-radius: 3mm; overflow: hidden; }
.compare-head, .compare-row {
  display: grid; grid-template-columns: 42mm 1fr 1fr;
}
.compare-head { background: var(--dark); color: #fff; font-size: 8pt;
  text-transform: uppercase; letter-spacing: .12em; }
.compare-head span { padding: 4mm 5mm; }
.ch-us { color: #a5b0ff; }
.compare-row { border-top: 0.5pt solid var(--line); }
.compare-row span { padding: 6mm 5mm; font-size: 9pt; line-height: 1.55; }
.c-option { font-family: 'Manrope'; font-weight: 800; font-size: 10pt;
  background: var(--paper-2); }
.c-them { color: var(--muted); }
.c-us { color: var(--ink); background: var(--flow-light); font-weight: 500; }

/* proof */
.stat-band {
  display: grid; grid-template-columns: repeat(4, 1fr);
  background: var(--dark); border-radius: 3mm; padding: 6mm 5mm;
  margin-bottom: 7mm;
}
.stat { text-align: center; }
.stat-v { display: block; font-family: 'Manrope'; font-weight: 800;
  font-size: 22pt; color: #fff; letter-spacing: -0.03em; }
.stat-l { display: block; margin-top: 1.5mm; font-size: 7.6pt;
  text-transform: uppercase; letter-spacing: .1em; color: #8f97ad; }
.proof-cols { display: grid; grid-template-columns: 1.35fr 1fr; gap: 7mm; }
.proof-narr { display: flex; flex-direction: column; gap: 4mm; }
.proof-changes { border: 0.5pt solid var(--line); border-radius: 3mm;
  padding: 6mm; background: var(--paper-2); }
.proof-changes ul { list-style: none; margin-top: 3mm; }
.proof-changes li { position: relative; padding-left: 6mm; font-size: 8.8pt;
  line-height: 1.5; color: var(--ink-soft); margin-bottom: 3mm; }
.proof-changes li::before {
  content: ''; position: absolute; left: 0; top: 1.6mm;
  width: 2.6mm; height: 2.6mm; border-radius: 50%; background: var(--flow);
}
.visit { margin-top: 6mm; padding: 5mm 6mm; border-radius: 3mm;
  background: var(--flow-light); color: var(--flow-dark);
  font-size: 9.4pt; font-weight: 600; line-height: 1.5; }

/* industries + faq */
.vert { border-left: 1.4pt solid var(--flow); padding: 1mm 0 1mm 5mm; }
.note { margin-top: 9mm; font-size: 9pt; color: var(--muted);
  border-top: 0.5pt solid var(--line); padding-top: 4mm; }
.faqs { display: flex; flex-direction: column; gap: 6mm; }
.faq { border-bottom: 0.5pt solid var(--line-soft); padding-bottom: 5mm; }

/* back cover */
.back { background: var(--dark); color: #fff; }
.back-inner { position: relative; padding: 40mm 22mm 0; }
.back-h { font-family: 'Manrope'; font-weight: 800; font-size: 30pt;
  line-height: 1.08; letter-spacing: -0.03em; max-width: 150mm; }
.back-body { margin-top: 7mm; max-width: 130mm; font-size: 11pt;
  line-height: 1.6; color: rgba(255,255,255,0.72); }
.back-action { margin-top: 6mm; display: inline-block;
  background: var(--flow); color: #fff; font-weight: 700; font-size: 10pt;
  padding: 3.5mm 7mm; border-radius: 20mm; }
.back-contact { margin-top: 16mm; display: grid;
  grid-template-columns: 1fr 1fr; gap: 6mm 8mm; max-width: 140mm;
  border-top: 0.5pt solid rgba(255,255,255,0.14); padding-top: 8mm; }
.bc-label { display: block; font-size: 7.6pt; text-transform: uppercase;
  letter-spacing: .12em; color: #8f97ad; margin-bottom: 1.2mm; }
.bc-value { display: block; font-size: 10.5pt; color: #fff; font-weight: 600; }
.back-logo { position: absolute; bottom: 14mm; left: 22mm; width: 62mm;
  border-radius: 2mm; }
</style>
</head>
<body>
${p1}${p2}${p3}${p4}${p5}${p6}${p7}${p8}${p9}${p10}${p11}
</body>
</html>`;

const htmlPath = path.join(OUT_DIR, "brochure.html");
fs.writeFileSync(htmlPath, html);
console.log("HTML written:", Math.round(html.length / 1024) + "KB");

/* ── print ───────────────────────────────────────────────────────── */

const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const pdfPath = process.argv[2] || path.join(OUT_DIR, "ArchFlow-Brochure.pdf");

execFileSync(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdfPath}`,
    "file:///" + htmlPath.replace(/\\/g, "/")
  ],
  { stdio: "inherit", timeout: 120000 }
);

const size = fs.statSync(pdfPath).size;
console.log("PDF written:", pdfPath, Math.round(size / 1024) + "KB");
