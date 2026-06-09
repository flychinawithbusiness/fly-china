"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type PackageData = {
  title: string;
  price: string;
  isPopular: boolean;
  inclusions: string[];
  isActive: boolean;
};

export async function updatePackage(id: string, data: Partial<PackageData>) {
  await prisma.package.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  return { success: true };
}

export async function addInclusion(id: string, item: string) {
  const pkg = await prisma.package.findUnique({ where: { id } });
  if (!pkg) return { success: false };

  await prisma.package.update({
    where: { id },
    data: { inclusions: [...pkg.inclusions, item] },
  });
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  return { success: true };
}

export async function removeInclusion(id: string, item: string) {
  const pkg = await prisma.package.findUnique({ where: { id } });
  if (!pkg) return { success: false };

  await prisma.package.update({
    where: { id },
    data: { inclusions: pkg.inclusions.filter((i) => i !== item) },
  });
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  return { success: true };
}
