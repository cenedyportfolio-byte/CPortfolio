"use client";

import { SectionWrapper, motionItem } from "@/components/layout/SectionWrapper";
import { motion } from "framer-motion";
import { Layout, Server, Database, Cloud, Bot, Smartphone } from "lucide-react";

export function TechStackSection() {
  const categories = [
    {
      title: "Frontend",
      icon: <Layout className="w-5 h-5" />,
      color: "text-primary",
      bg: "bg-primary/10",
      dotColor: "bg-primary",
      skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    },
    {
      title: "Backend",
      icon: <Server className="w-5 h-5" />,
      color: "text-success",
      bg: "bg-success/10",
      dotColor: "bg-success",
      skills: ["Node.js", "Laravel", "PHP", "REST APIs", "WebSockets"],
    },
    {
      title: "Mobile & Desktop",
      icon: <Smartphone className="w-5 h-5" />,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      dotColor: "bg-rose-500",
      skills: ["Flutter", "Dart", "NativePHP", "Android Studio"],
    },
    {
      title: "Databases",
      icon: <Database className="w-5 h-5" />,
      color: "text-accent",
      bg: "bg-accent/10",
      dotColor: "bg-accent",
      skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
    },
    {
      title: "DevOps & Tools",
      icon: <Cloud className="w-5 h-5" />,
      color: "text-warning",
      bg: "bg-warning/10",
      dotColor: "bg-warning",
      skills: ["Docker", "Git / GitHub", "Linux", "Postman", "VPS Deployment", "CI/CD"],
    },
    {
      title: "AI & Others",
      icon: <Bot className="w-5 h-5" />,
      color: "text-secondary",
      bg: "bg-secondary/10",
      dotColor: "bg-secondary",
      skills: ["Python", "TensorFlow", "OpenCV", "Machine Learning", "NLP"],
    },
  ];

  return (
    <SectionWrapper id="skills" className="bg-white">
      <motion.div variants={motionItem} className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
          Tech I Work With
        </h2>
      </motion.div>

      <motion.div variants={motionItem} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
        {categories.map((category) => (
          <div key={category.title}>
            {/* Category Header */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className={`w-9 h-9 rounded-lg ${category.bg} ${category.color} flex items-center justify-center`}>
                {category.icon}
              </div>
              <h3 className="text-base font-bold text-foreground">{category.title}</h3>
            </div>

            {/* Skills List */}
            <ul className="space-y-2.5">
              {category.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <span className={`w-2 h-2 rounded-full ${category.dotColor} shrink-0`} />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
