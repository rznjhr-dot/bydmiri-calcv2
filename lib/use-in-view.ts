"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
