import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="ArchFlow home"
      className={cn(
        "group inline-flex items-center gap-2 text-foreground transition-opacity hover:opacity-90",
        className
      )}
    >
      <span className="relative grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-glow">
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M2 13L8 2L14 13M5 9H11"
            stroke="#020617"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-base font-semibold tracking-tight">ArchFlow</span>
    </Link>
  );
}
