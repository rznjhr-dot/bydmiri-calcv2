import type { ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  label: string;
  title: ReactNode;
  subtitle?: string;
  size?: "md" | "lg";
  className?: string;
}

/* Unifies the badge + heading + subtitle pattern used by every landing page
   section, so spacing and typography stay consistent site-wide. */
export default function SectionHeader({
  icon,
  label,
  title,
  subtitle,
  size = "md",
  className,
}: Props) {
  return (
    <div className={`text-center ${className ?? "mb-8"}`}>
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-3 border border-emerald-500/15 uppercase tracking-wide">
        {icon && <span className="shrink-0 flex items-center">{icon}</span>}
        {label}
      </span>
      <h2
        className={`font-[family-name:var(--font-syne)] font-bold text-theme-90 ${
          size === "lg" ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
        } ${subtitle ? "mb-2" : "mb-0"}`}
      >
        {title}
      </h2>
      {subtitle && <p className="text-xs md:text-sm text-theme-50">{subtitle}</p>}
    </div>
  );
}
