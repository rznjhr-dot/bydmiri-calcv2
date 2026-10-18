import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const baseUrl = "https://bydmiri.com";

/* Direction 01 · Minimal — the 2+1 pairing, canonical:
   Geist display/body + Geist Mono as the data outlier.
   Premium comes from weight contrast (300 vs 600), not decoration. */
const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

/* Conthrax — used ONLY for model names (hero caption + vehicle card title). */
const conthrax = localFont({
  src: "./../conthrax/Conthrax-SemiBold.otf",
  variable: "--font-conthrax",
  display: "swap",
});

export const metadata: Metadata = {
  // ── Primary Meta ──
  title: {
    default: "BYD Miri, Sarawak — Test Drive, Price & Financing",
    template: "%s | BYD Miri, Sarawak",
  },
  description:
    "Authorised BYD dealer in Miri, Sarawak. Compare 10 models with prices from RM106,353 and monthly instalments from RM979. Test drive at our Miri showroom, plus trade-in and 8-year battery warranty.",

  // ── Keywords ──
  keywords: [
    "BYD Miri",
    "BYD Sarawak",
    "test drive BYD Miri",
    "BYD price Sarawak",
    "BYD dealer Miri",
    "BYD showroom Miri",
    "BYD loan calculator",
    "BYD monthly payment",
    "BYD financing Miri",
    "BYD Atto 3 price Sarawak",
    "BYD Seal price Malaysia",
    "BYD Sealion 7 Malaysia",
    "BYD M6 Malaysia",
    "kereta EV Miri",
    "buy BYD Miri Sarawak",
    "BYD Bintulu",
    "BYD Limbang",
    "BYD Lawas",
    "BYD Kah Progression Auto",
    "BYD warranty Malaysia",
  ],

  // ── Authorship ──
  authors: [{ name: "Ridzuan Jahari · BYD Miri" }],
  creator: "Ridzuan Jahari",
  publisher: "Ridzuan Jahari",

  // ── Canonical ──
  // NOTE: canonical is set per-page via nested layout.tsx files
  // (pricelist/layout.tsx, why-byd/layout.tsx) using alternates.canonical.
  // A layout-level canonical would incorrectly point every page at the root URL.
  metadataBase: new URL(baseUrl),

  // ── OpenGraph ──
  openGraph: {
    title: "BYD Miri, Sarawak — Test Drive, Price & Financing",
    description:
      "Authorised BYD dealer in Miri, Sarawak. 10 models, prices from RM106,353, monthly from RM979. Test drive at our Miri showroom, with warranty support across Sarawak.",
    url: baseUrl,
    siteName: "BYD Miri & Sarawak",
    locale: "en_MY",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BYD Miri — Test Drive, Price & Financing in Sarawak",
      },
    ],
  },

  // ── Twitter ──
  twitter: {
    card: "summary_large_image",
    title: "BYD Miri by Ridzuan Jahari",
    description:
      "Calculate BYD monthly financing instantly. Compare 10 models, deposit, tenure & rates. Contact Ridzuan Jahari, BYD Miri.",
    images: ["/og-image.png"],
  },

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons ──
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },

  // ── Manifest ──
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f1512" },
    { media: "(prefers-color-scheme: light)", color: "#f7faf8" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="dark" className={`h-full antialiased ${geist.variable} ${geistMono.variable} ${conthrax.variable}`}>
      <head>
        {/* ── Body font — Geist 400 base; light display cuts handled in CSS ── */}
        <style
          dangerouslySetInnerHTML={{
            __html: `body{font-family:var(--font-geist),ui-sans-serif,system-ui,sans-serif;font-weight:400;}`,
          }}
        />
        {/* ── Security Headers (meta tags) ── */}
        {/* These supplement the Netlify _headers file for defense-in-depth.
             The _headers file is the primary mechanism — these catch any
             environment where _headers may not apply (e.g., dev server). */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://i.ytimg.com https://img.youtube.com; font-src 'self' data:; frame-src https://www.google.com https://www.youtube-nocookie.com https://www.youtube.com; connect-src 'self' https://script.google.com https://bydmiri-data.netlify.app"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta name="permissions-policy" content="camera=(), microphone=(), geolocation=(), payment=()" />
      </head>
      <body className="min-h-full flex flex-col bg-theme text-theme-90">
        {/* ── Skip-to-content (keyboard users) ── */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-600 focus:text-white focus:text-sm focus:font-bold focus:outline-none"
        >
          Skip to main content
        </a>

        {children}

        {/* ── Structured Data — JSON-LD ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["AutoDealer", "LocalBusiness"],
                  "@id": "https://bydmiri.com/#organization",
                  name: "BYD Miri",
                  url: "https://bydmiri.com",
                  logo: "https://bydmiri.com/byd-logo.png",
                  image: "https://bydmiri.com/byd-logo.png",
                  description:
                    "BYD Miri — authorised BYD dealership in Miri, Sarawak. New energy vehicle sales, financing, and after-sales service.",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Lot 1829, Jalan Krokop Utama",
                    addressLocality: "Miri",
                    addressRegion: "Sarawak",
                    postalCode: "98000",
                    addressCountry: "MY",
                  },
                  telephone: "+6011-31933930",
                  priceRange: "RM106,000–RM213,000",
                  currenciesAccepted: "MYR",
                  knowsLanguage: ["en", "ms"],
                  areaServed: [
                    { "@type": "City", name: "Miri" },
                    { "@type": "City", name: "Bintulu" },
                    { "@type": "City", name: "Limbang" },
                    { "@type": "City", name: "Lawas" },
                    { "@type": "City", name: "Marudi" },
                    { "@type": "AdministrativeArea", name: "Sarawak" },
                  ],
                  containsPlace: {
                    "@type": "Place",
                    name: "BYD Miri Showroom",
                    address: {
                      "@type": "PostalAddress",
                      streetAddress: "Lot 1829, Jalan Krokop Utama",
                      addressLocality: "Miri",
                      addressRegion: "Sarawak",
                      postalCode: "98000",
                      addressCountry: "MY",
                    },
                    geo: {
                      "@type": "GeoCoordinates",
                      latitude: 4.4279602,
                      longitude: 114.0020263,
                    },
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+6011-31933930",
                    contactType: "sales",
                    areaServed: ["MY", "Sarawak", "Miri", "Bintulu", "Limbang", "Lawas"],
                    availableLanguage: ["en", "ms"],
                  },
                  openingHoursSpecification: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ],
                    opens: "08:30",
                    closes: "17:30",
                  },
                  sameAs: [
                    "https://web.facebook.com/ridzuanbydmiri",
                    "https://www.tiktok.com/@ridzuanbydmiri",
                    "https://wa.me/601131933930",
                  ],
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "BYD Electric Vehicles",
                    itemListElement: [
                      { "@type": "Offer", priceCurrency: "MYR", price: "106353", itemOffered: { "@type": "Car", name: "BYD Atto 2 Premium" } },
                      { "@type": "Offer", priceCurrency: "MYR", price: "122552", itemOffered: { "@type": "Car", name: "BYD Seal 6 Premium" } },
                      { "@type": "Offer", priceCurrency: "MYR", price: "132729", itemOffered: { "@type": "Car", name: "BYD Atto 3 Ultra" } },
                      { "@type": "Offer", priceCurrency: "MYR", price: "146228", itemOffered: { "@type": "Car", name: "BYD Atto 3 Premium" } },
                      { "@type": "Offer", priceCurrency: "MYR", price: "171519", itemOffered: { "@type": "Car", name: "BYD Sealion 7 Dynamic" } },
                      { "@type": "Offer", priceCurrency: "MYR", price: "197147", itemOffered: { "@type": "Car", name: "BYD Sealion 7 Premium" } },
                      { "@type": "Offer", priceCurrency: "MYR", price: "213073", itemOffered: { "@type": "Car", name: "BYD Sealion 7 Performance" } },
                      { "@type": "Offer", priceCurrency: "MYR", price: "179879", itemOffered: { "@type": "Car", name: "BYD Seal Premium" } },
                      { "@type": "Offer", priceCurrency: "MYR", price: "200904", itemOffered: { "@type": "Car", name: "BYD Seal Performance" } },
                      { "@type": "Offer", priceCurrency: "MYR", price: "130729", itemOffered: { "@type": "Car", name: "BYD M6 Extended" } },
                    ],
                  },
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://bydmiri.com/#faq",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "Is there a BYD dealer in Miri, Sarawak?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. BYD is represented in Miri, Sarawak by Kah Progression Auto, an authorised BYD dealer. Sales, financing, test drives and after-sales support are handled locally by Ridzuan Jahari at the Miri showroom on Jalan Krokop Utama.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How much does a BYD cost in Sarawak?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "BYD prices in Sarawak start from RM106,353 OTR for the Atto 2 Premium and go up to RM213,073 for the Sealion 7 Performance. Monthly instalments start from around RM979 at 10% down over 9 years at 2.3%.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Can I test drive a BYD in Miri?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. Test drives are held at the BYD Miri showroom on Jalan Krokop Utama. Contact Ridzuan to set an appointment at your convenience, and bring your IC and driving licence; a session takes about 30 minutes.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Can a BYD drive from Miri to Bintulu on one charge?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. Miri to Bintulu is about 200 km, well within the 410 km to 650 km range of BYD models sold in Sarawak. A charge adds roughly 246 km of range in under five hours on a 7 kW home wallbox.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What warranty do BYD cars have in Malaysia?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "All BYD models sold in Malaysia carry a 6-year or 150,000 km vehicle warranty and a separate 8-year or 160,000 km High-Voltage Blade Battery warranty, with a guaranteed minimum 70% state of health.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Is servicing available in Miri or must I go to Kuching?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Servicing is done at authorised BYD service centres, so Miri owners do not need to send their car to Kuching. Kah Progression Auto coordinates warranty and service work locally.",
                      },
                    },
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://bydmiri.com/#website",
                  url: "https://bydmiri.com",
                  name: "BYD Miri Loan Calculator",
                  description:
                    "Calculate your BYD monthly payment instantly. Compare 10 BYD models, deposit options, loan tenure, and interest rates.",
                  publisher: { "@id": "https://bydmiri.com/#organization" },
                  inLanguage: "en-MY",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://bydmiri.com/?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
