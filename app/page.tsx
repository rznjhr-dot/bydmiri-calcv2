"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { Zap, Gauge, Battery, BatteryCharging, CircleDot, Info, MapPin, Clock, Menu, X } from "lucide-react";
import Hero from "@/components/hero";
import VehicleCard from "@/components/vehicle-card";
import Calculator from "@/components/calculator";
import { Modal } from "@/components/modal";
import { Img } from "@/components/img";
import { vehicles } from "@/lib/vehicles";
import ChargingEstimator from "@/components/charging-estimator";
import FuelSavingsCalculator from "@/components/fuel-savings-calculator";
import WarrantyDetails from "@/components/warranty-details";
import CheckEligibilityForm from "@/components/check-eligibility-form";
import SectionHeader from "@/components/section-header";

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"privacy" | "terms" | "disclaimer" | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const legalCloseRef = useRef<HTMLButtonElement>(null);

  const scrollToSection = useCallback((id: string) => {
    setNavOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  }, []);

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

  // Handle ?calc=vehicle-id from pricelist page — read once after mount,
  // clean the URL, and defer the modal-open state to avoid a sync setState
  // inside the effect (react-hooks/set-state-in-effect).
  const calcCloseRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const calcId = params.get("calc");
    if (!calcId || !vehicles.some((v) => v.id === calcId)) return;
    window.history.replaceState(null, "", "/");
    const frame = requestAnimationFrame(() => setSelectedId(calcId));
    return () => cancelAnimationFrame(frame);
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
            <span className="font-wordmark text-[11px] sm:text-xs ml-2">/ MIRI</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-1 md:gap-3 ml-auto">
            <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-theme-90 transition-colors shrink-0 text-[11px] font-medium text-theme-50 px-2 py-3 whitespace-nowrap">
              Home
            </Link>
            <button onClick={() => scrollToSection("full-lineup")} className="hover:text-theme-90 transition-colors shrink-0 text-[11px] font-medium text-theme-50 px-2 py-3 whitespace-nowrap cursor-pointer">
              Models
            </button>
            <button onClick={() => scrollToSection("charging")} className="hover:text-theme-90 transition-colors shrink-0 text-[11px] font-medium text-theme-50 px-2 py-3 whitespace-nowrap cursor-pointer">
              Charging, Savings &amp; Warranty
            </button>
            <Link href="/why-byd" className="hover:text-theme-90 transition-colors shrink-0 text-[11px] font-medium text-theme-50 px-2 py-3 whitespace-nowrap">
              Why BYD
            </Link>
            <button onClick={() => scrollToSection("contact")} className="hover:text-theme-90 transition-colors shrink-0 text-[11px] font-medium text-theme-50 px-2 py-3 whitespace-nowrap cursor-pointer">
              Contact Us
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setNavOpen((o) => !o)}
            className="sm:hidden ml-auto w-11 h-11 -mr-2 flex items-center justify-center rounded-lg text-theme-70 hover:text-theme hover:bg-white/5 transition-colors"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            aria-expanded={navOpen}
          >
            {navOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {navOpen && (
          <div className="sm:hidden border-t bg-theme/95 backdrop-blur-xl" style={{ borderColor: "var(--cz-border)" }}>
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col">
              <Link
                href="/"
                onClick={() => {
                  setNavOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center min-h-11 px-3 rounded-lg text-sm font-medium text-theme-70 hover:text-theme hover:bg-white/5 transition-colors"
              >
                Home
              </Link>
              {[
                { id: "full-lineup", label: "Models" },
                { id: "charging", label: "Charging, Savings & Warranty" },
                { id: "contact", label: "Contact Us" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center min-h-11 px-3 rounded-lg text-left text-sm font-medium text-theme-70 hover:text-theme hover:bg-white/5 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <Link
                href="/why-byd"
                onClick={() => setNavOpen(false)}
                className="flex items-center min-h-11 px-3 rounded-lg text-sm font-medium text-theme-70 hover:text-theme hover:bg-white/5 transition-colors"
              >
                Why BYD
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <Hero />

      {/* ── Full Lineup — model photo grid (5 columns on lg, 3 on md, stack on mobile) ── */}
      <section
        id="full-lineup"
        className="relative px-6 py-12 md:py-16 overflow-hidden scroll-mt-24 bg-theme"
      >
        <div className="absolute inset-0 parking-lot-bg opacity-30" />

        <div className="max-w-6xl mx-auto relative">
          <SectionHeader
            icon={<span className="w-1.5 h-1.5 rounded-full bg-accent" />}
            label="Complete BYD Lineup"
            title="Discover the Lineup. 6 Models, 10 Choices."
            subtitle="Pick your model, click the calculator icon to estimate your monthly instalment instantly."
            align="start"
            className="mb-6"
          />

          {/* Parking Lot Grid — same component as the old #main-content.
              Photos are 16:9 landscape via PNGs from public/images/models/png/. */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-1 gap-y-5 lg:gap-x-2.5 lg:px-2.5">
            {vehicles.map((v, i) => (
              <div key={v.id} className="px-1">
                <VehicleCard
                  vehicle={v}
                  isSelected={selectedId === v.id}
                  onSelect={handleSelect}
                  index={i}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-2">
            <Link
              href="/pricelist"
              className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline underline-offset-2 transition-colors py-2 px-2"
            >
              View full details &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Extras: Charging & Warranty ── */}
      <section id="charging" className="relative px-6 py-12 md:py-16 overflow-hidden scroll-mt-24 bg-theme">
        <div className="absolute inset-0 bg-theme-alt" />
        <div className="absolute inset-0 parking-lot-bg opacity-15" />
        <div className="max-w-6xl mx-auto relative">
          <SectionHeader
            icon={<BatteryCharging size={12} />}
            label="Extras"
            title="Charging, Savings & Warranty"
            subtitle="Everything you need to know about charging, savings and warranty coverage"
            align="start"
          />

          {/* Charging Estimator */}
          <div className="mb-8">
            <ChargingEstimator />
          </div>

          {/* Fuel Savings Calculator */}
          <div className="mb-8">
            <FuelSavingsCalculator />
          </div>

          {/* Warranty Details */}
          <div id="warranty" className="scroll-mt-24">
            <WarrantyDetails />
          </div>
        </div>
      </section>

      {/* ── Map & Location ── */}
      <section className="relative px-6 py-12 md:py-16 overflow-hidden bg-theme">
        <div className="absolute inset-0 parking-lot-bg opacity-20" />
        <div className="max-w-6xl mx-auto relative">
          <SectionHeader
            icon={<MapPin size={12} />}
            label="Our Location"
            title="Visit Our Showroom"
            subtitle="Kah Progression Auto — Official BYD Dealer Miri"
            align="start"
          />

          <div className="grid md:grid-cols-2 gap-4 items-stretch w-full">
            {/* Map */}
            <div
              className="rounded-2xl overflow-hidden border bg-theme-card min-h-[300px] md:min-h-[320px] min-w-0 w-full"
              style={{ borderColor: "var(--cz-border)" }}
            >
              <iframe
                src="https://www.google.com/maps?q=4.4279602,114.0020263&output=embed"
                className="w-full h-full max-w-full block"
                style={{ minHeight: "300px", filter: "invert(0.88) hue-rotate(160deg) saturate(0.7)" }}
                loading="lazy"
                allowFullScreen
                title="BYD Kah Progression Auto Miri"
              />
            </div>

            {/* Info card */}
            <div
              className="flex flex-col justify-center gap-1.5 min-w-0"
            >
              <div className="rounded-xl p-3 bg-theme-card border" style={{ borderColor: "var(--cz-border)" }}>
                <div className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-accent">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-bold text-theme-90">BYD Kah Progression Auto</h4>
                    <p className="text-xs text-theme-50">Official BYD Dealer · Sales · Service</p>
                    <p className="text-xs text-theme-50 mt-1">
                      Lot 1829, Jalan Krokop Utama, 98000 Miri, Sarawak
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col min-[420px]:flex-row gap-2 min-w-0 max-w-full">
                <a
                  href="https://www.google.com/maps?q=4.4279602,114.0020263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-outline flex-1 min-w-0 flex items-center justify-center gap-2 px-3 py-3 min-h-11 rounded-xl text-sm font-semibold"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
                    <circle cx="12" cy="9" r="3" fill="white"/>
                    <circle cx="12" cy="9" r="1.5" fill="#4285F4"/>
                  </svg>
                  <span>Open in Google Maps</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 shrink-0">
                    <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                </a>
                <a
                  href="https://www.waze.com/ul?ll=4.4279602,114.0020263&navigate=yes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-outline flex-1 min-w-0 flex items-center justify-center gap-2 px-3 py-3 min-h-11 rounded-xl text-sm font-semibold"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" fill="#33CCFF"/>
                    <polygon points="3,11 22,2 13,21 11,13" fill="white"/>
                  </svg>
                  <span>Navigate with Waze</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 shrink-0">
                    <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Schedule a Test Drive — Minimal: pure paper ── */}
      <section id="contact" className="relative px-6 py-16 md:py-20 overflow-hidden scroll-mt-24 bg-theme">
        <div className="max-w-2xl mx-auto relative text-center">
          <div className="space-y-5">
            <SectionHeader
              icon={<Clock size={12} />}
              label="Experience the Future"
              title="Schedule a Test Drive Today"
              size="lg"
              className="mb-0"
            />
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
              className="hero-cta relative inline-flex items-center gap-3 bg-accent px-8 py-3.5 rounded-full font-bold text-base"
              style={{ color: "var(--cz-accent-ink)" }}
            >
              <span className="relative z-10 flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book Test Drive
              </span>
            </a>
          </div>

          {/* Advisor info card */}
          <div className="mt-8 rounded-2xl border bg-theme-card p-5 sm:p-6 max-w-md mx-auto text-left" style={{ borderColor: "var(--cz-border)" }}>
            <div className="flex items-start gap-4">
              {/* Photo */}
              <div className="shrink-0">
                <Img
                  src="/ridzuan.jpg"
                  alt="Ridzuan Jahari — BYD Sales Advisor Miri"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border"
                  style={{ borderColor: "var(--cz-border-strong)" }}
                />
              </div>
              {/* Details */}
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-base sm:text-lg font-semibold text-theme-90 leading-tight">
                  Ridzuan Jahari
                </h3>
                <p className="text-xs text-theme-50 mt-0.5">
                  BYD Sales Advisor · Kah Progression Auto Miri
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <a
                    href="https://wa.me/601131933930"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline underline-offset-2"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    011 3193 3930
                  </a>
                </div>
              </div>
            </div>
            {/* Social links */}
            <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--cz-border)" }}>
              <p className="text-xs text-theme-50 mb-2">Follow for updates &amp; promos:</p>
              <div className="flex items-center gap-2">
                {/* Facebook */}
                <a
                  href="https://web.facebook.com/ridzuanbydmiri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-outline inline-flex flex-1 items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold min-h-9"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073"/>
                  </svg>
                  Facebook
                </a>
                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@ridzuanbydmiri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-outline inline-flex flex-1 items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold min-h-9"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.14v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.5-4.41c.3 0 .6.04.88.13V9.4a6.03 6.03 0 0 0-1-.08A6.04 6.04 0 0 0 4 15.33a6.04 6.04 0 0 0 10.42 4.13 6.04 6.04 0 0 0 1.77-4.28V8.68a8.02 8.02 0 0 0 4.69 1.5V7.04a4.83 4.83 0 0 1-1.29-.35z"/>
                  </svg>
                  TikTok
                </a>
              </div>
            </div>
          </div>

          {/* Check Eligibility — form rendered directly, no accordion. */}
          <div className="mt-6 pt-6 border-t" style={{ borderColor: "var(--cz-border)" }}>
            <p className="text-xs text-theme-50 mb-3">
              Not sure if you&apos;re eligible? Let us check for you — free &amp; no obligation.
            </p>
            <CheckEligibilityForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-theme bg-theme-section py-10 px-6 text-center text-sm text-theme-40">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-1.5">
            <p>&copy; 2026 Ridzuan Jahari. All rights reserved.</p>
            <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-2 text-xs">
              <button onClick={() => setModalType("privacy")} className="text-theme-50 hover:text-theme-90 underline underline-offset-2 transition-colors min-h-11 py-2.5 px-1">
                Privacy Policy
              </button>
              <span className="text-theme-30">·</span>
              <button onClick={() => setModalType("terms")} className="text-theme-50 hover:text-theme-90 underline underline-offset-2 transition-colors min-h-11 py-2.5 px-1">
                Terms of Use
              </button>
              <span className="text-theme-30">·</span>
              <button onClick={() => setModalType("disclaimer")} className="text-theme-50 hover:text-theme-90 underline underline-offset-2 transition-colors min-h-11 py-2.5 px-1">
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
        className="max-w-2xl p-5 md:p-6"
      >
        {selectedVehicle && (
          <>
            {/* Header */}
            <div className="mb-3 text-center">
              <h3 id="calc-modal-title" className="text-lg text-theme-90 font-semibold">
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
                className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline hover:decoration-from-font transition-colors py-2"
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
              className="font-display text-xl text-center text-theme-90 mb-3"
              style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
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
        className="p-6"
      >
        {/* Content */}
        {modalType === "privacy" && (
                <div className="space-y-3 text-sm text-theme-70 leading-relaxed">
                  <h3 className="text-lg text-theme-90 font-semibold">Privacy Policy</h3>
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
                    <a href="https://wa.me/601131933930" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                      011 3193 3930
                    </a>.
                  </p>
                </div>
              )}

              {modalType === "terms" && (
                <div className="space-y-3 text-sm text-theme-70 leading-relaxed">
                  <h3 className="text-lg text-theme-90 font-semibold">Terms of Use</h3>
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
                    <a href="https://wa.me/601131933930" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                      011 3193 3930
                    </a>.
                  </p>
                </div>
              )}

              {modalType === "disclaimer" && (
                <div className="space-y-3 text-sm text-theme-70 leading-relaxed">
                  <h3 className="text-lg text-theme-90 font-semibold">Disclaimer</h3>
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
                  <p className="flex items-center gap-1.5 font-semibold text-theme-80 pt-2 border-t" style={{ borderColor: "var(--cz-border)" }}>
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
                    <a href="https://wa.me/601131933930" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                      011 3193 3930
                    </a>.
                  </p>
                </div>
              )}
      </Modal>
    </>
  );
}

