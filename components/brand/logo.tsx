import Link from "next/link";
import { Mark } from "@/components/brand/mark";
import { cn } from "@/lib/utils";

/**
 * Brand lockup: theme-aware vector mark + two-tone wordmark
 * ("Arch" foreground · "Flow" royal-blue gradient). The photoreal PNG
 * (baked black canvas) is reserved for dark brand plates only.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="ArchFlow home"
      className={cn(
        "group inline-flex items-center gap-2.5 transition-opacity hover:opacity-90",
        className
      )}
    >
      <Mark
        size={30}
        className="text-foreground transition-transform duration-500 group-hover:scale-105"
      />
      <span className="font-display text-lg font-extrabold tracking-tight">
        <span className="text-foreground">Arch</span>
        <span className="text-flow">Flow</span>
      </span>
    </Link>
  );
}
