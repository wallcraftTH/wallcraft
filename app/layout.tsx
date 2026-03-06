import type { Metadata } from "next";
import { Prompt, Noto_Sans_Thai } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "./globals.css";

// ✅ 1. Import ทั้ง Navbar และ Footer
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-prompt",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["300", "400", "700"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wallcraft | Home Page",
  description: "Wallcraft Editorial Material Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${prompt.variable} ${notoSansThai.variable}`}>
      <body className={`antialiased noise font-sans text-[#808080]`}>
        
        {/* ส่วนหัว (แสดงทุกหน้า) */}
        <Navbar />
        
        {/* เนื้อหาของแต่ละหน้า */}
        {children}

        {/* ส่วนท้าย (แสดงทุกหน้า) */}
        <Footer />
        
      </body>
    </html>
  );
}