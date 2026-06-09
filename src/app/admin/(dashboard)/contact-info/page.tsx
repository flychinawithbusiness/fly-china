import { prisma } from "@/lib/prisma";
import ContactInfoForm from "./ContactInfoForm";

export default async function ContactInfoPage() {
  const items = await prisma.contactInfo.findMany({
    orderBy: { label: "asc" },
  });

  return <ContactInfoForm items={items} />;
}
