import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why BYD?",
  description:
    "BYD in Miri through authorised dealer Kah Progression Auto. Blade Battery safety, 6+8 year warranty, charging in Sarawak and honest comparisons, with prices from RM106,353.",
  alternates: {
    canonical: "/why-byd",
  },
};

export default function WhyBydLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
