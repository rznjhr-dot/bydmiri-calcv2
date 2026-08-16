# Changelog

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
