"use client";

import React, { useState, useEffect } from 'react';
import { Camera, Play, CheckCircle2 } from 'lucide-react';
import PhotoGalleryOverlay from './PhotoGalleryOverlay';
import VideoGalleryOverlay from './VideoGalleryOverlay';
import { useLanguage } from '@/context/LanguageContext';

export default function PerformanceMetrics() {
  const { language } = useLanguage();
  const [activePhotoGallery, setActivePhotoGallery] = useState(null);
  const [activeVideoGallery, setActiveVideoGallery] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const metricsData = [
    { 
      id: 'permeability', 
      value: '0.7+', 
      label: language === 'en' ? 'INITIAL PERMEABILITY' : '초기 투수계수', 
      sub: '(MM/SEC)', 
      type: 'photo',
      color: 'from-blue-500/10 to-transparent'
    },
    { 
      id: 'performance_retain', 
      value: '90%', 
      label: language === 'en' ? '5-YEAR PERFORMANCE' : '5년 후 성능 유지율', 
      sub: language === 'en' ? 'RETAIN' : '유지', 
      type: 'video',
      videos: [
        { id: 'dQw4w9WgXcQ', title: '5년 경과 후 투수 성능 테스트 현장 A' },
        { id: 'jNQXAC9IVRw', title: '도로 하중 견딤성 시뮬레이션 영상' },
        { id: '7wtfhZwyrcc', title: '글로벌 설치 사례 하이라이트' }
      ],
      color: 'from-[#00AEEF]/20 to-transparent'
    },
    { 
      id: 'flexural_strength', 
      value: '5.5', 
      label: language === 'en' ? 'FLEXURAL' : '휨강도', 
      sub: language === 'en' ? 'STRENGTH (MPA)' : '(MPA)', 
      type: 'photo',
      color: 'from-blue-500/10 to-transparent'
    }
  ];

  useEffect(() => {
    if (!activePhotoGallery) return;

    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/images?type=${activePhotoGallery}`);
        const data = await response.json();
        
        if (data.images && data.images.length > 0) {
          setGalleryImages(data.images);
        } else {
          // Fallback to 3 placeholders
          const seed = activePhotoGallery === 'permeability' ? 777 : 888;
          setGalleryImages(Array.from({ length: 3 }).map((_, i) => `https://picsum.photos/seed/${seed + i}/800/600`));
        }
      } catch (error) {
        console.error("Gallery fetch failed:", error);
      }
    };
    fetchImages();
  }, [activePhotoGallery]);

  return (
    <section className="w-full py-32 bg-transparent relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        
        <div className="w-full mb-16 px-4">
           <span className="text-[#00AEEF] text-xs font-black tracking-[0.3em] uppercase mb-4 block">TECHNICAL DATA</span>
           <h2 className={`text-4xl md:text-5xl font-black text-white tracking-tighter ${language === 'en' ? 'uppercase leading-none' : 'break-keep'}`}>
             {language === 'en' ? <>UNRIVALED<br/>PERFORMANCE METRICS</> : <>독보적인<br/>성능 지표</>}
           </h2>
           <p className={`text-gray-500 mt-4 max-w-sm font-light ${language === 'kr' ? 'break-keep' : ''}`}>
             {language === 'en' ? 'Data-driven reliability for international infrastructure leaders.' : '세계적 수준의 인프라를 위한 데이터 기반의 신뢰성.'}
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {metricsData.map((metric) => (
            <div 
              key={metric.id}
              className={`relative group h-[400px] flex flex-col items-center justify-center bg-[#050D1D] border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:border-[#00AEEF]/40 hover:-translate-y-2 shadow-2xl`}
            >
               {/* Background Glow */}
               <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
               
               {/* Interaction Button at Top Right */}
               <button 
                 onClick={() => {
                   if (metric.type === 'photo') setActivePhotoGallery(metric.id);
                   else setActiveVideoGallery(metric);
                 }}
                 className="absolute top-6 right-6 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-[#00AEEF] hover:text-black hover:scale-110 z-20 group/btn"
               >
                 {metric.type === 'photo' ? <Camera size={20} /> : <Play size={20} className="ml-1" fill="currentColor" />}
                 
                 {/* Small tooltip script would go here if needed */}
               </button>

               {/* Metric Content */}
               <div className="flex flex-col items-center text-center px-8 z-10">
                  <h3 className="text-7xl font-black text-white tracking-tighter mb-4 flex items-start gap-1">
                    {metric.value}
                    {metric.id === 'flexural_strength' && <CheckCircle2 className="w-6 h-6 text-[#00AEEF] mt-1" />}
                  </h3>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-white text-sm font-black tracking-[0.1em]">{metric.label}</span>
                    <span className="text-gray-500 text-xs font-medium">{metric.sub}</span>
                  </div>
               </div>

               {/* Modern Bottom Edge Detail */}
               <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5 group-hover:bg-[#00AEEF] transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

      <PhotoGalleryOverlay 
        isOpen={!!activePhotoGallery}
        images={galleryImages}
        title={metricsData.find(m => m.id === activePhotoGallery)?.label || ''}
        onClose={() => setActivePhotoGallery(null)}
      />

      <VideoGalleryOverlay
        isOpen={!!activeVideoGallery}
        videos={activeVideoGallery?.videos || []}
        title={activeVideoGallery?.label || ''}
        onClose={() => setActiveVideoGallery(null)}
      />
    </section>
  );
}
