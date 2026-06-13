import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";
import MarketsContent from "./MarketsContent";

export const metadata: Metadata = {
  title: "Guangzhou Wholesale Markets Guide",
  description:
    "Complete guide to Guangzhou's best wholesale markets for business buyers.",
};

export default function MarketsPage() {
  return (
    <main>
      <PageHero
        badge="MARKET GUIDE"
        title="Guangzhou Wholesale Markets"
        subtitle="Your comprehensive guide to the world's biggest wholesale trading hub."
      />

      {/* Intro */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-lg leading-relaxed">
            Guangzhou is home to the world&apos;s largest concentration of
            wholesale markets. With over 100,000 suppliers across every product
            category, it&apos;s the ultimate sourcing destination for global
            buyers.
          </p>
        </div>
      </section>

      <MarketsContent />

      <PageCTA />
    </main>
  );
}
