import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import InquiryForm from "@/components/contact/InquiryForm";
import { getContactInfo, digitsOnly } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Book a Tour",
  description:
    "Book your wholesale sourcing trip to Guangzhou. Fill out our inquiry form and we will contact you within 24 hours.",
};

export default async function ContactPage() {
  const { get } = await getContactInfo();
  const whatsapp = get("whatsapp");
  const wechat = get("wechat");
  const phone = get("phone");
  const email = get("email");

  return (
    <main>
      <PageHero
        badge="GET IN TOUCH"
        title="Book Your Tour"
        subtitle="Fill in the form and our team will get back to you within 24 hours."
      />

      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* LEFT — contact info */}
          <div>
            <h2 className="font-light text-2xl text-[#1C3A6B] mb-8">
              Contact Us Directly
            </h2>

            <div className="space-y-4">
              {/* WhatsApp */}
              {whatsapp && (
                <a
                  href={`https://wa.me/${digitsOnly(whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fc-contact-card rounded-2xl p-5 flex gap-4 items-center"
                >
                  <span className="text-3xl text-[#25D366]">💬</span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      WhatsApp (Fastest)
                    </p>
                    <p className="text-gray-600 text-sm">{whatsapp}</p>
                  </div>
                  <span className="text-[#25D366] text-sm font-medium">
                    Chat Now →
                  </span>
                </a>
              )}

              {/* WeChat */}
              {wechat && (
                <div className="fc-contact-card rounded-2xl p-5 flex gap-4 items-center">
                  <span className="text-3xl text-[#1C3A6B]">💬</span>
                  <div>
                    <p className="font-semibold text-gray-800">WeChat</p>
                    <p className="text-gray-600 text-sm">{wechat}</p>
                  </div>
                </div>
              )}

              {/* Phone */}
              {phone && (
                <a
                  href={`tel:${digitsOnly(phone)}`}
                  className="fc-contact-card rounded-2xl p-5 flex gap-4 items-center"
                >
                  <span className="text-3xl">📞</span>
                  <div>
                    <p className="font-semibold text-gray-800">Phone</p>
                    <p className="text-gray-600 text-sm">{phone}</p>
                  </div>
                </a>
              )}

              {/* Email */}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="fc-contact-card rounded-2xl p-5 flex gap-4 items-center"
                >
                  <span className="text-3xl">✉️</span>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600 text-sm">{email}</p>
                  </div>
                </a>
              )}
            </div>

            <p className="text-gray-500 text-sm mt-6">
              Our team is available Sat–Thu, 9am–9pm (Bangladesh Standard Time)
            </p>
          </div>

          {/* RIGHT — form */}
          <InquiryForm />
        </div>
      </section>
    </main>
  );
}
