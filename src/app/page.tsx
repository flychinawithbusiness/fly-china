import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import WhyFlyChina from "@/components/home/WhyFlyChina";
import TourPackagesPreview from "@/components/home/TourPackagesPreview";
import MarketsSection from "@/components/home/MarketsSection";
import HowItWorks from "@/components/home/HowItWorks";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

// No page-level title override — the homepage uses the root layout's
// default title: "Fly China | China Business Market Tours".

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <WhyFlyChina />
      <TourPackagesPreview />
      <MarketsSection />
      <HowItWorks />
      <GalleryPreview />
      <Testimonials />
      <CTASection />
    </main>
  );
}
