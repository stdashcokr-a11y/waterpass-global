"use client";

import React, { useState, useEffect } from 'react';
import SectionCard from '@/components/SectionCard';
import VideoOverlay from '@/components/VideoOverlay';

// The three core sections as specified in Prompt 1
const sections = [
  {
    id: 'urban_flooding',
    title: 'Urban Flooding',
    description: 'Rising storm intensities overwhelm traditional drainage systems, causing severe urban inundation.',
    icon: 'CloudRain',
  },
  {
    id: 'concrete_cities',
    title: 'Concrete Cities',
    description: 'Excessive concrete paving leads to massive stormwater runoff and completely blocks underground infiltration.',
    icon: 'Building2',
  },
  {
    id: 'stormwater_crisis',
    title: 'Stormwater Crisis',
    description: 'Conventional pavements fail to manage the modern climate load, exacerbating the global water crisis.',
    icon: 'AlertTriangle',
  }
];

export default function CitiesInCrisis() {
  const [activeVideoStart, setActiveVideoStart] = useState(null);
  const [videoMappings, setVideoMappings] = useState({});

  // Fetch persisted video states (Prompt 2: State Persistence)
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch('/api/videos');
        if (res.ok) {
          const data = await res.json();
          setVideoMappings(data);
        }
      } catch (error) {
        console.error("Could not load video states:", error);
      }
    };
    fetchStates();
  }, []);

  const handleUploadSuccess = (sectionId, videoId) => {
    setVideoMappings(prev => ({
      ...prev,
      [sectionId]: videoId
    }));
  };

  return (
    <main className="min-h-screen bg-[#050E21] text-white flex flex-col items-center py-24 relative overflow-hidden">
      {/* Vanta/Theme Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00AEEF]/5 blur-[150px] rounded-full" />
      </div>

      <div className="z-10 text-center mb-16 px-4">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          Cities in Crisis
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          The macro challenges confronting modern urban climate infrastructure.
        </p>
      </div>

      {/* 3 Cards Layout - Responsive, Side-by-side */}
      <div className="z-10 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section) => (
            <SectionCard 
              key={section.id}
              section={section}
              mappedVideoId={videoMappings[section.id]}
              onUploadSuccess={(vidId) => handleUploadSuccess(section.id, vidId)}
              onPlay={() => setActiveVideoStart(videoMappings[section.id])}
            />
          ))}
        </div>
      </div>

      {/* Cinematic Modal Overlay (Prompt 3) */}
      <VideoOverlay 
        videoId={activeVideoStart} 
        onClose={() => setActiveVideoStart(null)} 
      />
    </main>
  );
}
