/**
 * ArchFlow meeting booklet — print build.
 *
 * Generates a 12-page A5 booklet from content.json and prints it to PDF
 * via headless Chrome. Fonts and logos are embedded as data URIs, so the
 * PDF is self-contained and renders identically at any print shop.
 *
 *   node brochure/build.js [outputPath.pdf]
 *
 * Format notes: A5 (148x210mm), 12 pages — a multiple of 4, so it can be
 * saddle-stitched (printed 2-up on A4, folded, stapled). Page order is
 * sequential reading order; the press handles imposition.
 *
 * Regenerate embedded assets with `node brochure/assets.js`.
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const OUT_DIR = __dirname;
const content = JSON.parse(
  fs.readFileSync(path.join(OUT_DIR, "content.json"), "utf8")
);
const assets = JSON.parse(
  fs.readFileSync(path.join(OUT_DIR, "assets.json"), "utf8")
);

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const { cover, build, process: proc, proof } = content;

/* ── page furniture ──────────────────────────────────────────────── */

const head = (eyebrow) => `
  <header class="ph">
    <span class="ph-brand"><img src="${assets.logoMark}" alt="" /> ArchFlow</span>
    <span class="ph-eyebrow">${esc(eyebrow)}</span>
  </header>`;

const foot = (n) => `<footer class="pf"><span>${n}</span></footer>`;

const page = (n, eyebrow, body) => `
<section class="page">
  ${head(eyebrow)}
  <div class="page-body">${body}</div>
  ${foot(n)}
</section>`;

const platformCard = (p, i) => `
  <article class="card">
    <span class="card-n">${String(i + 1).padStart(2, "0")}</span>
    <h3 class="h4">${esc(p.name)}</h3>
    <p class="body-sm">${esc(p.body)}</p>
  </article>`;

