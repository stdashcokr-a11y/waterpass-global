import React from 'react';
import { getPerformanceData } from '@/lib/google-sheets';
import ComparisonTable from '@/components/ComparisonTable';
import LCCCalculator from '@/components/LCCCalculator';
import EvidenceGallery from '@/components/EvidenceGallery';
import VantaBackground from '@/components/VantaBackground';
import { ShieldCheck, BarChart3, Calculator, PlayCircle } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

export default async function ComparisonPage() {
  const data = await getPerformanceData();

  return (
    <div className="min-h-screen bg-[#050810] text-white selection:bg-[#00AEEF] selection:text-black">
      <VantaBackground />
      
      {/* 1. Header Section */}
      <header className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00AEEF]/10 border border-[#00AEEF]/20 rounded-full">
            <ShieldCheck className="text-[#00AEEF]" size={16} />
            <span className="text-[10px] font-black text-[#00AEEF] tracking-[0.3em] uppercase">Data Evidence Hub</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            The Standard of<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-blue-600">
              Unrivaled Performance
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-gray-400 font-light text-sm md:text-lg leading-relaxed">
            Real-time synchronization with municipal field test data. 
            Experience the transparency of long-term infiltration retention.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-32 space-y-32">
        
        {/* 2. Comparison Table Section */}
        <section id="ranking" className="space-y-12">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#00AEEF]">
                <BarChart3 size={18} />
                <span className="text-[10px] font-black tracking-widest uppercase">Live Ranking</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">Performance Benchmarking</h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase block mb-1">Last Synchronized</span>
              <span className="text-xs font-mono text-gray-400">{new Date().toLocaleString('ko-KR')}</span>
            </div>
          </div>
          
          <ComparisonTable data={data} />
        </section>

        {/* 3. LCC Calculator Section */}
        <section id="calculator" className="space-y-12 bg-white/[0.01] border border-white/5 rounded-[40px] p-8 md:p-16">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#00AEEF]">
              <Calculator size={18} />
              <span className="text-[10px] font-black tracking-widest uppercase">Economic Analysis</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">Life Cycle Cost Simulator</h2>
            <p className="text-gray-500 text-sm max-w-xl">
              Compare long-term maintenance budgets between conventional infrastructure and Waterpass premium solutions.
            </p>
          </div>

          <LCCCalculator />
        </section>

        {/* 4. Video Evidence Section */}
        <section id="evidence" className="space-y-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#00AEEF]">
              <PlayCircle size={18} />
              <span className="text-[10px] font-black tracking-widest uppercase">Visual Proof</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">Field Test Evidence</h2>
            <p className="text-gray-500 text-sm max-w-xl">
              Raw testing footage from various installation sites across South Korea, proving performance over time.
            </p>
          </div>

          <EvidenceGallery data={data} />
        </section>

      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xl font-black tracking-tighter uppercase">
              Ash Concrete <span className="text-[#00AEEF]">Global</span>
            </span>
            <p className="text-[10px] text-gray-600 font-bold tracking-widest uppercase">
              Leading the Climate Resilient Infrastructure Revolution
            </p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] text-gray-500 font-black tracking-widest hover:text-[#00AEEF] transition-colors uppercase">Privacy Policy</a>
            <a href="#" className="text-[10px] text-gray-500 font-black tracking-widest hover:text-[#00AEEF] transition-colors uppercase">Technical Docs</a>
            <a href="#" className="text-[10px] text-gray-500 font-black tracking-widest hover:text-[#00AEEF] transition-colors uppercase">Inquiry</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
