import Link from "next/link";
import { getContactInfo, digitsOnly } from "@/lib/contact";

type PageCTAProps = {
  heading?: string;
  subtitle?: string;
};

export default async function PageCTA({
  heading = "Ready to Source from China?",
  subtitle = "Join hundreds of satisfied buyers. Book your spot today.",
}: PageCTAProps) {
  const { get } = await getContactInfo();
  const whatsapp = get("whatsapp");

  return (
    <section className="bg-[#1C3A6B] py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
          {heading}
        </h2>
        <p className="text-[#F5C200]/80 mb-10">{subtitle}</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/contact"
            className="bg-[#F5C200] text-[#1C3A6B] rounded-full px-8 py-4 font-bold text-lg hover:bg-[#D4A800] transition"
          >
            Book Your Tour
          </Link>
          {whatsapp && (
            <a
              href={`https://wa.me/${digitsOnly(whatsapp)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[#F5C200] text-[#F5C200] rounded-full px-8 py-4 font-bold text-lg hover:bg-[#F5C200]/10 transition"
            >
              💬 WhatsApp Us
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
