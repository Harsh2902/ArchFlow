/**
 * ArchFlow meeting booklet — print build.
 *
 * Generates a 12-page A5 booklet from content.json and prints it to PDF
 * via headless Chrome. Fonts and the logo travel inside the file as data
 * URIs, so the PDF is self-contained at any print shop.
 *
 *   node brochure/build.js [outputPath.pdf]
 *
 * Format: A5 (148x210mm), 12 pages — a multiple of 4, so it saddle-
 * stitches (printed 2-up on A4, folded, stapled). Pages are in reading
 * order; the press handles imposition.
 *
 * Design: light and dark pages alternate so the booklet has rhythm when
 * flipped — the cover, the order lifecycle, the proof and the back cover
 * are full-bleed dark; everything else is paper-white.
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

/* ── brand marks ─────────────────────────────────────────────────────
   The vector lockup is used on light pages (the photoreal PNG carries a
   black plate). Peak and fragment inherit currentColor; the ribbon keeps
   the brand gradient, defined once in a hidden SVG below.              */

const MARK_SVG = (size) => `
<svg class="mk" width="${size}" height="${size}" viewBox="0 0 100 100" fill="none">
  <path d="M50 6 L89 72 L70 65.5 L50 30 L30 65.5 L11 72 Z" fill="currentColor"/>
  <path d="M4 79 C 26 64, 52 63, 72 69 C 82 72, 90 69, 97 61 C 90 81, 64 88, 40 84 C 26 81.5, 12 83, 4 79 Z" fill="url(#mf)"/>
  <path d="M78 88 L94 83 L90 94 Z" fill="currentColor"/>
</svg>`;

/** Full lockup: mark + two-tone wordmark. Works on light or dark. */
const lockup = (size = 5.4) => `
<span class="lockup" style="--mk:${size}mm">
  ${MARK_SVG(24)}
  <span class="wordmark"><span class="wm-arch">Arch</span><span class="wm-flow">Flow</span></span>
</span>`;

/* ── page furniture ──────────────────────────────────────────────── */

const head = (eyebrow) => `
  <header class="ph">${lockup()}<span class="ph-eyebrow">${esc(eyebrow)}</span></header>`;

const foot = (n) => `<footer class="pf">${n}</footer>`;

const page = (n, eyebrow, body, dark = false) => `
<section class="page${dark ? " dark-page" : ""}">
  ${dark ? '<div class="glow"></div><div class="grid-dots"></div>' : ""}
  ${head(eyebrow)}
  <div class="page-body">${body}</div>
  ${foot(n)}
</section>`;

/** Section title with the blue kicker rule above it. */
const title = (t, kicker) => `
  <div class="sec-head">
    <span class="kicker">${esc(kicker)}</span>
    <h2 class="h2">${esc(t)}</h2>
  </div>`;

const platformCard = (p, i) => `
  <article class="card">
    <span class="card-n">${String(i + 1).padStart(2, "0")}</span>
    <h3 class="h4">${esc(p.name)}</h3>
    <p class="body-sm">${esc(p.body)}</p>
  </article>`;

const stepCard = (s) => `
  <article class="step">
    <div class="step-rail"><span class="step-when">${esc(s.when)}</span></div>
    <div class="step-main">
      <h3 class="h4">${esc(s.title)}</h3>
      <p class="body-sm">${esc(s.body)}</p>
      <p class="step-deliver"><span>You get</span> ${esc(s.deliverable)}</p>
    </div>
  </article>`;

/* ── pages ───────────────────────────────────────────────────────── */

const p1 = `
<section class="page cover">
  <div class="glow"></div>
  <div class="grid-dots"></div>
  <div class="cover-inner">
    <img class="cover-logo" src="${assets.logoFullT}" alt="ArchFlow" />
    <h1 class="cover-h1">${esc(cover.headline)}</h1>
    <p class="cover-sub">${esc(cover.subline)}</p>
  </div>
  <div class="cover-bottom">
    <div class="chips">
      ${cover.chips.map((c) => `<span class="chip">${esc(c)}</span>`).join("")}
    </div>
    <div class="cover-foot">
      <span>Custom workflow &amp; MIS platforms</span>
      <span>archflow.co.in</span>
    </div>
  </div>
</section>`;

