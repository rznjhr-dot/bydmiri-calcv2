"use client";

import { ShieldCheck, Battery, Gauge, Settings, Lightbulb } from "lucide-react";

type TierColor = "emerald" | "cyan" | "violet" | "amber" | "pink";

const WARRANTY_TIERS: {
  icon: React.ReactNode;
  title: string;
  years: string;
  km: string;
  items: string[];
  color: TierColor;
}[] = [
  {
    icon: <ShieldCheck size={14} />,
    title: "Vehicle Warranty",
    years: "6 years",
    km: "150,000 km",
    items: ["Vehicle"],
    color: "emerald",
  },
  {
    icon: <Battery size={14} />,
    title: "High Voltage Blade Battery",
    years: "8 years",
    km: "160,000 km",
    items: ["High Voltage Blade Battery"],
    color: "cyan",
  },
  {
    icon: <Gauge size={14} />,
    title: "Drive Unit",
    years: "8 years",
    km: "150,000 km",
    items: [
      "Motor",
      "Motor Controller",
      "DC Assembly",
      "High Voltage",
      "Electric Control Assembly",
    ],
    color: "violet",
  },
  {
    icon: <Settings size={14} />,
    title: "Selected Parts",
    years: "3 years",
    km: "60,000 km",
    items: [
      "Multimedia System",
      "Shock Absorber",
      "Dust Cover",
      "Bushing / Gasket",
      "Wheel Bearing",
      "PM2.5 Measuring Instrument",
      "AC/DC Charging Port Assembly",
      "USB Charging Port Connector",
    ],
    color: "amber",
  },
  {
    icon: <Lightbulb size={14} />,
    title: "Lighting & Suspension",
    years: "4 years",
    km: "100,000 km",
    items: [
      "Whole Vehicle Lights",
      "TPMS Module",
      "Suspension",
      "Ball Joint",
    ],
    color: "pink",
  },
];

const COLOR_MAP: Record<TierColor, {
  border: string;
  bg: string;
  text: string;
  badge: string;
}> = {
  emerald: {
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/[0.04]",
    text: "text-emerald-400",
    badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
  cyan: {
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/[0.04]",
    text: "text-cyan-400",
    badge: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
  },
  violet: {
    border: "border-violet-500/20",
    bg: "bg-violet-500/[0.04]",
    text: "text-violet-400",
    badge: "bg-violet-500/10 border-violet-500/20 text-violet-400",
  },
  amber: {
    border: "border-amber-500/20",
    bg: "bg-amber-500/[0.04]",
    text: "text-amber-400",
    badge: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  },
  pink: {
    border: "border-pink-500/20",
    bg: "bg-pink-500/[0.04]",
    text: "text-pink-400",
    badge: "bg-pink-500/10 border-pink-500/20 text-pink-400",
  },
} as const;

export default function WarrantyDetails() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-wrap justify-center gap-3">
        {WARRANTY_TIERS.map((tier) => {
          const c = COLOR_MAP[tier.color];
          return (
            <div
              key={tier.title}
              className={`rounded-xl border ${c.border} ${c.bg} p-4 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-0.75rem)]`}
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-2.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${c.badge}`}
                >
                  {tier.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white/80">
                    {tier.title}
                  </h4>
                </div>
              </div>

              {/* Duration badges */}
              <div className="flex gap-2 mb-2.5">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${c.badge}`}
                >
                  {tier.years}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${c.badge}`}
                >
                  {tier.km}
                </span>
              </div>

              {/* Covered items */}
              <ul className="space-y-0.5">
                {tier.items.map((item) => (
                  <li
                    key={item}
                    className="text-[11px] text-white/50 flex items-start gap-1.5"
                  >
                    <span className={`${c.text} mt-0.5`}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-white/30 text-center mt-3">
        * All warranty periods are &ldquo;whichever comes first&rdquo; —
        either the year limit or the kilometre limit, whichever is reached first.
      </p>
    </div>
  );
}
