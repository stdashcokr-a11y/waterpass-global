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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Cinematic Glassmorphism */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* NEW: Close Button moved COMPLETELY OUTSIDE for maximum visibility and to avoid container clipping */}
      <button
        onClick={onClose}
        style={{ 
          position: 'fixed', 
          right: '5vw', 
          top: '5vh', 
          zIndex: 1000001, 
          backgroundColor: '#ff0000', 
          color: 'white',
          padding: '15px',
          borderRadius: '50%',
          border: '4px solid white',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        title="Close Gallery"
      >
        <X size={40} strokeWidth={4} />
      </button>

      {/* Modal Gallery Container */}
      <div className="relative w-full max-w-[95vw] h-[90vh] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,174,239,0.3)] animate-in zoom-in-95 duration-400 border border-[rgba(255,255,255,0.1)] bg-[#050E21] flex flex-col">
        
        {/* Header Ribbon */}
        <div className="flex justify-between items-center p-6 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.5)] relative z-50">
          <div className="flex items-center gap-3">
            {viewMode === 'grid' ? <Grid className="text-[#00AEEF] w-6 h-6" /> : <Images className="text-[#00AEEF] w-6 h-6" />}
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white">
              {title} <span className="text-gray-500 text-sm md:text-lg ml-2 font-normal">{viewMode === 'grid' ? 'On-site Photos' : 'Detail View'}</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {viewMode === 'detail' && (
              <button
                onClick={() => setViewMode('grid')}
                className="flex items-center gap-2 px-4 py-1.5 bg-white/10 hover:bg-[#00AEEF] hover:text-black rounded-full text-xs font-bold transition-all border border-white/10"
              >
                <Grid size={14} /> BACK TO GRID
              </button>
            )}
            {/* Old button location - now empty to avoid duplication */}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative bg-black/20 overflow-hidden">

          {/* 1. Grid Mode */}
          {viewMode === 'grid' && (
            <div className="w-full h-full overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {images.map((src, index) => (
                  <div
                    key={index}
                    onClick={() => selectImage(index)}
                    className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-[#00AEEF] transition-all duration-300"
                  >
                    <img
                      src={src}
                      alt={`${title} Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-black tracking-widest bg-[#00AEEF]/80 px-4 py-2 rounded-full">ENLARGE PHOTO</span>
                    </div>
                  </div>
                ))}
                {images.length === 0 && <div className="text-gray-500 italic">No images available for this section.</div>}
              </div>
            </div>
          )}

          {/* 2. Detail Mode (Slider) */}
          {viewMode === 'detail' && (
            <div className="w-full h-full flex flex-col items-center justify-center relative group p-0">

              <div className="relative w-full h-full flex items-center justify-center p-0">
                <img
                  src={images[currentIndex]}
                  alt={`${title} Detail ${currentIndex + 1}`}
                  className="w-full h-full object-contain shadow-2xl animate-in zoom-in-95 duration-500"
                />
              </div>

              {/* Navigation Controls */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-black/40 text-white border border-white/10 hover:bg-[#00AEEF] hover:text-black hover:scale-110 transition-all z-30 backdrop-blur-md"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-black/40 text-white border border-white/10 hover:bg-[#00AEEF] hover:text-black hover:scale-110 transition-all z-30 backdrop-blur-md"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}

              {/* Indicator (Bottom) */}
              <div className="absolute bottom-6 flex items-center gap-6 z-40">
                <div className="flex gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-2 md:w-8 h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#00AEEF] w-4 md:w-12' : 'bg-white/20 hover:bg-white/40'
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
