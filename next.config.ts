import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // Static export — images cannot be optimised by Next.js server
  images: { unoptimized: true },

  // Remove the X-Powered-By header
  poweredByHeader: false,

  // Strict mode to catch issues early
  reactStrictMode: true,

  // Compress the export output
  compress: true,
};

export default nextConfig;
