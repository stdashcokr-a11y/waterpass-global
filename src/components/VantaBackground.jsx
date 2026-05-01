"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function VantaBackground() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  useEffect(() => {
    // Dynamically load scripts for Vanta.js
    const loadScripts = async () => {
      if (!window.THREE) {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        document.head.appendChild(threeScript);
        await new Promise(resolve => threeScript.onload = resolve);
      }

      if (!window.VANTA) {
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js';
        document.head.appendChild(vantaScript);
        await new Promise(resolve => vantaScript.onload = resolve);
      }

      if (!vantaEffect && window.VANTA) {
        setVantaEffect(window.VANTA.WAVES({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x050810,
          shininess: 35.00,
          waveHeight: 15.00,
          waveSpeed: 0.50,
          zoom: 0.85
        }));
      }
    };

    loadScripts();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div 
      ref={myRef} 
      className="fixed inset-0 z-[-1] pointer-events-none"
    />
  );
}
