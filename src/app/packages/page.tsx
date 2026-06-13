import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";
import PackageDetail from "./PackageDetail";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Tour Packages",
  description:
    "Compare our 7, 10 and 14-day Guangzhou sourcing tour packages. Return flights, hotel, all meals, local transport and a dedicated guide — all inclusive.",
};

const NOT_INCLUDED = [
  "Visa fees",
  "Personal shopping budget",
  "Travel insurance",
  "Personal expenses",
];

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <main>
      <PageHero
        badge="OUR TOURS"
        title="Choose Your Package"
        subtitle="All packages include return flights, hotel, all meals, local transport, and a dedicated guide."
      />

      {/* Detailed package cards */}
      <section className="bg-gray-50 py-20 px-6">
        <PackageDetail packages={packages} />
      </section>

      {/* What's NOT included */}
      <section className="bg-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-[#1C3A6B] mb-6">
            Not Included in Package
          </h2>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-gray-500 mb-6">
            {NOT_INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-gray-400 text-sm">
            We can assist with visa applications and travel insurance
            arrangements.
          </p>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
