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
  const facebook = get("facebook");
  const instagram = get("instagram");

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

          {/* Social links */}
          {(facebook || instagram || wechat) && (
            <div className="flex gap-3 mt-4">
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#F5C200] flex items-center justify-center transition-colors text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="18"
                    height="18"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#F5C200] flex items-center justify-center transition-colors text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="18"
                    height="18"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              )}
              {wechat && (
                <span
                  title={`WeChat: ${wechat}`}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#F5C200] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                    }}
                  >
                    WeChat
                  </span>
                </span>
              )}
            </div>
          )}
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
