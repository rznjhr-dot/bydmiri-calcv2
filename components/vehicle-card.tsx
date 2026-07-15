"use client";

import { Calculator } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";
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
    <div className="w-full rounded-lg overflow-hidden bg-black/30" style={{ aspectRatio: "2572/1200" }}>
      <Img
        src={src}
        alt={name}
        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
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
  const monthly = calcCardMonthly(vehicle.otr, vehicle.rebate);
  const monthlyFull = calcFullLoanMonthly(vehicle.otr, vehicle.rebate);
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
      className="flex flex-col items-center w-full"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.4s ease-out, transform 0.4s ease-out`,
        transitionDelay: `${index * 0.05}s`,
      }}
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
        <div className="w-full mt-2.5 px-3 py-2.5 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/10 flex items-center justify-between gap-2 transition-all duration-200 hover:bg-emerald-500/[0.08] hover:border-emerald-500/25 group cursor-pointer">
          <div className="min-w-0">
            <div className="text-[10px] text-theme-50 truncate leading-tight">
              {vehicle.name}
            </div>
            <div className="text-[13px] font-bold tracking-tight">
              <span className="text-emerald-400">RM{fmt(monthly)}</span><span className="text-[10px] text-emerald-400/50">/</span><span className="text-amber-400">RM{fmt(monthlyFull)}</span>
            </div>
            <div className="text-[9px] text-white/20 leading-tight -mt-0.5">10% · 0% down</div>
          </div>
          <div className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/25 group-hover:bg-emerald-500/25 group-hover:border-emerald-500/40 transition-all">
            <Calculator size={13} className="text-emerald-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
