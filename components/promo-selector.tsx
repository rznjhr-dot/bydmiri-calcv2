"use client";

import { Check } from "lucide-react";
import type { PromotionOption } from "@/lib/vehicles";

interface PromoSelectorProps {
  options: PromotionOption[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  /** "md" = calculator (full titles), "xs" = cards/tables (compact labels) */
  size?: "md" | "xs";
  className?: string;
}

function shortLabel(title: string): string {
  return title
    .replace("Cash Rebate + FREE 6 Years Standard Service Package", "+ 6-Yr Service")
    .replace("Cash Rebate", "Rebate");
}

export default function PromoSelector({
  options,
  selectedIndex,
  onSelect,
  size = "md",
  className = "",
}: PromoSelectorProps) {
  if (options.length === 0) return null;

  const isXs = size === "xs";

  return (
    <div
      role="group"
      aria-label="Promotion option"
      className={`grid gap-1.5 ${options.length > 2 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"} ${className}`}
    >
      {options.map((opt, i) => {
        const selected = i === selectedIndex;
        return (
          <button
            key={opt.title}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(i);
            }}
            aria-pressed={selected}
            className={
              isXs
                ? `flex items-center justify-center gap-1 px-1.5 py-1 rounded-md border text-[8px] leading-tight font-semibold text-center transition-colors cursor-pointer ${
                    selected
                      ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                      : "border-white/[0.08] text-white/50 hover:border-emerald-500/25 hover:text-white/70"
                  }`
                : `flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                    selected
                      ? "border-emerald-500/50 bg-emerald-500/[0.12] text-emerald-300"
                      : "border-white/[0.08] text-white/50 hover:border-emerald-500/25 hover:text-white/70"
                  }`
            }
          >
            <span
              className={`shrink-0 flex items-center justify-center rounded ${
                isXs ? "w-2.5 h-2.5" : "w-4 h-4"
              } ${selected ? "bg-emerald-500" : "bg-white/15"}`}
            >
              {selected && <Check size={isXs ? 8 : 10} className="text-white" />}
            </span>
            <span>{isXs ? shortLabel(opt.title) : opt.title}</span>
          </button>
        );
      })}
    </div>
  );
}
