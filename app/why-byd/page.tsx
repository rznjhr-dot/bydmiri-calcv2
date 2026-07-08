"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
import CheckEligibilityForm from "@/components/check-eligibility-form";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const advantages = [
  {
    icon: Shield,
    title: "Blade Battery Technology",
    subtitle: "The Safest EV Battery Ever Made",
    points: [
      "Passed nail penetration test — no fire, no explosion",
      "LFP chemistry — longer lifespan, more stable than NMC",
      "Cell-to-pack design — higher density, better cooling",
      "Over 500,000 km battery life expectancy",
    ],
    link: {
      text: "Watch the Blade Battery puncture test →",
      url: "https://www.youtube.com/watch?v=CGQwqWqzkNA",
    },
    link2: {
      text: "BYD Blade Battery official page →",
      url: "https://byd.simemotors.my/byd-blade-battery",
    },
    gradient: "from-emerald-500/20 to-emerald-600/5",
    accent: "emerald",
  },
  {
    icon: BadgeCheck,
    title: "Industry-Leading Warranty",
    subtitle: "Peace of Mind, Standard",
    points: [
      "6 years or 150,000 km vehicle warranty",
      "8 years or 200,000 km battery warranty",
      "Covers Blade Battery against defects and capacity loss",
      "Valid at any authorised BYD service centre nationwide",
      "Malaysia's most comprehensive EV warranty package",
    ],
    gradient: "from-cyan-500/20 to-blue-600/5",
    accent: "cyan",
  },
  {
    icon: Cable,
    title: "V2L — Vehicle-to-Load",
    subtitle: "Your Car Becomes a Power Station",
    points: [
      "Standard across ALL BYD models — no extra cost",
      "Power your home appliances, laptops, camping gear",
      "Up to 3.3 kW output — run a mini fridge, TV, lights",
      "Perfect for outdoor adventures, tailgating, emergencies",
      "Turn your car into a mobile power station on the go",
    ],
    gradient: "from-emerald-500/20 to-cyan-600/5",
    accent: "emerald",
  },
  {
    icon: Zap,
    title: "World's #1 NEV Manufacturer",
    subtitle: "Global Leadership You Can Trust",
    points: [
      "Largest new energy vehicle maker in the world (2024–2025)",
      "Over 8 million electrified vehicles sold globally",
      "Vertically integrated — batteries, motors, chips, in-house",
      "Second-largest EV battery maker worldwide (after CATL)",
      "Trusted by Warren Buffett's Berkshire Hathaway since 2008",
    ],
    gradient: "from-blue-500/20 to-emerald-600/5",
    accent: "blue",
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
        "1.7 million+ Atto 3s sold worldwide",
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
      "Atto 3 offers more range, proven safety (3.8M Blade Batteries sold), V2L, and a comprehensive warranty — all backed by the world's #1 EV maker.",
    gradient: "from-emerald-500/5 to-cyan-500/5",
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
    gradient: "from-cyan-500/5 to-blue-500/5",
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
    gradient: "from-purple-500/5 to-emerald-500/5",
  },
];

const salesPoints = [
  {
    icon: Zap,
    title: "Savings",
    desc: "Charge from as low as RM0.04/km — ~90% less than petrol. No fuel price volatility. Lower maintenance costs (fewer moving parts).",
    accent: "emerald",
  },
  {
    icon: Car,
    title: "Comfort",
    desc: "Silent, smooth, spacious. Every ride feels first-class.",
    accent: "cyan",
  },
  {
    icon: Smartphone,
    title: "Technology",
    desc: "Rotating touchscreen, app control, OTA updates, voice commands.",
    accent: "emerald",
  },
  {
    icon: VolumeX,
    title: "Silence",
    desc: "Zero engine noise. Enjoy your music, your conversation, your drive.",
    accent: "cyan",
  },
  {
    icon: Users,
    title: "Family Usability",
    desc: "Spacious cabins, ISOFIX standard, V2L for family outings.",
    accent: "emerald",
  },
  {
    icon: Heart,
    title: "Instant Pickup",
    desc: "Instant torque. 0–100 km/h from 3.8s (Seal AWD). Thrill without fuel.",
    accent: "cyan",
  },
];

