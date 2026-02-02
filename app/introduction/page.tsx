'use client';

import React, { useEffect, useRef } from 'react'; // ลบ useState ออกถ้าไม่ได้ใช้
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// เก็บเฉพาะ icon ที่ใช้ในหน้านี้ (Left/Right สำหรับ Slider)
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// --- Constants & Data ---
const FALLBACK_TEXTURE = "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=800&auto=format&fit=crop";

const CATEGORIES = [
    { img: "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/Asset%2042@3x.webp" },
    { img: "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/Asset%2043@3x.webp" },
    { img: "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/Asset%2044@3x.webp" },
    { img: "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/Asset%2045@3x.webp" },
    { img: "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/Asset%2046@3x.webp" },
    { img: "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/Asset%2047@3x.webp" },
    { img: "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/Asset%2048@3x.webp" },
    { img: "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/Asset%2049@3x.webp" },
    { img: "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/Asset%2050@3x.webp" },
    { img: "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/Asset%2051@3x.webp" },
    { img: "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/Asset%2052@3x.webp" },
    { img: "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/Asset%2053@3x.webp" },
    { img: "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/Asset%2054@3x.webp" }
];

const SERIES_DATA = [
    {
        id: '01',
        title: 'Craft Stone Series',
        subtitle: 'ซีรี่ส์หัตถกรรมหิน',
        desc: 'ผลิตจากกลุ่มแร่ธรรมชาติ (Eco Clay Composite) มอบคุณสมบัติเด่น น้ำหนักเบา ยืดหยุ่น แข็งแรง และเป็นมิตรต่อสิ่งแวดล้อม เหมาะสำหรับติดตั้งทั้งภายในและภายนอก',
        link: '/series/craft-stone', // แก้ Link ให้เป็น Next.js path
        images: [
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%2056@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%2063@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%2058@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%2057@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%2059@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%2062@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%2060@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Craft%20Stone%20Series/Asset%2061@3x.webp"
        ],
        reverse: false
    },
    {
        id: '02',
        title: 'Luxe Series',
        subtitle: 'ลักซ์ ซีรีส์',
        desc: 'ผนังตกแต่งระดับพรีเมียมที่ออกแบบมาเพื่อยระดับทุกพื้นที่ให้มีทั้งความงามและความทนทาน โครงสร้างหลักใช้ แผ่น HPVC หนา 5 มิลลิเมตร แข็งแรง กันน้ำ และคงรูปได้ดี',
        link: '/series/luxe',
        images: [
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Luxe%20Series/Asset%2068@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Luxe%20Series/Asset%2067@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Luxe%20Series/Asset%2066@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Luxe%20Series/Asset%2071@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Luxe%20Series/Asset%2070@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Luxe%20Series/Asset%2073@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Luxe%20Series/Asset%2074@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Luxe%20Series/Asset%2064@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Luxe%20Series/Asset%2065@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Luxe%20Series/Asset%2072@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Luxe%20Series/Asset%2069@3x.webp"
        ],
        reverse: true
    },
    {
        id: '03',
        title: 'Essential Series',
        subtitle: 'ซีรีส์สำคัญ',
        desc: 'ผนังดีไซน์ใหม่ที่มอบทางเลือกการติดตั้งและการจบงานที่สมบูรณ์แบบ ครอบคลุมทั้ง Flat, 3D Wall และ LED ช่วยลดปัญหาหน้างานเพื่อความสวยที่สมบูรณ์แบบ',
        link: '/series/essential',
        images: [
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%2075@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%2076@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%2077@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%2078@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%2079@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%2080@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%2081@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%2082@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%2083@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%2084@3x.webp",
            "https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Essential%20Series/Asset%2085@3x.webp"
        ],
        reverse: false
    }
];

