"use client";

import './rabbit.css';

export function RabbitAnimation({ className = "top-[35%] -translate-y-1/2" }: { className?: string }) {
  return (
    <div
      className={`astro-rabbit-container absolute right-0 z-50 cursor-pointer hidden md:flex flex-col items-center ${className}`}
      onClick={() => {
        document.getElementById('interactive-console')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      {/* Sleek Tech Notification Bubble */}
      <div className="astro-bubble">
        <div className="astro-bubble-dot" />
        <span>Ask Cenedy AI</span>
        <div className="astro-bubble-arrow" />
      </div>

      {/* Astro-Rabbit SVG - High-Tech Robot Mascot */}
      <svg viewBox="0 0 120 140" fill="none" className="astro-rabbit-svg" xmlns="http://www.w3.org/2000/svg">
        {/* Defs for Gradients */}
        <defs>
          <radialGradient id="astro-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="astro-metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="astro-visor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="astro-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>

        {/* Holographic Aura */}
        <circle cx="60" cy="80" r="48" fill="url(#astro-aura)" className="astro-pulse" />

        {/* Floating Left Ear */}
        <g className="astro-ear-l">
          <rect x="35" y="15" width="14" height="38" rx="7" fill="url(#astro-metal)" stroke="#cbd5e1" strokeWidth="1.5" transform="rotate(-15 42 34)" />
          <rect x="39" y="22" width="6" height="24" rx="3" fill="url(#astro-glow)" transform="rotate(-15 42 34)" className="astro-glow-pulse" />
        </g>

        {/* Floating Right Ear */}
        <g className="astro-ear-r">
          <rect x="71" y="15" width="14" height="38" rx="7" fill="url(#astro-metal)" stroke="#cbd5e1" strokeWidth="1.5" transform="rotate(15 78 34)" />
          <rect x="75" y="22" width="6" height="24" rx="3" fill="url(#astro-glow)" transform="rotate(15 78 34)" className="astro-glow-pulse" />
        </g>

        {/* Main Body/Head */}
        <g className="astro-head">
          <rect x="28" y="55" width="64" height="54" rx="27" fill="url(#astro-metal)" stroke="#cbd5e1" strokeWidth="2" />
          
          {/* Visor Screen */}
          <rect x="34" y="65" width="52" height="26" rx="13" fill="url(#astro-visor)" />
          
          {/* Visor Reflection */}
          <path d="M 38 68 Q 60 70 82 68 L 80 72 Q 60 74 40 72 Z" fill="#ffffff" opacity="0.1" />

          {/* Digital Glowing Eyes */}
          <g className="astro-eyes">
            <circle cx="48" cy="78" r="4.5" fill="#c084fc" filter="drop-shadow(0 0 5px #c084fc)" />
            <circle cx="72" cy="78" r="4.5" fill="#c084fc" filter="drop-shadow(0 0 5px #c084fc)" />
          </g>
        </g>

        {/* Floating Left Paw */}
        <g className="astro-paw-l">
          <rect x="18" y="85" width="16" height="16" rx="8" fill="url(#astro-metal)" stroke="#cbd5e1" strokeWidth="1.5" />
          <circle cx="26" cy="93" r="3.5" fill="url(#astro-glow)" />
        </g>

        {/* Floating Right Paw */}
        <g className="astro-paw-r">
          <rect x="86" y="85" width="16" height="16" rx="8" fill="url(#astro-metal)" stroke="#cbd5e1" strokeWidth="1.5" />
          <circle cx="94" cy="93" r="3.5" fill="url(#astro-glow)" />
        </g>
      </svg>
    </div>
  );
}
