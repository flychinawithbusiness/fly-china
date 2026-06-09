"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitInquiry(data: {
  name: string;
  country: string;
  whatsapp: string;
  email?: string;
  duration: string;
  month: string;
  groupSize: string;
  message?: string;
}) {
  await prisma.inquiry.create({ data });
  revalidatePath("/admin/inquiries");
  return { success: true };
}
