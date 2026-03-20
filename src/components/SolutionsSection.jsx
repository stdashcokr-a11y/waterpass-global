"use client";

import React, { useState, useEffect } from 'react';
import IndustrialCard from './IndustrialCard';
import PhotoGalleryOverlay from './PhotoGalleryOverlay';

import { useLanguage } from '@/context/LanguageContext';

export default function SolutionsSection() {
  const { language } = useLanguage();
  const [activeGallery, setActiveGallery] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const industrialSolutions = [
    {
      id: 'pedestrian',
      title: language === 'en' ? 'PEDESTRIAN BLOCK' : '보도용 블록',
      specs: language === 'en' ? [
        '200 × 200 × 60 mm',
        'Flexural Strength: ≥ 4.0 MPa',
        'Permeability: ≥ 0.5 mm/sec'
      ] : [
        '200 × 200 × 60 mm',
        '휨강도: ≥ 4.0 MPa',
        '투수계수: ≥ 0.5 mm/sec'
      ]
    },
    {
      id: 'road',
      title: language === 'en' ? 'ROAD BLOCK' : '차도용 블록',
      specs: language === 'en' ? [
        '200 × 200 × 80 mm',
        'Flexural Strength: ≥ 5.0 MPa',
        'High Load Bearing Capacities'
      ] : [
        '200 × 200 × 80 mm',
        '휨강도: ≥ 5.0 MPa',
        '초고하중 차량 통행 설계'
      ]
    }
  ];

  useEffect(() => {
    if (!activeGallery) return;

    const fetchImages = async () => {
      try {
        const typeMapping = activeGallery === 'pedestrian' ? 'pedestrian_block' : 'road_block';
        const response = await fetch(`/api/images?type=${typeMapping}`);
        const data = await response.json();
        
        if (data.images && data.images.length > 0) {
          setGalleryImages(data.images);
        } else {
          // Fallback placeholders
          const seed = typeMapping === 'pedestrian_block' ? 10 : 20;
          setGalleryImages(Array.from({ length: 12 }).map((_, i) => `https://picsum.photos/seed/${seed + i}/800/600`));
        }
      } catch (error) {
        console.error("Gallery fetch failed:", error);
      }
    };
    fetchImages();
  }, [activeGallery]);

  return (
    <section className="w-full py-16 md:py-32 bg-[#1a1a1a] relative z-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="mb-10 md:mb-16">
           <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter ${language === 'en' ? 'uppercase' : 'break-keep'}`}>
             {language === 'en' ? 'INDUSTRIAL GRADE SOLUTIONS' : '산업용 투수블록 솔루션'}
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {industrialSolutions.map((solution) => (
            <IndustrialCard 
              key={solution.id}
              section={solution} 
              onOpenGallery={() => setActiveGallery(solution.id)} 
            />
          ))}
        </div>

        {/* Maintenance Lifecycle Graph */}
        <div className="mt-24 md:mt-32 w-full max-w-4xl mx-auto bg-[#1A1A1A] rounded-2xl border border-white/10 p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00AEEF]/5 blur-3xl rounded-full" />
          
          <div className="text-center mb-12 relative z-20">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tighter mb-4">
              {language === 'en' ? 'LIFECYCLE MAINTENANCE COST' : '투수성능 유지 사이클 비교'}
            </h3>
            <p className="text-gray-400 font-light text-sm sm:text-base">
              {language === 'en' ? 'Comparing conventional blocks (1 year) vs WaterPass (5+ years)' : '1년이면 막히는 일반 블록 vs 5년 이상 투수성이 유지되는 WaterPass'}
            </p>
          </div>

          <div className="flex flex-col gap-10 relative z-20">
            
            {/* Conventional Bar */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs sm:text-sm font-bold tracking-widest text-gray-400">CONVENTIONAL (일반 투수블록)</span>
                <span className="text-red-400 text-xs font-bold tracking-wider bg-red-950/50 px-3 py-1 rounded-sm border border-red-900/50">CLOGGED IN 1 YEAR</span>
              </div>
              <div className="h-6 sm:h-8 w-full bg-black/80 rounded-sm overflow-hidden flex border border-white/5">
                <div className="h-full bg-gradient-to-r from-red-900 to-red-500 w-[20%] flex items-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
                <div className="h-full flex-grow flex items-center px-4 text-[10px] sm:text-xs text-red-500/50 font-bold tracking-widest bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgNDBMMDAgMEw0MCAwdnoiIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]">
                  MAINTENANCE REQUIRED
                </div>
              </div>
              <div className="flex justify-between text-[9px] sm:text-[10px] text-gray-600 font-mono mt-2 uppercase">
                <span>0 Yr</span>
                <span>1 Yr</span>
                <span>2 Yrs</span>
                <span>3 Yrs</span>
                <span>4 Yrs</span>
                <span>5 Yrs</span>
              </div>
            </div>

            {/* WaterPass Bar */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00AEEF]">WATERPASS (투수 보도블록)</span>
                <span className="text-white text-xs font-bold tracking-wider bg-[#00AEEF]/20 px-3 py-1 rounded-sm border border-[#00AEEF]/40">SUSTAINED 5+ YEARS</span>
              </div>
              <div className="h-8 sm:h-10 w-full bg-black/80 rounded-sm overflow-hidden flex border border-[#00AEEF]/30 relative shadow-[0_0_20px_rgba(0,174,239,0.15)]">
                <div className="h-full bg-gradient-to-r from-[#003366] via-[#00AEEF] to-[#00AEEF] w-full flex items-center px-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="text-white font-black text-[10px] sm:text-xs tracking-widest drop-shadow-md z-10 w-full text-right pr-2">
                    500% LONGER LIFESPAN
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-[9px] sm:text-[10px] text-gray-500 font-mono mt-2 uppercase px-1">
                <span>0 Yr</span>
                <span>1 Yr</span>
                <span>2 Yrs</span>
                <span>3 Yrs</span>
                <span>4 Yrs</span>
                <span className="text-[#00AEEF] font-bold">5 Yrs+</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <PhotoGalleryOverlay 
        isOpen={!!activeGallery}
        images={galleryImages}
        title={industrialSolutions.find(s => s.id === activeGallery)?.title || ''}
        onClose={() => setActiveGallery(null)}
      />
    </section>
  );
}
