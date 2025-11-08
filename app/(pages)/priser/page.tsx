import type { Metadata } from "next";
import { PricingGrid } from "@/components/pricing-grid";
import { CtaBanner } from "@/components/cta-banner";

export const metadata: Metadata = {
  title: "Priser",
  description: "Sæsonpriser for Skovkrogen 37 med mulighed for fleksible ophold og skræddersyede fiskepakker.",
  alternates: {
    canonical: "/priser"
  }
};

export default function PriserPage(): JSX.Element {
  return (
    <div className="space-y-6 bg-secondary py-16">
      <PricingGrid />
      <CtaBanner />
    </div>
  );
}
