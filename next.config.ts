import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // You can add port and pathname if needed, but often hostname is enough
      },
      // Add other hostnames if you use images from other external sources
    ],
  },
};

export default nextConfig;
