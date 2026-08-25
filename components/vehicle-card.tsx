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

/* ── Model Image ──
   Render at a fixed panel ratio. Brochure pages are portrait (1241×1754 ≈ 0.71),
   so we use object-cover center-crop and letterbox the overflow. Selected car
   gets a cyan ring; hover lifts the card.
*/
function ModelImage({ src, name }: { src: string; name: string }) {
  return (
    <div
      className="w-full rounded-lg overflow-hidden bg-[var(--cz-input)]"
      style={{ aspectRatio: "16 / 9" }}
    >
      <Img
        src={src}
        alt={name}
        className="w-full h-full object-contain"
        priority
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
        {/* Model Image — uses /images/models/{car_id}.jpg */}
        <ModelImage src={vehicle.image} name={vehicle.name} />

        {/* Bottom banner: name, price, calculator */}
        <div className="spot-banner w-full mt-2.5 px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-lg flex items-center justify-between gap-1.5 sm:gap-2 cursor-pointer min-w-0">
          <div className="min-w-0">
            <div className="font-conthrax text-[11px] text-theme-50 truncate leading-tight">
              {vehicle.name}
            </div>
            <div className="font-data font-semibold tracking-tight leading-tight"
                 style={{ fontSize: "clamp(10px, 3.2vw, 14px)" }}>
              <span className="text-accent">RM{fmt(monthly)}</span>
              <span className="text-theme-30 mx-0.5">/</span>
              <span className="text-counter">RM{fmt(monthlyFull)}</span>
              <span className="font-medium text-theme-40 ml-0.5" style={{ fontSize: "clamp(8px, 2.4vw, 10px)" }}>/mo</span>
            </div>
            <div className="text-[10px] text-theme-30 leading-tight -mt-0.5 whitespace-nowrap">
              10% · 0% down
            </div>
          </div>
          <div className="spot-icon shrink-0 flex items-center justify-center w-5 h-5 sm:w-9 sm:h-9 rounded-md sm:rounded-lg">
            <Calculator size={12} className="text-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
