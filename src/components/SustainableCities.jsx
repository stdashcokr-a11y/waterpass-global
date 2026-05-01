"use client";

import React, { useState, useEffect } from 'react';
import { Waves, Recycle, Snowflake, Footprints, Navigation, SquareParking, ArrowRight } from 'lucide-react';
import PhotoGalleryOverlay from './PhotoGalleryOverlay';
import { useLanguage } from '@/context/LanguageContext';

const defaultPills = [
  { id: 'flood', label: 'Flood Reduction', icon: Waves },
  { id: 'recycled', label: 'Recycled Materials', icon: Recycle },
  { id: 'cooling', label: 'Urban Cooling', icon: Snowflake },
  { id: 'sidewalks', label: 'Sidewalks & Plazas', icon: Footprints },
  { id: 'roads', label: 'Roads', icon: Navigation },
  { id: 'parking', label: 'Parking', icon: SquareParking },
];

/**
 * SustainableCities Section for WaterPass Global
 * Features: Standardized grid buttons with consistent heights and dynamic data mapping.
 */
export default function SustainableCities({ data = [] }) {
  const { language } = useLanguage();
  const [activeGallery, setActiveGallery] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  // Map Page 9 data to the pills based on Section names
  const pillMapping = defaultPills.map((pill) => {
    // data is grouped by Section in the page.js helper if we use getPageGroupedData
    // But SustainableCities currently receives a flat list from getPageData(9)
    // I'll filter the flat list by section name
    const sectionItems = data.filter(item => 
      item.section.toLowerCase().includes(pill.label.toLowerCase()) || 
      pill.id.toLowerCase().includes(item.section.toLowerCase())
    );
    
    return {
      ...pill,
      label: sectionItems[0]?.section || pill.label,
      images: sectionItems.map(item => item.displayLink).filter(Boolean)
    };
  });

  useEffect(() => {
    if (!activeGallery) return;
    const activeItem = pillMapping.find(p => p.id === activeGallery);
    
    if (activeItem && activeItem.images.length > 0) {
      setGalleryImages(activeItem.images);
    } else {
      // Fallback to picsum for demo if sheet is empty
      setGalleryImages(Array.from({ length: 3 }).map((_, i) => `https://picsum.photos/seed/${activeGallery}${i}/800/600`));
    }
  }, [activeGallery]);

  return (
    <section className="w-full py-24 md:py-40 bg-transparent relative z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
        
        <div className="w-full mb-16 md:mb-24 px-4 text-center">
           <h2 className={`text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter ${language === 'en' ? 'uppercase' : 'break-keep'} mb-8 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]`}>
             {language === 'en' ? 'BUILDING SUSTAINABLE CITIES' : '지속 가능한 기술의 현주소'}
           </h2>
           <p className={`text-xl sm:text-2xl text-white font-medium max-w-3xl mx-auto ${language === 'kr' ? 'break-keep' : ''} leading-relaxed opacity-90`}>
             {language === 'en' ? 'Explore our six core domains of modern urban climate infrastructure through on-site photography.' : '현장 사진을 통해 현대 도시 기후 인프라의 6대 핵심 영역을 확인하십시오.'}
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {pillMapping.map((item) => {
            const Icon = item.icon;
            return (
              <button 
                key={item.id}
                onClick={() => setActiveGallery(item.id)}
                className="group relative flex items-center justify-between gap-4 px-8 py-7 bg-[#0A162D] hover:bg-[#0D1D3A] rounded-2xl border border-white/5 hover:border-[#00AEEF]/50 transition-all duration-400 w-full text-left min-h-[100px] shadow-lg"
              >
                <div className="flex items-center gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-black/50 flex items-center justify-center border border-white/10 group-hover:border-[#00AEEF]/60 group-hover:bg-[#00AEEF]/20 transition-all flex-shrink-0">
                    <Icon className="w-8 h-8 text-[#00AEEF]" />
                  </div>
                  <span className="text-white text-xl md:text-2xl font-black uppercase tracking-tight group-hover:text-[#00AEEF] transition-colors drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">{item.label}</span>
                </div>
                
                <ArrowRight size={20} className="text-white/20 group-hover:text-[#00AEEF] group-hover:translate-x-1 transition-all" />
                
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00AEEF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              </button>
            );
          })}
        </div>
      </div>

      <PhotoGalleryOverlay 
        isOpen={!!activeGallery}
        images={galleryImages}
        title={pillMapping.find(p => p.id === activeGallery)?.label || ''}
        onClose={() => setActiveGallery(null)}
      />
    </section>
  );
}
