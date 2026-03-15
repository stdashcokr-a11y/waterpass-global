"use client";

import React, { useState, useEffect } from 'react';
import PhotoGalleryOverlay from '@/components/PhotoGalleryOverlay';
import { Waves, Recycle, Snowflake, Footprints, Navigation, SquareParking } from 'lucide-react';

const citiesData = [
  { id: 'flood_reduction', label: 'Flood Reduction', icon: Waves },
  { id: 'recycled_materials', label: 'Recycled Materials', icon: Recycle },
  { id: 'urban_cooling', label: 'Urban Cooling', icon: Snowflake },
  { id: 'sidewalks_plazas', label: 'Sidewalks & Plazas', icon: Footprints },
  { id: 'roads', label: 'Roads', icon: Navigation },
  { id: 'parking', label: 'Parking', icon: SquareParking },
];

export default function BuildingSustainableCities() {
  const [activeGallery, setActiveGallery] = useState(null);
  const [currentGalleryImages, setCurrentGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch images dynamically from the API, exact same logic as Industrial
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
        
        if (data.images && data.images.length > 0) {
          setCurrentGalleryImages(data.images);
        } else {
          // Fallback to 6 online placeholders if folder is empty
          const seed = Array.from(activeGallery).reduce((acc, char) => acc + char.charCodeAt(0), 0);
          setCurrentGalleryImages(Array.from({ length: 6 }).map((_, i) => `https://picsum.photos/seed/${seed + i}/800/600`));
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
    <main className="min-h-screen bg-[#050E21] text-white flex flex-col items-center justify-center py-24 relative overflow-hidden">
      {/* Cinematic Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-[#00AEEF]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#0A1F44]/40 blur-[150px] rounded-full" />
      </div>

      <div className="z-10 w-full max-w-6xl px-4 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-white uppercase drop-shadow-[0_0_15px_rgba(0,174,239,0.3)]">
          BUILDING SUSTAINABLE CITIES
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
          Explore our six core domains of modern urban climate infrastructure through on-site photography.
        </p>
      </div>

      {/* 6 Grid Buttons Layout */}
      <div className="z-10 container mx-auto px-4 max-w-5xl">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {citiesData.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveGallery(item.id)}
                className="group relative flex items-center gap-4 bg-[rgba(10,31,68,0.7)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-xl px-8 py-5 hover:border-[#00AEEF] hover:-translate-y-1 transition-all duration-300 w-[280px] md:w-[320px] overflow-hidden"
              >
                {/* Glow Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00AEEF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Icon Wrapper */}
                <div className="w-12 h-12 rounded-full bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.05)] flex items-center justify-center text-[#00AEEF] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#00AEEF] group-hover:text-black">
                  <IconComponent size={24} strokeWidth={2} />
                </div>

                {/* Text */}
                <span className="text-lg font-bold tracking-wide text-gray-200 group-hover:text-white transition-colors text-left leading-tight">
                  {item.label}
                </span>

                {/* Subtle Right Arrow */}
                <div className="absolute right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#00AEEF]">
                  →
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Photo Gallery Modal */}
      <PhotoGalleryOverlay 
        isOpen={!!activeGallery} 
        images={currentGalleryImages}
        title={citiesData.find(d => d.id === activeGallery)?.label || ''}
        onClose={() => setActiveGallery(null)} 
      />
    </main>
  );
}
