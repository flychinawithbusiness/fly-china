"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const session = await auth();
  if (!session?.user?.email)
    return { success: false, error: "Not authenticated" };

  const admin = await prisma.admin.findUnique({
    where: { email: session.user.email },
  });
  if (!admin) return { success: false, error: "Admin not found" };

  const isValid = await bcrypt.compare(currentPassword, admin.password);
  if (!isValid)
    return { success: false, error: "Current password is incorrect" };

  if (newPassword.length < 8)
    return {
      success: false,
      error: "New password must be at least 8 characters",
    };

  const hashed = await bcrypt.hash(newPassword, 12);
  await prisma.admin.update({
    where: { email: session.user.email },
    data: { password: hashed },
  });

  return { success: true };
}
