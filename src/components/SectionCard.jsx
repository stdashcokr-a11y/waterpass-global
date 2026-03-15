"use client";

import React, { useState, useRef } from 'react';
import { CloudRain, Building2, AlertTriangle, UploadCloud, Play, Loader2 } from 'lucide-react';

const iconMap = {
  CloudRain: CloudRain,
  Building2: Building2,
  AlertTriangle: AlertTriangle
};

export default function SectionCard({ section, mappedVideoId, onUploadSuccess, onPlay }) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef(null);

  const IconComponent = iconMap[section.icon];
  
  // State 1: Idle (No video, ready to upload)
  // State 2: Uploading (Spinner processing)
  // State 3: Ready/Play (Video ID exists)
  const isReady = !!mappedVideoId;

  const handleActionClick = () => {
    if (isReady) {
      // Prompt 3: Transition to Cinematic Playback
      onPlay();
    } else {
      // Prompt 2: Trigger File Upload Modal/Picker
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorVisible(false);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('sectionId', section.id);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      if (result.success && result.videoId) {
        onUploadSuccess(result.videoId);
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
      setErrorVisible(true);
      setTimeout(() => setErrorVisible(false), 4000);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative group bg-[rgba(10,31,68,0.6)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 hover:border-[#00AEEF] hover:-translate-y-2 transition-all duration-400 overflow-visible flex flex-col h-full shadow-lg">
      
      {/* Top Right Interaction Button (Prompt 1 & 2) */}
      <button 
        onClick={handleActionClick}
        disabled={isUploading}
        className={`absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center z-20 transition-all duration-300 shadow-xl ${
          isUploading ? 'bg-gray-700 cursor-not-allowed text-white' :
          isReady ? 'bg-[#00AEEF] text-black hover:scale-110 hover:shadow-[0_0_20px_rgba(0,174,239,0.5)] animate-[pulse_2s_infinite]' :
          'bg-[rgba(0,0,0,0.8)] border border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)] hover:border-white'
        }`}
        title={isUploading ? "Uploading..." : isReady ? "Play Video" : "Upload Video"}
      >
        {isUploading ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : isReady ? (
          <Play className="w-5 h-5 ml-1" fill="currentColor" />
        ) : (
          <UploadCloud className="w-5 h-5" />
        )}
      </button>

      {/* Hidden File Input */}
      <input 
        type="file" 
        accept="video/mp4,video/quicktime" 
        ref={fileInputRef} 
        onChange={handleFileChange}
        className="hidden" 
      />

      {/* Error Tooltip */}
      {errorVisible && (
        <div className="absolute -top-16 right-0 bg-red-600 text-white text-xs px-3 py-2 rounded-md shadow-lg pointer-events-none animate-in fade-in slide-in-from-bottom-2">
          {errorMsg}
        </div>
      )}

      {/* Card Content - Minimalist Progressive Disclosure */}
      <div className="flex-1 mt-4">
        {IconComponent && <IconComponent className="w-10 h-10 text-[#00AEEF] mb-6" />}
        <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{section.title}</h3>
        <p className="text-gray-400 font-light leading-relaxed">
          {section.description}
        </p>
      </div>
      
      {/* Glassmorphism Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
    </div>
  );
}