const p2 = page(
  "02",
  "The problem",
  `
  ${title(cover.problemTitle, "The problem")}
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
  ${title(build.title, "Capabilities")}
  <p class="lede">${esc(build.lead)}</p>
  <div class="stack">${build.platforms.slice(0, 3).map(platformCard).join("")}</div>`
);

const p4 = page(
  "04",
  "What we build",
  `<div class="stack stack-top">
    ${build.platforms.slice(3).map((p, i) => platformCard(p, i + 3)).join("")}
  </div>`
);

const p5 = page(
  "05",
  "The order lifecycle",
  `
  ${title(build.flowTitle, "How work moves")}
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
  </ol>`,
  true
);

const p6 = page(
  "06",
  "How we work",
  `
  ${title(proc.title, "The engagement")}
  <p class="lede">${esc(proc.lead)}</p>
  <div class="stack">${proc.steps.slice(0, 3).map(stepCard).join("")}</div>`
);

const p7 = page(
  "07",
  "How we work",
  `
  <div class="stack stack-top">${proc.steps.slice(3).map(stepCard).join("")}</div>
  <p class="note">${esc(proc.note)}</p>`
);

const p8 = page(
  "08",
  "Why ArchFlow",
  `
  ${title(proc.whyTitle, "The alternatives")}
  <p class="lede">${esc(proc.whyLead)}</p>
  <div class="stack">
    ${proc.comparisons
      .map(
        (c) => `
      <article class="cmp">
        <h3 class="cmp-title">${esc(c.option)}</h3>
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
  ${title(proof.title, "Live deployment")}
  <p class="lede">${esc(proof.lead)}</p>
  <div class="stats">
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
  ${proof.narrative.map((p) => `<p class="body">${esc(p)}</p>`).join("")}`,
  true
);

const p10 = page(
  "10",
  "The proof",
  `
  <div class="stack-top">
    ${title("What changed", "On the floor")}
    <ul class="changes">${proof.changes.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
    <p class="visit">${esc(proof.visitLine)}</p>
  </div>`
);

const p11 = page(
  "11",
  "Industries",
  `
  ${title(proof.industriesTitle, "Where we work")}
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
  <div class="glow"></div>
  <div class="grid-dots"></div>
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
  <img class="back-logo" src="${assets.logoFullT}" alt="ArchFlow" />
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

:root{
  --ink:#0b0d14; --ink-soft:#39415270; --body:#39414f; --muted:#6a7284;
  --line:#e4e7ed; --paper:#fff; --paper-2:#f8f9fb;
  --flow:#4353f0; --flow-dark:#3340d4; --flow-light:#eff1fe; --flow-pale:#a5b0ff;
  --dark:#05060a;
}
*{margin:0;padding:0;box-sizing:border-box;
  -webkit-print-color-adjust:exact;print-color-adjust:exact}
html{font-size:9.4pt}
body{font-family:'InterVar',system-ui,sans-serif;color:var(--ink);background:var(--paper);
  -webkit-font-smoothing:antialiased}

@page{size:A5;margin:0}
.page{position:relative;width:148mm;height:210mm;overflow:hidden;background:var(--paper);
  page-break-after:always;break-after:page}
.page:last-child{page-break-after:auto;break-after:auto}
.page-body{position:relative;padding:19mm 14mm 15mm}

/* ── dark pages ── */
.dark-page,.cover,.back{background:var(--dark);color:#fff}
.glow{position:absolute;inset:0;
  background:
    radial-gradient(58% 40% at 82% 8%,rgba(88,101,242,.34),transparent 68%),
    radial-gradient(52% 38% at 6% 92%,rgba(51,64,212,.28),transparent 70%)}
.grid-dots{position:absolute;inset:0;opacity:.5;
  background-image:radial-gradient(rgba(255,255,255,.10) .55px,transparent .55px);
  background-size:4.2mm 4.2mm;
  -webkit-mask-image:radial-gradient(75% 60% at 50% 40%,#000,transparent 78%);
  mask-image:radial-gradient(75% 60% at 50% 40%,#000,transparent 78%)}
.dark-page .h2,.dark-page .h4,.dark-page .h5{color:#fff}
.dark-page .lede{color:rgba(255,255,255,.74)}
.dark-page .body{color:rgba(255,255,255,.66)}
.dark-page .body-xs{color:rgba(255,255,255,.60)}
.dark-page .ph{border-bottom-color:rgba(255,255,255,.14)}
.dark-page .ph-eyebrow{color:var(--flow-pale)}
.dark-page .wm-arch{color:#fff}
.dark-page .wm-flow{color:var(--flow-pale)}
/* recolour the lockup itself: the mark uses color:inherit, and a rule
   targeting .mk directly ties on specificity and loses on order */
.dark-page .lockup{color:#fff}
.dark-page .kicker{color:var(--flow-pale)}
.dark-page .kicker::before{background:var(--flow-pale)}
.dark-page .pf{color:rgba(255,255,255,.38)}

/* ── brand lockup ── */
.lockup{display:inline-flex;align-items:center;gap:1.8mm;color:var(--ink)}
.lockup .mk{width:var(--mk);height:var(--mk);color:inherit}
.wordmark{font-family:'Manrope';font-weight:800;font-size:8.4pt;letter-spacing:-.02em;
  text-transform:none}
.wm-arch{color:var(--ink)}
.wm-flow{color:var(--flow)}

/* ── running head / foot ── */
.ph{position:absolute;top:9mm;left:14mm;right:14mm;display:flex;justify-content:space-between;
  align-items:center;border-bottom:.4pt solid var(--line);padding-bottom:2.4mm}
.ph-eyebrow{font-size:6.2pt;letter-spacing:.14em;text-transform:uppercase;
  color:var(--flow);font-weight:700}
.pf{position:absolute;bottom:9mm;right:14mm;font-family:'Manrope';font-weight:800;
  font-size:7.4pt;color:#b9bfcc;letter-spacing:.02em}

/* ── type ── */
.sec-head{margin-bottom:4mm}
.kicker{display:inline-flex;align-items:center;gap:2mm;font-size:6.2pt;font-weight:700;
  letter-spacing:.16em;text-transform:uppercase;color:var(--flow);margin-bottom:2.6mm}
.kicker::before{content:'';width:5mm;height:.9pt;background:var(--flow);display:block}
.h2{font-family:'Manrope';font-weight:800;font-size:16.5pt;line-height:1.1;
  letter-spacing:-.028em}
.h4{font-family:'Manrope';font-weight:800;font-size:9.2pt;letter-spacing:-.012em;
  margin-bottom:1.2mm}
.h5{font-family:'Manrope';font-weight:800;font-size:8.5pt;letter-spacing:-.012em;
  margin-bottom:.8mm}
.lede{font-size:8.8pt;line-height:1.55;color:var(--body);margin-bottom:5.5mm;max-width:104mm}
.body{font-size:8.4pt;line-height:1.6;color:var(--body);margin-bottom:3.2mm}
.body-sm{font-size:8pt;line-height:1.52;color:var(--muted)}
.body-xs{font-size:7.6pt;line-height:1.46;color:var(--muted)}

/* ── cover ── */
.cover-inner{position:relative;padding:26mm 15mm 0}
.cover-logo{width:60mm;margin-bottom:13mm}
.cover-h1{font-family:'Manrope';font-weight:800;font-size:25pt;line-height:1.07;
  letter-spacing:-.035em}
.cover-sub{margin-top:6mm;max-width:98mm;font-size:9.2pt;line-height:1.55;
  color:rgba(255,255,255,.72)}
.cover-bottom{position:absolute;bottom:0;left:0;right:0;padding:0 15mm 12mm}
.chips{display:flex;flex-wrap:wrap;gap:1.8mm;margin-bottom:8mm}
.chip{border:.5pt solid rgba(138,150,255,.42);background:rgba(88,101,242,.15);
  color:#cdd3ff;border-radius:20mm;padding:1.5mm 3.4mm;font-size:6.8pt;font-weight:600}
.cover-foot{display:flex;justify-content:space-between;font-size:6.4pt;letter-spacing:.12em;
  text-transform:uppercase;color:rgba(255,255,255,.40);
  border-top:.5pt solid rgba(255,255,255,.13);padding-top:3.4mm}

/* ── blocks ── */
.stack{display:flex;flex-direction:column;gap:3mm}
.stack-top{margin-top:1mm;display:flex;flex-direction:column;gap:3mm}
.pain{display:grid;grid-template-columns:8.5mm 1fr;align-items:start;
  border-left:1.4pt solid var(--flow);background:var(--paper-2);border-radius:0 2.2mm 2.2mm 0;
  padding:3.8mm 4mm 3.8mm 3mm}
.pain-n{font-family:'Manrope';font-weight:800;font-size:9.5pt;color:var(--flow)}
.card{position:relative;border:.5pt solid var(--line);border-radius:2.2mm;padding:4mm 4.2mm;
  background:#fff;box-shadow:0 .4mm 1.2mm rgba(11,13,20,.035)}
.card-n{position:absolute;top:3.2mm;right:4mm;font-family:'Manrope';font-weight:800;
  font-size:7.2pt;color:#ccd1dc}

/* ── flow (dark page) ── */
.flow{list-style:none;position:relative;margin-top:1mm}
.flow::before{content:'';position:absolute;left:3.9mm;top:5mm;bottom:5mm;width:.7pt;
  background:linear-gradient(180deg,var(--flow-pale),rgba(88,101,242,.25))}
.flow-step{position:relative;display:grid;grid-template-columns:11mm 1fr;align-items:start;
  padding:2.1mm 0}
.flow-dot{width:7.8mm;height:7.8mm;border-radius:50%;
  background:linear-gradient(160deg,#5865f2,#3340d4);color:#fff;font-family:'Manrope';
  font-weight:800;font-size:7.6pt;display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 0 1.1mm #05060a,0 0 3mm rgba(88,101,242,.55)}
.flow-text{padding-top:.4mm}

/* ── steps ── */
.step{display:grid;grid-template-columns:22mm 1fr;border:.5pt solid var(--line);
  border-radius:2.2mm;overflow:hidden;background:#fff}
.step-rail{background:var(--flow-light);padding:4mm 2.5mm;display:flex;align-items:flex-start}
.step-when{font-family:'Manrope';font-weight:800;font-size:7.6pt;color:var(--flow-dark);
  line-height:1.25;white-space:nowrap}
.step-main{padding:4mm 4.2mm}
.step-deliver{margin-top:2mm;font-size:7.5pt;color:var(--body);line-height:1.4}
.step-deliver span{display:inline-block;background:var(--flow);color:#fff;font-weight:700;
  border-radius:.9mm;padding:.4mm 1.5mm;margin-right:1.5mm;font-size:6.2pt;
  text-transform:uppercase;letter-spacing:.08em;vertical-align:1px}

/* ── comparisons ── */
.cmp{border:.5pt solid var(--line);border-radius:2.2mm;overflow:hidden}
.cmp-title{font-family:'Manrope';font-weight:800;font-size:8.8pt;letter-spacing:-.012em;
  padding:3mm 4mm;background:var(--paper-2);border-bottom:.5pt solid var(--line)}
.cmp-cols{display:grid;grid-template-columns:1fr 1fr}
.cmp-them,.cmp-us{padding:3.4mm 4mm}
.cmp-us{background:var(--flow-light);border-left:.5pt solid #dfe3fb}
.cmp-label{display:block;font-size:6.2pt;text-transform:uppercase;letter-spacing:.12em;
  margin-bottom:1.4mm;font-weight:700;color:#98a0b2}
.cmp-us .cmp-label{color:var(--flow-dark)}
.cmp-them p{font-size:7.5pt;line-height:1.45;color:var(--muted)}
.cmp-us p{font-size:7.5pt;line-height:1.45;color:var(--ink)}

/* ── proof ── */
.stats{display:grid;grid-template-columns:repeat(2,1fr);gap:3mm;margin-bottom:6mm}
.stat{border:.5pt solid rgba(255,255,255,.14);border-radius:2.2mm;padding:3.6mm 4mm;
  background:rgba(255,255,255,.035)}
.stat-v{display:block;font-family:'Manrope';font-weight:800;font-size:19pt;color:#fff;
  letter-spacing:-.035em;line-height:1}
.stat-l{display:block;margin-top:1.4mm;font-size:6.2pt;text-transform:uppercase;
  letter-spacing:.1em;color:var(--flow-pale);line-height:1.35}
.changes{list-style:none;margin-top:1mm}
.changes li{position:relative;padding-left:5.2mm;font-size:8.1pt;line-height:1.5;
  color:var(--body);margin-bottom:3.2mm}
.changes li::before{content:'';position:absolute;left:0;top:1.5mm;width:2.2mm;height:2.2mm;
  border-radius:50%;background:var(--flow)}
.visit{margin-top:5mm;padding:4mm 4.4mm;border-radius:2.2mm;background:var(--flow-light);
  border-left:1.4pt solid var(--flow);color:var(--flow-dark);font-size:8.1pt;font-weight:600;
  line-height:1.45}

/* ── industries ── */
.verts{display:grid;grid-template-columns:1fr 1fr;gap:3.2mm 4mm}
.vert{border-left:1.2pt solid var(--flow);padding:.4mm 0 .4mm 3.2mm}
.note{margin-top:5.5mm;font-size:7.6pt;color:var(--muted);border-top:.5pt solid var(--line);
  padding-top:3mm;line-height:1.45}

/* ── back cover ── */
.back-inner{position:relative;padding:27mm 15mm 0}
.back-h{font-family:'Manrope';font-weight:800;font-size:19pt;line-height:1.12;
  letter-spacing:-.03em}
.back-body{margin-top:5mm;font-size:9pt;line-height:1.55;color:rgba(255,255,255,.72)}
.back-action{margin-top:5.5mm;display:inline-block;background:var(--flow);color:#fff;
  font-weight:700;font-size:8.4pt;padding:2.6mm 5.5mm;border-radius:20mm;
  box-shadow:0 1mm 4mm rgba(67,83,240,.4)}
.back-contact{margin-top:11mm;display:grid;grid-template-columns:1fr 1fr;gap:4.5mm 5mm;
  border-top:.5pt solid rgba(255,255,255,.14);padding-top:6mm}
.bc-label{display:block;font-size:6.2pt;text-transform:uppercase;letter-spacing:.12em;
  color:var(--flow-pale);margin-bottom:1mm}
.bc-value{display:block;font-size:8.6pt;color:#fff;font-weight:600}
.back-logo{position:absolute;bottom:12mm;left:15mm;width:44mm}
</style>
</head>
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <linearGradient id="mf" x1="0" y1="0" x2="1" y2="0.3">
    <stop offset="0%" stop-color="#8a96ff"/><stop offset="55%" stop-color="#5865f2"/>
    <stop offset="100%" stop-color="#3340d4"/>
  </linearGradient>
</defs></svg>
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
