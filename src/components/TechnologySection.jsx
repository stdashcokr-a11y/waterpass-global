"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PhotoGalleryOverlay from './PhotoGalleryOverlay';

export default function TechnologySection({ data = [], layerData = [] }) {
  const { language } = useLanguage();

  const [activeGallery, setActiveGallery] = useState(null);
  
  // Page 3 Sections: text content
  const techData1 = data[0] || {};
  const techData2 = data[1] || {};
  
  // Page 4 Sections: Macro comparisons and Layers
  // The first few items in layerData are the 3D layers (row 1,2,3 for page 4)
  // The rest are the macro comparisons
  const l1 = layerData[0] || {};
  const l2 = layerData[1] || {};
  const l3 = layerData[2] || {};

  // Macro comparisons are also in page 4 (layerData)
  const leftItems = layerData.filter(item => item.section.toLowerCase().includes('conventional'));
  const rightItems = layerData.filter(item => !item.section.toLowerCase().includes('conventional') && item.page === '4' && !item.section.toLowerCase().includes('layer') && !item.section.toLowerCase().includes('structure') && !item.section.toLowerCase().includes('channel'));

  const [leftIdx, setLeftIdx] = useState(0);
  const [rightIdx, setRightIdx] = useState(0);

  const nextLeft = () => setLeftIdx(prev => (prev + 1) % (leftItems.length || 1));
  const prevLeft = () => setLeftIdx(prev => (prev - 1 + (leftItems.length || 1)) % (leftItems.length || 1));
  const nextRight = () => setRightIdx(prev => (prev + 1) % (rightItems.length || 1));
  const prevRight = () => setRightIdx(prev => (prev - 1 + (rightItems.length || 1)) % (rightItems.length || 1));

  const t = {
    badge: language === 'en' ? 'CORE MATERIAL' : '핵심 소재',
    title: techData1.subject || (language === 'en' ? 'ADVANCED PERMEABLE MATERIAL TECHNOLOGY' : '첨단 투수성 소재 기술'),
    ash_title: techData1.description || (language === 'en' ? 'CORE BOTTOM ASH' : '석탄저회 매트릭스'),
    ash_desc: techData1.link || (language === 'en' ? 'High-strength matrix using recycled industrial by-products.' : '산업 부산물을 재활용한 고강도 친환경 매트릭스 기술.'),
    mesh_title: techData2.subject || (language === 'en' ? 'ANTI-CLOGGING MESH' : '막힘 방지 구조'),
    mesh_desc: techData2.description || (language === 'en' ? 'Engineered voids that remain open for decades.' : '오랜 기간 탁월한 투수 성능을 유지하는 특수 공극 설계.'),
    layer1: l1.subject || (language === 'en' ? 'Drainage Channel' : '하층 배수 채널'),
    layer2: l2.subject || (language === 'en' ? 'Permeable Structure' : '중간 투수 골조'),
    layer3: l3.subject || (language === 'en' ? 'Surface Layer' : '표면층'),
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
                  <span className="block text-[#00AEEF] font-black tracking-widest text-lg mb-3">
                    {t.ash_title}
                  </span>
                  <p className={`text-white font-medium text-2xl md:text-3xl ${language === 'kr' ? 'break-keep' : ''} leading-tight drop-shadow-md`}>
                    {t.ash_desc}
                  </p>
               </div>
               
               <div>
                  <span className="block text-[#00AEEF] font-black tracking-widest text-lg mb-3">
                    {t.mesh_title}
                  </span>
                  <p className={`text-white font-medium text-2xl md:text-3xl ${language === 'kr' ? 'break-keep' : ''} leading-tight drop-shadow-md`}>
                    {t.mesh_desc}
                  </p>
               </div>

               {/* 3x Rule Highlight */}
               <div className="mt-6 p-8 border border-white/20 bg-white/5 rounded-xl flex flex-col sm:flex-row gap-6 items-center shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:border-[#00AEEF]/60 transition-colors">
                  <div className="flex flex-col items-center justify-center p-5 bg-[#00AEEF]/20 rounded-xl border border-[#00AEEF]/40 min-w-[120px]">
                    <span className="text-[#00AEEF] text-4xl font-black">3X</span>
                    <span className="text-[10px] sm:text-[12px] text-white font-bold tracking-[0.2em] mt-1">PERFORMANCE</span>
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="block text-white font-black text-xl mb-2">
                      {language === 'en' ? 'The 3x Rule Advantage' : '압도적 3배의 법칙'}
                    </span>
                    <p className={`text-gray-200 font-medium text-base sm:text-lg leading-relaxed ${language === 'kr' ? 'break-keep' : ''}`}>
                      {language === 'en' ? '3x higher permeability and 3x longer maintenance cycle compared to conventional blocks.' : '기존 일반 투수블록 대비 탁월한 투수성능 3배, 투수유지성능(5년 이상) 3배 보장.'}
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
                  className="absolute w-[120%] h-[90px] sm:h-[120px] md:h-[150px] bg-[rgba(10,31,68,0.7)] border-2 border-white/20 backdrop-blur-md transition-all duration-500 hover:border-white shadow-2xl cursor-crosshair group z-[1]"
                  style={{ top: '65%', left: '-10%', transform: 'perspective(1000px) rotateX(45deg) rotateZ(-10deg)' }}
                  onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'perspective(1000px) rotateX(45deg) rotateZ(-15deg) translateY(-20px)';
                  }}
                  onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'perspective(1000px) rotateX(45deg) rotateZ(-10deg)';
                  }}
                >
                   <div 
                      className={`absolute right-[-150px] sm:right-[-200px] md:right-[-280px] top-1/2 -translate-y-1/2 text-[#00AEEF] font-black ${language === 'en' ? 'text-2xl sm:text-3xl md:text-4xl tracking-widest' : 'text-3xl sm:text-4xl md:text-5xl'} transition-all group-hover:text-white whitespace-nowrap drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]`}
                      style={{ transform: 'rotateZ(10deg)' }}
                   >
                      {t.layer1}
                   </div>
                </div>

                {/* Layer 2 - Middle */}
                <div 
                  className="absolute w-[120%] h-[90px] sm:h-[120px] md:h-[150px] bg-[rgba(10,31,68,0.9)] border-2 border-white/20 backdrop-blur-md transition-all duration-500 hover:border-white shadow-xl cursor-crosshair group z-[2]"
                  style={{ top: '35%', left: '-10%', transform: 'perspective(1000px) rotateX(45deg) rotateZ(-10deg)' }}
                  onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'perspective(1000px) rotateX(45deg) rotateZ(-15deg) translateY(-20px)';
                  }}
                  onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'perspective(1000px) rotateX(45deg) rotateZ(-10deg)';
                  }}
                >
                   <div 
                      className={`absolute right-[-150px] sm:right-[-200px] md:right-[-280px] top-1/2 -translate-y-1/2 text-[#00AEEF] font-black ${language === 'en' ? 'text-2xl sm:text-3xl md:text-4xl tracking-widest' : 'text-3xl sm:text-4xl md:text-5xl'} transition-all group-hover:text-white whitespace-nowrap drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]`}
                      style={{ transform: 'rotateZ(10deg)' }}
                   >
                      {t.layer2}
                   </div>
                </div>

                {/* Layer 1 - Top */}
                <div 
                  className="absolute w-[120%] h-[90px] sm:h-[120px] md:h-[150px] bg-[rgba(0,174,239,0.3)] border-2 border-[#00AEEF]/50 backdrop-blur-md transition-all duration-500 hover:border-[#00AEEF] hover:bg-[rgba(0,174,239,0.4)] shadow-[0_20px_60px_rgba(0,174,239,0.25)] cursor-crosshair group z-[3]"
                  style={{ top: '5%', left: '-10%', transform: 'perspective(1000px) rotateX(45deg) rotateZ(-10deg)' }}
                  onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'perspective(1000px) rotateX(45deg) rotateZ(-15deg) translateY(-20px)';
                  }}
                  onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'perspective(1000px) rotateX(45deg) rotateZ(-10deg)';
                  }}
                >
                   <div 
                      className={`absolute right-[-150px] sm:right-[-200px] md:right-[-280px] top-1/2 -translate-y-1/2 text-[#00AEEF] font-black ${language === 'en' ? 'text-2xl sm:text-3xl md:text-4xl tracking-widest' : 'text-3xl sm:text-4xl md:text-5xl'} transition-all group-hover:text-white whitespace-nowrap drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]`}
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
               <h4 className="text-white font-black mb-6 tracking-[0.3em] text-lg sm:text-xl uppercase">CONVENTIONAL (1~8mm)</h4>
               <div className="relative w-full h-56 sm:h-72">
                 <div 
                   onClick={() => setActiveGallery('left')}
                   className="w-full h-full bg-black/50 rounded-md border border-white/10 flex items-center justify-center relative overflow-hidden cursor-pointer group/upload hover:border-red-500/50 transition-colors"
                 >
                   <img src={leftItems[leftIdx]?.displayLink || 'https://picsum.photos/600/400?grayscale'} alt="Conventional" className="w-full h-full object-cover opacity-60 grayscale blur-[1px] group-hover/upload:scale-105 transition-transform duration-500" />
                   <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity">
                      <span className="text-white text-[10px] sm:text-xs font-bold bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
                        {language === 'en' ? 'VIEW DETAILS' : '상세 보기'}
                      </span>
                   </div>
                   {leftItems.length > 1 && (
                      <span className="absolute top-2 right-2 text-white text-[10px] font-bold bg-red-500/80 px-2 py-1 rounded shadow">
                        {leftIdx + 1} / {leftItems.length}
                      </span>
                   )}
                 </div>
                 {leftItems.length > 1 && (
                   <>
                     <button onClick={(e) => { e.stopPropagation(); prevLeft(); }} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center border border-white/10 hover:bg-[#00AEEF] transition-colors z-20">←</button>
                     <button onClick={(e) => { e.stopPropagation(); nextLeft(); }} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center border border-white/10 hover:bg-[#00AEEF] transition-colors z-20">→</button>
                   </>
                 )}
               </div>
                <p className="text-white text-2xl md:text-3xl text-left leading-relaxed font-black mt-8 break-keep drop-shadow-md">
                  {leftItems[leftIdx]?.description || (language === 'en' ? 'Rainwater, which only flowed through the gap of 1-2mm silica sand, causes rapid clogging due to tire dust and fine dust between the silica sand in less than a year.' : '1~2mm 규사 틈새로만 빗물이 빠져나가던 기존 방식은 타이어 분진 및 미세먼지로 인해 1년도 채 되지 않아 급격한 막힘 현상이 발생합니다.')}
                </p>
            </div>

            {/* WaterPass */}
            <div className="flex flex-col items-center bg-[#003366]/30 p-6 rounded-lg border border-[#00AEEF]/40 relative overflow-hidden group hover:bg-[#003366]/50 transition-colors shadow-[0_10px_30px_rgba(0,174,239,0.1)]">
               <div className="absolute top-0 left-0 w-full h-1 bg-[#00AEEF]" />
               <h4 className="text-[#00AEEF] font-black mb-6 tracking-[0.3em] text-lg sm:text-xl uppercase">WATERPASS (1~8mm)</h4>
               <div className="relative w-full h-56 sm:h-72">
                 <div 
                   onClick={() => setActiveGallery('right')}
                   className="w-full h-full bg-black/50 rounded-md border border-[#00AEEF]/30 flex items-center justify-center relative overflow-hidden cursor-pointer group/upload hover:border-[#00AEEF]/60 transition-colors"
                 >
                   <img src={rightItems[rightIdx]?.displayLink || 'https://picsum.photos/600/400?blue'} alt="Waterpass Macro" className="w-full h-full object-cover opacity-90 group-hover/upload:scale-105 transition-transform duration-500" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                   <span className="absolute bottom-4 text-white text-[10px] sm:text-xs font-bold px-4 py-1.5 bg-black/60 rounded-full border border-white/20 backdrop-blur-md pointer-events-none z-10">
                     {language === 'en' ? 'Graphene Oxide + Bottom Ash' : '산화그래핀 + 바텀애쉬'}
                   </span>
                   <div className="absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity z-20">
                      <span className="text-white text-[10px] sm:text-xs font-bold bg-black/60 px-3 py-1.5 rounded-full border border-[#00AEEF]/40">
                        {language === 'en' ? 'VIEW DETAILS' : '상세 보기'}
                      </span>
                   </div>
                   {rightItems.length > 1 && (
                      <span className="absolute top-2 right-2 text-white text-[10px] font-bold bg-[#00AEEF]/80 px-2 py-1 rounded shadow z-20">
                        {rightIdx + 1} / {rightItems.length}
                      </span>
                   )}
                 </div>
                 {rightItems.length > 1 && (
                   <>
                     <button onClick={(e) => { e.stopPropagation(); prevRight(); }} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center border border-white/10 hover:bg-[#00AEEF] transition-colors z-20">←</button>
                     <button onClick={(e) => { e.stopPropagation(); nextRight(); }} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center border border-white/10 hover:bg-[#00AEEF] transition-colors z-20">→</button>
                   </>
                 )}
               </div>
                <p className="text-white text-2xl md:text-3xl text-left leading-relaxed font-black mt-8 break-keep drop-shadow-md">
                  {rightItems[rightIdx]?.description || (language === 'en' ? 'Consisting of a 1-2mm core bottom ash surface, not only rainwater drains through the gap, but also the core bottom ash itself, which is composed of numerous pores, has high sustainability permeability and applies graphene oxide to ensure Mpa strength above the ksf4419 standard.' : '1~2mm 코어 바텀애쉬 표층으로 구성되어 골재 틈새뿐만 아니라 수많은 기공으로 이루어진 바텀애쉬 자체로도 빗물이 투과되어 지속 가능한 높은 투수성을 보장하며, 산화그래핀을 적용하여 KS F 4419 기준 이상의 휨강도를 확보합니다.')}
                </p>
            </div>

          </div>
        </div>

      </div>

      <PhotoGalleryOverlay
        isOpen={!!activeGallery}
        images={activeGallery === 'left' ? leftItems.map(i => i.displayLink) : (activeGallery === 'right' ? rightItems.map(i => i.displayLink) : [])}
        title={activeGallery === 'left' ? 'CONVENTIONAL MACRO' : 'WATERPASS MACRO'}
        onClose={() => setActiveGallery(null)}
      />
    </section>
  );
}
