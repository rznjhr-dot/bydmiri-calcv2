import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import { ThemeProvider } from "@/lib/theme";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "BYD Miri Loan Calculator | Calculate Monthly Payment Online",
  description:
    "Calculate BYD monthly financing instantly. Compare deposit options, loan tenure and interest rates. Contact Ridzuan Jahari, BYD Miri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="dark" className={`h-full antialiased ${orbitron.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col font-sans bg-theme text-theme-90">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
