"use client";

import { useRef, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { DeveloperStatus } from "./DeveloperStatus";
import { ExpertiseCard } from "./ExpertiseCard";
import { CurrentFocus } from "./CurrentFocus";
import { LiveTerminal } from "./LiveTerminal";
import { QuickStats } from "./QuickStats";
import { FloatingParticles } from "./FloatingParticles";

function Divider() {
  return (
    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent" />
  );
}

export function HeroDeveloperPanel() {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // 3D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [2.5, -2.5]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-2.5, 2.5]), { stiffness: 120, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX - rect.left}px`;
        glowRef.current.style.top = `${e.clientY - rect.top}px`;
        glowRef.current.style.opacity = "1";
      }
    },
    [mx, my]
  );

  const handleMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
    if (glowRef.current) glowRef.current.style.opacity = "0";
  }, [mx, my]);

  return (
    <>
      {/* ─── Desktop / Tablet ─── */}
      <motion.div
        initial={{ opacity: 0, x: -20, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 hidden md:block"
        style={{ perspective: 900 }}
        aria-label="Developer Control Center"
        role="complementary"
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY }}
          animate={{ y: [0, -8, 0] }}
          transition={{ y: { repeat: Infinity, duration: 6, ease: "easeInOut" } }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 35px 90px rgba(0,0,0,0.18)",
            transition: { duration: 0.25 },
          }}
          className="relative w-[272px] lg:w-[300px] rounded-[28px] overflow-hidden cursor-default will-change-transform"
        >
          {/* Glass */}
          <div className="absolute inset-0 bg-white/[0.58] dark:bg-white/[0.05] backdrop-blur-[22px] border border-white/[0.18] dark:border-white/[0.08] rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,0.12)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.5)]" />

          {/* Mouse Glow */}
          <div
            ref={glowRef}
            className="absolute w-40 h-40 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
            style={{
              background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
              opacity: 0,
            }}
          />

          {/* Subtle Gradient Shimmer */}
          <motion.div
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-[28px] opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(135deg, #6366f1, #3B82F6, #06b6d4, #6366f1)",
              backgroundSize: "300% 300%",
            }}
          />

          {/* Particles */}
          <FloatingParticles />

          {/* Content */}
          <div className="relative z-10 p-5 lg:p-[22px] flex flex-col gap-[14px]">
            <DeveloperStatus />
            <Divider />
            <ExpertiseCard />
            <Divider />
            <CurrentFocus />
            <Divider />
            <LiveTerminal />
            <Divider />
            <QuickStats />
          </div>
        </motion.div>
      </motion.div>

      {/* ─── Mobile Collapsed Card ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute top-[108px] left-3 right-3 z-20 md:hidden"
      >
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="w-full flex items-center justify-between bg-white/[0.58] dark:bg-white/[0.05] backdrop-blur-[22px] border border-white/[0.18] dark:border-white/[0.08] rounded-2xl px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)] cursor-pointer"
          aria-expanded={mobileOpen}
          aria-controls="mobile-dev-panel"
          aria-label="Toggle developer panel"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-[6px] h-[6px] rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]"
            />
            <span className="text-[11px] font-semibold text-foreground/80 uppercase tracking-[0.1em]">
              Developer Status
            </span>
            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Available
            </span>
          </div>
          <motion.div
            animate={{ rotate: mobileOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </button>

        {mobileOpen && (
          <motion.div
            id="mobile-dev-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 bg-white/[0.58] dark:bg-white/[0.05] backdrop-blur-[22px] border border-white/[0.18] dark:border-white/[0.08] rounded-2xl p-4 shadow-[0_15px_50px_rgba(0,0,0,0.1)] overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              <ExpertiseCard />
              <Divider />
              <CurrentFocus />
              <Divider />
              <QuickStats />
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
