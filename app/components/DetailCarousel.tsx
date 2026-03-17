//app/components/DetailCarousel.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface DetailCarouselProps {
  items: any[];
  selectedItem: string;
  onSelect: (item: string) => void;
}

export default function DetailCarousel({ items, selectedItem, onSelect }: DetailCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // โชว์ทีละ 3 รูป
  const itemsToShow = 3; 
  // คำนวณขอบเขตการเลื่อนสูงสุด
  const maxIndex = Math.max(0, items.length - itemsToShow);

  // 🔥 1. Logic ใหม่: เลื่อนตัวที่เลือกมา "ตรงกลาง"
  useEffect(() => {
    const selectedIdx = items.findIndex(item => item.name === selectedItem);
    if (selectedIdx !== -1) {
        // อยากให้ตัวที่เลือกอยู่ตรงกลาง (ตำแหน่งที่ 2) ก็ต้องถอยหลังไป 1 ช่อง
        // เช่น เลือกตัวที่ 5 -> ต้องเริ่มโชว์ที่ตัวที่ 4 (จะได้เห็น 4, [5], 6)
        let targetIndex = selectedIdx - 1;

        // แต่ต้องไม่เกินขอบซ้าย (0) และขอบขวา (maxIndex)
        targetIndex = Math.max(0, Math.min(targetIndex, maxIndex));
        
        setCurrentIndex(targetIndex);
    }
  }, [selectedItem, items.length, maxIndex]);

  const next = () => {
    if (currentIndex < maxIndex) setCurrentIndex(prev => prev + 1);
  };

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= maxIndex;

  // กรณีรูปน้อยกว่า 3 อัน ให้แสดงแบบปกติ
  if (items.length <= itemsToShow) {
    return (
      <div className="flex gap-2">
        {items.map((item) => (
          <button
            key={item.name}
            onClick={() => onSelect(item.name)}
            // ใช้ w-1/3 เพื่อแบ่ง 3 ส่วนเท่ากัน
            className={`
                block aspect-square w-1/3 rounded-sm overflow-hidden border transition-all duration-200 
                ${selectedItem === item.name 
                    ? 'border-[#c6a87c] scale-105 ring-1 ring-[#c6a87c]' 
                    : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                }
            `}
          >
            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 select-none">
      
      {/* ปุ่มซ้าย */}
      <button 
        onClick={prev}
        disabled={isAtStart}
        className={`p-1 transition-colors flex-shrink-0 ${isAtStart ? 'text-zinc-700 cursor-not-allowed' : 'text-[#c6a87c] hover:bg-white/5 cursor-pointer'}`}
      >
        <FaChevronLeft size={16} />
      </button>

      {/* Viewport */}
      <div className="overflow-hidden flex-1">
         {/* Track */}
         <div 
           className="flex transition-transform duration-500 ease-out" 
           style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
         >
            {items.map((item) => (
               // 🔥 2. แก้ปัญหาแสดงเยอะเกิน: ใส่ flex-shrink-0 
               // เพื่อห้ามไม่ให้รูปรวมตัวกันบีบจนเล็ก
               <div key={item.name} className="flex-shrink-0 w-1/3 px-1">
                  <button
                    onClick={() => onSelect(item.name)}
                    title={item.name}
                    className={`
                        block aspect-square w-full rounded-sm overflow-hidden border transition-all duration-300
                        ${selectedItem === item.name 
                            ? 'border-[#c6a87c] scale-105 ring-1 ring-[#c6a87c] shadow-lg z-10 relative' 
                            : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                        }
                    `}
                  >
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </button>
               </div>
            ))}
         </div>
      </div>

      {/* ปุ่มขวา */}
      <button 
        onClick={next}
        disabled={isAtEnd}
        className={`p-1 transition-colors flex-shrink-0 ${isAtEnd ? 'text-zinc-700 cursor-not-allowed' : 'text-[#c6a87c] hover:bg-white/5 cursor-pointer'}`}
      >
        <FaChevronRight size={16} />
      </button>

    </div>
  );
}