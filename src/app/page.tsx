import HeroSection from "@/components/home/HeroSection";
import WhyFlyChina from "@/components/home/WhyFlyChina";
import TourPackagesPreview from "@/components/home/TourPackagesPreview";
import HowItWorks from "@/components/home/HowItWorks";
import CTASection from "@/components/home/CTASection";

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
