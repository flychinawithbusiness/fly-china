"use server";

import { signOut } from "./auth";

export async function crmSignOut() {
  await signOut({ redirectTo: "/crm/login" });
}
