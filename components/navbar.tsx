"use client";

import { useCallback, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Menu, X } from "lucide-react";
import { Img } from "@/components/img";
import { TEST_DRIVE_WHATSAPP_URL } from "@/lib/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/#full-lineup", label: "Models" },
  { href: "/pricelist", label: "Prices" },
  { href: "/why-byd", label: "Why BYD" },
  { href: "/charging", label: "Charging" },
];

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();
  const close = useCallback(() => setNavOpen(false), []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.startsWith("/#") && pathname === href;

  // On the home page the logo must return to the top, not stay at the
  // current scroll position. From any other page the Link handles it.
  const goHome = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      close();
      if (pathname !== "/") return;
      e.preventDefault();
      window.history.replaceState(null, "", "/");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    },
    [close, pathname]
  );

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-theme bg-theme/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-2 px-5 sm:px-6">
          <Link
            href="/"
            onClick={goHome}
            className="flex min-h-11 shrink-0 items-center gap-1 text-sm text-white"
            aria-label="BYD Miri home"
          >
            <Img src="/byd-logo-white.svg" alt="BYD" className="-mt-[2px] h-4 w-auto" />
            <span className="font-wordmark ml-2 text-[11px] sm:text-xs">| MIRI</span>
          </Link>

          {/* Desktop links — one shared breakpoint on every page */}
          <div className="ml-auto hidden items-center gap-0.5 md:flex lg:gap-1">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors ${
                    active ? "text-theme-90" : "text-theme-50 hover:text-theme-90"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              onClick={close}
              className="ml-2 inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-4 text-sm font-semibold"
              style={{ color: "var(--cz-accent-ink)" }}
            >
              <CalendarCheck size={14} aria-hidden />
              Book test drive
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setNavOpen((o) => !o)}
            className="-mr-2 ml-auto flex h-11 w-11 items-center justify-center rounded-lg text-theme-70 transition-colors hover:bg-white/5 hover:text-theme md:hidden"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            aria-expanded={navOpen}
          >
            {navOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {navOpen && (
          <div
            className="border-t bg-theme/95 backdrop-blur-xl md:hidden"
            style={{ borderColor: "var(--cz-border)" }}
          >
            <div className="mx-auto flex max-w-[1240px] flex-col px-4 py-3">
              {NAV.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-12 items-center rounded-lg px-3 text-base font-medium transition-colors hover:bg-white/5 ${
                      active ? "text-theme" : "text-theme-70 hover:text-theme"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/#contact"
                onClick={close}
                className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-3 text-base font-semibold"
                style={{ color: "var(--cz-accent-ink)" }}
              >
                <CalendarCheck size={17} aria-hidden />
                Book a test drive
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile conversion bar — always one tap from a booking or a call. */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-theme bg-theme/95 backdrop-blur-xl md:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-[1240px] items-center gap-2 px-4 pt-3">
          <a
            href={TEST_DRIVE_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-outline inline-flex min-h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            aria-label="Book a test drive on WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="19" height="19" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
          <Link
            href="/#contact"
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-bold"
            style={{ color: "var(--cz-accent-ink)" }}
          >
            <CalendarCheck size={16} aria-hidden />
            Book a test drive
          </Link>
        </div>
      </div>
    </>
  );
}
