"use client";

interface ResultBoxProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  color?: "accent" | "counter";
}

export function ResultBox({ icon, label, value, sub, highlight, color }: ResultBoxProps) {
  const isCounter = color === "counter";
  return (
    <div
      className="rounded-lg p-2 sm:p-2.5"
      style={{
        backgroundColor: highlight
          ? isCounter
            ? "var(--cz-counter-soft)"
            : "var(--cz-accent-soft)"
          : "var(--cz-bg-alt)",
        border: highlight
          ? `1px solid ${isCounter ? "var(--cz-counter-line)" : "var(--cz-accent-line)"}`
          : "1px solid var(--cz-border)",
      }}
    >
      <div className="flex items-center gap-1 text-theme-40 mb-0.5">
        {icon}
        <span className="text-[10px]">{label}</span>
      </div>
      <div
        className={`font-data text-sm font-semibold ${highlight ? (isCounter ? "text-counter" : "text-accent") : "text-theme-80"}`}
      >
        {value}
      </div>
      {sub && <div className="text-[10px] text-theme-30 mt-0.5">{sub}</div>}
    </div>
  );
}
