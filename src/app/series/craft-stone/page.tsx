'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef, ReactNode } from 'react';
// ลบ import Link ออกเนื่องจาก Environment ไม่รองรับ Next.js

// --- Types & Interfaces ---
interface LayerData {
  title: string;
  description: string;
  image: string;
}

interface ScrollRevealProps {
  children: ReactNode;
  width?: 'full' | '1/2' | 'auto';
  className?: string;
  delay?: number; // delay in ms
}

// --- Data ---
const LAYERS_DATA: LayerData[] = [
  {
    title: 'UV Coating Layer',
    description: 'เคลือบป้องกันรังสี UVลดการซีดจางของสี <br>ทำความสะอาดง่ายและช่วยยืดอายุการใช้งาน',
    image: 'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/set1_layer/layer1.png'
  },
  {
    title: 'Mineral Color Layer',
    description: 'ชั้นสีจากแร่ธรรมชาติ ทนแดดและทนไฟ <br> ให้สีสวยงามคงทน ไม่ซีดจางแม้ใช้กลางแจ้ง',
    image: 'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/set1_layer/layer2.png'
  },
  {
    title: 'Eco Clay Composite',
    description: 'ชั้นแกนกลางจากดินและผงหินดัดแปลง <br> ด้วยเทคโนโลยี เบา ยืดหยุ่น แข็งแรง ไม่แตกร้าว <br> และเป็นมิตรต่อสิ่งแวดล้อม',
    image: 'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/set1_layer/layer3.png'
  },
  {
    title: 'Fiberglass Mesh',
    description: 'ตาข่ายเสริมแรงป้องกันการแตกร้าวและบิดงอ <br> เพิ่มความทนทาน ทนไฟ และไม่เป็นสนิม',
    image: 'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/set1_layer/layer4.png'
  }
];

const TECH_ICONS_DATA = [
  'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/craft%20stone%20icon/Untitled-1-03.png',
  'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/craft%20stone%20icon/Untitled-1-04.png',
  'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/craft%20stone%20icon/Untitled-1-05.png',
  'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/craft%20stone%20icon/Untitled-1-06.png',
  'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/craft%20stone%20icon/Untitled-1-07.png',
  'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/craft%20stone%20icon/Untitled-1-08.png',
  'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/craft%20stone%20icon/Untitled-1-09.png'
];

// --- Helper Components ---

