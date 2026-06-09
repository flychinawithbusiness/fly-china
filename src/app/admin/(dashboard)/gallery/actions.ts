"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addGalleryImage(
  url: string,
  alt: string,
  category: string
) {
  await prisma.galleryImage.create({
    data: { url, alt, category },
  });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true };
}

export async function deleteGalleryImage(id: string) {
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true };
}

export async function updateGalleryImage(
  id: string,
  alt: string,
  category: string
) {
  await prisma.galleryImage.update({
    where: { id },
    data: { alt, category },
  });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true };
}
