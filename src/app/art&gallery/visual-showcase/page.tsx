"use client";

import React from 'react';

/**
 * Interface สำหรับข้อมูล Portfolio เพื่อแก้ไขข้อผิดพลาด TypeScript
 */
interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
}

export default function Page() {
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: 'LAST LONDON VLOG',
      category: 'TRAVEL',
      date: 'SEPTEMBER 25, 2024',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 2,
      title: 'MIDNIGHT SNACK',
      category: 'FOOD',
      date: 'SEPTEMBER 24, 2024',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 3,
      title: 'AUTUMN ROADTRIP',
      category: 'TRAVEL',
      date: 'SEPTEMBER 23, 2024',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 4,
      title: 'NOTHING IS PROMISED',
      category: 'LIFESTYLE',
      date: 'SEPTEMBER 22, 2024',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 5,
      title: 'LAPOINT VINNARE',
      category: 'FOOD',
      date: 'SEPTEMBER 21, 2024',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 6,
      title: 'LAST NIGHT WAS REAL',
      category: 'LIFESTYLE',
      date: 'SEPTEMBER 20, 2024',
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 7,
      title: 'FESTIVAL READY',
      category: 'LIFESTYLE',
      date: 'SEPTEMBER 19, 2024',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: 8,
      title: 'SUMMER SEASON',
      category: 'FASHION',
      date: 'SEPTEMBER 17, 2024',
      image: 'https://images.unsplash.com/photo-1523381235312-3f113d27cca2?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 9,
      title: 'WEEKEND TRIP',
      category: 'TRAVEL',
      date: 'SEPTEMBER 16, 2024',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-zinc-800 line-seed-page">
      {/* Hero Section */}
      <header className="relative w-full h-[85vh] overflow-hidden group">
        <div className="absolute inset-0 scale-105 group-hover:scale-100 transition-transform duration-[2000ms]">
          <img 
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000" 
            alt="Minimalist Living Interior" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        <div className="absolute bottom-12 left-6 md:left-24 max-w-xl text-white">
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.3em] mb-4">STRUKT INTERIORS</h1>
          <p className="text-sm md:text-base font-light leading-relaxed opacity-80 tracking-wide">
            At Strukt Interiors, we believe that design is more than aesthetics—it's an intentional balance between space, material, and purpose. We focus on minimalism where form meets functionality and every element serves our customers.
          </p>
        </div>
      </header>

      {/* Philosophy Section */}
      <section className="py-32 px-6 max-w-4xl mx-auto text-center">
        <p className="text-sm md:text-base font-light leading-relaxed tracking-[0.05em] text-zinc-400 mb-16 max-w-2xl mx-auto">
          At Strukt Interiors, we believe that design is more than aesthetics—it's an intentional balance between space, material, and purpose. Each project is a unique exploration where raw beauty meets refinement.
        </p>
        
        {/* ปุ่มรูปแบบกล่อง (Button Box) */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8">
          <a href="#" className="w-full sm:w-auto px-10 py-4 border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-white hover:bg-white hover:text-black group">
            <span className="text-[11px] font-bold tracking-[0.5em] uppercase">
              Learn More
            </span>
          </a>
          
          <a href="#series-content" className="w-full sm:w-auto px-10 py-4 border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-white hover:bg-white hover:text-black group">
            <span className="text-[11px] font-bold tracking-[0.5em] uppercase">
              Project Showcase
            </span>
          </a>
        </div>
      </section>

      {/* Portfolio Grid - Masonry Bento Style */}
      <section className="px-1 pb-24 max-w-[1600px] mx-auto" id="series-content">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-1 auto-rows-[280px] md:auto-rows-[320px]">
          <PortfolioCard item={portfolioItems[0]} className="md:col-span-2 lg:col-span-8 md:row-span-2" />
          <div className="md:col-span-2 lg:col-span-4 grid grid-rows-2 gap-1">
             <PortfolioCard item={portfolioItems[1]} />
             <PortfolioCard item={portfolioItems[2]} />
          </div>

          <PortfolioCard item={portfolioItems[3]} className="md:col-span-1 lg:col-span-3 md:row-span-2" />
          <PortfolioCard item={portfolioItems[4]} className="md:col-span-3 lg:col-span-9 md:row-span-2" />
          <PortfolioCard item={portfolioItems[5]} className="md:col-span-1 lg:col-span-3 md:row-span-1" />

          <PortfolioCard item={portfolioItems[6]} className="md:col-span-3 lg:col-span-9 md:row-span-2" />
          <div className="md:col-span-1 lg:col-span-3 grid grid-rows-2 gap-1">
             <PortfolioCard item={portfolioItems[7]} />
             <PortfolioCard item={portfolioItems[8]} />
          </div>
        </div>
      </section>

      <style>
        {`
        /* Import LINE Seed Sans TH */
        @font-face {
            font-family: 'LINE Seed Sans TH';
            src: url('https://cdn.jsdelivr.net/gh/promptcloud/line-seed-sans-th@v1.0.0/fonts/LINESeedSansTH_W_Rg.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
        }
        @font-face {
            font-family: 'LINE Seed Sans TH';
            src: url('https://cdn.jsdelivr.net/gh/promptcloud/line-seed-sans-th@v1.0.0/fonts/LINESeedSansTH_W_Bd.woff2') format('woff2');
            font-weight: 700;
            font-style: normal;
        }
        @font-face {
            font-family: 'LINE Seed Sans TH';
            src: url('https://cdn.jsdelivr.net/gh/promptcloud/line-seed-sans-th@v1.0.0/fonts/LINESeedSansTH_W_Th.woff2') format('woff2');
            font-weight: 100;
            font-style: normal;
        }

        .line-seed-page {
            font-family: "Helvetica Neue", Helvetica, Arial, "LINE Seed Sans TH", sans-serif !important;
        }
        `}
      </style>
    </div>
  );
}

interface PortfolioCardProps {
  item: PortfolioItem | undefined;
  className?: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, className = "" }) => {
  if (!item) return null;

  return (
    <div className={`relative group overflow-hidden cursor-pointer ${className}`}>
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 group-hover:bg-black/40 transition-all duration-500"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
        <span className="text-[10px] font-bold tracking-[0.4em] mb-2 opacity-60 uppercase">
          {item.category}
        </span>
        
        <h3 className="text-sm md:text-base font-light tracking-[0.3em] mb-3 uppercase transform transition-all duration-700 group-hover:tracking-[0.4em]">
          {item.title}
        </h3>
        
        <span className="text-[9px] font-medium tracking-[0.2em] opacity-50 uppercase">
          {item.date}
        </span>
      </div>
    </div>
  );
};