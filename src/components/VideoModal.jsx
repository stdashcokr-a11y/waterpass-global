"use client";

import React from 'react';
import { X } from 'lucide-react';

export default function VideoModal({ videoId, onClose }) {
  if (!videoId) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with Glassmorphism */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl aspect-video glass-card rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white hover:text-black rounded-full transition-all"
        >
          <X size={24} />
        </button>

        {/* Youtube Iframe */}
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title="WaterPass Infrastructure Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
