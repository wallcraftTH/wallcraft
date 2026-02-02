import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'brand-gold': '#B08038',
        'deep-black': '#080808',
      },
      fontFamily: {
        // --- ส่วนที่แก้ไข ---
        // ใช้ var(--font-prompt) เพื่อดึงฟอนต์ Prompt ที่โหลดมาแบบ Optimized
        sans: ['var(--font-prompt)', 'Helvetica Neue', 'Arial', 'sans-serif'], 
        // เพิ่ม noto เผื่ออยากใช้แยก (เรียกใช้ด้วย class="font-noto")
        noto: ['var(--font-noto)', 'sans-serif'],
      },
      animation: {
        reveal: 'reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards',
      },
      keyframes: {
        reveal: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};
export default config;