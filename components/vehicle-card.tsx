"use client";

import { Calculator } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";
import { activeRebate } from "@/lib/vehicles";
import { calcCardMonthly, calcFullLoanMonthly, fmt } from "@/lib/finance";
import { Img } from "@/components/img";
import { useInView } from "@/lib/use-in-view";

interface Props {
  vehicle: Vehicle;
  isSelected: boolean;
  onSelect: (id: string) => void;
  index: number;
}

/* ── Model Image ── */
function ModelImage({ src, name }: { src: string; name: string }) {
  return (
    <div
      className="w-full rounded-lg overflow-hidden"
      style={{ aspectRatio: "2572/1200", backgroundColor: "var(--cz-input)" }}
    >
      <Img
        src={src}
        alt={name}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

/* ── Card ── */
export default function VehicleCard({
  vehicle,
  isSelected,
  onSelect,
  index,
}: Props) {
  const rebate = activeRebate(vehicle);
  const monthly = calcCardMonthly(vehicle.otr, rebate);
  const monthlyFull = calcFullLoanMonthly(vehicle.otr, rebate);
  const { ref, inView } = useInView<HTMLDivElement>();

  const handleClick = () => onSelect(vehicle.id);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""}`}
      style={{ transitionDelay: `${Math.min(index, 8) * 50}ms` }}
    >
      <div
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        className={`parking-spot ${isSelected ? "selected" : ""}`}
      >
        {/* Model Image */}
        <ModelImage src={vehicle.image} name={vehicle.name} />

        {/* Bottom banner: name, price, calculator */}
        <div
          className="spot-banner w-full mt-2.5 px-3 py-2.5 rounded-lg flex items-center justify-between gap-2 cursor-pointer min-w-0"
        >
          <div className="min-w-0">
            <div className="text-[11px] text-theme-50 truncate leading-tight">
              {vehicle.name}
            </div>
            {/* Figures never wrap — the name truncates instead */}
            <div className="font-data text-[13px] sm:text-sm font-semibold tracking-tight whitespace-nowrap">
              <span className="text-accent">RM{fmt(monthly)}</span><span className="text-theme-30">/</span><span className="text-counter">RM{fmt(monthlyFull)}</span><span className="text-[10px] text-theme-40 font-medium">/mo</span>
            </div>
            <div className="text-[10px] text-theme-30 leading-tight -mt-0.5 whitespace-nowrap">10% · 0% down</div>
          </div>
          <div className="spot-icon shrink-0 flex items-center justify-center w-9 h-9 rounded-lg">
            <Calculator size={16} className="text-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
