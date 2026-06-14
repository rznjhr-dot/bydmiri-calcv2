"use client";

import { motion } from "framer-motion";
import { ArrowDown, Zap, Cpu, CircuitBoard, Radio } from "lucide-react";

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
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500 rounded-full opacity-[0.06] blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-emerald-400 rounded-full opacity-[0.05] blur-[100px] animate-blob animation-delay-4000" />
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-[12%]"
        >
          <Cpu className="text-emerald-400/20 w-10 h-10" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-32 right-[18%]"
        >
          <Zap className="text-blue-400/20 w-9 h-9" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-40 left-[20%]"
        >
          <Radio className="text-emerald-400/15 w-12 h-12" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-48 right-[12%]"
        >
          <CircuitBoard className="text-blue-400/15 w-10 h-10" />
        </motion.div>
      </div>

      {/* ── Main Content + Bottom Section (centered as one block) ── */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400/80 text-[11px] font-medium mb-5 border border-emerald-500/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-breathe" />
            The World&apos;s Leading NEV Manufacturer
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-[family-name:var(--font-orbitron)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-white/90">Your Dream BYD.</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 text-gradient">
              Your Monthly Payment.
            </span>
            <br />
            <span className="text-white/90">In Seconds.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-lg text-white/50 max-w-xl mx-auto mb-8 leading-relaxed"
          >
            No registration. No paperwork. Simply pick your model, choose your deposit,
            and instantly see your monthly estimate — all in one place.
          </motion.p>

          {/* Browse Models CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <a
              href="#vehicles"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-9 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,230,118,0.4)] hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Browse Models
                <ArrowDown size={18} />
              </span>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex justify-center gap-8 md:gap-16"
          >
            {[
              { value: "9", label: "Models" },
              { value: "Up to 650km", label: "Max Range" },
              { value: "0%", label: "Deposit Option" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl md:text-2xl font-semibold text-white/40">
                  {stat.value}
                </div>
                <div className="text-xs text-white/20 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Thin divider */}
          <div className="w-16 h-[1px] mx-auto mt-10 mb-5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Enquire on WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex justify-center mb-4"
          >
            <a
              href="https://wa.me/601131933930"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-white/40 border border-white/10 hover:bg-white/5 hover:text-white/70 hover:border-white/20 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enquire on WhatsApp
            </a>
          </motion.div>

          {/* Ridzuan Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex items-start justify-center gap-3"
          >
            {/* Avatar */}
            <img
              src="/ridzuan.jpg"
              alt="Ridzuan Jahari"
              className="w-16 h-16 rounded-full object-cover shrink-0 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/20 mt-1"
            />

            {/* Details */}
            <div className="text-left text-white/40">
              <div className="text-white/70 font-semibold text-sm">Ridzuan Jahari</div>
              <div className="text-xs">Sales Consultant</div>
              <div className="text-xs">011-31933930</div>
              {/* Social Links */}
              <div className="flex flex-col items-start gap-0.5 mt-1.5">
                <a
                  href="https://www.tiktok.com/@ridzuanbydmiri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-white/30 hover:text-white/60 transition-colors"
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
                  className="inline-flex items-center gap-1 text-[11px] text-white/30 hover:text-white/60 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-0.5 text-white/15 text-[10px]"
        >
          <span>Scroll</span>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
