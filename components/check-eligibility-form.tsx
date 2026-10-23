"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";

const GSHEET_WEBAPP_URL =
  process.env.NEXT_PUBLIC_GSHEET_URL ||
  "https://script.google.com/macros/s/AKfycbzqtg1BfVu49JUZ7SnSe3gqtBdLZO_o671YwwhXAwRyaS2ZS3PQQZ_GnJuk4ZEZr0kXvw/exec";

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

    const params = new URLSearchParams({
      name: name.trim(),
      phone: phone.trim(),
      targetCar: targetCar.trim(),
      salary: salary.trim(),
      timestamp: new Date().toISOString(),
      source: "BYD Miri Website",
    });

    // Apps Script reads e.parameter (query string). Using GET with query
    // params is the most reliable cross-origin method — no Content-Type
    // issues, no preflight, works with no-cors.
    fetch(`${GSHEET_WEBAPP_URL}?${params.toString()}`, {
      method: "GET",
      mode: "no-cors",
    }).catch(() => {});

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className={`animate-scale-in rounded-xl p-5 text-center ${className}`}
        style={{
          backgroundColor: "var(--cz-accent-soft)",
          border: "1px solid var(--cz-accent-line)",
        }}
      >
        <CheckCircle2 size={28} className="text-accent mx-auto mb-2" />
        <p className="text-sm font-semibold text-accent">Thank You!</p>
        <p className="text-xs text-theme-50 mt-1">
          Eligibility is reviewed and answered on WhatsApp within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <input
            type="text"
            placeholder="Full name *"
            aria-label="Full name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="field w-full px-3 py-2.5 rounded-lg text-base transition-colors"
            required
          />
          <input
            type="tel"
            placeholder="Phone number *"
            aria-label="Phone number"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="field w-full px-3 py-2.5 rounded-lg text-base transition-colors"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="relative">
            <select
              value={targetCar}
              aria-label="Target car"
              onChange={(e) => setTargetCar(e.target.value)}
              className="field w-full px-3 py-2.5 pr-10 rounded-lg text-base transition-colors appearance-none"
              required
            >
            <option value="" disabled className="bg-theme-card text-theme-30">
              Target car *
            </option>
            <option value="Atto 2 Premium" className="bg-theme-card">Atto 2 Premium</option>
            <option value="Seal 6 Premium" className="bg-theme-card">Seal 6 Premium</option>
            <option value="Atto 3 Ultra" className="bg-theme-card">Atto 3 Ultra</option>
            <option value="Atto 3 Premium" className="bg-theme-card">Atto 3 Premium</option>
            <option value="Sealion 7 Dynamic" className="bg-theme-card">Sealion 7 Dynamic</option>
            <option value="Sealion 7 Premium" className="bg-theme-card">Sealion 7 Premium</option>
            <option value="Sealion 7 Performance" className="bg-theme-card">Sealion 7 Performance</option>
            <option value="Seal Premium" className="bg-theme-card">Seal Premium</option>
            <option value="Seal Performance" className="bg-theme-card">Seal Performance</option>
            <option value="M6 Extended" className="bg-theme-card">M6 Extended</option>
              <option value="Not sure yet" className="bg-theme-card">Not sure yet</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-theme-50"
              aria-hidden
            />
          </div>
          <input
            type="number"
            placeholder="Monthly income (RM) *"
            aria-label="Monthly income in ringgit"
            inputMode="numeric"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="field w-full px-3 py-2.5 rounded-lg text-base transition-colors"
            required
          />
        </div>

        {error && <p className="text-xs text-counter">{error}</p>}

        <button
          type="submit"
          className="hero-cta w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-accent text-sm font-bold min-h-11"
          style={{ color: "var(--cz-accent-ink)" }}
        >
          Check My Eligibility
        </button>

        <p className="text-xs text-theme-50 text-center">
          Eligibility answers are sent by WhatsApp. Your details are kept confidential.
        </p>
      </form>
    </div>
  );
}
