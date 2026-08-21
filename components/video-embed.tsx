"use client";

import { useEffect, useState } from "react";

interface VideoEmbedProps {
  /** YouTube video ID, e.g. "CGQwqWqzkNA" */
  videoId: string;
  title: string;
}

/* ── YouTube embed (privacy-enhanced, autoplay-safe) ──
   - youtube-nocookie.com: no tracking cookies until playback
   - autoplay=1&mute=1: browsers only allow MUTED autoplay; audible
     autoplay is blocked everywhere, so this is the only working combo
   - playsinline=1: iOS Safari requirement (no fullscreen takeover)
   - The iframe renders only after mount (avoids SSR/hydration issues)
   - prefers-reduced-motion users get click-to-play (no autoplay) —
     consistent with the site's motion discipline
   - Native loading="lazy": the ~1MB player only fetches near viewport */
export default function VideoEmbed({ videoId, title }: VideoEmbedProps) {
  // One state object set asynchronously in a single rAF callback —
  // no synchronous setState-in-effect (lint rule react-hooks/set-state-in-effect).
  const [flags, setFlags] = useState<{ mounted: boolean; reduced: boolean }>({
    mounted: false,
    reduced: false,
  });

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setFlags({ mounted: true, reduced });
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    ...(flags.reduced ? {} : { autoplay: "1", mute: "1" }),
  });

  return (
    <div
      className="relative w-full aspect-video overflow-hidden rounded-xl"
      style={{ backgroundColor: "#000", border: "1px solid var(--cz-border)" }}
    >
      {flags.mounted ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        /* Placeholder while hydrating — space already reserved by aspect-video */
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--cz-text-40)" }}>
            <polygon points="6 3 20 12 6 21 6 3" fill="currentColor" stroke="none" opacity="0.9" />
          </svg>
          <span className="label-mono">{title}</span>
        </div>
      )}
    </div>
  );
}
