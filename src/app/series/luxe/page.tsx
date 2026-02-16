'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- Data ---
const LAYERS_DATA = [
  {
    title: 'DECORATIVE SHEET',
    description: 'Advanced protection coating that prevents surface fading.',
    image: 'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20123@2x.webp'
  },
  {
    title: 'HPVC/AVIATION FIBER',
    description: 'Modified core designed for structural flexibility.',
    image: 'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20124@2x.webp'
  }
];

const TECH_ICONS_DATA = [
  'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20132@2x.webp',
  'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20131@2x.webp',
  'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20130@2x.webp',
  'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20129@2x.webp',
  'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20128@2x.webp',
  'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20127@2x.webp'
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
  desc, 
  img, 
  link, 
  reverse = false 
}: { 
  title: string, 
  desc: string, 
  img: string, 
  link: string, 
  reverse?: boolean 
}) => {
  // Split title to separate Main Title and "Collection"
  const titleParts = title.split(' ');
  const mainTitle = titleParts.slice(0, -1).join(' ');
  const subTitle = titleParts[titleParts.length - 1];

  // Animation State
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setIsVisible(true); 
        }
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.disconnect();
    };
  }, []);

  // Animation Classes
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
          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-8" style={{ color: '#B08038' }}>
            {mainTitle} <span style={{ color: '#c2bfb6' }}><br />{subTitle}</span>
          </h1>
          <p className="text-[10px] md:text-xs lg:text-sm font-light leading-relaxed max-w-md mb-12 text-[#c2bfb6]">
            {desc}
          </p>
          <a href={link} className="inline-block border px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#c2bfb6] hover:text-black" style={{ color: '#c2bfb6', borderColor: 'rgba(194, 191, 182, 0.4)' }}>
            Learn More
          </a>
        </div>
      </div>
      <div className="w-full lg:w-[50%] h-[50vh] lg:h-[80vh] flex items-center justify-center p-6 lg:p-12">
        <img 
          src={img} 
          className={`w-full h-full object-contain relative z-10 drop-shadow-2xl transition-all duration-1000 ease-out ${imageAnim}`} 
          alt={title} 
        />
      </div>
    </section>
  );
};

// --- Main Page Component ---

