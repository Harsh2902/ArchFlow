import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  /** ms before the first character animates */
  startDelayMs?: number;
  /** ms between each character */
  staggerMs?: number;
  /** a single word to render in emerald italic (matched without trailing punctuation) */
  highlight?: string;
}

/**
 * Character-level reveal that is robust without JavaScript and valid for
 * assistive tech.
 *
 * Accessibility: the full sentence is exposed once via a visually-hidden
 * `sr-only` node; the animated per-character spans are `aria-hidden`. We
 * deliberately do NOT put `aria-label` on the wrapper — a plain <span>
 * has the generic role, where aria-label is prohibited (Lighthouse flags
 * it). Screen readers read the sr-only copy instead.
 *
 * Motion: the animation is pure CSS (.split-char keyframe in globals.css
 * with per-character animation-delay), so it auto-plays even with JS
 * disabled and ends fully visible with real spaces between words. On
 * mobile and under prefers-reduced-motion the characters are pinned
 * visible (see globals.css) so the headline paints instantly — better
 * mobile LCP and no main-thread animation cost.
 */
export function SplitText({
  text,
  className,
  startDelayMs = 0,
  staggerMs = 15,
  highlight
}: SplitTextProps) {
  const words = text.split(" ");
  let charCounter = 0;

  return (
    <span className={cn("split-text", className)}>
      {/* Accessible name for the heading/element, read by screen readers */}
      <span className="sr-only">{text}</span>

      {/* Decorative animated characters — hidden from assistive tech */}
      <span aria-hidden="true">
        {words.map((word, wi) => {
          const bare = word.replace(/[.,!?'"]/g, "");
          const isHighlight = !!highlight && bare === highlight;
          const chars = Array.from(word);

          const wordGroup = (
            <span
              key={`w-${wi}`}
              className={cn(
                "inline-block whitespace-nowrap",
                isHighlight && "font-display italic text-emerald-400"
              )}
            >
              {chars.map((ch, ci) => {
                const delay = startDelayMs + charCounter * staggerMs;
                charCounter += 1;
                return (
                  <span
                    key={ci}
                    className="split-char"
                    style={{ animationDelay: `${delay}ms` }}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
          );

          // Account for the inter-word space in the stagger timing.
          charCounter += 1;

          return (
            <span key={`grp-${wi}`}>
              {wordGroup}
              {wi < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </span>
    </span>
  );
}
