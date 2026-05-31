"use client";

import { SectionWrapper, motionItem } from "@/components/layout/SectionWrapper";
import { motion } from "framer-motion";
import { Search, Map, Palette, Terminal, Rocket, LineChart } from "lucide-react";

export function ProcessSection() {
  const processSteps = [
    {
      id: "01",
      title: "Research",
      description: "I explore problems, user needs and market opportunities.",
      icon: <Search className="w-7 h-7" />,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      id: "02",
      title: "Planning",
      description: "I define requirements, features and create system architecture.",
      icon: <Map className="w-7 h-7" />,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      id: "03",
      title: "UI/UX Design",
      description: "I design intuitive, human-focused interfaces focused on user experience.",
      icon: <Palette className="w-7 h-7" />,
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      id: "04",
      title: "Development",
      description: "I build scalable frontend and backend with clean code.",
      icon: <Terminal className="w-7 h-7" />,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      id: "05",
      title: "Deployment",
      description: "I test, deploy and ensure performance and security.",
      icon: <Rocket className="w-7 h-7" />,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      id: "06",
      title: "Growth",
      description: "I monitor, analyze and continuously improve the product.",
      icon: <LineChart className="w-7 h-7" />,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  return (
    <SectionWrapper id="process" className="bg-background">
      <motion.div variants={motionItem} className="mb-12">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">My Process</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          From Idea to Impact
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl">
          I follow a complete product development lifecycle to build solutions that solve real problems.
        </p>
      </motion.div>

      {/* Horizontal Timeline */}
      <motion.div variants={motionItem} className="relative">
        {/* Connector Line — Desktop */}
        <div className="hidden md:block absolute top-[36px] left-[8%] right-[8%] h-0.5 border-t-2 border-dashed border-border z-0" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={motionItem}
              custom={index}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon */}
              <div className={`w-[72px] h-[72px] rounded-2xl ${step.bg} ${step.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 relative`}>
                {step.icon}
              </div>

              {/* Step Number */}
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                {step.id}
              </span>

              {/* Title */}
              <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed px-1">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
