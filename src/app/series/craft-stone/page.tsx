'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- Types ---
interface Layer {
  title: string;
  description: string;
  image: string;
}

// --- Data Constants (URL preserved exactly as requested) ---
const LAYERS_DATA: Layer[] = [
  {
    title: 'UV Coating Layer',
    description: 'เคลือบป้องกันรังสี UV ลดการซีดจางของสี ทำความสะอาดง่าย',
    image: 'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_layer/layer1.webp'
  },
  {
    title: 'Mineral Color Layer',
    description: 'ชั้นสีจากแร่ธรรมชาติ ทนแดดและทนไฟ ให้สีสวยงามคงทน',
    image: 'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_layer/layer2.webp'
  },
  {
    title: 'Eco Clay Composite',
    description: 'ชั้นแกนกลางจากดินและผงหินดัดแปลง เบา ยืดหยุ่น แข็งแรง',
    image: 'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_layer/layer3.webp'
  },
  {
    title: 'Fiberglass Mesh',
    description: 'ตาข่ายเสริมแรงป้องกันการแตกร้าวและบิดงอ เพิ่มความทนทาน',
    image: 'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_layer/layer4.webp'
  }
];

const TECH_ICONS_DATA = [
  'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft%20stone%20icon/craft%20stone%20icon/Untitled-1-03.webp',
  'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft%20stone%20icon/craft%20stone%20icon/Untitled-1-04.webp',
  'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft%20stone%20icon/craft%20stone%20icon/Untitled-1-05.webp',
  'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft%20stone%20icon/craft%20stone%20icon/Untitled-1-06.webp',
  'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft%20stone%20icon/craft%20stone%20icon/Untitled-1-07.webp',
  'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft%20stone%20icon/craft%20stone%20icon/Untitled-1-08.webp',
  'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft%20stone%20icon/craft%20stone%20icon/Untitled-1-09.webp'
];

const INSTALLATION_STEPS = [
    { img: "https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20105@2x.webp", text: "หลังจากที่เคลียร์ผนังเรียบร้อยแล้ว ให้ทำการวัดตำแหน่ง จุดที่ต้องการติดตั้ง MCM จากนั้นใช้บักเต้าตีเส้นหรือขึงเอ็น ให้ตรงตามระนาบทั้งแนวตั้งและแนวนอน หรือตีเส้นตามแบบ ที่ต้องการติดตั้ง" },
    { img: "https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20104@2x.webp", text: "ตัดแต่งแผ่น MCM ตามขนาดที่ต้องการ โดยใช้ลูกหมู หรือเครื่องตัดไฟฟ้า ก่อนการทากาวและติดตั้ง" },
    { img: "https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20103@2x.webp", text: "นำแผ่น MCM ที่ตัดเตรียมไว้ ทาปูนกาว ที่ด้านหลังของแผ่นให้ทั่ว จากนั้นใช้เกรียงหวีปาด เป็นครั้งสุดท้ายก่อนนำขึ้นติดกับผนัง" },
    { img: "https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20101@2x.webp", text: "ใช้เกรียงฉาบไล่ฟองอากาศ และกดกระจายน้ำหนัก ให้ทั่วบริเวณแผ่น MCM ให้กาวเกิดการกระจายตัว และติดแน่น" },
    { img: "https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20102@2x.webp", text: "หากมีการเว้นร่อง ให้ใช้กาวซิลิโคนยาแนวบีบไปที่แนวร่อง จากนั้นใช้ฟองน้ำเช็ดทำความสะอาดบริเวณร่องแผ่นเพื่อเก็บรายละเอียดความเรียบร้อยของงาน" }
];

