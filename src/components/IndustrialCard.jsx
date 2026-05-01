"use client";

import React from 'react';
import { Camera, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Standardized Industrial Card for WaterPass Global
 * Features: Fixed height, consistent typography, and touch-friendly gallery trigger.
 */
export default function IndustrialCard({ section, onOpenGallery }) {
  const { language } = useLanguage();
  
  return (
    <div className="relative group bg-[#051125] border border-white/5 rounded-2xl p-8 hover:border-[#00AEEF] transition-all duration-400 overflow-visible flex flex-col h-full min-h-[420px] shadow-lg">
      
      {/* Photo Gallery Trigger - Premium Styling */}
      <button 
        onClick={onOpenGallery}
        className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center z-20 transition-all duration-300 shadow-xl bg-black border border-white/10 text-white hover:bg-[#00AEEF] hover:text-black hover:scale-110 active:scale-95"
        aria-label="View On-site photos"
      >
        <Camera size={18} />
      </button>

      {/* Card Content */}
      <div className="flex-1 mt-2">
        <h3 className={`text-xl md:text-2xl font-black ${language === 'en' ? 'uppercase' : 'break-keep'} tracking-tight mb-8 text-[#00AEEF] border-b border-[#00AEEF]/20 pb-4`}>
          {section.title}
        </h3>
        
        <ul className="space-y-5">
          {section.specs.map((spec, index) => (
            <li key={index} className="flex items-start gap-3 text-white font-medium text-base sm:text-lg leading-snug drop-shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] mt-2 flex-shrink-0 shadow-[0_0_8px_#00AEEF]" />
              <span className="opacity-100">{spec}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* View Gallery CTA - Standardized for Mobile */}
      <div className="mt-10">
        <button 
          onClick={onOpenGallery}
          className="w-full py-4 border border-white/20 rounded-xl text-sm font-black tracking-[0.2em] uppercase hover:bg-white/10 transition-colors flex items-center justify-center gap-2 group/btn text-white"
        >
          {language === 'en' ? 'VIEW ON-SITE GALLERY' : '현장 시공 갤러리 보기'}
          <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
      
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
    </div>
  );
}
