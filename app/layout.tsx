import type { Metadata, Viewport } from "next";
import { Syne } from "next/font/google";
import { ThemeProvider } from "@/lib/theme";
import "./globals.css";

const baseUrl = "https://bydmiri.com";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  // ── Primary Meta ──
  title: {
    default: "BYD Miri by Ridzuan Jahari",
    template: "%s | BYD Miri",
  },
  description:
    "Calculate BYD monthly financing instantly in Miri, Sarawak. Compare 9 BYD models, deposit options, loan tenure & interest rates. Contact Ridzuan Jahari for accurate assessment.",

  // ── Keywords ──
  keywords: [
    "BYD Miri",
    "BYD loan calculator",
    "BYD Malaysia price",
    "BYD monthly payment",
    "BYD financing Miri",
    "BYD Atto 3 price Malaysia",
    "BYD Seal price Malaysia",
    "BYD Sealion 7 Malaysia",
    "BYD M6 Malaysia",
    "kereta EV Miri",
    "buy BYD Miri Sarawak",
    "BYD dealership Miri",
    "BYD Sime Motors",
    "BYD Miri contact",
  ],

  // ── Authorship ──
  authors: [{ name: "Ridzuan Jahari · BYD Miri" }],
  creator: "Ridzuan Jahari",
  publisher: "Ridzuan Jahari",

  // ── Canonical ──
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },

  // ── OpenGraph ──
  openGraph: {
    title: "BYD Miri by Ridzuan Jahari",
    description:
      "Calculate BYD monthly financing instantly. Compare 9 models, deposit options, loan tenure & interest rates. Contact Ridzuan Jahari, BYD Miri.",
    url: baseUrl,
    siteName: "BYD Miri Loan Calculator",
    locale: "en_MY",
    type: "website",
    images: [
      {
        url: "/byd-logo.png",
        width: 512,
        height: 512,
        alt: "BYD Miri",
      },
    ],
  },

  // ── Twitter ──
  twitter: {
    card: "summary_large_image",
    title: "BYD Miri by Ridzuan Jahari",
    description:
      "Calculate BYD monthly financing instantly. Compare 9 models, deposit, tenure & rates. Contact Ridzuan Jahari, BYD Miri.",
    images: ["/byd-logo.png"],
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
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="dark" className={`h-full antialiased ${syne.variable}`}>
      <head>
        {/* ── Security Headers (meta tags) ── */}
        {/* These supplement the Netlify _headers file for defense-in-depth.
             The _headers file is the primary mechanism — these catch any
             environment where _headers may not apply (e.g., dev server). */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; frame-src https://www.google.com; connect-src 'self' https://script.google.com; form-action 'self' https://script.google.com"
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-emerald-500 focus:text-white focus:text-sm focus:font-bold focus:outline-none"
        >
          Skip to main content
        </a>

        <ThemeProvider>{children}</ThemeProvider>

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
                  priceRange: "RM100,000–RM210,000",
                  currenciesAccepted: "MYR",
                  knowsLanguage: ["en", "ms"],
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+6011-31933930",
                    contactType: "sales",
                    areaServed: "MY",
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
                      { "@type": "Offer", itemOffered: { "@type": "Product", name: "BYD Atto 2" } },
                      { "@type": "Offer", itemOffered: { "@type": "Product", name: "BYD Atto 3" } },
                      { "@type": "Offer", itemOffered: { "@type": "Product", name: "BYD Seal" } },
                      { "@type": "Offer", itemOffered: { "@type": "Product", name: "BYD Sealion 7" } },
                      { "@type": "Offer", itemOffered: { "@type": "Product", name: "BYD Seal 6" } },
                      { "@type": "Offer", itemOffered: { "@type": "Product", name: "BYD M6" } },
                    ],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://bydmiri.com/#website",
                  url: "https://bydmiri.com",
                  name: "BYD Miri Loan Calculator",
                  description:
                    "Calculate your BYD monthly payment instantly. Compare 9 BYD models, deposit options, loan tenure, and interest rates.",
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
