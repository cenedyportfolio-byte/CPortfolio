"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 36 }: LogoProps) {
  return (
    <div 
      className={`relative group select-none shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Neobrutalist Hard Offset Shadow */}
      <div 
        className="absolute inset-0 bg-foreground rounded-lg translate-x-[3.5px] translate-y-[3.5px] transition-transform duration-200 group-hover:translate-x-[2px] group-hover:translate-y-[2px] dark:bg-white"
        style={{ width: size, height: size }}
      />
      
      {/* Main Interactive Badge */}
      <div 
        className="relative h-full w-full bg-gradient-to-br from-primary via-indigo-600 to-accent border-2 border-foreground dark:border-white rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-[1.5px] group-hover:-translate-x-[1.5px]"
      >
        {/* Customized Geometric SVG for the brand letters C & P */}
        <svg
          viewBox="0 0 100 100"
          className="w-5/6 h-5/6 fill-none stroke-white stroke-[8] stroke-round stroke-linejoin transition-transform duration-300 group-hover:rotate-6"
        >
          {/* Stylized 'C' letter */}
          <path d="M 48 32 A 18 18 0 1 0 48 68" strokeLinecap="round" />
          
          {/* Intersecting/styled 'P' letter */}
          <path d="M 58 68 L 58 32 A 9 9 0 0 1 58 50 H 58" strokeLinecap="round" />
          
          {/* Subtle futuristic accent dot */}
          <circle cx="76" cy="38" r="4.5" className="fill-white stroke-none" />
        </svg>
      </div>
    </div>
  );
}
