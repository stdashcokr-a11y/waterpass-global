"use client";

import React, { useEffect } from 'react';
import { X, Images } from 'lucide-react';

export default function PhotoGalleryOverlay({ isOpen, images, title, onClose }) {
  // Prevent body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Cinematic Glassmorphism */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Gallery Container */}
      <div className="relative w-full max-w-7xl h-[85vh] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,174,239,0.15)] animate-in zoom-in-95 duration-400 border border-[rgba(255,255,255,0.1)] bg-[#050E21] flex flex-col">
        
        {/* Header Ribbon */}
        <div className="flex justify-between items-center p-6 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <Images className="text-[#00AEEF] w-6 h-6" />
            <h2 className="text-2xl font-black uppercase tracking-wider text-white">
              {title} <span className="text-gray-500 text-lg ml-2 font-normal">On-site Photos</span>
            </h2>
          </div>
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="p-2 bg-black/50 hover:bg-red-500 hover:text-white rounded-full transition-all duration-300 border border-[rgba(255,255,255,0.2)] hover:border-transparent"
            title="Close Gallery"
          >
            <X size={20} />
          </button>
        </div>

        {/* CSS Grid for Images */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {/* Dynamic Grid: If 6 or fewer images, use 2-3 columns with larger aspect ratio. Otherwise, 2-4 columns. */}
          <div className={`grid gap-6 ${
            images.length <= 6 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[300px]' 
              : 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}>
            {images.map((src, index) => (
              <div 
                key={index}
                className={`group relative rounded-xl overflow-hidden bg-gray-900 border border-[rgba(255,255,255,0.05)] ${
                  images.length <= 6 ? 'h-full w-full' : 'aspect-[4/3]'
                }`}
              >
                {/* Image Element */}
                <img 
                  src={src} 
                  alt={`${title} Photo ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium tracking-wide">
                    Photo {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
