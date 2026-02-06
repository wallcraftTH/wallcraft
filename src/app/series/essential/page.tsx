'use client';

import React, { useState, useEffect, useRef } from 'react';
// แก้ไข: ลบ import Link ออกเพื่อให้ทำงานได้ใน Environment นี้
// import Link from 'next/link';

// --- Data ---
const LAYERS_DATA = [
  {
    title: 'DECORATIVE FILM',
    description: 'Advanced wood texture film with high-definition protective coating.',
    image: 'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%20156@2x.webp'
  },
  {
    title: 'ECO BAMBOO COMPOSITE',
    description: 'Core structure optimized for flexibility and structural integrity.',
    image: 'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%20157@2x.webp'
  }
];

const TECH_ICONS_DATA = [
  'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%20163@2x.webp',
  'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%20162@2x.webp',
  'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%20161@2x.webp',
  'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%20160@2x.webp',
  'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%20159@2x.webp',
  'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%20164@2x.webp'
];

// --- Helper Components ---

const Separator = () => (
  <div className="flex justify-center gap-1 h-1.5 w-28 my-8 mx-auto">
    <div className="bg-[#6A6C5F] w-1/3"></div>
    <div className="bg-[#7B2715] w-1/3"></div>
    <div className="bg-[#B08038] w-1/3"></div>
  </div>
);

const CollectionSection = ({ 
  title, 
  highlight, 
  desc, 
  img, 
  link, 
  reverse = false, 
  color = '#c2bfb6' 
}: { 
  title: string, 
  highlight: string, 
  desc: string, 
  img: string, 
  link: string, 
  reverse?: boolean, 
  color?: string 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); 
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.disconnect();
    };
  }, []);

  const imageAnim = isVisible 
    ? 'opacity-100 translate-x-0' 
    : `opacity-0 ${reverse ? '-translate-x-24' : 'translate-x-24'}`;

  const textAnim = isVisible 
    ? 'opacity-100 translate-y-0' 
    : 'opacity-0 translate-y-16';

  return (
    <section 
      ref={sectionRef}
      className={`relative z-10 flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} min-h-[80vh] items-center py-20 border-t border-white/5 overflow-hidden`}
    >
      <div className={`w-full lg:w-[50%] flex flex-col justify-center px-8 md:px-16 lg:px-24 transition-all duration-1000 ease-out ${textAnim}`}>
        <div className="max-w-lg">
          <div className="flex-1 space-y-4 mb-8">
            <Separator />
          </div>

          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-8" style={{ color: '#B08036' }}>
            {title}<br /><span style={{ color: '#c2bfb6' }}>{highlight}</span>
          </h1>
          <p className="text-[10px] md:text-xs lg:text-sm font-light leading-relaxed max-w-md mb-12 text-[#c2bfb6]">
            {desc}
          </p>
          {/* แก้ไข: ใช้ <a> แทน <Link> เพื่อให้ทำงานได้ใน Preview นี้ */}
          <a href={link} className="inline-block border px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#c2bfb6] hover:text-black" style={{ color: '#c2bfb6', borderColor: 'rgba(194, 191, 182, 0.4)' }}>
            Learn More
          </a>
        </div>
      </div>
      <div className="w-full lg:w-[50%] h-[50vh] lg:h-[80vh] flex items-center justify-center p-6 lg:p-12">
        <img 
          src={img} 
          className={`w-full h-full object-contain relative z-10 drop-shadow-xl transition-all duration-1000 ease-out ${imageAnim}`} 
          alt={title} 
        />
      </div>
    </section>
  );
};

// --- Main Page Component ---

