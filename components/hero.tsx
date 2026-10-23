import Link from "next/link";
import { ArrowRight, BadgeCheck, BatteryCharging, ShieldCheck } from "lucide-react";
import { Img } from "@/components/img";
import { PHONE_DISPLAY, PHONE_E164, TEST_DRIVE_WHATSAPP_URL } from "@/lib/site";
import { track } from "@/lib/analytics";

/**
 * Static conversion hero.
 *
 * The headline and offer never change: a rotating H1 asks visitors to read
 * a new promise every few seconds, which is the opposite of what a
 * high-consideration purchase needs. The photograph stays as atmosphere;
 * the message, price anchor, proof and next step stay fixed.
 */
export default function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-theme">
      {/* Photo: the car sits centre-right in this frame, so the copy can
          occupy the left without fighting the image. */}
      <Img
        src="/images/hero/showroom-1440.webp"
        srcSet="/images/hero/showroom-640.webp 640w, /images/hero/showroom-960.webp 960w, /images/hero/showroom-1440.webp 1440w, /images/hero/showroom-1920.webp 1920w"
        sizes="100vw"
        alt="Kah Progression Auto, the BYD showroom in Miri"
        priority
        className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
      />

      {/* Scrim: bottom-up so the showroom facade stays visible. A base
          overlay plus a soft text shadow keeps the copy legible against
          the bright parts of the photo. */}
      <div aria-hidden className="absolute inset-0 bg-black/30" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1240px] flex-col justify-center px-5 pb-24 pt-28 sm:px-6 sm:pb-20">
        <div className="hero-copy-shadow max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/85 sm:text-xs">
            BYD Miri <span className="mx-1.5 text-white/50">·</span> Kah Progression Auto
          </p>

          <h1 className="mt-4 font-display text-[36px] leading-[1.02] text-white min-[360px]:text-[42px] sm:text-6xl sm:leading-[0.96] lg:text-7xl" style={{ fontWeight: 600 }}>
            Test drive a BYD
            <br />
            <em className="italic text-accent">in Miri.</em>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            10 models, prices from{" "}
            <strong className="font-semibold text-white">RM106,353</strong> and
            instalments from{" "}
            <strong className="font-semibold text-white">RM979/mo</strong>. Loan,
            trade-in and after-sales support handled locally.
          </p>

          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="#contact"
              onClick={() => track("book_test_drive_click", { location: "hero" })}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-base font-bold sm:w-auto"
              style={{ color: "var(--cz-accent-ink)" }}
            >
              Book a test drive
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/pricelist"
              onClick={() => track("prices_click", { location: "hero" })}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              See prices &amp; calculate
            </Link>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-white/85 sm:text-sm [@media(max-height:700px)]:hidden">
            <li className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 shrink-0 text-accent" aria-hidden />
              Authorised BYD dealer
            </li>
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 shrink-0 text-accent" aria-hidden />
              6-year vehicle warranty
            </li>
            <li className="inline-flex items-center gap-1.5">
              <BatteryCharging className="h-4 w-4 shrink-0 text-accent" aria-hidden />
              8-year battery warranty
            </li>
          </ul>

          <div className="mt-7 flex items-center gap-3 [@media(max-height:700px)]:hidden">
            <Img
              src="/ridzuan.jpg"
              alt="Ridzuan Jahari, BYD Sales Advisor in Miri"
              className="h-11 w-11 shrink-0 rounded-full border border-white/25 object-cover"
            />
            <div className="min-w-0 text-sm">
              <p className="font-semibold text-white">Ridzuan Jahari</p>
              <p className="text-[13px] text-white/75">
                Sales Advisor{" "}
                <span className="mx-1 text-white/50">·</span>
                <a
                  href={`tel:${PHONE_E164}`}
                  onClick={() => track("phone_click", { location: "hero" })}
                  className="inline-flex min-h-11 items-center text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  {PHONE_DISPLAY}
                </a>
              </p>
            </div>
            <a
              href={TEST_DRIVE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { location: "hero" })}
              className="ml-1 hidden text-[13px] font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-white sm:inline"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
