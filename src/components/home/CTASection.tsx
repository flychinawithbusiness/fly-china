import { getContactInfo, digitsOnly } from "@/lib/contact";

export default async function CTASection() {
  const { get } = await getContactInfo();
  const whatsapp = get("whatsapp");
  const phone = get("phone");

  return (
    <section id="contact" className="bg-[#1C3A6B] py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
          Ready to Source from China?
        </h2>
        <p className="text-[#F5C200]/80 mb-10">
          Join hundreds of satisfied buyers. Book your spot today.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          {whatsapp && (
            <a
              href={`https://wa.me/${digitsOnly(whatsapp)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white rounded-full px-8 py-4 font-bold text-lg hover:opacity-90 transition"
            >
              💬 WhatsApp Us
            </a>
          )}
          {phone && (
            <a
              href={`tel:${digitsOnly(phone)}`}
              className="border-2 border-[#F5C200] text-[#F5C200] rounded-full px-8 py-4 font-bold text-lg hover:bg-[#F5C200]/10 transition"
            >
              📞 Call Us
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