export default function EssentialSeriesPage() {
  const [isStacked, setIsStacked] = useState(true);
  const [activeLayerIndex, setActiveLayerIndex] = useState<number | null>(null);
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);

    const handleScroll = () => {
      if (stackContainerRef.current && activeLayerIndex === null) {
        const rect = stackContainerRef.current.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        const sectionMid = rect.top + rect.height / 2;
        const viewMid = viewHeight / 2;
        const distance = Math.abs(sectionMid - viewMid);
        const maxDistance = viewHeight * 0.8;

        let expansionFactor = 1 - (distance / maxDistance);
        expansionFactor = Math.max(0, Math.min(1, expansionFactor));

        if (expansionFactor > 0.4) {
          setIsStacked(false);
        } else {
          setIsStacked(true);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeLayerIndex]);

  const getLayerStyle = (index: number) => {
    const isMobile = windowWidth < 768;
    const stackedSpacing = isMobile ? 9 : 14;
    const expandedSpacing = isMobile ? 80 : 200;
    const totalLayers = LAYERS_DATA.length;

    let style: React.CSSProperties = {
      transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease',
      position: 'absolute',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    if (activeLayerIndex !== null) {
      if (index === activeLayerIndex) {
        style.opacity = 1;
        style.zIndex = 100;
        style.transform = `translateY(0px)`;
      } else {
        style.opacity = 0.15;
        style.transform = `translateY(0px)`;
      }
    } else {
      style.opacity = 1;
      const finalY = isStacked 
        ? index * stackedSpacing 
        : (index * expandedSpacing) - ((totalLayers - 1) * expandedSpacing / 2);
      
      style.zIndex = totalLayers - index;
      style.transform = `translateY(${finalY}px)`;
    }

    return style;
  };

  const toggleLayer = (index: number) => {
    setActiveLayerIndex(prev => prev === index ? null : index);
    setIsStacked(false);
  };

  return (
    <div className={`min-h-screen text-[#9ca3af] selection:bg-orange-500 selection:text-white overflow-x-hidden font-sans`}>
      
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ 
            backgroundImage: "url('https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/a97dadae3afc99615841325016e26563-gigapixel-standard%20v2-2x.webp')" 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 to-black/30" />
      </div>

      {/* --- HERO --- */}
      {/* เปลี่ยน header เป็น section เพื่อไม่ให้ชนกับ Layout หลัก */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden pb-12 lg:pb-0 pt-20">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-[1800px] grid grid-cols-1 lg:grid-cols-2 z-20">
          <div className="flex flex-col justify-center animate-[fadeInUp_1s_ease-out_forwards]">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase mb-8 leading-[1.1]" style={{ color: '#B08038' }}>
              Essential<br />Series
            </h1>
            <p className="text-[10px] md:text-xs lg:text-sm font-light leading-relaxed max-w-md mb-12 text-[#c2bfb6]">
              ผนังดีไซน์ใหม่ที่มอบทางเลือกการติดตั้งและการจบงานที่สมบูรณ์แบบ พร้อม Accessories หลากหลายและเฉพาะตัว ครอบคลุมทั้ง Flat, 3D Wall และ LED ช่วยลดโอกาสการเกิดปัญหาหน้างาน
            </p>
          </div>
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-end overflow-hidden pointer-events-none">
          <div className="relative w-full h-full flex justify-end items-center">
            <img 
              src="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%20158@2x.webp" 
              className="h-[85vh] lg:h-[95vh] w-auto object-contain opacity-90 transition-transform duration-1000 transform translate-x-[5%]"
              alt="Essential Material" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent lg:w-[50%]"></div>
          </div>
        </div>
      </section>

      {/* --- TECH LAYER --- */}
      <section className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-20">
        <div className="text-center mb-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
          <Separator />
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 uppercase text-white">Structure Detail</h2>
        </div>

        <div ref={stackContainerRef} className="relative w-full max-w-7xl h-[600px] flex justify-center items-center my-4" style={{ perspective: '2500px' }}>
            {LAYERS_DATA.map((layer, index) => {
              const style = getLayerStyle(index);
              const isActive = index === activeLayerIndex;
              const isExpanded = !isStacked;

              return (
                <div 
                  key={index}
                  onClick={() => toggleLayer(index)}
                  className="group cursor-pointer"
                  style={style}
                >
                  <div className="relative w-[320px] h-[200px] md:w-[600px] md:h-[350px] flex items-center justify-center">
                    <div 
                      className="w-full h-full flex justify-center items-center transition-all duration-500 ease-out"
                      style={{ transform: 'rotateZ(-5deg)', transformStyle: 'preserve-3d' }}
                    >
                      <img src={layer.image} className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" alt={layer.title} />
                    </div>

                    <div className={`hidden md:flex items-center absolute left-[85%] z-50 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${isExpanded || isActive ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-[40px] pointer-events-none'}`}>
                        <div className="relative h-[1px] w-[80px] bg-gradient-to-r from-[#B08038]/40 to-[#B08038]">
                          <div className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#B08038] rounded-full shadow-[0_0_10px_#B08038]"></div>
                        </div>
                        <div className="ml-6 text-left whitespace-nowrap">
                          <h3 className="font-bold text-lg md:text-xl tracking-[0.2em] uppercase text-[#B08038]">{layer.title}</h3>
                          <div 
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'opacity-100 max-h-[100px] mt-2' : 'opacity-0 max-h-0'}`}
                          >
                            <p className="text-gray-300 text-xs leading-relaxed font-light max-w-[250px]" dangerouslySetInnerHTML={{ __html: layer.description }} />
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="flex justify-center w-full mt-4">
          <button 
            onClick={() => {
              setIsStacked(!isStacked);
              setActiveLayerIndex(null);
            }} 
            className="border border-[#B08038]/40 px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c2bfb6] bg-black/20 backdrop-blur-sm transition-all duration-400 hover:bg-[#B08038] hover:text-white hover:border-[#B08038] hover:shadow-[0_0_20px_rgba(176,128,56,0.3)]"
          >
            {isStacked ? 'Explore Layers' : 'Close Layers'}
          </button>
        </div>

        <div className="w-full max-w-[1400px] mx-auto mt-12 px-8 relative z-20">
            <div className="flex flex-nowrap justify-center gap-[38px] md:gap-[91px] overflow-x-auto lg:overflow-x-visible pb-4 no-scrollbar">
                {TECH_ICONS_DATA.map((img, idx) => (
                    <div key={idx} className="flex flex-col items-center group cursor-pointer flex-shrink-0">
                        <div className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] flex items-center justify-center">
                            <img src={img} className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-700" alt="Tech Icon" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- COLLECTION SECTIONS --- */}
      <CollectionSection 
        title="Solid" 
        highlight="Panel"
        desc="ผนังสำเร็จรูป พร้อมติดตั้งทันทีโดยไม่ต้องเตรียมพื้นผิวมาก"
        img="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%20169@2x.webp"
        link="/collection/essential-solid"
        color="#c2bfb6"
      />

      <CollectionSection 
        title="Hollow Core" 
        highlight="Panel"
        desc="ผนังที่มาพร้อมลูกเล่นหลากหลายในการต่อระหว่างแผ่น รวมถึงระบบการเข้ามุมในตัวที่ช่วยให้งานเรียบร้อยและสวยงาม"
        img="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%20165@2x.webp"
        link="/collection/essential-hollow"
        color="#c2bfb6"
        reverse
      />

      <CollectionSection 
        title="Decor" 
        highlight="Panel"
        desc="ผนังระแนงมาพร้อมตัวจบมุมสำเร็จรูปที่ออกแบบ เฉพาะแต่ละรุ่นเพื่อความเรียบร้อยและสมบูรณ์แบบ"
        img="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%20168@2x.webp"
        link="/collection/essential-decor"
        color="#CBBDAD"
      />

      <CollectionSection 
        title="Accessories" 
        highlight="Aluminium & LED"
        desc="อลูมิเนียมเก็บงานในบางรุ่น สามารถเทียบสีฟิล์ม ได้อย่างแม่นยำพร้อมไฟ LED ขนาดกะทัดรัด"
        img="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%20167@2x.webp"
        link="/collection/essential-accessories"
        color="#c2bfb6"
        reverse
      />

      {/* แก้ไข: ใช้ <style> แทน <style jsx global> เพื่อป้องกัน Warning ใน Console */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}