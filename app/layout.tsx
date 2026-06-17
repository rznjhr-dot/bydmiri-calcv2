import type { Metadata } from "next";
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
  title: "BYD Miri Loan Calculator | Calculate Monthly Payment Online",
  description:
    "Calculate BYD monthly financing instantly in Miri, Sarawak. Compare 9 BYD models, deposit options, loan tenure & interest rates. Contact Ridzuan Jahari for accurate assessment.",
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
  authors: [{ name: "Ridzuan Jahari · BYD Miri" }],
  creator: "Ridzuan Jahari",
  publisher: "Ridzuan Jahari",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BYD Miri Loan Calculator — Your Monthly Payment in Seconds",
    description:
      "Calculate BYD monthly financing instantly. Compare 9 models, deposit options, loan tenure & interest rates. Contact Ridzuan Jahari, BYD Miri.",
    url: baseUrl,
    siteName: "BYD Miri Loan Calculator",
    locale: "en_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BYD Miri Loan Calculator — Your Monthly Payment in Seconds",
    description:
      "Calculate BYD monthly financing instantly. Compare 9 models, deposit, tenure & rates. Contact Ridzuan Jahari, BYD Miri.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="dark" className={`h-full antialiased ${syne.variable}`}>
      <head>
        {/* Security */}
        {/* Security headers */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; frame-src https://www.google.com; connect-src 'self'; form-action 'self'"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta name="theme-color" content="#050505" />
        <meta name="permissions-policy" content="camera=(), microphone=(), geolocation=(), payment=()" />
      </head>
      <body className="min-h-full flex flex-col bg-theme text-theme-90">
        {/* Skip-to-content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-emerald-500 focus:text-white focus:text-sm focus:font-bold focus:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider>{children}</ThemeProvider>

        {/* Structured Data — JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "AutoDealer",
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
                  ],
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
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
