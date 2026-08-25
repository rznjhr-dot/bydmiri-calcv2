# Changelog


## [2.10.1] — 2026-08-25

### Nav fixes
- **Removed broken "Calculator" nav button** (desktop) — scrolled to non-existent `#main-content`; Calculator is a modal, not a scroll target
- **Why-byd page**: replaced "Back to Calculator" link with full navbar (Home, Models, Charging, Why BYD, Contact Us) + mobile hamburger menu
- **Why-byd footer**: removed "Back to Loan Calculator" link

## [2.10.0] — 2026-08-25

### Full audit — security, performance, SEO & code health
- **Security**: Fixed dead hero CTA — `wa.me/60XXXXXXXXX` placeholder → real number `601131933930`
- **Performance**: Converted all images to WebP — **9.4 MB → 668 KB (~94% reduction)**
  - Model cards: PNG cutouts → WebP with **transparent alpha preserved** (38–42 KB each, was 400 KB–2 MB)
  - Hero slides: JPG → WebP (66–91 KB each, was 500 KB–1.4 MB)
  - Unused `seal6.jpg` (1.4 MB) removed
- **SEO**: Per-page metadata moved from client-side `usePageMeta()` to **server-side `layout.tsx`** (`app/pricelist/layout.tsx`, `app/why-byd/layout.tsx`)
  - Title / description / canonical now render at build time (Google indexes correctly, no JS required)
  - Removed `lib/use-page-meta.ts` (client-side meta hack)
- **SEO**: New 1200×630 `og-image.png` (dark theme + white BYD logo + Montserrat) replacing 512×512 logo for social cards
- **SEO**: `sitemap.xml` lastmod → 2026-08-25

### Code health
- Removed dead files: `lib/theme.tsx` (empty placeholder), `lib/use-page-meta.ts` (orphaned)
- Fixed duplicate React key warning — mobile nav had two `id: "charging"` menu items → kept "Charging, Savings & Warranty"
- Removed unused imports (`useState`, `ClipboardCheck`, `ChevronDown` from why-byd; `usePageMeta` from all pages)

### Verification
- `tsc --noEmit` clean
- `next build` pass — all 4 routes prerendered static
- Server-side titles verified in output: "Full Price List | BYD Miri", "Why BYD? | BYD Miri"
- WebP alpha channel confirmed for all 6 model cutouts (transparent background preserved)

## [2.9.0] — 2026-08-25

### Photo enrichment — full hero carousel + model card overhaul
- **Real Sime Motors MY homepage KV assets** for all 5 hero slides (Atto 3 Premium, Sealion 7, M6 Extended, BYD Seal, Atto 2) at 1920×1082 (native desktop hero dimensions)
- **Brand-licensed PNG cutouts** in `public/images/models/png/` for model cards — clean studio shots used by all 10 vehicle entries (Atto 3 Premium/Ultra, Atto 2, Sealion 7 Premium/Performance/Dynamic, Seal Premium/Performance, Seal 6, M6); clip-path-friendly 2:1 landscape ratio
- **Vehicle-card rendering** (`components/vehicle-card.tsx`) — `object-cover` → `object-contain` so wide-ratio PNGs no longer get clipped in the 5-column calculator grid
- **Hero CTA copy** — "See your monthly" → **"Choose your model"**; target `#calculator` → `#full-lineup` (the actual lineup section)
- **Duplicate hero files dropped** — `atto3ultra.jpg`, `sealion7dynamic.jpg`, `sealion7performance.jpg`, `sealperformance.jpg` (vehicle trims share body shape, kept canonical filename per model)
- **Broken `bydImage` paths** in `app/why-byd/page.tsx` comparison cards fixed: `/images/X.jpg` → `/images/hero/X.jpg` (real BYD models now display in VS sections)
- **Why-byd advantage cards** — added `image`/`imageAlt` fields with hero fallback photos; cards now render media-or-none (video wins, falls back to image, then icon-only)
- **Why-byd nav link added** to top navigation (desktop + mobile), pointing at `/why-byd` route

