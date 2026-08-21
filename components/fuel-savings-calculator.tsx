"use client";

import { useState, useMemo } from "react";
import { Fuel, Car, Zap, DollarSign, Info, TrendingDown, Route } from "lucide-react";
import { vehicles } from "@/lib/vehicles";
import { fmt } from "@/lib/finance";
import { ResultBox } from "@/components/result-box";

const TARIFFS = [
  { key: "sarawak-above-1300", label: "Sarawak - Above 1300 kWh", rate: 0.33 },
  { key: "west-peninsular-below-1500", label: "West / Peninsular Malaysia - Below 1500 kWh", rate: 0.44 },
  { key: "west-peninsular-above-1500", label: "West / Peninsular Malaysia - Above 1500 kWh", rate: 0.54 },
  { key: "sabah-above-1500", label: "Sabah - Above 1500 kWh", rate: 0.6 },
  { key: "others", label: "Others - any electric price", rate: null },
] as const;

type TariffKey = (typeof TARIFFS)[number]["key"];

const inputStyle: React.CSSProperties = {
  backgroundColor: "var(--cz-input, #111)",
  border: "1px solid var(--cz-border, rgba(255,255,255,0.08))",
  color: "var(--cz-text-80, #ddd)",
};

const labelCls = "block text-[11px] font-semibold uppercase tracking-wide text-theme-40 mb-1.5";

const fieldCls =
  "w-full py-2.5 min-h-11 rounded-lg text-base outline-none transition-colors focus:border-[color:var(--cz-accent-line)]";

const VEHICLES_BY_ID = new Map(vehicles.map((v) => [v.id, v]));

