import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import InquiryForm from "@/components/contact/InquiryForm";

export const metadata: Metadata = { title: "Contact & Inquiry | Fly China" };

export default function ContactPage() {
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
              <a
                href="https://wa.me/8801XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366]/10 rounded-2xl p-5 flex gap-4 items-center"
              >
                <span className="text-3xl text-[#25D366]">💬</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    WhatsApp (Fastest)
                  </p>
                  <p className="text-gray-600 text-sm">+880 1XXX-XXXXXX</p>
                </div>
                <span className="text-[#25D366] text-sm font-medium">
                  Chat Now →
                </span>
              </a>

              {/* WeChat */}
              <div className="bg-[#1C3A6B]/10 rounded-2xl p-5 flex gap-4 items-center">
                <span className="text-3xl text-[#1C3A6B]">💬</span>
                <div>
                  <p className="font-semibold text-gray-800">WeChat</p>
                  <p className="text-gray-600 text-sm">flychina_official</p>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-gray-100 rounded-2xl p-5 flex gap-4 items-center">
                <span className="text-3xl">📞</span>
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <p className="text-gray-600 text-sm">+880 1XXX-XXXXXX</p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gray-100 rounded-2xl p-5 flex gap-4 items-center">
                <span className="text-3xl">✉️</span>
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-600 text-sm">info@flychina.com</p>
                </div>
              </div>
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
