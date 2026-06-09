import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";

export const metadata: Metadata = { title: "Tour Packages | Fly China" };

const BASE_INCLUDED = [
  "Return Flights (Dhaka ↔ Guangzhou)",
  "Airport pickup & drop-off",
  "Hotel accommodation (3-star+)",
  "All meals (breakfast, lunch, dinner)",
  "All local transport in Guangzhou",
  "Dedicated English/Bangla speaking guide",
  "Guided wholesale market visits",
  "24/7 support throughout the trip",
];

type Pkg = {
  duration: string;
  popular: boolean;
  included: string[];
};

const PACKAGES: Pkg[] = [
  { duration: "7 Days", popular: true, included: [...BASE_INCLUDED] },
  {
    duration: "10 Days",
    popular: false,
    included: [...BASE_INCLUDED, "Extended market coverage", "Factory visit (1-2 visits)"],
  },
  {
    duration: "14 Days",
    popular: false,
    included: [
      ...BASE_INCLUDED,
      "Extended market coverage",
      "Factory visit (1-2 visits)",
      "Yiwu market day trip",
    ],
  },
];

const NOT_INCLUDED = [
  "Visa fees",
  "Personal shopping budget",
  "Travel insurance",
  "Personal expenses",
];

export default function PackagesPage() {
  return (
    <main>
      <PageHero
        badge="OUR TOURS"
        title="Choose Your Package"
        subtitle="All packages include return flights, hotel, all meals, local transport, and a dedicated guide."
      />

      {/* Detailed package cards */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.duration}
              className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col"
            >
              {/* TOP bar */}
              <div className="bg-[#1C3A6B] px-8 py-6">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="bg-[#F5C200] text-[#1C3A6B] font-black rounded-full px-5 py-1.5 text-xl inline-block">
                    {pkg.duration}
                  </span>
                  {pkg.popular && (
                    <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="text-white text-2xl font-light">
                  From 1,00,000 BDT
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
                  {pkg.included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-gray-700 text-sm"
                    >
                      <span className="text-[#F5C200] font-bold mt-0.5">✓</span>
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
