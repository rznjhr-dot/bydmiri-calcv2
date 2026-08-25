"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  BadgeCheck,
  Cable,
  Zap,
  Gauge,
  Car,
  Users,
  VolumeX,
  Smartphone,
  Heart,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  ClipboardCheck,
  ChevronDown,
} from "lucide-react";
import { Img } from "@/components/img";
import VideoEmbed from "@/components/video-embed";
import CheckEligibilityForm from "@/components/check-eligibility-form";
import { usePageMeta } from "@/lib/use-page-meta";

const advantages = [
  {
    icon: Shield,
    title: "Blade Battery Technology",
    subtitle: "The Safest EV Battery Ever Made",
    image: "/images/hero/atto3premium.jpg",
    imageAlt: "BYD Blade Battery powered Atto 3",
    points: [
      "Passed nail penetration test — no fire, no explosion",
      "LFP chemistry — longer lifespan, more stable than NMC",
      "Cell-to-pack design — higher density, better cooling",
      "Over 500,000 km battery life expectancy",
    ],
    videoId: "CGQwqWqzkNA",
    link2: {
      text: "BYD Blade Battery official page →",
      url: "https://byd.simemotors.my/byd-blade-battery",
    },
  },
  {
    icon: BadgeCheck,
    title: "Industry-Leading Warranty",
    subtitle: "Peace of Mind, Standard",
    image: "/images/hero/sealpremium.jpg",
    imageAlt: "BYD Seal — backed by 6+8 year warranty",
    points: [
      "6 years or 150,000 km vehicle warranty",
      "8 years or 160,000 km battery warranty",
      "Covers Blade Battery against defects and capacity loss",
      "Valid at any authorised BYD service centre nationwide",
      "Malaysia's most comprehensive EV warranty package",
    ],
  },
  {
    icon: Cable,
    title: "V2L — Vehicle-to-Load",
    subtitle: "Your Car Becomes a Power Station",
    image: "/images/hero/sealion7premium.jpg",
    imageAlt: "BYD Sealion 7 — V2L capable",
    points: [
      "Standard across ALL BYD models — no extra cost",
      "Power your home appliances, laptops, camping gear",
      "Up to 3.3 kW output — run a mini fridge, TV, lights",
      "Perfect for outdoor adventures, tailgating, emergencies",
      "Turn your car into a mobile power station on the go",
    ],
  },
  {
    icon: Zap,
    title: "World's #1 NEV Manufacturer",
    subtitle: "Global Leadership You Can Trust",
    image: "/images/hero/m6.jpg",
    imageAlt: "BYD M6 — best-selling EV family MPV",
    points: [
      "Largest new energy vehicle maker in the world (2024–2025)",
      "Over 17 million electrified vehicles sold globally",
      "Vertically integrated — batteries, motors, chips, in-house",
      "Second-largest EV battery maker worldwide (after CATL)",
      "Trusted by Warren Buffett's Berkshire Hathaway since 2008",
    ],
  },
];

