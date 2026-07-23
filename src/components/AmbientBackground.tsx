import React, { useEffect, useState } from 'react';

// Fixed array of 18 particle coordinates and visual traits
const PARTICLES = [
  { top: '8%', left: '12%', size: 'w-1.5 h-1.5', bg: 'bg-[#0C7D8D]/35', anim: 'animate-particle-1', delay: '0s' },
  { top: '15%', left: '85%', size: 'w-2 h-2', bg: 'bg-[#0C3855]/25', anim: 'animate-particle-2', delay: '1.5s' },
  { top: '22%', left: '48%', size: 'w-1 h-1', bg: 'bg-[#BED7EB]/60', anim: 'animate-particle-3', delay: '0.8s' },
  { top: '30%', left: '18%', size: 'w-2 h-2', bg: 'bg-[#0C7D8D]/30', anim: 'animate-particle-2', delay: '2.2s' },
  { top: '37%', left: '76%', size: 'w-1.5 h-1.5', bg: 'bg-[#0C3855]/30', anim: 'animate-particle-1', delay: '3.1s' },
  { top: '45%', left: '32%', size: 'w-2.5 h-2.5', bg: 'bg-[#BED7EB]/50', anim: 'animate-particle-3', delay: '1.0s' },
  { top: '52%', left: '88%', size: 'w-1 h-1', bg: 'bg-[#0C7D8D]/40', anim: 'animate-particle-1', delay: '2.5s' },
  { top: '58%', left: '14%', size: 'w-2 h-2', bg: 'bg-[#0C3855]/20', anim: 'animate-particle-2', delay: '0.4s' },
  { top: '65%', left: '62%', size: 'w-1.5 h-1.5', bg: 'bg-[#BED7EB]/60', anim: 'animate-particle-3', delay: '3.8s' },
  { top: '72%', left: '25%', size: 'w-2 h-2', bg: 'bg-[#0C7D8D]/35', anim: 'animate-particle-1', delay: '1.9s' },
  { top: '79%', left: '80%', size: 'w-1 h-1', bg: 'bg-[#0C3855]/30', anim: 'animate-particle-3', delay: '2.7s' },
  { top: '85%', left: '42%', size: 'w-2.5 h-2.5', bg: 'bg-[#BED7EB]/40', anim: 'animate-particle-2', delay: '0.2s' },
  { top: '91%', left: '10%', size: 'w-1.5 h-1.5', bg: 'bg-[#0C7D8D]/30', anim: 'animate-particle-1', delay: '4.0s' },
  { top: '96%', left: '70%', size: 'w-2 h-2', bg: 'bg-[#0C3855]/25', anim: 'animate-particle-3', delay: '1.2s' },
  { top: '18%', left: '65%', size: 'w-1 h-1', bg: 'bg-[#0C7D8D]/25', anim: 'animate-particle-2', delay: '3.5s' },
  { top: '42%', left: '92%', size: 'w-1.5 h-1.5', bg: 'bg-[#BED7EB]/50', anim: 'animate-particle-1', delay: '0.9s' },
  { top: '68%', left: '40%', size: 'w-2 h-2', bg: 'bg-[#0C3855]/20', anim: 'animate-particle-3', delay: '2.1s' },
  { top: '88%', left: '20%', size: 'w-1 h-1', bg: 'bg-[#0C7D8D]/35', anim: 'animate-particle-2', delay: '1.7s' },
];

export const AmbientBackground: React.FC = () => {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device supports fine pointer (desktop) and reduced motion is not preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (prefersReducedMotion || !isFinePointer) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Limit max displacement to 8px
      const targetX = ((e.clientX / window.innerWidth) - 0.5) * 16; // -8px to +8px
      const targetY = ((e.clientY / window.innerHeight) - 0.5) * 16; // -8px to +8px

      animationFrameId = requestAnimationFrame(() => {
        setParallax({
          x: Math.round(targetX * 100) / 100,
          y: Math.round(targetY * 100) / 100,
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Container with optional desktop parallax transform */}
      <div 
        className="relative w-full h-full transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`
        }}
      >
        {/* 1. Animated Gradient Mesh Layer */}
        <div className="absolute inset-0 opacity-[0.14] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#0C3855] via-[#0C7D8D] to-transparent animate-ambient-mesh" />

        {/* 2. Large Blurred Gradient Blobs (5 distinct brand-toned shapes with 15-20% opacity) */}
        
        {/* Blob 1: Top Left - Deep Navy & Cyan */}
        <div className="absolute -top-20 -left-20 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#0C3855]/18 via-[#0C7D8D]/16 to-transparent blur-[120px] animate-blob-1" />

        {/* Blob 2: Top Right - Sky Blue & Teal */}
        <div className="absolute top-[10%] -right-32 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-[#BED7EB]/35 via-[#0C7D8D]/18 to-transparent blur-[110px] animate-blob-2" />

        {/* Blob 3: Middle Center-Left - Soft Ice Blue & Navy */}
        <div className="absolute top-[35%] -left-28 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-[#0C3855]/16 via-[#BED7EB]/30 to-transparent blur-[130px] animate-blob-3" />

        {/* Blob 4: Lower Center-Right - Cyan & Teal */}
        <div className="absolute top-[60%] -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#0C7D8D]/20 via-[#0C3855]/14 to-transparent blur-[115px] animate-blob-4" />

        {/* Blob 5: Bottom Left - Deep Navy Glow */}
        <div className="absolute bottom-0 -left-20 w-[650px] h-[650px] rounded-full bg-gradient-to-t from-[#0C3855]/18 via-[#BED7EB]/25 to-transparent blur-[120px] animate-blob-5" />

        {/* 3. Small Floating Particles (18 subtle dots) */}
        <div className="absolute inset-0">
          {PARTICLES.map((p, idx) => (
            <div
              key={idx}
              className={`absolute rounded-full pointer-events-none ${p.size} ${p.bg} ${p.anim}`}
              style={{
                top: p.top,
                left: p.left,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