const stepCard = (s) => `
  <article class="step">
    <span class="step-when">${esc(s.when)}</span>
    <div>
      <h3 class="h4">${esc(s.title)}</h3>
      <p class="body-sm">${esc(s.body)}</p>
      <p class="step-deliver"><span>You get</span> ${esc(s.deliverable)}</p>
    </div>
  </article>`;

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
  ${cover.problemParas.map((p) => `<p class="lede">${esc(p)}</p>`).join("")}
  <div class="stack">
    ${cover.problemPains
      .map(
        (p, i) => `
      <article class="pain">
        <span class="pain-n">${String(i + 1).padStart(2, "0")}</span>
        <div>
          <h3 class="h4">${esc(p.title)}</h3>
          <p class="body-sm">${esc(p.body)}</p>
        </div>
      </article>`
      )
      .join("")}
  </div>`
);

const p3 = page(
  "03",
  "What we build",
  `
  <h2 class="h2">${esc(build.title)}</h2>
  <p class="lede">${esc(build.lead)}</p>
  <div class="stack">
    ${build.platforms.slice(0, 3).map(platformCard).join("")}
  </div>`
);

const p4 = page(
  "04",
  "What we build",
  `
  <div class="stack stack-top">
    ${build.platforms
      .slice(3)
      .map((p, i) => platformCard(p, i + 3))
      .join("")}
  </div>`
);

const p5 = page(
  "05",
  "The order lifecycle",
  `
  <h2 class="h2">${esc(build.flowTitle)}</h2>
  <p class="lede">${esc(build.flowLead)}</p>
  <ol class="flow">
    ${build.stages
      .map(
        (s, i) => `
      <li class="flow-step">
        <span class="flow-dot">${i + 1}</span>
        <div class="flow-text">
          <h3 class="h5">${esc(s.name)}</h3>
          <p class="body-xs">${esc(s.body)}</p>
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
  <p class="lede">${esc(proc.lead)}</p>
  <div class="stack">
    ${proc.steps.slice(0, 3).map(stepCard).join("")}
  </div>`
);

const p7 = page(
  "07",
  "How we work",
  `
  <div class="stack stack-top">
    ${proc.steps.slice(3).map(stepCard).join("")}
  </div>
  <p class="note">${esc(proc.note)}</p>`
);

const p8 = page(
  "08",
  "Why ArchFlow",
  `
  <h2 class="h2">${esc(proc.whyTitle)}</h2>
  <p class="lede">${esc(proc.whyLead)}</p>
  <div class="stack">
    ${proc.comparisons
      .map(
        (c) => `
      <article class="cmp">
        <h3 class="h4">${esc(c.option)}</h3>
        <div class="cmp-cols">
          <div class="cmp-them">
            <span class="cmp-label">Usually</span>
            <p>${esc(c.reality)}</p>
          </div>
          <div class="cmp-us">
            <span class="cmp-label">With ArchFlow</span>
            <p>${esc(c.archflow)}</p>
          </div>
        </div>
      </article>`
      )
      .join("")}
  </div>`
);

const p9 = page(
  "09",
  "The proof",
  `
  <h2 class="h2">${esc(proof.title)}</h2>
  <p class="lede">${esc(proof.lead)}</p>
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
  ${proof.narrative.map((p) => `<p class="body">${esc(p)}</p>`).join("")}`
);

const p10 = page(
  "10",
  "The proof",
  `
  <div class="stack-top">
    <h2 class="h3">What changed</h2>
    <ul class="changes">
      ${proof.changes.map((c) => `<li>${esc(c)}</li>`).join("")}
    </ul>
    <p class="visit">${esc(proof.visitLine)}</p>
  </div>`
);

const p11 = page(
  "11",
  "Industries",
  `
  <h2 class="h2">${esc(proof.industriesTitle)}</h2>
  <p class="lede">${esc(proof.industriesLead)}</p>
  <div class="verts">
    ${proof.industries
      .map(
        (v) => `
      <article class="vert">
        <h3 class="h5">${esc(v.name)}</h3>
        <p class="body-xs">${esc(v.line)}</p>
      </article>`
      )
      .join("")}
  </div>
  <p class="note">${esc(proof.industriesNote)}</p>`
);

const p12 = `
<section class="page back">
  <div class="cover-glow"></div>
  <div class="back-inner">
    <h2 class="back-h">${esc(proof.closeTitle)}</h2>
    <p class="back-body">${esc(proof.closeBody)}</p>
    <p class="back-action">${esc(proof.closeAction)}</p>
    <div class="back-contact">
      <div><span class="bc-label">Email</span><span class="bc-value">harsh@archflow.co.in</span></div>
      <div><span class="bc-label">Phone</span><span class="bc-value">+91 79880 19331</span></div>
      <div><span class="bc-label">Web</span><span class="bc-value">archflow.co.in</span></div>
      <div><span class="bc-label">Office</span><span class="bc-value">Sector 82, Mohali</span></div>
    </div>
  </div>
  <img class="back-logo" src="${assets.logoFull}" alt="ArchFlow" />
</section>`;

/* ── document ────────────────────────────────────────────────────── */

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>ArchFlow — Booklet</title>
<style>
@font-face { font-family:'Manrope'; src:url('${assets.manrope}') format('woff2');
  font-weight:200 800; font-display:block; }
@font-face { font-family:'InterVar'; src:url('${assets.inter}') format('woff2');
  font-weight:100 900; font-display:block; }

:root {
  --ink:#0b0d14; --ink-soft:#3d4557; --muted:#666e82;
  --line:#e3e6ec; --line-soft:#eef0f4;
  --paper:#ffffff; --paper-2:#f7f8fa;
  --flow:#4353f0; --flow-dark:#3340d4; --flow-light:#eef0fe;
  --dark:#05060a;
}
* { margin:0; padding:0; box-sizing:border-box;
  -webkit-print-color-adjust:exact; print-color-adjust:exact; }
html { font-size:9.4pt; }
body { font-family:'InterVar',system-ui,sans-serif; color:var(--ink);
  background:var(--paper); -webkit-font-smoothing:antialiased; }

@page { size: A5; margin: 0; }
.page { position:relative; width:148mm; height:210mm; overflow:hidden;
  background:var(--paper); page-break-after:always; break-after:page; }
.page:last-child { page-break-after:auto; break-after:auto; }
.page-body { padding:20mm 14mm 15mm; }

/* running heads */
.ph { position:absolute; top:9mm; left:14mm; right:14mm;
  display:flex; justify-content:space-between; align-items:center;
  font-size:6.4pt; letter-spacing:.13em; text-transform:uppercase;
  color:var(--muted); border-bottom:0.4pt solid var(--line); padding-bottom:2.2mm; }
.ph-brand { display:flex; align-items:center; gap:1.8mm; font-family:'Manrope';
  font-weight:800; font-size:7.6pt; letter-spacing:.01em; text-transform:none;
  color:var(--ink); }
.ph-brand img { width:3.6mm; height:3.6mm; border-radius:.8mm; }
.ph-eyebrow { color:var(--flow); font-weight:600; }
.pf { position:absolute; bottom:9mm; right:14mm; font-size:7pt;
  color:var(--muted); font-family:'Manrope'; font-weight:700; }

/* type scale */
.h2 { font-family:'Manrope'; font-weight:800; font-size:17pt; line-height:1.08;
  letter-spacing:-0.025em; margin-bottom:3.5mm; }
.h3 { font-family:'Manrope'; font-weight:800; font-size:12pt;
  letter-spacing:-0.015em; margin-bottom:3mm; }
.h4 { font-family:'Manrope'; font-weight:800; font-size:9.4pt;
  letter-spacing:-0.01em; margin-bottom:1.2mm; }
.h5 { font-family:'Manrope'; font-weight:800; font-size:8.6pt;
  letter-spacing:-0.01em; margin-bottom:0.8mm; }
.lede { font-size:9pt; line-height:1.5; color:var(--ink-soft); margin-bottom:6mm; }
.body { font-size:8.6pt; line-height:1.55; color:var(--ink-soft); margin-bottom:3.5mm; }
.body-sm { font-size:8.2pt; line-height:1.5; color:var(--muted); }
.body-xs { font-size:7.8pt; line-height:1.45; color:var(--muted); }

/* cover */
.cover { background:var(--dark); color:#fff; }
.cover-glow { position:absolute; inset:0;
  background:
    radial-gradient(62% 45% at 80% 12%, rgba(88,101,242,0.32), transparent 70%),
    radial-gradient(55% 40% at 10% 88%, rgba(51,64,212,0.26), transparent 70%); }
.cover-inner { position:relative; padding:30mm 16mm 0; }
.cover-mark { width:15mm; height:15mm; border-radius:3mm; margin-bottom:10mm; }
.cover-h1 { font-family:'Manrope'; font-weight:800; font-size:27pt;
  line-height:1.05; letter-spacing:-0.035em; }
.cover-sub { margin-top:6mm; max-width:100mm; font-size:9.6pt; line-height:1.5;
  color:rgba(255,255,255,0.72); }
.chips { margin-top:11mm; display:flex; flex-wrap:wrap; gap:2mm; }
.chip { border:0.5pt solid rgba(138,150,255,0.45); background:rgba(88,101,242,0.14);
  color:#c9cfff; border-radius:20mm; padding:1.6mm 3.6mm; font-size:7pt; font-weight:600; }
.cover-foot { position:absolute; bottom:12mm; left:16mm; right:16mm;
  display:flex; justify-content:space-between; font-size:6.6pt;
  letter-spacing:.11em; text-transform:uppercase; color:rgba(255,255,255,0.42);
  border-top:0.5pt solid rgba(255,255,255,0.12); padding-top:3mm; }

/* shared blocks */
.stack { display:flex; flex-direction:column; gap:3.2mm; }
.stack-top { margin-top:2mm; display:flex; flex-direction:column; gap:3.2mm; }
.pain { display:grid; grid-template-columns:9mm 1fr; align-items:start;
  border:0.5pt solid var(--line); border-radius:2.4mm; padding:4mm 4mm 4mm 3mm;
  background:var(--paper-2); }
.pain-n { font-family:'Manrope'; font-weight:800; font-size:10pt; color:var(--flow); }
.card { position:relative; border:0.5pt solid var(--line); border-radius:2.4mm;
  padding:4.2mm 4.2mm 4.2mm; background:var(--paper-2); }
.card-n { position:absolute; top:3.4mm; right:4.2mm; font-family:'Manrope';
  font-weight:800; font-size:7.6pt; color:#c3c8d4; }

/* flow */
.flow { list-style:none; position:relative; }
.flow::before { content:''; position:absolute; left:4mm; top:4mm; bottom:4mm;
  width:0.6pt; background:linear-gradient(180deg,var(--flow),#c9cfff); }
.flow-step { position:relative; display:grid; grid-template-columns:11.5mm 1fr;
  align-items:start; padding:2.3mm 0; }
.flow-dot { width:8mm; height:8mm; border-radius:50%; background:var(--flow);
  color:#fff; font-family:'Manrope'; font-weight:800; font-size:8pt;
  display:flex; align-items:center; justify-content:center;
  box-shadow:0 0 0 1.2mm #fff; }
.flow-text { padding-top:0.4mm; }

/* steps */
.step { display:grid; grid-template-columns:19mm 1fr; gap:3mm;
  border:0.5pt solid var(--line); border-radius:2.4mm; padding:4mm;
  background:var(--paper-2); }
.step-when { font-family:'Manrope'; font-weight:800; font-size:8.4pt;
  color:var(--flow); }
.step-deliver { margin-top:2mm; font-size:7.6pt; color:var(--ink-soft); }
.step-deliver span { display:inline-block; background:var(--flow-light);
  color:var(--flow-dark); font-weight:700; border-radius:1mm; padding:0.4mm 1.6mm;
  margin-right:1.6mm; font-size:6.6pt; text-transform:uppercase; letter-spacing:.07em; }

/* comparisons */
.cmp { border:0.5pt solid var(--line); border-radius:2.4mm; overflow:hidden; }
.cmp .h4 { padding:3.4mm 4mm 0; margin-bottom:2.4mm; }
.cmp-cols { display:grid; grid-template-columns:1fr 1fr; }
.cmp-them, .cmp-us { padding:0 4mm 4mm; }
.cmp-us { background:var(--flow-light); padding-top:3.4mm; margin-top:-3.4mm; }
.cmp-label { display:block; font-size:6.4pt; text-transform:uppercase;
  letter-spacing:.11em; margin-bottom:1.2mm; font-weight:700; color:var(--muted); }
.cmp-us .cmp-label { color:var(--flow-dark); }
.cmp-them p { font-size:7.8pt; line-height:1.45; color:var(--muted); }
.cmp-us p { font-size:7.8pt; line-height:1.45; color:var(--ink); }

/* proof */
.stat-band { display:grid; grid-template-columns:repeat(4,1fr);
  background:var(--dark); border-radius:2.4mm; padding:4.5mm 3mm; margin-bottom:6mm; }
.stat { text-align:center; }
.stat-v { display:block; font-family:'Manrope'; font-weight:800; font-size:15pt;
  color:#fff; letter-spacing:-0.03em; }
.stat-l { display:block; margin-top:1mm; font-size:6pt; text-transform:uppercase;
  letter-spacing:.08em; color:#8f97ad; line-height:1.3; }
.changes { list-style:none; }
.changes li { position:relative; padding-left:5mm; font-size:8.2pt; line-height:1.5;
  color:var(--ink-soft); margin-bottom:3.4mm; }
.changes li::before { content:''; position:absolute; left:0; top:1.5mm;
  width:2.2mm; height:2.2mm; border-radius:50%; background:var(--flow); }
.visit { margin-top:5mm; padding:4mm; border-radius:2.4mm; background:var(--flow-light);
  color:var(--flow-dark); font-size:8.2pt; font-weight:600; line-height:1.45; }

/* industries */
.verts { display:grid; grid-template-columns:1fr 1fr; gap:3.4mm 4mm; }
.vert { border-left:1.2pt solid var(--flow); padding:0.5mm 0 0.5mm 3.4mm; }
.note { margin-top:6mm; font-size:7.8pt; color:var(--muted);
  border-top:0.5pt solid var(--line); padding-top:3mm; line-height:1.45; }

/* back cover */
.back { background:var(--dark); color:#fff; }
.back-inner { position:relative; padding:30mm 16mm 0; }
.back-h { font-family:'Manrope'; font-weight:800; font-size:20pt; line-height:1.1;
  letter-spacing:-0.03em; }
.back-body { margin-top:5mm; font-size:9.2pt; line-height:1.55;
  color:rgba(255,255,255,0.72); }
.back-action { margin-top:5mm; display:inline-block; background:var(--flow);
  color:#fff; font-weight:700; font-size:8.6pt; padding:2.6mm 5mm; border-radius:20mm; }
.back-contact { margin-top:11mm; display:grid; grid-template-columns:1fr 1fr;
  gap:4.5mm 5mm; border-top:0.5pt solid rgba(255,255,255,0.14); padding-top:6mm; }
.bc-label { display:block; font-size:6.4pt; text-transform:uppercase;
  letter-spacing:.11em; color:#8f97ad; margin-bottom:0.9mm; }
.bc-value { display:block; font-size:8.8pt; color:#fff; font-weight:600; }
.back-logo { position:absolute; bottom:11mm; left:16mm; width:46mm; border-radius:1.6mm; }
</style>
</head>
<body>
${p1}${p2}${p3}${p4}${p5}${p6}${p7}${p8}${p9}${p10}${p11}${p12}
</body>
</html>`;

const htmlPath = path.join(OUT_DIR, "brochure.html");
fs.writeFileSync(htmlPath, html);
console.log("HTML written:", Math.round(html.length / 1024) + "KB");

const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const pdfPath = process.argv[2] || path.join(OUT_DIR, "ArchFlow-Booklet.pdf");

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

console.log(
  "PDF written:",
  pdfPath,
  Math.round(fs.statSync(pdfPath).size / 1024) + "KB"
);
