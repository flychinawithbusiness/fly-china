import { prisma } from "@/lib/prisma";
import InquiryList from "./InquiryList";

export default async function InquiriesAdminPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  const counts = {
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    contacted: inquiries.filter((i) => i.status === "contacted").length,
    confirmed: inquiries.filter((i) => i.status === "confirmed").length,
  };

  return <InquiryList inquiries={inquiries} counts={counts} />;
}
