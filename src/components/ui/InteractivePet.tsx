"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function InteractivePet() {
  const [isIdle, setIsIdle] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Smooth springs for position - tuned for a "floaty drone" feel
  const springConfig = { damping: 20, stiffness: 100, mass: 0.8 };
  const petX = useSpring(-100, springConfig); // Start offscreen
  const petY = useSpring(-100, springConfig);
  
  // Spring for rotation based on movement direction
  const rotation = useSpring(0, { damping: 15, stiffness: 80 });

  useEffect(() => {
    // Show pet shortly after load
    const initTimer = setTimeout(() => setIsVisible(true), 1500);

    let idleTimeout: NodeJS.Timeout;
    let lastX = window.innerWidth / 2;

    const handleMouseMove = (e: MouseEvent) => {
      setIsIdle(false);
      clearTimeout(idleTimeout);

      // Target position: offset slightly to the bottom right of the cursor
      // so it doesn't block the actual pointer visually
      const targetX = e.clientX + 20;
      const targetY = e.clientY + 20;

      petX.set(targetX);
      petY.set(targetY);

      // Calculate rotation based on movement direction (lean into the turn)
      const dx = targetX - lastX;
      rotation.set(Math.max(Math.min(dx * 0.5, 30), -30)); 
      lastX = targetX;

      idleTimeout = setTimeout(() => {
        setIsIdle(true);
        rotation.set(0); // level out when resting
      }, 1500);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    // Set initial position immediately if mouse is already on screen
    const initMouse = (e: MouseEvent) => {
      petX.set(e.clientX + 20);
      petY.set(e.clientY + 20);
      window.removeEventListener('mouseover', initMouse);
    };
    window.addEventListener('mouseover', initMouse);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", initMouse);
      clearTimeout(idleTimeout);
      clearTimeout(initTimer);
    };
  }, [petX, petY, rotation]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none drop-shadow-[0_4px_12px_rgba(99,102,241,0.3)] hidden md:block"
      style={{
        x: petX,
        y: petY,
        rotate: rotation,
      }}
    >
      {/* The Pet SVG (Cyber Wisp / Drone) */}
      <motion.div
        animate={{
          y: isIdle ? [0, -6, 0] : 0,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.1 }
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Holographic Aura */}
          <circle cx="24" cy="24" r="20" fill="url(#drone-aura)" />
          
          {/* Ears / Antennas */}
          <path d="M 18 16 L 14 6 L 20 14 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
          <path d="M 30 16 L 34 6 L 28 14 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
          
          {/* Body */}
          <rect x="14" y="18" width="20" height="16" rx="8" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
          
          {/* Visor */}
          <rect x="16" y="21" width="16" height="8" rx="4" fill="#0f172a" />
          
          {/* Eyes (Blink or look happy when idle/clicking) */}
          {!isIdle && !isClicking && (
            <>
              <circle cx="20" cy="25" r="1.5" fill="#c084fc" filter="drop-shadow(0 0 2px #c084fc)" />
              <circle cx="28" cy="25" r="1.5" fill="#c084fc" filter="drop-shadow(0 0 2px #c084fc)" />
            </>
          )}

          {(isIdle || isClicking) && (
            <>
              {/* Happy/Squinting eyes */}
              <path d="M 18 25 Q 20 23 22 25" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" fill="none" filter="drop-shadow(0 0 2px #c084fc)" />
              <path d="M 26 25 Q 28 23 30 25" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" fill="none" filter="drop-shadow(0 0 2px #c084fc)" />
            </>
          )}
          
          {/* Sleep Zzzs */}
          {isIdle && (
            <g stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" opacity="0.8">
              <path d="M 32 8 L 38 8 L 32 14 L 38 14" />
              <path d="M 38 2 L 42 2 L 38 6 L 42 6" strokeWidth="1" />
            </g>
          )}

          {/* Thruster Glow (when moving) */}
          {!isIdle && (
            <path d="M 20 36 L 24 42 L 28 36 Z" fill="#c084fc" filter="blur(2px)" className="animate-pulse" />
          )}

          <defs>
            <radialGradient id="drone-aura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  );
}
