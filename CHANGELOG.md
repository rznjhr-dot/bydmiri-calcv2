# Changelog

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
