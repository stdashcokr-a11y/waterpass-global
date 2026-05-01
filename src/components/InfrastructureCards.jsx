"use client";

import React from 'react';
import ContentCard from './ContentCard';
import { useLanguage } from '@/context/LanguageContext';

export default function InfrastructureCards({ onPlay, data = [] }) {
  const { language } = useLanguage();

  // If no data from sheet, we show a fallback or nothing
  // Show up to 6 items as requested
  const displayItems = data.length > 0 ? data.slice(0, 6) : [];

  if (displayItems.length === 0) return null;

  return (
    <div className="z-10 container mx-auto px-4 max-w-7xl py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-stretch">
        {displayItems.map((item, idx) => (
          <ContentCard 
            key={`infra-${idx}`}
            item={item}
            onPlay={onPlay}
          />
        ))}
      </div>
    </div>
  );
}
