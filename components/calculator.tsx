"use client";

import { useState, useCallback, useMemo } from "react";
import { Check, MousePointerClick, ClipboardCheck } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";
import { calculateFinance, fmt, fmtDec } from "@/lib/finance";
import { generateWhatsAppUrl, generateWhatsAppBookingUrl } from "@/lib/whatsapp";
import CheckEligibilityForm from "@/components/check-eligibility-form";

interface Props {
  vehicle: Vehicle;
}

const TENURES = [2, 3, 4, 5, 6, 7, 8, 9];
const DEPOSIT_PCTS = [0, 10, 15, 20, 25, 30, 35];
const DEFAULT_INTEREST = 2.3;

export default function Calculator({ vehicle }: Props) {
  const [rebateOn, setRebateOn] = useState(true);
  const [cspOn, setCspOn] = useState(false);
  const [depositPct, setDepositPct] = useState(10);
  const [customDeposit, setCustomDeposit] = useState("");
  const [tenure, setTenure] = useState(9);
  const [interestRate, setInterestRate] = useState(String(DEFAULT_INTEREST));
  const [showEligibilityForm, setShowEligibilityForm] = useState(false);

  const result = useMemo(() => {
    const rate = parseFloat(interestRate) || 0;
    const customVal = customDeposit === "" ? null : parseFloat(customDeposit);
    return calculateFinance({
      otr: vehicle.otr,
      rebate: vehicle.rebate,
      rebateEnabled: rebateOn,
      cspEnabled: cspOn,
      cspRebate: vehicle.cspRebate,
      depositPercent: depositPct,
      customDeposit: !customVal || isNaN(customVal) ? null : customVal,
      tenure,
      interestRate: rate,
    });
  }, [vehicle, rebateOn, cspOn, depositPct, customDeposit, tenure, interestRate]);

  const whatsappUrl = useMemo(
    () =>
      generateWhatsAppUrl({
        model: vehicle.name,
        price: fmt(vehicle.otr),
        deposit: fmt(result.depositAmount),
        loan: fmt(result.loanAmount),
        tenure: String(tenure),
        interest: (parseFloat(interestRate) || 0).toFixed(2),
        monthly: fmt(result.monthly),
      }),
    [vehicle, result, tenure, interestRate]
  );

  const whatsappBookingUrl = useMemo(
    () =>
      generateWhatsAppBookingUrl({
        model: vehicle.name,
        price: fmt(vehicle.otr),
        deposit: fmt(result.depositAmount),
        loan: fmt(result.loanAmount),
        tenure: String(tenure),
        interest: (parseFloat(interestRate) || 0).toFixed(2),
        monthly: fmt(result.monthly),
      }),
    [vehicle, result, tenure, interestRate]
  );

  const handleDepositPct = useCallback((pct: number) => {
    setDepositPct(pct);
    setCustomDeposit("");
  }, []);

  const showCustom =
    customDeposit !== "" && parseFloat(customDeposit) > 0;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
          {/* ---- Inputs ---- */}
          <div className="space-y-4 text-center">
            {/* Rebate toggle */}
            <div className="space-y-2">
              <button
                onClick={() => setRebateOn(!rebateOn)}
                className={`flex items-center justify-center gap-2.5 px-3.5 py-2 rounded-lg border transition-colors text-sm w-full ${
                  rebateOn
                    ? "border-emerald-500/40 text-emerald-400"
                    : "text-theme-50"
                }`}
                style={{
                  backgroundColor: rebateOn ? "rgba(0,230,118,0.1)" : "transparent",
                  borderColor: rebateOn ? "rgba(0,230,118,0.4)" : "var(--cz-border)",
                }}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center transition-colors shrink-0 ${
                    rebateOn ? "bg-emerald-500" : ""
                  }`}
                  style={{ backgroundColor: rebateOn ? undefined : "var(--cz-text-30)" }}
                >
                  {rebateOn && <Check size={10} className="text-white" />}
                </div>
                <span className="font-medium">
                  RM{fmt(vehicle.rebate)} Rebate
                </span>
              </button>

              {/* CSP/GSP/SSP toggle */}
              <button
                onClick={() => setCspOn(!cspOn)}
                className={`flex items-center justify-center gap-2.5 px-3.5 py-2 rounded-lg border transition-colors text-sm w-full ${
                  cspOn
                    ? "border-cyan-500/40 text-cyan-400"
                    : "text-theme-50"
                }`}
                style={{
                  backgroundColor: cspOn ? "rgba(0,206,209,0.1)" : "transparent",
                  borderColor: cspOn ? "rgba(0,206,209,0.4)" : "var(--cz-border)",
                }}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center transition-colors shrink-0 ${
                    cspOn ? "bg-cyan-500" : ""
                  }`}
                  style={{ backgroundColor: cspOn ? undefined : "var(--cz-text-30)" }}
                >
                  {cspOn && <Check size={10} className="text-white" />}
                </div>
                <span className="font-medium">
                  {vehicle.cspRebate > 0
                    ? `RM${fmt(vehicle.cspRebate)} CSP/GSP/SSP*`
                    : "6-Year Service Package (worth RM3,888)"}
                </span>
              </button>
              <p className="text-[10px] text-theme-50/50 text-center leading-tight mt-0.5">
                {vehicle.cspRebate > 0
                  ? "*CSP/GSP/SSP = Corporate/Government/Student Support Program (Terms & Conditions apply)"
                  : "*Replaces CSP/GSP/SSP rebate — 6 Years Standard Service Package worth RM3,888"}
              </p>
            </div>

            {/* Downpayment */}
            <div>
              <Label>Downpayment</Label>
              <div className="flex flex-wrap gap-1.5 mb-1.5 justify-center" role="group" aria-label="Downpayment percentage">
                {DEPOSIT_PCTS.map((pct) => (
                  <button
                    key={pct}
                    onClick={() => handleDepositPct(pct)}
                    className="py-1.5 rounded-lg border text-xs font-medium transition-colors text-center"
                    style={{
                      backgroundColor: depositPct === pct && !showCustom ? "rgba(0,230,118,0.1)" : "transparent",
                      borderColor: depositPct === pct && !showCustom ? "rgba(0,230,118,0.4)" : "var(--cz-border)",
                      color: depositPct === pct && !showCustom ? "#34D399" : "var(--cz-text-50)",
                    }}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
              <div className="flex justify-center max-w-[160px] mx-auto">
                <span
                  className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 text-xs"
                  style={{
                    backgroundColor: "var(--cz-input)",
                    borderColor: "var(--cz-border)",
                    color: "var(--cz-text-40)",
                  }}
                >
                  RM
                </span>
                <input
                  type="number"
                  value={customDeposit}
                  onChange={(e) => setCustomDeposit(e.target.value)}
                  placeholder="Custom"
                  min={0}
                  aria-label="Custom downpayment amount"
                  className="w-full px-3 py-1.5 rounded-r-lg text-xs outline-none transition-colors placeholder:text-theme-30"
                  style={{
                    backgroundColor: "var(--cz-input)",
                    border: "1px solid var(--cz-border)",
                    color: "var(--cz-text-80)",
                  }}
                />
              </div>
            </div>

            {/* Rate & Tenure */}
            <div>
              <Label>Rate &amp; Tenure</Label>
              <div className="flex flex-wrap gap-1 items-center justify-center" role="group" aria-label="Loan tenure in years">
                <div className="relative">
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    step="0.01"
                    min="0"
                    aria-label="Interest rate percentage"
                    className="w-full px-2 py-1.5 rounded-lg text-xs outline-none transition-colors text-center pr-6"
                    style={{
                      backgroundColor: "var(--cz-input)",
                      border: "1px solid var(--cz-border)",
                      color: "var(--cz-text-80)",
                    }}
                  />
                  <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none" style={{ color: "var(--cz-text-40)" }}>
                    %
                  </span>
                </div>
                <span className="text-xs shrink-0" style={{ color: "var(--cz-text-30)" }}>×</span>
                <div className="flex flex-wrap gap-1">
                {TENURES.map((y) => (
                  <button
                    key={y}
                    onClick={() => setTenure(y)}
                    className="px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors text-center"
                    style={{
                      backgroundColor: tenure === y ? "rgba(0,230,118,0.1)" : "transparent",
                      borderColor: tenure === y ? "rgba(0,230,118,0.4)" : "var(--cz-border)",
                      color: tenure === y ? "#34D399" : "var(--cz-text-50)",
                    }}
                  >
                    {y}yr
                  </button>
                ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---- Results ---- */}
          <div>
            <div
              className="rounded-xl p-5"
              style={{
                backgroundColor: "var(--cz-ledger)",
                border: "1px solid var(--cz-border)",
              }}
            >
              <div className="font-mono text-xs space-y-2">
                {/* OTR Price */}
                <div className="flex justify-between items-center">
                  <span className="text-theme-50">OTR Price :</span>
                  <span className="text-theme-80 font-medium tabular-nums">
                    {fmtDec(vehicle.otr)}
                  </span>
                </div>

                {/* Rebate */}
                {rebateOn && (
                  <div className="flex justify-between items-center">
                    <span className="text-theme-50">Rebate :</span>
                    <span className="text-emerald-400 font-medium tabular-nums">
                      (-)&nbsp;{fmtDec(result.rebateAmount)}
                    </span>
                  </div>
                )}

                {/* CSP/GSP/SSP */}
                {cspOn && (
                  <div className="flex justify-between items-center">
                    <span className="text-theme-50">CSP/GSP/SSP :</span>
                    {vehicle.cspRebate > 0 ? (
                      <span className="text-cyan-400 font-medium tabular-nums">
                        (-)&nbsp;{fmtDec(result.cspAmount)}
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-medium text-[10px] text-right leading-tight max-w-[180px]">
                        6-Year Service Package*
                      </span>
                    )}
                  </div>
                )}

                {/* Downpayment */}
                <div className="flex justify-between items-center">
                  <span className="text-theme-50">Downpayment :</span>
                  <span className="text-cyan-400 font-medium tabular-nums">
                    (-)&nbsp;{fmtDec(result.depositAmount)}
                  </span>
                </div>

                {/* Divider */}
                <div className="my-2.5" style={{ borderTop: "2px solid var(--cz-border)" }} />

                {/* Loan / Finance Amount */}
                <div className="flex justify-between items-center">
                  <span className="text-theme-90 font-semibold text-[13px]">
                    Loan / Finance Amount :
                  </span>
                  <span className="text-theme-90 font-bold text-base tabular-nums">
                    {fmtDec(result.loanAmount)}
                  </span>
                </div>
              </div>

              {/* Monthly highlight — revamped */}
              <div
                className="mt-4 rounded-xl p-4 text-center"
                style={{
                  background: "linear-gradient(135deg, rgba(0,230,118,0.12) 0%, rgba(0,212,255,0.08) 100%)",
                  border: "1px solid rgba(0,230,118,0.2)",
                  boxShadow: "0 0 30px rgba(0,230,118,0.06), inset 0 0 60px rgba(0,230,118,0.03)",
                }}
              >
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(52,211,153,0.9)" }}>
                    Monthly Instalment
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-theme-90">
                  RM{fmtDec(result.monthly)}
                  <span className="text-base font-medium" style={{ color: "var(--cz-text-50)" }}>/mo</span>
                </div>
                <div className="mt-1.5 text-[11px]" style={{ color: "var(--cz-text-40)" }}>
                  {(parseFloat(interestRate) || 0).toFixed(2)}% × {tenure} years
                </div>
              </div>
            </div>

            {/* ── Place Booking ── primary like protonmiri test-drive btn */}
            <a
              href={whatsappBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-[0_0_30px_rgba(52,211,153,0.25)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
            >
              <MousePointerClick size={16} />
              Place Booking
            </a>

            {/* WhatsApp CTA — secondary like protonmiri card btn */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border border-emerald-500/25 text-emerald-300 hover:from-emerald-500/30 hover:to-emerald-600/20 hover:border-emerald-400/40 hover:shadow-[0_0_25px_rgba(52,211,153,0.15)] transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp for Enquiry
            </a>

            {/* Check Eligibility */}
            <div className="mt-5 text-center">
              <button
                onClick={() => setShowEligibilityForm(!showEligibilityForm)}
                className={`group inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  showEligibilityForm
                    ? "bg-white/[0.04] border border-white/[0.08] text-white/50 hover:bg-white/[0.06]"
                    : "bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 text-amber-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.12)] hover:border-amber-400/30 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                <ClipboardCheck size={14} className={`transition-transform duration-200 ${showEligibilityForm ? "" : "group-hover:scale-110"}`} />
                <span>
                  {showEligibilityForm ? "Close" : "Not sure about loan eligibility? Check here"}
                </span>
              </button>
              {showEligibilityForm && (
                <div className="mt-4 animate-fade-up">
                  <CheckEligibilityForm defaultCar={vehicle.name} />
                </div>
              )}
            </div>

            <p className="text-[11px] text-center text-theme-40 mt-4">
              Ridzuan Jahari · Sales Advisor · Kah Progression Auto
            </p>
          </div>
        </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[11px] font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--cz-text-40)" }}>
      {children}
    </span>
  );
}
