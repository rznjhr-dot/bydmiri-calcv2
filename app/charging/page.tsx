"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BatteryCharging, MapPin, Menu, X, Zap, Wallet, Shield } from "lucide-react";
import { Img } from "@/components/img";
import ChargingEstimator from "@/components/charging-estimator";
import FuelSavingsCalculator from "@/components/fuel-savings-calculator";
import WarrantyDetails from "@/components/warranty-details";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#full-lineup", label: "Models" },
  { href: "/why-byd", label: "Why BYD" },
  { href: "/charging", label: "Charging, Savings & Warranty" },
  { href: "/#contact", label: "Contact Us" },
];

export default function ChargingPage() {
  const [navOpen, setNavOpen] = useState(false);

  // Deep links such as /charging#warranty are resolved by the browser before
  // this client component hydrates, so the target can be missed (or land short
  // while layout settles). Re-scroll once mounted.
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    // The page grows after mount (estimators load, fonts settle), so a single
    // early scroll can land short. Keep correcting until the document height
    // stops changing, then stop.
    let lastH = -1;
    let stable = 0;
    let raf = 0;
    const tick = () => {
      const h = document.documentElement.scrollHeight;
      if (h === lastH) {
        stable += 1;
      } else {
        lastH = h;
        stable = 0;
      }
      el.scrollIntoView({ block: "start", behavior: "instant" as ScrollBehavior });
      if (stable < 6) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-theme/80 backdrop-blur-xl border-b border-[color:var(--cz-border)]">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-theme shrink-0" aria-label="BYD Miri Home">
            <Img src="/byd-logo-white.svg" alt="BYD" className="h-3.5 w-auto -mt-[2px]" />
            <span className="font-wordmark text-[11px] ml-2">| MIRI</span>
          </Link>

          <div className="hidden sm:flex items-center gap-1 md:gap-3 ml-auto">
            {navLinks.map((item) => {
              const active = item.href === "/charging";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`hover:text-theme-90 transition-colors shrink-0 text-[11px] font-medium px-2 py-3 whitespace-nowrap ${
                    active ? "text-theme-90" : "text-theme-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => setNavOpen((o) => !o)}
            className="sm:hidden ml-auto w-11 h-11 -mr-2 flex items-center justify-center rounded-lg text-theme-70 hover:text-theme hover:bg-white/5 transition-colors"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            aria-expanded={navOpen}
          >
            {navOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {navOpen && (
          <div className="sm:hidden border-t bg-theme/95 backdrop-blur-xl" style={{ borderColor: "var(--cz-border)" }}>
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setNavOpen(false)}
                  aria-current={item.href === "/charging" ? "page" : undefined}
                  className={`flex items-center min-h-11 px-3 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors ${
                    item.href === "/charging" ? "text-theme" : "text-theme-70 hover:text-theme"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* ── Hero ── */}
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-theme">
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <span className="label-mono justify-center mb-5">
              <BatteryCharging size={12} />
              Charging · Savings · Warranty
            </span>
            <h1 className="font-display text-[34px] sm:text-5xl md:text-6xl mb-5">
              <span className="text-theme-90">Run the numbers</span>
              <br />
              <strong className="text-accent">before you commit.</strong>
            </h1>
            <p className="text-base md:text-lg text-theme-50 max-w-2xl mx-auto leading-relaxed">
              Estimate BYD charging time and cost, compare what you spend on petrol today, and read the
              warranty cover in plain language — all in one place for Miri, Sarawak buyers.
            </p>
          </div>
        </section>

        {/* ── At a glance ── */}
        <section className="relative px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-[color:var(--cz-border)] bg-theme-alt">
              {[
                { icon: Zap, value: "~RM11", label: "Home charge 20% → 80%" },
                { icon: Wallet, value: "90% less", label: "Fuel cost per km vs petrol" },
                { icon: Shield, value: "6 + 8 yr", label: "Vehicle + battery warranty" },
              ].map((s) => (
                <div key={s.label} className="bg-theme-card px-5 py-6 text-center">
                  <s.icon size={16} className="text-accent mx-auto mb-2" />
                  <div className="font-data text-xl font-semibold text-theme-90 tabular-nums">{s.value}</div>
                  <div className="text-[11px] text-theme-40 mt-1 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Charging estimator ── */}
        <section className="relative px-6 py-12 md:py-16 overflow-hidden scroll-mt-24 bg-theme">
          <div className="absolute inset-0 bg-theme-alt" />
          <div className="absolute inset-0 parking-lot-bg opacity-15" />
          <div className="max-w-6xl mx-auto relative">
            <div className="mb-6">
              <span className="label-mono mb-3">
                <Zap size={12} />
                Charging
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-theme-90">Charging Time &amp; Cost</h2>
              <p className="text-sm text-theme-40 mt-2 max-w-2xl">
                Pick a model and charger to see how long a 20% → 80% top-up takes and what it costs at
                Sarawak domestic tariffs.
              </p>
            </div>
            <ChargingEstimator />
          </div>
        </section>

        {/* ── Fuel savings ── */}
        <section className="relative px-6 py-12 md:py-16 overflow-hidden bg-theme">
          <div className="absolute inset-0 parking-lot-bg opacity-20" />
          <div className="max-w-6xl mx-auto relative">
            <div className="mb-6">
              <span className="label-mono mb-3">
                <Wallet size={12} />
                Savings
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-theme-90">Fuel vs EV Running Cost</h2>
              <p className="text-sm text-theme-40 mt-2 max-w-2xl">
                Compare your current petrol spend against charging an EV over a year of driving.
              </p>
            </div>
            <FuelSavingsCalculator />
          </div>
        </section>

        {/* ── Warranty ── */}
        <section id="warranty" className="relative px-6 pt-12 pb-10 md:pt-16 md:pb-12 overflow-hidden scroll-mt-24 bg-theme">
          <div className="absolute inset-0 bg-theme-alt" />
          <div className="absolute inset-0 parking-lot-bg opacity-15" />
          <div className="max-w-6xl mx-auto relative">
            <div className="mb-6">
              <span className="label-mono mb-3">
                <Shield size={12} />
                Warranty
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-theme-90">Warranty Coverage</h2>
              <p className="text-sm text-theme-40 mt-2 max-w-2xl">
                Vehicle, battery, drive unit and servicing terms as they apply to BYD vehicles sold in
                Malaysia.
              </p>
            </div>
            <WarrantyDetails />
          </div>
          {/* Trailing space so /charging#warranty can scroll this section to the
              top of the viewport instead of stopping at the document end. */}
          <div aria-hidden="true" className="h-[min(70vh,560px)]" />
        </section>

        {/* ── CTA ── */}
        <section className="relative px-6 pt-12 pb-20 md:pb-28 overflow-hidden">
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--cz-bg) 0%, var(--cz-bg-alt) 50%, var(--cz-bg) 100%)" }} />
          <div className="max-w-2xl mx-auto relative text-center">
            <span className="label-mono justify-center mb-4">
              <MapPin size={12} />
              Miri Showroom · Sarawak
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-theme-90 mb-3">Questions about running costs?</h2>
            <p className="text-sm text-theme-50 mb-6 max-w-lg mx-auto">
              Talk to Ridzuan about charging at home, your daily route, and what the warranty covers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/#contact"
                className="hero-cta inline-flex items-center justify-center gap-2.5 bg-accent px-8 py-3.5 rounded-full font-bold text-sm"
                style={{ color: "var(--cz-accent-ink)" }}
              >
                Talk to Ridzuan
              </Link>
              <Link
                href="/why-byd"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full border border-[color:var(--cz-border-strong)] text-theme-70 text-sm font-semibold hover:bg-theme-alt hover:text-theme transition-all"
              >
                Why BYD?
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[color:var(--cz-border)] py-8 px-6 text-center">        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-theme-20">
            Charging times, costs and savings are estimates. Actual figures vary with driving style, tariff and conditions.
          </p>
          <p className="text-xs text-theme-20 mt-1.5">&copy; 2026 Ridzuan Jahari. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
