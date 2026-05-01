"use client";

import React from 'react';
import { Trophy, CheckCircle2, AlertCircle, TrendingDown } from 'lucide-react';

export default function ComparisonTable({ data = [] }) {
  // Rank by 2-year performance (lower is better)
  const sortedData = [...data].sort((a, b) => {
    const valA = a.metrics[3] === null ? 9999 : a.metrics[3];
    const valB = b.metrics[3] === null ? 9999 : b.metrics[3];
    return valA - valB;
  });

  const getStatus = (score) => {
    if (score === null || score >= 120) return { label: 'FAIL', color: 'bg-red-500/20 text-red-500 border-red-500/30', icon: <AlertCircle size={14} /> };
    if (score < 60) return { label: 'PASS (EXCELLENT)', color: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30', icon: <CheckCircle2 size={14} /> };
    return { label: 'PASS', color: 'bg-blue-500/20 text-blue-500 border-blue-500/30', icon: <CheckCircle2 size={14} /> };
  };

  return (
    <div className="w-full overflow-hidden bg-[#0A101F] border border-white/5 rounded-3xl shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="px-6 py-5 text-[10px] font-black tracking-widest text-gray-400 uppercase">Rank</th>
              <th className="px-6 py-5 text-[10px] font-black tracking-widest text-gray-400 uppercase">Company / Site</th>
              <th className="px-6 py-5 text-[10px] font-black tracking-widest text-gray-400 uppercase text-center">3M</th>
              <th className="px-6 py-5 text-[10px] font-black tracking-widest text-gray-400 uppercase text-center">1Y</th>
              <th className="px-6 py-5 text-[10px] font-black tracking-widest text-[#00AEEF] uppercase text-center bg-[#00AEEF]/5">2Y (Critical)</th>
              <th className="px-6 py-5 text-[10px] font-black tracking-widest text-gray-400 uppercase text-center">5Y</th>
              <th className="px-6 py-5 text-[10px] font-black tracking-widest text-gray-400 uppercase text-right">Judgment</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => {
              const status = getStatus(item.metrics[3]);
              const isTop = index === 0;
              
              return (
                <tr 
                  key={item.id} 
                  className={`border-b border-white/5 transition-colors hover:bg-white/[0.02] ${item.isWaterpass ? 'bg-[#00AEEF]/[0.03]' : ''}`}
                >
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      {isTop ? (
                        <Trophy className="text-yellow-500" size={18} />
                      ) : (
                        <span className="text-gray-500 font-mono text-lg font-bold">#{index + 1}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className={`text-sm font-black tracking-tight ${item.isWaterpass ? 'text-[#00AEEF]' : 'text-white'}`}>
                        {item.name}
                        {item.isWaterpass && <span className="ml-2 text-[10px] bg-[#00AEEF]/20 px-2 py-0.5 rounded border border-[#00AEEF]/30 uppercase">Premium</span>}
                      </span>
                      <span className="text-[11px] text-gray-500 mt-0.5">{item.location} | {item.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center text-sm font-mono text-gray-400">{item.metrics[0] || '-'}</td>
                  <td className="px-6 py-6 text-center text-sm font-mono text-gray-400">{item.metrics[2] || '-'}</td>
                  <td className="px-6 py-6 text-center text-lg font-black font-mono text-white bg-[#00AEEF]/5">{item.metrics[3] || '-'}</td>
                  <td className="px-6 py-6 text-center text-sm font-mono text-gray-400">{item.metrics[6] || '-'}</td>
                  <td className="px-6 py-6 text-right">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-black tracking-wider ${status.color}`}>
                      {status.icon}
                      {status.label}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Footer Info */}
      <div className="px-6 py-4 bg-black/40 flex items-center justify-between border-t border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <div className="w-2 h-2 rounded-full bg-emerald-500" /> &lt; 60s (Excellent)
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <div className="w-2 h-2 rounded-full bg-blue-500" /> &lt; 120s (Standard)
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <div className="w-2 h-2 rounded-full bg-red-500" /> &gt; 120s (Failure)
          </div>
        </div>
        <span className="text-[10px] text-gray-600 font-mono tracking-tighter uppercase">
          * Based on KSF 4419 Standard Infiltration Test
        </span>
      </div>
    </div>
  );
}
