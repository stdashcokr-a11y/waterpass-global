"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  // Load language preference from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('waterpass_language');
    if (saved) {
      setLanguage(saved);
    }
  }, []);

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('waterpass_language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
