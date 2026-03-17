import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  experimental: { cpus: 1 },
  productionBrowserSourceMaps: false,
};

export default nextConfig;