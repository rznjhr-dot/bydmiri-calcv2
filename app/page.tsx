"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Zap,
  Gauge,
  Battery,
  CircleDot,
  MapPin,
  Clock,
  ShieldCheck,
  BadgeCheck,
  BatteryCharging,
  Wrench,
  ArrowRight,
  Plus,
} from "lucide-react";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import VehicleCard from "@/components/vehicle-card";
import Calculator from "@/components/calculator";
import { Modal } from "@/components/modal";
import { Img } from "@/components/img";
import { vehicles } from "@/lib/vehicles";
import SectionHeader from "@/components/section-header";
import TestDriveForm from "@/components/test-drive-form";
import { track } from "@/lib/analytics";
import {
  PHONE_DISPLAY,
  PHONE_E164,
  SHOWROOM_ADDRESS,
  TEST_DRIVE_WHATSAPP_URL,
} from "@/lib/site";

type Filter = "all" | "suv" | "sedan" | "mpv";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All models" },
  { id: "suv", label: "SUV" },
  { id: "sedan", label: "Sedan" },
  { id: "mpv", label: "MPV" },
];

const TRUST = [
  {
    icon: BadgeCheck,
    title: "Authorised BYD dealer",
    sub: "Kah Progression Auto",
  },
  {
    icon: ShieldCheck,
    title: "6-year vehicle warranty",
    sub: "150,000 km",
  },
  {
    icon: BatteryCharging,
    title: "8-year battery warranty",
    sub: "160,000 km",
  },
  {
    icon: Wrench,
    title: "Serviced in Miri",
    sub: "Sales, service and parts",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Pick a model",
    body: "Use the lineup or tell Ridzuan what you need. Ten models, one recommendation.",
  },
  {
    n: "02",
    title: "Test drive in Miri",
    body: "Book a slot at Kah Progression Auto, Jalan Krokop Utama. Weekdays, weekends and public holidays.",
  },
  {
    n: "03",
    title: "Loan and trade-in",
    body: "Estimate the instalment, then submit for bank approval. Trade-in valuation available.",
  },
  {
    n: "04",
    title: "Collect your BYD",
    body: "Handover at the Miri showroom, with service and warranty support handled locally.",
  },
];

