"use client";

import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { Img } from "@/components/img";
import { vehicles } from "@/lib/vehicles";

const MAX_RANGE_KM = Math.max(...vehicles.map((v) => v.range));

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-theme">
      {/* Background — Direction 01 · Minimal: pure tinted paper.
          No orbs, no textures, no gradient. Negative space is the luxury. */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(165deg, var(--cz-hero-from) 0%, var(--cz-hero-to) 100%)",
        }}
      />

      {/* ── Content — mobile-first single column, desktop biased left ── */}
      <div className="flex-1 flex flex-col justify-center pt-16 md:pt-0">
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10">

          {/* Eyebrow — mono, line prefix, vertical stack (label above heading) */}
          <div className="animate-fade-up mb-6 md:mb-8">
            <p className="label-mono">Official Dealer · Miri, Sarawak</p>
          </div>

          {/* THE HEADLINE — Geist 300 against 600. Weight contrast IS the design. */}
          <h1
            className="font-display animate-fade-up text-[40px] sm:text-6xl md:text-7xl lg:text-[80px] mb-6 md:mb-8"
            style={{ animationDelay: "80ms" }}
          >
            Your dream BYD,
            <br />
            <strong>priced in seconds.</strong>
          </h1>

          {/* Standfirst — body measure, relaxed leading */}
          <p
            className="animate-fade-up text-base md:text-lg text-theme-50 max-w-[46ch] leading-relaxed mb-8 md:mb-10"
            style={{ animationDelay: "160ms" }}
          >
            No registration. No paperwork. Pick a model, choose your deposit,
            and see your monthly instalment — instantly.
          </p>

          {/* CTAs — mobile-first stacked, desktop inline; hairline geometry */}
          <div
            className="animate-fade-up flex flex-col sm:flex-row sm:items-center gap-3 mb-12 md:mb-20"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href="#full-lineup"
              className="hero-cta inline-flex items-center justify-center gap-2.5 bg-accent px-7 py-3.5 min-h-11 rounded-full text-sm font-medium"
              style={{ color: "var(--cz-accent-ink)", letterSpacing: "-0.005em" }}
            >
              Browse Models
              <ArrowDown size={16} strokeWidth={2} />
            </a>
            <Link
              href="/why-byd"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-11 rounded-full text-sm font-medium hover:border-[color:var(--cz-text-50)] transition-colors"
              style={{
                border: "1px solid var(--cz-border-strong)",
                color: "var(--cz-text-50)",
              }}
            >
              Why BYD?
            </Link>
          </div>

          {/* Stats — hairline grid, mono numerals. Mobile: 2×2, desktop: 4-up */}
          <div
            className="animate-fade-up border-t"
            style={{ animationDelay: "320ms", borderColor: "var(--cz-border)" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { value: String(vehicles.length), unit: "", label: "Models in lineup" },
                { value: String(MAX_RANGE_KM), unit: "km", label: "Maximum range" },
                { value: "0", unit: "%", label: "Deposit option" },
                { value: "2.30", unit: "%", label: "Indicative rate" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="py-5 md:py-6"
                  style={{
                    borderRight: i < 3 ? "1px solid var(--cz-border)" : undefined,
                    borderBottom: "1px solid var(--cz-border)",
                    paddingLeft: i === 0 ? 0 : undefined,
                  }}
                >
                  <div className="pr-4 md:pr-6">
                    <div className="font-data text-xl md:text-2xl font-medium text-theme-90 leading-none tracking-[-0.02em]">
                      {stat.value}
                      {stat.unit && (
                        <span className="text-[0.55em] text-accent ml-0.5">{stat.unit}</span>
                      )}
                    </div>
                    <div className="text-xs text-theme-40 mt-2 tracking-[0.01em]">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Thin rule before advisor block */}
          <div
            className="w-16 h-px mt-10 md:mt-12 mb-6 md:mb-7"
            style={{ backgroundColor: "var(--cz-border-strong)" }}
          />

          {/* Ridzuan — advisor row, mobile-first stacked then inline */}
          <div
            className="animate-fade-up flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 pb-14 md:pb-0"
            style={{ animationDelay: "400ms" }}
          >
            <Img
              src="/ridzuan.jpg"
              alt="Ridzuan Jahari"
              className="w-14 h-14 rounded-full object-cover shrink-0"
              style={{ outline: "1px solid var(--cz-accent-line)", outlineOffset: "3px" }}
              priority
            />

            <div className="min-w-0">
              <div className="text-theme-80 font-medium text-sm">Ridzuan Jahari</div>
              <div className="text-xs text-theme-40">
                Sales Advisor · BYD Kah Progression Auto, Miri
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                <a
                  href="https://wa.me/601131933930"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-11 py-2 text-sm font-medium text-accent hover:underline underline-offset-2 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  011 3193 3930
                </a>
                <a
                  href="https://www.tiktok.com/@ridzuanbydmiri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 min-h-9 py-2 text-xs text-theme-40 hover:text-theme-70 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.33 0 .64.05.93.15V8.5a6.3 6.3 0 0 0-.93-.07 6.35 6.35 0 0 0 0 12.69 6.35 6.35 0 0 0 6.35-6.35v-7.1a8.27 8.27 0 0 0 4.77 1.48v-3.4a4.83 4.83 0 0 1-1.13-.16z"/>
                  </svg>
                  TikTok
                </a>
                <a
                  href="https://web.facebook.com/ridzuanbydmiri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 min-h-9 py-2 text-xs text-theme-40 hover:text-theme-70 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — quiet mono, static */}
      <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-1" style={{ color: "var(--cz-text-30)" }}>
          <span className="text-[10px] tracking-[0.16em] uppercase">Scroll</span>
          <ArrowDown size={13} />
        </div>
      </div>
    </section>
  );
}
