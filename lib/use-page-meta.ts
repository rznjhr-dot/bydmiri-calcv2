"use client";

import { useEffect } from "react";

const SITE_URL = "https://bydmiri.com";

function ensureMeta(selector: string, attr: string, name: string) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  return el;
}

function ensureLink() {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  return el;
}

/**
 * Client-side per-page SEO meta (title, description, canonical, OG).
 * These pages are "use client" so they cannot export static `metadata`;
 * this hook applies the equivalent tags after hydration, which Google's
 * rendering pipeline executes before indexing.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;

    if (description) {
      const meta = ensureMeta('meta[name="description"]', "name", "description");
      meta.setAttribute("content", description);
    }

    const canonicalUrl = new URL(window.location.pathname, SITE_URL).toString();
    ensureLink().setAttribute("href", canonicalUrl);

    const ogTitle = ensureMeta('meta[property="og:title"]', "property", "og:title");
    ogTitle.setAttribute("content", title);

    const ogUrl = ensureMeta('meta[property="og:url"]', "property", "og:url");
    ogUrl.setAttribute("content", canonicalUrl);

    const ogDesc = ensureMeta('meta[property="og:description"]', "property", "og:description");
    if (description) ogDesc.setAttribute("content", description);
  }, [title, description]);
}
