import HeroSection from "@/components/home/HeroSection";
import WhyFlyChina from "@/components/home/WhyFlyChina";
import TourPackagesPreview from "@/components/home/TourPackagesPreview";
import HowItWorks from "@/components/home/HowItWorks";
import CTASection from "@/components/home/CTASection";

// No page-level title override — the homepage uses the root layout's
// default title: "Fly China | China Business Market Tours".

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
