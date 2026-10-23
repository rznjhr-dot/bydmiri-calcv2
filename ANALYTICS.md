# Analytics

GA4 Measurement ID: **G-7EFNV0NK09**  
Property: BYD Miri Website  
Stream: https://bydmiri.com

## What is tracked

| Event | When it fires | Parameters |
|---|---|---|
| `page_view` | Every page load | automatic |
| `model_click` | A model card or its calculator button is clicked | `model`, `location` |
| `calculator_open` | The instalment calculator opens | `model`, `location` |
| `calculator_use` | First input change inside the calculator | `model` |
| `book_test_drive_click` | A book-a-test-drive CTA is clicked | `location` |
| `test_drive_submit` | The test drive form is submitted | `model`, `preferred_time`, `has_date` |
| `whatsapp_click` | A WhatsApp CTA is clicked | `location` |
| `phone_click` | A phone number is tapped | `location` |
| `model_filter` | A lineup filter is selected | `filter` |
| `faq_open` | A FAQ item is opened | `question` |
| `eligibility_submit` | The loan eligibility form is submitted | `model` |

No names, phone numbers or income are sent to Analytics.

## Register the parameters in GA4

Do this once so the parameters appear as report dimensions:

1. GA4 → **Admin** → **Custom definitions** → **Custom dimensions** → **Create custom dimension**
2. Create these four **event-scoped** dimensions:

| Dimension name | Event parameter | Scope |
|---|---|---|
| Model | `model` | Event |
| CTA location | `location` | Event |
| Model filter | `filter` | Event |
| Preferred time | `preferred_time` | Event |

GA4 can take up to 24 hours to populate them.

## Where to see the numbers

### Users and traffic sources
**Reports → Acquisition → Traffic acquisition**

- Users and sessions by **Session source / medium** and **Session campaign**.
- Add a secondary dimension for **Session source platform** if needed.

### Devices
**Reports → User → Tech details**

- Device category, operating system, browser and screen resolution.

### Most clicked models
**Reports → Engagement → Events → `model_click`**

- Add **Model** as the dimension.
- `location` tells you whether the click came from the lineup or the pricelist.

### Most calculated models
**Reports → Engagement → Events → `calculator_use`**

- Add **Model** as the dimension.
- `calculator_open` shows interest; `calculator_use` shows actual calculation activity.

### Test drive and WhatsApp conversions
Mark these as key events once they appear in **Admin → Events → Recent events**:

- `test_drive_submit`
- `whatsapp_click`

Use the star next to the event name. They will then appear under **Reports → Engagement → Key events**.

## Campaign links

Use these links in bios, posts and offline material so Google can attribute the visit.

| Source | Link |
|---|---|
| Facebook bio/post | `https://bydmiri.com/?utm_source=facebook&utm_medium=social&utm_campaign=profile` |
| TikTok bio | `https://bydmiri.com/?utm_source=tiktok&utm_medium=social&utm_campaign=bio` |
| WhatsApp status | `https://bydmiri.com/?utm_source=whatsapp&utm_medium=social&utm_campaign=status` |
| Google Business Profile | `https://bydmiri.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp` |
| Showroom QR code | `https://bydmiri.com/?utm_source=qr&utm_medium=offline&utm_campaign=showroom` |

Without a UTM tag, in-app traffic from WhatsApp, Facebook and TikTok is usually recorded as **direct**.

## Build a model-interest report

1. **Explore → Blank exploration**
2. Add dimension **Model**.
3. Add metric **Event count**.
4. Add a filter: **Event name** = `model_click`.
5. Duplicate the tab and change the filter to `calculator_use`.

Save it as **Model interest**.

## Key event status

`test_drive_submit` and `whatsapp_click` are firing and returning HTTP 204 from Google. GA4 only allows them to be starred after they appear in the event table, which can take up to 24 hours. Once they appear, star them in **Admin → Events → Recent events**.