const comparisons = [
  {
    title: "BYD Atto 3 vs Proton e.MAS 7",
    byd: {
      name: "Atto 3 Ultra",
      tag: "Proven EV Platform",
      items: [
        "480 km range (NEDC)",
        "60.48 kWh Blade Battery",
        "V2L standard — power your devices",
        "6+8 year warranty",
        "7.3s 0–100 km/h",
        "1 million+ Atto 3s sold worldwide",
      ],
    },
    vs: {
      name: "e.MAS 7",
      tag: "First Generation EV",
      items: [
        "~450 km range",
        "60 kWh battery",
        "5 year vehicle warranty",
        "~8.5s 0–100 km/h",
        "5-seat SUV",
        "Front-wheel drive",
      ],
    },
    verdict:
      "Atto 3 offers more range, proven safety (285.6 GWh Blade Battery installed in 2025), V2L, and a comprehensive warranty — all backed by the world's #1 EV maker.",
    bydImage: "/images/hero/atto3premium.jpg",
    bydImageAlt: "BYD Atto 3 Ultra",
  },
  {
    title: "BYD Seal vs Tesla Model 3",
    byd: {
      name: "Seal Premium",
      tag: "650 km Range",
      items: [
        "650 km range (NEDC)",
        "82.56 kWh Blade Battery",
        "V2L standard",
        "5.9s 0–100 km/h (RWD)",
        "More rear legroom & comfort",
      ],
    },
    vs: {
      name: "Model 3 Premium LR",
      tag: "513 km Range",
      items: [
        "513 km range (WLTP)",
        "60 kWh LFP battery",
        "V2L via optional adapter",
        "6.1s 0–100 km/h (RWD)",
        "5-seat sedan",
      ],
    },
    verdict:
      "Seal delivers superior range and a comprehensive warranty at a competitive price point with V2L included as standard.",
    bydImage: "/images/hero/sealpremium.jpg",
    bydImageAlt: "BYD Seal Premium",
  },
  {
    title: "BYD M6 — The Only EV MPV Under RM150k",
    byd: {
      name: "M6 Extended",
      tag: "Category Leader",
      items: [
        "7-seater — only EV MPV under RM150k",
        "530 km range (NEDC)",
        "71.8 kWh battery",
        "RM 130,729 OTR",
        "V2L standard",
        "Perfect for families",
      ],
    },
    vs: {
      name: "Competitors",
      tag: "Segment",
      items: [
        "5-seat EVs in similar price range",
        "Chery OMODA E5: RM99k, 5-seat SUV",
        "MG4: RM101k, 5-seat hatchback",
        "Proton e.MAS 7: RM97k, 5-seat SUV",
        "No 7-seat EV under RM150k alternative",
        "M6 is the only 7-seat EV MPV option",
      ],
    },
    verdict:
      "M6 stands alone as the only 7-seat EV MPV under RM150,000 in Malaysia — ideal for families who need space and range.",
    bydImage: "/images/hero/m6.jpg",
    bydImageAlt: "BYD M6 Extended — 7-seat EV MPV",
  },
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
  usePageMeta(
    "Why BYD? | BYD Miri",
    "Why choose BYD? Blade Battery safety, 6+8 year warranty, V2L technology, and honest comparisons vs competitors. BYD Miri, Sarawak."
  );

  const [showForm, setShowForm] = useState(false);
  return (
    <div className="min-h-screen" style={{  }}>
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-theme/80 backdrop-blur-xl border-b border-[color:var(--cz-border)]">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-theme" aria-label="BYD Miri Home">
            <Img src="/byd-logo-white.svg" alt="BYD" className="h-3.5 w-auto -mt-[2px]" />
            <span className="font-wordmark text-[11px] ml-2">| MIRI</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 py-2 px-2 -mr-2 text-xs text-theme-50 hover:text-theme-80 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Calculator
          </Link>
        </div>
      </nav>

      {/* ── Hero — Minimal: pure paper, no decoration ── */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-theme">
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div>
            <span className="label-mono justify-center mb-5">
              <BadgeCheck size={12} />
              Why Choose BYD?
            </span>
            <h1 className="font-display text-[40px] sm:text-5xl md:text-6xl mb-5">
              <span className="text-theme-90">The smart switch,</span>
              <br />
              <strong className="text-accent">the clear choice.</strong>
            </h1>
            <p className="text-base md:text-lg text-theme-50 max-w-2xl mx-auto leading-relaxed">
              From the world&apos;s safest EV battery to the most comprehensive warranty in Malaysia —
              discover why BYD is Malaysia&apos;s fastest-growing automotive brand.
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
              { value: "#1", label: "World's NEV Maker" },
              { value: "17.3M+", label: "Electrified Vehicles Sold" },
              { value: "285.6 GWh", label: "Blade Battery Installed (2025)" },
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
              Engineered to Outperform
            </h2>
            <p className="text-sm text-theme-40 mt-2">
              Every BYD is built on years of R&D, vertical integration, and millions of real-world kilometres.
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
              What You Actually Gain
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

      {/* ── Curated Comparisons ── */}
      <section className="relative px-6 pb-16 md:pb-24">
        <div className="absolute inset-0 parking-lot-bg opacity-15" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-10">
            <span className="label-mono justify-center mb-3">
              <Gauge size={12} />
              How We Compare
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold text-theme-90">
              BYD vs The Rest
            </h2>
            <p className="text-sm text-theme-40 mt-2">
              Honest, real-world comparisons. See where BYD leads and why it matters to you.
            </p>
            <div className="mt-5 max-w-xl mx-auto rounded-lg border bg-counter-soft border-counter-line  p-3">
              <p className="text-[11px] text-counter leading-relaxed">
                <span className="font-semibold text-counter">⚠ Disclaimer:</span> All comparisons shown are for illustrative and suggestive purposes only. Competitor data sourced from publicly available information and may vary by variant, region, and specifications. BYD Miri makes no representations or warranties regarding the accuracy or completeness of competitor data. Pricing, specifications, and availability are subject to change without notice. Data as of August 2026.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {comparisons.map((cmp) => (
              <div
                key={cmp.title}
                className="rounded-2xl border p-5 md:p-6"
                style={{ borderColor: "var(--cz-border)", backgroundColor: "var(--cz-bg-card)" }}
              >
                <h3 className="text-base md:text-lg font-bold text-theme-80 mb-4">{cmp.title}</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* BYD side — model image + spec list */}
                  <div className="rounded-xl border border-[color:var(--cz-accent-line)] bg-accent-soft p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-accent text-xs font-bold uppercase tracking-wide">BYD</span>
                    </div>
                    <div
                      className="rounded-lg overflow-hidden border mb-3"
                      style={{ borderColor: "var(--cz-accent-line)", backgroundColor: "var(--cz-input)" }}
                    >
                      <Img
                        src={cmp.bydImage}
                        alt={cmp.bydImageAlt}
                        className="w-full object-contain"
                        style={{ aspectRatio: "2572/1200" }}
                      />
                    </div>
                    <div className="text-theme-90 font-bold text-sm mb-1">{cmp.byd.name}</div>
                    <div className="text-[11px] text-accent mb-2">{cmp.byd.tag}</div>
                    <ul className="space-y-1">
                      {cmp.byd.items.map((item) => (
                        <li key={item} className="flex items-start gap-1.5 text-xs text-theme-60">
                          <CheckCircle2 size={11} className="text-accent shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* VS side */}
                  <div className="rounded-xl border border-[color:var(--cz-border)] bg-theme-card p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--cz-text-20)" }} />
                      <span className="text-theme-30 text-xs font-bold uppercase tracking-wide">{cmp.vs.name}</span>
                    </div>
                    <div className="text-theme-50 font-bold text-sm mb-1">{cmp.vs.name}</div>
                    <div className="text-[11px] text-theme-20 mb-2">{cmp.vs.tag}</div>
                    <ul className="space-y-1">
                      {cmp.vs.items.map((item) => (
                        <li key={item} className="flex items-start gap-1.5 text-xs text-theme-40">
                          <span className="text-theme-20 shrink-0 mt-0.5">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Verdict */}
                <div className="rounded-lg bg-accent-soft border p-3" style={{ borderColor: "var(--cz-accent-line)" }}>
                  <div className="flex items-start gap-2">
                    <BadgeCheck size={14} className="text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-theme-70 leading-relaxed">{cmp.verdict}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative px-6 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--cz-bg) 0%, var(--cz-bg-alt) 50%, var(--cz-bg) 100%)" }} />
        
        <div className="max-w-3xl mx-auto relative text-center">
          <div className="space-y-5 animate-fade-up">
            <span className="label-mono justify-center">
              <Car size={12} />
              Ready to Go Electric?
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-theme-90">
              Own Your BYD. Find Your Monthly Payment.
            </h2>
            <p className="text-sm md:text-base text-theme-50 max-w-lg mx-auto">
              Use our calculator to see your monthly payment in seconds. No registration required.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
              <Link
                href="/#main-content"
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

            {/* Eligibility check — visible CTA */}
            <div className="pt-6 border-t border-[color:var(--cz-border)]">
              <p className="text-xs text-theme-30 mb-3">
                Not sure if you&apos;re eligible? Let us check for you.
              </p>
              <button
                onClick={() => setShowForm(!showForm)}
                className="cta-outline w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
              >
                <ClipboardCheck size={14} className="transition-transform group-hover:scale-110" />
                <span>
                  {showForm ? "Close" : "Check My Eligibility — Free & No Obligation"}
                </span>
                <ChevronDown size={12} className={`transition-transform ${showForm ? "rotate-180" : ""}`} style={{ transitionDuration: "var(--dur-short)" }} />
              </button>
              {showForm && (
                <div
                  className="mt-4 max-w-md mx-auto"
                >
                  <CheckEligibilityForm />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[color:var(--cz-border)] py-8 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-theme-30 hover:text-theme-60 transition-colors"
          >
            <ArrowLeft size={12} />
            Back to Loan Calculator
          </Link>
          <p className="text-xs text-counter mt-3 max-w-md mx-auto leading-relaxed">
            All comparisons and estimates are for illustrative purposes only. Data as of August 2026. Subject to change. Verify with authorised BYD dealer.
          </p>
          <p className="text-xs text-theme-20 mt-1.5">&copy; 2026 Ridzuan Jahari. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
