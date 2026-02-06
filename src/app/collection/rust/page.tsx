'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
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

// --- Hardcoded List for Rust ---
const HARDCODED_LIST = [
  {
    title: "15 Metal Line",
    size: "W2950xH1180xT5mm",
    image: 'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/rust_collection/Asset%2059.webp'
  },
  {
    title: "Foam Aluminum Board",
    itemCode: "MBFPL",
    size: "1000x2800x5mm",
    image: 'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/rust_collection/Asset%2058.webp'
  },
  {
    title: "Rust Board",
    itemCode: "MBXS",
    size: "W950xH2800xT4mm",
    image: 'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/rust_collection/Asset%2057.webp'
  },
  {
    title: "Gilt Board L-513",
    itemCode: "MBLJB",
    size: "Flexible: W1200xH3000xT4mm\nHard: W1220xH2440xT6mm               W1200xH3000xT6mm",
    image: 'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/rust_collection/Asset%2056.webp'
  },
  {
    title: "Rock Black Golden",
    size: "W600xH1200/W1200xH3000mm",
    image: 'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/rust_collection/Asset%2055.webp'
  },
  {
    title: "3D Black GOlden",
    size: "W600xH1200/W600xH3000mm/W1150xH3000mm",
    image: 'https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/rust_collection/Asset%2054.webp'
  }
];

// --- Helper Component: Slider ---
function Slider({ products, onSelect }: { products: Product[], onSelect: (p: Product) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (offset: number) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="flex items-center space-x-4">
      <button onClick={() => scroll(-150)} className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:border-brand-gold transition-colors text-white">
        <FaChevronLeft size={10} />
      </button>
      <div ref={scrollRef} className="flex space-x-4 overflow-x-auto py-2 no-scrollbar w-full">
        {products.map((p) => (
          <div key={p.id} className="flex-none w-[110px] aspect-square border border-white/5 opacity-60 hover:opacity-100 cursor-pointer transition-all" onClick={() => onSelect(p)}>
            <img src={p.image_url} className="w-full h-full object-cover" alt={p.title} />
          </div>
        ))}
        {products.length === 0 && <p className="text-[9px] opacity-30 italic px-4 py-8 text-white">Variants Syncing...</p>}
      </div>
      <button onClick={() => scroll(150)} className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:border-brand-gold transition-colors text-white">
        <FaChevronRight size={10} />
      </button>
    </div>
  );
}

