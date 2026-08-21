"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Zap, Calculator } from "lucide-react";
import { vehicles } from "@/lib/vehicles";
import { activeRebate } from "@/lib/vehicles";
import { calcCardMonthly, calcFullLoanMonthly, fmt } from "@/lib/finance";
import { Img } from "@/components/img";
import { usePageMeta } from "@/lib/use-page-meta";

const REG_FEE = 60;
const EV_PLATE_FEE = 150;
const INSPECTION_FEE = 200;

function calcOtrWithoutIns(v: typeof vehicles[0]): number {
  return v.sumInsured + v.roadTax + REG_FEE + EV_PLATE_FEE + INSPECTION_FEE;
}

export default function PricelistPage() {
  usePageMeta(
    "Full Price List | BYD Miri",
    "Full BYD price list Malaysia 2026 — OTR prices, rebates, and monthly instalments for every BYD model. Transparent pricing from BYD Miri, Sarawak."
  );

  return (
    <div className="min-h-screen bg-theme">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-theme/80 backdrop-blur-xl border-b border-[color:var(--cz-border)]">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-theme" aria-label="BYD Miri Home">
            <Img src="/byd-logo-white.svg" alt="BYD" className="h-3.5 w-auto -mt-[2px]" />
            <span className="font-wordmark text-[11px] ml-2">| MIRI</span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-xs text-theme-50 hover:text-theme-80 transition-colors">
            <ArrowLeft size={14} />
            Back
          </Link>
        </div>
      </nav>

      {/* Hero — Minimal: pure paper, no decoration */}
      <section className="relative pt-24 pb-8 md:pt-32 md:pb-12 overflow-hidden bg-theme">
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="animate-fade-up">
            <span className="label-mono justify-center mb-5">
              <Zap size={12} />
              Complete BYD Lineup
            </span>
            <h1 className="font-display text-[34px] sm:text-5xl md:text-[56px] leading-[1.06] mb-4 text-theme-90">
              Discover the lineup,
              <br />
              <strong>10 choices.</strong>
            </h1>
            <p className="text-sm md:text-base text-theme-50 max-w-3xl mx-auto leading-relaxed">
              Explore every model. OTR pricing &amp; monthly instalments below.
            </p>
          </div>
        </div>
      </section>

      {/* Desktop table */}
      <section className="relative px-6 pb-16 md:pb-24">
        <div className="absolute inset-0 parking-lot-bg opacity-15" />
        <div className="max-w-6xl mx-auto relative">
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-[color:var(--cz-border)]">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[color:var(--cz-border)] bg-theme-card">
                  <th scope="col" className="px-3 py-2.5 font-semibold text-theme-40 uppercase tracking-wider">Model</th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-theme-40 uppercase tracking-wider" colSpan={5}>Price Breakdown</th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-theme-40 uppercase tracking-wider">OTR<br /><span className="text-[10px] font-normal lowercase">w/o ins.</span></th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-theme-40 uppercase tracking-wider">Insurance</th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-theme-40 uppercase tracking-wider">OTR Price</th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-theme-40 uppercase tracking-wider">Rebate</th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-accent uppercase tracking-wider">10%</th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-counter uppercase tracking-wider">0%</th>
                  <th scope="col" className="px-3 py-2.5 w-6"></th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <PricelistRow key={v.id} v={v} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {vehicles.map((v) => (
              <PricelistCard key={v.id} v={v} />
            ))}
          </div>

          {/* Finance summary */}
          <div className="animate-fade-up rounded-xl border border-[color:var(--cz-border)] bg-theme-card p-4 text-center">
            <p className="text-xs text-theme-40 mb-3">
              Monthly estimates for 10% &amp; 0% down, 9 years, 2.3% rate. Subject to bank approval T&amp;Cs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/#main-content" className="hero-cta inline-flex items-center gap-1.5 px-5 py-3 min-h-11 rounded-full bg-accent text-sm font-semibold" style={{ color: "var(--cz-accent-ink)" }}>
                Calculate My Payment
              </Link>
              <Link href="/why-byd" className="inline-flex items-center gap-1.5 px-5 py-3 min-h-11 rounded-full border border-[color:var(--cz-border-strong)] text-theme-50 text-sm font-semibold hover:bg-theme-alt hover:text-theme transition-all">
                Why BYD?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[color:var(--cz-border)] py-8 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-theme-30 hover:text-theme/60 transition-colors">
            <ArrowLeft size={12} />
            Back to Calculator
          </Link>
          <p className="text-xs text-theme-20 mt-3">&copy; 2026 Ridzuan Jahari. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

/* ── Desktop Row (stateful so Atto 3 promo pills update monthly instantly) ── */
function PricelistRow({ v }: { v: (typeof vehicles)[0] }) {
  const router = useRouter();
  const rebate = activeRebate(v);
  const monthly = calcCardMonthly(v.otr, rebate);
  const monthlyFull = calcFullLoanMonthly(v.otr, rebate);
  const otrWO = calcOtrWithoutIns(v);
  const insurance = v.otr - otrWO;

  return (
    <tr className="border-b border-[color:var(--cz-border)] hover:bg-theme-card transition-colors">
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-3">
          <div className="w-20 h-11 rounded overflow-hidden bg-black/40 shrink-0">
            <Img src={v.image} alt={v.name} className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="font-semibold text-theme-80 text-sm">{v.name}</div>
            <div className="text-[11px] text-theme-30">{v.category}</div>
            <a href={v.url} target="_blank" rel="noopener noreferrer" className="text-accent inline-flex items-center gap-1 px-3 py-1.5 min-h-9 rounded-lg text-[11px] font-semibold transition-colors mt-0.5" style={{ backgroundColor: "var(--cz-accent-soft)", border: "1px solid var(--cz-accent-line)" }}>
              Brochure <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </td>
      {/* Body Price */}
      <td className="px-3 py-2.5">
        <div className="text-theme-70 font-data">RM{fmt(v.sumInsured)}</div>
        <div className="text-[10px] text-theme-20">Body Price</div>
      </td>
      {/* Road Tax */}
      <td className="px-3 py-2.5">
        <div className="text-theme-50 font-data">+RM{fmt(v.roadTax)}</div>
        <div className="text-[10px] text-theme-20">Road Tax</div>
      </td>
      {/* Registration Fee */}
      <td className="px-3 py-2.5">
        <div className="text-theme-50 font-data">+RM{fmt(REG_FEE)}</div>
        <div className="text-[10px] text-theme-20">Registration</div>
      </td>
      {/* EV Plate */}
      <td className="px-3 py-2.5">
        <div className="text-theme-50 font-data">+RM{fmt(EV_PLATE_FEE)}</div>
        <div className="text-[10px] text-theme-20">EV Plate</div>
      </td>
      {/* B2 Inspection */}
      <td className="px-3 py-2.5">
        <div className="text-theme-50 font-data">+RM{fmt(INSPECTION_FEE)}</div>
        <div className="text-[10px] text-theme-20">B2 Inspection</div>
      </td>
      {/* OTR w/o insurance (computed) */}
      <td className="px-3 py-2.5">
        <div className="text-theme-70 font-data">RM{fmt(otrWO)}</div>
        <div className="text-[10px] text-theme-20">Subtotal</div>
      </td>
      {/* Insurance */}
      <td className="px-3 py-2.5">
        <div className="text-theme-50 font-data">+RM{fmt(insurance)}</div>
        <div className="text-[10px] text-theme-20">Est. Insurance</div>
      </td>
      {/* OTR Price */}
      <td className="px-3 py-2.5">
        <div className="text-theme-90 font-semibold font-data">RM{fmt(v.otr)}</div>
        <div className="text-[10px] text-accent font-semibold">ON THE ROAD</div>
      </td>
      {/* Rebate */}
      <td className="px-3 py-2.5">
        <div className="text-counter font-semibold font-data">-RM{fmt(rebate)}</div>
        <div className="text-[10px] text-theme-20">Rebate</div>
      </td>
      {/* Monthly */}
      <td className="px-3 py-2.5">
        <div className="text-accent font-bold font-data text-sm">RM{fmt(monthly)}</div>
        <div className="text-[10px] text-theme-20">10% down</div>
      </td>
      <td className="px-3 py-2.5">
        <div className="text-counter font-bold font-data text-sm">RM{fmt(monthlyFull)}</div>
        <div className="text-[10px] text-theme-20">0% down</div>
      </td>
      <td className="px-3 py-2.5">
        <button
          onClick={() => router.push(`/?calc=${encodeURIComponent(v.id)}`)}
          className="calc-btn flex items-center justify-center w-11 h-11 rounded-md cursor-pointer"
          aria-label={`Calculate for ${v.name}`}
        >
          <Calculator size={16} />
        </button>
      </td>
    </tr>
  );
}

/* ── Mobile Card (stateful so Atto 3 promo pills update monthly instantly) ── */
function PricelistCard({ v }: { v: (typeof vehicles)[0] }) {
  const router = useRouter();
  const rebate = activeRebate(v);
  const monthly = calcCardMonthly(v.otr, rebate);
  const monthlyFull = calcFullLoanMonthly(v.otr, rebate);
  const otrWO = calcOtrWithoutIns(v);
  const insurance = v.otr - otrWO;

  return (
    <div className="rounded-xl border border-[color:var(--cz-border)] bg-theme-card p-3">
      {/* Row 1: image + name/category + calc button (no prices here —
          the old layout packed img + info + 2 prices + button and
          overflowed 320px viewports) */}
      <div className="flex items-center gap-3">
        <div className="w-16 h-10 rounded overflow-hidden bg-black/40 shrink-0">
          <Img src={v.image} alt={v.name} className="w-full h-full object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-theme-80 truncate">{v.name}</div>
          <div className="text-[10px] text-theme-30 truncate">{v.category}</div>
        </div>
        <button
          onClick={() => router.push(`/?calc=${encodeURIComponent(v.id)}`)}
          className="calc-btn flex items-center justify-center w-11 h-11 rounded-md cursor-pointer shrink-0"
          aria-label={`Calculate for ${v.name}`}
        >
          <Calculator size={16} />
        </button>
      </div>

      {/* Row 2: monthly figures — full-width row, wraps never */}
      <div
        className="flex items-center justify-between gap-2 mt-2.5 pt-2.5 border-t border-[color:var(--cz-border)]"
      >
        <a href={v.url} target="_blank" rel="noopener noreferrer" className="text-accent inline-flex items-center gap-1 px-3 min-h-9 rounded-lg text-[11px] font-semibold transition-colors" style={{ backgroundColor: "var(--cz-accent-soft)", border: "1px solid var(--cz-accent-line)" }}>
          Brochure <ExternalLink size={11} />
        </a>
        <div className="text-right min-w-0">
          <div className="text-[10px]"><span className="text-accent">10%</span> <span className="text-theme-20">·</span> <span className="text-counter">0%</span> <span className="text-theme-30">down</span></div>
          <div className="text-sm font-semibold font-data whitespace-nowrap">
            <span className="text-accent">RM{fmt(monthly)}</span><span className="text-theme-20"> · </span><span className="text-counter">RM{fmt(monthlyFull)}</span>
          </div>
        </div>
      </div>

      {/* Row 3: OTR breakdown ledger */}
      <div className="space-y-1 text-xs pt-2.5 mt-2.5 border-t border-[color:var(--cz-border)]">
        <div className="grid grid-cols-2 gap-x-3">
          <div className="flex justify-between gap-1 min-w-0"><span className="text-theme-30 truncate">Body Price</span><span className="text-theme-70 font-data whitespace-nowrap shrink-0">RM{fmt(v.sumInsured)}</span></div>
          <div className="flex justify-between gap-1 min-w-0"><span className="text-theme-30 truncate">Road Tax</span><span className="text-theme-50 font-data whitespace-nowrap shrink-0">+RM{fmt(v.roadTax)}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-x-3">
          <div className="flex justify-between gap-1 min-w-0"><span className="text-theme-30 truncate">Registration</span><span className="text-theme-50 font-data whitespace-nowrap shrink-0">+RM{fmt(REG_FEE)}</span></div>
          <div className="flex justify-between gap-1 min-w-0"><span className="text-theme-30 truncate">EV Plate</span><span className="text-theme-50 font-data whitespace-nowrap shrink-0">+RM{fmt(EV_PLATE_FEE)}</span></div>
          <div className="flex justify-between gap-1 min-w-0"><span className="text-theme-30 truncate">B2 Inspection</span><span className="text-theme-50 font-data whitespace-nowrap shrink-0">+RM{fmt(INSPECTION_FEE)}</span></div>
          <div className="flex justify-between gap-1 min-w-0"><span className="text-theme-30 truncate">OTR w/o Ins.</span><span className="text-theme-70 font-data whitespace-nowrap shrink-0">RM{fmt(otrWO)}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-x-3">
          <div className="flex justify-between gap-1 min-w-0"><span className="text-theme-30 truncate">Insurance</span><span className="text-theme-50 font-data whitespace-nowrap shrink-0">+RM{fmt(insurance)}</span></div>
          <div className="flex justify-between gap-1 min-w-0"><span className="text-accent font-semibold truncate">OTR Price</span><span className="text-theme-90 font-semibold font-data whitespace-nowrap shrink-0">RM{fmt(v.otr)}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-x-3 pt-1 border-t border-[color:var(--cz-border)]">
          <div className="flex justify-between gap-1 min-w-0"><span className="text-theme-30 truncate">Rebate</span><span className="text-counter font-semibold font-data whitespace-nowrap shrink-0">-RM{fmt(rebate)}</span></div>
          <div className="flex justify-between gap-1 min-w-0"><span className="text-theme-30 truncate">Range</span><span className="text-theme-50 whitespace-nowrap shrink-0">{v.range} km</span></div>
        </div>
      </div>
    </div>
  );
}
