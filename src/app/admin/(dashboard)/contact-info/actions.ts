"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateContactInfo(key: string, value: string) {
  await prisma.contactInfo.update({
    where: { key },
    data: { value },
  });
  revalidatePath("/admin/contact-info");
  // Contact info appears in the footer (on every page), the contact page, and CTAs.
  revalidatePath("/", "layout");
  return { success: true };
}
