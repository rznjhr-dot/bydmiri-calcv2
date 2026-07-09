"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { Zap, Battery, Clock, DollarSign, Cable, Car, Gauge } from "lucide-react";

const CHARGERS = [
  { kw: 7, label: "7 kW", type: "Wallbox", ac: true },
  { kw: 22, label: "22 kW", type: "AC Public", ac: true },
  { kw: 60, label: "60 kW", type: "DC Fast", ac: false },
  { kw: 180, label: "180 kW", type: "DC Ultra-fast", ac: false },
];

const AC_RATE = 0.30;
const DC_RATE_MIN = 1.00;
const DC_RATE_MAX = 1.40;

const VEHICLES_URL = "https://bydmiri-data.netlify.app/data/vehicles.json";

function parseACKW(val: string): number {
  const m = val.match(/(\d+\.?\d*)\s*kW/);
  return m?.[1] ? parseFloat(m[1]) : 7;
}

function parseDCWatts(val: string): number {
  const m = val.match(/(\d+\.?\d*)\s*kW/);
  return m?.[1] ? parseFloat(m[1]) : 50;
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
  const [loading, setLoading] = useState(true);

  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<"from" | "to" | null>(null);

  useEffect(() => {
    fetch(VEHICLES_URL)
      .then((r) => r.json())
      .then((data: RawModel[]) => {
        const flat = flattenVariants(data);
        setOptions(flat);
        if (flat.length > 0) setSelectedId(flat[0]!.id);
      })
      .catch(() => {
        // fallback: keep empty
      })
      .finally(() => setLoading(false));
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
    const energyNeeded = vehicle.battery * ((toPct - fromPct) / 100);
    const hours = effectivePower > 0 ? energyNeeded / effectivePower : 0;
    const costLow = energyNeeded * (isAc ? AC_RATE : DC_RATE_MIN);
    const costHigh = isAc ? costLow : energyNeeded * DC_RATE_MAX;
    const kmRecouped = Math.round(((toPct - fromPct) / 100) * vehicle.range);
    return { energyNeeded, effectivePower, carLimit, isAc, hours, costLow, costHigh, kmRecouped };
  }, [vehicle, chargerKw, fromPct, toPct, selectedCharger]);

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
          <p className="text-[10px] text-white/30">Estimate based on battery size and charger type</p>
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
                className="w-full pl-7 pr-3 py-2 rounded-lg text-sm outline-none transition-colors appearance-none"
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
                  className="py-2 rounded-lg border text-xs font-medium transition-all text-center"
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
                  <div className="text-[9px] opacity-60">{c.type}</div>
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
              <div className="flex justify-between text-[10px] text-white/40">
                <span>From: {fromPct}%</span>
                <span>To: {toPct}%</span>
              </div>
              <div
                ref={trackRef}
                className="relative h-8 flex items-center select-none touch-none"
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
                  className="absolute w-5 h-5 -translate-x-1/2 rounded-full shadow-sm z-10 cursor-grab active:cursor-grabbing bg-white border-2"
                  style={{
                    left: `${fromPct}%`,
                    borderColor: "rgba(52,211,153,0.6)",
                    boxShadow: "0 0 8px rgba(52,211,153,0.2)",
                  }}
                  onPointerDown={handlePointerDown("from")}
                >
                  {dragRef.current === "from" && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-semibold text-emerald-400 whitespace-nowrap pointer-events-none">
                      {fromPct}%
                    </div>
                  )}
                </div>
                {/* Handle 2 (to) */}
                <div
                  className="absolute w-5 h-5 -translate-x-1/2 rounded-full shadow-sm z-10 cursor-grab active:cursor-grabbing bg-white border-2"
                  style={{
                    left: `${toPct}%`,
                    borderColor: "rgba(52,211,153,0.6)",
                    boxShadow: "0 0 8px rgba(52,211,153,0.2)",
                  }}
                  onPointerDown={handlePointerDown("to")}
                >
                  {dragRef.current === "to" && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-semibold text-emerald-400 whitespace-nowrap pointer-events-none">
                      {toPct}%
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between text-[9px] text-white/20">
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
                    value={`${vehicle.battery} kWh`}
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

                <div className="grid grid-cols-4 gap-2">
                  <ResultBox
                    icon={<Gauge size={13} />}
                    label="Energy Recouped"
                    value={`${result.energyNeeded.toFixed(1)} kWh`}
                    sub={`${fromPct}% → ${toPct}%`}
                    highlight
                  />
                  <ResultBox
                    icon={<Car size={13} />}
                    label="KM Recouped"
                    value={`~${result.kmRecouped} km`}
                    sub={`${vehicle.range} km full range`}
                    highlight
                  />
                  <ResultBox
                    icon={<DollarSign size={13} />}
                    label="Est. Cost"
                    value={
                      result.isAc
                        ? `~RM${result.costLow.toFixed(2)}`
                        : `RM${result.costLow.toFixed(2)} – RM${result.costHigh.toFixed(2)}`
                    }
                    sub={
                      result.isAc
                        ? `@ RM${AC_RATE}/kWh`
                        : `@ RM${DC_RATE_MIN}–${DC_RATE_MAX}/kWh`
                    }
                    color="cyan"
                    highlight
                  />
                  <ResultBox
                    icon={<Clock size={13} />}
                    label="Charging Time"
                    value={`~${formatDuration(result.hours)}`}
                    sub={`${fromPct}% → ${toPct}%`}
                    highlight
                  />
                </div>

                {result.effectivePower < chargerKw && (
                  <p className="text-[10px] text-amber-400/60 text-center">
                    Limited by vehicle&apos;s {result.isAc ? "onboard AC charger" : "max DC charge rate"} ({result.carLimit} kW)
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultBox({
  icon,
  label,
  value,
  sub,
  highlight,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  color?: "cyan";
}) {
  const isCyan = color === "cyan";
  const hlColor = isCyan ? "rgba(0,206,209,0.08)" : "rgba(0,230,118,0.08)";
  const hlBorder = isCyan ? "rgba(0,206,209,0.15)" : "rgba(0,230,118,0.15)";
  const hlText = isCyan ? "text-cyan-400" : "text-emerald-400";
  return (
    <div
      className="rounded-lg p-2.5"
      style={{
        backgroundColor: highlight ? hlColor : "rgba(255,255,255,0.03)",
        border: highlight
          ? `1px solid ${hlBorder}`
          : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex items-center gap-1 text-white/40 mb-0.5">
        {icon}
        <span className="text-[9px]">{label}</span>
      </div>
      <div
        className={`text-sm font-bold ${highlight ? hlText : "text-white/80"}`}
      >
        {value}
      </div>
      {sub && <div className="text-[9px] text-white/30 mt-0.5">{sub}</div>}
    </div>
  );
}