// 1. ScrollReveal Component: Handles the animation logic
const ScrollReveal = ({ children, width = 'auto', className = '', delay = 0 }: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility based on intersection
        // This ensures it animates "in" when scrolled to, and "out" when scrolled away if you prefer,
        // OR simply triggers once. 
        // For "scrolling up and down" interactive feel, we update state based on isIntersecting.
        if (entry.isIntersecting) {
            setIsVisible(true);
        } else {
            // Optional: Uncomment this line if you want the element to fade out when scrolling away
             setIsVisible(false); 
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${width === 'full' ? 'w-full' : width === '1/2' ? 'w-full lg:w-1/2' : 'w-auto'} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const Separator = () => (
  <div className="flex justify-center gap-1 h-1.5 w-28 my-8 mx-auto">
    <div className="bg-[#6A6C5F] w-1/3"></div>
    <div className="bg-[#7B2715] w-1/3"></div>
    <div className="bg-[#B08038] w-1/3"></div>
  </div>
);

const CollectionSection = ({ title, img, link, reverse = false }: { title: string, img: string, link: string, reverse?: boolean }) => {
  // Split title to separate Main Title and "Collection"
  const titleParts = title.split(' ');
  const mainTitle = titleParts.slice(0, -1).join(' ');
  const subTitle = titleParts[titleParts.length - 1];

  return (
    <section className={`relative z-10 flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} min-h-[80vh] items-center py-20 border-t border-white/5`}>
      
      {/* Text Content Side - Animated */}
      <ScrollReveal width="1/2" className="flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-lg">
          <div className="flex-1 space-y-4 mb-8">
            <div className="flex gap-1 h-1.5 w-28">
              <div className="bg-[#6A6C5F] w-1/3"></div>
              <div className="bg-[#7B2715] w-1/3"></div>
              <div className="bg-[#B08038] w-1/3"></div>
            </div>
          </div>
          {/* Apply specific colors: Main Title #B08038, Sub Title #c2bfb6 */}
          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-8" style={{ color: '#B08038' }}>
            {mainTitle} <span style={{ color: '#c2bfb6' }}><br />{subTitle}</span>
          </h1>
          <Link href={link} className="inline-block border px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#c2bfb6] hover:text-black hover:scale-105" style={{ color: '#c2bfb6', borderColor: 'rgba(194, 191, 182, 0.4)' }}>
            Learn More
          </Link>
        </div>
      </ScrollReveal>

      {/* Image Side - Animated with slight delay */}
      <ScrollReveal width="1/2" delay={200} className="h-[50vh] lg:h-[80vh] flex items-center justify-center p-6 lg:p-12">
        <div className="relative w-full h-full group">
             {/* Glow effect behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#B08038]/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <img 
                src={img} 
                className="w-full h-full object-contain relative z-10 transition-transform duration-700 ease-in-out group-hover:scale-105" 
                alt={title} 
            />
        </div>
      </ScrollReveal>

    </section>
  );
};

// --- Main Page Component ---

export default function CraftStonePage() {
  
  // Layer Animation State
  const [isStacked, setIsStacked] = useState(true);
  const [activeLayerIndex, setActiveLayerIndex] = useState<number | null>(null);
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  // --- Effects ---
  useEffect(() => {
    // Handle Window Resize
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Auto-expand logic based on scroll position relative to container
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

  // --- Logic for Layer Styles ---
  const getLayerStyle = (index: number) => {
    const isMobile = windowWidth < 768;
    const stackedSpacing = isMobile ? 9 : 14;
    const expandedSpacing = isMobile ? 45 : 120;
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
      // Single Layer Active View
      if (index === activeLayerIndex) {
        style.opacity = 1;
        style.zIndex = 100;
        style.transform = `translateY(0px)`;
      } else {
        style.opacity = 0.15;
        style.transform = `translateY(0px)`; // Keep others centered but faded
      }
    } else {
      // Stack/Expand View
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
    // CHANGE 1: Changed bg-black to bg-transparent so the fixed background is visible
    <div className={`min-h-screen bg-transparent text-[#9ca3af] selection:bg-orange-500 selection:text-white overflow-x-hidden font-sans`}>
      
      {/* Background with Overlay */}
      {/* CHANGE 2: Changed z-index from -1 to 0 to ensure visibility on all platforms */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ 
            backgroundImage: "url('https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/A7_04129%20copy.webp')" 
          }}
        />
        {/* Adjusted gradient transparency: lighter overlay so texture is visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
      </div>

      {/* --- SECTION 1: Hero --- */}
      <header className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden pt-20">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-[1800px] grid grid-cols-1 lg:grid-cols-2 z-30">
          <div className="flex flex-col justify-center animate-[fadeInUp_1s_ease-out_forwards]">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase mb-8 leading-[1.1]" style={{ color: '#B08038' }}>
              Craft Stone<br />Series
            </h1>
            <p className="text-[10px] md:text-xs lg:text-sm font-light leading-relaxed max-w-md mb-12 text-[#c2bfb6]">
              วัสดุตกแต่งผนังและพื้นผิวรุ่นใหม่ ผลิตจาก กลุ่มแร่ธรรมชาติ (Eco Clay Composite) ด้วยเทคโนโลยีเฉพาะทาง มอบคุณสมบัติเด่น น้ำหนักเบา ยืดหยุ่น แข็งแรง ไม่แตกร้าว ทนไฟ และเป็นมิตรต่อสิ่งแวดล้อม
            </p>
          </div>
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-end overflow-hidden pointer-events-none">
          <div className="relative w-full h-full flex justify-end items-center">
            <img 
              src="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%20100@2x.webp" 
              className="h-[85vh] lg:h-[95vh] w-auto object-contain opacity-80 transform translate-x-[8%]" 
              alt="Craft Stone Material" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent lg:w-[50%]"></div>
          </div>
        </div>
      </header>

      {/* --- SECTION 2: Technology Layer --- */}
      <section className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-20">
        <ScrollReveal className="text-center mb-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex gap-1 h-1.5 w-28 mb-10">
            <div className="bg-[#6A6C5F] w-1/3"></div>
            <div className="bg-[#7B2715] w-1/3"></div>
            <div className="bg-[#B08038] w-1/3"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 uppercase text-white">Structure Detail</h2>
        </ScrollReveal>

        {/* Stack Container */}
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
                    {/* Layer Card */}
                    <div 
                      className="w-full h-full flex justify-center items-center transition-all duration-500 ease-out"
                      style={{ transform: 'rotateZ(-5deg)', transformStyle: 'preserve-3d' }}
                    >
                      <img src={layer.image} className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" alt={layer.title} />
                    </div>

                    {/* Layer Label (Desktop) */}
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

        {/* Explore Button */}
        <ScrollReveal delay={100} className="flex justify-center w-full mt-10">
          <button 
            onClick={() => {
              setIsStacked(!isStacked);
              setActiveLayerIndex(null);
            }} 
            className="border border-[#B08038]/40 px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#c2bfb6] bg-black/20 backdrop-blur-sm transition-all duration-400 hover:bg-[#B08038] hover:text-white hover:border-[#B08038] hover:shadow-[0_0_20px_rgba(176,128,56,0.3)]"
          >
            {isStacked ? 'Explore Layers' : 'Close Layers'}
          </button>
        </ScrollReveal>

        {/* Tech Icons */}
        <div className="w-full max-w-[1400px] mx-auto mt-12 px-8 relative z-20">
          <div className="flex flex-nowrap justify-center gap-10 md:gap-20 overflow-x-auto lg:overflow-x-visible pb-4 no-scrollbar">
            {TECH_ICONS_DATA.map((img, idx) => (
              <ScrollReveal key={idx} delay={idx * 50} className="flex flex-col items-center group cursor-pointer flex-shrink-0">
                <div className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] flex items-center justify-center">
                  <img src={img} className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-700" alt="Tech Icon" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- COLLECTIONS SECTIONS --- */}
      <CollectionSection 
        title="Tarra Stone Collection"
        img="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%2092@2x.webp"
        link="/collection/tarra-stone"
      />
      
      <CollectionSection 
        title="Panorama Collection"
        img="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%2093@2x.webp"
        link="/collection/panorama"
        reverse
      />

      <CollectionSection 
        title="Strength Rock Collection"
        img="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%2094@2x.webp"
        link="/collection/strength-rock"
      />

      <CollectionSection 
        title="Geoform Collection"
        img="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%2095@2x.webp"
        link="/collection/geoform"
        reverse
      />

      <CollectionSection 
        title="Urban Form Collection"
        img="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%2096@2x.webp"
        link="/collection/urban-form"
      />

      <CollectionSection 
        title="Nature Grain Collection"
        img="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%2097@2x.webp"
        link="/collection/nature-grain"
        reverse
      />

      <CollectionSection 
        title="Rust Collection"
        img="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%2098@2x.webp"
        link="/collection/rust"
      />

      <CollectionSection 
        title="Finesse Collection"
        img="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%2099@2x.webp"
        link="/collection/finesse"
        reverse
      />

      {/* --- SECTION 11: Installation Process --- */}
      <section className="relative z-10 py-24 overflow-hidden border-t border-white/5">
        <div className="container mx-auto max-w-[1400px] px-6">
          <ScrollReveal className="text-center mb-24">
            <span style={{ color: '#c2bfb6' }} className="text-[30px] font-bold mb-4 block">Process Guide</span>
            <h2 className="text-3xl md:text-4xl font-light text-white leading-tight uppercase mb-8">
              Installation Process
            </h2>
            <Separator />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
             {/* Note: In a real app, you would map this. Keeping verbose for clarity as per original HTML structure */}
             <ScrollReveal delay={0} className="group flex flex-col">
                <div className="aspect-[3/4] overflow-hidden border border-white/10 mb-6 relative">
                    <img src="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%20105@2x.webp" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="Process 1" />
                </div>
                <div className="text-center">
                    <p className="text-[15px] leading-relaxed text-[#c2bfb6]">หลังจากที่เคลียร์ผนังเรียบร้อยแล้ว ให้ทำการวัดตำแหน่ง จุดที่ต้องการติดตั้ง MCM จากนั้นใช้บักเต้าตีเส้นหรือขึงเอ็น ให้ตรงตามระนาบทั้งแนวตั้งและแนวนอน</p>
                </div>
             </ScrollReveal>
             <ScrollReveal delay={100} className="group flex flex-col">
                <div className="aspect-[3/4] overflow-hidden border border-white/10 mb-6 relative">
                    <img src="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%20104@2x.webp" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="Process 2" />
                </div>
                <div className="text-center">
                    <p className="text-[15px] leading-relaxed text-[#c2bfb6]">ตัดแต่งแผ่น MCM ตามขนาดที่ต้องการ โดยใช้ลูกหมู หรือเครื่องตัดไฟฟ้า ก่อนการทากาวและติดตั้ง</p>
                </div>
             </ScrollReveal>
             <ScrollReveal delay={200} className="group flex flex-col">
                <div className="aspect-[3/4] overflow-hidden border border-white/10 mb-6 relative">
                    <img src="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%20103@2x.webp" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="Process 3" />
                </div>
                <div className="text-center">
                    <p className="text-[15px] leading-relaxed text-[#c2bfb6]">นำแผ่น MCM ที่ตัดเตรียมไว้ ทาปูนกาว ที่ด้านหลังของแผ่นให้ทั่ว จากนั้นใช้เกรียงหวีปาด เป็นครั้งสุดท้ายก่อนนำขึ้นติดกับผนัง</p>
                </div>
             </ScrollReveal>
             <ScrollReveal delay={300} className="group flex flex-col">
                <div className="aspect-[3/4] overflow-hidden border border-white/10 mb-6 relative">
                    <img src="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%20101@2x.webp" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="Process 4" />
                </div>
                <div className="text-center">
                    <p className="text-[15px] leading-relaxed text-[#c2bfb6]">ใช้เกรียงฉาบไล่ฟองอากาศ และกดกระจายน้ำหนัก ให้ทั่วบริเวณแผ่น MCM ให้กาวเกิดการกระจายตัว และติดแน่น</p>
                </div>
             </ScrollReveal>
             <ScrollReveal delay={400} className="group flex flex-col">
                <div className="aspect-[3/4] overflow-hidden border border-white/10 mb-6 relative">
                    <img src="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%20102@2x.webp" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="Process 5" />
                </div>
                <div className="text-center">
                    <p className="text-[15px] leading-relaxed text-[#c2bfb6]">หากมีการเว้นร่อง ให้ใช้กาวซิลิโคนยาแนวบีบไปที่แนวร่อง จากนั้นใช้ฟองน้ำเช็ดทำความสะอาดบริเวณร่องแผ่นเพื่อเก็บรายละเอียด</p>
                </div>
             </ScrollReveal>
          </div>
        </div>
      </section>

      {/* --- SECTION 12: Wall Performance Test --- */}
      <section className="relative z-10 py-24 border-t border-white/5">
        <div className="container mx-auto max-w-[1200px] px-6">
          <ScrollReveal className="text-center mb-24">
            <span style={{ color: '#c2bfb6' }} className="text-[30px] font-bold text-gray-500 mb-4 block">Wall Performance Test</span>
            <h2 className="text-4xl md:text-4xl font-light text-white leading-tight uppercase mb-8">Craft Stone Series</h2>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12 mt-12">
               {[
                 { img: 'Asset%20106@2x.webp', text: 'วัสดุผ่านการทดสอบการปล่อยสารอินทรีย์ระเหยง่าย (VOCs) และไม่พบสารใด ๆ เลย ทำให้มั่นใจได้ว่าไม่มีสารพิษที่เป็นอันตรายต่อสุขภาพ' },
                 { img: 'Asset%20107@2x.webp', text: 'จากการทดสอบการทนต่อการขัดถู วัสดุสูญเสียน้ำหนักเพียง 0.0833 กรัมหลังการขัดถู 500 รอบ แสดงถึงความทนทานสูง ไม่สึกหรอง่าย' },
                 { img: 'Asset%20108@2x.webp', text: 'วัสดุได้รับการตรวจสอบตามมาตรฐาน Prop 65 ของสหรัฐอเมริกา โดยไม่พบสารตะกั่วหลงเหลือเลย จึงมั่นใจได้ว่าปลอดภัยต่อผู้ใช้งาน' },
                 { img: 'Asset%20109@2x.webp', text: 'ผลการทดสอบการทนต่อการแช่แข็งและละลายซ้ำจำนวน 20 รอบ ไม่พบการแตกร้าว แสดงให้เห็นว่าวัสดุมีความเสถียรและทนทาน' },
                 { img: 'Asset%20111@2x.webp', text: 'การทดสอบการดูดซึมน้ำและความหนาแน่นพบว่า วัสดุมีการดูดซึมน้ำเฉลี่ย 5.41% ซึ่งหมายความว่าวัสดุมีน้ำหนักเบา' },
                 { img: 'Asset%20110@2x.webp', text: 'จากการทดสอบความทนต่ออุณหภูมิสุดขั้ว -40°C ถึง 80°C วัสดุไม่เกิดการเปลี่ยนรูปหรือแตกร้าว' }
               ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 100} className="group flex flex-col items-center text-center cursor-pointer">
                     <div className="w-20 h-20 md:w-24 md:h-20 aspect-square mb-6 bg-transparent relative">
                        <img src={`https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/${item.img}`} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" alt="Test" />
                     </div>
                     <div className="max-w-[280px]">
                        <p className="text-[12px] leading-relaxed font-light uppercase tracking-wider text-[#c2bfb6]">{item.text}</p>
                     </div>
                  </ScrollReveal>
               ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --- SECTION 13: Applications --- */}
      <section className="relative z-10 lg:h-screen border-t border-white/5 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-1/2 h-full relative overflow-hidden">
           <img src="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%20120@2x.webp" className="w-full h-[65vh] lg:h-[90vh] object-cover opacity-80" alt="Applications" />
           <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center py-20 px-8 md:px-16">
           <ScrollReveal className="text-center w-full max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-4 text-[#B08038]">การใช้งาน</h2>
              <Separator />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 mt-16">
                 {[
                   'Asset%20121@2x.webp', 'Asset%20113@2x.webp', 'Asset%20114@2x.webp', 'Asset%20115@2x.webp',
                   'Asset%20116@2x.webp', 'Asset%20117@2x.webp', 'Asset%20118@2x.webp', 'Asset%20119@2x.webp'
                 ].map((img, i) => (
                   <div key={i} className="flex flex-col items-center group cursor-pointer transition-transform duration-500 hover:-translate-y-2">
                      <div className="w-20 h-20 md:w-24 md:h-20 mb-4 bg-transparent relative">
                         <img src={`https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/${img}`} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" alt="App Icon" />
                      </div>
                   </div>
                 ))}
              </div>
           </ScrollReveal>
        </div>
      </section>

      {/* --- Global Styles --- */}
      {/* แก้ไข: ลบ jsx global ออก และใช้ style ธรรมดา */}
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