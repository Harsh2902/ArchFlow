"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Floating glass navigation. Sits detached from the top edge inside a
 * rounded capsule that solidifies on scroll. A thin flow-gradient
 * progress bar tracks reading position along the very top of the
 * viewport.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Reading progress — flow gradient hairline at the top */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-flow-400 via-flow-500 to-flow-700"
      />

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <div
          className={cn(
            "mx-auto flex h-14 max-w-[1220px] items-center justify-between rounded-2xl border px-4 transition-all duration-300 sm:px-5",
            scrolled
              ? "border-foreground/[0.08] bg-background/85 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md md:backdrop-blur-lg"
              : "border-transparent bg-background/40 backdrop-blur-sm"
          )}
        >
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
                  <span
                    aria-hidden
                    className={cn(
                      "ease-spring absolute inset-x-3 -bottom-0.5 h-px origin-left bg-flow-400 transition-transform duration-300 group-hover:scale-x-100",
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

        {/* Mobile sheet */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-2 max-w-[1220px] overflow-hidden rounded-2xl border border-foreground/[0.08] bg-background/95 backdrop-blur-md md:hidden"
            >
              <div className="flex flex-col gap-1 p-4">
                {site.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-3 text-base text-foreground hover:bg-foreground/[0.05]"
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
    </>
  );
}
