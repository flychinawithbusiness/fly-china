"use client";

import Image from "next/image";
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

      {/* Logo watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none w-80 h-80">
        <Image src="/images/logo.png" alt="" fill className="object-contain" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="text-center" style={{ marginTop: "-18rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase mb-4"
          >
            WHOLESALE TOURS TO GUANGZHOU
          </motion.p>

          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="block font-light text-gray-400 leading-none tracking-tighter"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            Premium.
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="block font-light text-[#1C3A6B] leading-none tracking-tighter -mt-2"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            Accessible.
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base md:text-lg text-gray-500 mt-5 mb-7 max-w-lg mx-auto"
          >
            Your sourcing journey to China&apos;s biggest wholesale markets
            starts here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <a
              href="#packages"
              className="rounded-full px-6 py-2.5 bg-white/70 backdrop-blur-sm text-gray-800 font-medium hover:bg-white transition text-sm"
            >
              Explore Tours
            </a>
            <a
              href="#contact"
              className="rounded-full px-6 py-2.5 bg-[#F5C200] text-[#1C3A6B] font-bold hover:bg-[#D4A800] transition text-sm shadow-lg"
            >
              Book Now ✈
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
