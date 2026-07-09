"use client";

import { TrendingUp } from "lucide-react";
import { SkillBar } from "./SkillBar";

const skills = [
  { label: "Laravel", level: "Expert", pct: 95 },
  { label: "Node.js", level: "Expert", pct: 92 },
  { label: "AI Engineering", level: "Advanced", pct: 88 },
  { label: "Cloud Architecture", level: "Advanced", pct: 84 },
];

export function ExpertiseCard() {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-3">
        <TrendingUp className="w-3.5 h-3.5 text-primary/60" />
        <span className="text-[11px] font-semibold text-foreground/60 uppercase tracking-[0.12em]">
          Core Expertise
        </span>
      </div>
      <div className="flex flex-col gap-[10px]">
        {skills.map((skill, i) => (
          <SkillBar
            key={skill.label}
            label={skill.label}
            level={skill.level}
            percentage={skill.pct}
            delay={i * 0.12}
          />
        ))}
      </div>
    </div>
  );
}
