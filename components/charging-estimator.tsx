"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { Zap, Battery, Clock, DollarSign, Cable, Car } from "lucide-react";
import { vehicles } from "@/lib/vehicles";

const CHARGERS = [
  { kw: 3, label: "3 kW", type: "3-Pin Plug" },
  { kw: 7, label: "7 kW", type: "Wallbox" },
  { kw: 22, label: "22 kW", type: "AC Public" },
  { kw: 60, label: "60 kW", type: "DC Fast" },
  { kw: 180, label: "180 kW", type: "DC Ultra-fast" },
];

const AC_LIMIT_KW_DEFAULT = 7; // Fallback if model has no specific OBC data
const RATE_PER_KWH = 0.30;

function formatDuration(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h >= 1) return `${h}h ${m}m`;
  return `${m} min`;
}

export default function ChargingEstimator() {
  const [selectedId, setSelectedId] = useState(vehicles[0]!.id);
  const [chargerKw, setChargerKw] = useState(7);
  const [fromPct, setFromPct] = useState(20);
  const [toPct, setToPct] = useState(80);

  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<"from" | "to" | null>(null);

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
    () => vehicles.find((v) => v.id === selectedId)!,
    [selectedId]
  );

  const selectedCharger = CHARGERS.find((c) => c.kw === chargerKw)!;

  const result = useMemo(() => {
    if (!vehicle) return null;
    const isDc = selectedCharger.type.includes("DC");
    const carLimit = isDc ? vehicle.maxChargeKw : (vehicle.acLimitKw ?? AC_LIMIT_KW_DEFAULT);
    const effectivePower = Math.min(chargerKw, carLimit);
    const energyNeeded = vehicle.battery * ((toPct - fromPct) / 100);
    const hours = effectivePower > 0 ? energyNeeded / effectivePower : 0;
    const cost = energyNeeded * RATE_PER_KWH;
    const kmRecouped = Math.round(((toPct - fromPct) / 100) * vehicle.range);
    return { energyNeeded, effectivePower, carLimit, isDc, hours, cost, kmRecouped };
  }, [vehicle, chargerKw, fromPct, toPct, selectedCharger]);

  return (
    <div
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6"
    >
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
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} — {v.battery} kWh
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
            <div className="grid grid-cols-4 gap-1.5">
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
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-semibold text-emerald-400 whitespace-nowrap pointer-events-none">
                    {fromPct}%
                  </div>
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
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-semibold text-emerald-400 whitespace-nowrap pointer-events-none">
                    {toPct}%
                  </div>
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
            {result && (
              <div className="space-y-3">
                {/* Metric cards */}
                <div className="grid grid-cols-2 gap-2">
                  <ResultBox
                    icon={<Battery size={13} />}
                    label="Battery"
                    value={`${vehicle.battery} kWh`}
                  />
                  <ResultBox
                    icon={<Cable size={13} />}
                    label="Charger"
                    value={`${chargerKw} kW ${selectedCharger.type}`}
                  />
                  <ResultBox
                    icon={<Car size={13} />}
                    label="Car Limit"
                    value={`${result.carLimit} kW ${result.isDc ? "DC" : "AC"}`}
                  />
                  <ResultBox
                    icon={<Zap size={13} />}
                    label="Effective Power"
                    value={`${result.effectivePower} kW`}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <ResultBox
                    icon={<DollarSign size={13} />}
                    label="Est. Cost"
                    value={`~RM${result.cost.toFixed(2)}`}
                    sub={`@ RM${RATE_PER_KWH}/kWh`}
                    color="cyan"
                    highlight
                  />
                  <ResultBox
                    icon={<Clock size={13} />}
                    label="Charging Time"
                    value={`~${formatDuration(result.hours)}`}
                    sub={`${fromPct}% → ${toPct}% · ${result.energyNeeded.toFixed(1)} kWh`}
                    highlight
                  />
                  <ResultBox
                    icon={<Car size={13} />}
                    label="KM Recouped"
                    value={`~${result.kmRecouped} km`}
                    sub={`${vehicle.range} km full range`}
                    highlight
                  />
                </div>

                {result.effectivePower < chargerKw && (
                  <p className="text-[10px] text-amber-400/60 text-center">
                    Limited by vehicle&apos;s {result.isDc ? "max DC charge rate" : "onboard AC charger"} ({result.carLimit} kW)
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
