"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import PhotoGalleryOverlay from './PhotoGalleryOverlay';
import { useLanguage } from '@/context/LanguageContext';

const cities = [
  { name: 'SEOUL', top: '40%', left: '50%', isCenter: true },
  { name: 'Beijing', top: '45%', left: '26%' },
  { name: 'Tokyo', top: '52%', left: '75%' },
  { name: 'Shanghai', top: '65%', left: '52%' },
  { name: 'Los Angeles', top: '75%', left: '25%' },
  { name: 'Singapore', top: '80%', left: '78%' }
];

export default function GlobalVision({ data = [] }) {
  const { language } = useLanguage();
  const [activeGallery, setActiveGallery] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  // Use sheet data if available for city mapping
  const mappedCities = cities.map(city => {
    // Find matching city in sheet by section name (e.g. "beijing hub")
    const sheetItems = data.filter(item => 
      item.section.toLowerCase().includes(city.name.toLowerCase())
    );
    return {
      ...city,
      images: sheetItems.map(item => item.displayLink).filter(Boolean),
      hasData: sheetItems.length > 0
    };
  });

  return (
    <section className="w-full py-16 md:py-32 bg-[#020813] relative z-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        <div 
          onClick={() => {
            const elm = document.getElementById('contact');
            if(elm) elm.scrollIntoView({ behavior: 'smooth' });
          }}
          className="mb-8 md:mb-12 flex items-center justify-start gap-2 md:gap-4 group cursor-pointer inline-flex transition-transform hover:translate-x-2 w-full max-w-full"
        >
           <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter ${language === 'en' ? 'uppercase' : ''} group-hover:text-[#00AEEF] transition-colors break-words w-full sm:w-auto`}>
             {language === 'en' ? 'A GLOBAL TECHNOLOGY VISION' : '글로벌 기술 비전'}
           </h2>
           <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-[#00AEEF] mt-1 sm:mt-2 group-hover:translate-x-2 transition-transform flex-shrink-0" />
        </div>
        
        <div className="mb-16">
          <div className="inline-block border border-[#00AEEF]/30 bg-[#00AEEF]/5 px-4 py-2">
            <span className="text-[#00AEEF] font-bold tracking-widest text-lg drop-shadow-sm">{language === 'en' ? "Targeting the world's smartest cities." : "전 세계 가장 스마트한 도시들을 향합니다."}</span>
          </div>
        </div>

        <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] md:aspect-[2.5/1] max-w-5xl mx-auto border border-white/10 rounded-2xl bg-[#050D1D]/50 backdrop-blur-sm overflow-hidden shadow-2xl">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
               `,
               backgroundSize: '40px 40px'
            }}
          />

          {mappedCities.map((city, idx) => (
            <div 
              key={idx}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-50 pointer-events-auto"
              style={{ top: city.top, left: city.left }}
              onClick={() => {
                if (city.images.length > 0) {
                  setGalleryImages(city.images);
                  setActiveGallery(city.name);
                }
              }}
            >
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 sm:gap-3 bg-black/80 border border-[#00AEEF]/40 px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm backdrop-blur-xl hover:border-[#00AEEF] transition-all z-10 shadow-xl">
                  <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${city.hasData ? 'bg-[#00AEEF] shadow-[0_0_10px_#00AEEF]' : 'bg-gray-500'} group-hover:animate-ping`} />
                  <span className="text-white text-base sm:text-xl font-black tracking-widest group-hover:text-[#00AEEF] uppercase">{city.name}</span>
                </div>
                {city.images.length > 0 && (
                  <div className="mt-2 flex items-center gap-1.5 px-3 py-1 bg-[#00AEEF] rounded-full border border-[#00AEEF]/50 opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                    <span className="text-sm text-black font-black tracking-tighter">{city.images.length} PHOTOS</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="absolute top-1/2 left-1/2 w-full h-full border border-[#00AEEF]/5 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-[ping_4s_ease-out_infinite]" />
        </div>
      </div>

      <PhotoGalleryOverlay 
        isOpen={!!activeGallery}
        images={galleryImages}
        title={activeGallery}
        onClose={() => setActiveGallery(null)}
      />
    </section>
  );
}
