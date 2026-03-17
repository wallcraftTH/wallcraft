import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  experimental: { cpus: 1 },
  productionBrowserSourceMaps: false,
  
  async redirects() {
    return [
      {
        // ของเก่าที่ยังไม่ทำหน้าเว็บ ปล่อยให้มันเด้งกลับหน้าแรกไปก่อน
        source: '/series/:path*',
        destination: '/',
        permanent: true, 
      },
      // ลบส่วนของ collection ออกไปแล้ว! ทีนี้ลูกค้าจะเข้าหน้าสินค้านายได้แล้วครับ!
    ];
  },
};

export default nextConfig;