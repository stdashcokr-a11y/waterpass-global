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
import { getSheetData } from '@/lib/sheets';
import SheetSection from '@/components/SheetSection';

export default function Home() {
  const { language } = useLanguage();
  const [activeVideo, setActiveVideo] = useState(null);
  const [sheetData, setSheetData] = useState({ grouped: {} });

  React.useEffect(() => {
    async function loadData() {
      const data = await getSheetData();
      setSheetData(data);
    }
    loadData();
  }, []);

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
      {/* Page 2 Dynamic Content */}
      <div className="pb-20">
        {sheetData.grouped['2'] && Object.entries(sheetData.grouped['2']).map(([subject, items]) => (
          <SheetSection key={subject} subject={subject} items={items} />
        ))}
      </div>

      {/* 3. Technology Section */}
      <div id="technology">
        <TechnologySection />
        {/* Page 4 Dynamic Content */}
        <div className="pb-20">
          {sheetData.grouped['4'] && Object.entries(sheetData.grouped['4']).map(([subject, items]) => (
            <SheetSection key={subject} subject={subject} items={items} />
          ))}
        </div>
      </div>

      {/* 4. Solutions Section */}
      <div id="products">
        <SolutionsSection />
        {/* Page 5 Dynamic Content */}
        <div className="pb-20">
          {sheetData.grouped['5'] && Object.entries(sheetData.grouped['5']).map(([subject, items]) => (
            <SheetSection key={subject} subject={subject} items={items} />
          ))}
        </div>
      </div>

      <div id="performance">
        <PerformanceMetrics />
        {/* Page 7 & 8 Dynamic Content */}
        <div className="pb-20">
          {sheetData.grouped['7'] && Object.entries(sheetData.grouped['7']).map(([subject, items]) => (
            <SheetSection key={subject} subject={subject} items={items} />
          ))}
          {sheetData.grouped['8'] && Object.entries(sheetData.grouped['8']).map(([subject, items]) => (
            <SheetSection key={subject} subject={subject} items={items} />
          ))}
        </div>
      </div>

      <div id="sustainable">
        <SustainableCities />
        {/* Page 9 Dynamic Content */}
        <div className="pb-20">
          {sheetData.grouped['9'] && Object.entries(sheetData.grouped['9']).map(([subject, items]) => (
            <SheetSection key={subject} subject={subject} items={items} />
          ))}
        </div>
      </div>

      <div id="video-hub">
        <GlobalVision />
        {/* Page 10 Dynamic Content */}
        <div className="pb-20">
          {sheetData.grouped['10'] && Object.entries(sheetData.grouped['10']).map(([subject, items]) => (
            <SheetSection key={subject} subject={subject} items={items} />
          ))}
        </div>
        
        <ReusableGridGallery sectionId="home-media" title="Waterpass Master" />
        {/* Page 11 Dynamic Content */}
        <div className="pb-20">
          {sheetData.grouped['11'] && Object.entries(sheetData.grouped['11']).map(([subject, items]) => (
            <SheetSection key={subject} subject={subject} items={items} />
          ))}
        </div>
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
