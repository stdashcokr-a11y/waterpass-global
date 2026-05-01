"use client";

import React from 'react';
import { Play, Download, ExternalLink, Info } from 'lucide-react';

/**
 * Standardized Content Card for WaterPass Global
 * Features: Fixed height for layout stability, responsive grid compatibility, and touch-friendly CTA.
 */
export default function ContentCard({ item, onPlay, onGallery }) {
  if (!item) return null;

  const { subject, description, type, displayLink, link } = item;

  const handleAction = () => {
    if (type === 'video') {
      onPlay(displayLink);
    } else if (type === 'download' || type === 'image') {
      onGallery();
    } else if (type === 'link') {
      window.open(link, '_blank');
    }
  };

  return (
    <div className="group relative bg-[#051125] border border-white/5 rounded-2xl p-6 flex flex-col h-full min-h-[400px] hover:border-[#00AEEF]/50 transition-all duration-400 overflow-visible shadow-xl">
      
      {/* Icon/Type Indicator */}
      <div className="mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#00AEEF]/10 flex items-center justify-center text-[#00AEEF]">
          {type === 'video' ? <Play size={24} fill="currentColor" /> : 
           type === 'download' ? <Download size={24} /> : 
           type === 'image' ? <ExternalLink size={24} /> : <Info size={24} />}
        </div>
      </div>

      {/* Text Content */}
      <div className="flex-1">
        <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight mb-3 line-clamp-3 min-h-[3.6em] leading-tight break-words break-keep">
          {subject}
        </h3>
        <p className="text-white font-medium text-xl md:text-2xl leading-relaxed line-clamp-4 break-keep drop-shadow-sm">
          {description}
        </p>
      </div>

      {/* CTA Button - Standardized for Mobile/Desktop */}
      <div className="mt-8">
        <button 
          onClick={handleAction}
          className={`w-full py-4 px-6 rounded-xl font-black text-lg tracking-widest uppercase transition-all flex items-center justify-center gap-3 ${
            type === 'video' ? 'bg-[#00AEEF] text-black hover:scale-[1.02] shadow-[0_5px_20px_rgba(0,174,239,0.3)]' : 
            'bg-white/10 text-white border border-white/20 hover:bg-white/20'
          }`}
        >
          {type === 'video' ? (
            <><Play size={20} fill="currentColor" /> Watch Video</>
          ) : type === 'download' ? (
            <><Download size={20} /> EXAMPLE OF CONSTRUCTION</>
          ) : (
            <><ExternalLink size={20} /> EXAMPLE OF CONSTRUCTION</>
          )}
        </button>
      </div>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
    </div>
  );
}
