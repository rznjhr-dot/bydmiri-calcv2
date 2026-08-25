# Image Credits

All vehicle photos on this site are sourced from two places:

1. **Official Sime Motors Malaysia homepage key visuals** (`byd.simemotors.my`) —
   1920×1082 pixels, purpose-built for desktop hero use, dealer marketing OK.
2. **Sime Motors Malaysia BYD brochures** — dealer marketing use permitted.
3. A few fallback assets from BYD EU Image Bank (Wikimedia Commons CC BY-SA 4.0).

## Hero carousel (5 slides + 4 trim variants)

| Slide | File used | Source |
|---|---|---|
| Atto 3 Premium | `hero/atto3premium.jpg` | Sime Motors MY — `atto3_homepage_desktop_3.jpg` |
| Sealion 7 (all 3 trims) | `hero/sealion7*.jpg` | Sime Motors MY — `sealion7_homepage_desktop.jpg` |
| M6 Extended | `hero/m6.jpg` | 2026 BYD M6 brochure cover (no Sime homepage KV currently published) |
| BYD Seal (Premium + Performance) | `hero/seal*.jpg` | Sime Motors MY — `SEAL_homepage_KV_desktop.jpg` |
| BYD Seal 6 Premium | `hero/seal6premium.jpg` | Sime Motors MY — `BYD_SEAL_6_Homepage_D.jpg` |
| Atto 2 | `hero/atto2.jpg` | Sime Motors MY — `BYD_ATTO_2_homepage_desktop.jpg` |

## Model cards (lineup grid)

Mirrors of hero slots at lighter weight. Each card uses the matching
hero photo (browser `object-cover` handles the 16:9 crop).

## Sources verified (2026-08-25)

- BYD Sime Motors Malaysia — official distributor (`byd.simemotors.my`)
- BYD UK Press Packs (`bydukmedia.com`) — secondary, alternative angles
- BYD EU Image Bank — `[Wikimedia Commons CC BY-SA 4.0]`

## Known limitations

- **M6** currently uses brochure cover as no Sime homepage KV is published.
- **Sealion 7** has only ONE hero shot — all three trims (premium/dynamic/
  performance) reuse it. When BYD publishes per-trim KVs, update.

## Replace these when better photos arrive

The following trims don't yet have unique photos (they reuse another trim):

- `sealion7performance` → reuses `sealion7premium`
- `sealion7dynamic` → reuses `sealion7premium`

When Sime Motors publishes per-trim KVs, run:

```bash
# 1. Add new images to public/images/hero/{car-id}.jpg
# 2. Verify dimensions are 1920×1082 (or close):
file public/images/hero/*.jpg | grep "<car-id>"
# 3. Update hero.tsx SLIDES array
# 4. Update this CREDITS.md
```

## License summary

- Official Sime Motors Malaysia homepage assets and brochures — dealer
  marketing use permitted under your distributor relationship
- BYD UK Press Packs — editorial use permitted under press agreement
- BYD EU Image Bank — CC BY-SA 4.0 (Wikimedia Commons, attribution
  preserved per Wikimedia image page)
- All other photography — owned by Ridzuan Jahari, BYD Miri
