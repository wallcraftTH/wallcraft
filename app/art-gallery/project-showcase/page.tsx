'use client';
import React from 'react';

export default function ProjectShowcasePage() {
  return (
    <div className="bg-[#121212] min-h-screen text-white pt-32 pb-20 px-6 text-center">
      <h1 className="text-4xl lg:text-6xl font-['Playfair_Display'] text-[#c6a87c] uppercase tracking-widest mb-6">
        Project Showcase
      </h1>
      <p className="text-zinc-500 tracking-[0.2em] uppercase text-sm mb-12">งานติดตั้งจริงโดยทีมงาน Wallcraft</p>
      
      <div className="max-w-[800px] mx-auto p-20 border border-dashed border-zinc-800 rounded-sm">
        <p className="text-[#c2bfb6] italic">"We are collecting our masterpieces. Stay tuned."</p>
      </div>
    </div>
  );
}