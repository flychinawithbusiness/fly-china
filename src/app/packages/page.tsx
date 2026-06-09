import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Tour Packages | Fly China" };

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
        {packages.length === 0 ? (
          <p className="max-w-2xl mx-auto text-center text-gray-400">
            No packages available yet. Please check back soon.
          </p>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col"
              >
                {/* TOP bar */}
                <div className="bg-[#1C3A6B] px-8 py-6">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="bg-[#F5C200] text-[#1C3A6B] font-black rounded-full px-5 py-1.5 text-xl inline-block">
                      {pkg.duration} Days
                    </span>
                    {pkg.isPopular && (
                      <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className="text-white text-2xl font-light">
                    From {pkg.price} BDT
                  </p>
                  <p className="text-[#F5C200]/70 text-xs">
                    per person, all inclusive
                  </p>
                </div>

                {/* BODY */}
                <div className="px-8 py-8 flex-1">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-3">
                    {pkg.inclusions.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-gray-700 text-sm"
                      >
                        <span className="text-[#F5C200] font-bold mt-0.5">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FOOTER */}
                <div className="px-8 pb-8">
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-[#1C3A6B] text-white rounded-full py-3.5 font-semibold hover:bg-[#2A5099] transition"
                  >
                    Book This Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
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