export default function WhyBydPage() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#080808" }}>
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-white" aria-label="BYD Miri Home">
            <Img src="/byd-logo-white.svg" alt="" className="h-3.5 w-auto -mt-[2px]" />
            <span className="font-[family-name:var(--font-syne)] font-bold text-lg tracking-[0.12em] ml-2">| MIRI</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Calculator
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-500 rounded-full opacity-[0.06] blur-[150px]" />
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-cyan-500 rounded-full opacity-[0.04] blur-[120px]" />
        </div>
        <div className="absolute inset-0 circuit-grid opacity-40" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/15 uppercase tracking-wide mb-4">
              <BadgeCheck size={12} />
              Why Choose BYD?
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-syne)] font-bold tracking-tight leading-[1.1] mb-4">
              <span className="text-white/90">The Smart Switch.</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 text-gradient">
                The Clear Choice.
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
              From the world&apos;s safest EV battery to the most comprehensive warranty in Malaysia —
              discover why BYD is Malaysia&apos;s fastest-growing automotive brand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Brand Stat Bar ── */}
      <section className="relative px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.04]"
          >
            {[
              { value: "#1", label: "World's NEV Maker" },
              { value: "8M+", label: "Electrified Vehicles Sold" },
              { value: "3.8M+", label: "Blade Batteries Sold" },
              { value: "1,200+", label: "Dealers Nationwide" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#080808] p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-300 text-gradient">
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Advantages Grid ── */}
      <section className="relative px-6 pb-16 md:pb-24">
        <div className="absolute inset-0 parking-lot-bg opacity-20" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-syne)] font-bold text-white/90">
              Engineered to Outperform
            </h2>
            <p className="text-sm text-white/40 mt-2">
              Every BYD is built on years of R&D, vertical integration, and millions of real-world kilometres.
            </p>
          </motion.div>

          <div className="space-y-4">
            {advantages.map((adv, i) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border border-white/[0.06] bg-gradient-to-br ${adv.gradient} p-5 md:p-6`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-${adv.accent}-500/10 flex items-center justify-center shrink-0`}>
                    <adv.icon size={20} className={`text-${adv.accent}-400`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-bold text-white/90">{adv.title}</h3>
                    <p className="text-xs text-white/50 mb-3">{adv.subtitle}</p>
                    <ul className="space-y-1.5">
                      {adv.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-white/60">
                          <CheckCircle2 size={14} className={`text-${adv.accent}-400 shrink-0 mt-0.5`} />
                          {point}
                        </li>
                      ))}
                    </ul>
                    {(() => {
                      if (!adv.link) return null;
                      return (
                        <div className="mt-3 flex flex-wrap gap-3">
                          <a
                            href={adv.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400/70 hover:text-emerald-400 transition-colors"
                          >
                            <ExternalLink size={11} />
                            {adv.link.text}
                          </a>
                          {adv.link2 && (
                            <a
                              href={adv.link2.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-white/40 hover:text-white/60 transition-colors"
                            >
                              <ExternalLink size={11} />
                              {adv.link2.text}
                            </a>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Sell (Sales Rules) ── */}
      <section className="relative px-6 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #080808 0%, #0a0a0a 50%, #080808 100%)" }} />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-emerald-500 rounded-full opacity-[0.03] blur-[120px]" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/15 uppercase tracking-wide mb-3">
              <Heart size={12} />
              It&apos;s Not About Specs
            </span>
            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-syne)] font-bold text-white/90">
              What You Actually Gain
            </h2>
            <p className="text-sm text-white/40 mt-2 max-w-xl mx-auto">
              We don&apos;t sell kilowatts. We sell what matters — how it feels, how it fits your life, what you save.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {salesPoints.map((pt, i) => (
              <motion.div
                key={pt.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-white/[0.01] p-4`}
              >
                <div className={`w-8 h-8 rounded-lg bg-${pt.accent}-500/10 flex items-center justify-center mb-3`}>
                  <pt.icon size={16} className={`text-${pt.accent}-400`} />
                </div>
                <h3 className="text-sm font-bold text-white/80 mb-1">{pt.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{pt.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curated Comparisons ── */}
      <section className="relative px-6 pb-16 md:pb-24">
        <div className="absolute inset-0 parking-lot-bg opacity-15" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/15 uppercase tracking-wide mb-3">
              <Gauge size={12} />
              How We Compare
            </span>
            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-syne)] font-bold text-white/90">
              BYD vs The Rest
            </h2>
            <p className="text-sm text-white/40 mt-2">
              Honest, real-world comparisons. See where BYD leads and why it matters to you.
            </p>
            <div className="mt-5 max-w-xl mx-auto rounded-lg border border-amber-500/15 bg-amber-500/[0.04] p-3">
              <p className="text-[11px] text-amber-400/70 leading-relaxed">
                <span className="font-semibold text-amber-400">⚠ Disclaimer:</span> All comparisons shown are for illustrative and suggestive purposes only. Competitor data sourced from publicly available information and may vary by variant, region, and specifications. BYD Miri makes no representations or warranties regarding the accuracy or completeness of competitor data. Pricing, specifications, and availability are subject to change without notice. Data as of July 2026.
              </p>
            </div>
          </motion.div>

          <div className="space-y-5">
            {comparisons.map((cmp, i) => (
              <motion.div
                key={cmp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`rounded-2xl border border-white/[0.06] bg-gradient-to-br ${cmp.gradient} p-5 md:p-6`}
              >
                <h3 className="text-base md:text-lg font-bold text-white/80 mb-4">{cmp.title}</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* BYD side */}
                  <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-emerald-400 text-xs font-bold uppercase tracking-wide">BYD</span>
                    </div>
                    <div className="text-white/90 font-bold text-sm mb-1">{cmp.byd.name}</div>
                    <div className="text-[11px] text-emerald-400/60 mb-2">{cmp.byd.tag}</div>
                    <ul className="space-y-1">
                      {cmp.byd.items.map((item) => (
                        <li key={item} className="flex items-start gap-1.5 text-xs text-white/60">
                          <CheckCircle2 size={11} className="text-emerald-400 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* VS side */}
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span className="text-white/30 text-xs font-bold uppercase tracking-wide">{cmp.vs.name}</span>
                    </div>
                    <div className="text-white/50 font-bold text-sm mb-1">{cmp.vs.name}</div>
                    <div className="text-[11px] text-white/20 mb-2">{cmp.vs.tag}</div>
                    <ul className="space-y-1">
                      {cmp.vs.items.map((item) => (
                        <li key={item} className="flex items-start gap-1.5 text-xs text-white/40">
                          <span className="text-white/20 shrink-0 mt-0.5">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Verdict */}
                <div className="rounded-lg bg-emerald-500/[0.04] border border-emerald-500/10 p-3">
                  <div className="flex items-start gap-2">
                    <BadgeCheck size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-white/70 leading-relaxed">{cmp.verdict}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative px-6 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #080808 0%, #0c0c0c 50%, #080808 100%)" }} />
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-emerald-500 rounded-full opacity-[0.04] blur-[150px]" />
        <div className="max-w-3xl mx-auto relative text-center">
          <motion.div {...fadeUp} className="space-y-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/15 uppercase tracking-wide">
              <Car size={12} />
              Ready to Go Electric?
            </span>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-syne)] font-bold text-white/90">
              Own Your BYD. Find Your Monthly Payment.
            </h2>
            <p className="text-sm md:text-base text-white/50 max-w-lg mx-auto">
              Use our calculator to see your monthly payment in seconds. No registration required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#main-content"
                className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-[0_0_50px_rgba(52,211,153,0.4)] hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Browse BYD Models</span>
              </Link>
              <a
                href="https://wa.me/601131933930?text=Saya%20berminat%20dengan%20BYD!%20Boleh%20bantu%20saya%20dengan%20maklumat%20lanjut%3F%20Terima%20kasih!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-white/[0.12] text-white/70 text-sm font-semibold hover:bg-white/[0.04] hover:text-white transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat with Ridzuan
              </a>
            </div>

            {/* Eligibility check — visible CTA */}
            <div className="pt-6 border-t border-white/[0.06]">
              <p className="text-xs text-white/30 mb-3">
                Not sure if you're eligible? Let us check for you.
              </p>
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-full group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-emerald-500/25 text-emerald-400/80 text-sm font-semibold hover:bg-emerald-500/[0.06] hover:border-emerald-500/40 hover:text-emerald-300 transition-all"
              >
                <ClipboardCheck size={14} className="transition-transform group-hover:scale-110" />
                <span>
                  {showForm ? "Close" : "Check My Eligibility — Free & No Obligation"}
                </span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${showForm ? "rotate-180" : ""}`} />
              </button>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 max-w-md mx-auto"
                >
                  <CheckEligibilityForm />
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            <ArrowLeft size={12} />
            Back to Loan Calculator
          </Link>
          <p className="text-xs text-amber-400/50 mt-3 max-w-md mx-auto leading-relaxed">
            All comparisons and estimates are for illustrative purposes only. Data as of July 2026. Subject to change. Verify with authorised BYD dealer.
          </p>
          <p className="text-xs text-white/20 mt-1.5">&copy; 2026 Ridzuan Jahari. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
