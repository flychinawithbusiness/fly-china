"use client";

import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

type Pkg = {
  id: string;
  duration: number;
  price: string;
  isPopular: boolean;
  inclusions: string[];
};

function Inclusions({
  items,
  variant,
}: {
  items: string[];
  variant: "featured" | "plain";
}) {
  const itemClass =
    variant === "featured"
      ? "text-white/70 border-white/10"
      : "text-gray-600 border-gray-100";
  return (
    <ul>
      {items.map((item) => (
        <li
          key={item}
          className={`flex gap-2 text-sm py-1.5 border-b last:border-b-0 ${itemClass}`}
        >
          <span className="text-gold font-bold">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PackageCards({ packages }: { packages: Pkg[] }) {
  return (
    <section className="bg-[#F8F9FB] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-gold uppercase font-body font-semibold">
              Our Packages
            </p>
            <h2
              className="text-navy mt-3"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.1,
              }}
            >
              Choose Your Tour
            </h2>
            <p className="text-gray-500 font-body mt-3 max-w-2xl mx-auto">
              All packages include flights, hotel, food, transport, and a
              dedicated guide.
            </p>
          </div>
        </FadeIn>

        {packages.length === 0 ? (
          <p className="text-center text-gray-400 font-body">
            Tour packages coming soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => {
              const featured = i === 0;
              return (
                <FadeIn key={pkg.id} delay={i * 0.15}>
                  {featured ? (
                    <div className="bg-[#1C3A6B] rounded-3xl overflow-hidden h-full flex flex-col">
                      <div className="px-8 pt-8 pb-6">
                        {pkg.isPopular && (
                          <span className="inline-flex bg-gold text-navy-dark text-xs font-bold px-3 py-1 rounded-full mb-4">
                            Most Popular
                          </span>
                        )}
                        <div
                          style={{
                            fontFamily: "var(--font-display)",
                            fontStyle: "italic",
                            fontWeight: 700,
                            fontSize: "3rem",
                            color: "#fff",
                            lineHeight: 1,
                          }}
                        >
                          {pkg.duration} Days
                        </div>
                        <p className="text-white/70 text-sm mt-2 font-body">
                          From {pkg.price} BDT
                        </p>
                      </div>
                      <div className="px-8 pb-8 flex-1">
                        <Inclusions items={pkg.inclusions} variant="featured" />
                      </div>
                      <Link
                        href="/contact"
                        className="mx-8 mb-8 rounded-full bg-gold text-navy-dark font-bold py-3 text-center text-sm hover:bg-yellow-400 transition font-body"
                      >
                        Get a Quote
                      </Link>
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 h-full flex flex-col">
                      <div className="px-8 pt-8 pb-6 border-b border-gray-100">
                        <span
                          className="inline-flex bg-[#1C3A6B]/[0.08] text-[#1C3A6B] font-bold px-4 py-1.5 rounded-full mb-3"
                          style={{
                            fontFamily: "var(--font-display)",
                            fontStyle: "italic",
                            fontSize: "1.5rem",
                          }}
                        >
                          {pkg.duration} Days
                        </span>
                        <p className="text-[#1C3A6B] font-body text-sm">
                          From {pkg.price} BDT
                        </p>
                      </div>
                      <div className="px-8 pb-8 pt-6 flex-1">
                        <Inclusions items={pkg.inclusions} variant="plain" />
                      </div>
                      <Link
                        href="/contact"
                        className="mx-8 mb-8 rounded-full bg-[#1C3A6B] text-white font-bold py-3 text-center text-sm hover:bg-[#2A5099] transition font-body"
                      >
                        Get a Quote
                      </Link>
                    </div>
                  )}
                </FadeIn>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
