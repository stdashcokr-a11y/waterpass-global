"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PhotoGalleryOverlay from './PhotoGalleryOverlay';

export default function TechnologySection() {
  const { language } = useLanguage();

  const [leftImages, setLeftImages] = useState(["/images/uploaded_media_1773382691515.img"]);
  const [rightImages, setRightImages] = useState(["/images/uploaded_media_1773382691515.img"]);
  const [activeGallery, setActiveGallery] = useState(null); // 'left' or 'right'

  const handleUpload = async (e, side) => {
    const files = Array.from(e.target.files).slice(0, 3); // Max 3 files per upload
    if (files.length === 0) return;

    const readers = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsDataURL(file);
      });
    });
    const results = await Promise.all(readers);

    const setImages = side === 'left' ? setLeftImages : setRightImages;
    setImages(prev => {
      let current = prev;
      if (current.length === 1 && current[0].includes('uploaded_media_1773382691515.img')) {
        current = []; // wipe placeholder
      }
      return [...current, ...results].slice(0, 3); // Keep max 3
    });

    setActiveGallery(side);
    alert(language === 'en' ? `Added ${results.length} images! (Max 3)` : `추가로 ${results.length}장의 사진이 등록되었습니다! (최대 3장)`);
  };

  const t = {
    badge: language === 'en' ? 'CORE MATERIAL' : '핵심 소재',
    title: language === 'en' ? (
      <>ADVANCED PERMEABLE<br />MATERIAL TECHNOLOGY</>
    ) : (
      <>첨단 투수성<br />소재 기술</>
    ),
    ash_title: language === 'en' ? 'CORE BOTTOM ASH' : '석탄저회 매트릭스',
    ash_desc: language === 'en' ? 'High-strength matrix using recycled industrial by-products.' : '산업 부산물을 재활용한 고강도 친환경 매트릭스 기술.',
    mesh_title: language === 'en' ? 'ANTI-CLOGGING MESH' : '막힘 방지 구조',
    mesh_desc: language === 'en' ? 'Engineered voids that remain open for decades.' : '수십 년간 탁월한 투수 성능을 유지하는 특수 공극 설계.',
    layer1: language === 'en' ? 'Drainage Channel' : '하층 배수 채널',
    layer2: language === 'en' ? 'Permeable Structure' : '중간 투수 골조',
    layer3: language === 'en' ? 'Surface Layer' : '표면층',
  };

  return (
    <section id="technology" className="w-full py-16 md:py-32 bg-graphene-black relative z-10 border-t border-white/5 overflow-hidden">
      
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 z-0 opacity-30" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,174,239,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Text Content */}
          <div className="flex flex-col">
            <div className="mb-8 md:mb-12">
               <span className="inline-block bg-[#00AEEF] text-black text-[10px] font-black px-3 py-1 mb-4 tracking-[3px] rounded-sm">
                 {t.badge}
               </span>
               <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tighter ${language === 'en' ? 'uppercase' : 'break-keep'} leading-[1.1] mb-6 md:mb-8`}>
                 {t.title}
               </h2>
            </div>
            
            <div className="flex flex-col gap-10">
               <div>
                  <span className="block text-[#00AEEF] font-black tracking-widest text-sm mb-2">
                    {t.ash_title}
                  </span>
                  <p className={`text-gray-400 font-light text-lg ${language === 'kr' ? 'break-keep' : ''}`}>
                    {t.ash_desc}
                  </p>
               </div>
               
               <div>
                  <span className="block text-[#00AEEF] font-black tracking-widest text-sm mb-2">
                    {t.mesh_title}
                  </span>
                  <p className={`text-gray-400 font-light text-lg ${language === 'kr' ? 'break-keep' : ''}`}>
                    {t.mesh_desc}
                  </p>
               </div>

               {/* 5x Rule Highlight */}
               <div className="mt-2 p-4 border border-white/10 bg-white/5 rounded-md flex gap-4 items-center shadow-[0_5px_20px_rgba(0,0,0,0.3)] hover:border-[#00AEEF]/40 transition-colors">
                  <div className="flex flex-col items-center justify-center p-3 bg-[#00AEEF]/20 rounded-md border border-[#00AEEF]/30 min-w-[80px]">
                    <span className="text-[#00AEEF] text-2xl font-black">5X</span>
                    <span className="text-[9px] sm:text-[10px] text-gray-300 tracking-wider">PERFORMANCE</span>
                  </div>
                  <div>
                    <span className="block text-white font-bold text-sm mb-1">
                      {language === 'en' ? 'The 5x Rule Advantage' : '압도적 5배의 법칙'}
                    </span>
                    <p className={`text-gray-400 font-light text-xs sm:text-sm leading-relaxed ${language === 'kr' ? 'break-keep' : ''}`}>
                      {language === 'en' ? '5x higher permeability and 5x longer maintenance cycle compared to conventional blocks.' : '기존 일반 투수블록 대비 탁월한 투수성능 5배, 투수유지성능(5년 이상) 5배 보장.'}
                    </p>
                  </div>
               </div>
            </div>
          </div>

          {/* Right: 3D Layer Visual */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full flex items-center justify-center pointer-events-auto mt-8 lg:mt-0 overflow-visible lg:overflow-visible overflow-x-hidden p-4 sm:p-8">
             <div className="relative w-[70%] sm:w-[80%] max-w-lg h-[300px] md:h-[400px] mr-12 sm:mr-20 md:mr-0">
                
                {/* Layer 3 - Bottom */}
                <div 
                  className="absolute w-full h-[60px] sm:h-[80px] md:h-[100px] bg-[rgba(10,31,68,0.6)] border border-white/10 backdrop-blur-md transition-all duration-500 hover:border-white shadow-2xl cursor-crosshair group z-[1]"
                  style={{ top: '60%', transform: 'perspective(1000px) rotateX(45deg) rotateZ(-10deg)' }}
                  onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'perspective(1000px) rotateX(45deg) rotateZ(-15deg) translateY(-20px)';
                  }}
                  onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'perspective(1000px) rotateX(45deg) rotateZ(-10deg)';
                  }}
                >
                   <div 
                      className={`absolute right-[-70px] sm:right-[-100px] md:right-[-140px] top-1/2 -translate-y-1/2 text-[#00AEEF] font-bold ${language === 'en' ? 'text-[9px] sm:text-xs tracking-wider' : 'text-[10px] sm:text-sm'} transition-all group-hover:text-white whitespace-nowrap`}
                      style={{ transform: 'rotateZ(10deg)' }}
                   >
                      {t.layer1}
                   </div>
                </div>

                {/* Layer 2 - Middle */}
                <div 
                  className="absolute w-full h-[60px] sm:h-[80px] md:h-[100px] bg-[rgba(10,31,68,0.8)] border border-white/10 backdrop-blur-md transition-all duration-500 hover:border-white shadow-xl cursor-crosshair group z-[2]"
                  style={{ top: '35%', transform: 'perspective(1000px) rotateX(45deg) rotateZ(-10deg)' }}
                  onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'perspective(1000px) rotateX(45deg) rotateZ(-15deg) translateY(-20px)';
                  }}
                  onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'perspective(1000px) rotateX(45deg) rotateZ(-10deg)';
                  }}
                >
                   <div 
                      className={`absolute right-[-70px] sm:right-[-100px] md:right-[-140px] top-1/2 -translate-y-1/2 text-[#00AEEF] font-bold ${language === 'en' ? 'text-[9px] sm:text-xs tracking-wider' : 'text-[10px] sm:text-sm'} transition-all group-hover:text-white whitespace-nowrap`}
                      style={{ transform: 'rotateZ(10deg)' }}
                   >
                      {t.layer2}
                   </div>
                </div>

                {/* Layer 1 - Top */}
                <div 
                  className="absolute w-full h-[60px] sm:h-[80px] md:h-[100px] bg-[rgba(0,174,239,0.2)] border border-[#00AEEF]/30 backdrop-blur-md transition-all duration-500 hover:border-[#00AEEF] hover:bg-[rgba(0,174,239,0.3)] shadow-[0_20px_50px_rgba(0,174,239,0.15)] cursor-crosshair group z-[3]"
                  style={{ top: '10%', transform: 'perspective(1000px) rotateX(45deg) rotateZ(-10deg)' }}
                  onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'perspective(1000px) rotateX(45deg) rotateZ(-15deg) translateY(-20px)';
                  }}
                  onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'perspective(1000px) rotateX(45deg) rotateZ(-10deg)';
                  }}
                >
                   <div 
                      className={`absolute right-[-70px] sm:right-[-100px] md:right-[-140px] top-1/2 -translate-y-1/2 text-[#00AEEF] font-bold ${language === 'en' ? 'text-[9px] sm:text-xs tracking-wider' : 'text-[10px] sm:text-sm'} transition-all group-hover:text-white whitespace-nowrap`}
                      style={{ transform: 'rotateZ(10deg)' }}
                   >
                      {t.layer3}
                   </div>
                </div>
                
             </div>
          </div>
        </div>

        {/* Macro Shot Comparison */}
        <div className="mt-24 md:mt-32 border-t border-white/10 pt-16 relative z-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tighter mb-4">
               {language === 'en' ? 'MICRO-STRUCTURAL DIFFERENCE' : '표면 구조의 압도적 차이'}
            </h3>
            <p className="text-gray-400 font-light text-sm sm:text-base">
               {language === 'en' ? 'Conventional Aggregates vs. Bottom Ash & Graphene Oxide' : '일반 골재(1~8mm)와 바텀애쉬 및 산화그래핀 매크로 비교'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Conventional */}
            <div className="flex flex-col items-center bg-white/5 p-6 rounded-lg border border-red-500/20 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50" />
               <h4 className="text-gray-300 font-bold mb-4 tracking-widest text-xs sm:text-sm">CONVENTIONAL (1~8mm)</h4>
               <label className="w-full h-56 sm:h-72 bg-black/50 rounded-md border border-white/10 flex items-center justify-center mb-6 relative overflow-hidden cursor-pointer group/upload hover:border-red-500/50 transition-colors">
                 <input type="file" accept="image/jpeg, image/png" multiple className="hidden" onChange={(e) => handleUpload(e, 'left')} />
                 <img src={leftImages[0]} alt="Conventional" className="w-full h-full object-cover opacity-60 grayscale blur-[1px] group-hover/upload:scale-105 transition-transform duration-500" onError={(e) => { e.target.src = 'https://picsum.photos/600/400?grayscale'; }} />
                 <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity">
                    <span className="text-white text-[10px] sm:text-xs font-bold bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
                      {language === 'en' ? 'CLICK TO UPLOAD (UP TO 3)' : '클릭하여 업로드 (최대 3장)'}
                    </span>
                 </div>
                 {leftImages.length > 1 && (
                    <span className="absolute top-2 right-2 text-white text-[10px] font-bold bg-red-500/80 px-2 py-1 rounded shadow">
                      {leftImages.length} PAGES
                    </span>
                 )}
               </label>
               <p className="text-gray-400 text-sm text-left leading-relaxed break-keep">
                 {language === 'en' ? 'Rainwater, which only flowed through the gap of 1-2mm silica sand, causes rapid clogging due to tire dust and fine dust between the silica sand in less than a year.' : '1~2mm 규사 틈새로만 빗물이 빠져나가던 기존 방식은 타이어 분진 및 미세먼지로 인해 1년도 채 되지 않아 급격한 막힘 현상이 발생합니다.'}
               </p>
            </div>

            {/* WaterPass */}
            <div className="flex flex-col items-center bg-[#003366]/30 p-6 rounded-lg border border-[#00AEEF]/40 relative overflow-hidden group hover:bg-[#003366]/50 transition-colors shadow-[0_10px_30px_rgba(0,174,239,0.1)]">
               <div className="absolute top-0 left-0 w-full h-1 bg-[#00AEEF]" />
               <h4 className="text-[#00AEEF] font-bold mb-4 tracking-widest text-xs sm:text-sm">WATERPASS (1~8mm)</h4>
               <label className="w-full h-56 sm:h-72 bg-black/50 rounded-md border border-[#00AEEF]/30 flex items-center justify-center mb-6 relative overflow-hidden cursor-pointer group/upload hover:border-[#00AEEF]/60 transition-colors">
                 <input type="file" accept="image/jpeg, image/png" multiple className="hidden" onChange={(e) => handleUpload(e, 'right')} />
                 <img src={rightImages[0]} alt="Waterpass Macro" className="w-full h-full object-cover opacity-90 group-hover/upload:scale-105 transition-transform duration-500" onError={(e) => { e.target.src = 'https://picsum.photos/600/400?blue'; }} />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                 <span className="absolute bottom-4 text-white text-[10px] sm:text-xs font-bold px-4 py-1.5 bg-black/60 rounded-full border border-white/20 backdrop-blur-md pointer-events-none z-10">
                   {language === 'en' ? 'Graphene Oxide + Bottom Ash' : '산화그래핀 + 바텀애쉬'}
                 </span>
                 <div className="absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity z-20">
                    <span className="text-white text-[10px] sm:text-xs font-bold bg-black/60 px-3 py-1.5 rounded-full border border-[#00AEEF]/40">
                      {language === 'en' ? 'CLICK TO UPLOAD (UP TO 3)' : '클릭하여 업로드 (최대 3장)'}
                    </span>
                 </div>
                 {rightImages.length > 1 && (
                    <span className="absolute top-2 right-2 text-white text-[10px] font-bold bg-[#00AEEF]/80 px-2 py-1 rounded shadow z-20">
                      {rightImages.length} PAGES
                    </span>
                 )}
               </label>
               <p className="text-gray-200 text-sm text-left leading-relaxed font-medium mt-4 break-keep">
                 {language === 'en' ? 'Consisting of a 1-2mm core bottom ash surface, not only rainwater drains through the gap, but also the core bottom ash itself, which is composed of numerous pores, has high sustainability permeability and applies graphene oxide to ensure Mpa strength above the ksf4419 standard.' : '1~2mm 코어 바텀애쉬 표층으로 구성되어 골재 틈새뿐만 아니라 수많은 기공으로 이루어진 바텀애쉬 자체로도 빗물이 투과되어 지속 가능한 높은 투수성을 보장하며, 산화그래핀을 적용하여 KS F 4419 기준 이상의 휨강도를 확보합니다.'}
               </p>
            </div>

          </div>
        </div>

      </div>

      <PhotoGalleryOverlay
        isOpen={!!activeGallery}
        images={activeGallery === 'left' ? leftImages : (activeGallery === 'right' ? rightImages : [])}
        title={activeGallery === 'left' ? 'CONVENTIONAL MACRO' : 'WATERPASS MACRO'}
        onClose={() => setActiveGallery(null)}
      />
    </section>
  );
}
