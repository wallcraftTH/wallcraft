import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  experimental: { cpus: 1 },
  productionBrowserSourceMaps: false,
  
  // 👇 เพิ่มส่วนนี้เข้าไปครับ: การดัดทางบอท (301 Redirect)
  async redirects() {
    return [
      {
        // ถ้าบอทหาโฟลเดอร์เก่าพวก /series/อะไรก็ตาม
        source: '/series/:path*',
        // ให้เด้งกลับมาที่หน้าแรกทันที
        destination: '/',
        // บอก Google ว่า "ย้ายถาวรแล้ว" (จะได้คะแนน SEO)
        permanent: true, 
      },
      {
        // ถ้าบอทหาโฟลเดอร์เก่าพวก /collection/อะไรก็ตาม
        source: '/collection/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;