const PERFORMANCE_TESTS = [
    { img: 'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20106@2x.webp', text: 'วัสดุผ่านการทดสอบการปล่อยสารอินทรีย์ระเหยง่าย (VOCs) และไม่พบสารใด ๆ เลย ทำให้มั่นใจได้ว่าไม่มีสารพิษที่เป็นอันตรายต่อสุขภาพ เหมาะสำหรับการใช้งานภายในอาคารที่ต้องการความปลอดภัยด้านสิ่งแวดล้อม' },
    { img: 'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20107@2x.webp', text: 'จากการทดสอบการทนต่อการขัดถู วัสดุสูญเสียน้ำหนักเพียง 0.0833 กรัมหลังการขัดถู 500 รอบ แสดงถึงความทนทานสูง ไม่สึกหรอง่าย เหมาะสำหรับพื้นที่ที่มีการใช้งานบ่อยและต้องการความคงทนของผิวสัมผัส' },
    { img: 'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20108@2x.webp', text: 'วัสดุได้รับการตรวจสอบตามมาตรฐาน Prop 65 ของสหรัฐอเมริกา โดยไม่พบสารตะกั่วหลงเหลือเลย จึงมั่นใจได้ว่าปลอดภัยต่อผู้ใช้งาน และไม่เป็นอันตรายต่อสุขภาพ' },
    { img: 'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20109%402x.webp', text: 'ผลการทดสอบการทนต่อการแช่แข็งและละลายซ้ำจำนวน 20 รอบ ไม่พบการแตกร้าว แสดงให้เห็นว่าวัสดุมีความเสถียรและทนทานต่อสภาพอากาศที่เปลี่ยนแปลง' },
    { img: 'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset 110@2x.webp', text: 'การทดสอบการดูดซึมน้ำและความหนาแน่นพบว่า วัสดุมีการดูดซึมน้ำเฉลี่ย 5.41% ซึ่งหมายความว่าวัสดุมีน้ำหนักเบากว่าหินธรรมชาติทั่วไป ติดตั้งง่าย เคลื่อนย้ายสะดวก' },
    { img: 'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20110%402x.webp', text: 'จากการทดสอบความทนต่ออุณหภูมิสุดขั้ว -40°C ถึง 80°C วัสดุไม่เกิดการเปลี่ยนรูปหรือแตกร้าว ซึ่งทนความร้อนจากแสงแดดในประเทศไทยได้ดี' }
];

const APP_ICONS = [
    'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20121@2x.webp',
    'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20113@2x.webp',
    'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20114@2x.webp',
    'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20115@2x.webp',
    'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20116@2x.webp',
    'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20117@2x.webp',
    'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20118@2x.webp',
    'https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20119@2x.webp'
];

const COLLECTIONS_DATA = [
    { title: "Tarra Stone", link: "craft_stone_collection/tarra_stone_collection.html", image: "https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%2092@2x.webp", reverse: false },
    { title: "Panorama", link: "craft_stone_collection/panorama_collection.html", image: "https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%2093@2x.webp", reverse: true },
    { title: "Strength Rock", link: "craft_stone_collection/strength_rock_collection.html", image: "https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%2094@2x.webp", reverse: false },
    { title: "Geoform", link: "craft_stone_collection/geoform_collection.html", image: "https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%2095@2x.webp", reverse: true },
    { title: "Urban Form", link: "craft_stone_collection/urban_form_collection.html", image: "https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%2096@2x.webp", reverse: false },
    { title: "Nature Grain", link: "craft_stone_collection/nature_grain_collection.html", image: "https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%2097@2x.webp", reverse: true },
    { title: "Rust", link: "craft_stone_collection/rust_collection.html", image: "https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%2098@2x.webp", reverse: false },
    { title: "Finesse", link: "craft_stone_collection/finesse_collection.html", image: "https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%2099@2x.webp", reverse: true },
];

// --- Helper Components ---

const Separator = () => (
    <div className="flex gap-1 h-1.5 w-28 mx-auto lg:mx-0">
        <div className="bg-[#6A6C5F] w-1/3"></div>
        <div className="bg-[#7B2715] w-1/3"></div>
        <div className="bg-[#B08038] w-1/3"></div>
    </div>
);

