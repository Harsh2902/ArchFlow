import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/brand/logo";
import { IstClock } from "@/components/layout/ist-clock";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-foreground/[0.06] bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flow-500/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 mesh-bg" />

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
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Site
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="link-underline text-foreground/80 hover:text-flow-300 transition-colors"
                >
                  Home
                </Link>
              </li>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-foreground/80 hover:text-flow-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Contact
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline text-foreground/80 hover:text-flow-300 transition-colors"
                >
                  {site.email}
                </a>
              </li>
              <li className="text-foreground/80">{site.phone}</li>
              <li className="text-foreground/80">{site.address}</li>
            </ul>
          </div>
        </div>

        {/* Monumental wordmark — the real render on an intentional dark
            plate, so the PNG's black canvas is framed (not floating) in
            BOTH themes */}
        <div className="relative mt-16 overflow-hidden rounded-3xl border border-foreground/10 bg-[#07080d] shadow-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_100%_at_50%_0%,rgba(88,101,242,0.14),transparent_65%)]" />
          <Image
            src="/brand/logo-full.png"
            alt="ArchFlow"
            width={940}
            height={415}
            className="mx-auto w-full max-w-3xl"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-foreground/[0.06] pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
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
