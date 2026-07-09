"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  CheckCircle2,
  Rocket,
  Terminal,
  Globe,
  FolderGit2,
  Clock,
  Users,
  TrendingUp,
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────── */

const expertise = [
  { label: "Laravel", pct: 95 },
  { label: "Node.js", pct: 92 },
  { label: "AI Engineering", pct: 88 },
  { label: "Cloud Architecture", pct: 84 },
];

const projects = [
  { name: "PokePixel", desc: "Building AI-powered inventory management" },
  { name: "Laundry Care Express", desc: "Streamlining logistics with automation" },
  { name: "AI Automation", desc: "Intelligent workflow orchestration" },
];

const terminalLines = [
  { cmd: "git commit", result: "Production Ready" },
  { cmd: "npm run build", result: "Success" },
  { cmd: "docker compose up", result: "Running" },
];

const stats = [
  { value: 20, suffix: "+", label: "Projects", icon: <FolderGit2 className="w-3.5 h-3.5" /> },
  { value: 5, suffix: "+", label: "Years", icon: <Clock className="w-3.5 h-3.5" /> },
  { value: 3, suffix: "", label: "Countries", icon: <Globe className="w-3.5 h-3.5" /> },
  { value: 99, suffix: "%", label: "Satisfaction", icon: <Users className="w-3.5 h-3.5" /> },
];

/* ─── Animated Counter ──────────────────────────────────────────── */

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="text-lg font-bold text-foreground tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

/* ─── Typing Terminal ───────────────────────────────────────────── */

