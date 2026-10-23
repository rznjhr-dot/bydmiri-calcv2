"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { PHONE_DISPLAY, waLink } from "@/lib/site";
import { track } from "@/lib/analytics";

const TIMES = ["Any time", "Morning (9am–12pm)", "Afternoon (12pm–4pm)"];

/* Only these units are available for test drives. Seal and Seal 6 are
   excluded until demo units arrive. */
const TEST_DRIVE_MODELS = [
  "Atto 2 Premium",
  "Atto 3 Premium",
  "Sealion 7 Dynamic",
  "Sealion 7 Premium",
  "M6 Extended",
];

export default function TestDriveForm() {
  const [model, setModel] = useState("Not sure yet");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("Any time");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 9) {
      setError("Please enter a valid WhatsApp number.");
      return;
    }
    if (date) {
      const today = new Date().toISOString().slice(0, 10);
      if (date < today) {
        setError("Please choose a date from today onward.");
        return;
      }
    }

    const message = [
      "Hi Ridzuan, I'd like to book a BYD test drive in Miri.",
      `Model: ${model}`,
      `Preferred date: ${date || "Any day"}`,
      `Preferred time: ${time}`,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
    ].join("\n");

    track("test_drive_submit", {
      model,
      preferred_time: time,
      has_date: Boolean(date),
    });

    const url = waLink(message);
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (sentUrl) {
    return (
      <div
        className="rounded-2xl border p-6 text-center"
        style={{
          backgroundColor: "var(--cz-accent-soft)",
          borderColor: "var(--cz-accent-line)",
        }}
      >
        <CheckCircle2 size={30} className="mx-auto mb-3 text-accent" aria-hidden />
        <p className="text-base font-semibold text-theme-90">WhatsApp should have opened.</p>
        <p className="mt-1 text-sm leading-relaxed text-theme-50">
          Send the message to confirm your test drive. If WhatsApp did not open, use the link
          below.
        </p>
        <a
          href={sentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-bold"
          style={{ color: "var(--cz-accent-ink)" }}
        >
          Open WhatsApp
          <ArrowRight size={15} aria-hidden />
        </a>
        <button
          type="button"
          onClick={() => setSentUrl(null)}
          className="mt-3 flex min-h-11 w-full items-center justify-center text-sm font-medium text-theme-50 hover:text-theme-90"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="td-model" className="mb-1.5 block text-xs font-medium text-theme-50">
          Model
        </label>
        <div className="relative">
          <select
            id="td-model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="field min-h-12 w-full appearance-none rounded-lg px-3 pr-10 text-base"
          >
            <option value="Not sure yet">Not sure yet</option>
            {TEST_DRIVE_MODELS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-theme-50"
            aria-hidden
          />
        </div>
        <p className="mt-1.5 text-[11px] leading-relaxed text-theme-40">
          Available test drive units: Atto 2 Premium, Atto 3 Premium, Sealion 7 Dynamic,
          Sealion 7 Premium and M6 Extended.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="td-date" className="mb-1.5 block text-xs font-medium text-theme-50">
            Preferred date <span className="font-normal text-theme-40">(optional)</span>
          </label>
          <input
            id="td-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="field min-h-12 w-full rounded-lg px-3 text-base"
          />
        </div>
        <div>
          <label htmlFor="td-time" className="mb-1.5 block text-xs font-medium text-theme-50">
            Preferred time
          </label>
          <div className="relative">
            <select
              id="td-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="field min-h-12 w-full appearance-none rounded-lg px-3 pr-10 text-base"
            >
              {TIMES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-theme-50"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="td-name" className="mb-1.5 block text-xs font-medium text-theme-50">
            Name
          </label>
          <input
            id="td-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="field min-h-12 w-full rounded-lg px-3 text-base"
            required
          />
        </div>
        <div>
          <label htmlFor="td-phone" className="mb-1.5 block text-xs font-medium text-theme-50">
            WhatsApp number
          </label>
          <input
            id="td-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="012 345 6789"
            className="field min-h-12 w-full rounded-lg px-3 text-base"
            required
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-counter">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="hero-cta inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-base font-bold"
        style={{ color: "var(--cz-accent-ink)" }}
        data-cta="test-drive-form"
      >
        Request test drive
        <ArrowRight size={16} aria-hidden />
      </button>

      <p className="text-center text-xs leading-relaxed text-theme-40">
        Opens WhatsApp with your details. You can review the message before sending.
      </p>
      <div className="flex items-center justify-center gap-1.5 text-xs text-theme-40">
        <span>Prefer to message directly?</span>
        <a
          href={waLink("Hi Ridzuan, I'd like to book a BYD test drive in Miri.")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { location: "booking_form" })}
          className="inline-flex min-h-11 items-center font-medium text-accent underline decoration-accent/40 underline-offset-2"
        >
          WhatsApp {PHONE_DISPLAY}
        </a>
      </div>
    </form>
  );
}
