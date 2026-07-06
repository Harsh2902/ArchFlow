import { cn } from "@/lib/utils";

/**
 * Vector version of the ArchFlow mark — the Λ peak, flow ribbon, and
 * detached fragment as a flat SVG. Theme-aware: the peak/fragment use
 * currentColor (flips with theme), the ribbon is always the brand blue
 * gradient. Use this wherever the photoreal PNG (baked black canvas)
 * would clash — nav, separators, light backgrounds, small sizes.
 */
export function Mark({
  className,
  size = 28
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id="mark-flow" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#8a96ff" />
          <stop offset="55%" stopColor="#5865f2" />
          <stop offset="100%" stopColor="#3340d4" />
        </linearGradient>
      </defs>
      {/* Λ peak — currentColor, flips with theme */}
      <path
        d="M50 6 L89 72 L70 65.5 L50 30 L30 65.5 L11 72 Z"
        fill="currentColor"
      />
      {/* flow ribbon */}
      <path
        d="M4 79 C 26 64, 52 63, 72 69 C 82 72, 90 69, 97 61 C 90 81, 64 88, 40 84 C 26 81.5, 12 83, 4 79 Z"
        fill="url(#mark-flow)"
      />
      {/* fragment */}
      <path d="M78 88 L94 83 L90 94 Z" fill="currentColor" />
    </svg>
  );
}
