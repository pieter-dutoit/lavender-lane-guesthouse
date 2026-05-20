import type { NextConfig } from "next";

const DEFAULT_R2_BUCKET_URL =
  "https://pub-0f026b3e7ada40e1abeb4ecc6c3619e5.r2.dev";

const r2BucketUrl =
  process.env.NEXT_PUBLIC_R2_BUCKET_URL ?? DEFAULT_R2_BUCKET_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("/**", r2BucketUrl)],
    qualities: [75],
  },
};

export default nextConfig;
