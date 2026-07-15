"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Zap, Calculator } from "lucide-react";
import { vehicles } from "@/lib/vehicles";
import { calcCardMonthly, calcFullLoanMonthly, fmt } from "@/lib/finance";
import { Img } from "@/components/img";

const REG_FEE = 60;
const EV_PLATE_FEE = 150;
const INSPECTION_FEE = 200;

function calcOtrWithoutIns(v: typeof vehicles[0]): number {
  return v.sumInsured + v.roadTax + REG_FEE + EV_PLATE_FEE + INSPECTION_FEE;
}

export default function PricelistPage() {
  const router = useRouter();
  useEffect(() => {
    document.title = "Full Price List | BYD Miri";
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#080808" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-white" aria-label="BYD Miri Home">
            <Img src="/byd-logo-white.svg" alt="BYD" className="h-3.5 w-auto -mt-[2px]" />
            <span className="font-[family-name:var(--font-syne)] font-bold text-lg tracking-[0.12em] ml-2">| MIRI</span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors">
            <ArrowLeft size={14} />
            Back
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-8 md:pt-32 md:pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-500 rounded-full opacity-[0.06] blur-[150px]" />
        </div>
        <div className="absolute inset-0 circuit-grid opacity-30" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/15 uppercase tracking-wide mb-4">
              <Zap size={12} />
              Complete BYD Lineup
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-syne)] font-bold tracking-tight leading-[1.1] mb-3 text-white/90">
              Discover the Lineup. 6 Models, 9 Choices.
            </h1>
            <p className="text-sm md:text-base text-white/50 max-w-3xl mx-auto">
              Explore every model. OTR pricing &amp; monthly instalments below.
            </p>
          </div>
        </div>
      </section>

      {/* Desktop table */}
      <section className="relative px-6 pb-16 md:pb-24">
        <div className="absolute inset-0 parking-lot-bg opacity-15" />
        <div className="max-w-6xl mx-auto relative">
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/[0.06]">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th scope="col" className="px-3 py-2.5 font-semibold text-white/40 uppercase tracking-wider">Model</th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-white/40 uppercase tracking-wider" colSpan={5}>Price Breakdown</th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-white/40 uppercase tracking-wider">OTR<br /><span className="text-[9px] font-normal lowercase">w/o ins.</span></th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-white/40 uppercase tracking-wider">Insurance</th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-white/40 uppercase tracking-wider">OTR Price</th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-white/40 uppercase tracking-wider">Rebate</th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-emerald-400 uppercase tracking-wider">10%</th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-amber-400 uppercase tracking-wider">0%</th>
                  <th scope="col" className="px-3 py-2.5 w-6"></th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => {
                  const monthly = calcCardMonthly(v.otr, v.rebate);
                  const monthlyFull = calcFullLoanMonthly(v.otr, v.rebate);
                  const otrWO = calcOtrWithoutIns(v);
                  const insurance = v.otr - otrWO;
                  return (
                    <tr
                      key={v.id}
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-11 rounded overflow-hidden bg-black/40 shrink-0">
                            <Img src={v.image} alt={v.name} className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <div className="font-semibold text-white/80 text-sm">{v.name}</div>
                            <div className="text-[10px] text-white/30">{v.category}</div>
                            <a href={v.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-[10px] font-semibold text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:shadow-[0_0_12px_rgba(52,211,153,0.15)] transition-all mt-0.5">
                              Brochure <ExternalLink size={9} />
                            </a>
                          </div>
                        </div>
                      </td>
                      {/* Body Price */}
                      <td className="px-3 py-2.5">
                        <div className="text-white/70 font-mono">RM{fmt(v.sumInsured)}</div>
                        <div className="text-[9px] text-white/20">Body Price</div>
                      </td>
                      {/* Road Tax */}
                      <td className="px-3 py-2.5">
                        <div className="text-white/50 font-mono">+RM{fmt(v.roadTax)}</div>
                        <div className="text-[9px] text-white/20">Road Tax</div>
                      </td>
                      {/* Registration Fee */}
                      <td className="px-3 py-2.5">
                        <div className="text-white/50 font-mono">+RM{fmt(REG_FEE)}</div>
                        <div className="text-[9px] text-white/20">Registration</div>
                      </td>
                      {/* EV Plate */}
                      <td className="px-3 py-2.5">
                        <div className="text-white/50 font-mono">+RM{fmt(EV_PLATE_FEE)}</div>
                        <div className="text-[9px] text-white/20">EV Plate</div>
                      </td>
                      {/* B2 Inspection */}
                      <td className="px-3 py-2.5">
                        <div className="text-white/50 font-mono">+RM{fmt(INSPECTION_FEE)}</div>
                        <div className="text-[9px] text-white/20">B2 Inspection</div>
                      </td>
                      {/* OTR w/o insurance (computed) */}
                      <td className="px-3 py-2.5">
                        <div className="text-white/70 font-mono">RM{fmt(otrWO)}</div>
                        <div className="text-[9px] text-white/20">Subtotal</div>
                      </td>
                      {/* Insurance */}
                      <td className="px-3 py-2.5">
                        <div className="text-white/50 font-mono">+RM{fmt(insurance)}</div>
                        <div className="text-[9px] text-white/20">Est. Insurance</div>
                      </td>
                      {/* OTR Price */}
                      <td className="px-3 py-2.5">
                        <div className="text-white-90 font-semibold font-mono">RM{fmt(v.otr)}</div>
                        <div className="text-[9px] text-emerald-400/60 font-semibold">ON THE ROAD</div>
                      </td>
                      {/* Rebate */}
                      <td className="px-3 py-2.5">
                        <div className="text-red-400 font-semibold font-mono">-RM{fmt(v.rebate)}</div>
                        <div className="text-[9px] text-white/20">Rebate</div>
                      </td>
                      {/* Monthly */}
                      <td className="px-3 py-2.5">
                        <div className="text-emerald-400 font-bold font-mono text-sm">RM{fmt(monthly)}</div>
                        <div className="text-[9px] text-white/20">10% down</div>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="text-amber-400 font-bold font-mono text-sm">RM{fmt(monthlyFull)}</div>
                        <div className="text-[9px] text-white/20">0% down</div>
                      </td>
                      <td className="px-3 py-2.5">
                        <button
                          onClick={() => router.push(`/?calc=${encodeURIComponent(v.id)}`)}
                          className="flex items-center justify-center w-6 h-6 rounded-md bg-amber-400/10 border border-amber-400/20 text-amber-400/60 hover:bg-amber-400/20 hover:text-amber-400 hover:border-amber-400/40 transition-all cursor-pointer"
                          aria-label={`Calculate for ${v.name}`}
                        >
                          <Calculator size={11} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {vehicles.map((v) => {
              const monthly = calcCardMonthly(v.otr, v.rebate);
              const monthlyFull = calcFullLoanMonthly(v.otr, v.rebate);
              const otrWO = calcOtrWithoutIns(v);
              const insurance = v.otr - otrWO;
              return (
                <div
                  key={v.id}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-20 h-12 rounded overflow-hidden bg-black/40 shrink-0">
                      <Img src={v.image} alt={v.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white/80 truncate">{v.name}</div>
                      <div className="text-[10px] text-white/30 truncate">{v.category}</div>
                      <a href={v.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 text-[9px] font-semibold text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all">
                        Brochure <ExternalLink size={8} />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        <div className="text-[9px] text-emerald-400/60">10% <span className="text-white/20">·</span> <span className="text-amber-400/60">0%</span></div>
                        <div className="text-sm font-bold font-mono">
                          <span className="text-emerald-400">RM{fmt(monthly)}</span><span className="text-white/20"> · </span><span className="text-amber-400">RM{fmt(monthlyFull)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => router.push(`/?calc=${encodeURIComponent(v.id)}`)}
                        className="flex items-center justify-center w-7 h-7 rounded-md bg-amber-400/10 border border-amber-400/20 text-amber-400/60 hover:bg-amber-400/20 hover:text-amber-400 hover:border-amber-400/40 transition-all cursor-pointer"
                        aria-label={`Calculate for ${v.name}`}
                      >
                        <Calculator size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs pt-2 border-t border-white/[0.04]">
                    <div className="grid grid-cols-2 gap-x-2">
                      <div className="flex justify-between"><span className="text-white/30">Body Price</span><span className="text-white/70 font-mono">RM{fmt(v.sumInsured)}</span></div>
                      <div className="flex justify-between"><span className="text-white/30">Road Tax</span><span className="text-white/50 font-mono">+RM{fmt(v.roadTax)}</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-2">
                      <div className="flex justify-between"><span className="text-white/30">Registration</span><span className="text-white/50 font-mono">+RM{fmt(REG_FEE)}</span></div>
                      <div className="flex justify-between"><span className="text-white/30">EV Plate</span><span className="text-white/50 font-mono">+RM{fmt(EV_PLATE_FEE)}</span></div>
                      <div className="flex justify-between"><span className="text-white/30">B2 Inspection</span><span className="text-white/50 font-mono">+RM{fmt(INSPECTION_FEE)}</span></div>
                      <div className="flex justify-between"><span className="text-white/30">OTR w/o Ins.</span><span className="text-white/70 font-mono">RM{fmt(otrWO)}</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-2">
                      <div className="flex justify-between"><span className="text-white/30">Insurance</span><span className="text-white/50 font-mono">+RM{fmt(insurance)}</span></div>
                      <div className="flex justify-between"><span className="text-emerald-400/60 font-semibold">OTR Price</span><span className="text-white-90 font-semibold font-mono">RM{fmt(v.otr)}</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 pt-1 border-t border-white/[0.04]">
                      <div className="flex justify-between"><span className="text-white/30">Rebate</span><span className="text-red-400 font-semibold font-mono">-RM{fmt(v.rebate)}</span></div>
                      <div className="flex justify-between"><span className="text-white/30">Range</span><span className="text-white/50">{v.range} km · {v.battery} kWh</span></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Finance summary */}
          <div className="animate-fade-up rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
            <p className="text-xs text-white/40 mb-3">
              Monthly estimates for 10% &amp; 0% down, 9 years, 2.3% rate. Subject to bank approval T&amp;Cs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/#main-content" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-semibold hover:shadow-[0_0_30px_rgba(52,211,153,0.3)] transition-all">
                Calculate My Payment
              </Link>
              <Link href="/why-byd" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/[0.12] text-white/50 text-xs font-semibold hover:bg-white/[0.04] hover:text-white transition-all">
                Why BYD?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors">
            <ArrowLeft size={12} />
            Back to Calculator
          </Link>
          <p className="text-xs text-white/20 mt-3">&copy; 2026 Ridzuan Jahari. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
