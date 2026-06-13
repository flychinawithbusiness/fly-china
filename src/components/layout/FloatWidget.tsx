import { prisma } from "@/lib/prisma";
import FloatWidgetClient from "./FloatWidgetClient";

export default async function FloatWidget() {
  const contacts = await prisma.contactInfo.findMany();
  const get = (key: string) =>
    contacts.find((c) => c.key === key)?.value ?? "";

  return <FloatWidgetClient whatsapp={get("whatsapp")} />;
}
