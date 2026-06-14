"use client";

import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";
import { getPriceAfterRebate } from "@/lib/vehicles";
import { fmt } from "@/lib/finance";

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
      <img
        src={src}
        alt={name}
        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
        loading="lazy"
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
  const priceAfter = getPriceAfterRebate(vehicle);

  const handleClick = () => onSelect(vehicle.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex flex-col items-center w-full"
    >
      <div
        onClick={handleClick}
        className={`parking-spot ${isSelected ? "selected" : ""}`}
      >
        {/* Model Image */}
        <ModelImage src={vehicle.image} name={vehicle.name} />

        {/* Bottom banner: name, price, calculator */}
        <div className="w-full mt-2.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-between gap-2 transition-all duration-200 hover:bg-white/[0.07] hover:border-emerald-500/20">
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-theme-90 truncate leading-tight">
              {vehicle.name}
            </div>
            <div className="text-[11px] font-bold text-emerald-400">
              FROM RM{fmt(priceAfter)}
            </div>
          </div>
          <div className="shrink-0 flex flex-col items-center gap-0">
            <Calculator size={14} className="text-emerald-400" />
            <span className="text-[9px] font-semibold text-emerald-400/60 leading-none">Calculate</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
