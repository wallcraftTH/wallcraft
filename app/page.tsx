'use client';

import { useState, useEffect } from 'react';
// import Link from 'next/link'; // ถ้าไม่ได้ใช้ Link ในหน้าเนื้อหา (เช่นปุ่ม Learn More ไม่ได้เป็น Link) ก็เอาออกได้ครับ

export default function HomePage() {
  // ลบ state scrolled ออกไป เพราะ Navbar จัดการเองแล้ว
  const [loaded, setLoaded] = useState(false);
  
  // สถานะสำหรับรูปภาพทั้ง 3 การ์ด
  const [images, setImages] = useState([
    'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/LandPage_Images/31f60903460cd3e7eb32d2dbcc9e6940.webp',
    'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/LandPage_Images/078%20copy.webp',
    'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/LandPage_Images/20250815_1044__remix_01k2nx4b0qftka3qef1be5jx2g.webp'
  ]);
  
  const [updatingCard, setUpdatingCard] = useState<number | null>(null);

  const allImages = [
    'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/LandPage_Images/assets_task_01k3jxyp8vffk9x738066mczkm_1756203377_img_3.webp',
    'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/LandPage_Images/078%20copy.webp',
    'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/LandPage_Images/20250814_1557_remix_01k2kwmvr5exwbsc8fhg59c9xr.webp',
    'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/LandPage_Images/20250815_1044__remix_01k2nx4b0qftka3qef1be5jx2g.webp',
    'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/LandPage_Images/20250821_1552__remix_01k35x41xvfc0bfnda599xax37.webp',
    'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/LandPage_Images/31f60903460cd3e7eb32d2dbcc9e6940.webp',
    'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/LandPage_Images/assets_task_01k1z469h8fsgbgy0g1cnj95rj_1754465170_img_1.webp',
    'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/LandPage_Images/assets_task_01k21afxfcfddb42ghs5307qc9_1754538883_img_2.webp'
  ];

  useEffect(() => {
    // ลบ event listener scroll ที่ไม่จำเป็นออก (เพราะใช้แค่กับ Navbar)
    setTimeout(() => setLoaded(true), 300);
  }, []);

  useEffect(() => {
    let batchIdx = 0;
    const cycleImages = async () => {
        batchIdx = (batchIdx + 1) % Math.floor(allImages.length / 3);
        const startIdx = batchIdx * 3;
        
        const updateOne = (cardIndex: number, newSrc: string) => {
            return new Promise<void>((resolve) => {
                setUpdatingCard(cardIndex);
                setTimeout(() => {
                    setImages(prev => {
                        const next = [...prev];
                        next[cardIndex] = newSrc;
                        return next;
                    });
                    setTimeout(() => {
                        setUpdatingCard(null);
                        resolve();
                    }, 500);
                }, 800);
            });
        };

        await updateOne(0, allImages[(startIdx + 0) % allImages.length]);
        await new Promise(r => setTimeout(r, 600));
        await updateOne(1, allImages[(startIdx + 1) % allImages.length]);
        await new Promise(r => setTimeout(r, 600));
        await updateOne(2, allImages[(startIdx + 2) % allImages.length]);
    };

    const interval = setInterval(cycleImages, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="noise min-h-screen bg-black text-[#808080] antialiased">
      {/* ลบส่วน <nav> ออกไปแล้ว เพราะมันจะมาจาก layout.tsx เอง 
      */}

      {/* Main Content */}
      <main className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between pt-40 pb-12 px-6 md:px-16 max-w-[1600px] mx-auto overflow-hidden">
        
        {/* Text Content */}
        <div className="relative z-10 w-full lg:w-[40%] animate-reveal">
           <h1 className="text-4xl md:text-5xl xl:text-7xl font-bold mb-8 gold-text">
             ตัวตนของผนัง<br />ที่สะท้อนสไตล์
           </h1>
           <p className="text-lg md:text-xl text-[#c2bfb6] font-light max-w-xl">
             เรามองว่าผนังไม่ใช่เพียงฉากหลัง แต่คือองค์ประกอบหลักที่กำหนดอารมณ์ สร้างบรรยากาศ และบอกเล่ารสนิยมของพื้นที่ได้อย่างชัดเจน
           </p>
           {/* ปุ่มและ Stats */}
           <div className="flex gap-4 mt-12">
              <button className="px-8 py-4 bg-zinc-800 text-gray-300 rounded-full text-[11px] tracking-widest uppercase font-bold hover:bg-zinc-700 transition">Learn More</button>
              <button className="px-8 py-4 border border-zinc-600 text-gray-400 rounded-full text-[11px] tracking-widest uppercase font-bold hover:border-zinc-400 transition">View Series</button>
           </div>
        </div>

        {/* Floating Display */}
        <div className="w-full lg:w-[55%] flex items-center justify-center relative">
          <div className={`display-container ${loaded ? 'loaded' : ''}`}>
            {images.map((src, index) => (
               <div key={index} className={`float-card card-${index} ${updatingCard === index ? 'card-updating' : ''}`}>
                 <img src={src} className="w-full h-full object-cover" alt="Wallcraft" />
               </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}