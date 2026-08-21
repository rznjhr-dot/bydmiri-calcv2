"use client";

import { ShieldCheck, Battery, Gauge, Settings, Lightbulb } from "lucide-react";

/* One accent across all tiers — differentiation through hierarchy and
   the icon, not through a rainbow of hues. */

const WARRANTY_TIERS: {
  icon: React.ReactNode;
  title: string;
  years: string;
  km: string;
  items: string[];
}[] = [
  {
    icon: <ShieldCheck size={14} />,
    title: "Vehicle Warranty",
    years: "6 years",
    km: "150,000 km",
    items: ["Vehicle"],
  },
  {
    icon: <Battery size={14} />,
    title: "High Voltage Blade Battery",
    years: "8 years",
    km: "160,000 km",
    items: ["High Voltage Blade Battery"],
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
  },
];

export default function WarrantyDetails() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {WARRANTY_TIERS.map((tier) => (
          <div
            key={tier.title}
            className="rounded-xl p-4 border"
            style={{
              borderColor: "var(--cz-border)",
              backgroundColor: "var(--cz-bg-card)",
            }}
          >
            {/* Header — icon inline with title, accent square beside */}
            <div className="flex items-center gap-2 mb-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: "var(--cz-accent-soft)",
                  border: "1px solid var(--cz-accent-line)",
                  color: "var(--cz-accent)",
                }}
              >
                {tier.icon}
              </div>
              <h4 className="text-sm font-bold text-theme-90">
                {tier.title}
              </h4>
            </div>

            {/* Duration badges — mono data font, quiet */}
            <div className="flex gap-2 mb-2.5">
              <span
                className="font-data inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium"
                style={{
                  backgroundColor: "var(--cz-accent-soft)",
                  border: "1px solid var(--cz-accent-line)",
                  color: "var(--cz-accent)",
                }}
              >
                {tier.years}
              </span>
              <span
                className="font-data inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium"
                style={{
                  backgroundColor: "var(--cz-bg-alt)",
                  border: "1px solid var(--cz-border)",
                  color: "var(--cz-text-50)",
                }}
              >
                {tier.km}
              </span>
            </div>

            {/* Covered items */}
            <ul className="space-y-0.5">
              {tier.items.map((item) => (
                <li
                  key={item}
                  className="text-[11px] text-theme-50 flex items-start gap-1.5"
                >
                  <span className="text-accent mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-theme-40 text-center mt-3">
        * All warranty periods are &ldquo;whichever comes first&rdquo; —
        either the year limit or the kilometre limit, whichever is reached first.
      </p>
    </div>
  );
}
