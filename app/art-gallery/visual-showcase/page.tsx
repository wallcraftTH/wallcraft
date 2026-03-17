'use client';
import React from 'react';

export default function VisualShowcasePage() {
  return (
    <div className="bg-[#121212] min-h-screen text-white pt-32 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto text-center">
        <h1 className="text-4xl lg:text-6xl font-['Playfair_Display'] text-[#c6a87c] uppercase tracking-widest mb-6">
          Visual Showcase
        </h1>
        <div className="h-1 w-20 bg-[#c6a87c] mx-auto mb-12"></div>
        
        {/* Placeholder สำหรับแกลเลอรี่รูปภาพสวยๆ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[4/5] bg-zinc-900 border border-white/5 overflow-hidden group relative">
              <div className="absolute inset-0 flex items-center justify-center text-zinc-800 uppercase tracking-widest text-xs">
                Image Coming Soon
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}