### Mobile optimizations (`components/hero.tsx`)
- Headline `text-5xl` (48px) → `text-[40px]` on phones for tighter line breaks
- Eyebrow chip condensed: "BYD Miri · Kah Progression Auto · Sarawak" → "BYD · Miri · Sarawak" (full text restored on `sm+`)
- Subtitle: `text-lg` → `text-sm` on mobile
- Buttons: stacked full-width with 44px tap-target on mobile, inline on `sm+`
- Slide arrows: bottom-right (overlapped caption) → **top-right on mobile**, with rounded touch targets + backdrop blur
- Dots navigation: bottom-center (clashed with caption) → **bottom-right on mobile**, backdrop-blurred pill style
- iOS safe-area support — `.safe-area-bottom` utility added to `globals.css`; uses `env(safe-area-inset-bottom)` to clear iPhone home bar
- `min-h-[44px]` on touch targets (Apple HIG compliance)
- Zero compiled-against stale Tailwind classes — verified with mobile UA render (iPhone user-agent)

### Codebase slim-down (token conservation)
- Deleted 7 unused `scripts/*.py` (one-off build tools: `download-byd-photos.py`, `extract-brochure-images.py`, `use-brochures.py`, `clean-hero-kvs.py`, `composite-hero.py`, `process-photos.py`, `upscale-clean-press.py`) — replaced by your direct uploads
- Removed `public/images/_brochure-source/` (8.1 MB raw PDF page extracts)
- Removed orphaned `data/` directory (stale `image_credits.json` from deleted scripts)
- Stripped `out/` (89 MB static export from prior build) and `.next/cache/` (regenerates on next dev/build)
- Cleaned 6 `.DS_Store` files (Mac metadata noise)
- Project slimmed by ~100 MB before commit

### Verification
- `curl -A 'iPhone…'` rendered mobile HTML — all `sm:` breakpoints present, dots/arrows repositioned correctly
- Server: HTTP 200 on `/`, `/pricelist`, `/why-byd` after the slimmer build
- All 5 unique hero JPGs (1920×1082) + 6 unique PNG cutouts serve 200 OK from `/images/hero/` and `/images/models/png/`
- Cards: `object-contain` verified — wide-aspect PNGs now fit without vertical clipping
- Why-byd comparison cards: 3 BYD model images now render correctly (was: broken paths)

## [2.8.0] — 2026-08-21


### Fixed (visual bugs from the token migration)
- **Charging slider fill bar restored** — the green fill between the two handles was invisible: the migration had placed a bare `var(--cz-accent)` token inside `className` (invalid CSS class). Now a proper inline `backgroundColor`; handle rings also tokenized (removed hardcoded emerald rgba + glow)
- **Fuel-savings chart bars restored** — same class of bug: `bg-gradient-to-t` had been lost, leaving orphaned `from-`/`to-` gradient stops and invisible bars. Fixed with Tailwind v4's `bg-linear-to-t` + token stops; verified live (both bars render real linear-gradients)
- Codebase audit confirms no other leaked tokens in `className` strings

### Charging cost — kept per-kWh (owner decision)
- DC public charging cost stays `kWh × RM1.40` (per-kWh), matching the remote `charging.json` data source. A per-minute variant was implemented and tested, then reverted on owner instruction (no time-based pricing data available)
- `lib/charging-profiles.ts` — parser rewritten for the current remote schema (`chargingProfiles` array, `home` / `public_default` profiles); the old `dcTariffRange` field no longer exists in the remote data, so the previous parser always fell back to defaults. Fetch failures return sane Sarawak defaults (RM0.33 AC / RM1.40 DC)
- Cost math verified live: Atto 2, 20→80%, 180 kW DC → RM45.21 = 51.13 × 0.6 ÷ 0.95 × 1.40 ✓

### Verification
- `eslint` clean · `next build` static export success (5 routes)
- Slider fill, chart bars, DC/AC cost figures, per-kWh labels all verified in-browser at 375px

## [2.7.1] — 2026-08-21

