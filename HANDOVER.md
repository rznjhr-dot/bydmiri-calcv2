# Handover Notes — bydmiri-calcv2

Date: 2026-10-04
Repo: `/Users/ridzuanjahari/Desktop/projects/bydmiri-calcv2`
Branch: `main` (up to date with `origin/main`)
Last commit: `794dec0` — *v2.10.1: nav fixes — remove broken Calculator button, full navbar on why-byd, drop back-link footer*

## Status update (2026-10-04, second pass)

All 4 actionable items from the review below have been **implemented and verified**.
Nothing is committed yet. See "Fixes applied this pass" for evidence, then the remaining
"Not yet addressed" items.

## Added after review (2026-10-04)

Custom downpayment now shows its percentage of the full price — `components/calculator.tsx`.
When a custom RM amount is entered, a line appears under the field: `≈ N.N% of OTR price`.
Base is the **OTR price** (the "whole price" in the ledger), and the numerator is
`result.depositAmount` so it matches the ledger's Downpayment line when a custom amount is
capped at the net price. Hidden when the field is empty/zero or a % preset is active.

Verified: RM20,000 → 18.8% and RM50,000 → 47.0% on Atto 2 (OTR 106,353); overpay RM100,000 →
91.5% (capped deposit 97,353); clearing the field and clicking a preset both hide it.

## Stack (relevant facts)

- Next.js `16.2.9` (Turbopack), React `19.2.4`, Tailwind v4, TypeScript 5
- `output: "export"` — static export to Netlify CDN, no server runtime
- Runtime deps: `lucide-react`, `next`, `react`, `react-dom`. **No animation library, no test framework.**
- Bundle budget: no motion lib, only client-side IO reveals in `app/globals.css:434` (`.reveal`)

## Verification commands

```bash
npm run lint          # eslint (clean)
npx tsc --noEmit      # no typecheck script exists — use this
npm run build         # expect 3 static routes: /, /pricelist, /why-byd
```

All three passed at handover time.

## Working tree state — 4 uncommitted files

```
 M app/pricelist/page.tsx
 M components/vehicle-card.tsx
 M components/fuel-savings-calculator.tsx
 M components/hero.tsx
 M components/charging-estimator.tsx
```

