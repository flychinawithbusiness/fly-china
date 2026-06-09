import Image from "next/image";
import Link from "next/link";
import { getContactInfo, digitsOnly } from "@/lib/contact";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "Markets Guide", href: "/markets" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
];

const TOURS = ["7 Day Tour", "10 Day Tour", "14 Day Tour", "Custom Tours"];

export default async function Footer() {
  const { get } = await getContactInfo();
  const phone = get("phone");
  const whatsapp = get("whatsapp");
  const wechat = get("wechat");
  const email = get("email");

  return (
    <footer className="bg-[#0A1628] text-gray-400">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto px-6 py-16">
        {/* Col 1 — Logo + tagline */}
        <div>
          <Image
            src="/images/logo.png"
            alt="Fly China"
            width={52}
            height={52}
            className="rounded-lg mb-4"
          />
          <p className="text-sm leading-relaxed">
            Your trusted gateway to China&apos;s wholesale markets.
          </p>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="hover:text-[#F5C200] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            {phone && <li>📞 Phone: {phone}</li>}
            {whatsapp && (
              <li>
                💬 WhatsApp:{" "}
                <a
                  href={`https://wa.me/${digitsOnly(whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5C200] transition-colors"
                >
                  {whatsapp}
                </a>
              </li>
            )}
            {wechat && <li>💬 WeChat: {wechat}</li>}
            {email && (
              <li>
                ✉️{" "}
                <a
                  href={`mailto:${email}`}
                  className="hover:text-[#F5C200] transition-colors"
                >
                  {email}
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Col 4 — Our Tours */}
        <div>
          <h4 className="text-white font-semibold mb-4">Our Tours</h4>
          <ul className="space-y-2 text-sm">
            {TOURS.map((tour) => (
              <li key={tour}>
                <Link
                  href="/packages"
                  className="hover:text-[#F5C200] transition-colors"
                >
                  {tour}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 mt-8 pt-8 pb-8 text-center text-sm">
        © 2025 Fly China. All rights reserved.
      </div>
    </footer>
  );
}
