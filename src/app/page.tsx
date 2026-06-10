import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import WhyFlyChina from "@/components/home/WhyFlyChina";
import TourPackagesPreview from "@/components/home/TourPackagesPreview";
import HowItWorks from "@/components/home/HowItWorks";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  // `title.template` from the root layout does NOT apply to the root page
  // (same route segment), so brand it explicitly with `absolute`.
  title: { absolute: "Wholesale Sourcing Tours to Guangzhou | Fly China" },
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <WhyFlyChina />
      <TourPackagesPreview />
      <HowItWorks />
      <CTASection />
    </main>
  );
}
