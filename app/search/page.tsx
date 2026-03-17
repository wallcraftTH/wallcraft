'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // ปล่อยให้มันใส่ URL ไปก่อน แต่ยังไม่ต้องมีระบบค้นหาจริง
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-32 md:px-12 flex flex-col items-center justify-start text-white">
      
      <div className="w-full max-w-3xl text-center mb-12">
        <h1 className="text-4xl lg:text-6xl font-['Playfair_Display'] text-[#c6a87c] uppercase tracking-widest mb-4">
          Search Archive
        </h1>
        <p className="text-zinc-500 tracking-[0.2em] uppercase text-sm">
          Find your perfect Wallcraft collection
        </p>
      </div>

      {/* ช่องค้นหาแบบ Standalone */}
      <div className="w-full max-w-2xl mx-auto mb-16">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search collections, textures, or styles..." 
            className="w-full bg-black/40 border border-white/10 text-white rounded-full py-4 pl-6 pr-16 focus:outline-none focus:border-[#B08038] transition-colors"
          />
          <button 
            type="submit" 
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#B08038] transition-colors p-2"
          >
            <FaMagnifyingGlass />
          </button>
        </form>
      </div>

      {/* กล่องข้อความแบบเรียบหรู (แทนระบบค้นหาจริง) */}
      <div className="w-full max-w-4xl p-16 border border-dashed border-zinc-800 rounded-sm text-center bg-black/20 backdrop-blur-sm">
        <p className="text-[#c2bfb6] text-lg mb-4">"Search engine is currently under maintenance."</p>
        <p className="text-zinc-600 text-xs tracking-widest uppercase">
          Please use the Navigation Menu to explore our collections.
        </p>
      </div>

    </div>
  );
}