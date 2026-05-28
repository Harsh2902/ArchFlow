import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { IstClock } from "@/components/layout/ist-clock";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-background">
      {/* Faint gradient backdrop */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50 mesh-bg" />

      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="space-y-5 md:col-span-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Custom workflow and MIS platforms for India&apos;s manufacturers,
              fabricators, and project-based businesses.
            </p>
            <IstClock />
          </div>

          <div className="space-y-4 md:col-span-3">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
              Site
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="link-underline text-foreground/80 hover:text-emerald-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-foreground/80 hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 md:col-span-4">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
              Contact
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline text-foreground/80 hover:text-emerald-400 transition-colors"
                >
                  {site.email}
                </a>
              </li>
              <li className="text-foreground/80">{site.phone}</li>
              <li className="text-foreground/80">{site.address}</li>
            </ul>
          </div>

        </div>

        {/* Massive wordmark */}
        <div className="relative mt-16 overflow-hidden">
          <p
            aria-hidden
            className="select-none whitespace-nowrap text-center font-display text-[18vw] leading-[0.85] tracking-tightest text-foreground/5 sm:text-[14vw]"
          >
            ArchFlow.
          </p>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} ArchFlow. Made with care in
            Chandigarh.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="link-underline hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="link-underline hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
