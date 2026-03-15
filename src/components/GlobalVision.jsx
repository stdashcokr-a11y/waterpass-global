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

export default function GlobalVision() {
  const { language } = useLanguage();
  const [activeGallery, setActiveGallery] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    if (!activeGallery) return;

    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/images?type=${activeGallery}`);
        const data = await response.json();
        
        if (data.images && data.images.length > 0) {
          setGalleryImages(data.images);
        } else {
          const seed = cities.findIndex(p => p.name.toLowerCase().replace(' ', '_') === activeGallery) * 100;
          setGalleryImages(Array.from({ length: 6 }).map((_, i) => `https://picsum.photos/seed/${seed + i}/800/600`));
        }
      } catch (error) {
        console.error("Gallery fetch failed:", error);
      }
    };
    fetchImages();
  }, [activeGallery]);

  return (
    <section className="w-full py-16 md:py-32 bg-[#020813] relative z-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header content aligned with the grid */}
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
            <span className="text-[#00AEEF] font-light tracking-wide text-sm">{language === 'en' ? "Targeting the world's smartest cities." : "전 세계 가장 스마트한 도시들을 향합니다."}</span>
          </div>
        </div>

        {/* Map Grid Container */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] md:aspect-[2.5/1] max-w-5xl mx-auto border border-white/10 rounded-2xl bg-[#050D1D]/50 backdrop-blur-sm overflow-hidden shadow-2xl">
          
          {/* Subtle Grid Background */}
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

          {/* City Pins */}
          {cities.map((city, idx) => (
            <div 
              key={idx}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-50 pointer-events-auto"
              style={{ top: city.top, left: city.left }}
              onClick={() => setActiveGallery(city.name.toLowerCase().replace(' ', '_'))}
            >
              {city.isCenter ? (
                <div className="text-white text-xl sm:text-2xl md:text-3xl font-light tracking-[0.2em] relative z-20 transition-colors group-hover:text-[#00AEEF] group-hover:scale-105" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
                  {city.name}
                </div>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2 bg-black/60 border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm backdrop-blur-md hover:border-[#00AEEF]/50 transition-colors z-10">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#00AEEF] shadow-[0_0_10px_#00AEEF] group-hover:animate-ping" />
                  <span className="text-gray-300 text-[10px] sm:text-sm font-light tracking-wide group-hover:text-white">{city.name}</span>
                </div>
              )}
            </div>
          ))}

          {/* Radar Sweep Effect (Optional Subtlety) */}
          <div className="absolute top-1/2 left-1/2 w-full h-full border border-[#00AEEF]/5 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-[ping_4s_ease-out_infinite]" />
        </div>
      </div>

      <PhotoGalleryOverlay 
        isOpen={!!activeGallery}
        images={galleryImages}
        title={cities.find(p => p.name.toLowerCase().replace(' ', '_') === activeGallery)?.name || ''}
        onClose={() => setActiveGallery(null)}
      />
    </section>
  );
}
