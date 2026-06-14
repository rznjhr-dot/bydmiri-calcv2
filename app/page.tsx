"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Zap, Gauge, Battery, CircleDot, X, Info } from "lucide-react";
import Hero from "@/components/hero";
import VehicleCard from "@/components/vehicle-card";
import Calculator from "@/components/calculator";
import { vehicles } from "@/lib/vehicles";

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const handleClose = useCallback(() => setSelectedId(null), []);

  const selectedVehicle = selectedId
    ? vehicles.find((v) => v.id === selectedId)
    : null;

  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-theme backdrop-blur-xl border-b border-theme">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <a href="#" className="flex items-center gap-1.5 text-sm text-white">
            <img src="/byd-logo-white.svg" alt="BYD" className="h-5 w-auto" />
            <span className="font-[family-name:var(--font-orbitron)] font-bold text-lg tracking-[0.12em] ml-2">| MIRI</span>
          </a>
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/601131933930"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:shadow-[0_0_30px_rgba(0,230,118,0.3)] transition-all"
            >
              <Phone size={11} />
              Contact Sales
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <Hero />

      {/* Vehicle Section — Parking Lot Style */}
      <section
        id="vehicles"
        className="relative px-6 pt-16 md:pt-24 pb-0"
        style={{ backgroundColor: "#080808" }}
      >
        <div className="absolute inset-0 parking-lot-bg opacity-30" />
        <div className="absolute inset-0 parking-stripes" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#080808] to-transparent" />

        <div className="max-w-6xl mx-auto relative">
          {/* Section header */}
          <div className="text-center mb-8">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4 border border-emerald-500/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-breathe" />
              Find Your Match
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-theme-90 mb-0"
            >
              Choose Your BYD
            </motion.h2>
          </div>

          {/* Parking Lot Grid */}
          <div className="flex flex-wrap justify-center -mx-1">
            {vehicles.map((v, i) => (
              <div key={v.id} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-1 mb-5">
                <VehicleCard
                  vehicle={v}
                  isSelected={selectedId === v.id}
                  onSelect={handleSelect}
                  index={i}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-theme bg-theme-section py-10 px-6 text-center text-sm text-theme-40">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Disclaimer */}
          <div className="max-w-2xl mx-auto text-[11px] leading-relaxed text-theme-40 space-y-2">
            <p className="flex items-center justify-center gap-1.5 font-semibold text-theme-50">
              <Info size={13} className="shrink-0" />
              Monthly instalment estimates shown are for preliminary reference only.
            </p>
            <p>
              The calculation takes into account: downpayment you entered, current
              rebate offered, financing tenure period, and estimated current interest
              rate of 2.2% per annum.
            </p>
            <p>
              Actual instalment and financing approval are subject to bank assessment,
              CCRIS/CTOS records, current financial commitments, and applicable
              financing rates at the time of application.
            </p>
            <p>
              For a more accurate assessment based on your financial profile, please
              contact Ridzuan BYD Miri.
            </p>
          </div>

          <div className="space-y-1 pt-2 border-t border-theme/20">
            <p>&copy; 2026 Ridzuan Jahari. All rights reserved.</p>
            <p>BYD Miri · Lot 1829, Jalan Krokop Utama, 98000 Miri, Sarawak</p>
          </div>
        </div>
      </footer>

      {/* ── Calculator Modal ── */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-5 md:p-6"
              style={{
                backgroundColor: "var(--cz-bg-alt)",
                border: "1px solid rgba(0,230,118,0.2)",
                boxShadow: "0 0 80px rgba(0,230,118,0.1)",
              }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 p-1.5 rounded-lg text-theme-50 hover:text-theme-90 hover:bg-white/5 transition-colors z-10"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="mb-3 text-center">
                <h3 className="text-lg font-[family-name:var(--font-orbitron)] font-bold text-theme-90">
                  {selectedVehicle.name}
                </h3>
                <p className="text-xs text-theme-50 mt-0.5">
                  {selectedVehicle.category}
                </p>
                <a
                  href={selectedVehicle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-1 text-[10px] font-medium text-emerald-400/70 hover:text-emerald-400 transition-colors"
                >
                  Learn More
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>

              {/* Quick specs — 6 items, always balanced: 3+3 on mobile, 6 on md+ */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-x-1.5 gap-y-1.5 justify-items-center mb-3">
                <span className="specs-bar-item w-full justify-center">
                  <Gauge className="spec-icon" />
                  {selectedVehicle.range} km
                </span>
                <span className="specs-bar-item w-full justify-center">
                  <Battery className="spec-icon" />
                  {selectedVehicle.battery} kWh
                </span>
                <span className="specs-bar-item w-full justify-center">
                  <span className="spec-icon flex items-center justify-center text-[10px] font-bold">{selectedVehicle.seats}</span>
                  {selectedVehicle.seats}-Seater
                </span>
                <span className="specs-bar-item w-full justify-center">
                  <CircleDot className="spec-icon" />
                  {selectedVehicle.driveType}
                </span>
                <span className="specs-bar-item w-full justify-center">
                  <Zap className="spec-icon" />
                  {selectedVehicle.power} kW
                </span>
                <span className="specs-bar-item w-full justify-center">
                  <span className="spec-icon flex items-center justify-center text-[10px] font-bold">Nm</span>
                  {selectedVehicle.torque} Nm
                </span>
              </div>

              {/* Loan Calculator heading */}
              <h3
                className="text-xl font-[family-name:var(--font-orbitron)] font-bold text-center text-theme-90 mb-3 tracking-wide"
                style={{ letterSpacing: "0.05em" }}
              >
                Loan Calculator
              </h3>

              {/* Calculator */}
              <Calculator vehicle={selectedVehicle} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
