//app/components/VariantCarousel.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface VariantCarouselProps {
  variants: any[];
  productId: number;
}

export default function VariantCarousel({ variants, productId }: VariantCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3; // แสดงทีละ 3 รูป

  // คำนวณจุดสิ้นสุด (ไม่ให้เลื่อนเกิน)
  const maxIndex = Math.max(0, variants.length - itemsToShow);

  const next = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Logic ปุ่ม: ถ้าสุดทางแล้วให้ปุ่มจางลง
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= maxIndex;

  // ถ้ามีรูปน้อยกว่า 3 ให้แสดงแบบธรรมดา (ไม่ต้องสไลด์)
  if (variants.length <= itemsToShow) {
    return (
      <div className="flex gap-4">
        {variants.map((v, idx) => (
          <Link 
            key={idx} 
            href={`/product/${productId}?style=${encodeURIComponent(v.pattern || v.color || v.sku)}`}
            className="block aspect-square w-1/3 border border-[#444] rounded-sm hover:border-[#c6a87c] hover:scale-105 transition-all overflow-hidden"
          >
             <img src={v.variant_image} alt="style" className="w-full h-full object-cover" />
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      
      {/* ปุ่มซ้าย */}
      <button 
        onClick={prev}
        disabled={isAtStart}
        className={`z-10 p-2 text-[#c6a87c] hover:text-white transition-colors ${isAtStart ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-white/5 rounded-full'}`}
      >
        <FaChevronLeft size={16} />
      </button>

      {/* หน้าต่างแสดงผล (Viewport) - ซ่อนส่วนที่ล้น */}
      <div className="overflow-hidden flex-1">
         {/* รางเลื่อน (Track) - ขยับด้วย translateX */}
         <div 
           className="flex transition-transform duration-500 ease-out" 
           style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
         >
            {variants.map((v, idx) => {
               const styleName = v.pattern || v.color || v.sku;
               return (
                 // กำหนดความกว้าง 33.33% (1/3) และใส่ padding เพื่อให้เกิดช่องว่างระหว่างรูป
                 <div key={idx} className="min-w-[33.333%] px-2">
                    <Link
                      href={`/product/${productId}?style=${encodeURIComponent(styleName)}`}
                      className="block aspect-square w-full border border-[#444] rounded-sm hover:border-[#c6a87c] hover:scale-105 transition-all duration-300 overflow-hidden shadow-md"
                    >
                      <img src={v.variant_image} alt={styleName} className="w-full h-full object-cover" />
                    </Link>
                 </div>
               );
            })}
         </div>
      </div>

      {/* ปุ่มขวา */}
      <button 
        onClick={next}
        disabled={isAtEnd}
        className={`z-10 p-2 text-[#c6a87c] hover:text-white transition-colors ${isAtEnd ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-white/5 rounded-full'}`}
      >
        <FaChevronRight size={16} />
      </button>

    </div>
  );
}