"use client";

import React, { useState, useEffect } from 'react';
import { Menu, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);

  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = {
    home: language === 'en' ? 'HOME' : '홈',
    nav_tech: language === 'en' ? 'TECHNOLOGY' : '기술',
    nav_prod: language === 'en' ? 'PRODUCTS' : '제품',
    nav_perf: language === 'en' ? 'PERFORMANCE' : '성능',
    nav_sus: language === 'en' ? 'SUSTAIN & GLOBAL' : '지속가능 & 글로벌',
    nav_video: language === 'en' ? 'VIDEO HUB' : '비디오 허브',
    nav_contact: language === 'en' ? 'CONTACT' : '문의하기',
    compare: language === 'en' ? 'PERFORMANCE COMPARISON SITE' : '투수유지성능 비교사이트',
    hero_title: language === 'en' ? (
      <>15 YEARS OF<br />PERMEABLE BLOCK<br />REVOLUTION</>
    ) : (
      <>15년을 지켜온<br />투수 블록의<br />혁명</>
    ),
    hero_sub: language === 'en' ? 'Next Generation Permeable Pavement Technology' : '첨단 소재와 바텀애쉬의 결합, 투수성 보도블록의 기준을 바꾸다'
  };

  return (
    <section className="relative w-full h-screen min-h-[800px] flex flex-col items-center justify-center overflow-hidden bg-graphene-black">
      
      {/* Background Image/Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/uploaded_media_1773382691515.img" 
          alt="WaterPass Background" 
          className="w-full h-full object-cover opacity-30" 
          onError={(e) => { e.target.src = 'https://picsum.photos/1920/1080?blue'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-graphene-black/80 to-graphene-black" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} 
        />
      </div>

      {/* Navigation Bar */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-graphene-black/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 flex items-center justify-between">
          <a href="#home" className="relative z-50 text-white font-black text-lg md:text-xl tracking-wider cursor-pointer hover:opacity-80 transition-opacity" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
            WATER<span className="text-[#00AEEF]">PASS</span> <span className="text-gray-400 font-light text-sm hidden md:inline-block ml-2">{t.home}</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8 relative z-50">
            <a href="#technology" className="text-gray-300 hover:text-[#00AEEF] text-xs font-bold tracking-widest transition-colors">{t.nav_tech}</a>
            <a href="#products" className="text-gray-300 hover:text-[#00AEEF] text-xs font-bold tracking-widest transition-colors">{t.nav_prod}</a>
            <a href="#performance" className="text-gray-300 hover:text-[#00AEEF] text-xs font-bold tracking-widest transition-colors">{t.nav_perf}</a>
            <a href="#sustainable" className="text-gray-300 hover:text-[#00AEEF] text-xs font-bold tracking-widest transition-colors">{t.nav_sus}</a>
            <a href="#video-hub" className="text-gray-300 hover:text-[#00AEEF] text-xs font-bold tracking-widest transition-colors">{t.nav_video}</a>
            <a href="#contact" className="text-gray-300 hover:text-[#00AEEF] text-xs font-bold tracking-widest transition-colors">{t.nav_contact}</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 relative z-50 flex-wrap sm:flex-nowrap justify-end">
            {/* Eye-catching Comparison Site Button */}
            <a 
              href="http://localhost:3001" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 ml-2 sm:ml-8 bg-water-blue text-black text-[9px] sm:text-[10px] whitespace-nowrap font-black tracking-widest flex-shrink-0 rounded-sm overflow-hidden shadow-[0_0_15px_rgba(0,174,239,0.4)] hover:shadow-[0_0_30px_rgba(0,174,239,0.8)] transition-all hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
              <span className="relative flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                {t.compare}
                <ExternalLink className="w-2 sm:w-3 h-2 sm:h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-black" />
              </span>
            </a>

            <div className="flex bg-white/10 p-0.5 sm:p-1 rounded-md">
               <button 
                 onClick={() => toggleLanguage('en')}
                 className={`px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold rounded-sm transition-colors ${language === 'en' ? 'bg-[#00AEEF] text-black' : 'text-gray-400 hover:text-white'}`}
               >EN</button>
               <button 
                 onClick={() => toggleLanguage('kr')}
                 className={`px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold rounded-sm transition-colors ${language === 'kr' ? 'bg-[#00AEEF] text-black' : 'text-gray-400 hover:text-white'}`}
               >KR</button>
            </div>
            <button className="lg:hidden text-white ml-1"><Menu size={20} /></button>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl px-4 mt-20 md:mt-0">
        <h1 className={`${language === 'kr' ? 'text-3xl sm:text-4xl md:text-6xl lg:text-[4.5rem] break-keep' : 'text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem]'} font-black text-white uppercase tracking-tighter leading-[1.1] mb-6 md:mb-8 drop-shadow-[0_0_30px_rgba(0,174,239,0.2)] mt-8`}>
          {t.hero_title}
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light mb-10 md:mb-12 max-w-2xl mx-auto break-keep">
          {t.hero_sub}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-[280px] sm:max-w-none mx-auto">
          <button 
            onClick={(e) => { e.preventDefault(); document.querySelector('#technology')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="w-full sm:w-auto px-8 py-3 sm:px-12 sm:py-4 bg-[#00AEEF] text-black font-black text-xs sm:text-sm tracking-widest uppercase rounded-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,174,239,0.4)]"
          >
            {t.nav_tech}
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="w-full sm:w-auto px-8 py-3 sm:px-12 sm:py-4 bg-transparent border border-white/20 text-white font-bold text-xs sm:text-sm tracking-widest uppercase rounded-sm hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            {t.nav_contact}
          </button>
        </div>
      </div>

    </section>
  );
}