// --- Main Page Component ---
export default function NatureGrainPage() {
  const [groups, setGroups] = useState<Record<string, GroupedProduct>>({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [selectedQty, setSelectedQty] = useState(1);
  const [modalDetails, setModalDetails] = useState({ title: '', code: '', price: '', dimensions: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('collection_type', 'Nature Grain')
          .order('title', { ascending: true });

        if (error) throw error;

        const grouped: Record<string, GroupedProduct> = {};
        data.forEach((item: Product) => {
          const key = item.title.trim();
          if (!grouped[key]) {
            grouped[key] = { id: item.id, title: item.title, itemCode: item.item_code, textures: [] };
          }
          grouped[key].textures.push(item);
        });

        setGroups(grouped);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openModal = (product: Product | undefined, fallbackDetails: any) => {
    setSelectedQty(1);
    setModalImage(product?.image_url || fallbackDetails.image || '');
    setModalDetails({
      title: product?.title || fallbackDetails.title || 'Wallcraft Finish',
      code: product?.item_code || fallbackDetails.itemCode || 'TBA',
      price: product?.price ? `$${product.price.toLocaleString()}` : 'Specification Inquiry Required',
      dimensions: product?.dimensions || fallbackDetails.size || 'Standard Form'
    });
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <div className="font-sans bg-[#0a0a0a] text-white min-h-screen">
      
      {/* HERO SECTION */}
      <header 
        className="relative min-h-[75vh] flex items-center overflow-hidden pt-20"
        style={{
            backgroundImage: `linear-gradient(to right, rgba(10, 10, 10, 0.5) 0%, rgba(10, 10, 10, 0.2) 50%, rgba(10, 10, 10, 0) 100%), url('https://mpsnwijabfingujzirri.supabase.co/storage/v1/object/public/wallcraft_web/collections_cover/rust.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-8 lg:px-24 z-20 text-left">
          <div className="max-w-2xl animate-reveal">
            <div className="flex gap-1 h-1.5 w-28 mb-10">
              <div className="bg-[#6A6C5F] w-1/3"></div>
              <div className="bg-[#7B2715] w-1/3"></div>
              <div className="bg-[#B08038] w-1/3"></div>
            </div>
            <h1 className="text-5xl lg:text-8xl font-bold tracking-tight mb-6 uppercase">
              <span className="text-[#B08038]">Rust</span><br />
              <span className="text-[#c2bfb6]">Collection</span>
            </h1>
            <p className="text-zinc-400 text-sm lg:text-base tracking-widest font-light uppercase max-w-lg leading-relaxed border-l border-[#B08038]/30 pl-6">
              Natural rock formations reimagined through precision architectural surfacing.
            </p>
          </div>
        </div>
      </header>

      {/* COLLECTION FEED */}
      <main className="max-w-[1600px] mx-auto px-8 lg:px-16 py-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-60">
            <div className="w-12 h-12 border-2 border-white/10 border-t-[#B08038] rounded-full animate-spin mb-4"></div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Synchronizing Stone Textures...</p>
          </div>
        ) : (
          HARDCODED_LIST.map((detail, i) => {
            const group = groups[detail.title.trim()] || { id: 'null', textures: [] };
            return (
              <section key={i} className="mb-[10rem] animate-reveal">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center text-left">
                  <div className="aspect-square w-[80%] mx-auto bg-zinc-900 cursor-zoom-in group relative overflow-hidden shadow-2xl" onClick={() => openModal(group.textures[0], detail)}>
                    <img src={detail.image} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" alt={detail.title} />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-[10px] uppercase tracking-widest font-bold p-4 border border-white/30 bg-black/40 backdrop-blur-md">View Detailed Specification</p>
                    </div>
                  </div>
                  <div className="flex flex-col h-full py-8 justify-between">
                    <div>
                      <p className="text-[10px] text-[#B08038] tracking-[0.5em] uppercase mb-4 opacity-70 font-bold">Nature Series</p>
                      <h2 className="text-3xl lg:text-4xl text-white font-medium uppercase mb-10 leading-tight">{detail.title}</h2>
                      <div className="space-y-6">
                        <div><h4 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-2 font-semibold">Item Code</h4><p className="text-[#B08038] text-lg tracking-wider">{detail.itemCode}</p></div>
                        <div><h4 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-2 font-semibold">Standard Form</h4><p className="text-sm text-white/80 leading-loose whitespace-pre-line">{detail.size}</p></div>
                      </div>
                    </div>
                    <div className="mt-12">
                      <h4 className="text-[9px] uppercase tracking-[0.5em] text-zinc-600 mb-6 font-medium">Explore Color Variants</h4>
                      <Slider products={group.textures} onSelect={(p) => openModal(p, detail)} />
                    </div>
                  </div>
                </div>
              </section>
            );
          })
        )}
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-all" onClick={closeModal}>
          <div className="relative w-full max-w-6xl bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[95vh]" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-[#B08038] transition-colors"><FaXmark /></button>
            <div className="w-full lg:w-3/5 bg-[#050505] flex items-center justify-center p-8"><img src={modalImage} className="max-w-full max-h-[600px] object-contain transition-all duration-500" alt="Detail" /></div>
            <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col border-l border-white/5 bg-[#0a0a0a] overflow-y-auto text-left">
              <div className="mb-8">
                <h3 className="text-[#B08038] text-[10px] font-bold tracking-[0.4em] uppercase mb-2">Signature Texture</h3>
                <h2 className="text-4xl text-white font-medium uppercase mb-2 leading-tight">{modalDetails.title}</h2>
                <p className="text-zinc-500 text-sm tracking-widest">{modalDetails.code}</p>
              </div>
              <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/5">
                <div className="flex justify-between items-center mb-2"><span className="text-zinc-400 text-[10px] uppercase tracking-wider">Estimated Price</span><span className="text-xl text-white font-light">{modalDetails.price}</span></div>
                <div className="flex flex-col space-y-1"><span className="text-zinc-400 text-[10px] uppercase tracking-wider font-bold">Standard Dimensions</span><span className="text-zinc-300 text-sm font-light whitespace-pre-line">{modalDetails.dimensions}</span></div>
              </div>
              <div className="mb-8">
                <span className="block text-white text-[10px] font-bold uppercase tracking-widest mb-4">Customization Note</span>
                <textarea className="w-full bg-black/40 border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-[#B08038] transition-colors resize-none" rows={3} placeholder="Enter custom dimensions..."></textarea>
              </div>
              <div className="mt-auto pt-8 border-t border-white/10 flex gap-4">
                <div className="flex items-center border border-white/20 rounded-md">
                  <button onClick={() => setSelectedQty(q => Math.max(1, q - 1))} className="px-4 py-3 text-white hover:bg-white/10">-</button>
                  <span className="px-2 text-white font-mono w-8 text-center">{selectedQty}</span>
                  <button onClick={() => setSelectedQty(q => q + 1)} className="px-4 py-3 text-white hover:bg-white/10">+</button>
                </div>
                <button onClick={closeModal} className="flex-1 bg-[#B08038] text-white uppercase text-[10px] font-bold tracking-[0.2em] hover:bg-[#8f662a] transition-all rounded-md flex items-center justify-center gap-3">Add to Selection <FaCartPlus /></button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes reveal { 0% { transform: translateY(80px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .animate-reveal { animation: reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}