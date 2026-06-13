import { getContactInfo } from "@/lib/contact";
import CTASectionClient from "./CTASectionClient";

export default async function CTASection() {
  const { get } = await getContactInfo();
  return <CTASectionClient whatsapp={get("whatsapp")} phone={get("phone")} />;
}