export default function FuelSavingsCalculator() {
  const [selectedId, setSelectedId] = useState(vehicles[0]!.id);
  const [dailyWorkKm, setDailyWorkKm] = useState("30");
  const [weekendKm, setWeekendKm] = useState("80");
  const [iceKmPerL, setIceKmPerL] = useState("12");
  const [fuelPrice, setFuelPrice] = useState("2.05");
  const [tariffKey, setTariffKey] = useState<TariffKey>("sarawak-above-1300");
  const [customElecPrice, setCustomElecPrice] = useState("");
  const [calculated, setCalculated] = useState(false);

  // Static lookup built once at module scope.
  const vehicle = VEHICLES_BY_ID.get(selectedId) ?? vehicles[0]!;
  const selectedTariff = TARIFFS.find((t) => t.key === tariffKey)!;

  const kmPerL = parseFloat(iceKmPerL);
  const lPer100 = kmPerL > 0 ? 100 / kmPerL : null;

  const result = useMemo(() => {
    const daily = parseFloat(dailyWorkKm) || 0;
    const weekend = parseFloat(weekendKm) || 0;
    const effKmPerL = parseFloat(iceKmPerL) || 0;
    const fuel = parseFloat(fuelPrice) || 0;
    const elec =
      tariffKey === "others" ? parseFloat(customElecPrice) || 0 : (selectedTariff.rate ?? 0);

    const errors: string[] = [];
    if (daily < 0 || weekend < 0) errors.push("Distances cannot be negative.");
    if (effKmPerL <= 0) errors.push("Please enter a valid fuel efficiency — km/L must be greater than 0.");
    if (fuel <= 0) errors.push("Fuel price must be greater than 0.");
    if (elec <= 0) errors.push("Electricity price must be greater than 0.");

    if (errors.length > 0) return { valid: false as const, errors };

    const base = vehicle.consumption;
    const maxConsumption = base * 1.2;
    const effConsumption = (base + maxConsumption) / 2;

    const weekdayKm = 5 * daily;
    const totalWeeklyKm = weekdayKm + weekend;
    const evWeeklyCost = totalWeeklyKm * (effConsumption / 100) * elec;
    const iceWeeklyCost = (totalWeeklyKm / effKmPerL) * fuel;
    const weeklySavings = iceWeeklyCost - evWeeklyCost;
    const annualSavings = weeklySavings * (365 / 7);
    const monthlySavings = annualSavings / 12;
    const tenYearSavings = annualSavings * 10;

    return {
      valid: true as const,
      effConsumption,
      totalWeeklyKm,
      evWeeklyCost,
      iceWeeklyCost,
      weeklySavings,
      annualSavings,
      monthlySavings,
      tenYearSavings,
    };
  }, [
    dailyWorkKm,
    weekendKm,
    iceKmPerL,
    fuelPrice,
    tariffKey,
    customElecPrice,
    selectedTariff,
    vehicle,
  ]);

  const chart = useMemo(() => {
    if (!calculated || !result.valid) return null;
    const maxCost = Math.max(result.iceWeeklyCost, result.evWeeklyCost, 1);
    const iceH = Math.max(8, Math.round((result.iceWeeklyCost / maxCost) * 160));
    const evH = Math.max(8, Math.round((result.evWeeklyCost / maxCost) * 160));
    return {
      iceH,
      evH,
      iceAnnual: result.iceWeeklyCost * (365 / 7),
      evAnnual: result.evWeeklyCost * (365 / 7),
    };
  }, [calculated, result]);

  const handleCalc = () => setCalculated(true);

  const isError = !result.valid;
  const showResults = calculated && result.valid;

  return (
    <div className="rounded-2xl border bg-theme-card p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg border flex items-center justify-center">
          <TrendingDown size={15} className="text-accent" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-theme-80">Fuel vs EV Running Cost</h3>
          <p className="text-xs text-theme-30">Estimate your annual savings by switching to electric</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Inputs */}
        <div className="space-y-4">
          {/* Vehicle selector */}
          <div>
            <label className={labelCls}>BYD Model</label>
            <div className="relative">
              <Car size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-theme-30" />
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                aria-label="Select BYD model"
                className={`${fieldCls} pl-7 pr-3 appearance-none`}
                style={inputStyle}
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Fuel price */}
            <div>
              <label className={labelCls}>Fuel Price (RM/L)</label>
              <div className="relative">
                <Fuel size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-theme-30" />
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(e.target.value)}
                  aria-label="Fuel price in RM per litre"
                  className={`${fieldCls} pl-7 pr-3`}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Electricity price */}
            <div>
              <label className={labelCls}>Electricity (RM/kWh)</label>
              <div className="relative">
                <Zap size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-theme-30" />
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={
                    tariffKey === "others"
                      ? customElecPrice
                      : String(selectedTariff.rate ?? 0)
                  }
                  readOnly={tariffKey !== "others"}
                  onChange={(e) => setCustomElecPrice(e.target.value)}
                  aria-label="Electricity price in RM per kWh"
                  className={`${fieldCls} pl-7 pr-3 ${tariffKey === "others" ? "" : "opacity-70 cursor-not-allowed"}`}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* TNB tariff select */}
          <div>
            <label className={labelCls}>Electricity Tariff</label>
            <div className="relative">
              <Zap size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-theme-30" />
              <select
                value={tariffKey}
                onChange={(e) => setTariffKey(e.target.value as TariffKey)}
                aria-label="Select electricity tariff"
                className={`${fieldCls} pl-7 pr-3 appearance-none`}
                style={inputStyle}
              >
                {TARIFFS.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Daily work round trip */}
            <div>
              <label className={labelCls}>Daily Work Round Trip (km)</label>
              <div className="relative">
                <Route size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-theme-30" />
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="1"
                  value={dailyWorkKm}
                  onChange={(e) => setDailyWorkKm(e.target.value)}
                  aria-label="Daily work round trip distance in km"
                  className={`${fieldCls} pl-7 pr-3`}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Weekend round trip */}
            <div>
              <label className={labelCls}>Weekend Round Trip (km)</label>
              <div className="relative">
                <Route size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-theme-30" />
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="1"
                  value={weekendKm}
                  onChange={(e) => setWeekendKm(e.target.value)}
                  aria-label="Weekend round trip distance in km"
                  className={`${fieldCls} pl-7 pr-3`}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* ICE fuel efficiency dual field */}
          <div>
            <label className={labelCls}>Current ICE Fuel Efficiency</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="relative">
                  <Fuel size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-theme-30" />
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.1"
                    value={iceKmPerL}
                    onChange={(e) => setIceKmPerL(e.target.value)}
                    aria-label="Current car fuel efficiency in km per litre"
                    className={`${fieldCls} pl-7 pr-3`}
                    style={inputStyle}
                  />
                </div>
                <p className="text-[10px] text-theme-30 mt-1">km/L</p>
              </div>
              <div>
                <div className="relative">
                  <Fuel size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-theme-30" />
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.1"
                    value={lPer100 !== null ? lPer100.toFixed(1) : ""}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      if (v > 0) setIceKmPerL(String(100 / v));
                    }}
                    aria-label="Current car fuel consumption in litres per 100 km"
                    className={`${fieldCls} pl-7 pr-3`}
                    style={inputStyle}
                  />
                </div>
                <p className="text-[10px] text-theme-30 mt-1">L/100km</p>
              </div>
            </div>
          </div>

          {/* Calculate button */}
          <button
            onClick={handleCalc}
            className="hero-cta w-full min-h-11 rounded-lg bg-accent text-sm font-bold py-3 cursor-pointer"
            style={{ color: "var(--cz-accent-ink)" }}
          >
            Calculate Savings
          </button>
        </div>

        {/* Results */}
        <div>
          <div
            className="rounded-xl p-4 h-full flex flex-col justify-center"
            style={{
              backgroundColor: "var(--cz-ledger)",
              border: "1px solid var(--cz-border)",
            }}
          >
            {/* Validation errors */}
            {calculated && isError && (
              <div className="space-y-2">
                {result.errors.map((err, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-1.5 text-xs text-counter rounded-lg p-2.5"
                    style={{
                      backgroundColor: "var(--cz-counter-soft)",
                      border: "1px solid var(--cz-counter-line)",
                    }}
                  >
                    <Info size={11} className="shrink-0 mt-0.5" />
                    <span>{err}</span>
                  </div>
                ))}
              </div>
            )}

            {!calculated && (
              <div className="text-center text-theme-40 text-sm py-8">
                Run the calculator to see weekly cost comparison, annual impact, and the 10-year
                savings story.
              </div>
            )}

            {showResults && (
              <div className="space-y-3">
                {/* Hero annual savings — accent surface, no gradient */}
                <div
                  className="rounded-xl p-4 text-center"
                  style={{
                    backgroundColor: "var(--cz-accent-soft)",
                    border: "1px solid var(--cz-accent-line)",
                  }}
                >
                  <div className="flex items-center justify-center gap-1 mb-1" style={{ color: "var(--cz-text-40)" }}>
                    <DollarSign size={13} />
                    <span className="label-mono">Estimated Annual Savings</span>
                  </div>
                  <div className="font-data text-3xl md:text-4xl font-semibold text-accent">
                    RM {fmt(result.annualSavings)}
                  </div>
                  <p className="font-data text-[10px] text-theme-40 mt-1">
                    ≈ RM {fmt(result.weeklySavings)}/week &middot; {result.effConsumption.toFixed(1)} kWh/100km avg
                  </p>
                </div>

                {/* Monthly + 10-year */}
                <div className="grid grid-cols-2 gap-2">
                  <ResultBox
                    icon={<DollarSign size={13} />}
                    label="Monthly Savings"
                    value={`RM ${fmt(result.monthlySavings)}`}
                    highlight
                  />
                  <ResultBox
                    icon={<TrendingDown size={13} />}
                    label="10-Year Savings"
                    value={`RM ${fmt(result.tenYearSavings)}`}
                    highlight
                    color="counter"
                  />
                </div>

                {/* Bar chart */}
                {chart && (
                  <div className="rounded-lg p-3 bg-theme-alt border border-[color:var(--cz-border)]">
                    <p className="text-[10px] text-theme-40 mb-2">Annual Cost Comparison</p>
                    <div className="flex items-end justify-center gap-8 h-[180px]">
                      <div className="flex flex-col items-center justify-end gap-1.5">
                        <span className="text-xs font-bold text-accent whitespace-nowrap">
                          RM {fmt(chart.evAnnual)}
                        </span>
                        <div
                          className="w-14 rounded-t-md bg-linear-to-t from-[color:var(--cz-accent)] to-[color:var(--cz-accent-strong)]"
                          style={{ height: `${chart.evH}px` }}
                        />
                        <span className="text-[10px] text-theme-50">BYD EV</span>
                      </div>
                      <div className="flex flex-col items-center justify-end gap-1.5">
                        <span className="text-xs font-bold text-counter whitespace-nowrap">
                          RM {fmt(chart.iceAnnual)}
                        </span>
                        <div
                          className="w-14 rounded-t-md bg-linear-to-t from-[color:var(--cz-counter)] to-[color:var(--cz-counter)]"
                          style={{ height: `${chart.iceH}px` }}
                        />
                        <span className="text-[10px] text-theme-50">Current ICE</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 pt-3 border-t" style={{ borderColor: "var(--cz-border)" }}>
        <div className="flex items-start gap-1.5">
          <Info size={11} className="shrink-0 mt-0.5 text-theme-30" />
          <p className="text-[10px] text-theme-30 leading-relaxed">
            Savings estimates are for reference only and are not a quotation or guarantee. Results
            are based on the fuel price, electricity tariff, mileage and manufacturer (WLTP)
            consumption figures you enter — real-world consumption varies with driving style,
            traffic, load and terrain. Charging at public DC stations typically costs more than the
            home rates shown here. Fuel prices and electricity tariffs are subject to change.
          </p>
        </div>
      </div>
    </div>
  );
}
