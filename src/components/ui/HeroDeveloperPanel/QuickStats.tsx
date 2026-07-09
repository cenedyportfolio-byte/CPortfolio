"use client";

import { AnimatedCounter } from "./AnimatedCounter";

const stats = [
  { value: 20, suffix: "+", label: "Projects", emoji: "📂" },
  { value: 5, suffix: "+", label: "Experience", emoji: "⏳" },
  { value: 3, suffix: "", label: "Countries", emoji: "🌍" },
  { value: 100, suffix: "%", label: "Dedication", emoji: "💜" },
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-2 bg-foreground/[0.02] dark:bg-white/[0.03] rounded-xl px-2.5 py-[7px] border border-foreground/[0.03] dark:border-white/[0.04] hover:bg-foreground/[0.04] dark:hover:bg-white/[0.06] transition-colors duration-200 cursor-default"
        >
          <span className="text-[12px] leading-none" role="img" aria-label={stat.label}>
            {stat.emoji}
          </span>
          <div>
            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            <p className="text-[7.5px] font-semibold text-muted-foreground uppercase tracking-[0.12em] -mt-[1px]">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
