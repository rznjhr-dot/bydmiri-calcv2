# ─────────────────────────────────────────────────────────────
# CLOUDFLARE RECOMMENDED SETTINGS — BYD MIRI (bydmiri.com)
# ─────────────────────────────────────────────────────────────
# The site is behind Cloudflare CDN. Apply these settings in the
# Cloudflare Dashboard for optimal security + performance.

# ═════════════════════════════════════════════════════════════
# SSL/TLS
# ═════════════════════════════════════════════════════════════

# 1. SSL/TLS → Overview → Full (strict)
#    Encrypts traffic between Cloudflare → Netlify using a valid cert.
#    "Full (strict)" ensures the origin also has a valid cert, not just Cloudflare.
#    Why: Prevents MITM between CF → Netlify. Netlify provides TLS by default.

# 2. SSL/TLS → Edge Certificates → Always Use HTTPS: ON
#    Redirects all HTTP requests to HTTPS automatically at the edge.
#    Why: No user should ever access the site over plain HTTP.

# 3. SSL/TLS → Edge Certificates → Automatic HTTPS Rewrites: ON
#    Rewrites http:// URLs in HTML/CSS/JS to https:// automatically.
#    Why: Fixes mixed-content warnings without manual code changes.

# 4. SSL/TLS → Edge Certificates → TLS 1.3: ON
#    Enables the latest TLS version for faster, more secure connections.
#    Why: TLS 1.3 reduces handshake from 2 RTT to 1 RTT (faster load).

# 5. SSL/TLS → Edge Certificates → Minimum TLS Version: 1.2
#    Blocks connections using outdated TLS versions.
#    Why: TLS 1.0/1.1 have known vulnerabilities (POODLE, BEAST).

# ═════════════════════════════════════════════════════════════
# SPEED
# ═════════════════════════════════════════════════════════════

# 6. Speed → Optimization → Brotli: ON
#    Cloudflare compresses responses using Brotli (better ratio than gzip).
#    Why: Smaller files → faster download → better LCP. ~20% smaller than gzip.

# 7. Speed → Optimization → Early Hints: ON
#    Sends "103 Early Hints" response headers before the full response.
#    Why: Browser can start downloading CSS/fonts/images while waiting for HTML.
#         Reduces Largest Contentful Paint (LCP) by 200-400ms.

# 8. Speed → Optimization → HTTP/3 (with QUIC): ON
#    Enables HTTP/3 which uses UDP instead of TCP.
#    Why: Faster connection establishment, better performance on lossy networks (mobile).

# ═════════════════════════════════════════════════════════════
# CACHING
# ═════════════════════════════════════════════════════════════

# 9. Caching → Configuration → Cache Level: Standard
#    Cloudflare caches static assets based on Cache-Control headers.
#    Our _headers file already sets aggressive caching for _next/static/* and images.

# 10. Caching → Configuration → Edge Cache TTL: 7 days
#     Overrides origin Cache-Control for HTML pages specifically.
#     Static pages change infrequently — 7 days is safe.
#     Why: Reduces origin load, faster global response.

# 11. Caching → Configuration → Browser Cache TTL: 1 year
#     Tells browsers how long to cache static assets.
#     Our _headers already sets 1 year for hashed assets.
#     Why: Returning visitors load instantly from disk cache.

# ═════════════════════════════════════════════════════════════
# SECURITY
# ═════════════════════════════════════════════════════════════

# 12. Security → Settings → Security Level: Medium
#     Challenges IPs with suspicious activity (captcha).
#     "Medium" challenges only when threat score ≥ 0 (very few false positives).

# 13. Security → Settings → Challenge Passage: 30 minutes
#     Once a visitor passes a challenge, they don't see another for 30 min.

# 14. Security → Bots → Bot Fight Mode: ON
#     Blocks known bots and crawlers from scraping the site.
#     Why: Prevents price scraping, reduces bandwidth, protects pricing data.

# 15. Security → WAF → Managed Rules: ON
#     Enables Cloudflare's OWASP Core Ruleset.
#     Why: Blocks SQLi, XSS, RFI, LFI attacks at the edge — zero impact on origin.

# ═════════════════════════════════════════════════════════════
# NETWORK
# ═════════════════════════════════════════════════════════════

# 16. Network → HTTP/2: ON
#     Multiplexed connections, header compression.
#     Why: Faster page loads with fewer connections.

# 17. Network → HTTP/3 (with QUIC): ON
#     Already covered in Speed section.

# ═════════════════════════════════════════════════════════════
# DNS
# ═════════════════════════════════════════════════════════════

# 18. DNS → Records:
#     A or CNAME record for bydmiri.com → Netlify load balancer IP
#     Proxy status: Proxied (orange cloud) — enables all Cloudflare features
#
#     Netlify provides a target domain like:
#       bydmiri-calcv2.netlify.app
#     Set a CNAME record from bydmiri.com → that Netlify domain.
#     Enable proxy (orange cloud) for CDN protection.

# ═════════════════════════════════════════════════════════════
# PAGE RULES (3 Free Rules)
# ═════════════════════════════════════════════════════════════

# Page Rule 1: Always HTTPS
#   URL: *bydmiri.com/*
#   Setting: Always Use HTTPS: ON
#   Why: Redundant with edge cert setting, but acts as explicit fallback.

# Page Rule 2: Cache Static Assets
#   URL: bydmiri.com/_next/static/*
#   Setting: Cache Level: Cache Everything, Edge TTL: 30 days
#   Why: Hashed filenames are immutable — safe to cache at edge for months.

# Page Rule 3: Bypass cache for HTML
#   URL: bydmiri.com/*
#   Setting: Cache Level: Bypass
#   Why: HTML is dynamic enough to not cache at edge (or use short TTL).

# ═════════════════════════════════════════════════════════════
# NETLIFY SETTINGS
# ═════════════════════════════════════════════════════════════

# Deploy settings (Netlify Dashboard):
#   Build command:    npx next build
#   Publish directory: out/
#   Node version:     20
#   Environment variables:
#     NEXT_PUBLIC_GSHEET_URL = <your Google Script URL>
#
# Netlify automatically:
#   - Terminates TLS (let's encrypt)
#   - Supports Brotli compression
#   - Applies _headers and _redirects files
#   - Provides DDoS protection
#
# No separate netlify.toml needed — _headers + _redirects in public/ is cleaner.
