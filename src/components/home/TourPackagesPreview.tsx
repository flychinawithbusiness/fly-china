import { prisma } from "@/lib/prisma";
import PackageCards from "./PackageCards";

export default async function TourPackagesPreview() {
  const packages = await prisma.package.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return <PackageCards packages={packages} />;
}
