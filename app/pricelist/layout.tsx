import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Price List",
  description:
    "Full BYD price list Malaysia 2026 — OTR prices, rebates, and monthly instalments for every BYD model. Transparent pricing from BYD Miri, Sarawak.",
  alternates: {
    canonical: "/pricelist",
  },
};

export default function PricelistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
