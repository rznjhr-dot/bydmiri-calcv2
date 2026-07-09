# Changelog

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
