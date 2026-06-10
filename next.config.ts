import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  webpack: (config) => {
    // `jose` (used internally by NextAuth) references CompressionStream/
    // DecompressionStream, which Next's static analyzer flags for the Edge
    // runtime. These Web APIs ARE available on the Vercel Edge runtime, so the
    // warning is a false positive — silence it to keep the build output clean.
    config.ignoreWarnings = [
      ...(config.ignoreWarnings ?? []),
      {
        module: /node_modules\/jose/,
        message: /(CompressionStream|DecompressionStream)/,
      },
    ];
    return config;
  },
};

export default nextConfig;
