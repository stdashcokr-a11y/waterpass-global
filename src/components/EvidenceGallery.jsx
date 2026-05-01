"use client";

import React, { useState } from 'react';
import { Play, Filter, ExternalLink } from 'lucide-react';

export default function EvidenceGallery({ data = [] }) {
  const [filter, setFilter] = useState('all');

  // Flatten all videos from the company data
  const allVideos = data.flatMap(item => 
    item.videos.map(v => ({
      ...v,
      company: item.name,
      location: item.location
    }))
  );

  const filteredVideos = filter === 'all' 
    ? allVideos 
    : allVideos.filter(v => v.period === filter);

  const periods = ['all', '3M', '6M', '1Y', '2Y', '3Y', '4Y', '5Y'];

  const getYoutubeId = (url) => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="space-y-10">
      {/* Filter Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 md:p-2 bg-white/5 rounded-lg text-gray-400">
            <Filter size={16} className="md:w-[18px] md:h-[18px]" />
          </div>
          <span className="text-[10px] md:text-[11px] font-black text-gray-300 tracking-[0.2em] uppercase">Filter by Time Elapsed</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {periods.map(p => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[9px] md:text-[10px] font-black tracking-widest transition-all flex-shrink-0 ${
                filter === p 
                  ? 'bg-[#00AEEF] text-black shadow-[0_0_15px_rgba(0,174,239,0.4)]' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {p === 'all' ? 'ALL EVIDENCE' : p}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((vid, idx) => {
            const videoId = getYoutubeId(vid.url);
            
            return (
              <div key={`${vid.company}-${vid.period}-${idx}`} className="group bg-[#0A101F] border border-white/5 rounded-2xl overflow-hidden hover:border-[#00AEEF]/40 transition-all duration-500 shadow-xl">
                <div className="aspect-video relative overflow-hidden bg-black">
                  {videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                      className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-gray-600 bg-black/40">
                      <AlertCircle size={32} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Video Link Unavailable</span>
                    </div>
                  )}
                  
                  {/* Floating Period Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#00AEEF] text-black text-[9px] font-black px-2 py-1 rounded-md shadow-lg">
                      {vid.period} ELAPSED
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="text-white font-black tracking-tight group-hover:text-[#00AEEF] transition-colors line-clamp-1">{vid.company} Field Test</h5>
                      <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-1">{vid.location}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-mono font-bold text-[#00AEEF]">{vid.score || '-'}s</span>
                      <span className="text-[8px] text-gray-600 font-bold uppercase tracking-tighter">Infiltration</span>
                    </div>
                  </div>
                  
                  <a 
                    href={vid.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
                  >
                    <ExternalLink size={12} />
                    View on YouTube
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-32 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
          <p className="text-gray-500 text-sm font-bold tracking-widest uppercase">No video evidence found for this period.</p>
        </div>
      )}
    </div>
  );
}
