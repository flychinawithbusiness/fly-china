import { prisma } from "@/lib/prisma";
import FaqManager from "./FaqManager";

export default async function FaqAdminPage() {
  const faqs = await prisma.faq.findMany({
    orderBy: { order: "asc" },
  });

  return <FaqManager faqs={faqs} />;
}
