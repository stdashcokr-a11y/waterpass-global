"use client";

import React, { useState } from 'react';
import { Play, Image as ImageIcon } from 'lucide-react';
import VideoModal from './VideoModal';
import PhotoGalleryOverlay from './PhotoGalleryOverlay';

/**
 * SheetSection Component
 * Renders a group of media items from a specific Google Sheet Subject.
 * Created by Kodari Manager
 */
export default function SheetSection({ subject, items }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activePhoto, setActivePhoto] = useState(null);

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full mt-16 first:mt-0 pt-12 relative z-30">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="mb-8 text-left border-l-4 border-[#00AEEF] pl-4">
          <h3 className="text-xl sm:text-3xl font-black text-white tracking-tighter uppercase leading-none">
            {subject}
          </h3>
          <div className="h-1 w-24 bg-gradient-to-r from-[#00AEEF] to-transparent mt-2 opacity-50" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item, index) => (
            <div 
              key={`${item.subject}-${index}`}
              onClick={() => item.type === 'video' ? setActiveVideo(item.displayLink) : setActivePhoto(item)}
              className="relative aspect-video bg-[#050D1D] rounded-md overflow-hidden cursor-pointer group border border-white/5 hover:border-[#00AEEF]/50 transition-all duration-300 shadow-lg"
            >
              {/* Thumbnail Logic */}
              <div className="absolute inset-0 bg-[#0A1F44]">
                {item.type === 'photo' ? (
                  <img 
                    src={item.displayLink} 
                    alt={item.description || item.subject}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://picsum.photos/seed/wp/400/300?blur=5';
                    }}
                  />
                ) : (
                  <img 
                    src={`https://img.youtube.com/vi/${item.displayLink}/hqdefault.jpg`} 
                    alt={item.description || item.subject}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
              
              <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#00AEEF] group-hover:text-black group-hover:border-[#00AEEF] transition-colors">
                {item.type === 'video' ? <Play size={12} fill="currentColor" className="ml-0.5" /> : <ImageIcon size={12} />}
              </div>

              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-[10px] font-medium leading-tight line-clamp-2 mb-1 group-hover:text-[#00AEEF] transition-colors">
                  {item.description || item.subject}
                </p>
                <div className="flex items-center gap-1.5 opacity-60">
                   <span className="text-[8px] uppercase tracking-widest font-black text-[#00AEEF] bg-[#00AEEF]/10 px-1.5 py-0.5 rounded">
                    {item.type}
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <VideoModal 
        videoId={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
      
      {activePhoto && (
        <PhotoGalleryOverlay 
          isOpen={!!activePhoto}
          images={[activePhoto.displayLink]}
          title={activePhoto.description || activePhoto.subject}
          onClose={() => setActivePhoto(null)}
        />
      )}
    </div>
  );
}