const AnimatedSection = ({ 
    children, 
    className = "", 
    animation = "fade-in-up", 
    delay = 0 
}: { 
    children: React.ReactNode, 
    className?: string, 
    animation?: "fade-in-up" | "fade-in-right" | "fade-in-left", 
    delay?: number 
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // Map internal animation names to tailwind classes defined in styles
    const getAnimClass = () => {
        if (!isVisible) return 'opacity-0 translate-y-8'; // Initial state
        switch(animation) {
            case 'fade-in-right': return 'animate-fade-in-right opacity-100';
            case 'fade-in-left': return 'animate-fade-in-left opacity-100';
            case 'fade-in-up': default: return 'animate-fade-in-up opacity-100';
        }
    };

    return (
        <div 
            ref={ref} 
            className={`${className} transition-all duration-1000 ${getAnimClass()}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default function App() {
    // Layer Stack Logic
    const [isStacked, setIsStacked] = useState(true);
    const [activeLayerIndex, setActiveLayerIndex] = useState<number | null>(null);
    const stackContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!stackContainerRef.current) return;
            const rect = stackContainerRef.current.getBoundingClientRect();
            const viewMid = window.innerHeight / 2;
            const distance = Math.abs((rect.top + rect.height / 2) - viewMid);
            
            // Auto stack/unstack based on scroll position
            if (activeLayerIndex === null) {
                setIsStacked(distance > window.innerHeight * 0.4);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeLayerIndex]);

    const toggleLayer = (index: number) => {
        if (activeLayerIndex === index) {
            setActiveLayerIndex(null);
            setIsStacked(false);
        } else {
            setActiveLayerIndex(index);
            setIsStacked(false);
        }
    };

    // Calculation for layer positions
    const getLayerStyle = (index: number) => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const spacing = isStacked ? (isMobile ? 9 : 14) : (isMobile ? 45 : 120);

        if (activeLayerIndex !== null) {
            if (index === activeLayerIndex) {
                return {
                    opacity: 1,
                    zIndex: 100,
                    transform: 'translateY(0px)',
                    className: 'expanded active'
                };
            } else {
                return {
                    opacity: 0.15,
                    zIndex: LAYERS_DATA.length - index,
                    transform: `translateY(${index * 20}px)`, // Subtle offset for background layers
                    className: ''
                };
            }
        }

        const finalY = isStacked 
            ? index * spacing 
            : (index * spacing) - ((LAYERS_DATA.length - 1) * spacing / 2);

        return {
            opacity: 1,
            zIndex: LAYERS_DATA.length - index,
            transform: `translateY(${finalY}px)`,
            className: !isStacked ? 'expanded' : ''
        };
    };

    return (
        <div className="bg-black text-[#c2bfb6] font-sans overflow-x-hidden selection:bg-orange-500 selection:text-white">
            {/* Styles & Fonts */}
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100;300;400;700&family=Prompt:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
                
                :root {
                    --brand-gold: #B08038;
                    --text-grey: #c2bfb6;
                }
                body {
                    font-family: "Helvetica Neue", Helvetica, Arial, "Noto Sans Thai", sans-serif;
                }
                .headline-gold {
                    color: var(--brand-gold) !important;
                }
                .craft-stone-unified-bg {
                    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.3)), url('https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/A7_04129%20copy.webp');
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    background-repeat: no-repeat;
                }
                .perspective-container {
                    perspective: 2500px;
                }
                .layer-wrapper {
                    transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease;
                    will-change: transform, opacity;
                }
                .layer-card {
                    transform: rotateZ(-5deg);
                    transform-style: preserve-3d;
                    transition: all 0.5s ease;
                }
                .layer-label {
                    opacity: 0;
                    transform: translateX(40px);
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    pointer-events: none;
                }
                .expanded .layer-label {
                    opacity: 1;
                    transform: translateX(0);
                    pointer-events: auto;
                }
                .pointer-line {
                    height: 1px;
                    width: 80px;
                    background: linear-gradient(to right, rgba(176, 128, 56, 0.4), var(--brand-gold));
                    position: relative;
                }
                .pointer-dot {
                    width: 6px;
                    height: 6px;
                    background-color: var(--brand-gold);
                    border-radius: 50%;
                    position: absolute;
                    right: -3px;
                    top: 50%;
                    transform: translateY(-50%);
                    box-shadow: 0 0 10px var(--brand-gold);
                }
                .img-no-crop {
                    object-fit: contain !important;
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .btn-explore {
                    border: 1px solid rgba(176, 128, 56, 0.4);
                    padding: 12px 32px;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    color: #c2bfb6;
                    transition: all 0.4s ease;
                    background: rgba(0, 0, 0, 0.2);
                    backdrop-filter: blur(5px);
                }
                .btn-explore:hover {
                    background: var(--brand-gold);
                    color: white;
                    border-color: var(--brand-gold);
                    box-shadow: 0 0 20px rgba(176, 128, 56, 0.3);
                }

                /* Keyframe Animations */
                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }

                @keyframes fadeInRight {
                    0% { opacity: 0; transform: translateX(60px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                .animate-fade-in-right { animation: fadeInRight 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards; }

                @keyframes fadeInLeft {
                    0% { opacity: 0; transform: translateX(-60px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                .animate-fade-in-left { animation: fadeInLeft 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
            `}} />

            <div className="craft-stone-unified-bg">
                {/* --- Hero Section --- */}
                <header className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
                    <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-[1800px] grid grid-cols-1 lg:grid-cols-2 z-30">
                        <div className="flex flex-col justify-center animate-fade-in-up">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase headline-gold mb-8 leading-[1.1]">
                                Craft Stone<br/>Series
                            </h1>
                            <p className="text-[10px] md:text-xs lg:text-sm font-light leading-relaxed max-w-md mb-12" style={{ color: '#c2bfb6' }}>
                                วัสดุตกแต่งผนังและพื้นผิวรุ่นใหม่ ผลิตจาก กลุ่มแร่ธรรมชาติ (Eco Clay Composite) ด้วยเทคโนโลยีเฉพาะทาง มอบคุณสมบัติเด่น น้ำหนักเบา ยืดหยุ่น แข็งแรง ไม่แตกร้าว ทนไฟ และเป็นมิตรต่อสิ่งแวดล้อม
                            </p>
                        </div>
                    </div>

                    <div className="absolute inset-0 z-10 flex items-center justify-end overflow-hidden pointer-events-none">
                        <div className="relative w-full h-full flex justify-end items-center">
                            <img 
                                src="https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20100@2x.webp" 
                                className="h-[85vh] lg:h-[95vh] w-auto object-contain animate-fade-in-right transform translate-x-[8%]" 
                                alt="Craft Stone Material" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent lg:w-[50%]"></div>
                        </div>
                    </div>
                </header>

                {/* --- Technology Layer Section --- */}
                <section id="technology" className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-20">
                    <div className="text-center mb-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
                        <div className="flex gap-1 h-1.5 w-28 mb-10">
                            <div className="bg-[#6A6C5F] w-1/3"></div>
                            <div className="bg-[#7B2715] w-1/3"></div>
                            <div className="bg-[#B08038] w-1/3"></div>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 uppercase text-[#c2bfb6]">Structure Detail</h2>
                    </div>

                    <div ref={stackContainerRef} className="relative w-full max-w-7xl h-[600px] flex justify-center items-center perspective-container my-4">
                        {LAYERS_DATA.map((layer, index) => {
                            const style = getLayerStyle(index);
                            return (
                                <div 
                                    key={index}
                                    className={`layer-wrapper absolute w-full flex justify-center items-center ${style.className}`}
                                    style={{ 
                                        zIndex: style.zIndex, 
                                        transform: style.transform,
                                        opacity: style.opacity
                                    }}
                                >
                                    <div 
                                        className="relative w-[320px] h-[200px] md:w-[600px] md:h-[350px] flex items-center justify-center cursor-pointer group"
                                        onClick={() => toggleLayer(index)}
                                    >
                                        <div className="layer-card w-full h-full">
                                            <img src={layer.image} className="w-full h-full object-contain" alt={layer.title} />
                                        </div>
                                        {/* Label (Desktop Only) */}
                                        <div className="layer-label hidden md:flex items-center absolute left-[85%] z-50">
                                            <div className="pointer-line"><div className="pointer-dot"></div></div>
                                            <div className="ml-6 text-left whitespace-nowrap">
                                                <h3 className="headline-gold font-bold text-lg uppercase">{layer.title}</h3>
                                                <p className={`text-gray-300 text-xs max-w-[250px] transition-all duration-500 overflow-hidden ${activeLayerIndex === index ? 'max-h-[100px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                                    {layer.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-center w-full mt-10">
                        <button 
                            onClick={() => {
                                setIsStacked(!isStacked);
                                setActiveLayerIndex(null);
                            }} 
                            className="btn-explore"
                        >
                            {isStacked ? 'Explore Layers' : 'Close Layers'}
                        </button>
                    </div>

                    <div className="w-full max-w-[1400px] mx-auto mt-12 px-8 relative z-20">
                        <div className="flex flex-nowrap justify-center gap-10 md:gap-20 overflow-x-auto lg:overflow-x-visible pb-4 no-scrollbar">
                            {TECH_ICONS_DATA.map((src, i) => (
                                <div key={i} className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] flex-shrink-0 flex items-center justify-center">
                                    <img src={src} className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity" alt="Tech Icon" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Collections Sections --- */}
                {COLLECTIONS_DATA.map((col, idx) => (
                    <section key={idx} className={`relative z-10 flex flex-col ${col.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} min-h-[80vh] items-center border-t border-white/5 py-20`}>
                        <div className="w-full lg:w-[50%] flex flex-col justify-center px-8 md:px-16 lg:px-24">
                            <div className="max-w-lg">
                                <div className="flex-1 space-y-4 mb-8">
                                    <Separator />
                                </div>
                                <h1 className="text-5xl md:text-7xl font-light leading-tight mb-8">
                                    {col.title} <span className="text-[#c2bfb6]"><br/>Collection</span>
                                </h1>
                                <a href={col.link} className="inline-block border border-[rgba(194,191,182,0.4)] px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#c2bfb6] transition-all duration-300 hover:bg-[#c2bfb6] hover:text-black">
                                    Learn More
                                </a>
                            </div>
                        </div>
                        <div className="w-full lg:w-[50%] h-[50vh] lg:h-[80vh] flex items-center justify-center p-6 lg:p-12">
                            <AnimatedSection animation={col.reverse ? "fade-in-left" : "fade-in-right"} className="w-full h-full">
                                <img src={col.image} className="w-full h-full img-no-crop relative z-10" alt={col.title} />
                            </AnimatedSection>
                        </div>
                    </section>
                ))}

                {/* --- Installation Process --- */}
                <section id="Installation-Process" className="relative z-10 py-24 overflow-hidden border-t border-white/5">
                    <div className="container mx-auto max-w-[1400px] px-6">
                        <AnimatedSection className="text-center mb-24">
                            <span className="text-[#c2bfb6] text-[30px] font-bold mb-4 block">Process Guide</span>
                            <h2 className="text-3xl md:text-4xl font-light text-white leading-tight uppercase mb-8">Installation Process</h2>
                            <div className="flex justify-center my-8">
                                <Separator />
                            </div>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {INSTALLATION_STEPS.map((step, i) => (
                                <AnimatedSection key={i} delay={i * 100} className="group flex flex-col">
                                    <div className="aspect-[3/4] overflow-hidden border border-white/10 mb-6 relative">
                                        <img src={step.img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={`Process ${i+1}`} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[15px] leading-relaxed text-[#c2bfb6]">{step.text}</p>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Performance Test --- */}
                <section id="Performance-Test" className="relative z-10 py-24 border-t border-white/5">
                    <div className="container mx-auto max-w-[1200px] px-6">
                        <AnimatedSection className="text-center mb-24">
                            <span className="text-[#c2bfb6] text-[30px] font-bold mb-4 block">Wall Performance Test</span>
                            <h2 className="text-4xl md:text-4xl font-light text-white leading-tight uppercase mb-8">Craft Stone Series</h2>
                            <div className="flex justify-center my-8">
                                <Separator />
                            </div>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12">
                            {PERFORMANCE_TESTS.map((test, i) => (
                                <div key={i} className="group flex flex-col items-center text-center cursor-pointer">
                                    <div className="w-20 h-20 md:w-24 md:h-20 aspect-square mb-6 bg-transparent relative">
                                        <img src={test.img} alt="Test Icon" className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <div className="max-w-[280px]">
                                        <p className="text-[12px] leading-relaxed font-light uppercase tracking-wider text-[#c2bfb6]">{test.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Applications --- */}
                <section id="Applications" className="relative z-10 lg:h-screen border-t border-white/5 flex flex-col lg:flex-row overflow-hidden">
                    <div className="w-full lg:w-1/2 h-full relative overflow-hidden">
                        <img src="https://raw.githubusercontent.com/WaiHmueThit23/wallcraft_assets/main/craft_stone/Asset%20120@2x.webp" className="w-full h-[65vh] lg:h-[90vh] object-cover opacity-80" alt="Applications Showcase" />
                        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center py-20 px-8 md:px-16">
                        <div className="text-center w-full max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-bold headline-gold tracking-tight uppercase mb-4">การใช้งาน</h2>
                            <div className="flex justify-center gap-1 h-1.5 w-32 my-8 mx-auto">
                                <div className="bg-[#6A6C5F] w-1/3"></div>
                                <div className="bg-[#7B2715] w-1/3"></div>
                                <div className="bg-[#B08038] w-1/3"></div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 mt-16">
                                {APP_ICONS.map((icon, i) => (
                                    <div key={i} className="flex flex-col items-center group cursor-pointer">
                                        <div className="w-20 h-20 md:w-24 md:h-20 mb-4 bg-transparent relative">
                                            <img src={icon} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" alt="App Icon" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}