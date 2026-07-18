/**
 * Subtle film-grain noise overlay. Sits above the page at 3% opacity.
 * Uses an inline SVG turbulence so we don't ship a PNG.
 */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      /* Desktop only, and deliberately WITHOUT mix-blend: a fixed
         full-screen blend layer forces the compositor to re-blend the
         entire viewport on every scroll frame (visible as sluggish
         scrolling). Plain low opacity reads almost identically. */
      className="pointer-events-none fixed inset-0 z-[1] hidden opacity-[0.03] md:block"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        backgroundSize: "200px 200px"
      }}
    />
  );
}
