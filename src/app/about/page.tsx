import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Fly China - your trusted partner for wholesale sourcing tours to Guangzhou's markets.",
};

const STATS = [
  { value: "500+", label: "Happy Clients" },
  { value: "100+", label: "Tours Completed" },
  { value: "7", label: "Years Experience" },
  { value: "15+", label: "Markets Covered" },
];

const GUIDES = [
  {
    emoji: "👨‍💼",
    name: "Guide Name",
    role: "Senior Market Guide",
    languages: "Bangla • English • Mandarin",
    experience: "8 years guiding in Guangzhou",
  },
  {
    emoji: "👩‍💼",
    name: "Guide Name",
    role: "Senior Market Guide",
    languages: "Bangla • English • Mandarin",
    experience: "8 years guiding in Guangzhou",
  },
  {
    emoji: "👨‍💼",
    name: "Guide Name",
    role: "Senior Market Guide",
    languages: "Bangla • English • Mandarin",
    experience: "8 years guiding in Guangzhou",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        badge="OUR STORY"
        title="About Fly China"
        subtitle="We've been connecting Bangladeshi and international buyers with China's best wholesale markets since day one."
      />

      {/* Story */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl bg-[#1C3A6B]/10 h-80 flex items-center justify-center text-6xl">
            🏢
          </div>
          <div>
            <h2 className="text-2xl font-light text-[#1C3A6B] mb-4">
              Your Trusted China Tour Partner
            </h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <p>
                Fly China was founded with one simple mission: to make
                China&apos;s wholesale markets accessible to every business
                owner, regardless of language barriers or travel experience.
              </p>
              <p>
                We understand the challenges of sourcing from China — the
                language barrier, unfamiliar markets, complex logistics, and
                lack of local knowledge. That&apos;s why we handle every single
                detail of your trip, so you can focus entirely on finding the
                best products for your business.
              </p>
              <p>
                From the moment you land in Guangzhou to the moment you board
                your flight home, our experienced team and dedicated guides are
                with you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1C3A6B] py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-[#F5C200] text-4xl font-bold">
                {stat.value}
              </div>
              <div className="text-white text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Guides */}
      <section className="bg-gray-50 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-[#1C3A6B] mb-4">
            Our Expert Guides
          </h2>
          <p className="text-gray-500 mb-12">
            Experienced, bilingual guides who know every corner of
            Guangzhou&apos;s markets.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GUIDES.map((guide, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <div className="w-20 h-20 rounded-full bg-[#1C3A6B] text-white flex items-center justify-center text-2xl mx-auto mb-4">
                  {guide.emoji}
                </div>
                <h3 className="font-semibold text-lg">{guide.name}</h3>
                <p className="text-[#F5C200] text-sm mb-3">{guide.role}</p>
                <p className="text-gray-500 text-sm">{guide.languages}</p>
                <p className="text-gray-400 text-xs mt-1">{guide.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
