"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Gauge, Battery, CircleDot, Info, ClipboardCheck, ChevronDown } from "lucide-react";
import Hero from "@/components/hero";
import VehicleCard from "@/components/vehicle-card";
import Calculator from "@/components/calculator";
import { Modal } from "@/components/modal";
import { Img } from "@/components/img";
import { vehicles } from "@/lib/vehicles";
import { calcCardMonthly, calcFullLoanMonthly, fmt } from "@/lib/finance";
import ChargingEstimator from "@/components/charging-estimator";
import WarrantyDetails from "@/components/warranty-details";
import CheckEligibilityForm from "@/components/check-eligibility-form";

export default function Home() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"privacy" | "terms" | "disclaimer" | null>(null);
  const [showEligibility, setShowEligibility] = useState(false);

  const calcCloseRef = useRef<HTMLButtonElement>(null);
  const legalCloseRef = useRef<HTMLButtonElement>(null);

  // Focus modal close button when modal opens
  useEffect(() => {
    if (selectedId) calcCloseRef.current?.focus();
  }, [selectedId]);

  useEffect(() => {
    if (modalType) legalCloseRef.current?.focus();
  }, [modalType]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const handleClose = useCallback(() => setSelectedId(null), []);

  // Close modals on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        setModalType(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  // Handle ?calc=vehicle-id from pricelist page
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const calcId = params.get("calc");
    if (calcId && vehicles.some((v) => v.id === calcId)) {
      setSelectedId(calcId);
      // Clean URL without reload
      window.history.replaceState(null, "", "/");
    }
  }, []);

  const selectedVehicle = selectedId
    ? vehicles.find((v) => v.id === selectedId)
    : null;

  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-theme backdrop-blur-xl border-b border-theme">
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between gap-2">
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-1 text-sm text-white shrink-0" aria-label="BYD Miri Home">
            <Img src="/byd-logo-white.svg" alt="BYD" className="h-3.5 w-auto -mt-[2px]" />
            <span className="font-[family-name:var(--font-syne)] font-bold text-sm sm:text-lg tracking-[0.08em] sm:tracking-[0.12em] ml-1 sm:ml-2">| MIRI</span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-3 overflow-x-auto flex-nowrap scrollbar-none ml-auto">
            <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-white/90 transition-colors shrink-0 text-[9px] sm:text-[11px] font-medium text-white/50 px-1.5 whitespace-nowrap">
              Home
            </Link>
            <button onClick={() => document.getElementById("full-lineup")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white/90 transition-colors shrink-0 text-[9px] sm:text-[11px] font-medium text-white/50 px-1.5 whitespace-nowrap cursor-pointer">
              Models
            </button>
            <button onClick={() => document.getElementById("main-content")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white/90 transition-colors shrink-0 text-[9px] sm:text-[11px] font-medium text-white/50 px-1.5 whitespace-nowrap cursor-pointer">
              Calculator
            </button>
            <button onClick={() => document.getElementById("charging")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white/90 transition-colors shrink-0 text-[9px] sm:text-[11px] font-medium text-white/50 px-1.5 whitespace-nowrap cursor-pointer">
              Charge
            </button>
            <button onClick={() => document.getElementById("warranty")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white/90 transition-colors shrink-0 text-[9px] sm:text-[11px] font-medium text-white/50 px-1.5 whitespace-nowrap cursor-pointer">
              Warranty
            </button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white/90 transition-colors shrink-0 text-[9px] sm:text-[11px] font-medium text-white/50 px-1.5 whitespace-nowrap cursor-pointer">
              Contact Us
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <Hero />

      {/* ── Full Price List ── */}
      <section id="full-lineup" className="relative px-6 py-12 md:py-16 pb-6 md:pb-8 overflow-hidden scroll-mt-24">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #080808 0%, #0a0a0a 50%, #080808 100%)" }} />
        <div className="max-w-6xl mx-auto relative">
          <div
            className="text-center mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-3 border border-emerald-500/15 uppercase tracking-wide">
              <Zap size={12} />
              Complete BYD Lineup
            </span>
            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-syne)] font-bold text-theme-90 mb-1">
              Discover the Lineup. 6 Models, 9 Choices.
            </h2>
            <p className="text-xs text-theme-50">Explore every model. OTR pricing &amp; monthly instalments below.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.06]">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th scope="col" className="px-2 py-2 text-[9px] md:text-xs font-semibold text-white/40 uppercase tracking-wider">Model</th>
                  <th scope="col" className="px-2 py-2 text-[9px] md:text-xs font-semibold text-white/40 uppercase tracking-wider hidden sm:table-cell">Range</th>
                  <th scope="col" className="px-2 py-2 text-[9px] md:text-xs font-semibold text-white/40 uppercase tracking-wider">OTR Price</th>
                  <th scope="col" className="px-2 py-2 text-[9px] md:text-xs font-semibold text-white/40 uppercase tracking-wider">Rebate</th>
                  <th scope="col" className="px-2 py-2 text-[9px] md:text-xs font-semibold text-emerald-400 uppercase tracking-wider">10%</th>
                  <th scope="col" className="px-2 py-2 text-[9px] md:text-xs font-semibold text-amber-400 uppercase tracking-wider">0%</th>
                  <th scope="col" className="px-2 py-2 text-[9px] md:text-xs w-6"></th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => {
                  const monthly = calcCardMonthly(v.otr, v.rebate);
                  const monthlyFull = calcFullLoanMonthly(v.otr, v.rebate);
                  return (
                    <tr
                      key={v.id}
                      onClick={() => router.push('/pricelist')}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); router.push('/pricelist'); } }}
                      role="button"
                      tabIndex={0}
                      className="border-b border-white/[0.04] hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                      <td className="px-2 py-2">
                        <div className="flex items-center gap-2">
                          <div className="hidden sm:block w-12 h-7 md:w-16 md:h-9 rounded overflow-hidden bg-black/40 shrink-0">
                            <Img src={v.image} alt={v.name} className="w-full h-full object-contain" width={100} height={56} />
                          </div>
                          <span className="font-semibold text-theme-80 text-[10px] md:text-sm">{v.name}</span>
                        </div>
                      </td>
                      <td className="px-2 py-2 text-theme-50 text-[10px] md:text-sm hidden sm:table-cell">{v.range} km</td>
                      <td className="px-2 py-2 font-mono text-theme-70 text-[10px] md:text-sm whitespace-nowrap">RM{fmt(v.otr)}</td>
                      <td className="px-2 py-2 font-mono text-red-400 font-semibold text-[10px] md:text-sm whitespace-nowrap">-RM{fmt(v.rebate)}</td>
                      <td className="px-2 py-2 font-mono font-bold text-emerald-400 text-[10px] md:text-sm whitespace-nowrap">RM{fmt(monthly)}</td>
                      <td className="px-2 py-2 font-mono font-bold text-amber-400 text-[10px] md:text-sm whitespace-nowrap">RM{fmt(monthlyFull)}</td>
                      <td className="px-2 py-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(v.id);
                          }}
                          className="flex items-center justify-center w-5 h-5 rounded-md bg-amber-400/10 border border-amber-400/20 text-amber-400/60 hover:bg-amber-400/20 hover:text-amber-400 hover:border-amber-400/40 transition-all"
                          aria-label={`Calculate monthly payment for ${v.name}`}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="4" y="2" width="16" height="20" rx="2" />
                            <line x1="8" y1="6" x2="16" y2="6" />
                            <line x1="8" y1="10" x2="16" y2="10" />
                            <line x1="8" y1="14" x2="12" y2="14" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-4">
            <Link
              href="/pricelist"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400/60 hover:text-emerald-400 transition-colors"
            >
              View full details &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Vehicle Section — Parking Lot Style ── */}
      <section
        id="main-content"
        className="relative px-6 pt-8 md:pt-10 pb-0 scroll-mt-24"
        style={{ backgroundColor: "#080808" }}
      >
        <div className="absolute inset-0 parking-lot-bg opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#080808] to-transparent" />

        <div className="max-w-6xl mx-auto relative">
          {/* Section header */}
          <div className="text-center mb-8">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4 border border-emerald-500/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Find Your Match
            </span>
            <h2
              className="text-3xl md:text-4xl font-[family-name:var(--font-syne)] font-bold text-theme-90 mb-0"
            >
              Calculate Your Monthly Payment
            </h2>
          </div>

          {/* Parking Lot Grid */}
          <div className="flex flex-wrap justify-center -mx-1">
            {vehicles.map((v, i) => (
              <div key={v.id} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-1 mb-5">
                <VehicleCard
                  vehicle={v}
                  isSelected={selectedId === v.id}
                  onSelect={handleSelect}
                  index={i}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Extras: Charging & Warranty ── */}
      <section id="charging" className="relative px-6 py-12 md:py-16 overflow-hidden scroll-mt-24">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #080808 0%, #0c0c0c 50%, #080808 100%)" }} />
        <div className="absolute inset-0 parking-lot-bg opacity-15" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-8">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-3 border border-emerald-500/15 uppercase tracking-wide"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
              </svg>
              Extras
            </span>
            <h2
              className="text-2xl md:text-3xl font-[family-name:var(--font-syne)] font-bold text-theme-90 mb-1"
            >
              Charging &amp; Warranty
            </h2>
            <p
              className="text-sm text-theme-50"
            >
              Everything you need to know about charging and warranty coverage
            </p>
          </div>

          {/* Charging Estimator */}
          <div className="mb-8">
            <ChargingEstimator />
          </div>

          {/* Warranty Details */}
          <div id="warranty" className="scroll-mt-24">
            <WarrantyDetails />
          </div>
        </div>
      </section>

      {/* ── Map & Location ── */}
      <section className="relative px-6 py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #080808 0%, #0a0a0a 50%, #080808 100%)" }} />
        <div className="absolute inset-0 parking-lot-bg opacity-20" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-8">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-3 border border-emerald-500/15 uppercase tracking-wide"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Our Location
            </span>
            <h2
              className="text-2xl md:text-3xl font-[family-name:var(--font-syne)] font-bold text-theme-90 mb-0"
            >
              Visit Our Showroom
            </h2>
            <p
              className="text-sm text-theme-50"
            >
              Kah Progression Auto — Official BYD Dealer Miri
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 items-stretch">
            {/* Map */}
            <div
              className="rounded-2xl overflow-hidden border border-white/[0.06] bg-black/40 min-h-[300px] md:min-h-[320px]"
            >
              <iframe
                src="https://www.google.com/maps?q=4.4279602,114.0020263&output=embed"
                className="w-full h-full"
                style={{ minHeight: "300px", filter: "invert(0.88) hue-rotate(180deg)" }}
                loading="lazy"
                allowFullScreen
                title="BYD Kah Progression Auto Miri"
              />
            </div>

            {/* Info card */}
            <div
              className="flex flex-col justify-center gap-1.5"
            >
              <div className="rounded-xl p-3 bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-emerald-400">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-bold text-theme-90">BYD Kah Progression Auto</h4>
                    <p className="text-xs text-theme-50">Official BYD Dealer · Sales · Service</p>
                    <p className="text-xs text-theme-60 mt-1">
                      Lot 1829, Jalan Krokop Utama, 98000 Miri, Sarawak
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href="https://www.google.com/maps?q=4.4279602,114.0020263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
                    <circle cx="12" cy="9" r="3" fill="white"/>
                    <circle cx="12" cy="9" r="1.5" fill="#4285F4"/>
                  </svg>
                  Open in Google Maps
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                    <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                </a>
                <a
                  href="https://www.waze.com/ul?ll=4.4279602,114.0020263&navigate=yes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-theme-70 text-sm font-semibold hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" fill="#33CCFF"/>
                    <polygon points="3,11 22,2 13,21 11,13" fill="white"/>
                  </svg>
                  Navigate with Waze
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                    <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Schedule a Test Drive ── */}
      <section id="contact" className="relative px-6 py-16 md:py-20 overflow-hidden scroll-mt-24">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #080808 0%, #0c0c0c 50%, #080808 100%)" }} />
        <div className="absolute inset-0 parking-lot-bg opacity-15" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-emerald-500 rounded-full opacity-[0.04] blur-[120px]" />
        <div className="max-w-3xl mx-auto relative text-center">
          <div
            className="space-y-5"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/15 uppercase tracking-wide">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Experience the Future
            </span>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-syne)] font-bold text-theme-90">
              Schedule a Test Drive Today
            </h2>
            <div className="space-y-1">
              <p className="text-sm md:text-base text-theme-50 max-w-md mx-auto">
                Book your appointment with Ridzuan today.
              </p>
              <p className="text-sm md:text-base text-theme-50 max-w-md mx-auto">
                Experience the thrill of electric driving with your dream BYD.
              </p>
            </div>
            <a
              href="https://wa.me/601131933930?text=Saya%20nak%20jadualkan%20test%20drive%20untuk%20BYD!%20Boleh%20bantu%20saya%20tentang%20masa%20dan%20model%20yang%20tersedia%3F%20Terima%20kasih!"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-3.5 rounded-full font-bold text-base transition-all duration-300 hover:shadow-[0_0_50px_rgba(52,211,153,0.4)] hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-emerald-400/20 to-emerald-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book Test Drive
              </span>
            </a>
          </div>

          {/* Check Eligibility — bottom CTA */}
          <div
            className="mt-6 pt-6 border-t border-white/[0.06]"
          >
            <p className="text-xs text-theme-50 mb-3">
              Not sure if you're eligible? Let us check for you.
            </p>
            <button
              onClick={() => setShowEligibility(!showEligibility)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-500/20 text-emerald-400/70 text-sm font-semibold hover:bg-emerald-500/[0.06] hover:border-emerald-500/30 hover:text-emerald-300 transition-all"
            >
              <ClipboardCheck size={14} />
              Check My Eligibility — Free & No Obligation
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  showEligibility ? "rotate-180" : ""
                }`}
              />
            </button>

            {showEligibility && (
              <div className="mt-4 animate-fade-in">
                <CheckEligibilityForm />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-theme bg-theme-section py-10 px-6 text-center text-sm text-theme-40">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-1.5">
            <p>&copy; 2026 Ridzuan Jahari. All rights reserved.</p>
            <div className="flex items-center justify-center gap-3 text-xs">
              <button onClick={() => setModalType("privacy")} className="text-theme-50 hover:text-theme-90 underline underline-offset-2 transition-colors">
                Privacy Policy
              </button>
              <span className="text-theme-30">·</span>
              <button onClick={() => setModalType("terms")} className="text-theme-50 hover:text-theme-90 underline underline-offset-2 transition-colors">
                Terms of Use
              </button>
              <span className="text-theme-30">·</span>
              <button onClick={() => setModalType("disclaimer")} className="text-theme-50 hover:text-theme-90 underline underline-offset-2 transition-colors">
                Disclaimer
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Calculator Modal ── */}
      <Modal
        open={!!selectedVehicle}
        onClose={handleClose}
        label={selectedVehicle?.name ?? "Calculator"}
        closeRef={calcCloseRef}
        className="max-w-2xl max-h-[90vh] p-5 md:p-6"
      >
        {selectedVehicle && (
          <>
            {/* Header */}
            <div className="mb-3 text-center">
              <h3 id="calc-modal-title" className="text-lg font-[family-name:var(--font-syne)] font-bold text-theme-90">
                {selectedVehicle.name}
              </h3>
              <p className="text-xs text-theme-50 mt-0.5">
                {selectedVehicle.category}
              </p>
            </div>

            {/* Quick specs — 6 items, always balanced: 3+3 on mobile, 6 on md+ */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-x-1.5 gap-y-1.5 justify-items-center mb-3">
              <span className="specs-bar-item w-full justify-center">
                <Gauge className="spec-icon" />
                {selectedVehicle.range} km
              </span>
              <span className="specs-bar-item w-full justify-center">
                <Battery className="spec-icon" />
                {selectedVehicle.battery} kWh
              </span>
              <span className="specs-bar-item w-full justify-center">
                <span className="spec-icon flex items-center justify-center text-[10px] font-bold">{selectedVehicle.seats}</span>
                {selectedVehicle.seats}-Seater
              </span>
              <span className="specs-bar-item w-full justify-center">
                <CircleDot className="spec-icon" />
                {selectedVehicle.driveType}
              </span>
              <span className="specs-bar-item w-full justify-center">
                <Zap className="spec-icon" />
                {selectedVehicle.power} kW
              </span>
              <span className="specs-bar-item w-full justify-center">
                <span className="spec-icon flex items-center justify-center text-[10px] font-bold">Nm</span>
                {selectedVehicle.torque} Nm
              </span>
            </div>

            {/* Brochure / Learn More */}
            <div className="text-center mb-3">
              <a
                href={selectedVehicle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-400/70 hover:text-emerald-400 transition-colors"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Brochure
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            {/* Loan Calculator heading */}
            <h3
              className="text-xl font-[family-name:var(--font-syne)] font-bold text-center text-theme-90 mb-3 tracking-wide"
              style={{ letterSpacing: "0.05em" }}
            >
              Loan Calculator
            </h3>

            {/* Calculator */}
            <Calculator vehicle={selectedVehicle} />
          </>
        )}
      </Modal>

      {/* ── Legal Modal ── */}
      <Modal
        open={!!modalType}
        onClose={() => setModalType(null)}
        label={modalType === "privacy" ? "Privacy Policy" : modalType === "terms" ? "Terms of Use" : "Disclaimer"}
        closeRef={legalCloseRef}
      >
        {/* Content */}
        {modalType === "privacy" && (
                <div className="space-y-3 text-sm text-theme-70 leading-relaxed">
                  <h3 className="text-lg font-[family-name:var(--font-syne)] font-bold text-theme-90">Privacy Policy</h3>
                  <p>
                    BYD Miri values your privacy. This calculator does not store,
                    collect, or share any personal information you enter. All
                    calculations are performed locally in your browser.
                  </p>
                  <p>
                    We use minimal analytics to improve our service. No personal
                    data is sold or shared with third parties.
                  </p>
                  <p>
                    For inquiries, contact Ridzuan Jahari at{" "}
                    <a href="https://wa.me/601131933930" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline underline-offset-2">
                      011 3193 3930
                    </a>.
                  </p>
                </div>
              )}

              {modalType === "terms" && (
                <div className="space-y-3 text-sm text-theme-70 leading-relaxed">
                  <h3 className="text-lg font-[family-name:var(--font-syne)] font-bold text-theme-90">Terms of Use</h3>
                  <p>
                    The monthly instalment estimates provided are for preliminary
                    reference only and do not constitute a formal financing offer.
                  </p>
                  <p>
                    All calculations are based on the information you provide and
                    current indicative interest rates which may change without
                    notice.
                  </p>
                  <p>
                    Actual financing approval, terms, and conditions are subject to
                    bank assessment, CCRIS/CTOS records, and applicable financing
                    rates at the time of application.
                  </p>
                  <p>
                    For a formal quotation, please contact Ridzuan Jahari at{" "}
                    <a href="https://wa.me/601131933930" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline underline-offset-2">
                      011 3193 3930
                    </a>.
                  </p>
                </div>
              )}

              {modalType === "disclaimer" && (
                <div className="space-y-3 text-sm text-theme-70 leading-relaxed">
                  <h3 className="text-lg font-[family-name:var(--font-syne)] font-bold text-theme-90">Disclaimer</h3>
                  <p className="flex items-center gap-1.5 font-semibold text-theme-80">
                    <Info size={15} className="shrink-0" />
                    Monthly instalment estimates shown are for preliminary reference only.
                  </p>
                  <p>
                    The calculation takes into account: downpayment you entered, current
                    rebate offered, financing tenure period, and estimated current interest
                    rate of 2.3% per annum.
                  </p>
                  <p>
                    Actual instalment and financing approval are subject to bank assessment,
                    CCRIS/CTOS records, current financial commitments, and applicable
                    financing rates at the time of application.
                  </p>
                  <p className="flex items-center gap-1.5 font-semibold text-theme-80 pt-2 border-t border-white/[0.06]">
                    <Info size={15} className="shrink-0" />
                    Charging estimates
                  </p>
                  <p>
                    Charging cost estimates are for reference only. Actual rates depend on
                    charger type, location, network operator, and time of use.
                  </p>
                  <p>
                    Charging times are estimates and may vary based on temperature, battery
                    condition, and charger output.
                  </p>
                  <p>
                    For a more accurate assessment based on your financial profile, please
                    contact Ridzuan at{" "}
                    <a href="https://wa.me/601131933930" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline underline-offset-2">
                      011 3193 3930
                    </a>.
                  </p>
                </div>
              )}
      </Modal>
    </>
  );
}
