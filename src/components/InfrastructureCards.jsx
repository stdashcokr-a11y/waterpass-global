"use client";

import React, { useState } from 'react';
import { Upload, Play, CloudRain, Building2, AlertTriangle, Loader2 } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';

const cardData = [
  {
    id: 'urban-flooding',
    title: { en: 'URBAN FLOODING', kr: '도심 홍수' },
    description: {
      en: 'Rising storm intensities overwhelm traditional drainage systems, causing severe urban inundation.',
      kr: '기상이변으로 인한 폭우가 전통적인 배수 시스템의 한계를 초과하여 심각한 도심 침수를 유발합니다.'
    },
    icon: CloudRain,
  },
  {
    id: 'concrete-cities',
    title: { en: 'CONCRETE CITIES', kr: '콘크리트 도시' },
    description: {
      en: 'Excessive concrete paving leads to massive stormwater runoff and completely blocks underground infiltration.',
      kr: '과도한 콘크리트 포장재는 막대한 빗물 유거수를 발생시키며 지표면 아래로의 빈틈없는 침투를 완전히 차단합니다.'
    },
    icon: Building2,
  },
  {
    id: 'stormwater-crisis',
    title: { en: 'STORMWATER CRISIS', kr: '빗물 관리 위기' },
    description: {
      en: 'Conventional pavements fail to manage the modern climate load, exacerbating the global water crisis.',
      kr: '재래식 포장재는 현대의 극한 기후 부하를 감당하지 못하며, 전 세계적인 물 순환 위기를 더욱 악화시킵니다.'
    },
    icon: AlertTriangle,
  }
];

export default function InfrastructureCards({ onPlay }) {
  const { language } = useLanguage();
  const [states, setStates] = useState({
    'urban-flooding': { status: 'idle', videoId: null },
    'concrete-cities': { status: 'idle', videoId: null },
    'stormwater-crisis': { status: 'idle', videoId: null },
  });

  // Load initial states - in a real app this would be a fetch/useEffect
  React.useEffect(() => {
    const fetchStates = async () => {
      try {
        // Mocking the fetch of videos.json
        // In dev, we just check local state or a dedicated API
      } catch (e) {}
    };
    fetchStates();
  }, []);

  const handleFileUpload = async (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    setStates(prev => ({ ...prev, [id]: { ...prev[id], status: 'uploading' } }));

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('sectionId', id);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setStates(prev => ({ 
          ...prev, 
          [id]: { status: 'idle', videoId: result.videoId } 
        }));
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      alert(`Upload Failed: ${error.message}`);
      setStates(prev => ({ ...prev, [id]: { ...prev[id], status: 'idle' } }));
    }
  };

  const handleAction = (id) => {
    const section = states[id];
    if (section.videoId) {
      onPlay(section.videoId);
    } else {
      document.getElementById(`${id}-input`).click();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto px-4 py-20 overflow-visible">
      {cardData.map((card) => {
        const state = states[card.id];
        const Icon = card.icon;

        return (
          <div key={card.id} className="bg-[#051125] border border-white/5 relative p-8 rounded-2xl group overflow-visible flex-1">
            {/* Action Button - TOP RIGHT */}
            <button 
              onClick={() => handleAction(card.id)}
              disabled={state.status === 'uploading'}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-[#00AEEF] flex items-center justify-center text-black z-20 shadow-[0_4px_15px_rgba(0,174,239,0.3)] transition-transform hover:scale-110 active:scale-95"
              aria-label={state.videoId ? "Play video" : "Upload video"}
            >
              {state.status === 'uploading' ? (
                <Loader2 className="animate-spin" size={20} />
              ) : state.videoId ? (
                <Play size={20} fill="currentColor" className="translate-x-0.5" />
              ) : (
                <Play size={20} fill="currentColor" className="translate-x-0.5" />
              )}
            </button>

            {/* Hidden File Input for Upload */}
            <input 
              id={`${card.id}-input`}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, card.id)}
            />

            {/* Content */}
            <div className="relative z-10 pt-4">
              <Icon className="text-[#00AEEF] mb-8" size={32} />
              <h3 className={`text-xl md:text-2xl font-black mb-4 tracking-tight ${language === 'en' ? 'uppercase' : 'break-keep'} text-white`}>{card.title[language]}</h3>
              <p className={`text-gray-400 font-light leading-relaxed text-sm ${language === 'kr' ? 'break-keep' : ''}`}>
                {card.description[language]}
              </p>
            </div>
            
            {/* Animated Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
}
