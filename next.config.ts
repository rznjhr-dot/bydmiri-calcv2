import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Static Export ──
  // We use static export because the site is hosted on Netlify's CDN.
  // No Node.js server needed — faster, cheaper, more secure.
  output: "export",

  // ── Images ──
  // Static export can't use Next.js built-in image optimization server.
  // Images are pre-optimized during build via Sharp (manual CLI run)
  // or already in modern formats (WebP/AVIF).
  images: { unoptimized: true },

  // ── Security ──
  // Remove the X-Powered-By header so attackers can't fingerprint Next.js version.
  poweredByHeader: false,

  // ── Strict Mode ──
  // Catch potential issues in development (double-render effects, etc).
  reactStrictMode: true,

  // ── Compression ──
  // Enable brotli/gzip compression on exported assets.
  // Netlify will re-compress at the edge anyway, but this helps for direct-serve.
  compress: true,

  // ── Trailing Slash ──
  // No trailing slash — cleaner URLs, matches current live site structure.
  // Prevents duplicate content issues.
  // /pricelist  ✅   /pricelist/  ❌
  trailingSlash: false,

  // ── Bundle Optimizations ──
  // optimizePackageImports enables deep-entry importing for tree-shaking.
  // lucide-react: Only import icons used, not the entire 50kB+ icon set.
  // framer-motion: Reduces bundle by importing only used sub-modules.
  experimental: {
    optimizePackageImports: [
      "lucide-react",
    ],
  },
};

export default nextConfig;
