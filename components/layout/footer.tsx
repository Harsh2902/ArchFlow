import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Custom workflow and MIS platforms for India&apos;s
              manufacturers, fabricators, and project-based businesses.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
              Site
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-foreground/80 hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-foreground/80 hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
              Contact
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-foreground/80 hover:text-emerald-400 transition-colors"
                >
                  {site.email}
                </a>
              </li>
              <li className="text-foreground/80">{site.phone}</li>
              <li className="text-foreground/80">{site.address}</li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
              Social
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-emerald-400 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={site.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-emerald-400 transition-colors"
                >
                  X / Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} ArchFlow. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
