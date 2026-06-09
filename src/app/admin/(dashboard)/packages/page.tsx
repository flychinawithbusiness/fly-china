import { prisma } from "@/lib/prisma";
import PackageManager from "./PackageManager";

export default async function PackagesAdminPage() {
  const packages = await prisma.package.findMany({
    orderBy: { order: "asc" },
  });

  return <PackageManager packages={packages} />;
}
