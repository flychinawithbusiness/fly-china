import { getContactInfo, digitsOnly } from "@/lib/contact";

export default async function CTASection() {
  const { get } = await getContactInfo();
  const whatsapp = get("whatsapp");
  const phone = get("phone");

  return (
    <section className="bg-[#1C3A6B] py-20 px-6 text-center relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(245,194,0,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(245,194,0,0.08) 0%, transparent 50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="text-gold/60 text-xs tracking-widest uppercase font-body mb-4">
          Ready to Source?
        </p>
        <h2
          className="text-white mb-4"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.1,
          }}
        >
          Start Your China Journey Today
        </h2>
        <p className="text-white/50 font-body mb-10 text-base">
          Join 500+ satisfied buyers who trust Fly China for their sourcing
          trips.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          {whatsapp && (
            <a
              href={`https://wa.me/${digitsOnly(whatsapp)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white rounded-full px-8 py-4 font-body font-bold text-base hover:bg-[#20bd5a] transition"
            >
              💬 WhatsApp Us
            </a>
          )}
          {phone && (
            <a
              href={`tel:${digitsOnly(phone)}`}
              className="border-2 border-white/30 text-white rounded-full px-8 py-4 font-body font-bold text-base hover:bg-white/10 transition"
            >
              📞 Call Us
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