### "Why BYD" — media discipline pass (owner feedback)
- **Removed decorative images from topic cards**: a car photo next to "Warranty"/"V2L"/"#1 NEV" titles and image headers on all six "What You Gain" cards looked like unrelated filler. Media now appears only where it genuinely informs:
  - Blade Battery **video** stays (it's the actual nail-penetration test footage)
  - Comparison-card BYD model images stay (they show the exact model being compared)
- Advantage cards without video revert to clean icon + title + bullet layout; "What You Gain" cards back to compact text cards

## [2.7.0] — 2026-08-21

### "Why BYD" page — media redesign
- **Blade Battery video embedded** (was an external link): privacy-enhanced `youtube-nocookie.com` iframe with **muted autoplay** (`autoplay=1&mute=1&playsinline=1` — the only autoplay combination browsers permit), `loading="lazy"`, hydration-safe mount, and click-to-play fallback for `prefers-reduced-motion` users (`components/video-embed.tsx`)
- **Every topic now carries visuals**: advantage cards get media columns (video for Blade Battery; Atto 3 Ultra / Sealion 7 / Atto 2 photos for warranty, V2L, #1-NEV), the six "What You Gain" cards get image headers with fade-to-card overlay (all 9 local vehicle photos used once), and comparison cards show the specific BYD model in the BYD panel
- **CSP updated in both enforcement points** — meta tag (`app/layout.tsx`) and production Netlify headers (`public/_headers`): `frame-src` now allows `youtube-nocookie.com`/`youtube.com`, `img-src` allows `i.ytimg.com` thumbnails
- Card layout: mobile-first stacked (media above text), desktop 2-col media/text

### Fixed (price-figure rendering — "tak kemas dalam box")
- **Figure wrapping eliminated**: ledger values (`RM103,500`, `−RM9,000`…) were breaking mid-figure to 2 lines inside cramped 2-col cells. All RM value spans now `whitespace-nowrap shrink-0`; labels take the squeeze via `truncate` — a price never splits, the label ellipsizes first. Applied across: pricelist mobile ledger (11 row types), homepage `PricingCardMobile` OTR/monthly block, vehicle-card banner
- Vehicle-card banner: `min-w-0` on the flex row so the name truncates instead of squeezing the figure
- Verified via DOM scanner (unique client-rect line-tops per figure): 0 wrapping figures / 0 clipped figures on all pages at 320/375px; fuel-savings results exercised live (Calculate clicked) — clean

### Verification
- `eslint` clean · `next build` static export success
- why-byd @320px: 13 images + 1 video iframe rendered, 0 broken images, 0 overflow, 0 internal scrollers
- Video embed params confirmed live: nocookie domain, autoplay+muted+playsinline present

## [2.6.0] — 2026-08-21

### Design System (Hallmark-inspired revamp, Direction 01 · Minimal)
- **Typography** — Syne + IBM Plex Sans + JetBrains Mono → **Geist 300/400/500/600 + Geist Mono**. The 2+1 pairing done canonically: one family for display+body, mono as the data outlier tagging RM figures only (`.font-data`, tabular-nums)
- **Hero** (`components/hero.tsx`) — rewritten in the Minimal register: weight contrast 300→600 (`-0.035em` tracking, `clamp` to 80px), pure tinted paper (all decorative orbs/textures removed), mono line-prefix eyebrow, hairline-grid stats with mono numerals
- **Color tokens** (`app/globals.css`) — flat hex/rgba → **OKLCH four-layer system** (paper → ink → neutrals → accent), emerald-anchored hue 160 with tinted dark theme; one accent + one functional counterpoint (amber, 0%-down figures only)
- **Motion tokens** — named easings (`--ease-out/in/in-out`) + three duration buckets (120/220/420ms); all `hover:scale-105` + shadow-glow CTAs → `translateY(-1px)` + border-shift; infinite loop animations removed; stagger capped ~480ms; `prefers-reduced-motion` collapses to opacity
- **Section headers** (`components/section-header.tsx`) — pill-badge eyebrows → quiet mono labels; `align="start"` support de-centers data sections
- **Wordmarks** — mono `/ MIRI` across all pages
- **Warranty cards** (`components/warranty-details.tsx`) — 5-color rainbow → single-accent system with mono data badges

### Fixed (mobile responsiveness audit — go-live readiness)
- **F-1 CRITICAL `/pricelist` @320px** — page-level horizontal scroll (333px > 320px): mobile card packed image + info + 2 prices + button in one row. Restructured to 3 stacked rows; all figures now visible without scrolling
- **F-2 MAJOR `/` @320px** — pricing table hid 111px behind an internal `overflow-x-auto` scroller (desktop table shrunk onto mobile). Mobile now renders a dedicated `PricingCardMobile` list (10 cards); full comparison table is desktop-only (`md:`)
- **F-3 MINOR** — tap targets below HIG 40px minimum: hero social links, footer legal links → `min-h-11` (44px)
- **Defense-in-depth** — `overflow-x: clip` on `html`/`body`: no stray element can ever produce page-level horizontal scrolling (WCAG 2.2 / industry standard)
- Text floor: no type below 10px anywhere (was `text-[9px]` in table headers)

### Cleanup (production readiness)
- Removed `public/mockups/` — design exploration artifacts (4 hero-direction concepts) that must not ship
- `.gitignore` — added `.playwright-mcp/` (browser-test artifacts); working tree has zero untracked files

### Verification
- Programmatic audit at 320/375/414/768px × all 3 routes: zero document overflow, zero internal horizontal scrollers, no sub-10px text, tap targets ≥44px (footer/social) or ≥40px everywhere else
- Calculator modal, charging estimator, fuel-savings calculator verified fit-within-viewport at 320px
- `eslint` clean · `next build` static export success (5 routes)
- Known/accepted: pre-existing CSP meta-tag console notice (`X-Frame-Options` via meta) — served by Netlify `_headers` in production; not a functional issue

## [2.5.0] — 2026-08-17

### Pricing (Master DB sync — August 2026 rebate campaign)
- **Atto 3 Ultra & Premium** — rebate RM10,000 → **RM14,000** (new default); second option "RM10,000 + FREE 6 Years Standard Service Package" retained as alternative
- **Sealion 7 Dynamic** — OTR RM171,109 → **RM171,519**; road tax RM290 → **RM200**; sum insured RM166,800 → **RM167,300**
- **Sealion 7 Premium** — rebate RM3,888 → **RM7,000**
- **Sealion 7 Performance** — rebate RM2,888 → **RM6,000**; road tax RM365 → **RM965**
- **JSON-LD** — dealer `priceRange` corrected to `RM106,000–RM213,000`
- All monthly instalments (home pricing table, vehicle cards, pricelist, calculator) auto-recalculated from the updated data; OTR-less-insurance math now matches Master DB `otrWithoutInsurance` for all 10 variants

### Fixed (pre-existing lint errors & latent bugs)
- **Modal** (`components/modal.tsx`) — removed synchronous setState-in-effect (`react-hooks/set-state-in-effect`); mount state now derived (`open || render`) with rAF-driven fade-out
- **Deep-link modal** (`app/page.tsx`) — `?calc=` handler defers `setSelectedId` to a `requestAnimationFrame`, avoiding cascading-render lint error; URL cleanup unchanged
- **Charging slider tooltips** (`components/charging-estimator.tsx`) — handle value bubbles read a ref during render (never re-rendered, so tooltips never appeared). Now driven by `dragging` state; tooltips work
- **`useInView`** (`lib/use-in-view.ts`) — options synced via ref-in-effect; observer no longer re-created per render (`react-hooks/exhaustive-deps` resolved)
- **Unescaped entities** — `you're` → `you&apos;re` in eligibility CTAs (`app/page.tsx`, `app/why-byd/page.tsx`)
- **Eligibility form** (`components/check-eligibility-form.tsx`) — removed fake `loading` state that toggled synchronously (spinner never rendered); submit is honest fire-and-forget

### Refactoring
- **`activeRebate(vehicle)` helper** (`lib/vehicles.ts`) — single source for "first promotion option else flat rebate", replacing 5 duplicated derivations across `vehicle-card`, `calculator`, `page`, `pricelist`
- **Shared `ResultBox`** (`components/result-box.tsx`) — extracted identical component from `charging-estimator` & `fuel-savings-calculator`
- **Calculator** — WhatsApp enquiry/booking `useMemo`s share one payload object; redundant `hasPromoOptions` in dep array removed; redundant ternary in rebate label removed
- **Hero avatar** — uses `priority` prop instead of raw `loading`/`fetchPriority` attrs
- **Fuel savings** — vehicle lookup via module-scope `Map` instead of per-render `find`; `lPer100` null-check cleanup

### Verification
- `tsc --noEmit` clean · `eslint` clean (was 6 errors / 3 warnings) · `next build` static export success
- Built HTML regression-checked: new OTR/rebates/monthlies present on `/` and `/pricelist`; modal fade, slider drag handlers and tooltip markup confirmed in client bundle

## [2.4.0] — 2026-08-01

### Mobile / Responsive
- **iOS zoom fix** — all form inputs/selects bumped to `text-base` (16px) so Safari no longer auto-zooms on focus
- **44px touch targets** — nav hamburger, calculator buttons, modal close, finance CTAs, map/list buttons, back links, charging slider handles (44px invisible wrappers with `pointer-events-none` visible thumb)
- **Hamburger navigation** below `sm` — 5 nav links replaced with a `Menu` toggle + dropdown (full-width `min-h-11` links) on mobile
- **Parking grid** — single column below 400px (`w-full min-[400px]:w-1/2`), 2-up above
- **Map buttons** — stack vertically below 420px (`flex-col min-[420px]:flex-row`)
- **Charging results** — single column below `sm` (`grid-cols-1 sm:grid-cols-3`)
- **Modal** — body scroll-lock while open, `max-h-[85dvh]`, close button 44px, callers own padding (calc `p-5 md:p-6`, legal `p-6`)
- **Tiny-text pass** — no text below 10px anywhere except the intentional hero badge (`text-[9px]` mobile); footer links, warranty badges, promo pills, pricelist breakdown labels, charging labels all bumped
- **Reduced motion** — `scroll-behavior: auto` added for `prefers-reduced-motion` users

### SEO
- **Fixed duplicate-canonical bug** — removed layout-level `alternates.canonical: "/"` which was leaking the root canonical onto every page
- **New `lib/use-page-meta.ts` client hook** — sets per-page title, meta description, path-based canonical (`https://bydmiri.com/<path>`), and OG title/url/description after hydration (required because all pages are `"use client"`)
- **Distinct meta** for Home, `/pricelist`, `/why-byd`
- **Sitemap** — `lastmod` refreshed to 2026-08-01 for all 3 URLs

### Security
- **Audit confirmed strong** — HSTS preload, nosniff, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy, COOP verified in `public/_headers`; no changes needed
- **External links** — verified 0 `target="_blank"` anchors missing `rel="noopener noreferrer"`

## [2.3.0] — 2026-07-09

### Added
- **Charging Profile Service** (`lib/charging-profiles.ts`) — fetches charging rates from Master Database (`charging.json`) instead of hardcoded values
- **Charging disclaimer** — "Charging costs are estimates only..." in charging estimator & Disclaimer modal
- **Charging disclaimer footer** — Charging cost/time estimates disclaimer in Disclaimer popup modal
- **Nav bar** — Home · Models · Calculator · Charge · Warranty · Contact Us (scroll-to-section, scroll-mt-24 offset)
- **Calculator button** (amber) in pricelist table — opens calculator modal for specific model via `?calc=` param
- **Eligibility form inline** on main page — toggle form without redirect
- **Keyboard focus indicators** — `focus-visible` emerald rings for accessibility
- **`scrollbar-none` utility** — hide scrollbar on nav while keeping scroll functionality
- **`scroll-mt-24`** — proper scroll offset for fixed nav on all sections

### Changed
- **Charging rates**: Removed hardcoded `AC_RATE`, `DC_RATE_MIN`, `DC_RATE_MAX` — now fetched from Master DB
- **DC cost**: Simplified to single rate (RM1.40/kWh) instead of range display
- **Energy Recouped**: Merged into Range Recouped as subtle kWh sub-text (+X.X kWh)
- **KM Recouped → Range Recouped**: Renamed for clarity
- **Battery Capacity**: Shows `X kWh (X km)` — range integrated inline
- **Wallbox → Wallbox (Home Charger)**: Clearer label in charger selector
- **Vehicle dropdown**: Sorted by defined order (Atto 2 → Seal 6 → ...)
- **Hero stats**: `grid-cols-4` → `grid-cols-2 md:grid-cols-4` for mobile
- **Hero stats font**: `text-[9px]` → `text-[11px]` mobile, larger labels
- **Hero subtitle**: `text-base` → `text-sm` mobile
- **Full Active Sales Lineup → Discover the Lineup. 6 Models, 9 Choices.**
- **Sales Consultant → Sales Advisor**
- **CSP/GSP/SSP footnote**: `(T&Cs apply)` → `(Terms & Conditions apply)`
- **Pricelist finance summary**: Simplified text, removed redundant finance details row
- **Nav**: Removed "Price List" link and gradient Contact button — Contact Us now in nav links
- **Pricelist page**: Title, subtitle, and calculator buttons synced with main page

### Fixed
- **aria-label template literal**: `{v.name}` rendering literally → proper interpolation
- **Mobile layout**: Nav overflow, stats grid breakage, charging results overflow
- **Scroll anchoring**: All section IDs have `scroll-mt-24` for fixed nav clearance

## [2.2.1] — 2026-07-09

### Performance
- **Removed framer-motion (170kB)** — replaced all 26 `motion.*` instances with pure CSS animations (`@keyframes fade-up`, `scale-in`, `fade-in`) and a lightweight `useInView` Intersection Observer hook. Bundle size reduced significantly.
- **Flattened Modal animation** — replaced `AnimatePresence` with CSS transitions for enter/exit (no library needed)
- **Removed `optimizePackageImports` for framer-motion** from Next.js config

### SEO
- **Page-specific titles** — added `document.title` updates on `/pricelist` and `/why-byd` for browser tabs

### Maintenance
- **Removed dead/unused code**:
  - `lib/use-in-view.ts` created (tiny custom hook, 24 lines)
  - `lib/theme.tsx` now empty placeholder (no-op wrapper removed earlier)
  - `next.config.ts` cleaned up comments referencing removed dependencies

## [2.2.0] — 2026-07-09

### Security
- **Form submission**: Changed from GET (sensitive data in URL) to POST with form-urlencoded body — data no longer exposed to server logs or browser history
- **Removed `Cross-Origin-Embedder-Policy: credentialless`** — fixed Safari resource-loading errors on iOS
- **Removed `Cross-Origin-Resource-Policy: same-origin`** — unblocked cross-origin resources (Google Maps embed, CDN fonts)

### Fixed
- **Redirect loop on iOS Safari** — disabled trailing-slash redirect in `_redirects` (caused infinite loop when Netlify normalized URLs alongside Next.js `trailingSlash: false`)
- **Table accessibility** — added `scope="col"` to all table header cells (`<th>`)

### Cleanup
- **Removed dead `ThemeProvider`** — no-op wrapper that just rendered `{children}`. Dark-only theme handled entirely via CSS variables.
- **Removed redundant `otrWithoutInsurance`** from vehicle data model and all 9 vehicle entries — field is derived from `sumInsured + roadTax + registration + plate + inspection`
- **Cleaned stale asset caching rules** in `_headers`

## [2.1.0] — 2026-07-05

### Added
- **Full Active Sales Lineup** page (`/pricelist`) — transparent pricing table with:
  - Body Price, Road Tax, Registration (RM60), EV Plate (RM150), B2 Inspection (RM200)
  - OTR without insurance, Insurance estimate, OTR Price
  - Rebate in red, Monthly estimate (10% down, 2.30%, 9yr)
  - Brochure link per model, mobile card layout
- **Pricelist section** on landing page — condensed table (Model → OTR → Rebate → Monthly)
- **Why BYD link** in hero section (subtle pill above "Browse Models")
- Vehicle data: `roadTax`, `sumInsured`, `otrWithoutInsurance` fields per model

### Changed
- **Landing page flow**: Hero → Browse Models → Full Price List → Calculate Your Monthly Payment → model cards
- **Nav**: Compact mobile layout (smaller logo, icon-only Why BYD, "Sales" text)
- **Hero**: "Browse Models" scrolls to Full Price List section (`#full-lineup`)
- **Section gap**: Reduced spacing between pricelist and vehicle cards
- **Blade Battery video link**: Updated to working YouTube URL
- **Blade Battery official link**: Fixed to byd.simemotors.my

### Infrastructure
- New route: `/pricelist` (static page)
- Branch: `staging/pricelist`

## [2.0.0] — 2026-07-05

### Added
- **Why BYD page** (`/why-byd`) — full-page brand advocacy with:
  - Blade Battery safety (nail puncture test, LFP chemistry, 500k km lifespan)
  - Industry-leading warranty (6yr vehicle + 8yr battery)
  - V2L standard across all models
  - World's #1 NEV manufacturer credentials
  - Sales advantages: Savings, Comfort, Technology, Silence, Family Usability, Instant Pickup
  - Curated comparisons: Atto 3 vs e.MAS 7, Seal vs Model 3, M6 category leadership
  - Data disclaimers (amber-highlighted)
- **Check Eligibility form** — discreet lead capture with:
  - Full name, phone, target car (dropdown), monthly income fields
  - Google Sheets integration via Google Apps Script (hidden popup submission)
  - Auto-defaults to currently selected model in calculator modal
  - Success state with WhatsApp follow-up message (24hrs)
- **Inline eligibility form** in calculator modal — "Not sure about loan eligibility? Check here"
- **Eligibility CTA** on main page (before footer) + on Why BYD page (bottom CTA)

### Changed
- **Nav**: "Why BYD" button (star icon, green ping dot, visible on all screen sizes)
- **All text**: Standardised to English throughout (form labels, hints, disclaimers)
- **Calculator modal**: Added eligibility check toggle below loan calculator

### Infrastructure
- New Google Apps Script web app for lead capture (`GOOGLE_APPS_SCRIPT.md`)
- Environment variable: `NEXT_PUBLIC_GSHEET_URL` for Google Script endpoint
- `.env.local` added to `.gitignore`
- Lead data schema: Timestamp, Name, Phone, Target Car, Monthly Salary, Source

## [1.5.0] — 2026-06-21

### Added
- CSP/GSP/SSP rebate toggle in calculator (cyan styling, default OFF)
- `cspRebate` field to Vehicle model — RM4,000 for Sealion 7, RM2,000 for all others
- CSP line in results panel: `(-) RM{cspAmount}`
- Footnote: "*CSP/GSP/SSP = Corporate/Government/Student Support Program (T&Cs apply)"
- `og:image` and `twitter:image` metadata for social share previews

### Changed
- `calculateFinance`: `effectivePrice = OTR - rebate - csp`
- `FinanceInput`/`FinanceResult`: added `cspRebate`, `cspEnabled`, `cspAmount`

## [1.4.0] — 2026-06-18

### Changed
- Default interest rate: 2.2% → **2.3%**
- Tenure options expanded: `[5, 7, 9]` → **`[2, 3, 4, 5, 6, 7, 8, 9]`**
- Calculator grid layout adjusted for 8 tenure buttons
- Disclaimer text updated to 2.3%

## [1.3.0] — 2026-06-18

### Added
- Reusable `Modal` component with AnimatePresence
- Security headers: CSP, X-Frame-Options, Permissions-Policy, X-Content-Type-Options
- Strict TypeScript flags: `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`
- Accessibility: ARIA labels, semantic HTML, role groups, skip-to-content link
- Performance: `fetchPriority="high"` on hero image, `compress: true`

### Changed
- Extracted WhatsApp logic to `lib/whatsapp.ts` (deduplicated)
- Simplified `ThemeProvider` to no-op (dark-only)
- Cleaned dead CSS, unused files, magic numbers
- Consolidated section IDs

## [1.2.0] — 2026-06-15

### Changed
- Vehicle card order: Atto 2 → Seal 6 → Atto 3 Ultra → Atto 3 Premium → Sealion 7 → Seal → M6

## [1.1.0] — 2026-06-15

### Added
- 9 BYD models with official images (Atto 2, Seal 6, Atto 3 Ultra/Premium, Sealion 7 Premium/Perf, Seal Premium/Perf, M6)
- Loan calculator with deposit (0-35%), tenure, interest rate controls
- WhatsApp enquiry & booking integration (Malay message templates)
- Animated hero with stats (9 models, 650km range, 0% deposit)
- Contact card: Ridzuan Jahari, phone, TikTok, Facebook links
- Responsive grid layout (3/4/7 columns) with dark theme

### Infrastructure
- Next.js 15, React, TypeScript, TailwindCSS, Framer Motion, Lucide React
- Static export (`output: "export"`)
- Font: Syne (geometric, modern)
- Color scheme: emerald green (`#00E676`), cyan, pink accents

## [1.0.0] — 2026-06-14

### Added
- Initial project scaffold from Create Next App
- Basic Next.js 15 setup with TypeScript and TailwindCSS
