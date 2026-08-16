"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { Zap, Battery, Clock, DollarSign, Cable, Car, Info } from "lucide-react";
import { fetchChargingProfiles, type ChargingProfiles } from "@/lib/charging-profiles";
import { ResultBox } from "@/components/result-box";

const CHARGERS = [
  { kw: 7, label: "7 kW", type: "Wallbox (Home Charger)", ac: true },
  { kw: 22, label: "22 kW", type: "AC Public", ac: true },
  { kw: 60, label: "60 kW", type: "DC Fast", ac: false },
  { kw: 180, label: "180 kW", type: "DC Ultra-fast", ac: false },
];

const VEHICLES_URL = "https://bydmiri-data.netlify.app/data/vehicles.json";

const OPTION_ORDER = [
  "atto-2-premium",
  "seal-6-premium",
  "atto-3-ultra",
  "atto-3-premium",
  "sealion-7-dynamic",
  "sealion-7-premium",
  "sealion-7-performance",
  "seal-premium",
  "seal-performance",
  "m6-extended",
];

function parseACKW(val: string): number {
  const m = val.match(/(\d+\.?\d*)\s*kW/);
  return m?.[1] ? parseFloat(m[1]) : 7;
}

function parseDCWatts(val: string): number {
  const m = val.match(/(\d+\.?\d*)\s*kW/);
  return m?.[1] ? parseFloat(m[1]) : 50;
}

// Real-world DC fast-charge curve: full power up to ~50%, mild taper to 80%,
// then a gentle taper to 100% (battery protection). Kept moderate so full
// charge times stay presentable.
function dcTaper(soc: number): number {
  if (soc <= 50) return 1;
  if (soc <= 80) return 1 - ((soc - 50) / 30) * 0.2; // 1 → 0.8
  if (soc <= 90) return 0.8 - ((soc - 80) / 10) * 0.2; // 0.8 → 0.6
  return 0.6 - ((soc - 90) / 10) * 0.2; // 0.6 → 0.4
}

// AC is a low C-rate charge — power holds near rated until ~90%,
// with only a mild taper to full.
function acTaper(soc: number): number {
  if (soc <= 90) return 1;
  return 1 - ((soc - 90) / 10) * 0.15; // 1 → 0.85
}

// Numeric integration of the charge curve over the SoC window in 1% steps.
function integrateChargeTime(
  batteryKwh: number,
  fromPct: number,
  toPct: number,
  peakPowerKw: number,
  efficiency: number,
  isAc: boolean
): number {
  const steps = Math.max(1, Math.round(toPct - fromPct));
  const bucketKwh = batteryKwh / steps;
  let hours = 0;
  for (let i = 0; i < steps; i++) {
    const soc = fromPct + i + 0.5; // midpoint of the bucket
    const taper = isAc ? acTaper(soc) : dcTaper(soc);
    const power = peakPowerKw * efficiency * taper;
    if (power > 0) hours += bucketKwh / power;
  }
  return hours;
}

function formatDuration(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h >= 1) return `${h}h ${m}m`;
  return `${m} min`;
}

interface VariantOption {
  id: string;
  label: string;
  battery: number;
  range: number;
  acCharging: string;
  maxChargePower: string;
}

interface RawModel {
  model: string;
  segment: string;
  variants: {
    name: string;
    battery: number;
    range: number;
    acCharging: string;
    maxChargePower: string;
  }[];
}

function flattenVariants(models: RawModel[]): VariantOption[] {
  const list: VariantOption[] = [];
  for (const m of models) {
    for (const v of m.variants) {
      list.push({
        id: `${m.model.toLowerCase().replace(/\s+/g, "-")}-${v.name.toLowerCase().replace(/\s+/g, "-")}`,
        label: `${m.model} ${v.name}`,
        battery: v.battery,
        range: v.range,
        acCharging: v.acCharging,
        maxChargePower: v.maxChargePower,
      });
    }
  }
  return list;
}

