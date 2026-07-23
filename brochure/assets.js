/**
 * Regenerates brochure/assets.json — the brand logo and fonts as base64
 * data URIs, so the printed PDF is fully self-contained.
 *
 *   node brochure/assets.js
 *
 * Font paths come from the Next build output (next/font downloads the
 * latin variable files). If they 404 after a dependency bump, re-run
 * `npm run build` and update the hashes below from .next/static/media.
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const MANROPE = ".next/static/media/4c9affa5bc8f420e-s.p.woff2";
const INTER = ".next/static/media/e4af272ccee01ff0-s.p.woff2";

(async () => {
  const assets = {};

  const full = await sharp(path.join(ROOT, "public/brand/logo-full.png"))
    .resize(1100)
    .png({ compressionLevel: 9 })
    .toBuffer();
  assets.logoFull = "data:image/png;base64," + full.toString("base64");

  const mark = await sharp(path.join(ROOT, "public/brand/logo-mark-512.png"))
    .resize(180)
    .png({ compressionLevel: 9 })
    .toBuffer();
  assets.logoMark = "data:image/png;base64," + mark.toString("base64");

  assets.manrope =
    "data:font/woff2;base64," +
    fs.readFileSync(path.join(ROOT, MANROPE)).toString("base64");
  assets.inter =
    "data:font/woff2;base64," +
    fs.readFileSync(path.join(ROOT, INTER)).toString("base64");

  fs.writeFileSync(
    path.join(__dirname, "assets.json"),
    JSON.stringify(assets)
  );
  console.log("assets.json written");
})();
