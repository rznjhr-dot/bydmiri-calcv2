"use client";

interface ResultBoxProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  color?: "cyan";
}

const STYLES = {
  cyan: {
    bg: "rgba(0,206,209,0.08)",
    border: "rgba(0,206,209,0.15)",
    text: "text-cyan-400",
  },
  emerald: {
    bg: "rgba(0,230,118,0.08)",
    border: "rgba(0,230,118,0.15)",
    text: "text-emerald-400",
  },
} as const;

export function ResultBox({ icon, label, value, sub, highlight, color }: ResultBoxProps) {
  const s = color === "cyan" ? STYLES.cyan : STYLES.emerald;
  return (
    <div
      className="rounded-lg p-2.5"
      style={{
        backgroundColor: highlight ? s.bg : "rgba(255,255,255,0.03)",
        border: highlight ? `1px solid ${s.border}` : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex items-center gap-1 text-white/40 mb-0.5">
        {icon}
        <span className="text-[10px]">{label}</span>
      </div>
      <div className={`text-sm font-bold ${highlight ? s.text : "text-white/80"}`}>
        {value}
      </div>
      {sub && <div className="text-[10px] text-white/30 mt-0.5">{sub}</div>}
    </div>
  );
}
