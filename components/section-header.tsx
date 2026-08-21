import type { ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  label: string;
  title: ReactNode;
  subtitle?: string;
  size?: "md" | "lg";
  /** Defaults to center; use "start" to bias the section left —
      breaks the center-everything pattern on data-heavy sections. */
  align?: "center" | "start";
  className?: string;
}

/* Direction 01 · Minimal — the mono label with line prefix carries the
   section identity; the heading is Geist 600. Icons are optional and
   inline (accent-tinted), never above the heading. Vertical stack only. */
export default function SectionHeader({
  icon,
  label,
  title,
  subtitle,
  size = "md",
  align = "center",
  className,
}: Props) {
  const isStart = align === "start";

  return (
    <div
      className={`${isStart ? "text-left" : "text-center mx-auto"} ${className ?? "mb-8"} max-w-2xl`}
    >
      <span className={`label-mono mb-4 ${isStart ? "" : "justify-center"}`}>
        {icon && (
          <span className="shrink-0 flex items-center -ml-1" style={{ color: "var(--cz-accent)" }}>
            {icon}
          </span>
        )}
        {label}
      </span>
      <h2
        className={`font-display text-theme-90 ${
          size === "lg" ? "text-[32px] md:text-[44px]" : "text-[28px] md:text-4xl"
        } ${subtitle ? "mb-3" : "mb-0"}`}
        style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-sm md:text-base text-theme-50 max-w-[55ch] leading-relaxed ${isStart ? "" : "mx-auto"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
