"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const ContactSection = () => {
    const { language } = useLanguage();
    const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="bg-black text-white py-24 sm:py-32 px-6 lg:px-20 flex flex-col lg:flex-row gap-16 items-center overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -z-1" />
      
      {/* 왼쪽: 문의 양식 */}
      <div className="w-full lg:w-1/2 space-y-8 relative z-10" data-aos="fade-right">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase animate-pulse">
          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          Patent Pending (APRIL 2026)
        </div>
        
        <div className="space-y-4">
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter leading-tight">
            JOIN THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">SOLUTION</span>
          </h2>
          <p className="join-description text-zinc-300 text-xl sm:text-2xl font-medium max-w-lg leading-relaxed">
            {language === 'en' 
              ? 'WaterPass is a leading urban infrastructure technology company focused on sustainable water management.' 
              : '워터패스는 지속 가능한 물 관리에 집중하는 선도적인 도시 인프라 기술 기업입니다.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              name="name" 
              placeholder="Name" 
              className="bg-zinc-900/50 backdrop-blur-md border border-white/30 p-5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300 text-white text-lg placeholder:text-white placeholder:opacity-90" 
              required 
            />
            <input 
              name="company" 
              placeholder="Company" 
              className="bg-zinc-900/50 backdrop-blur-md border border-white/30 p-5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300 text-white text-lg placeholder:text-white placeholder:opacity-90" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              name="country" 
              placeholder="Country" 
              className="bg-zinc-900/50 backdrop-blur-md border border-white/30 p-5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300 text-white text-lg placeholder:text-white placeholder:opacity-90" 
            />
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              className="bg-zinc-900/50 backdrop-blur-md border border-white/30 p-5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300 text-white text-lg placeholder:text-white placeholder:opacity-90" 
              required 
            />
          </div>
          <textarea 
            name="message" 
            rows="4" 
            placeholder="Project Inquiry" 
            className="w-full bg-zinc-900/50 backdrop-blur-md border border-white/30 p-5 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300 text-white text-lg placeholder:text-white placeholder:opacity-90 resize-none"
          ></textarea>
          
          <button 
            type="submit" 
            disabled={status === 'sending'}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-5 rounded-xl shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] transition-all duration-500 transform active:scale-95 flex justify-center items-center gap-2"
          >
            {status === 'sending' ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                SENDING...
              </>
            ) : 'SEND INQUIRY'}
          </button>
          
          {status === 'success' && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-xl text-center animate-bounce-short">
              {language === 'en' ? 'Inquiry sent successfully. We will contact you soon!' : '문의가 전송되었습니다. 곧 연락드리겠습니다!'}
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-center">
              {language === 'en' ? 'An error occurred while sending. Please try again.' : '전송 중 오류가 발생했습니다. 다시 시도해 주세요.'}
            </div>
          )}
        </form>
      </div>

      {/* 오른쪽: 강남역 시네마틱 이미지 */}
      <div className="w-full lg:w-1/2 group relative rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-800/50 aspect-square lg:aspect-auto lg:h-[650px]" data-aos="fade-left">
        <Image 
          src="/images/gangnam-rain.jpg" 
          alt="WaterPass Rainy Day Performance" 
          fill
          className="object-cover brightness-[0.7] group-hover:scale-110 group-hover:brightness-90 transition-all duration-[2000ms] ease-out"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        
        {/* Caption */}
        <div className="absolute bottom-10 left-10 right-10">
          <div className="h-0.5 w-12 bg-blue-500 mb-4 transition-all duration-700 group-hover:w-24" />
          <p className="text-zinc-400 text-sm tracking-[0.2em] font-bold uppercase mb-2">Location</p>
          <h3 className="text-2xl font-bold text-white mb-2">Gangnam Station, Exit 11</h3>
          <p className="italic text-zinc-400 text-sm font-medium">Performance reliability test under extreme weather conditions.</p>
        </div>
        
        {/* Cinematic Particles (Optional CSS target) */}
        <div className="absolute top-4 right-4 text-[10px] text-zinc-600 font-mono tracking-widest flex flex-col items-end">
          <span>LAT: 37.4979° N</span>
          <span>LONG: 127.0276° E</span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
