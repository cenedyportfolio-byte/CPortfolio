"use client";

import { SectionWrapper, motionItem } from "@/components/layout/SectionWrapper";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";

export function FeaturedProjectsSection() {
  const projects = [
    {
      title: "SAVIOR",
      subtitle: "Intelligent Security System",
      description: "AI-powered personal safety app with voice commands, emergency alerts and real-time location.",
      gradient: "from-primary via-primary/80 to-secondary",
      tags: ["Flutter", "Firebase", "Alan AI", "Dart"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Pokemon Trading Platform",
      subtitle: "Trading Platform",
      description: "Trading platform integrated with Shopify for Pokemon card collectors.",
      gradient: "from-accent via-accent/80 to-success",
      tags: ["Node.js", "React", "MongoDB"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "LCE Backend System",
      subtitle: "Backend System",
      description: "Modular Laravel backend with REST APIs for scalable application services.",
      gradient: "from-secondary via-secondary/80 to-accent",
      tags: ["Laravel", "React", "MySQL"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Real-Time Chat App",
      subtitle: "Real-Time Chat",
      description: "Real-time messaging platform using WebSockets for low latency communication.",
      gradient: "from-success via-success/80 to-primary",
      tags: ["Node.js", "TypeScript", "Socket.IO"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "IntelliDemo AI",
      subtitle: "AI Demo Platform",
      description: "AI-powered demo platform with dynamic content generation capabilities.",
      gradient: "from-warning via-warning/80 to-primary",
      tags: ["React", "Node.js", "OpenAI"],
      github: "https://github.com",
      demo: "https://example.com",
    },
  ];

  return (
    <SectionWrapper id="projects" className="bg-background">
      <motion.div variants={motionItem} className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A selection of my best work.
          </p>
        </div>
        <a href="#" className="text-primary text-sm font-medium hover:underline mt-4 md:mt-0 flex items-center gap-1">
          View All Projects →
        </a>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {projects.map((project, index) => (
          <motion.div key={project.title} variants={motionItem} custom={index}>
            <div className="group bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col">
              
              {/* Image / Gradient Header */}
              <div className={`w-full h-36 relative overflow-hidden bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm z-10">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-colors">
                    <FaGithub size={18} />
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </div>
                <span className="text-white/30 text-5xl font-bold group-hover:scale-110 transition-transform duration-500">{project.title.substring(0, 2)}</span>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-base font-bold text-foreground mb-0.5 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-primary font-medium mb-2">{project.subtitle}</p>
                <p className="text-xs text-muted-foreground mb-4 flex-1 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5 bg-muted text-muted-foreground border-none">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
