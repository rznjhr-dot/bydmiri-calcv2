"use client";

import { useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Info, MapPin, Phone } from "lucide-react";
import { Img } from "@/components/img";
import { Modal } from "@/components/modal";
import { PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL } from "@/lib/site";
import { track } from "@/lib/analytics";

type LegalType = "privacy" | "terms" | "disclaimer";

const EXPLORE = [
  { href: "/", label: "Home" },
  { href: "/#full-lineup", label: "Models" },
  { href: "/pricelist", label: "Prices" },
  { href: "/why-byd", label: "Why BYD" },
  { href: "/charging", label: "Charging & warranty" },
  { href: "/#contact", label: "Book a test drive" },
];

const LEGAL_TITLES: Record<LegalType, string> = {
  privacy: "Privacy Policy",
  terms: "Terms of Use",
  disclaimer: "Disclaimer",
};

export default function Footer() {
  const [legal, setLegal] = useState<LegalType | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const goHome = (e: MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname !== "/") return;
    e.preventDefault();
    window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-theme bg-theme-section pb-24 md:pb-0">
      <div className="mx-auto max-w-[1240px] px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.25fr_0.9fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              onClick={goHome}
              className="inline-flex min-h-11 items-center gap-1 text-sm text-white"
              aria-label="BYD Miri home"
            >
              <Img src="/byd-logo-white.svg" alt="BYD" className="-mt-[2px] h-4 w-auto" />
              <span className="font-wordmark ml-2 text-[11px]">| MIRI</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-theme-50">
              BYD sales and support in Miri, from your first test drive to the loan and trade-in,
              with help that carries on after you collect the car.
            </p>
          </div>

          {/* Page links */}
          <div>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-theme-40">
              Explore
            </h2>
            <ul>
              {EXPLORE.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (item.href === "/#contact") {
                        track("book_test_drive_click", { location: "footer" });
                      }
                    }}
                    className="inline-flex min-h-11 items-center text-sm text-theme-50 transition-colors hover:text-theme-90"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom */}
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-theme-40">
              Showroom
            </h2>
            <p className="text-sm font-medium text-theme-70">Kah Progression Auto</p>
            <div className="mt-3 space-y-3 text-sm text-theme-50">
              <p className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <span>
                  Lot 1829, Jalan Krokop Utama,
                  <br />
                  98000 Miri, Sarawak
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Clock size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <span>
                  Mon–Sat · 9:00am–6:00pm
                  <br />
                  Sun &amp; PH · 9:00am–4:00pm
                </span>
              </p>
              <a
                href={`tel:${PHONE_E164}`}
                onClick={() => track("phone_click", { location: "footer" })}
                className="flex min-h-11 items-center gap-2 text-theme-50 transition-colors hover:text-theme-90"
              >
                <Phone size={15} className="shrink-0 text-accent" aria-hidden />
                <span>{PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-theme-40">
              Follow
            </h2>
            <div className="flex flex-col items-start">
              <a
                href="https://web.facebook.com/ridzuanbydmiri"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm text-theme-50 transition-colors hover:text-theme-90"
              >
                Facebook <ArrowUpRight size={13} aria-hidden />
              </a>
              <a
                href="https://www.tiktok.com/@ridzuanbydmiri"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm text-theme-50 transition-colors hover:text-theme-90"
              >
                TikTok <ArrowUpRight size={13} aria-hidden />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t pt-6" style={{ borderColor: "var(--cz-border)" }}>
          <p className="max-w-3xl text-xs leading-relaxed text-theme-50">
            Estimates are indicative only. Charging times, running costs and loan figures vary
            with driving style, tariffs, battery condition and bank approval. Independent sales
            advisor page — not the official BYD Malaysia website.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-theme-50">
              &copy; 2026 Ridzuan Jahari. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-2 text-[13px]">
              <button
                onClick={() => setLegal("privacy")}
                className="inline-flex min-h-11 items-center px-2 text-theme-50 transition-colors hover:text-theme-90"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setLegal("terms")}
                className="inline-flex min-h-11 items-center px-2 text-theme-50 transition-colors hover:text-theme-90"
              >
                Terms of Use
              </button>
              <button
                onClick={() => setLegal("disclaimer")}
                className="inline-flex min-h-11 items-center px-2 text-theme-50 transition-colors hover:text-theme-90"
              >
                Disclaimer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Legal modal */}
      <Modal
        open={!!legal}
        onClose={() => setLegal(null)}
        label={legal ? LEGAL_TITLES[legal] : "Legal"}
        closeRef={closeRef}
        className="p-6"
      >
        {legal === "privacy" && (
          <div className="space-y-3 text-sm leading-relaxed text-theme-70">
            <h3 className="text-lg font-semibold text-theme-90">Privacy Policy</h3>
            <p>
              Loan and charging calculations run in your browser. Nothing you type into the
              calculator is stored by this website.
            </p>
            <p>
              Google Analytics 4 is used to understand how the site is used, including pages
              viewed, approximate location, device type and referral source. It uses cookies and
              is processed by Google under its own terms. No name, phone number or income details
              are sent to Analytics. Analytics cookies can be blocked in your browser settings.
            </p>
            <p>
              If you submit the loan eligibility form, the name, phone number, target model and
              monthly income you enter are sent to a private spreadsheet so Ridzuan can follow up
              on your enquiry. They are not sold or shared with third parties for marketing.
            </p>
            <p>
              Messages sent through WhatsApp are handled under WhatsApp&apos;s own privacy terms.
              You can ask for your details to be removed at any time.
            </p>
            <p>
              For enquiries, contact Ridzuan Jahari at{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2"
              >
                {PHONE_DISPLAY}
              </a>
              .
            </p>
          </div>
        )}

        {legal === "terms" && (
          <div className="space-y-3 text-sm leading-relaxed text-theme-70">
            <h3 className="text-lg font-semibold text-theme-90">Terms of Use</h3>
            <p>
              Monthly instalment estimates are for preliminary reference only and do not
              constitute a formal financing offer.
            </p>
            <p>
              All calculations are based on the information you provide and current indicative
              interest rates, which may change without notice.
            </p>
            <p>
              Actual financing approval, terms and conditions are subject to bank assessment,
              CCRIS/CTOS records, and the financing rates applicable at the time of application.
            </p>
            <p>
              For a formal quotation, contact Ridzuan Jahari at{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2"
              >
                {PHONE_DISPLAY}
              </a>
              .
            </p>
          </div>
        )}

        {legal === "disclaimer" && (
          <div className="space-y-3 text-sm leading-relaxed text-theme-70">
            <h3 className="text-lg font-semibold text-theme-90">Disclaimer</h3>
            <p className="flex items-center gap-1.5 font-semibold text-theme-80">
              <Info size={15} className="shrink-0" aria-hidden />
              Monthly instalment estimates are for preliminary reference only.
            </p>
            <p>
              The calculation takes into account the downpayment you entered, the current rebate,
              the financing tenure, and an estimated interest rate of 2.3% per annum.
            </p>
            <p>
              Actual instalments and financing approval are subject to bank assessment, CCRIS/CTOS
              records, current financial commitments, and the rates applicable at the time of
              application.
            </p>
            <p
              className="flex items-center gap-1.5 border-t pt-2 font-semibold text-theme-80"
              style={{ borderColor: "var(--cz-border)" }}
            >
              <Info size={15} className="shrink-0" aria-hidden />
              Charging estimates
            </p>
            <p>
              Charging costs are for reference only. Actual rates depend on charger type,
              location, network operator and time of use. Charging times vary with temperature,
              battery condition and charger output.
            </p>
            <p>
              For an assessment based on your financial profile, contact Ridzuan at{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2"
              >
                {PHONE_DISPLAY}
              </a>
              .
            </p>
          </div>
        )}
      </Modal>
    </footer>
  );
}
