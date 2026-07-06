import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Brand lockup: the real 3D logo mark + the two-tone wordmark
 * ("Arch" metallic white · "Flow" royal blue), matching logo-full.png.
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
      <Image
        src="/brand/logo-mark-512.png"
        alt=""
        width={34}
        height={34}
        priority
        className="h-[34px] w-[34px] transition-transform duration-500 group-hover:scale-105"
      />
      <span className="font-display text-lg font-extrabold tracking-tight">
        <span className="text-foreground">Arch</span>
        <span className="text-flow">Flow</span>
      </span>
    </Link>
  );
}
