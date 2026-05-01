"use client";

import React, { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);

  // Robust Fetching with revalidation logic
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await getSheetData();
        if (data && data.grouped) {
          setSheetData(data);
        }
      } catch (error) {
        console.error("Home Data Load Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
    
    // Optional: Auto-refresh every 5 minutes to keep data fresh
    const interval = setInterval(loadData, 300000);
    return () => clearInterval(interval);
  }, []);

  // Helper to get nested data for a specific page (Section -> [Items])
  const getPageGroupedData = (pageNum) => sheetData.grouped[pageNum.toString()] || {};

  // Helper to get flat data for a specific page (Backwards compatibility)
  const getPageData = (pageNum) => {
    const pageObj = sheetData.grouped[pageNum.toString()] || {};
    return Object.values(pageObj).flat();
  };

  return (
    <main className="min-h-screen relative bg-[#1a1a1a]">
      {/* 1. Hero Section (Page 1) */}
      <div id="home">
        <HeroSection data={getPageData(1)} />
      </div>

      {/* 2. Infrastructure Cards (Page 2) */}
      <div className="pt-24 md:pt-32 pb-10 text-center px-4">
        <span className="inline-block bg-[#00AEEF] text-black text-[10px] font-black px-3 py-1 mb-4 tracking-[3px] rounded-sm uppercase">
          {language === 'en' ? 'THE CHALLENGE' : '당면 과제'}
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 break-keep text-white">
          {language === 'en' ? 'CITIES IN CRISIS' : '위기의 도시들'}
        </h1>
      </div>
      <InfrastructureCards 
        onPlay={(id) => setActiveVideo(id)}
        data={getPageData(2)}
      />

      {/* 3. Technology Section (Page 3 & 4) */}
      <div id="technology">
        <TechnologySection data={getPageData(3)} layerData={getPageData(4)} />
      </div>

      {/* 4. Solutions Section (Page 5 & 6) */}
      <div id="products">
        <SolutionsSection data={getPageData(5)} maintenanceData={getPageData(6)} />
      </div>

      {/* 5. Performance Section (Page 7 & 8) */}
      <div id="performance">
        <PerformanceMetrics data={getPageData(7)} tableData={getPageData(8)} />
      </div>

      {/* 6. Sustainable Cities (Page 9) */}
      <div id="sustainable">
        <SustainableCities data={getPageData(9)} />
      </div>

      {/* 7. Global Vision & Media Hub (Page 10, 11) */}
      <div id="video-hub">
        <GlobalVision data={getPageData(10)} />
        
        {/* Page 11 - Universal Content Section (Multi-section Grid) */}
        {Object.entries(getPageGroupedData(11)).map(([sectionName, items]) => (
          <SheetSection 
            key={sectionName}
            subject={sectionName} 
            items={items}
            onPlay={(id) => setActiveVideo(id)}
          />
        ))}
      </div>

      {/* 8. Contact Section (Page 12) */}
      <div id="contact">
        <ContactSection data={getPageData(12)} />
      </div>

      {/* Global Playback Modal */}
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
