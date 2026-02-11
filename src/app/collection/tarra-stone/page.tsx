'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase'; // ✅ เรียกใช้แบบนี้ถูกต้อง
import { FaXmark, FaChevronLeft, FaChevronRight, FaCartPlus } from 'react-icons/fa6';

// --- Types ---
interface Product {
  id: string;
  title: string;
  item_code: string;
  price: number;
  dimensions: string;
  image_url: string;
  collection_type: string;
  variants?: any[];
}

interface GroupedProduct {
  id: string;
  title: string;
  itemCode: string;
  textures: Product[];
}

// --- Hardcoded Section Data ---
const HARDCODED_LIST = [
  {
    title: "Travertine",
    itemCode: "MBTR",
    size: "1200x600x3mm\n1200x2400x4mm\n1200x2800x4mm\n1200x3000x4mm",
    image: 'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/tarra_stone_collection/Asset%2021@2x.webp'
  },
  {
    title: "Rammed Earth Board",
    itemCode: "MBHT",
    size: "600x2800x5(+-0.5)mm\n1000x2800x5(+-0.5)mm",
    image: 'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/tarra_stone_collection/Asset%2022@2x.webp'
  },
  {
    title: "Ocean Travertine",
    itemCode: "MBHDS",
    size: "1200x2400x5mm",
    image: 'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/tarra_stone_collection/Asset%2023@2x.webp'
  },
  {
    title: "Lime Stone",
    itemCode: "MBLMS",
    size: "1200x2800x5(+- 0.5mm)",
    image: 'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/2.Band%20introduction/tarra_stone_collection/Asset%2024@2x.webp'
  }
];

