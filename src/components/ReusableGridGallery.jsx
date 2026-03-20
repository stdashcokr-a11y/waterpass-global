"use client";

import React, { useState } from 'react';
import { Play, Image as ImageIcon, UploadCloud } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import VideoModal from './VideoModal';
import PhotoGalleryOverlay from './PhotoGalleryOverlay';

export default function ReusableGridGallery({ sectionId, title }) {
  const { language } = useLanguage();
  const [activeVideo, setActiveVideo] = useState(null);
  const [activePhoto, setActivePhoto] = useState(null);

  // 12 slots (more than 10) to form a nice grid
  const items = Array.from({ length: 12 }).map((_, i) => ({
    id: `${sectionId}-item-${i}`,
    type: i % 3 === 0 ? 'video' : 'photo',
    title: language === 'en' ? `${title} Media ${i+1}` : `${title} 관련 자료 ${i+1}`,
    thumbnail: `https://picsum.photos/seed/${sectionId}${i}/400/300`,
    videoId: i % 3 === 0 ? 'dQw4w9WgXcQ' : null // generic placeholder video
  }));

  const handleUploadClick = () => {
    alert(language === 'en' ? 'Upload API connection required.' : '유튜브 연동 및 사진 업로드 대화창 (API 연동 대기중)');
  };

  return (
    <div className="w-full mt-24 border-t border-white/10 pt-16 relative z-30">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase">
              {title} {language === 'en' ? 'GALLERY & MEDIA' : '멀티미디어 갤러리'}
            </h3>
            <p className="text-gray-400 font-light text-xs sm:text-sm mt-1">
              {language === 'en' ? 'Explore high-resolution media and operational videos.' : '해당 섹션의 시공 영상(YouTube) 및 고해상도 현장 사진을 확인하세요.'}
            </p>
          </div>
          
          <button 
            onClick={handleUploadClick}
            className="flex items-center gap-2 bg-[#00AEEF]/10 hover:bg-[#00AEEF] text-[#00AEEF] hover:text-black px-4 sm:px-6 py-2 sm:py-3 rounded-sm font-bold text-[10px] sm:text-xs tracking-widest transition-colors border border-[#00AEEF]/50 flex-shrink-0"
          >
            <UploadCloud size={16} />
            {language === 'en' ? 'UPLOAD MEDIA' : '미디어 업로드'}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {items.map((item) => (
            <div 
              key={item.id}
              onClick={() => item.type === 'video' ? setActiveVideo(item.videoId) : setActivePhoto(item.id)}
              className="relative aspect-video sm:aspect-square bg-[#050D1D] rounded-md overflow-hidden cursor-pointer group border border-white/5 hover:border-[#00AEEF]/50 transition-all duration-300 shadow-lg hover:shadow-[0_10px_20px_rgba(0,174,239,0.2)]"
            >
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#00AEEF] group-hover:text-black group-hover:border-[#00AEEF] transition-colors">
                {item.type === 'video' ? <Play size={10} className="ml-0.5 sm:ml-1 sm:w-3 sm:h-3" fill="currentColor" /> : <ImageIcon size={10} className="sm:w-3 sm:h-3" />}
              </div>

              <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
                <p className="text-white text-[9px] sm:text-[10px] font-bold truncate tracking-wide">{item.title}</p>
                <p className="text-[#00AEEF] text-[7px] sm:text-[8px] uppercase tracking-widest mt-0.5 font-bold">{item.type}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <VideoModal 
        videoId={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
      
      <PhotoGalleryOverlay 
        isOpen={!!activePhoto}
        images={[items.find(i => i.id === activePhoto)?.thumbnail || '']}
        title={items.find(i => i.id === activePhoto)?.title || ''}
        onClose={() => setActivePhoto(null)}
      />
    </div>
  );
}
