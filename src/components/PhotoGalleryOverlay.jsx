"use client";

import React, { useState, useEffect } from 'react';
import { X, Images, ChevronLeft, ChevronRight, Grid } from 'lucide-react';

export default function PhotoGalleryOverlay({ isOpen, images = [], title, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'detail'

  // Prevent body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setViewMode('grid'); // Default to grid view when opening
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-[100000000] flex items-center justify-center bg-black/95 backdrop-blur-3xl">
      {/* Clickable background to close */}
      <div className="absolute inset-0 z-[100000001]" onClick={onClose} />

      {/* 🔴 ULTIMATE HIGH-VISIBILITY CLOSE BUTTON - Positioned absolutely to viewport */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          zIndex: 100000005,
          backgroundColor: '#ff0000',
          color: '#ffffff',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '5px solid #ffffff',
          boxShadow: '0 0 60px rgba(255,0,0,0.7), 0 20px 40px rgba(0,0,0,0.9)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.2) rotate(90deg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
        }}
        title="CLOSE GALLERY"
      >
        <X size={50} strokeWidth={4} />
      </button>

      {/* Modal Gallery Container - Reduced size for maximum "Safe Zone" */}
      <div className="relative z-[100000002] w-[80vw] h-[75vh] rounded-[2.5rem] overflow-hidden shadow-[0_0_150px_rgba(0,174,239,0.4)] border border-white/20 bg-[#050E21] flex flex-col">
        
        {/* Header Ribbon */}
        <div className="flex justify-between items-center p-8 border-b border-white/10 bg-black/40 relative z-50">
          <div className="flex items-center gap-4">
            {viewMode === 'grid' ? <Grid className="text-[#00AEEF] w-8 h-8" /> : <Images className="text-[#00AEEF] w-8 h-8" />}
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
              {title} <span className="text-blue-400/50 text-sm md:text-xl ml-3 font-medium tracking-normal">{viewMode === 'grid' ? 'Photo Archive' : 'Enlarged View'}</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
             {viewMode === 'detail' && (
                <button 
                  onClick={() => setViewMode('grid')}
                  className="flex items-center gap-3 px-6 py-2.5 bg-white/10 hover:bg-[#00AEEF] hover:text-black rounded-full text-sm font-black transition-all border border-white/20"
                >
                  <Grid size={18} /> BACK TO GRID
                </button>
             )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative bg-black/40 overflow-hidden">
          
          {/* 1. Grid Mode */}
          {viewMode === 'grid' && (
            <div className="w-full h-full overflow-y-auto p-10 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {images.map((src, index) => (
                  <div 
                    key={index}
                    onClick={() => selectImage(index)}
                    className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#00AEEF] transition-all duration-500 shadow-lg"
                  >
                    <img 
                      src={src} 
                      alt={`${title} Image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                       <span className="text-white text-sm font-black tracking-widest bg-[#00AEEF] px-6 py-3 rounded-full shadow-xl">VIEW PHOTO</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Detail Mode (Slider) */}
          {viewMode === 'detail' && (
            <div className="w-full h-full flex flex-col items-center justify-center relative p-4">
              
              <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src={images[currentIndex]} 
                  alt={`${title} Detail ${currentIndex + 1}`}
                  className="max-w-full max-h-full object-contain shadow-[0_0_80px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-500 rounded-lg"
                />
              </div>

              {/* Navigation Controls */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-black/60 text-white border border-white/10 hover:bg-[#00AEEF] hover:text-black hover:scale-110 transition-all z-30 backdrop-blur-xl shadow-2xl"
                  >
                    <ChevronLeft size={40} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-black/60 text-white border border-white/10 hover:bg-[#00AEEF] hover:text-black hover:scale-110 transition-all z-30 backdrop-blur-xl shadow-2xl"
                  >
                    <ChevronRight size={40} />
                  </button>
                </>
              )}

              {/* Indicator (Bottom) */}
              <div className="absolute bottom-10 flex items-center gap-6 z-40 bg-black/40 px-6 py-3 rounded-full backdrop-blur-md border border-white/10">
                 <div className="flex gap-3">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-500 ${
                          idx === currentIndex ? 'bg-[#00AEEF] scale-150' : 'bg-white/20 hover:bg-white/40'
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
}
