"use client";

import React from 'react';
import { Camera } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function IndustrialCard({ section, onOpenGallery }) {
  const { language } = useLanguage();
  return (
    <div className="relative group bg-[#051125] border border-white/5 rounded-2xl p-8 hover:border-[#00AEEF] hover:-translate-y-2 transition-all duration-400 overflow-visible flex flex-col h-full shadow-lg">
      
      {/* Top Right Interaction Button - Photo Gallery Trigger */}
      <button 
        onClick={onOpenGallery}
        className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all duration-300 shadow-xl bg-black border border-white/10 text-white hover:bg-[#00AEEF] hover:text-black hover:scale-110"
        aria-label="View On-site photos"
      >
        <Camera size={16} />
      </button>

      {/* Card Content - Matching the provided screenshot design */}
      <div className="flex-1 mt-2">
        <h3 className={`text-xl md:text-2xl font-black ${language === 'en' ? 'uppercase' : 'break-keep'} tracking-tight mb-10 text-[#00AEEF]`}>
          {section.title}
        </h3>
        
        <ul className="space-y-6 text-gray-400 font-light text-sm">
          {section.specs.map((spec, index) => (
            <li key={index} className="flex item-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
              <span className="opacity-90">{spec}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Glassmorphism Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
    </div>
  );
}
