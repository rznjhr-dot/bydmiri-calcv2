"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Battery, BatteryCharging, MapPin, Zap, Wallet, Shield } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ChargingEstimator from "@/components/charging-estimator";
import FuelSavingsCalculator from "@/components/fuel-savings-calculator";
import WarrantyDetails from "@/components/warranty-details";

export default function ChargingPage() {

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
      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* ── Hero ── */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-theme">
          <div className="relative max-w-[1240px] mx-auto px-5 sm:px-6 text-center">
            <span className="label-mono justify-center mb-5">
              <BatteryCharging size={12} />
              Charging · Savings · Warranty
            </span>
            <h1 className="font-display text-[34px] sm:text-5xl md:text-6xl mb-5">
              <span className="text-theme-90">Charge smart.</span>
              <br />
              <strong className="text-accent">Drive for less.</strong>
            </h1>
            <p className="text-base md:text-lg text-theme-50 max-w-2xl mx-auto leading-relaxed">
              Estimate BYD charging time and cost, compare what you spend on petrol today, and read the
              warranty cover in plain language — all in one place for Miri, Sarawak buyers.
            </p>
          </div>
        </section>

        {/* ── At a glance ── */}
        <section className="relative px-5 sm:px-6 pb-14 md:pb-16">
          <div className="max-w-[1240px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-[color:var(--cz-border)] bg-theme-alt">
              {[
                { icon: Zap, value: "~RM11", label: "Home charge 20% → 80%" },
                { icon: Wallet, value: "90% less", label: "Fuel cost per km vs petrol" },
                { icon: Shield, value: "6 + 8 yr", label: "Vehicle + battery warranty" },
              ].map((s) => (
                <div key={s.label} className="bg-theme-card px-5 py-6 text-center">
                  <s.icon size={16} className="text-accent mx-auto mb-2" />
                  <div className="font-data text-xl font-semibold text-theme-90 tabular-nums">{s.value}</div>
                  <div className="text-[11px] text-theme-50 mt-1 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Charging estimator ── */}
        <section className="relative px-5 sm:px-6 py-14 md:py-20 overflow-hidden scroll-mt-24 bg-theme">
          <div className="absolute inset-0 bg-theme-alt" />
          <div className="absolute inset-0 parking-lot-bg opacity-15" />
          <div className="max-w-[1240px] mx-auto relative">
            <div className="mb-6">
              <span className="label-mono mb-3">
                <Zap size={12} />
                Charging
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-theme-90">Charging Time &amp; Cost</h2>
              <p className="text-sm text-theme-50 mt-2 max-w-2xl">
                Pick a model and charger to see how long a 20% → 80% top-up takes and what it costs at
                Sarawak domestic tariffs.
              </p>
            </div>
            <ChargingEstimator />
          </div>
        </section>

        {/* ── Fuel savings ── */}
        <section className="relative px-5 sm:px-6 py-14 md:py-20 overflow-hidden bg-theme">
          <div className="absolute inset-0 parking-lot-bg opacity-20" />
          <div className="max-w-[1240px] mx-auto relative">
            <div className="mb-6">
              <span className="label-mono mb-3">
                <Wallet size={12} />
                Savings
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-theme-90">Fuel vs EV Running Cost</h2>
              <p className="text-sm text-theme-50 mt-2 max-w-2xl">
                Compare your current petrol spend against charging an EV over a year of driving.
              </p>
            </div>
            <FuelSavingsCalculator />
          </div>
        </section>

        {/* ── Living with an EV ── */}
        <section className="relative px-5 sm:px-6 py-14 md:py-20 overflow-hidden bg-theme">
          <div className="absolute inset-0 parking-lot-bg opacity-20" />
          <div className="relative max-w-[1240px] mx-auto">
          <div className="text-center mb-8">
            <span className="label-mono justify-center mb-3">
              <Battery size={12} />
              Living With an EV Here
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-theme-90">
              Charging a BYD in Sarawak
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 text-sm text-theme-50 leading-relaxed">
            <p>
              Most Sarawak owners charge at home. A 7 kW wallbox adds roughly <strong className="text-theme-80">246 km
              of range in under five hours</strong> and costs around <strong className="text-theme-80">RM11</strong> at
              domestic tariffs — a fraction of the petrol equivalent. BYD models sold here return between
              <strong className="text-theme-80"> 410 km and 650 km</strong> on a full charge.
            </p>
            <p>
              For longer routes: Miri to Bintulu is roughly 200 km, Miri to Limbang about 230 km, and
              Miri to Lawas about 230 km. All three are within a single charge, and for travels to
              Sibu or Kuching, DC fast chargers are available in Bintulu, Sibu, Layar, Sri Aman and
              more upcoming along the Pan Borneo Highway.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mt-6 max-w-3xl mx-auto">
            {[
              { route: "Miri → Bintulu", km: "~200 km", note: "Single charge" },
              { route: "Miri → Limbang", km: "~230 km", note: "Single charge" },
              { route: "Miri → Lawas", km: "~230 km", note: "Single charge" },
            ].map((r) => (
              <div key={r.route} className="rounded-xl border p-4" style={{ borderColor: "var(--cz-border)", backgroundColor: "var(--cz-bg-card)" }}>
                <div className="text-xs text-theme-50">{r.route}</div>
                <div className="font-data text-lg font-semibold text-theme-80 mt-1 tabular-nums">{r.km}</div>
                <div className="text-[11px] text-accent mt-0.5">{r.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


        {/* ── Warranty ── */}
        <section id="warranty" className="relative px-5 sm:px-6 py-14 md:py-20 overflow-hidden scroll-mt-24 bg-theme">
          <div className="absolute inset-0 bg-theme-alt" />
          <div className="absolute inset-0 parking-lot-bg opacity-15" />
          <div className="max-w-[1240px] mx-auto relative">
            <div className="mb-6">
              <span className="label-mono mb-3">
                <Shield size={12} />
                Warranty
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-theme-90">Warranty Coverage</h2>
              <p className="text-sm text-theme-50 mt-2 max-w-2xl">
                Vehicle, battery, drive unit and servicing terms as they apply to BYD vehicles sold in
                Malaysia.
              </p>
            </div>
            <WarrantyDetails />
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative px-5 sm:px-6 py-14 md:py-20 overflow-hidden">
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--cz-bg) 0%, var(--cz-bg-alt) 50%, var(--cz-bg) 100%)" }} />
          <div className="max-w-[1240px] mx-auto relative text-center">
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

      <Footer />
    </div>
  );
}
