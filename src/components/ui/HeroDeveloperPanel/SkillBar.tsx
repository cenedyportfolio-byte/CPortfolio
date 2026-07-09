"use client";

import { motion } from "framer-motion";

interface SkillBarProps {
  label: string;
  level: string;
  percentage: number;
  delay?: number;
}

export function SkillBar({ label, level, percentage, delay = 0 }: SkillBarProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, x: 3 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group/skill"
    >
      <div className="flex items-center justify-between mb-[5px]">
        <span className="text-[11.5px] font-medium text-foreground/75 group-hover/skill:text-foreground transition-colors duration-200">
          {label}
        </span>
        <span className="text-[9px] font-semibold text-primary/60 uppercase tracking-wider">
          {level}
        </span>
      </div>
      <div className="h-[5px] bg-foreground/[0.04] dark:bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 1.4,
            delay: 0.6 + delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #6366f1, #3B82F6, #06b6d4)",
          }}
        >
          <motion.div
            animate={{ x: ["-100%", "250%"] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: 1.2 + delay,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent"
            style={{ width: "40%" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
