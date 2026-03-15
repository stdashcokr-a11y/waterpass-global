"use client";

import React, { useState } from 'react';
import { X, PlayCircle } from 'lucide-react';

export default function VideoGalleryOverlay({ isOpen, videos, title, onClose }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setSelectedVideo(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Dynamic Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl transition-opacity animate-in fade-in duration-500"
        onClick={handleClose}
      />
      
      <div className="relative w-full max-w-6xl z-10 flex flex-col gap-6 animate-in zoom-in-95 duration-300">
        {/* Header Area */}
        <div className="flex justify-between items-center bg-white/5 border border-white/10 px-8 py-5 rounded-2xl backdrop-blur-md">
          <div>
            <span className="text-[#00AEEF] text-xs font-black tracking-widest uppercase mb-1 block">VIDEO GALLERY</span>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{title}</h2>
          </div>
          <button 
            onClick={handleClose}
            className="p-3 bg-white/5 hover:bg-white/20 rounded-full text-white transition-all hover:rotate-90"
          >
            <X size={28} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
          {/* Main Video Player Area (Left 2/3) */}
          <div className="lg:col-span-2 bg-black rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative">
            {selectedVideo ? (
               <iframe
                 className="w-full h-full"
                 src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                 title={selectedVideo.title}
                 frameBorder="0"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                 allowFullScreen
               />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-[#00AEEF]/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <PlayCircle className="text-[#00AEEF] w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">영상을 선택해 주세요</h3>
                <p className="text-gray-500 max-w-sm">WaterPass 기술력을 직접 눈으로 확인하실 수 있는 고화질 현장 영상 목록입니다.</p>
              </div>
            )}
          </div>

          {/* Video List Sidebar (Right 1/3) */}
          <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className={`group flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 text-left ${
                  selectedVideo?.id === video.id 
                    ? 'bg-[#00AEEF] border-[#00AEEF] shadow-[0_0_20px_rgba(0,174,239,0.3)]' 
                    : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                <div className="relative flex-shrink-0 w-24 aspect-video rounded-lg overflow-hidden bg-gray-800 border border-white/10">
                   <img 
                     src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                     alt={video.title}
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                     <PlayCircle className={`w-6 h-6 ${selectedVideo?.id === video.id ? 'text-black' : 'text-white'}`} />
                   </div>
                </div>
                <div className="flex flex-col">
                  <h4 className={`font-bold leading-tight line-clamp-2 ${selectedVideo?.id === video.id ? 'text-black' : 'text-white'}`}>
                    {video.title}
                  </h4>
                  <span className={`text-[10px] mt-1 font-medium ${selectedVideo?.id === video.id ? 'text-black/70' : 'text-gray-500'}`}>
                    HD QUALITY
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
