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
      <section className="bg-white py-16 px-6">
        <div
          className="max-w-2xl mx-auto text-center"
          style={{
            background: "linear-gradient(135deg, #1C3A6B, #0A1628)",
            borderRadius: 20,
            padding: "2.5rem",
          }}
        >
          <h2
            className="mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              color: "#ffffff",
            }}
          >
            Not Included in Package
          </h2>
          <ul className="flex flex-wrap justify-center gap-2 mb-6">
            {NOT_INCLUDED.map((item) => (
              <li
                key={item}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 999,
                  padding: "0.4rem 1rem",
                  fontSize: "0.8rem",
                }}
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            We can assist with visa applications and travel insurance
            arrangements.
          </p>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
