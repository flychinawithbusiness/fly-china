"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/app/crm/auth";

export async function crmLogin(
  email: string,
  password: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    await signIn("credentials", { email, password, redirect: false });
    return { ok: true };
  } catch (e) {
    if (e instanceof AuthError) {
      return { ok: false, error: "Invalid email or password" };
    }
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
