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
    <section className="w-full py-16 md:py-32 bg-[#020813] relative z-10 border-t border-white/5">
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
