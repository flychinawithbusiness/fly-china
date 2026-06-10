import { prisma } from "@/lib/prisma";
import TourPackageCards from "./TourPackageCards";

export default async function TourPackagesPreview() {
  const packages = await prisma.package.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <section id="packages" className="bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-[#1C3A6B] text-center mb-4">
          Choose Your Tour
        </h2>
        <p className="text-gray-500 text-center mb-16 max-w-2xl mx-auto">
          All packages include flights, hotel, food, transport, and a dedicated
          guide.
        </p>

        {packages.length === 0 ? (
          <p className="text-center text-gray-400">
            Tour packages coming soon.
          </p>
        ) : (
          <TourPackageCards packages={packages} />
        )}
      </div>
    </section>
  );
}
