"use client";

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function VideoOverlay({ videoId, onClose }) {
  // Prevent body scroll when modal is active
  useEffect(() => {
    if (videoId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [videoId]);

  if (!videoId) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Cinematic Glassmorphism (Prompt 3) */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Video Container */}
      <div className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,174,239,0.2)] animate-in zoom-in-95 duration-400 border border-[rgba(255,255,255,0.1)] bg-black">
        
        {/* Essential UI: Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 bg-black/50 hover:bg-[#00AEEF] hover:text-black hover:scale-110 text-white rounded-full transition-all duration-300 backdrop-blur-md border border-[rgba(255,255,255,0.2)]"
          title="Close Video"
        >
          <X size={24} />
        </button>

        {/* Iframe Implementation with essential controls (Prompt 3) */}
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
          title="WaterPass Infrastructure Cinematic Playback"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
