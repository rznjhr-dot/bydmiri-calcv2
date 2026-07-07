"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

const GSHEET_WEBAPP_URL =
  process.env.NEXT_PUBLIC_GSHEET_URL ||
  "https://script.google.com/macros/s/AKfycbz0jdVsbUzuwK9ecuAvZJ9AWtuGsA5Gn32sBpxC0wzPURsi3WEDF3mXoNpBe9cQsqd0/exec";

interface Props {
  className?: string;
  defaultCar?: string;
}

export default function CheckEligibilityForm({ className = "", defaultCar = "" }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [targetCar, setTargetCar] = useState(defaultCar);
  const [salary, setSalary] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim() || !targetCar.trim() || !salary.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!GSHEET_WEBAPP_URL) {
      setError("Backend not connected. Please contact admin.");
      return;
    }

    setLoading(true);

    const qs =
      "?name=" + encodeURIComponent(name.trim()) +
      "&phone=" + encodeURIComponent(phone.trim()) +
      "&targetCar=" + encodeURIComponent(targetCar.trim()) +
      "&salary=" + encodeURIComponent(salary.trim()) +
      "&timestamp=" + encodeURIComponent(new Date().toISOString()) +
      "&source=" + encodeURIComponent("BYD Miri Website");

    const url = GSHEET_WEBAPP_URL + qs;

    // Open tiny popup offscreen and auto-close — user won't see it
    const popup = window.open("", "_blank", "width=1,height=1,left=-9999,top=-9999");
    if (popup) {
      popup.location.href = url;
      setTimeout(() => { try { popup.close(); } catch (_) {} }, 500);
    } else {
      // Fallback: navigator.sendBeacon
      navigator.sendBeacon(url);
    }

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-5 text-center ${className}`}
      >
        <CheckCircle2 size={28} className="text-emerald-400 mx-auto mb-2" />
        <p className="text-sm font-semibold text-emerald-300">Thank You!</p>
        <p className="text-xs text-white/50 mt-1">
          We will review your eligibility and contact you via WhatsApp within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <input
            type="text"
            placeholder="Full name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-emerald-500/40 transition-colors"
            required
          />
          <input
            type="tel"
            placeholder="Phone number *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-emerald-500/40 transition-colors"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <select
            value={targetCar}
            onChange={(e) => setTargetCar(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-emerald-500/40 transition-colors appearance-none"
            required
          >
            <option value="" disabled className="bg-[#080808] text-white/30">
              Target car *
            </option>
            <option value="Atto 2 Premium" className="bg-[#080808]">Atto 2 Premium</option>
            <option value="Seal 6 Premium" className="bg-[#080808]">Seal 6 Premium</option>
            <option value="Atto 3 Ultra" className="bg-[#080808]">Atto 3 Ultra</option>
            <option value="Atto 3 Premium" className="bg-[#080808]">Atto 3 Premium</option>
            <option value="Sealion 7 Premium" className="bg-[#080808]">Sealion 7 Premium</option>
            <option value="Sealion 7 Performance" className="bg-[#080808]">Sealion 7 Performance</option>
            <option value="Seal Premium" className="bg-[#080808]">Seal Premium</option>
            <option value="Seal Performance" className="bg-[#080808]">Seal Performance</option>
            <option value="M6 Extended" className="bg-[#080808]">M6 Extended</option>
            <option value="Not sure yet" className="bg-[#080808]">Not sure yet</option>
          </select>
          <input
            type="number"
            placeholder="Monthly income (RM) *"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-emerald-500/40 transition-colors"
            required
          />
        </div>

        {error && <p className="text-xs text-red-400/80">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-bold hover:shadow-[0_0_30px rgba(52,211,153,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 size={14} className="animate-spin" /> Submitting...</>
          ) : (
            "Check My Eligibility"
          )}
        </button>

        <p className="text-[10px] text-white/20 text-center">
          We will WhatsApp you regarding your eligibility. Your data is kept confidential.
        </p>
      </form>
    </div>
  );
}
