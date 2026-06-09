import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import FaqAccordion from "@/components/faq/FaqAccordion";

export const metadata: Metadata = { title: "FAQ | Fly China" };

export default function FaqPage() {
  return (
    <main>
      <PageHero
        badge="QUESTIONS"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our tours to Guangzhou."
      />
      <FaqAccordion />
    </main>
  );
}
