"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function TechnologySection() {
  const { language } = useLanguage();

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
    <section id="technology" className="w-full py-16 md:py-32 bg-[#020813] relative z-10 border-t border-white/5 overflow-hidden">
      
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
      </div>
    </section>
  );
}