export default function App() {
  // Layer Animation State
  const [isStacked, setIsStacked] = useState(true);
  const [activeLayerIndex, setActiveLayerIndex] = useState<number | null>(null);
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  // --- Effects ---
  useEffect(() => {
    // Initial width
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

  // --- Logic for Layer Styles ---
  const getLayerStyle = (index: number) => {
    const isMobile = windowWidth < 768;
    const stackedSpacing = isMobile ? 12 : 25;
    const expandedSpacing = isMobile ? 100 : 250;
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
        style.opacity = 0.08;
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100;300;400;700&family=Prompt:wght@300;400;500;600;700&display=swap');
        
        body { font-family: 'Prompt', sans-serif; background-color: #000; }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Background with Overlay */}
      <div className="fixed inset-0 z-[-1]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ 
            backgroundImage: "url('https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20126@2x.webp')" 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-black/20" />
      </div>

      {/* --- SECTION 1: HERO --- */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden pb-12 lg:pb-0 pt-20">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-[1800px] grid grid-cols-1 lg:grid-cols-2 z-20">
          <div className="flex flex-col justify-center animate-[fadeInUp_1s_ease-out_forwards]">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight uppercase mb-8 leading-[1.1]" style={{ color: '#B08038' }}>
              Luxe<br />Series
            </h1>
            <p className="text-[11px] md:text-xs lg:text-sm font-light leading-relaxed max-w-md mb-12 text-[#c2bfb6]">
              ผนังตกแต่งระดับพรีเมียมที่ออกแบบมาเพื่อยกระดับทุกพื้นที่ให้มีทั้งความงามและความทนทาน โครงสร้างหลักใช้ แผ่น HPVC หนา 5 มิลลิเมตร ซึ่งมีคุณสมบัติเด่นด้านความแข็งแรง กันน้ำและคงรูปได้ดี ไม่บวมและไม่ผุกร่อน พร้อมปิดผิวด้วยวัสดุที่หลากหลาย ทั้งวินิล ผ้า ทำมะหยี่ และวัสดุสำหรับงานกลางแจ้ง
            </p>
          </div>
        </div>

        <div className="absolute top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-end overflow-hidden pointer-events-none">
          <div className="relative w-full h-full flex justify-end items-center">
            <img 
              src="https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20125@2x.webp" 
              className="h-full lg:h-screen w-auto object-contain opacity-95 transition-transform duration-1000 transform translate-x-[5%] drop-shadow-[0_0_50px_rgba(0,0,0,0.9)]"
              alt="Luxe Series Collage" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/20 to-transparent lg:w-[100%]"></div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: Technology Layer --- */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-32 border-t border-white/5">
        <div className="relative z-20 text-center mb-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
          <Separator />
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 uppercase text-white drop-shadow-lg">Luxe Technology</h2>
        </div>

        {/* Perspective Container */}
        <div ref={stackContainerRef} className="relative w-full max-w-7xl h-[700px] flex justify-center items-center my-8" style={{ perspective: '3000px' }}>
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
                  <div className="relative w-[340px] h-[220px] md:w-[850px] md:h-[500px] flex items-center justify-center">
                    {/* Layer Card */}
                    <div 
                      className="w-full h-full flex justify-center items-center transition-all duration-500 ease-out"
                      style={{ transform: 'rotateX(50deg) rotateZ(-15deg)', transformStyle: 'preserve-3d' }}
                    >
                      <img src={layer.image} className="w-full h-full object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]" alt={layer.title} />
                    </div>

                    {/* Layer Label (Desktop) */}
                    <div className={`hidden md:flex flex-col absolute left-[90%] z-50 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${isExpanded || isActive ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-[40px] pointer-events-none'}`}>
                        <div className="text-left whitespace-nowrap">
                          <h3 className="font-bold text-xl md:text-2xl tracking-[0.2em] uppercase text-[#B08038]">{layer.title}</h3>
                          <p 
                            className={`text-gray-400 text-sm leading-relaxed font-light max-w-[300px] transition-opacity duration-500 ${isActive ? 'opacity-100 mt-2' : 'opacity-0'}`}
                          >
                            {layer.description}
                          </p>
                        </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Explore Button */}
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

        {/* Icons Container */}
        <div className="w-full max-w-[1400px] mx-auto mt-12 px-8 relative z-20">
            <div className="flex flex-nowrap justify-center gap-[38px] md:gap-[91px] overflow-x-auto lg:overflow-x-visible pb-4 no-scrollbar">
                {TECH_ICONS_DATA.map((img, idx) => (
                    <div key={idx} className="flex flex-col items-center group cursor-pointer flex-shrink-0">
                        <div className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] flex items-center justify-center">
                            <img src={img} className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-700" alt="Tech Icon" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- COLLECTION SECTIONS --- */}
      <CollectionSection 
        title="Fabric Collection" 
        desc="ผนังลายผ้าที่สร้างบรรยากาศสบายตาและมีชีวิตชีวา ถ่ายทอดความละเมียดละไม พร้อมดีไซน์ที่คมชัดในทุกมุม เรียบง่ายแต่เต็มไปด้วยพลังของดีไซน์ที่แตกต่าง"
        img="https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20135@2x.webp"
        link="/collection/luxe-fabric"
      />

      <CollectionSection 
        title="Leather Collection" 
        desc="ผนังลายหนังที่สะท้อนความหรูหราอย่างมั่นใจ เติมเสน่ห์ที่มีเอกลักษณ์เฉพาะตัว คือการออกแบบที่ผสมผสานความหรูหรากับความร่วมสมัยอย่างลงตัว"
        img="https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20139@2x.webp"
        link="/collection/luxe-leather"
        reverse
      />

      <CollectionSection 
        title="Metallic Collection" 
        desc="ผนังเมทัลลิกที่เปล่งประกายด้วยการเล่นแสงเงา เติมความมีพลังและความโมเดิร์นให้กับทุกพื้นที่ เป็นการแสดงออกที่เฉียบคมและเต็มไปด้วยความทันสมัย"
        img="https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20137@2x.webp"
        link="/collection/luxe-metallic"
      />

      <CollectionSection 
        title="Outdoor Collection" 
        desc="ผนัง Outdoor ที่ออกแบบมาเพื่อรองรับทุกสภาพอากาศ ทั้งแสงแดดและฝน พร้อมดีไซน์ที่โดดเด่น เป็นการผสมผสานฟังก์ชันการใช้งานเข้ากับดีไซน์ที่สะกดสายตา"
        img="https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20136@2x.webp"
        link="/collection/luxe-outdoor"
        reverse
      />

      <CollectionSection 
        title="Signature Collection" 
        desc="ผนัง Signature ถ่ายทอดความคิดสร้างสรรค์ผ่านการผสมวัสดุและเทคนิคเฉพาะ เป็นเสมือนงานแฟชั่นที่ไม่ซ้ำใครและสะท้อนสไตล์ที่ชัดเจนของคุณ"
        img="https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20134@2x.webp"
        link="/collection/luxe-signature"
      />

      <CollectionSection 
        title="Stone Collection" 
        desc="ผนังลายหินที่สะท้อนพลังและความสง่างามของธรรมชาติ ถ่ายทอดความแข็งแรงและความโดดเด่นในทุกมิติ ดีไซน์ที่มั่นคงและมีเอกลักษณ์ในตัวเอง"
        img="https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20140@2x.webp"
        link="/collection/luxe-stone"
        reverse
      />

      <CollectionSection 
        title="Velvet Collection" 
        desc="ผนังเวลเวทที่มอบสัมผัสเรียบหรูและเต็มไปด้วยชั้นเชิง เพิ่มบรรยากาศที่ลุ่มลึกและน่าค้นหา เป็นการตีความใหม่ของความหรูหราให้ทันสมัยและโดดเด่น"
        img="https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20138@2x.webp"
        link="/collection/luxe-velvet"
      />

      <CollectionSection 
        title="Wood Collection" 
        desc="ผนังลายไม้ที่สะท้อนความเป็นธรรมชาติในรูปแบบที่ร่วมสมัย ถ่ายทอดความสมดุลของดีไซน์และฟังก์ชัน สร้างบรรยากาศที่สดใหม่และเข้ากับทุกแนวทางการตกแต่ง"
        img="https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20133@2x.webp"
        link="/collection/luxe-wood"
        reverse
      />

      {/* --- SECTION 12: Comparison Matrix --- */}
      <section className="relative z-10 py-32 border-t border-white/5">
        <div className="container mx-auto max-w-[1400px] px-8">
            <div className="mb-24 animate-[fadeInUp_1s_ease-out_forwards] text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-bold leading-tight uppercase mb-4 max-w-4xl text-white">
                    แนวทางการเลือกพื้นผิววัสดุ<br /><span className="text-[#c2bfb6]">ตามฟังก์ชันการใช้งาน</span>
                </h2>
                <div className="flex gap-1 h-1.5 w-28 mb-8 mx-auto md:mx-0">
                    <div className="bg-[#6A6C5F] w-1/3"></div>
                    <div className="bg-[#7B2715] w-1/3"></div>
                    <div className="bg-[#B08038] w-1/3"></div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px] text-center border-collapse">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="py-10 text-left w-[20%]"></th>
                            {['154', '152', '153', '151', '150', '149', '148', '147'].map((id) => (
                                <th key={id} className="py-10 px-4">
                                    <div className="w-20 h-20 flex items-center justify-center mx-auto">
                                        <img src={`https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20${id}@2x.webp`} className="w-full h-full object-contain opacity-80" alt="Icon" />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { name: 'Vinyl Collection', color: '#B08038', scores: [9, 8, 6, 7, 5, 9, 5, 8] },
                            { name: 'Fabric Collection', color: '#6A6C5F', scores: [6, 5, 5, 6, 8, 6, 9, 5] },
                            { name: 'Unique Collection', color: '#CBBDAD', scores: [7, 6, 5, 7, 8, 7, 8, 6] },
                            { name: 'Velvet Collection', color: '#7B2715', scores: [6, 5, 5, 6, 9, 6, 9, 5] },
                            { name: 'Outdoor Collection', color: '#7C7D75', scores: [8, 8, 9, 7, 6, 9, 6, 8] },
                        ].map((row, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0">
                                <td className="py-8 text-left text-lg font-bold uppercase" style={{ color: row.color }}>{row.name}</td>
                                {row.scores.map((score, sIdx) => (
                                    <td key={sIdx} className="py-8 font-semibold text-xl" style={{ color: row.color }}>{score}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </section>

      {/* --- SECTION 13: Installation Process --- */}
      <section className="relative z-10 py-24 border-t border-white/5">
        <div className="container mx-auto max-w-[1600px] px-6">
            <div className="text-center mb-24 animate-[fadeInUp_1s_ease-out_forwards]">
                <Separator />
                <span className="text-[30px] font-bold mb-4 block text-[#c2bfb6]">Process Guide</span>
                <h2 className="text-3xl md:text-4xl font-light text-white leading-tight uppercase mb-8">Installation Process</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[
                    { img: '146', title: 'ป้องกันคราบสกปรก', desc: 'ผิววัสดุช่วยลดการยึดเกาะ ของคราบ ทำให้ผนังดูสะอาด อยู่เสมอ' },
                    { img: '144', title: 'วัสดุไม่เป็นเชื้อเพลิง (Class B)', desc: 'ผ่านมาตรฐานความปลอดภัย จากการติดไฟ ลดความเสี่ยงจาก อัคคีภัย' },
                    { img: '141', title: 'ติดตั้งและซ่อมบำรุงง่าย', desc: 'ออกแบบให้ใช้งานสะดวก ลดขั้นตอนการติดตั้ง และซ่อมบำรุงได้อย่างรวดเร็ว' },
                    { img: '143', title: 'ไม่หลุดร่อนหรือแตกร้าวง่าย', desc: 'ผิวเคลือบและโครงสร้าง มีความทนทาน ใช้งานได้ยาวนาน' },
                    { img: '142', title: 'ผิวสัมผัสนุ่ม', desc: 'มอบความรู้สึกสบาย ปลอดภัย ต่อผู้ใช้งาน โดยเฉพาะในพื้นที่ ที่มีเด็กหรือผู้สูงอายุ' },
                    { img: '145', title: 'ทำความสะอาดง่าย', desc: 'สามารถเช็ดล้างได้สะดวก ประหยัดเวลาและค่าใช้จ่าย ในการดูแลรักษา' }
                ].map((item, idx) => (
                    <div key={idx} className="group flex flex-col items-center">
                        <div className="aspect-[3/4] overflow-hidden border border-white/10 mb-6 relative w-full">
                            <img src={`https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/luxe_series/Asset%20${item.img}@2x.webp`} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={item.title} />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl md:text-2xl font-bold uppercase mb-2 text-[#B08038]">{item.title}</h3>
                            <p className="text-[13px] md:text-[15px] leading-relaxed text-[#c2bfb6]">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}