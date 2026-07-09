"use client";

import { ArrowDown, Zap, Cpu, CircuitBoard, Radio } from "lucide-react";
import Link from "next/link";
import { Img } from "@/components/img";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background based on theme */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, var(--cz-hero-from), var(--cz-hero-via), var(--cz-hero-to))",
        }}
      />

      {/* Neon ambient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500 rounded-full opacity-[0.08] blur-[150px] animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500 rounded-full opacity-[0.06] blur-[120px] animate-blob" style={{ animationDelay: "5s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-emerald-400 rounded-full opacity-[0.05] blur-[100px] animate-blob" style={{ animationDelay: "10s" }} />
      </div>

      {/* Circuit grid */}
      <div className="absolute inset-0 circuit-grid opacity-70" />

      {/* Larger tech grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "160px 160px",
        }}
      />

      {/* Floating tech icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div
          className="absolute top-24 left-[12%] animate-float"
          style={{ animationDuration: "7s", animationDelay: "0s" }}
        >
          <Cpu className="text-emerald-400/20 w-10 h-10" />
        </div>
        <div
          className="absolute top-32 right-[18%] animate-float"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        >
          <Zap className="text-blue-400/20 w-9 h-9" />
        </div>
        <div
          className="absolute bottom-40 left-[20%] animate-float"
          style={{ animationDuration: "8s", animationDelay: "2s" }}
        >
          <Radio className="text-emerald-400/15 w-12 h-12" />
        </div>
        <div
          className="absolute bottom-48 right-[12%] animate-float"
          style={{ animationDuration: "5.5s", animationDelay: "3s" }}
        >
          <CircuitBoard className="text-blue-400/15 w-10 h-10" />
        </div>
      </div>

      {/* ── Main Content + Bottom Section (centered as one block) ── */}
      <div className="flex-1 flex flex-col justify-center pt-14 md:pt-0">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

          {/* Badge */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: "0.05s" }}
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.04] text-white/60 text-[10px] font-semibold tracking-[0.15em] uppercase mb-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.03)] backdrop-blur-sm">
              The World&apos;s Leading NEV Manufacturer
            </div>
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up font-[family-name:var(--font-syne)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="text-white/90">Your Dream BYD.</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 text-gradient">
              Your Monthly Payment.
            </span>
            <br />
            <span className="text-white/90">In Seconds.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-up text-base md:text-lg text-white/50 max-w-xl mx-auto mb-8 leading-relaxed"
            style={{ animationDelay: "0.3s" }}
          >
            No registration. No paperwork. Simply pick your model, choose your deposit,
            and instantly see your monthly estimate — all in one place.
          </p>

          {/* Browse Models CTA */}
          <div
            className="animate-fade-up flex flex-col items-center gap-3"
            style={{ animationDelay: "0.45s" }}
          >
            <Link
              href="/why-byd"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] text-white/50 text-[11px] font-medium hover:bg-white/[0.04] hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
            >
              <svg className="w-[10px] h-[10px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Why BYD?
            </Link>
            <div className="group relative inline-flex">
            {/* Outer glow ring */}
            <div className="absolute inset-[-6px] rounded-full bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <a
              href="#full-lineup"
              className="relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-9 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-[0_0_60px_rgba(52,211,153,0.5)] hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Browse Models
                <ArrowDown size={18} className="transition-transform duration-300 group-hover:translate-y-1" />
              </span>
            </a>
            </div>
          </div>

          {/* Stats */}
          <div
            className="animate-fade-up mt-10 mb-2"
            style={{ animationDelay: "0.6s" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/20 text-center">
              BYD Miri by Ridzuan Jahari
            </p>
          </div>
          <div
            className="animate-fade-up grid grid-cols-4 gap-1 md:gap-8 max-w-xl md:max-w-2xl mx-auto"
            style={{ animationDelay: "0.7s" }}
          >
            {[
              { value: "9", label: "Models" },
              { value: "Fully Electric", label: "EV Lineup" },
              { value: "Up to 650km", label: "Max Range" },
              { value: "0%", label: "Deposit Option" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[9px] sm:text-xs md:text-xl font-semibold text-white/40 leading-tight">
                  {stat.value}
                </div>
                <div className="text-[8px] sm:text-[10px] md:text-xs text-white/20 mt-0.5 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Thin divider */}
          <div className="w-16 h-[1px] mx-auto mt-10 mb-5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Ridzuan Info Card — centered column */}
          <div
            className="animate-fade-up flex flex-col items-center gap-3"
            style={{ animationDelay: "1.0s" }}
          >
            {/* Avatar */}
            <Img
              src="/ridzuan.jpg"
              alt="Ridzuan Jahari"
              className="w-20 h-20 rounded-full object-cover ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/20"
              loading="eager"
              fetchPriority="high"
            />

            {/* Details */}
            <div className="text-center">
              <div className="text-white/70 font-semibold text-sm">Ridzuan Jahari</div>
              <div className="text-xs text-white/40">Sales Consultant</div>
              <div className="text-xs text-white/40">BYD Kah Progression Auto, Miri</div>
              <a
                href="https://wa.me/601131933930"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-1 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                011 3193 3930
              </a>
              {/* Social Links */}
              <div className="flex items-center justify-center gap-3 mt-1.5">
                <a
                  href="https://www.tiktok.com/@ridzuanbydmiri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-pink-400/70 hover:text-pink-300 transition-colors"
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
                  className="inline-flex items-center gap-1 text-[11px] text-blue-400/70 hover:text-blue-300 transition-colors"
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

      {/* Scroll indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-0.5 text-white/15 text-[10px] animate-float"
             style={{ animationDuration: "1.8s" }}>
          <span>Scroll</span>
          <ArrowDown size={14} />
        </div>
      </div>
    </section>
  );
}
