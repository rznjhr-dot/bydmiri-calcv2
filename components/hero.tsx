"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Phone, ArrowDown } from "lucide-react";

/**
 * Hero carousel — showcase of the BYD Miri lineup, one slide per model.
 *
 * Photo strategy:
 *   - Background photo is the OFFICIAL Sime Motors Malaysia homepage KV
 *     (purpose-built for 1920×1082 hero use). They have burnt-in text
 *     overlays in the upper-center and bottom of the image.
 *   - We use a bottom-anchored left-aligned caption overlay so our copy
 *     lives in the clean negative space at the lower-left of the photo,
 *     not where the burnt-in brand text is.
 *   - The bottom 55% scrim gives extra legibility for our headline + CTAs.
 */

const SLIDES = [
  {
    img: "/images/hero/atto3premium.webp",
    name: "BYD Atto 3",
    category: "C-Segment Electric SUV",
    line1: "Drive electric.",
    line2: "Live vibrant.",
    sub:
      "Family-sized, sharply priced. Quiet ride, smart interior, instant pickup at the lights.",
  },
  {
    img: "/images/hero/sealion7premium.webp",
    name: "BYD Sealion 7",
    category: "D-Segment Premium SUV",
    line1: "Go farther.",
    line2: "Refuse ordinary.",
    sub:
      "Coupe roofline, seven-airbag safety, BYD's flagship family SUV. Premium presence, sharper pricing.",
  },
  {
    img: "/images/hero/m6.webp",
    name: "BYD M6",
    category: "C-Segment Family MPV",
    line1: "Built for family.",
    line2: "Driven by comfort.",
    sub:
      "Malaysia's only pure-electric 7-seater under RM 130k. School runs, beach days, balik kampung — all silent.",
  },
  {
    img: "/images/hero/sealpremium.webp",
    name: "BYD Seal",
    category: "D-Segment Sedan",
    line1: "Seal the speed.",
    line2: "Own the road.",
    sub:
      "3.8-second 0–100, rear-wheel drive, the sport sedan for the EV era. Effortless performance, everyday comfort.",
  },
  {
    img: "/images/hero/atto2.webp",
    name: "BYD Atto 2",
    category: "B-Segment Compact SUV",
    line1: "When chill",
    line2: "meets thrill.",
    sub:
      "Compact on the outside, generous on the inside. The everyday BYD — easy parking, longer drives.",
  },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const total = SLIDES.length;

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % total), 6000);
    return () => clearInterval(id);
  }, [total]);

  const slide = SLIDES[idx];
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);
  if (!slide) return null;

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-theme">
      {/* Background slides — crossfade */}
      {SLIDES.map((s, i) => (
        <div
          key={s.name}
          aria-hidden={i !== idx}
          className={`absolute inset-0 motion-safe:transition-opacity motion-safe:duration-1000 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.img}
            alt={`${s.name} — ${s.category}`}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Bottom-anchored scrim — heavy at the bottom, lighter toward center.
          This leaves the burnt-in model/price text (upper-center) readable
          from a brand-asset standpoint, but gives our caption + CTA a clean
          legibility band at the bottom-left. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
      />

      {/* Left-edge vertical vignette — focuses attention on the caption */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/50 to-transparent"
      />

      {/* Foreground content — bottom-left anchored.
           Mobile-first: caps text + headline + sub + stacked buttons, smaller padding. */}
      <div className="relative h-full flex flex-col justify-end pb-28 sm:pb-28 pt-24 safe-area-bottom">
        <div className="mx-auto max-w-7xl w-full px-5 sm:px-8">
          {/* Caption chip — bottom-left, doesn't fight upper-center burnt-in text.
              Tightened on mobile so it doesn't wrap into 3 lines. */}
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white/70 mb-2 sm:mb-3 truncate">
              <span className="text-accent">●</span>{" "}
              <span className="hidden sm:inline">BYD Miri · </span>
              <span className="sm:hidden">BYD · </span>
              <span className="hidden sm:inline">Kah Progression Auto · </span>
              <span className="sm:hidden">Miri · </span>
              Sarawak
            </p>
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white/70 mb-3 sm:mb-4">
              <span className="font-conthrax normal-case tracking-normal text-white/90 text-[11px] sm:text-[13px]">{slide.name}</span> · <span className="hidden sm:inline">{slide.category}</span>
            </p>
            <h1 className="font-display text-[40px] leading-[1.02] sm:text-6xl sm:leading-[0.95] lg:text-7xl xl:text-8xl tracking-tight text-white">
              {slide.line1}
              <br />
              <em className="italic text-accent">{slide.line2}</em>
            </h1>
            <p className="mt-4 sm:mt-6 font-body text-white/80 text-sm sm:text-lg max-w-md leading-relaxed">
              {slide.sub}
            </p>

            {/* Buttons — stacked full-width on mobile, inline on sm+ */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <Link
                href="#full-lineup"
                className="inline-flex items-center justify-center gap-3 bg-accent px-6 py-3.5 sm:py-3 font-bold text-sm sm:text-base cursor-pointer hover:bg-accent-strong motion-safe:transition-colors motion-safe:duration-200 min-h-[44px] sm:min-h-0 rounded-lg"
                style={{ color: "var(--cz-accent-ink)" }}
              >
                Choose your model
                <ArrowDown className="w-4 h-4" aria-hidden />
              </Link>
              <a
                href="https://wa.me/601131933930"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-6 py-3.5 sm:py-3 font-body font-medium hover:bg-white/10 motion-safe:transition-colors motion-safe:duration-200 min-h-[44px] sm:min-h-0"
              >
                <Phone className="w-4 h-4" aria-hidden />
                WhatsApp Ridzuan
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Slide controls — bottom-left on mobile (clear of dots at bottom-right),
          bottom-right on desktop. Tap-friendly 44px minimum. */}
      <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-auto sm:right-8 flex items-center gap-2 z-10">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="w-11 h-11 sm:w-10 sm:h-10 inline-flex items-center justify-center bg-black/50 hover:bg-black/80 text-white border border-white/20 motion-safe:transition-colors rounded-full sm:rounded-none backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="w-11 h-11 sm:w-10 sm:h-10 inline-flex items-center justify-center bg-black/50 hover:bg-black/80 text-white border border-white/20 motion-safe:transition-colors rounded-full sm:rounded-none backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5" aria-hidden />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 right-3 sm:left-1/2 sm:bottom-6 sm:right-auto sm:-translate-x-1/2 flex items-center gap-2 z-10 bg-black/40 sm:bg-transparent backdrop-blur-sm rounded-full px-2 py-1">
        {SLIDES.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1 motion-safe:transition-all motion-safe:duration-200 ${
              i === idx ? "w-8 bg-accent" : "w-4 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
