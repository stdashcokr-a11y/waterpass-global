"use client";

import React, { useState, useEffect } from 'react';
import { Waves, Recycle, Snowflake, Footprints, Navigation, SquareParking } from 'lucide-react';
import PhotoGalleryOverlay from './PhotoGalleryOverlay';

import { useLanguage } from '@/context/LanguageContext';

export default function SustainableCities() {
  const { language } = useLanguage();
  const [activeGallery, setActiveGallery] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const pillData = [
    { id: 'flood_reduction', label: language === 'en' ? 'Flood Reduction' : '홍수 피해 저감', icon: Waves },
    { id: 'recycled_materials', label: language === 'en' ? 'Recycled Materials' : '재활용 소재', icon: Recycle },
    { id: 'urban_cooling', label: language === 'en' ? 'Urban Cooling' : '도심 열섬 완화', icon: Snowflake },
    { id: 'sidewalks_plazas', label: language === 'en' ? 'Sidewalks & Plazas' : '보행로 및 광장', icon: Footprints },
    { id: 'roads', label: language === 'en' ? 'Roads' : '도로', icon: Navigation },
    { id: 'parking', label: language === 'en' ? 'Parking' : '주차장', icon: SquareParking },
  ];

  useEffect(() => {
    if (!activeGallery) return;

    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/images?type=${activeGallery}`);
        const data = await response.json();
        
        if (data.images && data.images.length > 0) {
          setGalleryImages(data.images);
        } else {
          // Fallback placeholders corresponding to 6 images
          const seed = pillData.findIndex(p => p.id === activeGallery) * 100;
          setGalleryImages(Array.from({ length: 6 }).map((_, i) => `https://picsum.photos/seed/${seed + i}/800/600`));
        }
      } catch (error) {
        console.error("Gallery fetch failed:", error);
      }
    };
    fetchImages();
  }, [activeGallery]);

  return (
    <section className="w-full py-16 md:py-32 bg-[#050D1D] relative z-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
        
        <div className="w-full mb-10 md:mb-16 px-4 text-center">
           <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter ${language === 'en' ? 'uppercase' : 'break-keep'} mb-4`} style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
             {language === 'en' ? 'BUILDING SUSTAINABLE CITIES' : '지속 가능한 기술의 현주소'}
           </h2>
           <p className={`text-sm sm:text-base text-gray-400 font-light max-w-xl mx-auto ${language === 'kr' ? 'break-keep' : ''}`}>
             {language === 'en' ? 'Explore our six core domains of modern urban climate infrastructure through on-site photography.' : '현장 사진을 통해 현대 도시 기후 인프라의 6대 핵심 영역을 확인하십시오.'}
           </p>
        </div>

        {/* 2x3 Grid of Pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
          {pillData.map((item) => {
            const Icon = item.icon;
            return (
              <button 
                key={item.id}
                onClick={() => setActiveGallery(item.id)}
                className="group relative flex items-center justify-start gap-4 sm:gap-6 px-6 sm:px-10 py-4 sm:py-6 bg-[#0A162D] hover:bg-[#0D1D3A] rounded-2xl border border-white/5 hover:border-[#00AEEF]/50 transition-all duration-300 w-full text-left"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 flex items-center justify-center border border-white/5 group-hover:border-[#00AEEF]/30 group-hover:bg-[#00AEEF]/10 transition-colors flex-shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#00AEEF]" />
                </div>
                <span className="text-white font-bold tracking-wide">{item.label}</span>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00AEEF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              </button>
            );
          })}
        </div>
      </div>

      <PhotoGalleryOverlay 
        isOpen={!!activeGallery}
        images={galleryImages}
        title={pillData.find(p => p.id === activeGallery)?.label || ''}
        onClose={() => setActiveGallery(null)}
      />
    </section>
  );
}