(The first two are the responsive/label fixes from the earlier pass; the last three are this pass's fixes.)

## Fixes applied this pass (all verified)

### 1. L/100km field is now editable — `components/fuel-savings-calculator.tsx`

Added an `l100Draft` state: while typing, the field shows the user's raw text; on blur the
draft clears and the field reverts to the derived value. The write-back to `iceKmPerL` is
now rounded (`Number((100 / v).toFixed(2))`), and editing km/L clears the draft.

Verified with the same per-character Playwright trace that reproduced the bug. Typing `7.5`:

| typed | L/100km field | km/L field |
| ----- | ------------- | ---------- |
| (init) | `8.3` | `12` |
| `7` | `7` | `14.29` |
| `.` | `7.` | `14.29` |
| `5` | **`7.5`** | **`13.33`** |
| after blur | `7.5` | `13.33` |

Before the fix the same input produced `7.0` with `14.285714285714286` in km/L. Decimals
now survive and the mirror field no longer shows float garbage.

### 2. Carousel dots now meet the touch-target minimum — `components/hero.tsx`

Dot buttons got a `::before` hit area: `before:absolute before:inset-x-[-2px]
before:inset-y-[-12px]`. Visual bar stays 4px tall; the hit region is 28px.

Verified by real hit-testing (`document.elementFromPoint`): the point resolves to the dot
button from −12px to +12px around the bar centre and misses at ±14px. Note: `scrollTo(0,0)`
needs `scroll-behavior: auto` first — the global CSS sets `scroll-behavior: smooth`, so
probes run mid-animation otherwise.

### 3. Carousel can be paused; respects reduced motion — `components/hero.tsx`

- Added a pause/play toggle (`aria-label` swaps "Pause slideshow" / "Play slideshow").
- Auto-advance pauses on hover and while focus is inside the carousel.
- `prefers-reduced-motion: reduce` disables auto-rotation entirely (tracked via
  `matchMedia` with a change listener).

Verified: pause → active dot stable across 7s; resume with cursor off the hero → advanced;
hover → stable across 7s; `reducedMotion: reduce` → stable across 7s.

### 4. Charging estimator no longer breaks when remote data is down — `components/charging-estimator.tsx`

Added `fallbackOptions()` built from bundled `lib/vehicles.ts`, with ids produced by a
single shared `optionId(label)` helper also used by the remote `flattenVariants()` path.
That removes a drift risk flagged in review (the two paths previously slugified the id
independently, and `OPTION_ORDER.indexOf` fails silently with `-1`). The fetch now treats
non-OK responses and empty payloads as failures and falls back.

Verified by aborting all requests to `bydmiri-data.netlify.app` and reloading: no "Unable to
load vehicle data." message, not stuck loading, and all 10 models render in the correct order
(default select `atto-2-premium`). Also asserted `optionId(label) === OPTION_ORDER[i]` for
all 10 entries.

## Environment gotchas (cost real time — read this first)

1. **Port 3000 is occupied by a *different* project** (PID `2640`, "RJ Master Databook").
   `npm run dev` falls back to **port 3001**. The app on 3000 looks superficially similar
   (BYD Miri pricelist) but is unrelated code — verifying against 3000 silently tests the
   wrong app. Always confirm which port the dev server printed.
2. **This model cannot read screenshots.** Verify layout via DOM assertions in
   `page.evaluate` (`getBoundingClientRect`, `innerText`, `scrollWidth > clientWidth`)
   instead of taking screenshots.
3. **`npm run build` fails intermittently on a Google Fonts fetch.** `next/font/google`
   (Geist Mono in `app/layout.tsx`) resolves fonts.googleapis.com at build time and
   occasionally errors with 12 `Module not found: @vercel/turbopack-next/internal/font/google/font`.
   This is a transient network issue, **not a code error** — re-run the build and it passes.
   Never conclude a change broke the build from a single font-fetch failure.
4. `favicon.ico` 404 appears in console on every page — harmless, ignore it.
5. `out/` and `.next/` are stale build artifacts from Aug 25 — ignore when assessing state.
6. `app/globals.css:10` sets `scroll-behavior: smooth`, so `window.scrollTo(0, 0)` animates.
   For deterministic DOM probes, set `document.documentElement.style.scrollBehavior = "auto"`
   first, or read positions mid-animation and get nonsense.

## Original review findings (all 4 below are now fixed — kept for context)

### 1. `components/fuel-savings-calculator.tsx:282-301` — L/100km field is effectively uneditable

Highest priority. User-facing, verified reproducible in browser.

The L/100km input is a *derived* controlled input whose `onChange` writes straight back to
the km/L source state, with no local draft. React therefore rewrites the field's value on
every keystroke.

Playwright trace, typing `7.5` into the L/100km field:

| typed  | L/100km field | km/L field              |
| ------ | ------------- | ----------------------- |
| (init) | `8.3`         | `12`                    |
| `7`    | `7.0`         | `14.285714285714286`    |
| `.`    | `7.0` (swallowed) | unchanged            |
| `5`    | `7.0` (`"5"` lost) | `14.184397163120568` |

Net: user types `7.5`, gets `7.0`. Decimal point is unreachable, nothing past 1 decimal
place can be entered, and the km/L mirror field displays raw float garbage.

Fix direction: hold a local draft string for the L/100km field, commit on blur/Enter, and
round when writing back — `setIceKmPerL(String(Number((100 / v).toFixed(2))))` instead of
the current `String(100 / v)`. Alternatively make it uncontrolled with `defaultValue` +
`onBlur` commit. Verify by re-running a per-character trace; a naive fix still swallows
the decimal.

### 2. `components/hero.tsx:196-198` — carousel dots fail minimum touch target

Dots are `h-1 w-4` / `h-1 w-8` = **4px tall** × 16/32px. WCAG 2.5.8 requires ≥24×24 CSS px.
Prev/next buttons at `hero.tsx:175` and `hero.tsx:182` are fine (`w-11 h-11` = 44px) — only
the dots fail. Fix by growing the hit area (padding or a pseudo-element), not by changing
the visual bar size.

### 3. `components/hero.tsx:72-75` — auto-rotating carousel with no pause control

Content swaps every 6s via `setInterval`. No pause button, no pause on hover/focus, no
reduced-motion guard on the rotation. Fails WCAG 2.2.2 (Pause, Stop, Hide).
`motion-safe:` is applied to the *transition* (`hero.tsx:89`) but not to the rotation
itself, so reduced-motion users still get content changing under them.

## Moderate

4. **`components/charging-estimator.tsx:138-150` — FIXED this pass.** Now falls back to
   bundled `lib/vehicles.ts` when the remote host is unreachable or returns a bad payload.
5. **`components/hero.tsx:93-100` — all 5 hero images load immediately.** `loading="lazy"`
   is ineffective because every slide is `absolute inset-0` inside the viewport. That is
   ~417KB of hero webp on mobile first paint. Fix by mounting only the active slide (plus
   adjacent) instead of rendering all five.
6. **`components/calculator.tsx:86-137`, `:161-174`, `:229-242` — toggles lack `aria-pressed`.**
   Rebate and CSP toggles convey state only through colour and a checkmark glyph; deposit
   % and tenure groups have `role="group"` but their buttons have no `aria-pressed`. Screen
   readers cannot tell what is selected.
7. **`components/calculator.tsx:25,33` + `lib/finance.ts:37` — negative interest rate not clamped.**
   Typing `-5` passes `parseFloat(interestRate) || 0` straight through, producing a
   negative `totalInterest` and a monthly below principal/n. `min="0"` only constrains the
   spinner, not typed input.

## Minor

8. **`components/calculator.tsx:267` — asymmetric row-visibility logic.** Rebate row renders
   when `hasPromoOptions || rebateOn`, so Atto 3 with the rebate toggled off still shows
   "Rebate : (-) 0.00". The CSP row uses a different condition (`cspOn || vehicle.cspRebate === 0`).
9. **`app/pricelist/page.tsx:220` — Insurance is a derived plug** (`v.otr - otrWO`). Currently
   lands at a consistent ~2.1–2.24% of `sumInsured` across all 10 models, so the data is
   deliberate — but any future OTR or `sumInsured` edit silently changes the insurance
   figure with no validation. Consider a stored field or a comment documenting the ratio.

## Reviewed and clean

- `lib/finance.ts` — flat-rate interest math is correct for MY car-loan convention;
  deposit clamping via `Math.min(customDeposit, effectivePrice)` at `:32` prevents over-deposit
- `lib/vehicles.ts` — `activeRebate()` correctly handles the mutually-exclusive
  `promotionOptions` (Atto 3) case; card math stays consistent with the first option
- `lib/use-in-view.ts` — options synced in an effect, observer unobserves after first hit
- `components/modal.tsx:80-88` — body scroll lock restores prior value correctly
- `app/globals.css:296` — `prefers-reduced-motion` guard exists as a pattern to follow

## Suggested next steps

Done this pass: the 4 actionable items (#1 L/100km field, #2 dot touch target, #3 carousel
pause + reduced motion, #4 remote-data fallback) — all implemented and verified above.

Remaining, in rough priority:

1. **Commit the 5 modified files** — nothing from either pass is committed yet. Confirm with
   the user first; `HANDOVER.md` is currently untracked and may or may not belong in the commit.
2. Fix #5 (hero images all eager) — real mobile perf win (~417KB on first paint).
3. Fix #6 (`aria-pressed` on calculator toggles) — accessibility.
4. Fix #7 (clamp negative interest rate) — correctness edge case.
5. Minor #8, #9 as polish.