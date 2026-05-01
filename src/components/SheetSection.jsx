"use client";

import React, { useState } from 'react';
import { Play, Image as ImageIcon, ExternalLink, Download } from 'lucide-react';
import VideoModal from './VideoModal';
import PhotoGalleryOverlay from './PhotoGalleryOverlay';
import ContentCard from './ContentCard';

/**
 * SheetSection Component
 * Renders a group of content items from Google Sheets with unified layout.
 */
export default function SheetSection({ subject, items, onPlay }) {
  const [activeGallery, setActiveGallery] = useState(null);

  if (!items || items.length === 0) return null;

  const galleryImages = items
    .filter(item => item.type === 'image' || item.type === 'download')
    .map(item => item.displayLink || item.link)
    .filter(Boolean);

  return (
    <div className="w-full mt-16 first:mt-0 pt-12 relative z-30">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="mb-12 text-left border-l-4 border-[#00AEEF] pl-6">
          <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tighter uppercase leading-none">
            {subject}
          </h3>
          <div className="h-1 w-32 bg-gradient-to-r from-[#00AEEF] to-transparent mt-3 opacity-50" />
        </div>

        {/* Content Grid - Standardized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <ContentCard 
              key={`${item.subject}-${index}`}
              item={item}
              onPlay={onPlay}
              onGallery={() => setActiveGallery(true)}
            />
          ))}
        </div>
      </div>

      <PhotoGalleryOverlay 
        isOpen={!!activeGallery}
        images={galleryImages}
        title={subject}
        onClose={() => setActiveGallery(null)}
      />
    </div>
  );
}
