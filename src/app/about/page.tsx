import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Fly China - your trusted partner for wholesale sourcing tours to Guangzhou's markets.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        badge="OUR STORY"
        title="About Fly China"
        subtitle="We've been connecting Bangladeshi and international buyers with China's best wholesale markets since day one."
      />
      <AboutContent />
      <PageCTA />
    </main>
  );
}
