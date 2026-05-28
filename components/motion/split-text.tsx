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
 * Character-level reveal that is robust without JavaScript.
 *
 * The animation is pure CSS (keyframe `char-rise` in globals.css with
 * per-character `animation-delay`), so:
 *   - With JS disabled, the CSS animation still auto-plays and the text
 *     ends fully visible with real spaces between words.
 *   - With `prefers-reduced-motion`, a media query pins every character
 *     visible and disables the animation.
 *   - Screen readers read the plain `aria-label` on the wrapper; the
 *     per-character spans are aria-hidden.
 *
 * Real space characters sit between word groups so spacing survives even
 * if styling fails. Word groups are inline-block so a word never breaks
 * across lines mid-character.
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
    <span className={cn("split-text", className)} aria-label={text}>
      {words.map((word, wi) => {
        const bare = word.replace(/[.,!?'"]/g, "");
        const isHighlight = !!highlight && bare === highlight;
        const chars = Array.from(word);

        const wordGroup = (
          <span
            key={`w-${wi}`}
            aria-hidden="true"
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

        // Account for the inter-word space in the stagger timing so the
        // rhythm stays even across the whole line.
        charCounter += 1;

        return (
          <span key={`grp-${wi}`}>
            {wordGroup}
            {wi < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}
