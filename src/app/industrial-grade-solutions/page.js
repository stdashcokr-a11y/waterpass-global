"use client";

import React, { useState, useEffect } from 'react';
import IndustrialCard from '@/components/IndustrialCard';
import PhotoGalleryOverlay from '@/components/PhotoGalleryOverlay';

const industrialData = [
  {
    id: 'pedestrian_block',
    title: 'PEDESTRIAN BLOCK',
    specs: [
      '200 × 200 × 60 mm',
      'Flexural Strength: ≥ 4.0 MPa',
      'Permeability: ≥ 0.5 mm/sec'
    ],
    imageAlt: 'Pedestrian Block',
    images: Array.from({ length: 12 }).map((_, i) => `/images/placeholder-pedestrian-${(i % 3) + 1}.jpg`) // Will use picsum placeholders down below actually
  },
  {
    id: 'road_block',
    title: 'ROAD BLOCK',
    specs: [
      '200 × 200 × 80 mm',
      'Flexural Strength: ≥ 5.0 MPa',
      'High Load Bearing Capacities'
    ],
    imageAlt: 'Road Block',
    images: Array.from({ length: 12 }).map((_, i) => `/images/placeholder-road-${(i % 3) + 1}.jpg`)
  }
];

export default function IndustrialGradeSolutions() {
  const [activeGallery, setActiveGallery] = useState(null);
  const [currentGalleryImages, setCurrentGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch true local images dynamically from API, or fallback to placeholders
  useEffect(() => {
    if (!activeGallery) {
      setCurrentGalleryImages([]);
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/images?type=${activeGallery}`);
        const data = await response.json();
        
        // If local user-provided files exist, use them
        if (data.images && data.images.length > 0) {
          setCurrentGalleryImages(data.images);
        } else {
          // Fallback to online placeholders if the folder is completely empty
          const seed = activeGallery === 'pedestrian_block' ? 100 : 200;
          setCurrentGalleryImages(Array.from({ length: 12 }).map((_, i) => `https://picsum.photos/seed/${seed + i}/800/600`));
        }
      } catch (error) {
        console.error("Failed to load gallery images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [activeGallery]);

  return (
    <main className="min-h-screen bg-[#050E21] text-white flex flex-col items-center py-24 relative overflow-hidden">
      {/* Vanta/Theme Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00AEEF]/5 blur-[150px] rounded-full" />
      </div>

      <div className="z-10 w-full max-w-5xl px-4 text-left mb-16 px-4 pl-4 md:pl-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">
          INDUSTRIAL GRADE SOLUTIONS
        </h1>
      </div>

      {/* 2 Cards Layout - Responsive, Side-by-side */}
      <div className="z-10 container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {industrialData.map((section) => (
            <IndustrialCard 
              key={section.id}
              section={section}
              onOpenGallery={() => setActiveGallery(section.id)}
            />
          ))}
        </div>
      </div>

      {/* Cinematic Photo Gallery Modal */}
      <PhotoGalleryOverlay 
        isOpen={!!activeGallery} 
        images={currentGalleryImages}
        title={industrialData.find(d => d.id === activeGallery)?.title || ''}
        onClose={() => setActiveGallery(null)} 
      />
    </main>
  );
}
