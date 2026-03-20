"use client";
import React, { useEffect, useState } from 'react';

export default function ParticlesBackground() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate 50 random stars for the AI universe effect
    const newStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 5}s`,
      animationDelay: `${Math.random() * 5}s`
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="universe-stars pointer-events-none">
      {stars.map(star => (
        <div 
          key={star.id} 
          className="star" 
          style={{ 
            left: star.left, 
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay
          }} 
        />
      ))}
    </div>
  );
}
