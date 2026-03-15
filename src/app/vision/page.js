"use client";

import React, { useState, useEffect } from 'react';
import PhotoGalleryOverlay from '@/components/PhotoGalleryOverlay';
import { MapPin } from 'lucide-react';

const citiesData = [
  { id: 'beijing', label: 'Beijing', top: '25%', left: '15%', delay: '0s' },
  { id: 'seoul', label: 'SEOUL', top: '20%', left: '45%', delay: '0.2s', isMain: true },
  { id: 'tokyo', label: 'Tokyo', top: '35%', left: '75%', delay: '0.4s' },
  { id: 'los_angeles', label: 'Los Angeles', top: '65%', left: '15%', delay: '0.6s' },
  { id: 'shanghai', label: 'Shanghai', top: '55%', left: '48%', delay: '0.8s' },
  { id: 'singapore', label: 'Singapore', top: '75%', left: '80%', delay: '1s' },
];

export default function GlobalTechnologyVision() {
  const [activeGallery, setActiveGallery] = useState(null);
  const [currentGalleryImages, setCurrentGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch images dynamically from the API, exact same logic as Industrial/Sustainable
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
    <main className="min-h-screen bg-[#020617] text-white flex flex-col items-center py-24 relative overflow-hidden font-sans">
      {/* Cybernetic Grid & Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-[#00AEEF]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[20%] w-[50%] h-[50%] bg-[#0A1F44]/50 blur-[150px] rounded-full" />
      </div>

      <div className="z-10 w-full max-w-6xl px-4 text-left mb-16 pl-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2 text-white uppercase flex items-center gap-4">
          A Global Technology Vision <span className="text-[#00AEEF] text-5xl">→</span>
        </h1>
        <p className="text-[#00AEEF] text-xl font-medium tracking-wide bg-[rgba(0,174,239,0.1)] inline-block px-4 py-1 border border-[#00AEEF]/30 shadow-[0_0_10px_rgba(0,174,239,0.2)]">
          Targeting the world's smartest cities.
        </p>
      </div>

      {/* Cybernetic Map Area */}
      <div className="z-10 relative w-full max-w-5xl h-[600px] border border-white/5 rounded-2xl bg-black/20 backdrop-blur-sm mt-8 mx-auto hidden md:block overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
         {/* Grid lines for cyber aesthetic */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
         
         {citiesData.map((city) => (
           <div 
             key={city.id} 
             className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-fade-in-up"
             style={{ top: city.top, left: city.left, animationDelay: city.delay, animationFillMode: 'both' }}
           >
              <button
                onClick={() => setActiveGallery(city.id)}
                className={`group relative flex items-center gap-2 px-6 py-3 rounded-none border transition-all duration-300 ${
                  city.isMain 
                    ? 'bg-transparent border-transparent hover:bg-white/5' 
                    : 'bg-[#050B14] border-white/10 hover:border-[#00AEEF]/50 shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:shadow-[0_0_20px_rgba(0,174,239,0.3)]'
                }`}
              >
                {!city.isMain && (
                   <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] group-hover:shadow-[0_0_8px_#00AEEF] transition-all" />
                )}
                
                <span className={`${
                  city.isMain 
                    ? 'text-4xl font-light tracking-widest text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' 
                    : 'text-lg font-medium text-gray-200 group-hover:text-white'
                } transition-colors`}>
                  {city.label}
                </span>

                {/* Cyberpunk corner accents */}
                {!city.isMain && (
                  <>
                    <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-[#00AEEF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-[#00AEEF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </>
                )}
              </button>
           </div>
         ))}
      </div>

      {/* Mobile Fallback List */}
      <div className="z-10 w-full max-w-sm px-4 md:hidden flex flex-col gap-4 mt-8">
        {citiesData.map((city) => (
           <button
             key={city.id}
             onClick={() => setActiveGallery(city.id)}
             className="flex items-center gap-4 bg-[#050B14] border border-white/10 px-6 py-4 hover:border-[#00AEEF] transition-colors"
           >
             <MapPin size={20} className="text-[#00AEEF]" />
             <span className="text-xl font-medium">{city.label}</span>
           </button>
        ))}
      </div>

      <PhotoGalleryOverlay 
        isOpen={!!activeGallery} 
        images={currentGalleryImages}
        title={citiesData.find(d => d.id === activeGallery)?.label || ''}
        onClose={() => setActiveGallery(null)} 
      />
      
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translate(-50%, -30%); }
          100% { opacity: 1; transform: translate(-50%, -50%); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </main>
  );
}
