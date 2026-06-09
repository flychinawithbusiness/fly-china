import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "FAQ | Fly China" };

export default async function FaqPage() {
  const faqs = await prisma.faq.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <main>
      <PageHero
        badge="QUESTIONS"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our tours to Guangzhou."
      />
      {faqs.length === 0 ? (
        <section className="bg-white py-20 px-6">
          <p className="max-w-3xl mx-auto text-center text-gray-400">
            No FAQs available yet.
          </p>
        </section>
      ) : (
        <FaqAccordion faqs={faqs} />
      )}
    </main>
  );
}
