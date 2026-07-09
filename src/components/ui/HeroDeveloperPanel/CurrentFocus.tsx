"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";

const projects = [
  { emoji: "🚀", name: "PokePixel", desc: "AI Inventory Platform" },
  { emoji: "🧺", name: "Laundry Care Express", desc: "Subscription Commerce Platform" },
  { emoji: "🤖", name: "AI Automation", desc: "Workflow Intelligence" },
];

function ProgressRing({ progress }: { progress: number }) {
  const r = 13;
  const circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;
  return (
    <svg width="34" height="34" className="shrink-0 -rotate-90" aria-hidden="true">
      <circle
        cx="17" cy="17" r={r}
        fill="none" stroke="currentColor" strokeWidth="2"
        className="text-foreground/[0.04] dark:text-white/[0.06]"
      />
      <motion.circle
        cx="17" cy="17" r={r}
        fill="none" stroke="url(#focus-ring-grad)" strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <defs>
        <linearGradient id="focus-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function CurrentFocus() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % projects.length), 7000);
    return () => clearInterval(timer);
  }, []);

  const project = projects[idx];

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-3">
        <Rocket className="w-3.5 h-3.5 text-primary/60" />
        <span className="text-[11px] font-semibold text-foreground/60 uppercase tracking-[0.12em]">
          Current Focus
        </span>
      </div>

      <div className="flex items-center gap-3">
        <ProgressRing progress={68} />
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[12.5px] font-bold text-foreground leading-tight truncate">
                {project.emoji} {project.name}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                {project.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Now Building Badge */}
      <div className="flex items-center gap-1.5 mt-2.5 ml-[46px]">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-[5px] h-[5px] rounded-full bg-emerald-500"
        />
        <span className="text-[8.5px] font-semibold text-emerald-600/70 dark:text-emerald-400/70 uppercase tracking-[0.1em]">
          Now Building
        </span>
      </div>
    </div>
  );
}
