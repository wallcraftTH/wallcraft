import type { Metadata } from "next";
import { Prompt, Noto_Sans_Thai } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "./globals.css";

// --------------------------------------------------------
// [สำคัญ] ต้องเพิ่มบรรทัดนี้ครับ (เลือก path ให้ตรงกับที่คุณแก้ไปเมื่อสักครู่)
// ถ้าไฟล์อยู่ที่ app/components/Navbar.tsx ให้ใช้แบบนี้:
import Navbar from "./components/Navbar"; 
// --------------------------------------------------------

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}