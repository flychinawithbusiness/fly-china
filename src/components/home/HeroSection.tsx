"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
          type="video/mp4"
        />
      </video>

      {/* Brand overlay */}
      <div className="absolute inset-0 bg-[#1C3A6B]/20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="text-center" style={{ marginTop: "-18rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase mb-4"
          >
            CHINA WHOLESALE MARKET TOURS
          </motion.p>

          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="block font-light text-gray-400 leading-none tracking-tighter"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            Explore
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="block font-light text-[#1C3A6B] leading-none tracking-tighter -mt-2"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            China.
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="block font-light text-[#F5C200] leading-none tracking-tighter -mt-2"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            With Us.
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base md:text-lg text-gray-500 mt-5 mb-7 max-w-lg mx-auto"
          >
            Discover the world&apos;s biggest wholesale markets. We handle
            everything — flights, hotels, transport and your personal guide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <a
              href="#packages"
              className="rounded-full px-6 py-2.5 bg-white/70 backdrop-blur-sm text-gray-800 font-medium hover:bg-white transition text-sm"
            >
              Explore Packages
            </a>
            <a
              href="#contact"
              className="rounded-full px-6 py-2.5 bg-[#F5C200] text-[#1C3A6B] font-bold hover:bg-[#D4A800] transition text-sm shadow-lg"
            >
              Book a Tour ✈
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
