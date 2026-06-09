import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";

export const metadata: Metadata = {
  title: "Guangzhou Wholesale Markets Guide | Fly China",
  description:
    "Complete guide to Guangzhou's best wholesale markets for business buyers.",
};

const CATEGORIES = [
  {
    emoji: "🏭",
    title: "Electronics & Technology",
    description:
      "Huaqiangbei Electronics Market — the world's largest electronics components market. Perfect for phones, accessories, gadgets, and components.",
    popular: "Huaqiangbei North Road",
  },
  {
    emoji: "👗",
    title: "Clothing & Fashion",
    description:
      "Shahe and Zhanxi clothing markets — thousands of stalls with the latest fashion at wholesale prices. Ideal for fashion retailers.",
    popular: "Shahe Fashion Street, Zhanxi Road",
  },
  {
    emoji: "💍",
    title: "Accessories & Jewelry",
    description:
      "Liwan Plaza and surrounding areas — China's leading wholesale jewelry and accessories market.",
    popular: "Liwan Plaza, Changshou Road",
  },
  {
    emoji: "🏠",
    title: "Home & Furniture",
    description:
      "Lecong furniture market — one of the world's largest furniture wholesale centers. Great for home goods importers.",
    popular: "Lecong Furniture Market",
  },
  {
    emoji: "🛍️",
    title: "General Merchandise",
    description:
      "Yide Road market — everything from toys to stationery, daily necessities and novelty items at rock-bottom prices.",
    popular: "Yide Road, Jiangnan Market",
  },
  {
    emoji: "🧴",
    title: "Beauty & Cosmetics",
    description:
      "Guangzhou's beauty market — wholesale skincare, makeup, and hair products. China's cosmetics capital.",
    popular: "Baiyun World Leather Trade Center area",
  },
];

const TIPS = [
  {
    emoji: "💬",
    title: "Language",
    text: "Our guide handles all negotiations in Mandarin. You point, we talk.",
  },
  {
    emoji: "💵",
    title: "Payment",
    text: "Bring cash (RMB) or WeChat Pay. Most vendors don't accept cards.",
  },
  {
    emoji: "🕐",
    title: "Timing",
    text: "Markets open early (8am). Arrive early for the best deals and less crowd.",
  },
  {
    emoji: "🧳",
    title: "Packing",
    text: "Bring empty suitcases or arrange shipping — you'll buy more than expected!",
  },
];

export default function MarketsPage() {
  return (
    <main>
      <PageHero
        badge="MARKET GUIDE"
        title="Guangzhou Wholesale Markets"
        subtitle="Your comprehensive guide to the world's biggest wholesale trading hub."
      />

      {/* Intro */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-lg leading-relaxed">
            Guangzhou is home to the world&apos;s largest concentration of
            wholesale markets. With over 100,000 suppliers across every product
            category, it&apos;s the ultimate sourcing destination for global
            buyers.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-[#1C3A6B] text-center mb-12">
            Markets by Product Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="text-3xl mb-3">{cat.emoji}</div>
                <h3 className="font-semibold text-[#1C3A6B] mb-2">
                  {cat.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {cat.description}
                </p>
                <p className="text-xs text-[#F5C200] font-medium">
                  Popular: {cat.popular}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="bg-[#0A1628] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-white text-center mb-12">
            Buying Tips for First-Time Visitors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TIPS.map((tip) => (
              <div
                key={tip.title}
                className="border border-[#F5C200]/20 rounded-2xl p-6 hover:border-[#F5C200]/50 transition-all duration-300 bg-white/5"
              >
                <div className="text-[#F5C200] text-4xl mb-4">{tip.emoji}</div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
