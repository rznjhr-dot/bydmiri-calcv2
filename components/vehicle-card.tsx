"use client";

import { Calculator } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";
import { activeRebate } from "@/lib/vehicles";
import { calcCardMonthly, fmt } from "@/lib/finance";
import { Img } from "@/components/img";
import { useInView } from "@/lib/use-in-view";

interface Props {
  vehicle: Vehicle;
  isSelected: boolean;
  onSelect: (id: string) => void;
  index: number;
}

/* ── Model Image ──
   Render at a fixed panel ratio. Brochure pages are portrait, so the
   product photo is contained against the card surface rather than cropped.
*/
function ModelImage({ src, name }: { src: string; name: string }) {
  return (
    <div
      className="w-full overflow-hidden rounded-lg bg-[var(--cz-input)]"
      style={{ aspectRatio: "16 / 9" }}
    >
      <Img
        src={src}
        alt={name}
        className="h-full w-full object-contain"
        priority={false}
      />
    </div>
  );
}

/* ── Card ──
   One monthly figure, clearly qualified, plus the OTR price. Showing two
   unlabelled instalments per card asked buyers to decode the offer before
   they could compare models.
*/
export default function VehicleCard({
  vehicle,
  isSelected,
  onSelect,
  index,
}: Props) {
  const rebate = activeRebate(vehicle);
  const monthly = calcCardMonthly(vehicle.otr, rebate);
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
      style={{ transitionDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <div
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`${vehicle.name}, from RM${fmt(monthly)} per month with 10% down. Open instalment calculator.`}
        className={`parking-spot ${isSelected ? "selected" : ""}`}
      >
        <ModelImage src={vehicle.image} name={vehicle.name} />

        <div className="spot-banner mt-2.5 flex w-full min-w-0 items-center justify-between gap-2 rounded-lg px-2.5 py-2.5 sm:px-3">
          <div className="min-w-0 flex-1">
            <div className="font-conthrax text-[12px] leading-tight text-theme-70 sm:text-[13px]">
              {vehicle.name}
            </div>

            <div className="mt-1 flex items-baseline gap-1">
              <span
                className="font-data font-semibold leading-none tracking-tight text-accent"
                style={{ fontSize: "clamp(14px, 3.8vw, 17px)" }}
              >
                RM{fmt(monthly)}
              </span>
              <span className="text-[11px] font-medium text-theme-50">/mo</span>
            </div>

            <div className="mt-1 text-[11px] leading-tight text-theme-50 sm:text-[12px]">
              10% down · 9 years
            </div>
            <div className="mt-0.5 text-[11px] leading-tight text-theme-50 sm:text-[12px]">
              RM{fmt(vehicle.otr)} OTR
            </div>
          </div>

          <div className="spot-icon flex h-9 w-9 shrink-0 items-center justify-center gap-1 rounded-lg sm:w-auto sm:px-2.5">
            <Calculator size={14} className="text-accent" aria-hidden />
            <span className="hidden text-[11px] font-semibold text-accent lg:inline">
              Calculate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
