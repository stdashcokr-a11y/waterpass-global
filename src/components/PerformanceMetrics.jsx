"use client";

import React, { useState, useEffect } from 'react';
import { Camera, Play, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import PhotoGalleryOverlay from './PhotoGalleryOverlay';
import VideoGalleryOverlay from './VideoGalleryOverlay';
import { useLanguage } from '@/context/LanguageContext';

export default function PerformanceMetrics({ data = [], tableData = [] }) {
  const { language } = useLanguage();
  const [activePhotoGallery, setActivePhotoGallery] = useState(null);
  const [activeVideoGallery, setActiveVideoGallery] = useState(null);
  const [certIndex, setCertIndex] = useState(0);
  
  // Page 8 Sections: "KS F 4419 (CERTIFICATIONS)" for images, others for table
  const certItems = tableData.filter(item => item.section.includes('CERTIFICATIONS'));
  const specItems = tableData.filter(item => !item.section.includes('CERTIFICATIONS'));

  const nextCert = (e) => {
    e.stopPropagation();
    setCertIndex((prev) => (prev + 1) % (certItems.length || 1));
  };

  const prevCert = (e) => {
    e.stopPropagation();
    setCertIndex((prev) => (prev - 1 + (certItems.length || 1)) % (certItems.length || 1));
  };

  // Improved Mapping for Page 7 Metrics based on Sheet Data
  const getMetricData = (keyword, defaultVal) => {
    const found = data.find(item => 
      (item.section || '').toLowerCase().includes(keyword.toLowerCase()) || 
      (item.subject || '').toLowerCase().includes(keyword.toLowerCase())
    );
    return found ? (found.value || found.subject || defaultVal) : defaultVal;
  };

  const metricsDisplay = [
    { 
      id: 'permeability', 
      value: getMetricData('permeability coefficient', '0.62'), 
      unit: 'mm/sec',
      label: language === 'en' ? 'INITIAL PERMEABILITY' : '초기 투수계수', 
      color: 'from-blue-500/10 to-transparent' 
    },
    { 
      id: 'retain', 
      value: getMetricData('after 2 years', '0.39'), 
      unit: 'mm/sec',
      label: language === 'en' ? '2 YEAR-PERMEABLE PERFORMANCE' : '2년 후 투수 성능', 
      color: 'from-[#00AEEF]/20 to-transparent' 
    },
    { 
      id: 'strength', 
      value: getMetricData('flexural', '5.2'), 
      unit: 'Mpa',
      label: language === 'en' ? 'FLEXURAL STRENGTH' : '휨강도', 
      color: 'from-blue-500/10 to-transparent' 
    }
  ];

  const currentCert = certItems[certIndex] || (certItems.length > 0 ? certItems[0] : { displayLink: '/images/uploaded_media_1773382691515.img', subject: 'KS F 4419' });

  return (
    <section className="w-full py-32 bg-transparent relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        
        <div className="w-full text-center mt-12 mb-20 px-4 relative z-20">
           <div className="w-full flex items-center justify-center mb-8">
             <span className="text-white text-base md:text-lg font-black tracking-[0.4em] uppercase bg-[#00AEEF]/20 px-6 py-3 rounded-full border border-[#00AEEF]/40 shadow-[0_0_15px_rgba(0,174,239,0.3)]">
               {language === 'en' ? 'TECHNICAL DATA' : '기술 데이터'}
             </span>
           </div>
           
           <h2 className={`text-4xl md:text-6xl font-black text-white tracking-tighter ${language === 'en' ? 'uppercase leading-[1.1]' : 'break-keep'}`}>
             {language === 'en' ? <>UNRIVALED<br/>PERFORMANCE METRICS</> : <>독보적인<br/>성능 지표</>}
           </h2>
           <p className={`text-white mt-8 max-w-2xl mx-auto font-black text-xl md:text-2xl ${language === 'kr' ? 'break-keep' : ''} leading-relaxed drop-shadow-md`}>
             {language === 'en' ? 'Data-driven reliability for international infrastructure leaders.' : 
               <>국가공인시험기관 검증 완료. B2B/B2G 현장에 최적화된,<br />압도적 강도와 투수유지성능을 제공합니다</>
             }
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {metricsDisplay.map((metric) => (
            <div 
              key={metric.id}
              className="relative group min-h-[380px] flex flex-col items-center justify-center bg-[#050D1D]/90 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:border-[#00AEEF]/60 hover:-translate-y-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
               <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
               
               <div className="flex flex-col items-center text-center px-8 z-10">
                  <h3 className="text-8xl md:text-9xl font-black text-white tracking-tighter mb-6 flex items-end gap-3 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                    {metric.value}
                    <span className="text-3xl md:text-4xl text-[#00AEEF] font-black pb-4 opacity-100 drop-shadow-md">{metric.unit}</span>
                  </h3>
                  <span className="text-white text-lg md:text-xl font-black tracking-[0.3em] uppercase opacity-100 bg-[#00AEEF]/20 px-4 py-1.5 rounded-sm border border-[#00AEEF]/30 shadow-md">{metric.label}</span>
               </div>
               <div className="absolute bottom-0 left-0 w-full h-[6px] bg-white/5 group-hover:bg-[#00AEEF] transition-colors duration-500" />
            </div>
          ))}
        </div>

        {/* Product Specification & Test Report Table */}
        <div className="w-full mt-24 md:mt-40 max-w-6xl mx-auto bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left: Test Report Visual Slider */}
            <div className="p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-full relative mb-10 group/slider">
                <div 
                  onClick={() => setActivePhotoGallery(currentCert.displayLink)}
                  className="relative w-full aspect-[3/4] bg-black border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#00AEEF]/50 transition-all shadow-2xl group/cert"
                >
                   <img 
                    src={currentCert.displayLink} 
                    alt={currentCert.subject} 
                    className="w-full h-full object-cover opacity-40 mix-blend-luminosity grayscale group-hover/cert:scale-105 transition-transform duration-1000" 
                    onError={(e) => { e.target.src = 'https://picsum.photos/400/600?grayscale'; }} 
                   />
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] group-hover/cert:bg-black/40 transition-all">
                      <CheckCircle2 className="w-14 h-14 text-[#00AEEF] mb-4 drop-shadow-[0_0_20px_rgba(0,174,239,0.5)] group-hover/cert:scale-110 transition-transform" />
                      <span className="text-white font-black tracking-[0.2em] text-xl mb-2 uppercase drop-shadow-md">{currentCert.subject}</span>
                      <span className="text-white text-sm font-black tracking-widest bg-[#00AEEF] text-black px-4 py-1 rounded-full border border-[#00AEEF]/50 shadow-lg">OFFICIALLY CERTIFIED</span>
                   </div>
                </div>

                {/* Slider Controls */}
                {certItems.length > 1 && (
                  <>
                    <button 
                      onClick={prevCert}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-[#00AEEF] hover:text-black transition-all z-30 opacity-0 group-hover/slider:opacity-100"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={nextCert}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-[#00AEEF] hover:text-black transition-all z-30 opacity-0 group-hover/slider:opacity-100"
                    >
                      <ChevronRight size={20} />
                    </button>
                    
                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                      {certItems.map((_, idx) => (
                        <div 
                          key={idx}
                          className={`h-1 rounded-full transition-all duration-300 ${idx === certIndex ? 'w-4 bg-[#00AEEF]' : 'w-1.5 bg-white/20'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <p className="text-white text-4xl md:text-5xl text-center leading-relaxed break-keep font-black mt-10 drop-shadow-2xl">
                {language === 'en' ? 'Officially certified by national testing laboratories exceeding all structural requirements.' : '국가공인시험기관 검증 완료. B2B/B2G 현장에 최적화된 압도적 성능 제공.'}
              </p>
            </div>

            {/* Right: Data Table */}
            <div className="p-4 sm:p-8 flex flex-col justify-center bg-[#050D1D]/40 overflow-hidden">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-2">
                {language === 'en' ? 'PRODUCT SPECIFICATIONS' : '제품 규격 및 강도 데이터'}
              </h3>
              <p className="text-[#00AEEF] text-xs font-black tracking-[0.2em] mb-8 uppercase">
                WATERPASS HIGH-STRENGTH BLOCK
              </p>

              <div className="w-full text-left">
                <table className="w-full table-fixed lg:table-auto">
                  <thead>
                    <tr className="border-b border-white/30 text-white text-base font-black tracking-widest bg-white/5">
                      <th className="py-4 text-left pl-4 w-1/3">{language === 'en' ? 'Application' : '적용 구분'}</th>
                      <th className="py-4 px-2 text-center w-1/4">{language === 'en' ? 'Standard (Mpa)' : 'KS 기준'}</th>
                      <th className="py-4 pr-4 text-[#00AEEF] text-right w-auto">{language === 'en' ? 'WaterPass' : '워터패스 (Mpa)'}</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {(specItems.length > 0 ? specItems : [
                      { section: language === 'en' ? 'Sidewalk (Pedestrian)' : '보도용 (T2)', ks: '> 4.0', formattedValue: '4.6' },
                      { section: language === 'en' ? 'Roadway (Vehicle)' : '차도용 (T3, T4)', ks: '> 5.0', formattedValue: '5.3' },
                      { section: language === 'en' ? 'Heavy Duty (Port/Airport)' : '특수하중 (항만/공항)', ks: '> 5.0', formattedValue: '6.3' }
                    ]).map((row, index) => {
                      // Manual overrides for standard values as per user request
                      let standardVal = row.link || row.value;
                      if (row.section.includes('보도용') || row.section.includes('Pedestrian')) standardVal = '> 4.0';
                      if (row.section.includes('차도용') || row.section.includes('Vehicle')) standardVal = '> 5.0';
                      if (row.section.includes('특수하중') || row.section.includes('Heavy Duty')) standardVal = '> 5.0';

                      return (
                        <tr key={index} className="border-b border-white/10 hover:bg-white/10 transition-colors group">
                          <td className="py-6 font-black tracking-tight text-left text-base sm:text-lg break-keep pr-2">
                            {row.subject && row.subject.toLowerCase() !== 'waterpass' ? row.subject : row.section}
                          </td>
                          <td className="py-6 px-2 text-gray-200 font-black font-mono text-center text-xl sm:text-2xl">{standardVal}</td>
                          <td className="py-6 text-[#00AEEF] font-black font-mono text-2xl sm:text-3xl flex justify-end items-center gap-2 sm:gap-4 pr-2">
                            <span className="whitespace-nowrap">{row.formattedValue || row.description}</span>
                            <span className="text-[10px] sm:text-xs font-black bg-[#00AEEF] text-black px-2 py-1 rounded-sm border border-[#00AEEF]/40 group-hover:scale-110 transition-all shadow-[0_0_15px_rgba(0,174,239,0.4)] flex-shrink-0">PASS</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PhotoGalleryOverlay 
        isOpen={!!activePhotoGallery}
        images={certItems.map(i => i.displayLink).length > 0 ? certItems.map(i => i.displayLink) : [activePhotoGallery]}
        title={language === 'en' ? 'TEST REPORTS' : '국가공인 성적서'}
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
