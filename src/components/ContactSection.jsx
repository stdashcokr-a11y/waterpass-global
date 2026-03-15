"use client";

import React, { useState } from 'react';
import { Send, MapPin, Mail, Building, Globe, User, MessageCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactSection() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Trigger mailto link with form data to waterpass@daum.net
    const subject = encodeURIComponent(`[WaterPass Inquiry] From ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Company: ${formData.company}\n` +
      `Country: ${formData.country}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    
    window.location.href = `mailto:waterpass1@daum.net?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', company: '', country: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const t = {
    badge: language === 'en' ? 'JOIN THE SOLUTION' : '솔루션에 동참하세요',
    title: language === 'en' ? <>BUILDING A WATER-SECURE<br/>INFRASTRUCTURE</> : <>물 안보에 강한<br/>인프라 구축</>,
    desc: language === 'en' ? 'WaterPass is a leading urban infrastructure technology company focused on sustainable water management.' : '워터패스는 지속가능한 물 관리에 집중하는 선도적인 도시 인프라 기술 기업입니다.',
    patent: language === 'en' ? 'Patent Pending (Expected April)' : 'Patent Pending (4월 출원 예정)',
    name: language === 'en' ? 'Name' : '이름',
    company: language === 'en' ? 'Company' : '소속/회사',
    country: language === 'en' ? 'Country' : '국가',
    email: language === 'en' ? 'Email' : '이메일',
    inquiry: language === 'en' ? 'Project Inquiry' : '프로젝트 문의',
    send: language === 'en' ? 'SEND INQUIRY' : '문의 보내기',
    sending: language === 'en' ? 'SENDING...' : '전송 중...',
    success: language === 'en' ? 'SENT SUCCESSFULLY' : '전송 완료'
  };

  return (
    <section className="w-full py-16 md:py-24 bg-[#050D1D] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          
          {/* Left: Contact Form */}
          <div className="flex-1 w-full text-left">
            <div className="mb-8 md:mb-10">
              <span className="inline-block bg-[#00AEEF] text-black text-[10px] font-black px-3 py-1 mb-4 tracking-[3px] rounded-sm">
                {t.badge}
              </span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter ${language === 'en' ? 'uppercase leading-none' : 'break-keep'} mb-4`}>
                {t.title}
              </h2>
              <p className={`text-sm sm:text-base text-gray-400 font-light leading-relaxed max-w-xl ${language === 'kr' ? 'break-keep' : ''}`}>
                {t.desc}
              </p>
              
              <div className="mt-6">
                 <span className="text-[#00AEEF] font-black text-xs border border-[#00AEEF]/30 bg-[#00AEEF]/10 px-4 py-2 rounded-full uppercase tracking-tighter shadow-[0_0_15px_rgba(0,174,239,0.2)]">
                   {t.patent}
                 </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#00AEEF] transition-colors" />
                  <input 
                    type="text" 
                    placeholder={t.name}
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#0A1F44] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#00AEEF] transition-all placeholder:text-gray-600"
                  />
                </div>
                <div className="relative group">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#00AEEF] transition-colors" />
                  <input 
                    type="text" 
                    placeholder={t.company}
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-[#0A1F44] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#00AEEF] transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative group">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#00AEEF] transition-colors" />
                  <input 
                    type="text" 
                    placeholder={t.country}
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full bg-[#0A1F44] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#00AEEF] transition-all placeholder:text-gray-600"
                  />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#00AEEF] transition-colors" />
                  <input 
                    type="email" 
                    placeholder={t.email}
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#0A1F44] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#00AEEF] transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="relative group">
                <MessageCircle className="absolute left-4 top-8 w-4 h-4 text-gray-500 group-focus-within:text-[#00AEEF] transition-colors" />
                <textarea 
                  placeholder={t.inquiry}
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-[#0A1F44] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#00AEEF] transition-all placeholder:text-gray-600 resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full md:w-auto bg-[#00AEEF] text-black font-black uppercase tracking-widest px-6 sm:px-10 py-4 sm:py-5 text-sm sm:text-base rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,174,239,0.3)] hover:shadow-[0_0_40px_rgba(0,174,239,0.5)] flex items-center justify-center gap-2 sm:gap-3 disabled:bg-gray-700 disabled:shadow-none ${language === 'en' ? 'tracking-widest' : 'tracking-normal'}`}
              >
                {isSubmitting ? (
                  t.sending
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {t.success}
                  </>
                ) : (
                  <>
                    {t.send}
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Cinematic Imagery */}
          <div className="flex-1 w-full relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#050D1D] via-transparent to-transparent z-10 pointer-events-none" />
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-3xl relative">
               <img 
                 src="/images/gangnam_final_user.jpg" 
                 alt="WaterPass Technology Comparison"
                 className="w-full h-full object-cover object-[25%_center] transition-transform duration-700 group-hover:scale-105"
               />
            </div>
          </div>

        </div>
      </div>

      {/* Background Decorative Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} 
      />
    </section>
  );
}
