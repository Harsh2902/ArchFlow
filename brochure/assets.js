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

/**
 * The brand PNGs are rendered light-on-black with the plate baked in.
 * Placing them on a dark page shows a visible rectangle edge, so we
 * derive an alpha channel from pixel brightness: pure black becomes
 * transparent, the silver peak and blue ribbon keep their colour. The
 * result composites cleanly onto any dark background — the same result
 * a screen blend would give, but baked in so print honours it.
 */
async function transparentise(file, width) {
  const { data, info } = await sharp(file)
    .resize(width)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const lum = Math.max(data[i], data[i + 1], data[i + 2]);
    data[i + 3] = lum;
  }
  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    // palette quantisation keeps the file small enough to embed twice;
    // the mark is flat silver + a blue gradient, so 256 colours is ample
    .png({ compressionLevel: 9, palette: true, quality: 92, effort: 10 })
    .toBuffer();
}

(async () => {
  const assets = {};

  const fullT = await transparentise(
    path.join(ROOT, "public/brand/logo-full.png"),
    900
  );
  assets.logoFullT = "data:image/png;base64," + fullT.toString("base64");

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
