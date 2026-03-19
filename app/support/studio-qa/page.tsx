 'use client';
import React, { useState } from 'react';

const FAQS = [
  { q: "วัสดุ MCM คืออะไร?", a: "MCM (Modified Clay Material) คือวัสดุตกแต่งผนังนวัตกรรมใหม่ที่สกัดจากแร่ธาตุธรรมชาติ มีความยืดหยุ่น น้ำหนักเบา และทนทานสูง" },
  { q: "สามารถติดตั้งภายนอกอาคารได้หรือไม่?", a: "ได้ครับ วัสดุของเราทนต่อรังสี UV และทุกสภาพอากาศ ไม่ซีดจางและไม่กรอบแตก" },
  { q: "วิธีทำความสะอาดที่ถูกต้องคืออะไร?", a: "สามารถใช้ผ้าชุบน้ำหมาดๆ เช็ดทำความสะอาดได้ปกติ เนื่องจากผิวหน้ามีชั้น UV Coating ป้องกันคราบฝังลึก" },
  { q: "การติดตั้งต้องใช้ช่างเฉพาะทางไหม?", a: "ช่างติดตั้งกระเบื้องหรือช่างผนังทั่วไปสามารถติดตั้งได้ง่ายครับ โดยใช้ปูนกาวชนิดพิเศษจากทางเรา" }
];

export default function StudioQAPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <header className="text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-['Playfair_Display'] text-[#c6a87c] uppercase tracking-widest mb-6">
            Studio Q&A
          </h1>
          <div className="h-[1px] w-20 bg-[#c6a87c] mx-auto opacity-50"></div>
        </header>

        <div className="space-y-12">
          {FAQS.map((item, index) => (
            <div key={index} className="group border-b border-white/5 pb-8">
              <h3 className="text-[#c6a87c] font-medium tracking-widest uppercase text-sm mb-4 flex gap-4">
                <span className="opacity-30">0{index + 1}</span> {item.q}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-light pl-10">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-6">Still have questions?</p>
          <a href="https://line.me" target="_blank" className="inline-block border border-[#c6a87c] text-[#c6a87c] px-10 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-[#c6a87c] hover:text-black transition-all">
            Contact Specialist
          </a>
        </div>
      </div>
    </div>
  );
}