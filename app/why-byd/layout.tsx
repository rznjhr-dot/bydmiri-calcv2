import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why BYD?",
  description:
    "Why choose BYD? Blade Battery safety, 6+8 year warranty, V2L technology, and honest comparisons vs competitors. BYD Miri, Sarawak.",
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
