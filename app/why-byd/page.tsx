"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  BadgeCheck,
  Cable,
  Zap,
  Car,
  Users,
  VolumeX,
  Smartphone,
  Heart,
  Menu,
  X,
  CheckCircle2,
  ExternalLink,
  Factory,
  MapPin,
  Globe2,
  ChevronDown,
  Cpu,
  Battery,
} from "lucide-react";
import { Img } from "@/components/img";
import VideoEmbed from "@/components/video-embed";
import CheckEligibilityForm from "@/components/check-eligibility-form";
import { vehicles } from "@/lib/vehicles";
import { fmt } from "@/lib/finance";

type Faq = { q: string; a: string };

function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mt-4 border-t pt-3" style={{ borderColor: "var(--cz-border)" }}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-theme-40 mb-2">
        FAQs
      </p>
      <div className="divide-y" style={{ borderColor: "var(--cz-border)" }}>
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-start justify-between gap-3 py-2 text-left text-xs text-theme-60 hover:text-theme-90 transition-colors"
              >
                <span className="leading-snug">{item.q}</span>
                <ChevronDown
                  size={13}
                  className={`shrink-0 mt-0.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <p className="pb-2.5 pr-5 text-[11px] text-theme-40 leading-relaxed">{item.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const advantages = [
  {
    icon: Zap,
    title: "World's No. 1 NEV Seller",
    subtitle: "The Numbers Speak for Themselves",
    image: "/images/hero/byd-nev.webp",
    imageAlt: "BYD vehicles at a production and export facility",
    points: [
      "2.26 million battery-electric cars sold in 2025 — beating Tesla's 1.64 million deliveries",
      "Including plug-in hybrids, total NEV sales reached 4.27 million units in 2024",
      "Cumulative NEVs sold globally passed 17.3 million by 2026",
      "Vertically integrated — batteries, motors, chips, in-house",
      "Second-largest EV battery maker worldwide (after CATL), 17.9% share in 2025",
    ],
  },
  {
    icon: Shield,
    title: "Blade Battery Technology",
    subtitle: "The Safest EV Battery Ever Made",
    image: "/images/hero/atto3premium.webp",
    imageAlt: "BYD Blade Battery powered Atto 3",
    points: [
      "Nail penetration test — no fire, no smoke, surface stayed 30–60°C",
      "LFP chemistry — no oxygen release, stable well past 200°C where NMC struggles",
      "Cell-to-body structure — each cell acts as a structural beam; +50% space utilisation",
      "Over 5,000 charge cycles — a service life equivalent to 1.2 million km",
    ],
    faqs: [
      {
        q: "What is the Blade Battery?",
        a: "A lithium iron phosphate (LFP) battery designed by BYD. Its long, blade-shaped cells sit flat in a honeycomb pack with no intermediate modules, which makes it compact, strong and stable.",
      },
      {
        q: "Why is it safer than other EV batteries?",
        a: "LFP releases no oxygen when hot, so it resists thermal runaway. In the nail penetration test the Blade Battery produced no smoke or fire, with surface temperature reaching only 30–60°C.",
      },
      {
        q: "How long will the battery last?",
        a: "BYD rates it for over 5,000 charge and discharge cycles — a service life equivalent to roughly 1.2 million kilometres — while retaining at least 70% capacity through the warranty period.",
      },
      {
        q: "Which BYD models use it?",
        a: "Every BYD passenger EV and DM-i plug-in hybrid, including the Atto 2, Atto 3, Dolphin, M6, Seal, Seal 6 and Sealion 7.",
      },
      {
        q: "Is the battery recyclable?",
        a: "Yes. Blade Batteries are designed to be recyclable, with processes that recover valuable materials.",
      },
    ],
    videoId: "CGQwqWqzkNA",
    link2: {
      text: "BYD Blade Battery official page →",
      url: "https://byd.simemotors.my/byd-blade-battery",
    },
  },
  {
    icon: Cpu,
    title: "e-Platform 3.0",
    subtitle: "The Architecture Underneath Every BYD",
    image: "/images/hero/e-platform-3.webp",
    imageAlt: "BYD e-Platform 3.0 architecture — Blade Battery, 8-in-1 drive and thermal system",
    points: [
      "Blade Battery integrated into the chassis — doubles body rigidity",
      "World's first mass-produced 8-in-1 electric drive, up to 89% system efficiency",
      "Heat pump and direct battery heating — steady range from -30°C to 60°C",
      "Flat battery layout gives a completely flat rear floor and more cabin space",
      "Drag coefficient as low as 0.21 Cd; supports 800V architecture and rapid charging",
    ],
    faqs: [
      {
        q: "What is e-Platform 3.0?",
        a: "BYD's dedicated electric vehicle architecture. It bundles the Blade Battery, an 8-in-1 drive unit and a high-efficiency heat pump into one integrated system rather than assembling parts from many suppliers.",
      },
      {
        q: "How does it make the car safer?",
        a: "The Blade Battery becomes part of the chassis structure, doubling body rigidity and lowering the centre of gravity. That improves both crash resistance and stability.",
      },
      {
        q: "Does it help with range in hot weather?",
        a: "Yes. Direct battery heating and cooling plus a heat pump keep cells in their efficient window, with BYD quoting stable operation from -30°C up to 60°C and up to 20% better electrical efficiency.",
      },
      {
        q: "Do all BYD models use it?",
        a: "It underpins BYD's electric and plug-in hybrid ranges, adapted per model for the best balance of performance, space and reliability.",
      },
    ],
    link2: {
      text: "BYD e-Platform 3.0 official page →",
      url: "https://www.byd.com/uk/technology/byd-e-platform-3",
    },
  },
  {
    icon: BadgeCheck,
    title: "Industry-Leading Warranty",
    subtitle: "Peace of Mind, Standard",
    image: "/images/hero/warranty.webp",
    imageAlt: "BYD service centre — warranty and after-sales care",
    points: [
      "6 years or 150,000 km vehicle warranty",
      "8 years or 160,000 km High-Voltage Blade Battery warranty",
      "Separate 8-year or 160,000 km Drive Unit coverage (motor, controller, DC assembly)",
      "Minimum 70% state of health guaranteed for the battery warranty period",
      "Valid at any authorised BYD service centre nationwide",
    ],
    faqs: [
      {
        q: "Is the 8-year battery warranty based on time or mileage?",
        a: "Whichever comes first. The Blade Battery is covered for 8 years or 160,000 km — if you reach the mileage limit first, battery cover ends there even if the car is under 8 years old.",
      },
      {
        q: "What does the basic warranty cover?",
        a: "Manufacturing defects on mechanical and electrical components across the vehicle, including the powertrain, cooling, suspension and steering systems. Wear-and-tear items follow shorter terms stated in the warranty booklet.",
      },
      {
        q: "What happens after the 6-year vehicle warranty ends?",
        a: "The high-voltage Blade Battery and drive unit keep their own 8-year / 160,000 km cover, so the electric heart of the car stays protected beyond the basic term.",
      },
      {
        q: "Does the warranty transfer if I sell the car?",
        a: "In most cases yes — the remaining warranty stays with the vehicle, which supports resale value. Terms are set out in the warranty booklet.",
      },
      {
        q: "Will skipping scheduled servicing void the warranty?",
        a: "Yes. Servicing must follow BYD's recommended schedule at an authorised centre. Keep your service records — they are required for any warranty claim.",
      },
    ],
  },
  {
    icon: Cable,
    title: "V2L — Vehicle-to-Load",
    subtitle: "Your Car Becomes a Power Station",
    image: "/images/hero/v2l.webp",
    imageAlt: "BYD Vehicle-to-Load (V2L) powering everyday appliances",
    points: [
      "Standard across ALL BYD models — no extra cost",
      "Power your home appliances, laptops, camping gear",
      "Up to 3.3 kW output — run a mini fridge, TV, lights",
      "Perfect for outdoor adventures, tailgating, emergencies",
      "Turn your car into a mobile power station on the go",
    ],
  },
];

const aboutBydPoints = [
  "Founded February 1995 in Shenzhen, China — over 30 industrial parks across six continents",
  "Dual-listed on the Hong Kong and Shenzhen stock exchanges; 2025 revenue exceeded RMB 804 billion",
  "Spans electronics, automotive, renewable energy, and rail transit — a vertically integrated high-tech group",
  "Pioneer of the Blade Battery and dual-mode hybrid technology that accelerated the shift away from fossil fuels",
  "NEVs present in 121 countries and regions worldwide",
];

const aboutBydMalaysiaPoints = [
  "Launched December 2022 through a strategic partnership between BYD Auto Industry and Sime Motors",
  "Official distributor: Beyond Auto (Sime Motors) — first BYD EVs for Malaysia's passenger market",
  "First model unveiled: the BYD ATTO 3 — over 1,000 orders within the first 10 days",
  "1,000 ATTO 3 units delivered within the first 100 days; the BYD DOLPHIN followed in mid-2023",
  "Showroom network nationwide — flagship in Ara Damansara plus a KL city outlet at TREC, Jalan Tun Razak",
  "Three authorised Body & Paint Centres in Penang, Bukit Jelutong (Klang Valley), and Johor Bahru",
];

const salesPoints = [
  {
    icon: Zap,
    title: "Savings",
    desc: "Charge from as low as RM0.04/km — ~90% less than petrol. No fuel price volatility. Lower maintenance costs (fewer moving parts).",
  },
  {
    icon: Car,
    title: "Comfort",
    desc: "Silent, smooth, spacious. Every ride feels first-class.",
  },
  {
    icon: Smartphone,
    title: "Technology",
    desc: "Rotating touchscreen, app control, OTA updates, voice commands.",
  },
  {
    icon: VolumeX,
    title: "Silence",
    desc: "Zero engine noise. Enjoy your music, your conversation, your drive.",
  },
  {
    icon: Users,
    title: "Family Usability",
    desc: "Spacious cabins, ISOFIX standard, V2L for family outings.",
  },
  {
    icon: Heart,
    title: "Instant Pickup",
    desc: "Instant torque. 0–100 km/h from 3.8s (Seal AWD). Thrill without fuel.",
  },
];

export default function WhyBydPage() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className="min-h-screen" style={{  }}>
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-theme/80 backdrop-blur-xl border-b border-[color:var(--cz-border)]">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-theme shrink-0" aria-label="BYD Miri Home">
            <Img src="/byd-logo-white.svg" alt="BYD" className="h-3.5 w-auto -mt-[2px]" />
            <span className="font-wordmark text-[11px] ml-2">| MIRI</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-1 md:gap-3 ml-auto">
            <Link href="/" className="hover:text-theme-90 transition-colors shrink-0 text-[11px] font-medium text-theme-50 px-2 py-3 whitespace-nowrap">
              Home
            </Link>
            <Link href="/#full-lineup" className="hover:text-theme-90 transition-colors shrink-0 text-[11px] font-medium text-theme-50 px-2 py-3 whitespace-nowrap">
              Models
            </Link>
            <Link href="/why-byd" className="hover:text-theme-90 transition-colors shrink-0 text-[11px] font-medium text-theme-90 px-2 py-3 whitespace-nowrap">
              Why BYD
            </Link>
            <Link href="/charging" className="hover:text-theme-90 transition-colors shrink-0 text-[11px] font-medium text-theme-50 px-2 py-3 whitespace-nowrap">
              Charging, Savings &amp; Warranty
            </Link>
                          <Link
                href="#contact" className="hover:text-theme-90 transition-colors shrink-0 text-[11px] font-medium text-theme-50 px-2 py-3 whitespace-nowrap">
              Contact Us
            </Link>
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
                onClick={() => setNavOpen(false)}
                className="flex items-center min-h-11 px-3 rounded-lg text-sm font-medium text-theme-70 hover:text-theme hover:bg-white/5 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/#full-lineup"
                onClick={() => setNavOpen(false)}
                className="flex items-center min-h-11 px-3 rounded-lg text-sm font-medium text-theme-70 hover:text-theme hover:bg-white/5 transition-colors"
              >
                Models
              </Link>
              <Link
                href="/why-byd"
                onClick={() => setNavOpen(false)}
                className="flex items-center min-h-11 px-3 rounded-lg text-sm font-medium text-theme hover:bg-white/5 transition-colors"
              >
                Why BYD
              </Link>
              <Link
                href="/charging"
                onClick={() => setNavOpen(false)}
                className="flex items-center min-h-11 px-3 rounded-lg text-sm font-medium text-theme-70 hover:text-theme hover:bg-white/5 transition-colors"
              >
                Charging, Savings &amp; Warranty
              </Link>
              <Link
                href="/#contact"
                onClick={() => setNavOpen(false)}
                className="flex items-center min-h-11 px-3 rounded-lg text-sm font-medium text-theme-70 hover:text-theme hover:bg-white/5 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main id="main-content" tabIndex={-1} className="outline-none">
      {/* ── Hero — Minimal: pure paper, no decoration ── */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-theme">
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div>
            <span className="label-mono justify-center mb-5">
              <BadgeCheck size={12} />
              BYD Miri &amp; Sarawak
            </span>
            <h1 className="font-display text-[34px] sm:text-5xl md:text-6xl mb-5">
              <span className="text-theme-90">BYD in Miri &amp; Sarawak —</span>
              <br />
              <strong className="text-accent">test drive, price &amp; financing.</strong>
            </h1>
            <p className="text-base md:text-lg text-theme-50 max-w-2xl mx-auto leading-relaxed">
              BYD is available in Miri, Sarawak through authorised dealer Kah Progression Auto.
              Test drives, financing and after-sales support for all 10 BYD models — Atto 2, Atto 3,
              Seal 6, Sealion 7, Seal and M6 — are handled locally by Ridzuan Jahari, with prices
              from <strong className="text-theme-70">RM106,353</strong> and monthly instalments
              from <strong className="text-theme-70">RM979</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Brand Stat Bar ── */}
      <section className="relative px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-[color:var(--cz-border)] bg-theme-alt"
          >
            {[
              { value: "2.26M", label: "Battery-Electric Cars Sold (2025)" },
              { value: "4.60M", label: "Total NEVs Delivered (2025)" },
              { value: "17.3M+", label: "Cumulative NEVs Sold" },
              { value: "121", label: "Countries & Regions" },
            ].map((stat) => (
              <div key={stat.label} className="bg-theme-card p-5 text-center">
                <div className="font-data text-2xl md:text-3xl font-semibold text-theme-90">
                  {stat.value}
                </div>
                <div className="text-xs text-theme-40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Advantages Grid ── */}
      <section className="relative px-6 pb-16 md:pb-24">
        <div className="absolute inset-0 parking-lot-bg opacity-20" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-theme-90">
              Why the World Is Choosing BYD
            </h2>
            <p className="text-sm text-theme-40 mt-2 max-w-2xl mx-auto">
              BYD sold 2.26 million battery-electric cars in 2025 — more than any other brand — across
              121 countries. That scale comes from building its own batteries, motors and chips, which
              keeps servicing simple and prices competitive.
            </p>
          </div>

          <div className="space-y-4">
            {advantages.map((adv) => (
              <div
                key={adv.title}
                className="rounded-2xl border p-5 md:p-6"
                style={{ borderColor: "var(--cz-border)", backgroundColor: "var(--cz-bg-card)" }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                  {/* Media column — video wins, fall back to image, then icon-only.
                      Image is preferred over bare icons: a real photo of the
                      car/feature builds trust faster than a glyph. */}
                  {adv.videoId ? (
                    <div className="w-full md:w-2/5 shrink-0">
                      <VideoEmbed videoId={adv.videoId} title={`${adv.title} — official test video`} />
                    </div>
                  ) : adv.image ? (
                    <div className="w-full md:w-2/5 shrink-0">
                      <Img
                        src={adv.image}
                        alt={adv.imageAlt || adv.title}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  ) : null}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--cz-accent-soft)", border: "1px solid var(--cz-accent-line)", color: "var(--cz-accent)" }}>
                        <adv.icon size={18} />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-bold text-theme-90 leading-tight">{adv.title}</h3>
                        <p className="text-xs text-theme-40">{adv.subtitle}</p>
                      </div>
                    </div>
                    <ul className="space-y-1.5 mt-3">
                      {adv.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-theme-60">
                          <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    {adv.faqs && <FaqAccordion items={adv.faqs} />}
                    {adv.link2 && (
                      <div className="mt-3">
                        <a
                          href={adv.link2.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 min-h-9 py-2 text-xs font-medium text-theme-40 hover:text-theme-60 transition-colors"
                        >
                          <ExternalLink size={11} />
                          {adv.link2.text}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-theme-30 mt-5 text-center leading-relaxed">
            Sources: BYD annual results and company sales releases; SNE Research (battery market share); BYD Malaysia by Sime Motors. Sales figures as of full-year 2025.
          </p>
        </div>
      </section>

      {/* ── About BYD — global + Malaysia ── */}
      <section className="relative px-6 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="label-mono justify-center mb-3">
              <Factory size={12} />
              The Company Behind the Car
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold text-theme-90">
              About BYD in Malaysia
            </h2>
            <p className="text-sm text-theme-40 mt-2 max-w-xl mx-auto">
              From Shenzhen to Sarawak — the story behind the world&apos;s largest new energy vehicle maker.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div
              className="rounded-2xl border p-5 md:p-6"
              style={{ borderColor: "var(--cz-border)", backgroundColor: "var(--cz-bg-card)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--cz-accent-soft)", border: "1px solid var(--cz-accent-line)", color: "var(--cz-accent)" }}>
                  <Globe2 size={18} />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-theme-90 leading-tight">Global</h3>
                  <p className="text-xs text-theme-40">Build Your Dreams · since 1995</p>
                </div>
              </div>
              <ul className="space-y-1.5">
                {aboutBydPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-theme-60">
                    <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href="https://byd.simemotors.my/about-byd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 min-h-9 py-2 mt-3 text-xs font-medium text-theme-40 hover:text-theme-60 transition-colors"
              >
                <ExternalLink size={11} />
                About BYD — official page →
              </a>
            </div>

            <div
              className="rounded-2xl border p-5 md:p-6"
              style={{ borderColor: "var(--cz-border)", backgroundColor: "var(--cz-bg-card)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--cz-accent-soft)", border: "1px solid var(--cz-accent-line)", color: "var(--cz-accent)" }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-theme-90 leading-tight">In Malaysia</h3>
                  <p className="text-xs text-theme-40">Sime Motors · launched Dec 2022</p>
                </div>
              </div>
              <ul className="space-y-1.5">
                {aboutBydMalaysiaPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-theme-60">
                    <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border p-5 md:p-6 bg-accent-soft" style={{ borderColor: "var(--cz-accent-line)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin size={14} className="text-accent shrink-0" />
                  <h3 className="text-base font-bold text-theme-90">And in Miri</h3>
                </div>
                <p className="text-sm text-theme-70 leading-relaxed">
                  BYD is available in Sarawak through Kah Progression Auto, the authorised BYD dealer in Miri —
                  sales, financing, and after-sales support for the full lineup, handled locally by Ridzuan Jahari.
                </p>
              </div>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold bg-accent"
                style={{ color: "var(--cz-accent-ink)" }}
              >
                Visit Us in Miri
              </Link>
            </div>
            <p className="text-[11px] text-theme-40 mt-3">
              Source: BYD Malaysia by Sime Motors. Brand and distributor facts as published by the official distributor; subject to change.
            </p>
          </div>
        </div>
      </section>

      {/* ── What We Sell (Sales Rules) ── */}
      <section className="relative px-6 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--cz-bg) 0%, var(--cz-bg-alt) 50%, var(--cz-bg) 100%)" }} />
        
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-10">
            <span className="label-mono justify-center mb-3">
              <Heart size={12} />
              It&rsquo;s Not About Specs
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold text-theme-90">
              What You Get for Your Money with BYD
            </h2>
            <p className="text-sm text-theme-40 mt-2 max-w-xl mx-auto">
              We don&apos;t sell kilowatts. We sell what matters — how it feels, how it fits your life, what you save.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {salesPoints.map((pt) => (
              <div
                key={pt.title}
                className="rounded-xl border p-4"
                style={{ borderColor: "var(--cz-border)", backgroundColor: "var(--cz-bg-card)" }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--cz-accent-soft)", border: "1px solid var(--cz-accent-line)", color: "var(--cz-accent)" }}>
                    <pt.icon size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-theme-80">{pt.title}</h3>
                </div>
                <p className="text-xs text-theme-50 leading-relaxed">{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BYD Prices in Sarawak ── */}
      <section className="relative px-6 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="label-mono justify-center mb-3">
              <Car size={12} />
              OTR Sarawak
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold text-theme-90">
              BYD Prices in Miri &amp; Sarawak
            </h2>
            <p className="text-sm text-theme-40 mt-2 max-w-2xl mx-auto">
              OTR prices for Sarawak, including road tax and insurance estimate. Prices shown are before
              rebate — ask for the current promotion.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--cz-border)" }}>
            <table className="w-full min-w-[560px] text-left border-collapse">
              <caption className="sr-only">BYD OTR prices and driving range in Sarawak</caption>
              <thead>
                <tr style={{ backgroundColor: "var(--cz-bg-alt)" }}>
                  <th scope="col" className="px-4 py-3 text-xs font-semibold text-theme-70">Model</th>
                  <th scope="col" className="px-4 py-3 text-xs font-semibold text-theme-70">Type</th>
                  <th scope="col" className="px-4 py-3 text-xs font-semibold text-theme-70 text-right">OTR Price</th>
                  <th scope="col" className="px-4 py-3 text-xs font-semibold text-theme-70 text-right">Range</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id} className="border-t" style={{ borderColor: "var(--cz-border)" }}>
                    <th scope="row" className="px-4 py-2.5 text-sm font-medium text-theme-80">{v.name}</th>
                    <td className="px-4 py-2.5 text-xs text-theme-40">{v.category}</td>
                    <td className="px-4 py-2.5 text-sm text-theme-70 text-right tabular-nums whitespace-nowrap">RM{fmt(v.otr)}</td>
                    <td className="px-4 py-2.5 text-xs text-theme-40 text-right tabular-nums whitespace-nowrap">{v.range} km</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-theme-30 mt-3 text-center">
            Prices as listed by the authorised distributor and subject to change. Confirm your exact quote in Miri before booking.
          </p>
        </div>
      </section>

      {/* ── Charging in Sarawak ── */}
      <section className="relative px-6 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="label-mono justify-center mb-3">
              <Battery size={12} />
              Living With an EV Here
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold text-theme-90">
              Charging a BYD in Sarawak
            </h2>
          </div>

          <div className="space-y-4 text-sm text-theme-60 leading-relaxed">
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

          <div className="grid sm:grid-cols-3 gap-3 mt-6">
            {[
              { route: "Miri → Bintulu", km: "~200 km", note: "Single charge" },
              { route: "Miri → Limbang", km: "~230 km", note: "Single charge" },
              { route: "Miri → Lawas", km: "~230 km", note: "Single charge" },
            ].map((r) => (
              <div key={r.route} className="rounded-xl border p-4" style={{ borderColor: "var(--cz-border)", backgroundColor: "var(--cz-bg-card)" }}>
                <div className="text-xs text-theme-40">{r.route}</div>
                <div className="font-data text-lg font-semibold text-theme-80 mt-1 tabular-nums">{r.km}</div>
                <div className="text-[11px] text-accent mt-0.5">{r.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Test Drive & FAQ ── */}
      <section className="relative px-6 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="label-mono justify-center mb-3">
              <MapPin size={12} />
              Miri Showroom · Sarawak
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold text-theme-90">
              Test Drive a BYD in Miri
            </h2>
            <p className="text-sm text-theme-40 mt-2 max-w-2xl mx-auto">
              Test drives are held at our Miri showroom on Jalan Krokop Utama. Get in contact with
              Ridzuan and set an appointment according to your convenience. Bring your IC and driving
              licence — allow about 30 minutes.
            </p>
          </div>

          <div className="rounded-2xl border p-5 md:p-6" style={{ borderColor: "var(--cz-border)", backgroundColor: "var(--cz-bg-card)" }}>
            <h3 className="text-base font-bold text-theme-80 mb-3">Common questions</h3>
            <div className="space-y-3">
              {[
                {
                  q: "Is there a BYD dealer in Miri?",
                  a: "Yes — BYD is represented in Miri by Kah Progression Auto, an authorised dealer. Sales, financing, test drives and warranty support are handled locally.",
                },
                {
                  q: "How much is a BYD in Sarawak?",
                  a: "Prices start at RM106,353 OTR for the Atto 2 Premium and reach RM213,073 for the Sealion 7 Performance. Monthly instalments start around RM979.",
                },
                {
                  q: "Do I have to send my car to Kuching for servicing?",
                  a: "No. Servicing and warranty work are carried out at authorised BYD service centres, coordinated locally in Miri.",
                },
                {
                  q: "What warranty comes with a BYD in Malaysia?",
                  a: "6 years or 150,000 km on the vehicle, plus a separate 8-year or 160,000 km High-Voltage Blade Battery warranty with a guaranteed 70% minimum state of health.",
                },
                {
                  q: "Can I trade in my current car?",
                  a: "Yes. Trade-in can be arranged against any BYD model — ask for a valuation when you book your test drive.",
                },
              ].map((f) => (
                <details key={f.q} className="border-t pt-3" style={{ borderColor: "var(--cz-border)" }}>
                  <summary className="cursor-pointer text-sm font-medium text-theme-70 hover:text-theme-90 transition-colors">
                    {f.q}
                  </summary>
                  <p className="text-xs text-theme-40 leading-relaxed mt-1.5">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="relative px-6 pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden scroll-mt-24">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--cz-bg) 0%, var(--cz-bg-alt) 50%, var(--cz-bg) 100%)" }} />
        
        <div className="max-w-3xl mx-auto relative text-center">
          <div className="space-y-5 animate-fade-up">
            <span className="label-mono justify-center">
              <Car size={12} />
              Ready to Go Electric?
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-theme-90">
              Get Your BYD Price in Miri
            </h2>
            <p className="text-sm md:text-base text-theme-50 max-w-lg mx-auto">
              See your monthly instalment in seconds — no registration required. Test drives are
              available at the Miri showroom.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
              <Link
                href="/#full-lineup"
                className="hero-cta inline-flex items-center gap-2.5 bg-accent px-8 py-3.5 rounded-full font-bold text-sm"
                style={{ color: "var(--cz-accent-ink)" }}
              >
                <span className="relative z-10">Browse BYD Models</span>
              </Link>
              <a
                href="https://wa.me/601131933930?text=Saya%20berminat%20dengan%20BYD!%20Boleh%20bantu%20saya%20dengan%20maklumat%20lanjut%3F%20Terima%20kasih!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[color:var(--cz-border-strong)] text-theme-70 text-sm font-semibold hover:bg-theme-alt hover:text-theme transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat with Ridzuan
              </a>
            </div>

            {/* Eligibility check — always visible */}
            <div className="pt-6 border-t border-[color:var(--cz-border)]">
              <p className="text-xs text-theme-30 mb-3 text-center">
                Not sure if you&apos;re eligible? Let us check for you — free & no obligation.
              </p>
              <div className="max-w-md mx-auto">
                <CheckEligibilityForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[color:var(--cz-border)] py-8 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-counter mt-3 max-w-md mx-auto leading-relaxed">
            All comparisons and estimates are for illustrative purposes only. Data as of August 2026. Subject to change. Verify with authorised BYD dealer.
          </p>
          <p className="text-xs text-theme-20 mt-1.5">&copy; 2026 Ridzuan Jahari. All rights reserved.</p>
        </div>
      </footer>
      </main>
    </div>
  );
}