const FAQS = [
  {
    q: "Can I test drive before I decide?",
    a: "Yes. Test drives are held at Kah Progression Auto on Jalan Krokop Utama. Bring your driving licence and book a slot that suits you.",
  },
  {
    q: "Can I trade in my current car?",
    a: "Trade-in can be arranged against any BYD model. Ask for a valuation when you book; the final figure depends on the car's condition and current market value.",
  },
  {
    q: "How does loan approval work?",
    a: "Start with the instalment estimate, then submit your documents for bank assessment. Approval, rate and tenure depend on the bank, your income and your CCRIS/CTOS record.",
  },
  {
    q: "Where is the car serviced?",
    a: "At the authorised BYD 3S centre in Miri. Sales, service and spare parts are handled locally by Kah Progression Auto.",
  },
  {
    q: "What warranty is included?",
    a: "6 years or 150,000 km for the vehicle, and 8 years or 160,000 km for the Blade Battery and drive unit. Full terms are in the warranty booklet.",
  },
];

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const calcCloseRef = useRef<HTMLButtonElement>(null);

  // Focus modal close button when modal opens
  useEffect(() => {
    if (selectedId) calcCloseRef.current?.focus();
  }, [selectedId]);

  const handleSelect = useCallback((id: string) => {
    const vehicle = vehicles.find((v) => v.id === id);
    const model = vehicle?.name ?? id;
    track("model_click", { model, location: "lineup" });
    track("calculator_open", { model, location: "lineup" });
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const handleClose = useCallback(() => setSelectedId(null), []);

  // Close the calculator on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  // Handle ?calc=vehicle-id from the pricelist page. Runs on mount and again
  // whenever the pathname changes (client-side navigation back to "/"), then
  // cleans the URL and opens the modal on the next frame. usePathname (not
  // useSearchParams) keeps this page statically prerenderable.
  const pathname = usePathname();
  useEffect(() => {
    const calcId = new URLSearchParams(window.location.search).get("calc");
    if (!calcId || !vehicles.some((v) => v.id === calcId)) return;
    window.history.replaceState(null, "", "/");
    // Deferred to a microtask so the setState is not synchronous inside the
    // effect body (avoids cascading renders); intentionally not cancelled on
    // cleanup, otherwise a re-render before the microtask would drop the open.
    queueMicrotask(() => setSelectedId(calcId));
  }, [pathname]);

  // Legacy anchors: /#charging and /#warranty used to live on this page before
  // those tools moved to /charging. Hash fragments never reach the server (and
  // this site is a static export), so the redirect has to happen client-side.
  useEffect(() => {
    const legacy: Record<string, string> = {
      "#charging": "/charging",
      "#warranty": "/charging/#warranty",
    };
    const target = legacy[window.location.hash];
    if (target) window.location.replace(target);
  }, [pathname]);

  const filtered = useMemo(
    () =>
      vehicles.filter((v) => {
        if (filter === "all") return true;
        if (filter === "suv") return /SUV/i.test(v.category);
        if (filter === "sedan") return /Sedan/i.test(v.category);
        if (filter === "mpv") return /MPV/i.test(v.category);
        return true;
      }),
    [filter]
  );

  const selectedVehicle = selectedId
    ? vehicles.find((v) => v.id === selectedId)
    : null;

  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />

        {/* ── Trust strip ── */}
        <section aria-label="Buying assurances" className="border-y border-theme bg-theme-section">
          <div className="mx-auto max-w-[1240px] px-5 py-5 sm:px-6 sm:py-6">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4">
              {TRUST.map(({ icon: Icon, title, sub }) => (
                <li key={title} className="flex items-start gap-2.5">
                  <Icon size={17} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold leading-tight text-theme-80 sm:text-sm">
                      {title}
                    </p>
                    <p className="mt-0.5 text-xs leading-tight text-theme-50">{sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Lineup ── */}
        <section
          id="full-lineup"
          className="relative scroll-mt-24 overflow-hidden bg-theme px-5 py-14 sm:px-6 md:py-20"
        >
          <div className="parking-lot-bg absolute inset-0 opacity-25" />
          <div className="relative mx-auto max-w-[1240px]">
            <SectionHeader
              icon={<span className="h-1.5 w-1.5 rounded-full bg-accent" />}
              label="The lineup"
              title="Find the BYD that fits."
              subtitle="10 models, prices from RM106,353. Filter by body type, then open any model to calculate your instalment."
              className="mb-6"
            />

            <div
              className="mb-7 flex flex-wrap items-center justify-center gap-2"
              role="group"
              aria-label="Filter models by body type"
            >
              {FILTERS.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setFilter(f.id);
                      track("model_filter", { filter: f.id });
                    }}
                    aria-pressed={active}
                    className={`inline-flex min-h-11 items-center rounded-full border px-4 text-[13px] font-medium transition-colors ${
                      active
                        ? "border-accent bg-accent text-[var(--cz-accent-ink)]"
                        : "border-theme text-theme-50 hover:border-[color:var(--cz-border-strong)] hover:text-theme-90"
                    }`}
                    style={active ? { borderColor: "var(--cz-accent)" } : undefined}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-5 lg:gap-x-4">
              {filtered.map((v, i) => (
                <VehicleCard
                  key={v.id}
                  vehicle={v}
                  isSelected={selectedId === v.id}
                  onSelect={handleSelect}
                  index={i}
                />
              ))}
            </div>

            <p className="mx-auto mt-6 max-w-xl text-center text-xs leading-relaxed text-theme-40">
              Monthly figures assume 10% down, a 9-year tenure and 2.3% flat rate. OTR prices
              shown before rebate. Actual approval depends on the bank.
            </p>

            <div className="mt-4 text-center">
              <Link
                href="/pricelist"
                onClick={() => track("prices_click", { location: "lineup" })}
                className="inline-flex min-h-12 items-center gap-1.5 px-3 text-sm font-medium text-accent transition-colors hover:text-theme-90"
              >
                Compare every price and specification
                <ArrowRight size={15} aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        {/* ── How buying works ── */}
        <section className="border-t border-theme bg-theme-section px-5 py-14 sm:px-6 md:py-20">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <SectionHeader
                align="start"
                label="How it works"
                title="From shortlist to handover."
                subtitle="Four steps, no showroom pressure. Start with a test drive and decide after."
                className="mb-0"
              />
              <Link
                href="#contact"
                onClick={() => track("book_test_drive_click", { location: "how_it_works" })}
                className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-semibold text-accent hover:text-theme-90"
              >
                Start with a test drive
                <ArrowRight size={15} aria-hidden />
              </Link>
            </div>

            <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {STEPS.map((step) => (
                <li
                  key={step.n}
                  className="border-t pt-4"
                  style={{ borderColor: "var(--cz-border-strong)" }}
                >
                  <span className="font-data text-xs font-medium text-accent">{step.n}</span>
                  <h3 className="mt-2 text-base font-semibold text-theme-90">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-theme-50">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Common questions ── */}
        <section className="border-t border-theme bg-theme px-5 py-14 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeader
              align="start"
              label="Before you book"
              title="The questions buyers ask first."
              subtitle="Straight answers on test drives, trade-in, loans and servicing in Miri."
              className="mb-0"
            />
            <div>
              {FAQS.map((item) => (
                <details
                  key={item.q}
                  onToggle={(e) => {
                    if (e.currentTarget.open) {
                      track("faq_open", { question: item.q });
                    }
                  }}
                  className="group border-b"
                  style={{ borderColor: "var(--cz-border)" }}
                >
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-[15px] font-semibold text-theme-90 marker:hidden sm:text-base">
                    {item.q}
                    <Plus
                      size={17}
                      className="shrink-0 text-accent transition-transform group-open:rotate-45"
                      aria-hidden
                    />
                  </summary>
                  <p className="max-w-[60ch] pb-4 pr-6 text-sm leading-relaxed text-theme-50">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Showroom ── */}
        <section className="relative overflow-hidden bg-theme px-5 py-14 sm:px-6 md:py-20">
          <div className="parking-lot-bg absolute inset-0 opacity-20" />
          <div className="relative mx-auto max-w-[1240px]">
            <SectionHeader
              icon={<MapPin size={12} />}
              label="The showroom"
              title="Visit Kah Progression Auto."
              subtitle="Test drives are held at the BYD 3S Centre on Jalan Krokop Utama. A home or office visit can also be arranged, within Miri."
            />

            <div className="grid w-full items-stretch gap-4 md:grid-cols-2">
              <div
                className="min-h-[320px] w-full min-w-0 overflow-hidden rounded-2xl border bg-theme-card"
                style={{ borderColor: "var(--cz-border)" }}
              >
                <iframe
                  src="https://www.google.com/maps?q=BYD+Kah+Progression+Auto+Lot+1829+Jalan+Krokop+Utama+98000+Miri+Sarawak&output=embed"
                  className="block h-full w-full max-w-full"
                  style={{ minHeight: "320px", filter: "invert(0.88) hue-rotate(160deg) saturate(0.7)" }}
                  loading="lazy"
                  allowFullScreen
                  title="BYD Kah Progression Auto Miri"
                />
              </div>

              <div className="flex min-w-0 flex-col justify-center gap-3">
                <div
                  className="rounded-xl border bg-theme-card p-5"
                  style={{ borderColor: "var(--cz-border)" }}
                >
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                    <div>
                      <h3 className="text-base font-semibold text-theme-90">
                        BYD Kah Progression Auto
                      </h3>
                      <p className="mt-0.5 text-[13px] text-theme-50">
                        Authorised BYD 3S Centre · Sales, service and spare parts
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-theme-50">
                        {SHOWROOM_ADDRESS}
                      </p>
                      <div className="mt-3 space-y-1 text-sm text-theme-50">
                        <p>
                          <span className="text-theme-70">Mon–Sat</span> · 9:00am–6:00pm
                        </p>
                        <p>
                          <span className="text-theme-70">Sun &amp; Public Holiday</span> ·
                          9:00am–4:00pm
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex min-w-0 flex-col gap-2 min-[420px]:flex-row">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=BYD+Kah+Progression+Auto+Lot+1829+Jalan+Krokop+Utama+98000+Miri+Sarawak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-outline flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335" />
                      <circle cx="12" cy="9" r="3" fill="white" />
                      <circle cx="12" cy="9" r="1.5" fill="#4285F4" />
                    </svg>
                    <span>Open in Google Maps</span>
                  </a>
                  <a
                    href="https://www.waze.com/ul?q=BYD%20Kah%20Progression%20Auto%20Lot%201829%20Jalan%20Krokop%20Utama%20Miri%20Sarawak&navigate=yes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-outline flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="11" fill="#33CCFF" />
                      <polygon points="3,11 22,2 13,21 11,13" fill="white" />
                    </svg>
                    <span>Navigate with Waze</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Booking ── */}
        <section
          id="contact"
          className="scroll-mt-24 border-t border-theme bg-theme-section px-5 py-14 sm:px-6 md:py-20"
        >
          <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <SectionHeader
                align="start"
                icon={<Clock size={12} />}
                label="Book a test drive"
                title="Book a test drive in Miri."
                subtitle="Pick a model and a preferred time. Test drives are held at the showroom on Jalan Krokop Utama. No obligation."                size="lg"
                className="mb-6"
              />

              <div
                className="flex items-center gap-4 rounded-2xl border bg-theme-card p-4"
                style={{ borderColor: "var(--cz-border)" }}
              >
                <Img
                  src="/ridzuan.jpg"
                  alt="Ridzuan Jahari, BYD Sales Advisor in Miri"
                  className="h-16 w-16 shrink-0 rounded-full border object-cover"
                  style={{ borderColor: "var(--cz-border-strong)" }}
                />
                <div className="min-w-0">
                  <p className="text-base font-semibold text-theme-90">Ridzuan Jahari</p>
                  <p className="text-[13px] text-theme-50">
                    Sales Advisor · Kah Progression Auto
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <a
                      href={`tel:${PHONE_E164}`}
                      onClick={() => track("phone_click", { location: "booking" })}
                      className="inline-flex min-h-11 items-center text-sm font-medium text-accent hover:text-theme-90"
                    >
                      {PHONE_DISPLAY}
                    </a>
                    <a
                      href={TEST_DRIVE_WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("whatsapp_click", { location: "booking" })}
                      className="inline-flex min-h-11 items-center text-sm font-medium text-theme-50 underline decoration-theme-30 underline-offset-4 hover:text-theme-90"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2.5 text-sm text-theme-50">
                <p className="flex items-start gap-2.5">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span>{SHOWROOM_ADDRESS}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Clock size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span>
                    Mon–Sat 9:00am–6:00pm
                    <br />
                    Sun &amp; public holiday 9:00am–4:00pm
                  </span>
                </p>
              </div>

              <ul className="mt-5 space-y-2 text-sm text-theme-50">
                {[
                  "Loan estimate and bank submission",
                  "Trade-in valuation at the showroom",
                  "Service and warranty support in Miri",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ShieldCheck size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl border bg-theme-card p-5 sm:p-6"
              style={{ borderColor: "var(--cz-border)" }}
            >
              <h3 className="text-lg font-semibold text-theme-90">Request a test drive</h3>
              <p className="mt-1 text-sm text-theme-50">
                A few details and a preferred time. It opens WhatsApp with the message ready to
                send.
              </p>
              <div className="mt-5">
                <TestDriveForm />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      {/* ── Calculator Modal ── */}
      <Modal
        open={!!selectedVehicle}
        onClose={handleClose}
        label={selectedVehicle?.name ?? "Calculator"}
        closeRef={calcCloseRef}
        className="max-w-2xl p-5 md:max-w-4xl md:p-6"
      >
        {selectedVehicle && (
          <>
            <div className="mb-3 text-center">
              <h3 id="calc-modal-title" className="text-lg font-semibold text-theme-90">
                {selectedVehicle.name}
              </h3>
              <p className="mt-0.5 text-xs text-theme-50">{selectedVehicle.category}</p>
            </div>

            <div className="mb-3 grid grid-cols-3 justify-items-center gap-x-1.5 gap-y-1.5 md:grid-cols-6">
              <span className="specs-bar-item w-full justify-center">
                <Gauge className="spec-icon" aria-hidden />
                {selectedVehicle.range} km
              </span>
              <span className="specs-bar-item w-full justify-center">
                <Battery className="spec-icon" aria-hidden />
                {selectedVehicle.battery} kWh
              </span>
              <span className="specs-bar-item w-full justify-center">
                <span className="spec-icon flex items-center justify-center text-[10px] font-bold">
                  {selectedVehicle.seats}
                </span>
                {selectedVehicle.seats}-Seater
              </span>
              <span className="specs-bar-item w-full justify-center">
                <CircleDot className="spec-icon" aria-hidden />
                {selectedVehicle.driveType}
              </span>
              <span className="specs-bar-item w-full justify-center">
                <Zap className="spec-icon" aria-hidden />
                {selectedVehicle.power} kW
              </span>
              <span className="specs-bar-item w-full justify-center">
                <span className="spec-icon flex items-center justify-center text-[10px] font-bold">
                  Nm
                </span>
                {selectedVehicle.torque} Nm
              </span>
            </div>

            <div className="mb-3 text-center">
              <a
                href={selectedVehicle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-1.5 py-2 text-xs font-medium text-accent transition-colors hover:underline hover:decoration-from-font"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Brochure
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60" aria-hidden>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            <h3
              className="mb-3 text-center font-display text-xl text-theme-90"
              style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              Loan calculator
            </h3>

            <Calculator vehicle={selectedVehicle} />
          </>
        )}
      </Modal>
    </>
  );
}
