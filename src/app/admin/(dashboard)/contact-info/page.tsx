import { prisma } from "@/lib/prisma";
import ContactInfoForm from "./ContactInfoForm";

export default async function ContactInfoPage() {
  const items = await prisma.contactInfo.findMany({
    where: {
      key: {
        notIn: ["gtm_id", "meta_pixel_id", "ga4_id"],
      },
    },
    orderBy: { label: "asc" },
  });

  return <ContactInfoForm items={items} />;
}
