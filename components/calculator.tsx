"use client";

import { useState, useCallback, useMemo } from "react";
import { Check, MousePointerClick, ClipboardCheck } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";
import { activeRebate } from "@/lib/vehicles";
import { calculateFinance, fmt, fmtDec } from "@/lib/finance";
import { generateWhatsAppBookingUrl } from "@/lib/whatsapp";
import CheckEligibilityForm from "@/components/check-eligibility-form";

interface Props {
  vehicle: Vehicle;
}

const TENURES = [2, 3, 4, 5, 6, 7, 8, 9];
const DEPOSIT_PCTS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 50];
const DEFAULT_INTEREST = 2.3;

export default function Calculator({ vehicle }: Props) {
  const [rebateOn, setRebateOn] = useState(true);
  const [cspOn, setCspOn] = useState(false);
  const [depositPct, setDepositPct] = useState(10);
  const [customDeposit, setCustomDeposit] = useState("");
  const [tenure, setTenure] = useState(9);
  const [interestRate, setInterestRate] = useState(String(DEFAULT_INTEREST));
  const [showEligibilityForm, setShowEligibilityForm] = useState(false);

  const hasPromoOptions =
    !!vehicle.promotionOptions && vehicle.promotionOptions.length > 0;
  const effectiveRebate = activeRebate(vehicle);

  const result = useMemo(() => {
    const rate = parseFloat(interestRate) || 0;
    const customVal = customDeposit === "" ? null : parseFloat(customDeposit);
    return calculateFinance({
      otr: vehicle.otr,
      rebate: effectiveRebate,
      rebateEnabled: rebateOn,
      cspEnabled: cspOn,
      cspRebate: vehicle.cspRebate,
      depositPercent: depositPct,
      customDeposit: !customVal || isNaN(customVal) ? null : customVal,
      tenure,
      interestRate: rate,
    });
  }, [vehicle, rebateOn, cspOn, effectiveRebate, depositPct, customDeposit, tenure, interestRate]);

  const whatsappData = useMemo(
    () => ({
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
    () => generateWhatsAppBookingUrl(whatsappData),
    [whatsappData]
  );

  const handleDepositPct = useCallback((pct: number) => {
    setDepositPct(pct);
    setCustomDeposit("");
  }, []);

  const showCustom =
    customDeposit !== "" && parseFloat(customDeposit) > 0;

  // When a custom RM downpayment is entered, show what it works out to as a
  // percentage of the full (OTR) price. Based on the deposit the calculator
  // actually applies, so it stays consistent with the ledger's Downpayment line
  // when a custom amount is capped at the net price.
  const customPctOfOtr =
    showCustom && vehicle.otr > 0
      ? (result.depositAmount / vehicle.otr) * 100
      : null;

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-5 @[700px]:grid-cols-2 @[700px]:gap-6">
          {/* ---- Inputs ---- */}
          <div className="space-y-3 text-center min-w-0">
            {/* Rebate toggle */}
            <div className="space-y-2">
              <button
                onClick={() => setRebateOn(!rebateOn)}
                  className={`flex items-center justify-center gap-2.5 px-3.5 py-2.5 min-h-11 rounded-lg border transition-colors text-sm w-full ${
                    rebateOn
                      ? "text-accent"
                      : "text-theme-50"
                  }`}
                  style={{
                    backgroundColor: rebateOn ? "var(--cz-accent-soft)" : "transparent",
                    borderColor: rebateOn ? "var(--cz-accent-line)" : "var(--cz-border)",
                  }}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center transition-colors shrink-0 ${
                    rebateOn ? "bg-accent" : ""
                  }`}
                  style={{ backgroundColor: rebateOn ? undefined : "var(--cz-text-30)" }}
                >
                  {rebateOn && <Check size={10} className="text-white" />}
                </div>
                <span className="font-medium">
                  RM{fmt(effectiveRebate)} Rebate
                </span>
              </button>

              {/* CSP/GSP/SSP toggle or static note */}
              {vehicle.cspRebate > 0 ? (
                <>
                  <button
                    onClick={() => setCspOn(!cspOn)}
                  className={`flex items-center justify-center gap-2.5 px-3.5 py-2.5 min-h-11 rounded-lg border transition-colors text-sm w-full ${
                    cspOn
                      ? "text-accent"
                      : "text-theme-50"
                  }`}
                  style={{
                    backgroundColor: cspOn ? "var(--cz-accent-soft)" : "transparent",
                    borderColor: cspOn ? "var(--cz-accent-line)" : "var(--cz-border)",
                  }}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center transition-colors shrink-0 ${
                        cspOn ? "bg-accent" : ""
                      }`}
                      style={{ backgroundColor: cspOn ? undefined : "var(--cz-text-30)" }}
                    >
                      {cspOn && <Check size={10} className="text-white" />}
                    </div>
                    <span className="font-medium">
                      RM{fmt(vehicle.cspRebate)} CSP/GSP/SSP*
                    </span>
                  </button>
                  <p className="text-xs text-theme-50/50 text-center leading-tight mt-0.5">
                    *CSP/GSP/SSP = Corporate/Government/Student Support Program (Terms &amp; Conditions apply)
                  </p>
                </>
              ) : (
                <div
                  className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg border text-sm w-full text-theme-50"
                  style={{
                    backgroundColor: "var(--cz-input)",
                    borderColor: "var(--cz-border)",
                  }}
                >
                  <span className="font-medium">
                    CSP/GSP/SSP : RM0 {hasPromoOptions ? "(replaced by cash rebate)" : "(not applicable for this model)"}
                  </span>
                </div>
              )}
            </div>

            {/* Downpayment */}
            <div>
              <Label>Downpayment</Label>
              <div className="px-0.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-data text-lg font-semibold text-accent tabular-nums leading-none">
                    {showCustom ? `${customPctOfOtr?.toFixed(1) ?? "0.0"}%` : `${depositPct}%`}
                  </span>
                  <span className="font-data text-sm text-theme-70 tabular-nums">
                    {fmtDec(result.depositAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={DEPOSIT_PCTS.length - 1}
                  step={1}
                  value={Math.max(0, DEPOSIT_PCTS.indexOf(depositPct))}
                  onChange={(e) => handleDepositPct(DEPOSIT_PCTS[Number(e.target.value)] ?? 0)}
                  aria-label="Downpayment percentage"
                  aria-valuetext={`${depositPct}% — ${fmtDec(result.depositAmount)}`}
                  disabled={showCustom}
                  className="cz-range w-full"
                />
                <div className="-mt-1 relative h-[10px]" aria-hidden="true">
                  {DEPOSIT_PCTS.map((pct, i) => (
                    <span
                      key={pct}
                      className="absolute top-0 text-[9px] tabular-nums transition-colors -translate-x-1/2"
                      style={{
                        left: `calc(9px + (100% - 18px) * ${i / (DEPOSIT_PCTS.length - 1)})`,
                        color: depositPct === pct && !showCustom ? "var(--cz-accent)" : "var(--cz-text-30)",
                      }}
                    >
                      {pct}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative mt-1">
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] pointer-events-none"
                  style={{ color: "var(--cz-text-40)" }}
                >
                  RM
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={customDeposit}
                  onChange={(e) => setCustomDeposit(e.target.value.replace(/[^\d]/g, ""))}
                  placeholder="Custom downpayment amount"
                  aria-label="Custom downpayment amount"
                  className="w-full h-8 pl-8 pr-2.5 rounded-md text-[11px] leading-none outline-none transition-colors placeholder:text-[10px] placeholder:text-theme-30 tabular-nums"
                  style={{
                    backgroundColor: "var(--cz-input)",
                    border: "1px solid var(--cz-border)",
                    color: "var(--cz-text-80)",
                  }}
                />
              </div>
              {customPctOfOtr !== null && (
                <p className="text-[11px] text-theme-40 text-center mt-1">
                  ≈&nbsp;{customPctOfOtr.toFixed(1)}% of OTR price
                </p>
              )}
            </div>

            {/* Rate & Tenure */}
            <div>
              <Label>Rate &amp; Tenure</Label>

              <div className="px-0.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-data text-lg font-semibold text-accent tabular-nums leading-none">
                    {tenure} <span className="text-xs font-medium">years</span>
                  </span>
                  <span className="inline-flex items-baseline gap-1">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value.replace(/[^\d.]/g, ""))}
                      aria-label="Interest rate percentage"
                      className="w-12 px-1 py-0.5 rounded-md text-sm text-right tabular-nums outline-none transition-colors"
                      style={{
                        backgroundColor: "var(--cz-input)",
                        border: "1px solid var(--cz-border)",
                        color: "var(--cz-text-80)",
                      }}
                    />
                    <span className="text-[11px]" style={{ color: "var(--cz-text-40)" }}>% p.a.</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={TENURES.length - 1}
                  step={1}
                  value={Math.max(0, TENURES.indexOf(tenure))}
                  onChange={(e) => setTenure(TENURES[Number(e.target.value)] ?? 9)}
                  aria-label="Loan tenure in years"
                  aria-valuetext={`${tenure} years`}
                  className="cz-range w-full"
                />
                <div className="-mt-1 relative h-[10px]" aria-hidden="true">
                  {TENURES.map((y, i) => (
                    <span
                      key={y}
                      className="absolute top-0 text-[9px] tabular-nums transition-colors -translate-x-1/2"
                      style={{
                        left: `calc(9px + (100% - 18px) * ${i / (TENURES.length - 1)})`,
                        color: tenure === y ? "var(--cz-accent)" : "var(--cz-text-30)",
                      }}
                    >
                      {y}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---- Results ---- */}
          <div className="min-w-0">
            <div
              className="rounded-xl p-4 sm:p-5 @[700px]:sticky @[700px]:top-4 @[700px]:self-start"
              style={{
                backgroundColor: "var(--cz-ledger)",
                border: "1px solid var(--cz-border)",
              }}
            >
              <div className="font-data text-xs space-y-2">
                {/* OTR Price */}
                <div className="flex justify-between items-center">
                  <span className="text-theme-50">OTR Price :</span>
                  <span className="text-theme-80 font-medium tabular-nums">
                    {fmtDec(vehicle.otr)}
                  </span>
                </div>

                {/* Rebate */}
                {(hasPromoOptions || rebateOn) && (
                  <div className="flex justify-between items-center">
                    <span className="text-theme-50">Rebate :</span>
                    <span className="text-accent font-medium">
                      (-)&nbsp;{fmtDec(result.rebateAmount)}
                    </span>
                  </div>
                )}

                {/* CSP/GSP/SSP */}
                {(cspOn || vehicle.cspRebate === 0) && (
                  <div className="flex justify-between items-center">
                    <span className="text-theme-50">CSP/GSP/SSP :</span>
                    {vehicle.cspRebate > 0 ? (
                      <span className="text-accent font-medium">
                        (-)&nbsp;{fmtDec(result.cspAmount)}
                      </span>
                    ) : (
                      <span className="text-theme-40 font-medium text-xs text-right leading-tight max-w-[180px]">
                        RM0 {hasPromoOptions ? "(replaced by cash rebate)" : "(not applicable)"}
                      </span>
                    )}
                  </div>
                )}

                {/* Downpayment */}
                <div className="flex justify-between items-center">
                  <span className="text-theme-50">Downpayment :</span>
                  <span className="text-accent font-medium">
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

              {/* Monthly highlight — accent surface, no glow */}
              <div
                className="mt-4 rounded-xl p-4 text-center"
                style={{
                  backgroundColor: "var(--cz-accent-soft)",
                  border: "1px solid var(--cz-accent-line)",
                }}
              >
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span className="label-mono">
                    Monthly Instalment
                  </span>
                </div>
                <div className="font-data text-3xl sm:text-4xl font-semibold tracking-tight text-theme-90">
                  RM{fmtDec(result.monthly)}
                  <span className="text-base font-normal" style={{ color: "var(--cz-text-50)" }}>/mo</span>
                </div>
                <div className="mt-1.5 font-data text-[11px]" style={{ color: "var(--cz-text-40)" }}>
                  {(parseFloat(interestRate) || 0).toFixed(2)}% × {tenure} years
                </div>
              </div>
            </div>

            {/* ── Place Booking — accent fill, no glow ── */}
            <a
              href={whatsappBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta mt-4 w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm bg-accent"
              style={{ color: "var(--cz-accent-ink)" }}
            >
              <MousePointerClick size={16} />
              Place Booking
            </a>

            {/* Check Eligibility */}
            <div className="mt-5 text-center">
              <button
                onClick={() => setShowEligibilityForm(!showEligibilityForm)}
                className={`inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-colors ${
                  showEligibilityForm ? "cta-outline" : "cta-outline text-counter"
                }`}
                style={
                  showEligibilityForm
                    ? undefined
                    : { borderColor: "var(--cz-counter-line)" }
                }
              >
                <ClipboardCheck size={14} className={`transition-transform ${showEligibilityForm ? "" : "group-hover:scale-110"}`} style={{ transitionDuration: "var(--dur-short)" }} />
                <span>
                  {showEligibilityForm ? "Close" : "Check Loan Eligibility"}
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