function TerminalBlock() {
  const [lines, setLines] = useState<{ cmd: string; result: string; typed: string; done: boolean }[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  // Typing animation
  useEffect(() => {
    let cancelled = false;

    async function typeLines() {
      for (let i = 0; i < terminalLines.length; i++) {
        if (cancelled) return;
        const { cmd, result } = terminalLines[i];
        // Type each character
        for (let c = 0; c <= cmd.length; c++) {
          if (cancelled) return;
          await new Promise((r) => setTimeout(r, 45 + Math.random() * 30));
          setLines((prev) => {
            const updated = [...prev];
            updated[i] = { cmd, result, typed: cmd.slice(0, c), done: false };
            return updated;
          });
        }
        // Small pause then show result
        await new Promise((r) => setTimeout(r, 400));
        if (cancelled) return;
        setLines((prev) => {
          const updated = [...prev];
          updated[i] = { cmd, result, typed: cmd, done: true };
          return updated;
        });
        await new Promise((r) => setTimeout(r, 300));
      }
    }

    typeLines();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="bg-[#0a0a0a] dark:bg-black/80 rounded-xl p-3 font-mono text-[11px] leading-relaxed overflow-hidden border border-white/5">
      {lines.map((line, i) => (
        <div key={i} className="mb-1 last:mb-0">
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400/80">$</span>
            <span className="text-zinc-300">
              {line.typed}
              {!line.done && (
                <span
                  className="inline-block w-[6px] h-[13px] ml-0.5 -mb-[2px] bg-emerald-400/90"
                  style={{ opacity: cursorVisible ? 1 : 0 }}
                />
              )}
            </span>
          </div>
          {line.done && (
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 ml-3 mt-0.5"
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400/90">{line.result}</span>
            </motion.div>
          )}
        </div>
      ))}
      {lines.length === 0 && (
        <div className="flex items-center gap-1.5">
          <span className="text-emerald-400/80">$</span>
          <span
            className="inline-block w-[6px] h-[13px] bg-emerald-400/90"
            style={{ opacity: cursorVisible ? 1 : 0 }}
          />
        </div>
      )}
    </div>
  );
}

/* ─── Progress Ring ─────────────────────────────────────────────── */

function ProgressRing({ progress }: { progress: number }) {
  const r = 14;
  const circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;
  return (
    <svg width="36" height="36" className="shrink-0 -rotate-90">
      <circle cx="18" cy="18" r={r} fill="none" stroke="currentColor" strokeWidth="2.5" className="text-foreground/5" />
      <motion.circle
        cx="18"
        cy="18"
        r={r}
        fill="none"
        stroke="url(#ring-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
      <defs>
        <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */

export function DeveloperControlCenter() {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);

      // Glow follow
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX - rect.left}px`;
        glowRef.current.style.top = `${e.clientY - rect.top}px`;
      }
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Project rotation
  const [projectIdx, setProjectIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProjectIdx((i) => (i + 1) % projects.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentProject = projects[projectIdx];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-28 md:top-24 left-3 md:left-6 lg:left-8 z-20 hidden lg:block"
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        animate={{ y: [0, -6, 0] }}
        transition={{
          y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        }}
        className="relative w-[272px] rounded-[28px] overflow-hidden select-none"
      >
        {/* Glass Background */}
        <div className="absolute inset-0 bg-white/55 dark:bg-white/[0.06] backdrop-blur-[20px] border border-white/60 dark:border-white/10 rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]" />

        {/* Mouse Glow */}
        <div
          ref={glowRef}
          className="absolute w-32 h-32 bg-primary/15 dark:bg-primary/10 rounded-full blur-2xl pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ opacity: 0 }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "1";
          }}
        />

        {/* Gradient Shimmer Background */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-[28px] opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(135deg, #6366f1, #06b6d4, #6366f1, #06b6d4)",
            backgroundSize: "300% 300%",
          }}
        />

        {/* Content */}
        <div
          className="relative z-10 p-5 flex flex-col gap-4"
          onMouseEnter={() => {
            if (glowRef.current) glowRef.current.style.opacity = "1";
          }}
          onMouseLeave={() => {
            if (glowRef.current) glowRef.current.style.opacity = "0";
          }}
        >
          {/* ─── Header: Status ─── */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">👨‍💻</span>
              <span className="text-[11px] font-semibold text-foreground/80 uppercase tracking-wider">
                Developer Status
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 dark:bg-emerald-500/15 px-2.5 py-1 rounded-full">
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-[6px] h-[6px] rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]"
              />
              <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Online
              </span>
            </div>
          </div>

          <p className="text-[10px] font-medium text-muted-foreground -mt-2.5 ml-[26px] tracking-wide">
            Available for Opportunities
          </p>

          {/* ─── Divider ─── */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/8 to-transparent" />

          {/* ─── Section 1: Core Expertise ─── */}
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <TrendingUp className="w-3.5 h-3.5 text-primary/70" />
              <span className="text-[10px] font-semibold text-foreground/70 uppercase tracking-wider">
                Core Expertise
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {expertise.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  whileHover={{ scale: 1.02, x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="group/skill"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-primary/60 group-hover/skill:text-primary transition-colors" />
                      <span className="text-[11px] font-medium text-foreground/80 group-hover/skill:text-foreground transition-colors">
                        {skill.label}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-muted-foreground tabular-nums">
                      {skill.pct}%
                    </span>
                  </div>
                  <div className="h-[4px] bg-foreground/[0.04] dark:bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.pct}%` }}
                      transition={{
                        duration: 1.2,
                        delay: 0.8 + i * 0.15,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="h-full rounded-full relative overflow-hidden"
                      style={{
                        background: `linear-gradient(90deg, #6366f1, #06b6d4)`,
                      }}
                    >
                      {/* Shimmer */}
                      <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 2.5, delay: 1 + i * 0.3, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        style={{ width: "50%" }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ─── Divider ─── */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/8 to-transparent" />

          {/* ─── Section 2: Current Focus ─── */}
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <Rocket className="w-3.5 h-3.5 text-primary/70" />
              <span className="text-[10px] font-semibold text-foreground/70 uppercase tracking-wider">
                Current Focus
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ProgressRing progress={72} />
              <div className="flex-1 min-w-0">
                <motion.div
                  key={projectIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-[12px] font-bold text-foreground leading-tight truncate">
                    {currentProject.name}
                  </p>
                  <p className="text-[9px] text-muted-foreground leading-snug mt-0.5 line-clamp-2">
                    {currentProject.desc}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ─── Divider ─── */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/8 to-transparent" />

          {/* ─── Section 3: Live Activity (Terminal) ─── */}
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <Terminal className="w-3.5 h-3.5 text-primary/70" />
              <span className="text-[10px] font-semibold text-foreground/70 uppercase tracking-wider">
                Live Activity
              </span>
            </div>
            <TerminalBlock />
          </div>

          {/* ─── Divider ─── */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/8 to-transparent" />

          {/* ─── Section 4: Quick Stats ─── */}
          <div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex items-center gap-2 bg-foreground/[0.02] dark:bg-white/[0.03] rounded-xl px-2.5 py-2 border border-foreground/[0.03] dark:border-white/[0.05] hover:bg-foreground/[0.04] dark:hover:bg-white/[0.06] transition-colors"
                >
                  <div className="text-primary/50">{stat.icon}</div>
                  <div>
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    <p className="text-[8px] font-medium text-muted-foreground uppercase tracking-widest -mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