export default function IntroductionPage() {
    // เอา Logic ของ Navbar ออกทั้งหมด (scrolled, activeDropdown)
    const sliderRef = useRef<HTMLDivElement>(null);
    const collageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // --- Core Animations & Logic (เหลือเฉพาะส่วนที่จำเป็นสำหรับเนื้อหา) ---
    useEffect(() => {
        let lastScrollTop = 0;

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollVelocity = Math.abs(scrollTop - lastScrollTop);
            lastScrollTop = scrollTop;

            // Velocity Scaling for Collage Cards
            const activeCards = document.querySelectorAll<HTMLElement>('.collage-card[data-active="true"]');
            activeCards.forEach(card => {
                const tx = card.getAttribute('data-tx');
                const ty = card.getAttribute('data-ty');
                const tr = card.getAttribute('data-tr');
                const popScale = 1 + Math.min(scrollVelocity / 800, 0.015);
                card.style.transform = `translate(${tx}px, ${ty}px) rotate(${tr}deg) scale(${popScale})`;
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- Intersection Observer for Collage ---
    useEffect(() => {
        const CS = 1.05;
        const SF = 1.2;

        const POS_MAP: { [key: string]: any[] } = {
            '01': [
                { x: -120 * CS, y: -150 * CS, r: 0, w: 195 * SF, h: 240 * SF, z: 30 },
                { x: -250 * CS, y: -100 * CS, r: 0, w: 180 * SF, h: 240 * SF, z: 10 },
                { x: 30 * CS, y: -120 * CS, r: 0, w: 180 * SF, h: 240 * SF, z: 20 },
                { x: 140 * CS, y: -60 * CS, r: 0, w: 165 * SF, h: 225 * SF, z: 60 },
                { x: -120 * CS, y: 20 * CS, r: 0, w: 160 * SF, h: 180 * SF, z: 15 },
                { x: -200 * CS, y: 120 * CS, r: 0, w: 150 * SF, h: 210 * SF, z: 10 },
                { x: -40 * CS, y: 140 * CS, r: 0, w: 150 * SF, h: 210 * SF, z: 10 },
                { x: 100 * CS, y: 110 * CS, r: 0, w: 155 * SF, h: 215 * SF, z: 60 }
            ],
            '02': [
                { x: 120 * CS, y: -290 * CS, r: 0, w: 165 * SF, h: 120 * SF, z: 20 },
                { x: 120 * CS, y: -200 * CS, r: 0, w: 165 * SF, h: 195 * SF, z: 20 },
                { x: 120 * CS, y: -110 * CS, r: 0, w: 165 * SF, h: 120 * SF, z: 20 },
                { x: -100 * CS, y: -220 * CS, r: 0, w: 180 * SF, h: 270 * SF, z: 25 },
                { x: -160 * CS, y: -50 * CS, r: 0, w: 150 * SF, h: 210 * SF, z: 30 },
                { x: -120 * CS, y: 120 * CS, r: 0, w: 180 * SF, h: 150 * SF, z: 15 },
                { x: 0 * CS, y: -30 * CS, r: 0, w: 255 * SF, h: 285 * SF, z: 10 },
                { x: -80 * CS, y: 200 * CS, r: 0, w: 135 * SF, h: 165 * SF, z: 20 },
                { x: 250 * CS, y: -60 * CS, r: 0, w: 150 * SF, h: 225 * SF, z: 25 },
                { x: 150 * CS, y: 100 * CS, r: 0, w: 165 * SF, h: 180 * SF, z: 20 },
                { x: 280 * CS, y: 110 * CS, r: 0, w: 135 * SF, h: 180 * SF, z: 24 }
            ],
            '03': [
                { x: -220 * CS, y: -40 * CS, r: 0, w: 165 * SF, h: 225 * SF, z: 30 },
                { x: -200 * CS, y: 140 * CS, r: 0, w: 210 * SF, h: 210 * SF, z: 35 },
                { x: 80 * CS, y: 140 * CS, r: 0, w: 210 * SF, h: 210 * SF, z: 35 },
                { x: 40 * CS, y: 30 * CS, r: 0, w: 195 * SF, h: 180 * SF, z: 15 },
                { x: 180 * CS, y: -220 * CS, r: 0, w: 135 * SF, h: 185 * SF, z: 15 },
                { x: -50 * CS, y: -120 * CS, r: 0, w: 135 * SF, h: 185 * SF, z: 10 },
                { x: -80 * CS, y: 190 * CS, r: 0, w: 200 * SF, h: 210 * SF, z: 30 },
                { x: -280 * CS, y: -30 * CS, r: 0, w: 330 * SF, h: 360 * SF, z: 10 },
                { x: -40 * CS, y: 0 * CS, r: 0, w: 285 * SF, h: 360 * SF, z: 5 },
                { x: 80 * CS, y: -90 * CS, r: 0, w: 270 * SF, h: 270 * SF, z: 2 },
                { x: -60 * CS, y: -220 * CS, r: 0, w: 195 * SF, h: 270 * SF, z: 1 }
            ]
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const container = entry.target as HTMLElement;
                const seriesId = container.getAttribute('data-series-id') || '01';
                const cards = container.querySelectorAll<HTMLElement>('.collage-card');
                const pos = POS_MAP[seriesId];

                if (entry.isIntersecting) {
                    cards.forEach((card, i) => {
                        const p = pos[i % pos.length];
                        card.setAttribute('data-tx', String(p.x));
                        card.setAttribute('data-ty', String(p.y));
                        card.setAttribute('data-tr', String(p.r));
                        
                        setTimeout(() => {
                            card.setAttribute('data-active', 'true');
                            card.style.opacity = "1";
                            card.style.width = `${p.w}px`;
                            card.style.height = `${p.h}px`;
                            card.style.zIndex = String(p.z || 10);
                            card.style.setProperty('--target-x', `${p.x}px`);
                            card.style.setProperty('--target-y', `${p.y}px`);
                            card.style.setProperty('--base-rotation', `${p.r}deg`);
                            card.style.setProperty('--float-delay', `${i * 0.12}s`);
                            card.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.r}deg) scale(1)`;
                            card.classList.add('active-float');
                        }, i * 70);
                    });
                } else {
                    cards.forEach((card) => {
                        card.classList.remove('active-float');
                        card.setAttribute('data-active', 'false');
                        card.style.opacity = "0";
                        card.style.transform = `translate(0, 50px) scale(0.95) rotate(0deg)`;
                    });
                }
            });
        }, { threshold: 0.05 });

        Object.values(collageRefs.current).forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    // --- Material Slider Drag ---
    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        const handleMouseDown = (e: MouseEvent) => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        };
        const handleEnd = () => (isDown = false);
        const handleMove = (e: MouseEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        };

        slider.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleEnd);
        slider.addEventListener('mouseleave', handleEnd);
        slider.addEventListener('mousemove', handleMove);

        return () => {
            slider.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleEnd);
            slider.removeEventListener('mouseleave', handleEnd);
            slider.removeEventListener('mousemove', handleMove);
        };
    }, []);

    return (
        <div className="bg-[#080808] text-[#808080] font-light selection:bg-brand-gold/30">
            {/* [สำคัญ] ส่วน Navigation Bar ถูกลบออกแล้ว 
               เพราะมันจะถูกเรียกใช้ผ่าน layout.tsx อัตโนมัติ 
            */}

            {/* Hero Section */}
            <header className="relative min-h-[85vh] lg:min-h-screen flex flex-col items-center overflow-hidden bg-black px-6 pt-10">
                <div className="absolute top-8 bottom-0 left-0 right-0 z-0 flex items-start justify-center pointer-events-none">
                    <img src="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/Asset%2055@3x.webp" className="max-w-full max-h-full object-contain object-top transition-opacity duration-1000 transform scale-95" alt="Main Texture" />
                    <div className="absolute inset-0 bg-black/30 transition-opacity duration-1000"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
                </div>

                <div className="relative z-10 text-center max-w-[1800px] w-full px-4 mt-20 md:mt-24 lg:mt-32">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl tracking-tighter uppercase leading-tight gold-text animate-reveal drop-shadow-2xl font-['Prompt']" style={{ animationDelay: '0.2s' }}>
                        ตัวตนของผนังที่สะท้อนสไตล์
                    </h1>
                    <div className="mt-8 animate-reveal" style={{ animationDelay: '0.4s' }}>
                        <p className="text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-[1250px] mx-auto drop-shadow-sm font-['Prompt']" style={{ color: '#c2bfb6' }}>
                            เรามองว่าผนังไม่ใช่เพียงฉากหลัง แต่คือองค์ประกอบหลักที่ กำหนดอารมณ์ สร้างบรรยากาศ และบอกเล่ารสนิยมของพื้นที่ได้ อย่างชัดเจน ทุกเส้นสายและผิวสัมผัสถูกออกแบบมาให้เป็นเหมือน แฟชั่นไอเท็มที่เสริมความโดดเด่นให้กับงานดีไซน์ที่นักออกแบบ สามารถใช้ Wallcraft เพื่อสร้าง Statement ของงานออกแบบได้ อย่างมีเอกลักษณ์ เราคือ...โซลูชันผนังโมดูลาร์สำหรับงานดีไซน์ ติดตั้งและบำรุงรักษาง่าย ยืดหยุ่น กับทุกคอนเซปต์ เลือกเท็กซ์เจอร์ สี ดีเทลได้ครบ-จบงานง่ายและเรียบสวย.
                        </p>
                    </div>
                </div>
            </header>

            <div className="series-textured relative z-20 -mt-60">
                {/* Material Slider Section */}
                <section className="pb-12 overflow-hidden relative">
                    <div className="relative-content">
                        <div className="absolute top-0 right-8 md:right-16 z-30 flex space-x-3 -translate-y-full mb-8">
                            <button onClick={() => sliderRef.current?.scrollBy({ left: -400, behavior: 'smooth' })} className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition text-white bg-black/40 backdrop-blur-lg">
                                <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
                            </button>
                            <button onClick={() => sliderRef.current?.scrollBy({ left: 400, behavior: 'smooth' })} className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition text-white bg-black/40 backdrop-blur-lg">
                                <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                            </button>
                        </div>

                        <div ref={sliderRef} className="flex overflow-x-auto space-x-6 no-scrollbar px-6 md:px-16 max-w-[1800px] mx-auto pt-4 pb-4 select-none cursor-grab active:cursor-grabbing">
                            {CATEGORIES.map((cat, idx) => (
                                <div key={idx} className="flex-none w-[75vw] md:w-[280px] group">
                                    <div className="relative aspect-square overflow-hidden bg-zinc-900/50 border border-white/5 transition-all duration-700 hover:border-[#B08038]/40 shadow-xl">
                                        <img src={cat.img} onError={(e) => (e.currentTarget.src = FALLBACK_TEXTURE)} className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 pointer-events-none" alt="Material" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Editorial Content Area */}
                <div id="series-content" className="relative z-10 font-['Prompt']">
                    {SERIES_DATA.map((series) => (
                        <section key={series.id} className="py-20 md:py-32 border-t border-white/5 overflow-hidden">
                            <div className={`relative-content max-w-[1800px] mx-auto px-6 md:px-16 flex flex-col ${series.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 md:gap-20 items-center`}>
                                <div className="w-full lg:w-2/5 space-y-6 relative z-20">
                                    <div className="space-y-4">
                                        <span className="text-[10px] tracking-[0.5em] gold-text uppercase font-light block">{series.id} &nbsp; — &nbsp; {series.subtitle}</span>
                                        <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-tighter gold-text uppercase leading-tight drop-shadow-md font-normal">{series.title}</h2>
                                    </div>
                                    <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed max-w-sm opacity-80">{series.desc}</p>
                                    <div className="pt-4">
                                        <Link href={series.link} className="inline-flex items-center group space-x-4">
                                            <span className="text-[11px] uppercase tracking-[0.4em] text-white/60 group-hover:text-[#B08038] transition-colors">Read More</span>
                                            <div className="w-12 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-[#B08038] transition-all duration-500"></div>
                                        </Link>
                                    </div>
                                </div>
                                <div 
                                    ref={(el) => { collageRefs.current[series.id] = el }} 
                                    data-series-id={series.id} 
                                    className="w-full lg:w-3/5 collage-container"
                                >
                                    {series.images.map((img, idx) => (
                                        <div key={idx} className="collage-card" style={{ opacity: 0 }}>
                                            <img src={img} onError={(e) => (e.currentTarget.src = FALLBACK_TEXTURE)} alt="Wallcraft Material" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="py-16 bg-black border-t border-white/5 text-center px-6 relative z-30">
                <img src="https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/Logo_Images/wallcraft%20logo%20grey%20color.png" className="h-5 mx-auto mb-8 opacity-20 grayscale" alt="Logo" />
                <p className="text-[10px] uppercase tracking-[0.6em] text-zinc-700">
                    &copy; 2024 Wallcraft Material Studio.
                </p>
            </footer>

            {/* Global Styles for specific animations */}
            <style jsx global>{`
                :root {
                    --brand-gold: #B08038;
                    --deep-black: #080808;
                    --text-grey: #808080;
                }
                .gold-text { color: var(--brand-gold); }
                .glass-nav {
                    background: rgba(0, 0, 0, 0.12);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
                }
                .glass-nav.scrolled {
                    background: rgba(0, 0, 0, 0.45);
                    padding-top: 1rem;
                    padding-bottom: 1rem;
                }
                @keyframes reveal {
                    0% { transform: translateY(80px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                .animate-reveal { animation: reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards; }
                .collage-container {
                    position: relative;
                    width: 100%;
                    height: 500px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    perspective: 2000px;
                }
                @media (min-width: 1024px) { .collage-container { height: 700px; } }
                .collage-card {
                    position: absolute;
                    transition: opacity 0.8s ease, transform 0.9s cubic-bezier(0.165, 0.84, 0.44, 1), width 1s ease, height 1s ease;
                    will-change: transform, opacity;
                }
                .collage-card img {
                    width: 100%; height: 100%; object-fit: contain;
                    filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.65));
                }
                @keyframes clutter-float {
                    0%, 100% { transform: translate(var(--target-x), var(--target-y)) rotate(var(--base-rotation)); }
                    50% { transform: translate(var(--target-x), calc(var(--target-y) - 10px)) rotate(calc(var(--base-rotation) + 0.2deg)); }
                }
                .active-float {
                    animation: clutter-float 12s ease-in-out infinite;
                    animation-delay: var(--float-delay);
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .series-textured {
                    background-image: url('https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/background/Asset%2091@3x.webp');
                    background-size: 120%;
                    background-position: center;
                    background-attachment: fixed;
                    position: relative;
                }
                .series-textured::before {
                    content: ''; position: absolute; inset: 0;
                    background: rgba(0, 0, 0, 0.78); z-index: 0;
                }
                .relative-content { position: relative; z-index: 10; }
            `}</style>
        </div>
    );
}