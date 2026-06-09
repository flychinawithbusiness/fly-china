"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateContactInfo(key: string, value: string) {
  await prisma.contactInfo.update({
    where: { key },
    data: { value },
  });
  revalidatePath("/admin/contact-info");
  return { success: true };
}
