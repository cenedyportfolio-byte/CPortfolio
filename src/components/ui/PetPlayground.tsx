"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

type PetType = 'cat' | 'dog' | 'bunny' | 'fox' | 'turtle' | 'mouse';
type PetAction = 'idle' | 'walking' | 'running' | 'playing' | 'sleeping';

interface Pet {
  id: string;
  type: PetType;
  x: number;
  action: PetAction;
  direction: 1 | -1;
  emoji?: boolean; // Show heart when playing
}

const PET_TYPES: PetType[] = ['cat', 'dog', 'bunny', 'fox', 'turtle', 'mouse'];

export function PetPlayground() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initialPets: Pet[] = PET_TYPES.map((type, i) => ({
      id: `pet-${type}`,
      type,
      // Distribute them evenly across the screen width
      x: (window.innerWidth / (PET_TYPES.length + 1)) * (i + 1),
      action: 'idle',
      direction: Math.random() > 0.5 ? 1 : -1,
    }));
    setPets(initialPets);

    const updateInterval = setInterval(() => {
      setPets(currentPets => {
        let newPets = [...currentPets];

        // 1. Social Interactions (Playing)
        for (let i = 0; i < newPets.length; i++) {
          for (let j = i + 1; j < newPets.length; j++) {
            const dist = Math.abs(newPets[i].x - newPets[j].x);
            // If they are close and not already playing/sleeping
            if (dist < 80 && newPets[i].action !== 'playing' && newPets[j].action !== 'playing') {
               // 20% chance to start playing when they meet
               if (Math.random() > 0.8) {
                 newPets[i].action = 'playing';
                 newPets[j].action = 'playing';
                 newPets[i].emoji = true;
                 newPets[j].emoji = true;
                 
                 // Face each other
                 newPets[i].direction = newPets[i].x < newPets[j].x ? 1 : -1;
                 newPets[j].direction = newPets[j].x < newPets[i].x ? 1 : -1;
               }
            }
          }
        }

        // 2. Individual Pet Logic
        return newPets.map(pet => {
          let { x, action, direction, emoji } = pet;

          // State transitions (random logic)
          if (Math.random() < 0.08) { // 8% chance every tick to change action
            const rand = Math.random();
            if (action === 'playing') {
               action = 'idle'; // Stop playing
               emoji = false;
            } else if (rand < 0.15) {
               action = 'sleeping';
            } else if (rand < 0.35) {
               action = 'idle';
            } else if (rand < 0.75) {
               action = 'walking';
            } else {
               action = 'running';
            }

            // Randomly change direction when starting to move
            if (['walking', 'running'].includes(action)) {
              if (Math.random() > 0.4) direction = direction === 1 ? -1 : 1; // 60% chance to flip
            }
          }

          // Movement Calculation
          let speed = 0;
          if (action === 'walking') speed = 8; // Pixels per tick
          if (action === 'running') speed = 18;
          // Turtles are slow
          if (pet.type === 'turtle') speed = speed * 0.5;
          // Mice are fast
          if (pet.type === 'mouse') speed = speed * 1.5;
          
          if (speed > 0) {
             x += speed * direction;
             // Keep them within bounds (padding from edges)
             if (x < 30) { x = 30; direction = 1; }
             if (x > window.innerWidth - 80) { x = window.innerWidth - 80; direction = -1; }
          }

          return { ...pet, x, action, direction, emoji };
        });
      });
    }, 250); // 4 Updates per second (Lightweight! CSS Handles the smoothness)

    return () => clearInterval(updateInterval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 z-[9998] pointer-events-none overflow-visible hidden md:block">
      {pets.map(pet => (
        <div
          key={pet.id}
          className="absolute bottom-4 left-0 will-change-transform"
          style={{
            transform: `translateX(${pet.x}px) scaleX(${pet.direction})`,
            transition: 'transform 0.25s linear', // Perfectly matches the 250ms interval!
          }}
        >
          <div className="relative">
             {/* Interaction Emoji */}
             <AnimatePresence>
               {pet.emoji && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10, scale: 0 }}
                   animate={{ opacity: 1, y: -20, scale: 1 }}
                   exit={{ opacity: 0, scale: 0 }}
                   className="absolute -top-8 left-1/2 -translate-x-1/2 text-pink-500"
                 >
                   <Heart size={16} className="fill-pink-500 animate-pulse" />
                 </motion.div>
               )}
             </AnimatePresence>
             
             {/* Pet SVG with internal CSS animations based on action */}
             <div className={`
               transition-transform duration-300
               ${pet.action === 'playing' ? 'animate-bounce' : ''}
               ${pet.action === 'sleeping' ? 'translate-y-2 opacity-80' : ''}
               ${pet.action === 'running' ? '-skew-x-12' : ''}
             `}>
               {pet.type === 'cat' && <CyberCat action={pet.action} />}
               {pet.type === 'dog' && <DataDog action={pet.action} />}
               {pet.type === 'bunny' && <ByteBunny action={pet.action} />}
               {pet.type === 'fox' && <FireFox action={pet.action} />}
               {pet.type === 'turtle' && <TechTurtle action={pet.action} />}
               {pet.type === 'mouse' && <MicroMouse action={pet.action} />}
             </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// Pet SVGs - Colorful Updates
// ==========================================

const CyberCat = ({ action }: { action: PetAction }) => (
  <svg width="48" height="32" viewBox="0 0 48 32" fill="none" className="drop-shadow-[0_0_8px_rgba(14,165,233,0.6)]">
    <path d="M 12 24 Q 4 24 6 12" stroke="#e0f2fe" strokeWidth="2" fill="none" className={action === 'running' ? 'animate-pulse' : ''} />
    <rect x="10" y="14" width="22" height="14" rx="6" fill="#0ea5e9" stroke="#e0f2fe" strokeWidth="1.5" />
    <rect x="26" y="8" width="16" height="14" rx="4" fill="#0ea5e9" stroke="#e0f2fe" strokeWidth="1.5" />
    <path d="M 28 8 L 30 2 L 34 8 Z" fill="#e0f2fe" />
    <path d="M 36 8 L 38 2 L 42 8 Z" fill="#e0f2fe" />
    {action === 'sleeping' ? (
       <path d="M 30 14 L 34 14 M 36 14 L 40 14" stroke="#0f172a" strokeWidth="1.5" />
    ) : (
      <>
        <circle cx="32" cy="14" r="1.5" fill="#0f172a" />
        <circle cx="38" cy="14" r="1.5" fill="#0f172a" />
      </>
    )}
  </svg>
);

const DataDog = ({ action }: { action: PetAction }) => (
  <svg width="48" height="32" viewBox="0 0 48 32" fill="none" className="drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">
    <path d="M 10 18 L 4 14" stroke="#dcfce7" strokeWidth="2.5" strokeLinecap="round" className={action === 'playing' || action === 'running' ? 'animate-bounce' : ''} />
    <rect x="8" y="14" width="24" height="14" rx="5" fill="#22c55e" stroke="#dcfce7" strokeWidth="1.5" />
    <rect x="28" y="10" width="16" height="16" rx="6" fill="#22c55e" stroke="#dcfce7" strokeWidth="1.5" />
    <path d="M 32 12 Q 28 20 28 24 Q 34 22 36 12 Z" fill="#dcfce7" />
    <rect x="40" y="18" width="6" height="6" rx="2" fill="#dcfce7" />
    {action === 'sleeping' ? (
       <path d="M 34 15 L 36 15 M 40 15 L 42 15" stroke="#0f172a" strokeWidth="1.5" />
    ) : (
      <>
        <rect x="34" y="14" width="2" height="3" rx="1" fill="#0f172a" />
        <rect x="40" y="14" width="2" height="3" rx="1" fill="#0f172a" />
      </>
    )}
  </svg>
);

const ByteBunny = ({ action }: { action: PetAction }) => (
  <svg width="40" height="32" viewBox="0 0 40 32" fill="none" className="drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]">
    <circle cx="8" cy="24" r="3" fill="#fce7f3" className={action === 'walking' ? 'animate-bounce' : ''} />
    <circle cx="20" cy="20" r="10" fill="#ec4899" stroke="#fce7f3" strokeWidth="1.5" />
    <circle cx="28" cy="16" r="8" fill="#ec4899" stroke="#fce7f3" strokeWidth="1.5" />
    {action === 'sleeping' ? (
      <>
        <rect x="24" y="8" width="3" height="8" rx="1.5" fill="#fce7f3" transform="rotate(-30 24 8)" />
        <rect x="30" y="8" width="3" height="8" rx="1.5" fill="#fce7f3" transform="rotate(-15 30 8)" />
        <path d="M 28 16 L 32 16" stroke="#0f172a" strokeWidth="1.5" />
      </>
    ) : (
      <>
        <rect x="24" y="2" width="3" height="10" rx="1.5" fill="#fce7f3" transform="rotate(15 24 2)" />
        <rect x="30" y="2" width="3" height="10" rx="1.5" fill="#fce7f3" transform="rotate(25 30 2)" />
        <circle cx="30" cy="14" r="1.5" fill="#0f172a" />
      </>
    )}
  </svg>
);

const FireFox = ({ action }: { action: PetAction }) => (
  <svg width="48" height="32" viewBox="0 0 48 32" fill="none" className="drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
    <path d="M 12 24 Q -4 20 6 10 Q 14 6 14 16" fill="#f97316" stroke="#ffedd5" strokeWidth="1.5" className={action === 'running' ? 'animate-bounce' : ''} />
    <rect x="12" y="14" width="20" height="14" rx="4" fill="#f97316" stroke="#ffedd5" strokeWidth="1.5" />
    <rect x="24" y="8" width="18" height="14" rx="4" fill="#f97316" stroke="#ffedd5" strokeWidth="1.5" />
    <path d="M 26 8 L 28 2 L 32 8 Z" fill="#ffedd5" />
    <path d="M 36 8 L 38 2 L 42 8 Z" fill="#ffedd5" />
    <path d="M 42 16 L 48 16 L 42 20 Z" fill="#ffedd5" />
    {action === 'sleeping' ? (
       <path d="M 30 14 L 34 14 M 36 14 L 40 14" stroke="#0f172a" strokeWidth="1.5" />
    ) : (
      <>
        <circle cx="32" cy="14" r="1.5" fill="#0f172a" />
        <circle cx="38" cy="14" r="1.5" fill="#0f172a" />
      </>
    )}
  </svg>
);

const TechTurtle = ({ action }: { action: PetAction }) => (
  <svg width="48" height="32" viewBox="0 0 48 32" fill="none" className="drop-shadow-[0_0_8px_rgba(20,184,166,0.6)]">
    <path d="M 8 28 Q 8 10 24 10 Q 40 10 40 28 Z" fill="#14b8a6" stroke="#ccfbf1" strokeWidth="1.5" />
    <circle cx="40" cy="24" r="5" fill="#14b8a6" stroke="#ccfbf1" strokeWidth="1" className={action === 'sleeping' ? '-translate-x-4 transition-transform' : ''} />
    <path d="M 8 26 L 2 28 L 8 28 Z" fill="#ccfbf1" />
    {action === 'sleeping' ? (
       <path d="M 38 23 L 42 23" stroke="#0f172a" strokeWidth="1" />
    ) : (
       <circle cx="42" cy="23" r="1" fill="#0f172a" />
    )}
    <rect x="14" y="28" width="4" height="4" rx="1" fill="#ccfbf1" className={action === 'walking' || action === 'running' ? 'animate-ping' : ''} />
    <rect x="30" y="28" width="4" height="4" rx="1" fill="#ccfbf1" className={action === 'walking' || action === 'running' ? 'animate-ping' : ''} />
  </svg>
);

const MicroMouse = ({ action }: { action: PetAction }) => (
  <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]">
    <path d="M 8 20 Q 0 20 4 12" stroke="#ede9fe" strokeWidth="1.5" fill="none" className={action === 'running' ? 'animate-pulse' : ''} />
    <path d="M 8 20 Q 8 12 16 12 Q 28 12 28 20 Z" fill="#8b5cf6" stroke="#ede9fe" strokeWidth="1" />
    <circle cx="20" cy="10" r="4" fill="#ede9fe" />
    {action === 'sleeping' ? (
       <path d="M 22 16 L 26 16" stroke="#0f172a" strokeWidth="1" />
    ) : (
       <circle cx="24" cy="16" r="1.5" fill="#0f172a" />
    )}
  </svg>
);
