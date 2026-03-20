"use client";

import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import InfrastructureCards from '@/components/InfrastructureCards';
import TechnologySection from '@/components/TechnologySection';
import SolutionsSection from '@/components/SolutionsSection';
import PerformanceMetrics from '@/components/PerformanceMetrics';
import SustainableCities from '@/components/SustainableCities';
import GlobalVision from '@/components/GlobalVision';
import ContactSection from '@/components/ContactSection';
import VideoModal from '@/components/VideoModal';
import ReusableGridGallery from '@/components/ReusableGridGallery';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { language } = useLanguage();
  const [activeVideo, setActiveVideo] = useState(null);

  const handleUpload = (id) => {
    // This will be connected to the API later
    console.log("Trigger upload for:", id);
    alert(`YouTube Uploading Flow for ${id} - API integration in progress!`);
  };

  return (
    <main className="min-h-screen relative">
      {/* 1. Hero Section */}
      <div id="home">
        <HeroSection />
      </div>

      {/* 2. Infrastructure Cards (Cities in Crisis) */}
      <div className="pt-24 md:pt-32 pb-10 text-center px-4">
        <span className="inline-block bg-[#00AEEF] text-black text-[10px] font-black px-3 py-1 mb-4 tracking-[3px]">
          {language === 'en' ? 'THE CHALLENGE' : '당면 과제'}
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 break-keep">
          {language === 'en' ? 'CITIES IN CRISIS' : '위기의 도시들'}
        </h1>
      </div>
      <InfrastructureCards 
        onPlay={(id) => setActiveVideo(id)}
      />

      {/* 3. Technology Section */}
      <div id="technology">
        <TechnologySection />
      </div>

      {/* 4. Solutions Section */}
      <div id="products">
        <SolutionsSection />
      </div>

      <div id="performance">
        <PerformanceMetrics />
      </div>

      <div id="sustainable">
        <SustainableCities />
      </div>

      <div id="video-hub">
        <GlobalVision />
        <ReusableGridGallery sectionId="home-media" title="Waterpass Master" />
      </div>

      <div id="contact">
        <ContactSection />
      </div>

      {/* Playback Modal */}
      <VideoModal 
        videoId={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00AEEF]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0A1F44]/20 blur-[120px] rounded-full" />
      </div>
    </main>
  );
}