export default function TarraStonePage() {
  const [groups, setGroups] = useState<Record<string, GroupedProduct>>({});
  const [loading, setLoading] = useState(true);
  const [globalData, setGlobalData] = useState<Product[]>([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [modalImage, setModalImage] = useState('');
  const [selectedQty, setSelectedQty] = useState(1);
  const [modalDetails, setModalDetails] = useState({
    title: '',
    code: '',
    price: '',
    dimensions: ''
  });

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('collection_type', 'Tarra Stone')
          .order('title', { ascending: true });

        if (error) throw error;

        const grouped: Record<string, GroupedProduct> = {};
        const allProducts: Product[] = [];

        data.forEach((item: Product) => {
          allProducts.push(item);
          if (!grouped[item.title]) {
            grouped[item.title] = {
              id: item.id,
              title: item.title,
              itemCode: item.item_code,
              textures: []
            };
          }
          grouped[item.title].textures.push(item);
        });

        setGroups(grouped);
        setGlobalData(allProducts);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Modal Functions
  const openModal = (product: Product | undefined, fallbackDetails: any) => {
    setCurrentProduct(product || null);
    setSelectedQty(1);
    
    setModalImage(fallbackDetails.image || product?.image_url || '');
    setModalDetails({
      title: fallbackDetails.title || product?.title || 'Wallcraft Finish',
      code: fallbackDetails.itemCode || product?.item_code || 'TBA',
      price: product?.price ? `$${product.price.toLocaleString()}` : 'Specification Inquiry Required',
      dimensions: fallbackDetails.size || product?.dimensions || 'Standard Specification'
    });

    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  const addToSelection = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerText = 'Added to Request';
    btn.style.backgroundColor = '#27272a';
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.backgroundColor = ''; 
      closeModal();
    }, 1000);
  };

  return (
    <div className="font-sans bg-[#0a0a0a] text-white min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <header 
        className="relative min-h-[75vh] flex items-center overflow-hidden pt-20"
        style={{
            backgroundImage: `linear-gradient(to right, rgba(10, 10, 10, 0.5) 0%, rgba(10, 10, 10, 0.2) 50%, rgba(10, 10, 10, 0) 100%), url('https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/collections_cover/Tarra.webp')`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-8 lg:px-24 z-20">
          <div className="max-w-2xl animate-reveal">
            <div className="flex gap-1 h-1.5 w-28 mb-10">
              <div className="bg-[#6A6C5F] w-1/3"></div>
              <div className="bg-[#7B2715] w-1/3"></div>
              <div className="bg-[#B08038] w-1/3"></div>
            </div>
            <h1 className="text-5xl lg:text-8xl font-bold tracking-tight mb-6">
              <span className="text-[#B08038]">Tarra Stone</span><br />
              <span className="text-[#c2bfb6]">Collection</span>
            </h1>
            <p className="text-zinc-400 text-sm lg:text-base tracking-widest font-light uppercase max-w-lg leading-relaxed border-l border-[#B08038]/30 pl-6">
              Natural rock formations reimagined through precision architectural surfacing.
            </p>
          </div>
        </div>
      </header>

      {/* --- MAIN FEED --- */}
      <main className="max-w-[1600px] mx-auto px-8 lg:px-16 py-20 min-h-[50vh]">
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-20 opacity-60">
            <div className="w-12 h-12 border-2 border-white/10 border-t-[#B08038] rounded-full animate-spin"></div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium">Synchronizing Stone Textures...</p>
          </div>
        ) : (
          <div>
            {HARDCODED_LIST.map((detail, i) => {
              const group = Object.values(groups).find(g => g.title === detail.title) || {
                id: 'null',
                title: detail.title,
                itemCode: detail.itemCode,
                textures: []
              };

              return (
                <section key={i} className="mb-[10rem]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    
                    {/* Left: Main Image */}
                    <div 
                      className="aspect-square w-[80%] mx-auto bg-zinc-900 rounded-sm shadow-2xl overflow-hidden cursor-zoom-in group relative flex items-center justify-center"
                      onClick={() => openModal(group.textures[0], detail)}
                    >
                      <img 
                        src={detail.image} 
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                        alt={detail.title} 
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center">
                        <div className="p-4 border border-white/30 bg-black/40 backdrop-blur-md">
                          <p className="text-white text-[10px] uppercase tracking-[0.2em]">View Detailed Specification</p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Details & Slider */}
                    <div className="flex flex-col h-full py-8 justify-between">
                      <div className="mb-12">
                        <p className="text-[10px] text-[#B08038] tracking-[0.5em] uppercase mb-4 opacity-70 font-bold">Series Collection</p>
                        <h2 className="text-3xl lg:text-4xl text-white font-medium uppercase tracking-[0.2em] mb-10 leading-tight">{detail.title}</h2>
                        
                        <div className="flex flex-col space-y-10">
                          <div>
                            <h4 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-2 font-semibold">Item Code</h4>
                            <p className="text-[#B08038] text-lg font-semibold tracking-wider">{detail.itemCode}</p>
                          </div>
                          <div>
                            <h4 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-2 font-semibold">Size</h4>
                            <div className="text-sm text-white/80 leading-loose tracking-wider font-light whitespace-pre-line">
                              {detail.size}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <h4 className="text-[9px] uppercase tracking-[0.5em] text-zinc-600 mb-6">Explore Color Variants</h4>
                        <Slider products={group.textures} onSelect={(p) => openModal(p, { ...detail, image: p.image_url })} />
                      </div>
                    </div>

                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-6xl bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[95vh]">
            
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-[#B08038] transition-colors"
            >
              <FaXmark />
            </button>

            {/* Left: Image */}
            <div className="w-full lg:w-3/5 bg-[#050505] flex items-center justify-center p-8 relative">
              <img src={modalImage} alt={modalDetails.title} className="max-w-full max-h-[600px] object-contain transition-all duration-500" />
            </div>

            {/* Right: Info */}
            <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col border-l border-white/5 bg-[#0a0a0a] overflow-y-auto no-scrollbar">
              <div className="mb-8">
                <h3 className="text-[#B08038] text-[10px] font-bold tracking-[0.4em] uppercase mb-2">Signature Texture</h3>
                <h2 className="text-4xl text-white font-medium uppercase mb-2 leading-tight">{modalDetails.title}</h2>
                <p className="text-zinc-500 text-sm tracking-widest">{modalDetails.code}</p>
              </div>

              <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-400 text-[10px] uppercase tracking-wider">Estimated Price</span>
                  <span className="text-xl text-white font-light">{modalDetails.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-[10px] uppercase tracking-wider">Dimensions</span>
                  <span className="text-zinc-300 text-sm font-light whitespace-pre-line text-right">{modalDetails.dimensions}</span>
                </div>
              </div>

              <div className="mb-8">
                <span className="block text-white text-[10px] font-bold uppercase tracking-widest mb-4">Customization Note</span>
                <textarea 
                  className="w-full bg-black/40 border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-[#B08038] transition-colors resize-none" 
                  rows={3} 
                  placeholder="Enter custom dimensions or special requests..."
                ></textarea>
              </div>

              <div className="mt-auto pt-8 border-t border-white/10">
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center border border-white/20 rounded-md">
                    <button onClick={() => selectedQty > 1 && setSelectedQty(q => q - 1)} className="px-4 py-3 text-white hover:bg-white/10">-</button>
                    <span className="px-2 text-white font-mono w-8 text-center">{selectedQty}</span>
                    <button onClick={() => setSelectedQty(q => q + 1)} className="px-4 py-3 text-white hover:bg-white/10">+</button>
                  </div>
                  <button 
                    onClick={addToSelection}
                    className="flex-1 bg-[#B08038] text-white uppercase text-[10px] font-bold tracking-[0.2em] hover:bg-[#8f662a] transition-all duration-300 rounded-md flex items-center justify-center gap-3"
                  >
                    Add to Selection <FaCartPlus />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Global styles for this page specifically */}
      <style jsx global>{`
        @keyframes reveal {
            0% { transform: translateY(80px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        .animate-reveal { animation: reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

// --- Helper Component: Horizontal Slider ---
function Slider({ products, onSelect }: { products: Product[], onSelect: (p: Product) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button 
        onClick={() => scroll(-150)}
        className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-white/10 rounded-full hover:border-[#B08038] transition-colors text-white"
      >
        <FaChevronLeft size={10} />
      </button>
      
      <div ref={scrollRef} className="flex space-x-4 overflow-x-auto py-2 no-scrollbar w-full">
        {products.map((p) => (
          <div 
            key={p.id} 
            className="flex-none w-[110px] aspect-square border border-white/5 bg-white/5 relative overflow-hidden opacity-60 hover:opacity-100 transition-all cursor-pointer"
            onClick={() => onSelect(p)}
          >
            <img src={p.image_url} className="w-full h-full object-cover" alt={p.title} />
          </div>
        ))}
        {products.length === 0 && <p className="text-[9px] opacity-30 italic text-white self-center">Variants Syncing...</p>}
      </div>

      <button 
        onClick={() => scroll(150)}
        className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-white/10 rounded-full hover:border-[#B08038] transition-colors text-white"
      >
        <FaChevronRight size={10} />
      </button>
    </div>
  );
}