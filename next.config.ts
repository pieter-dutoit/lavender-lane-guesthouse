import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/media/**",
        search: "",
      },
    ],
    deviceSizes: [
      640, 750, 828, 960, 1080, 1200, 1440, 1536, 1920, 2048, 2560, 3840,
    ],
    imageSizes: [32, 48, 64, 96, 112, 128, 160, 256, 320, 384, 480, 512],
    qualities: [75],
    formats: ["image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/#contact",
        permanent: true,
      },
      {
        source: "/gallery",
        destination: "/#gallery",
        permanent: true,
      },
      {
        source: "/rooms/:path*",
        destination: "/#rooms-rates",
        permanent: true,
      },
      {
        source: "/our-rooms/:path*",
        destination: "/#rooms-rates",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
