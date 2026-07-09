"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const taglines = [
  "Building scalable backend systems.",
  "Designing AI-powered products.",
  "Cloud-native architecture.",
  "Turning ideas into production software.",
];

export function DeveloperStatus() {
  const [taglineIdx, setTaglineIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIdx((i) => (i + 1) % taglines.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[14px]" role="img" aria-label="Developer">👨‍💻</span>
          <span className="text-[11px] font-semibold text-foreground/70 uppercase tracking-[0.12em]">
            Developer Status
          </span>
        </div>
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0 0 16px rgba(16,185,129,0.3)" }}
          className="flex items-center gap-1.5 bg-emerald-500/10 dark:bg-emerald-500/15 px-2.5 py-[5px] rounded-full cursor-default transition-shadow duration-250"
        >
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[6px] h-[6px] rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
          />
          <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.14em]">
            Available for Work
          </span>
        </motion.div>
      </div>

      {/* Subtitle */}
      <div className="ml-[26px] -mt-0.5">
        <p className="text-[11px] font-medium text-foreground/55 leading-tight">
          Senior Backend Engineer
        </p>
        <p className="text-[10px] font-medium text-foreground/40 leading-tight">
          AI Product Builder
        </p>
      </div>

      {/* Rotating Tagline */}
      <div className="ml-[26px] h-[16px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={taglineIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[9.5px] font-medium text-primary/50 italic tracking-wide"
          >
            {taglines[taglineIdx]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