export default function ChargingEstimator() {
  const [options, setOptions] = useState<VariantOption[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [chargerKw, setChargerKw] = useState(7);
  const [fromPct, setFromPct] = useState(20);
  const [toPct, setToPct] = useState(80);
  const [profiles, setProfiles] = useState<ChargingProfiles | null>(null);
  const [loading, setLoading] = useState(true);

  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<"from" | "to" | null>(null);
  // Mirror of dragRef for render: which handle is being dragged right now.
  // (Refs must not be read during render; state drives the value tooltips.)
  const [dragging, setDragging] = useState<"from" | "to" | null>(null);

  useEffect(() => {
    fetch(VEHICLES_URL)
      .then((r) => r.json())
      .then((data: RawModel[]) => {
        const flat = flattenVariants(data);
        flat.sort((a, b) => OPTION_ORDER.indexOf(a.id) - OPTION_ORDER.indexOf(b.id));
        setOptions(flat);
        if (flat.length > 0) setSelectedId(flat[0]!.id);
      })
      .catch(() => {
        // fallback: keep empty
      })
      .finally(() => setLoading(false));

    fetchChargingProfiles()
      .then(setProfiles)
      .catch(() => {
        // fallback: keep null, calculation will use hardcoded fallbacks
      });
  }, []);

  const clampPct = useCallback((clientX: number): number => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return Math.round((x / rect.width) * 100);
  }, []);

  const handlePointerDown = useCallback(
    (handle: "from" | "to") => (e: React.PointerEvent) => {
      e.preventDefault();
      dragRef.current = handle;
      setDragging(handle);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;
      const pct = clampPct(e.clientX);
      if (dragRef.current === "from") {
        setFromPct(Math.min(pct, toPct - 5));
      } else {
        setToPct(Math.max(pct, fromPct + 5));
      }
    },
    [clampPct, fromPct, toPct]
  );

  const handlePointerUp = useCallback(() => {
    dragRef.current = null;
    setDragging(null);
  }, []);

  const vehicle = useMemo(
    () => options.find((v) => v.id === selectedId),
    [options, selectedId]
  );

  const selectedCharger = CHARGERS.find((c) => c.kw === chargerKw)!;

  const result = useMemo(() => {
    if (!vehicle) return null;
    const isAc = selectedCharger.ac;
    const carLimit = isAc
      ? parseACKW(vehicle.acCharging)
      : parseDCWatts(vehicle.maxChargePower);
    const effectivePower = Math.min(chargerKw, carLimit);
    const efficiency = isAc ? 0.9 : 0.95; // real-world conversion losses (AC OBC / DC charger)
    const energyNeeded = vehicle.battery * ((toPct - fromPct) / 100);
    const wallEnergy = energyNeeded / efficiency; // kWh drawn from the wall
    const hours =
      effectivePower > 0
        ? integrateChargeTime(energyNeeded, fromPct, toPct, effectivePower, efficiency, isAc)
        : 0;
    const rate = isAc ? (profiles?.homeRate ?? 0.33) : (profiles?.dcRate ?? 1.40);
    const cost = wallEnergy * rate;
    const kmRecouped = Math.round(((toPct - fromPct) / 100) * vehicle.range);
    return { energyNeeded, effectivePower, carLimit, isAc, hours, cost, rate, kmRecouped, efficiency, wallEnergy };
  }, [vehicle, chargerKw, fromPct, toPct, selectedCharger, profiles]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6">
        <div className="text-center text-white/40 text-sm py-8">Loading vehicle data…</div>
      </div>
    );
  }

  if (options.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6">
        <div className="text-center text-white/40 text-sm py-8">Unable to load vehicle data.</div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <Zap size={15} className="text-emerald-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white/80">Charging Time &amp; Cost</h3>
          <p className="text-xs text-white/30">Estimate based on battery size and charger type</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Inputs */}
        <div className="space-y-4">
          {/* Vehicle selector */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-white/40 mb-1.5">
              Vehicle
            </label>
            <div className="relative">
              <Car size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/30" />
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                aria-label="Select vehicle model"
                className="w-full pl-7 pr-3 py-2.5 min-h-11 rounded-lg text-base outline-none transition-colors appearance-none"
                style={{
                  backgroundColor: "var(--cz-input, #111)",
                  border: "1px solid var(--cz-border, rgba(255,255,255,0.08))",
                  color: "var(--cz-text-80, #ddd)",
                }}
              >
                {options.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Charger type */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-white/40 mb-1.5">
              Charger Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {CHARGERS.map((c) => (
                <button
                  key={c.kw}
                  onClick={() => setChargerKw(c.kw)}
                  className="py-2.5 min-h-11 rounded-lg border text-xs font-medium transition-all text-center"
                  style={{
                    backgroundColor:
                      chargerKw === c.kw
                        ? "rgba(0,230,118,0.1)"
                        : "transparent",
                    borderColor:
                      chargerKw === c.kw
                        ? "rgba(0,230,118,0.4)"
                        : "var(--cz-border, rgba(255,255,255,0.08))",
                    color:
                      chargerKw === c.kw
                        ? "#34D399"
                        : "var(--cz-text-50, rgba(255,255,255,0.5))",
                  }}
                >
                  <div className="font-semibold">{c.label}</div>
                  <div className="text-[11px] opacity-60">{c.type}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Charge range slider */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-white/40 mb-1.5">
              Charge Range
            </label>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-white/40">
                <span>From: {fromPct}%</span>
                <span>To: {toPct}%</span>
              </div>
              <div
                ref={trackRef}
                className="relative h-8 mx-3 flex items-center select-none touch-none"
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                {/* Track bg */}
                <div className="absolute w-full h-1.5 rounded-full bg-white/[0.06] pointer-events-none" />
                {/* Filled track */}
                <div
                  className="absolute h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 pointer-events-none"
                  style={{ left: `${fromPct}%`, width: `${toPct - fromPct}%` }}
                />
                {/* Handle 1 (from) */}
                <div
                  className="absolute -translate-x-1/2 z-10 cursor-grab active:cursor-grabbing w-11 h-11 flex items-center justify-center"
                  style={{ left: `${fromPct}%` }}
                  onPointerDown={handlePointerDown("from")}
                >
                  <div
                    className="w-5 h-5 rounded-full shadow-sm bg-white border-2 pointer-events-none"
                    style={{
                      borderColor: "rgba(52,211,153,0.6)",
                      boxShadow: "0 0 8px rgba(52,211,153,0.2)",
                    }}
                  />
                  {dragging === "from" && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-emerald-400 whitespace-nowrap pointer-events-none">
                      {fromPct}%
                    </div>
                  )}
                </div>
                {/* Handle 2 (to) */}
                <div
                  className="absolute -translate-x-1/2 z-10 cursor-grab active:cursor-grabbing w-11 h-11 flex items-center justify-center"
                  style={{ left: `${toPct}%` }}
                  onPointerDown={handlePointerDown("to")}
                >
                  <div
                    className="w-5 h-5 rounded-full shadow-sm bg-white border-2 pointer-events-none"
                    style={{
                      borderColor: "rgba(52,211,153,0.6)",
                      boxShadow: "0 0 8px rgba(52,211,153,0.2)",
                    }}
                  />
                  {dragging === "to" && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-emerald-400 whitespace-nowrap pointer-events-none">
                      {toPct}%
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-white/20">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <div
            className="rounded-xl p-4 h-full flex flex-col justify-center"
            style={{
              backgroundColor: "var(--cz-ledger, rgba(255,255,255,0.03))",
              border: "1px solid var(--cz-border, rgba(255,255,255,0.06))",
            }}
          >
            {result && vehicle && (
              <div className="space-y-3">
                {/* Metric cards */}
                <div className="grid grid-cols-2 gap-2">
                  <ResultBox
                    icon={<Battery size={13} />}
                    label="Battery Capacity"
                    value={`${vehicle.battery} kWh (${vehicle.range} km)`}
                  />
                  <ResultBox
                    icon={<Cable size={13} />}
                    label="Charger"
                    value={`${chargerKw} kW ${selectedCharger.type}`}
                  />
                  <ResultBox
                    icon={<Car size={13} />}
                    label="Car OBC Limit"
                    value={`${result.carLimit} kW ${result.isAc ? "AC" : "DC"}`}
                  />
                  <ResultBox
                    icon={<Zap size={13} />}
                    label="Effective Power"
                    value={`${result.effectivePower} kW`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 overflow-hidden">
                  <ResultBox
                    icon={<Car size={13} />}
                    label="Range Recouped"
                    value={`~${result.kmRecouped} km`}
                    sub={`+${result.energyNeeded.toFixed(1)} kWh`}
                    highlight
                  />
                  <ResultBox
                    icon={<Clock size={13} />}
                    label="Charging Time"
                    value={`~${formatDuration(result.hours)}`}
                    sub={`${fromPct}% → ${toPct}%`}
                    highlight
                  />
                  <ResultBox
                    icon={<DollarSign size={13} />}
                    label="Est. Cost"
                    value={`~RM${result.cost.toFixed(2)}`}
                    sub={`@ RM${result.rate.toFixed(2)}/kWh`}
                    color="cyan"
                    highlight
                  />
                </div>

                {result.effectivePower < chargerKw && (
                  <p className="text-xs text-amber-400/60 text-center">
                    Limited by vehicle&apos;s {result.isAc ? "onboard AC charger" : "max DC charge rate"} ({result.carLimit} kW)
                  </p>
                )}

                <p className="text-[10px] text-white/30 text-center">
                  ~{Math.round(result.efficiency * 100)}% charging efficiency applied (conversion losses)
                </p>

                {result.isAc ? (
                  <p className="text-[10px] text-white/30 text-center leading-relaxed">
                    AC charging holds near full speed until ~90% — taper is barely noticeable.
                  </p>
                ) : (
                  <div className="text-center">
                    <p className="text-[10px] text-white/30 mb-1.5 leading-relaxed">
                      DC fast charging slows down as the battery fills — the last 20% often takes as
                      long as the first 30%.
                    </p>
                    <div className="flex h-2 rounded-full overflow-hidden max-w-[260px] mx-auto">
                      <div className="bg-emerald-500/80" style={{ width: "37.5%" }} />
                      <div className="bg-emerald-400/50" style={{ width: "37.5%" }} />
                      <div className="bg-amber-400/80" style={{ width: "12.5%" }} />
                      <div className="bg-red-400/70" style={{ width: "12.5%" }} />
                    </div>
                    <div className="flex max-w-[260px] mx-auto text-[9px] text-white/30 mt-1">
                      <span className="w-[37.5%] text-left">Full speed</span>
                      <span className="w-[37.5%] text-center">Easing off</span>
                      <span className="w-[12.5%] text-center">Slow</span>
                      <span className="w-[12.5%] text-right">Slower</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-1.5 mt-3 pt-3 border-t border-white/[0.06]">
                  <Info size={11} className="shrink-0 mt-0.5 text-white/30" />
                  <p className="text-[10px] text-white/30 leading-relaxed">
                    Charging times &amp; costs are estimates and already account for slower DC charging
                    above ~80%. Actual public DC charging fees vary by charging network and location.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
