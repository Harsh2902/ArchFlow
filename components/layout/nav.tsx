"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        // Lighter blur on mobile (heavy backdrop-blur during scroll adds
        // GPU cost on iOS); full blur from md up.
        scrolled
          ? "border-b border-white/5 bg-background/90 backdrop-blur-md md:bg-background/80 md:backdrop-blur-xl"
          : "border-b border-transparent bg-background/50 backdrop-blur-sm md:bg-background/30"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {/* FIX 10C — underline grows from left on hover with a
                    spring-like overshoot easing; pinned for active route */}
                <span
                  aria-hidden
                  className={cn(
                    "ease-spring absolute inset-x-3 -bottom-0.5 h-px origin-left bg-emerald-400 transition-transform duration-300 group-hover:scale-x-100",
                    active ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button asChild size="sm" className="ml-1">
            <Link href="/contact">Book a call</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/5 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-3 text-base text-foreground hover:bg-white/[0.04]"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-2">
                <Link href="/contact">Book a call</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
