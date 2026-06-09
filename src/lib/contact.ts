import { prisma } from "@/lib/prisma";

/**
 * Fetches all ContactInfo rows and returns a helper for looking up values by key.
 * Used by the footer, contact page, and CTA sections so public contact details
 * stay in sync with the admin panel.
 */
export async function getContactInfo() {
  const contacts = await prisma.contactInfo.findMany();
  const get = (key: string) =>
    contacts.find((c) => c.key === key)?.value ?? "";
  return { get, all: contacts };
}

/** Strips everything but digits — for building wa.me / tel: links. */
export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}
