"use client";

import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 36 }: LogoProps) {
  return (
    <div 
      className={`relative flex items-center justify-center shrink-0 cursor-pointer ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer spinning dashed ring */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full text-primary drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
      >
        <circle 
          cx="50" cy="50" r="46" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeDasharray="16 16"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Inner counter-spinning solid ring */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full text-accent drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]"
        animate={{ rotate: -360, scale: [0.95, 1.05, 0.95] }}
        transition={{ 
          rotate: { duration: 12, ease: "linear", repeat: Infinity },
          scale: { duration: 2, ease: "easeInOut", repeat: Infinity } 
        }}
      >
        <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="50 15 15 15" strokeLinecap="round" />
      </motion.svg>

      {/* The C & P Monogram */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center text-foreground z-10 drop-shadow-md"
        initial={{ rotateY: 0 }}
        whileHover={{ rotateY: 180, scale: 1.15 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
      >
        <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] fill-none stroke-current stroke-[10] stroke-linecap-round stroke-linejoin-round">
          {/* Stylized 'C' letter */}
          <path d="M 52 24 A 24 24 0 1 0 52 76" strokeLinecap="round" />
          {/* Intersecting/styled 'P' letter */}
          <path d="M 60 76 L 60 24 A 14 14 0 0 1 60 52 H 60" strokeLinecap="round" />
        </svg>
      </motion.div>
      
      {/* Glowing center dot */}
      <motion.div
        className="absolute w-[18%] h-[18%] bg-primary rounded-full z-0 shadow-[0_0_15px_rgba(99,102,241,1)]"
        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}
