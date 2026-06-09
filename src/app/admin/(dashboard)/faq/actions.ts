"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createFaq(question: string, answer: string) {
  // New FAQ goes to the end of the list.
  const last = await prisma.faq.findFirst({
    orderBy: { order: "desc" },
  });
  const nextOrder = last ? last.order + 1 : 0;

  await prisma.faq.create({
    data: { question, answer, order: nextOrder },
  });
  revalidatePath("/admin/faq");
  return { success: true };
}

export async function updateFaq(id: string, question: string, answer: string) {
  await prisma.faq.update({
    where: { id },
    data: { question, answer },
  });
  revalidatePath("/admin/faq");
  return { success: true };
}

export async function deleteFaq(id: string) {
  await prisma.faq.delete({ where: { id } });
  revalidatePath("/admin/faq");
  return { success: true };
}

export async function reorderFaq(id: string, newOrder: number) {
  await prisma.faq.update({
    where: { id },
    data: { order: newOrder },
  });
  revalidatePath("/admin/faq");
  return { success: true };
}
