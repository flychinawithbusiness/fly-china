"use client";

import FadeIn from "@/components/ui/FadeIn";

const ClipboardIcon = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1C3A6B"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const PhoneIcon = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1C3A6B"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const PlaneIcon = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1C3A6B"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const BagIcon = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1C3A6B"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const steps = [
  { num: "01", icon: ClipboardIcon, title: "Inquire", desc: "Fill our form or WhatsApp us with your preferred dates and group size." },
  { num: "02", icon: PhoneIcon, title: "Confirm", desc: "We call you to confirm trip details and arrange payment." },
  { num: "03", icon: PlaneIcon, title: "Fly", desc: "We handle everything. You just show up at the airport." },
  { num: "04", icon: BagIcon, title: "Source", desc: "Shop Guangzhou's markets with your dedicated guide beside you." },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#F8F9FB] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-gold uppercase font-body font-semibold">
              The Process
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
              How It Works
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="absolute hidden md:block top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.15}>
              <div className="text-center relative z-10">
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "rgba(28,58,107,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                  }}
                >
                  {step.icon}
                </div>
                <h3 className="font-body font-bold text-gray-900 text-base mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
