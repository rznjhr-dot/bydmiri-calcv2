import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Charging, Savings & Warranty",
  description:
    "BYD charging time and cost, fuel savings calculator, and 6+8 year warranty details for Miri, Sarawak. Estimate home charging costs and see what an EV saves you.",
  alternates: {
    canonical: "/charging",
  },
  openGraph: {
    title: "Charging, Savings & Warranty | BYD Miri, Sarawak",
    description:
      "Estimate BYD charging time and cost, compare fuel vs EV running costs, and review the 6+8 year warranty — for buyers in Miri, Sarawak.",
    url: "/charging",
  },
};

export default function ChargingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
