"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

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

function Counter({ value }: { value: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const target = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    let startTime: number | null = null;
    let raf = 0;
    const tick = (t: number) => {
      if (startTime === null) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setN(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <div ref={ref}>
      <div className="text-[#F5C200] text-4xl font-bold font-body">
        {n}
        {suffix}
      </div>
    </div>
  );
}

function GuideCard({
  guide,
}: {
  guide: {
    emoji: string;
    name: string;
    role: string;
    languages: string;
    experience: string;
  };
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-2xl p-8"
      style={{
        border: "1px solid rgba(28,58,107,0.07)",
        boxShadow: hovered
          ? "0 24px 48px rgba(28,58,107,0.15)"
          : "0 4px 20px rgba(28,58,107,0.08)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className="w-20 h-20 rounded-full text-white flex items-center justify-center text-2xl mx-auto mb-4"
        style={{ background: "linear-gradient(135deg, #1C3A6B, #2A5099)" }}
      >
        {guide.emoji}
      </div>
      <h3 className="font-semibold text-lg">{guide.name}</h3>
      <p className="text-[#F5C200] text-sm mb-3">{guide.role}</p>
      <p className="text-gray-500 text-sm">{guide.languages}</p>
      <p className="text-gray-400 text-xs mt-1">{guide.experience}</p>
    </div>
  );
}

export default function AboutContent() {
  return (
    <>
      {/* Story */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left">
            <div className="rounded-2xl bg-[#1C3A6B]/10 h-80 flex items-center justify-center text-6xl">
              🏢
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.1}>
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
                  lack of local knowledge. That&apos;s why we handle every
                  single detail of your trip, so you can focus entirely on
                  finding the best products for your business.
                </p>
                <p>
                  From the moment you land in Guangzhou to the moment you board
                  your flight home, our experienced team and dedicated guides
                  are with you every step of the way.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1C3A6B] py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <Counter value={stat.value} />
              <div className="text-white text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Guides */}
      <section className="bg-gray-50 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-light text-[#1C3A6B] mb-4">
              Our Expert Guides
            </h2>
            <p className="text-gray-500 mb-12">
              Experienced, bilingual guides who know every corner of
              Guangzhou&apos;s markets.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GUIDES.map((guide, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <GuideCard guide={guide} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
