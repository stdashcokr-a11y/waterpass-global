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
  const [testReportImages, setTestReportImages] = useState(["/images/uploaded_media_1773382691515.img"]);

  const handleReportUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 6); // Up to 6 files per batch
    if (files.length > 0) {
      const readers = files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.readAsDataURL(file);
        });
      });
      const results = await Promise.all(readers);
      
      setTestReportImages(prev => {
        let current = prev;
        // Remove default placeholder on first real upload
        if (current.length === 1 && current[0].includes('uploaded_media_1773382691515.img')) {
          current = [];
        }
        const newImages = [...current, ...results].slice(0, 6); // Keep max 6
        setGalleryImages(newImages);
        return newImages;
      });
      
      setActivePhotoGallery('custom_report');
      alert(language === 'en' ? `${results.length} test reports added!` : `추가로 ${results.length}장의 성적서가 등록되어 갤러리가 갱신되었습니다! (최대 6장)`);
    }
  };

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
    if (activePhotoGallery === 'custom_report') return; // Do not fetch API for custom uploaded reports

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
        
        <div className="w-full text-center mt-12 mb-16 px-4 relative z-20">
           <div className="w-full flex items-center justify-center mb-6">
             <span className="text-[#00AEEF] text-xs font-black tracking-[0.3em] uppercase bg-[#00AEEF]/10 px-4 py-2 rounded-full border border-[#00AEEF]/20">
               {language === 'en' ? 'TECHNICAL DATA' : '기술 데이터'}
             </span>
           </div>
           
           <h2 className={`text-4xl md:text-5xl font-black text-white tracking-tighter ${language === 'en' ? 'uppercase leading-[1.1]' : 'break-keep'}`}>
             {language === 'en' ? <>UNRIVALED<br/>PERFORMANCE METRICS</> : <>독보적인<br/>성능 지표</>}
           </h2>
           <p className={`text-gray-400 mt-6 max-w-lg mx-auto font-light text-sm sm:text-base ${language === 'kr' ? 'break-keep' : ''}`}>
             {language === 'en' ? 'Data-driven reliability for international infrastructure leaders.' : '국가공인시험기관 검증 완료. B2B/B2G 현장에 최적화된 압도적 강도와 투수성을 제공합니다.'}
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

        {/* Product Specification & Test Report Table */}
        <div className="w-full mt-24 md:mt-32 max-w-6xl mx-auto bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left: Test Report Visual */}
            <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <label className="w-full h-64 md:h-80 relative bg-black border border-white/5 rounded-xl flex items-center justify-center mb-8 overflow-hidden cursor-pointer hover:border-[#00AEEF]/50 transition-colors shadow-2xl group/upload">
                 <input type="file" accept="image/jpeg, image/png" multiple className="hidden" onChange={handleReportUpload} />
                 <img src={testReportImages[0]} alt="Test Report" className="w-full h-full object-cover opacity-50 mix-blend-luminosity grayscale group-hover/upload:scale-105 transition-transform duration-700" onError={(e) => { e.target.src = 'https://picsum.photos/400/600?grayscale'; }} />
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm group-hover/upload:bg-black/40 transition-all">
                   <CheckCircle2 className="w-16 h-16 text-[#00AEEF] mb-4 drop-shadow-[0_0_15px_rgba(0,174,239,0.5)] group-hover/upload:scale-110 transition-transform" />
                   <span className="text-white font-black tracking-widest text-xl mb-1">KS F 4419</span>
                   <span className="text-[#00AEEF] text-xs font-bold tracking-widest bg-[#00AEEF]/10 px-3 py-1 rounded-full border border-[#00AEEF]/30 mb-2">OFFICIALLY CERTIFIED</span>
                   {testReportImages.length > 1 && (
                     <span className="text-white font-bold text-xs bg-blue-500/20 px-2 py-1 rounded mt-1 border border-blue-400/30">
                       {testReportImages.length} PAGES INCLUDED
                     </span>
                   )}
                   <span className="text-white/80 opacity-0 group-hover/upload:opacity-100 transition-opacity text-[10px] mt-2 font-bold tracking-wider bg-black/50 px-2 py-1 rounded">
                     {language === 'en' ? 'CLICK TO UPLOAD UP TO 6 REPORTS' : '클릭하여 최대 6장 시험성적서 업로드'}
                   </span>
                 </div>
              </label>
              <p className="text-gray-400 text-sm md:text-base text-center leading-relaxed break-keep">
                {language === 'en' ? 'Officially certified by national testing laboratories exceeding all structural requirements.' : '국가공인시험기관(KCL) 성능 검증 완료. 모든 법적 기준을 상회하는 압도적 결과.'}
              </p>
            </div>

            {/* Right: Data Table */}
            <div className="p-8 md:p-12 flex flex-col justify-center bg-[#050D1D]/30">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-2">
                {language === 'en' ? 'PRODUCT SPECIFICATIONS' : '제품 규격 및 강도 데이터'}
              </h3>
              <p className="text-[#00AEEF] text-xs sm:text-sm font-bold tracking-widest mb-10">
                WATERPASS HIGH-STRENGTH BLOCK
              </p>

              <div className="w-full text-left overflow-x-auto">
                <table className="w-full text-sm sm:text-base">
                  <thead>
                    <tr className="border-b border-white/20 text-gray-400 text-xs">
                      <th className="py-4 font-medium uppercase tracking-wider text-left">{language === 'en' ? 'Application' : '적용 구분'}</th>
                      <th className="py-4 px-2 font-medium uppercase tracking-wider text-center">{language === 'en' ? 'Standard (MPa)' : 'KS 기준'}</th>
                      <th className="py-4 font-medium text-[#00AEEF] uppercase tracking-wider text-right">{language === 'en' ? 'WaterPass' : '워터패스 (MPa)'}</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="py-5 font-bold tracking-wide text-left">{language === 'en' ? 'Sidewalk (Pedestrian)' : '보도용 (T2)'}</td>
                      <td className="py-5 px-2 text-gray-500 font-mono text-center">4.0</td>
                      <td className="py-5 text-[#00AEEF] font-black font-mono text-lg flex justify-end items-center gap-3">
                        4.5+ 
                        <span className="text-[9px] bg-[#00AEEF]/20 text-[#00AEEF] px-2 py-0.5 rounded-sm border border-[#00AEEF]/30 group-hover:bg-[#00AEEF] group-hover:text-black transition-colors">PASS</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="py-5 font-bold tracking-wide text-left">{language === 'en' ? 'Roadway (Vehicle)' : '차도용 (T3, T4)'}</td>
                      <td className="py-5 px-2 text-gray-500 font-mono text-center">5.0</td>
                      <td className="py-5 text-[#00AEEF] font-black font-mono text-lg flex justify-end items-center gap-3">
                        5.5+ 
                        <span className="text-[9px] bg-[#00AEEF]/20 text-[#00AEEF] px-2 py-0.5 rounded-sm border border-[#00AEEF]/30 group-hover:bg-[#00AEEF] group-hover:text-black transition-colors">PASS</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors group">
                      <td className="py-5 font-bold tracking-wide text-left">{language === 'en' ? 'Heavy Duty (Port/Airport)' : '특수하중 (항만/공항)'}</td>
                      <td className="py-5 px-2 text-gray-500 font-mono text-center">6.0</td>
                      <td className="py-5 text-[#00AEEF] font-black font-mono text-lg flex justify-end items-center gap-3">
                        7.0+ 
                        <span className="text-[9px] bg-[#00AEEF]/20 text-[#00AEEF] px-2 py-0.5 rounded-sm border border-[#00AEEF]/30 group-hover:bg-[#00AEEF] group-hover:text-black transition-colors">PASS</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
