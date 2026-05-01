"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, Zap, Clock, ShieldCheck } from 'lucide-react';

export default function LCCCalculator() {
  const [area, setArea] = useState(1000);
  const [years, setYears] = useState(10);
  
  // Base settings (could be fetched from Sheet in future)
  const config = {
    normal: { life: 2, cost: 50000 },
    superior: { life: 10, cost: 65000 }
  };

  const countNormal = Math.ceil(years / config.normal.life);
  const countSuperior = Math.ceil(years / config.superior.life);
  
  const totalNormal = area * config.normal.cost * countNormal;
  const totalSuperior = area * config.superior.cost * countSuperior;
  
  const savings = totalNormal - totalSuperior;
  const savingsRatio = Math.round((savings / totalNormal) * 100);

  const formatCurrency = (val) => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(val);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left: Controls */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#0A101F] border border-white/5 rounded-3xl p-8 space-y-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#00AEEF]/10 rounded-xl flex items-center justify-center text-[#00AEEF]">
              <Calculator size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight uppercase">Savings Simulator</h3>
              <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Investment ROI Analysis</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Installation Area (m²)</label>
              <span className="text-2xl font-black text-white font-mono">{area.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="100" max="10000" step="100" 
              value={area} onChange={(e) => setArea(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#00AEEF]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Analysis Period (Years)</label>
              <span className="text-2xl font-black text-white font-mono">{years}</span>
            </div>
            <input 
              type="range" min="1" max="20" step="1" 
              value={years} onChange={(e) => setYears(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#00AEEF]"
            />
          </div>

          <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block mb-2">Unit Cost (Avg)</span>
              <span className="text-sm font-black text-gray-300">₩50,000 / m²</span>
            </div>
            <div className="p-4 bg-[#00AEEF]/5 border border-[#00AEEF]/10 rounded-2xl">
              <span className="text-[9px] text-[#00AEEF] font-bold uppercase tracking-widest block mb-2">Waterpass Cost</span>
              <span className="text-sm font-black text-[#00AEEF]">₩65,000 / m²</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Results */}
      <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <ShieldCheck size={200} />
        </div>
        
        <h4 className="text-[10px] font-black text-[#00AEEF] tracking-[0.3em] uppercase mb-12">Cumulative Maintenance Cost</h4>
        
        <div className="space-y-12 relative z-10">
          {/* Normal Bar */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white uppercase">Conventional Infrastructure</span>
                <span className="text-[9px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded border border-red-500/20">{countNormal} Replacements</span>
              </div>
              <span className="text-sm font-mono text-gray-500">{formatCurrency(totalNormal)}</span>
            </div>
            <div className="h-4 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-red-500/40 rounded-full transition-all duration-700" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Superior Bar */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-[#00AEEF] uppercase">Waterpass Smart Pavement</span>
                <span className="text-[9px] bg-[#00AEEF]/10 text-[#00AEEF] px-2 py-0.5 rounded border border-[#00AEEF]/20">{countSuperior} Replacements</span>
              </div>
              <span className="text-sm font-mono text-white font-bold">{formatCurrency(totalSuperior)}</span>
            </div>
            <div className="h-4 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#00AEEF] rounded-full transition-all duration-700 shadow-[0_0_20px_rgba(0,174,239,0.3)]" 
                style={{ width: `${(totalSuperior / totalNormal) * 100}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Savings Card */}
        <div className="mt-16 bg-[#00AEEF] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_40px_rgba(0,174,239,0.2)]">
          <div className="text-center md:text-left">
            <span className="text-[10px] font-black text-black/60 tracking-widest uppercase block mb-1">Estimated Budget Savings</span>
            <span className="text-4xl font-black text-black tracking-tighter">{formatCurrency(savings)}</span>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="text-5xl font-black text-black flex items-start">
              {savingsRatio}<span className="text-xl mt-2">%</span>
            </div>
            <span className="text-[9px] font-bold text-black/60 tracking-widest uppercase mt-1">Cost Reduction</span>
          </div>
        </div>

        <p className="mt-8 text-[10px] text-gray-500 leading-relaxed max-w-md">
          * LCC analysis accounts for material cost, mobilization, and labor. 
          Conventional blocks require replacement every 2 years due to clogging, 
          whereas WaterPass maintains &gt;0.1mm/s permeability for over 10 years.
        </p>
      </div>
    </div>
  );
}
