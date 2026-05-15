"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Images, ChevronLeft, ChevronRight, Grid } from 'lucide-react';

export default function PhotoGalleryOverlay({ isOpen, images = [], title, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'detail'
  const [mounted, setMounted] = useState(false);

  // Handle mounting state for Portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevent body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setViewMode('grid'); // Default to grid view when opening
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
    setViewMode('detail');
  };

  const overlayContent = (
    <div className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/95 backdrop-blur-3xl" style={{ isolation: 'isolate' }}>
      {/* Clickable background to close */}
      <div className="absolute inset-0 z-0" onClick={onClose} />

      {/* 🔴 FINAL FORCED SUPPRESSION: Close Button visible on all versions */}
      <button
        onClick={onClose}
        style={{ 
          position: 'fixed',
          top: '120px',         /* 헤더 아래로 확실히 내림 */
          right: '30px',
          width: '64px',
          height: '64px',
          backgroundColor: '#FF0000', /* 강렬한 생빨강 */
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999,      /* 최상단 레이어 */
          border: '4px solid white',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
      >
        <X size={40} color="white" strokeWidth={4} />
      </button>

      {/* Modal Gallery Container - Reduced size for maximum "Safe Zone" */}
      <div className="relative z-10 w-[85vw] h-[80vh] rounded-[3rem] overflow-hidden shadow-[0_0_200px_rgba(0,174,239,0.5)] border border-white/20 bg-[#050E21] flex flex-col">
        
        {/* Header Ribbon */}
        <div className="flex justify-between items-center p-10 border-b border-white/10 bg-black/60 relative z-50">
          <div className="flex items-center gap-5">
            {viewMode === 'grid' ? <Grid className="text-[#00AEEF] w-10 h-10" /> : <Images className="text-[#00AEEF] w-10 h-10" />}
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              {title} <span className="text-blue-400/50 text-sm md:text-2xl ml-4 font-medium tracking-normal">{viewMode === 'grid' ? 'Photo Archive' : 'Enlarged View'}</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
             {viewMode === 'detail' && (
                <button 
                  onClick={() => setViewMode('grid')}
                  className="flex items-center gap-4 px-8 py-3.5 bg-white/10 hover:bg-[#00AEEF] hover:text-black rounded-full text-lg font-black transition-all border border-white/20"
                >
                  <Grid size={22} /> BACK TO GRID
                </button>
             )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative bg-black/40 overflow-hidden">
          
          {/* 1. Grid Mode */}
          {viewMode === 'grid' && (
            <div className="w-full h-full overflow-y-auto p-12 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 animate-in fade-in slide-in-from-bottom-12 duration-700">
                {images.map((src, index) => (
                  <div 
                    key={index}
                    onClick={() => selectImage(index)}
                    className="group relative aspect-video rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#00AEEF] transition-all duration-500 shadow-2xl"
                  >
                    <img 
                      src={src} 
                      alt={`${title} Image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-md">
                       <span className="text-white text-base font-black tracking-widest bg-[#00AEEF] px-8 py-4 rounded-full shadow-2xl">VIEW PHOTO</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Detail Mode (Slider) */}
          {viewMode === 'detail' && (
            <div className="w-full h-full flex flex-col items-center justify-center relative p-10">
              
              <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src={images[currentIndex]} 
                  alt={`${title} Detail ${currentIndex + 1}`}
                  className="max-w-full max-h-full object-contain shadow-[0_0_100px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-500 rounded-2xl"
                />
              </div>

              {/* Navigation Controls */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-10 top-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-black/70 text-white border border-white/10 hover:bg-[#00AEEF] hover:text-black hover:scale-110 transition-all z-30 backdrop-blur-2xl shadow-2xl"
                  >
                    <ChevronLeft size={50} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-10 top-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-black/70 text-white border border-white/10 hover:bg-[#00AEEF] hover:text-black hover:scale-110 transition-all z-30 backdrop-blur-2xl shadow-2xl"
                  >
                    <ChevronRight size={50} />
                  </button>
                </>
              )}

              {/* Indicator (Bottom) */}
              <div className="absolute bottom-12 flex items-center gap-8 z-40 bg-black/60 px-10 py-5 rounded-full backdrop-blur-2xl border border-white/10">
                 <div className="flex gap-4">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-4 h-4 rounded-full transition-all duration-500 ${
                          idx === currentIndex ? 'bg-[#00AEEF] scale-[2]' : 'bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(overlayContent, document.body);
}
