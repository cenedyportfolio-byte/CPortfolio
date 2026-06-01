"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { SectionWrapper, motionItem } from "@/components/layout/SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function FeaturedProjectsSection() {
  const [mounted, setMounted] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<'pokemon' | 'lce' | 'chat' | null>(null);
  const [isOverCard, setIsOverCard] = useState<'pokemon' | 'lce' | 'chat' | null>(null);
  const [isOverMockup, setIsOverMockup] = useState<'pokemon' | 'lce' | 'chat' | null>(null);
  const [windowBlurred, setWindowBlurred] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Debounced/delayed state updater to bridge gap between leaving card and entering mockup without flickering
  useEffect(() => {
    if (isOverCard) {
      setHoveredProject(isOverCard);
    } else if (isOverMockup) {
      setHoveredProject(isOverMockup);
    } else {
      const timer = setTimeout(() => {
        setHoveredProject(null);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOverCard, isOverMockup]);

  useEffect(() => {
    const handleBlur = () => {
      if (hoveredProject) setWindowBlurred(true);
    };
    const handleFocus = () => setWindowBlurred(false);

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [hoveredProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hoveredProject) return;

      // Disable Save Page (Ctrl+S / Cmd+S)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
      }

      // Disable Print (Ctrl+P / Cmd+P)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
      }

      // Disable Copy (Ctrl+C / Cmd+C)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
        e.preventDefault();
      }

      // Disable Developer Tools: F12, Ctrl+Shift+I / Cmd+Opt+I
      if (e.key === 'F12' || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i')) {
        e.preventDefault();
      }

      // Detect PrintScreen and blur immediately
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        setWindowBlurred(true);
        setTimeout(() => setWindowBlurred(false), 3000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hoveredProject]);

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
      demo: "https://pokemon-cards-rouge.vercel.app/",
    },
    {
      title: "LCE Backend System",
      subtitle: "Backend System",
      description: "Modular Laravel backend with REST APIs for scalable application services.",
      gradient: "from-secondary via-secondary/80 to-accent",
      tags: ["Laravel", "React", "MySQL"],
      github: "https://github.com",
      demo: "https://laundry-care-express.vercel.app/",
    },
    {
      title: "Real-Time Chat App",
      subtitle: "Real-Time Chat",
      description: "Real-time messaging platform using WebSockets for low latency communication.",
      gradient: "from-success via-success/80 to-primary",
      tags: ["Node.js", "TypeScript", "Socket.IO"],
      github: "https://github.com",
      demo: "https://chat-app-typescript.onrender.com/",
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

      <motion.div variants={motionItem} className="w-full overflow-hidden relative before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-background after:to-transparent py-6">
        <div 
          className="flex w-max gap-6 animate-infinite-slide-slow"
          style={{
            animationPlayState: hoveredProject ? 'paused' : 'running'
          }}
        >
          {[...projects, ...projects, ...projects].map((project, index) => (
            <div 
              key={index} 
              className="w-[280px] sm:w-[320px] shrink-0 group bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-[380px] cursor-help"
              onMouseEnter={() => {
                if (project.title === "Pokemon Trading Platform") {
                  setIsOverCard('pokemon');
                } else if (project.title === "LCE Backend System") {
                  setIsOverCard('lce');
                } else if (project.title === "Real-Time Chat App") {
                  setIsOverCard('chat');
                }
              }}
              onMouseLeave={() => {
                if (project.title === "Pokemon Trading Platform" || project.title === "LCE Backend System" || project.title === "Real-Time Chat App") {
                  setIsOverCard(null);
                }
              }}
              onClick={() => {
                if (project.title === "Pokemon Trading Platform") {
                  setIsOverCard(prev => prev === 'pokemon' ? null : 'pokemon');
                } else if (project.title === "LCE Backend System") {
                  setIsOverCard(prev => prev === 'lce' ? null : 'lce');
                } else if (project.title === "Real-Time Chat App") {
                  setIsOverCard(prev => prev === 'chat' ? null : 'chat');
                }
              }}
            >
              {/* Image / Gradient Header */}
              <div className={`w-full h-36 relative overflow-hidden bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/20 lg:opacity-0 lg:group-hover:opacity-100 opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm z-10">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-colors" onClick={(e) => e.stopPropagation()}>
                    <FaGithub size={18} />
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-colors" onClick={(e) => e.stopPropagation()}>
                    <ExternalLink size={18} />
                  </a>
                </div>
                <span className="text-white/30 text-5xl font-bold group-hover:scale-110 transition-transform duration-500">{project.title.substring(0, 2)}</span>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-foreground mb-0.5 group-hover:text-primary transition-colors flex items-center gap-2 flex-wrap">
                    {project.title}
                    {project.title === "Pokemon Trading Platform" && (
                      <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-accent/10 text-accent rounded-full border border-accent/20">
                        <Eye className="w-2.5 h-2.5" /> Mockup 💻📱
                      </span>
                    )}
                    {project.title === "LCE Backend System" && (
                      <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-accent/10 text-accent rounded-full border border-accent/20">
                        <Eye className="w-2.5 h-2.5" /> Mockup 💻
                      </span>
                    )}
                    {project.title === "Real-Time Chat App" && (
                      <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-accent/10 text-accent rounded-full border border-accent/20">
                        <Eye className="w-2.5 h-2.5" /> Interactive App ⚡
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-primary font-medium mb-2">{project.subtitle}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-4">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5 bg-muted text-muted-foreground border-none">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Dynamic Neobrutalist Mockup Overlay Preview via Portal */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {hoveredProject === 'pokemon' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-auto md:bg-transparent md:backdrop-blur-none md:pointer-events-none print:hidden select-none"
              onClick={() => {
                setIsOverCard(null);
                setIsOverMockup(null);
                setHoveredProject(null);
              }}
            >
              <div 
                className="relative w-full h-full flex items-center justify-center md:justify-start max-w-[850px] p-4"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Desktop Mockup Browser Frame */}
                <a 
                  href="https://pokemon-cards-rouge.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative w-[78%] aspect-[16/10] bg-white dark:bg-card border-4 border-foreground rounded-2xl shadow-[20px_20px_0px_rgba(0,0,0,1)] dark:shadow-[20px_20px_0px_rgba(255,255,255,0.15)] flex flex-col overflow-hidden transition-all duration-300 hidden md:flex pointer-events-auto cursor-pointer hover:scale-[1.01] hover:shadow-[24px_24px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 transition-transform duration-200 ${
                    windowBlurred ? "blur-[30px] scale-95 opacity-20" : ""
                  }`}
                  onMouseEnter={() => setIsOverMockup('pokemon')}
                  onMouseLeave={() => setIsOverMockup(null)}
                >
                  {/* Browser Top bar */}
                  <div className="h-10 border-b-2 border-foreground bg-muted/30 px-4 flex items-center justify-between shrink-0 select-none">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 border border-foreground" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500 border border-foreground" />
                      <div className="w-3 h-3 rounded-full bg-green-500 border border-foreground" />
                    </div>
                    <div className="w-1/2 h-6 rounded-md border border-foreground bg-background px-3 flex items-center text-[10px] text-muted-foreground tracking-wide font-mono">
                      pokemon-cards-rouge.vercel.app
                    </div>
                    <div className="w-6" /> {/* spacer */}
                  </div>
                  
                  {/* Browser Content */}
                  <div className="flex-1 w-full relative overflow-hidden bg-muted/10">
                    <Image 
                      src="/images/Projects/Pokemon/Screenshot 2026-06-01 184407.png"
                      alt="Pokemon Trading Platform Desktop"
                      fill
                      sizes="(max-width: 768px) 75vw, 650px"
                      className="object-cover pointer-events-none select-none"
                      priority
                      onDragStart={(e) => e.preventDefault()}
                    />
                  </div>
                </a>

                {/* Mobile Mockup Phone Frame */}
                <a 
                  href="https://pokemon-cards-rouge.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-white dark:bg-card border-4 border-foreground rounded-[28px] shadow-[12px_12px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_rgba(255,255,255,0.15)] z-20 flex flex-col overflow-hidden transition-all duration-300 pointer-events-auto cursor-pointer hover:scale-[1.03] hover:-translate-y-1.5 active:translate-y-0 transition-transform duration-200 ${
                    windowBlurred ? "blur-[30px] scale-95 opacity-20" : ""
                  } md:absolute md:right-0 md:bottom-6 md:w-[25%] md:aspect-[9/19] w-[70vw] max-w-[280px] aspect-[9/19]`}
                  onMouseEnter={() => setIsOverMockup('pokemon')}
                  onMouseLeave={() => setIsOverMockup(null)}
                >
                  {/* Mobile Screen Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3 bg-foreground rounded-full z-30 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted/40 border border-foreground/30 absolute left-2.5" />
                    <div className="w-5 h-0.5 bg-muted/30 rounded-full" />
                  </div>
                  
                  {/* Mobile Content */}
                  <div className="flex-1 w-full relative bg-muted/10 rounded-[24px] overflow-hidden">
                    <Image 
                      src="/images/Projects/Pokemon/pokemon_mobile_ui.png"
                      alt="Pokemon Trading Platform Mobile"
                      fill
                      sizes="(max-width: 768px) 25vw, 220px"
                      className="object-cover pointer-events-none select-none rounded-[24px]"
                      priority
                      onDragStart={(e) => e.preventDefault()}
                    />
                  </div>
                </a>

                {/* Security Watermarks */}
                {!windowBlurred && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.06] dark:opacity-[0.1] select-none flex flex-col justify-around py-4 z-30 print:hidden">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="flex justify-around text-[9px] font-black tracking-widest text-foreground uppercase whitespace-nowrap rotate-[-20deg] scale-110"
                        style={{ marginLeft: i % 2 === 0 ? '-30px' : '30px' }}
                      >
                        {Array.from({ length: 4 }).map((_, j) => (
                          <span key={j} className="mx-4 select-none">
                            Cenedy Palma • SECURE PREVIEW • DO NOT COPY
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {/* Blur Intercept Security Message */}
                {windowBlurred && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-md p-4 text-center z-40 pointer-events-auto rounded-3xl">
                    <div className="bg-red-600 text-white font-black text-xs sm:text-sm uppercase px-4 py-2 border-2 border-white shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-sm flex items-center gap-2 mb-3 animate-pulse">
                      ⚠️ SECURITY LOCK ⚠️
                    </div>
                    <p className="text-white font-extrabold text-xs sm:text-sm max-w-[280px]">
                      Project Mockup Protected. Focus lost or screenshot attempt blocked.
                    </p>
                  </div>
                )}

              </div>
            </motion.div>
          )}

          {hoveredProject === 'lce' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-auto md:bg-transparent md:backdrop-blur-none md:pointer-events-none print:hidden select-none"
              onClick={() => {
                setIsOverCard(null);
                setIsOverMockup(null);
                setHoveredProject(null);
              }}
            >
              <style>{`
                @keyframes lceMarquee {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(-50%); }
                }
                .animate-lce-marquee {
                  animation: lceMarquee 30s linear infinite;
                }
              `}</style>
              <div 
                className="relative w-full h-full flex items-center justify-center max-w-[850px] p-4"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Desktop Mockup Browser Frame */}
                <a 
                  href="https://laundry-care-express.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative w-[95vw] md:w-full aspect-[16/10] bg-white dark:bg-card border-4 border-foreground rounded-2xl shadow-[20px_20px_0px_rgba(0,0,0,1)] dark:shadow-[20px_20px_0px_rgba(255,255,255,0.15)] flex flex-col overflow-hidden transition-all duration-300 pointer-events-auto cursor-pointer hover:scale-[1.01] hover:shadow-[24px_24px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 transition-transform duration-200 ${
                    windowBlurred ? "blur-[30px] scale-95 opacity-20" : ""
                  }`}
                  onMouseEnter={() => setIsOverMockup('lce')}
                  onMouseLeave={() => setIsOverMockup(null)}
                >
                  {/* Browser Top bar */}
                  <div className="h-10 border-b-2 border-foreground bg-muted/30 px-4 flex items-center justify-between shrink-0 select-none">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 border border-foreground" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500 border border-foreground" />
                      <div className="w-3 h-3 rounded-full bg-green-500 border border-foreground" />
                    </div>
                    <div className="w-1/2 h-6 rounded-md border border-foreground bg-background px-3 flex items-center text-[10px] text-muted-foreground tracking-wide font-mono">
                      laundry-care-express.vercel.app
                    </div>
                    <div className="w-6" /> {/* spacer */}
                  </div>
                  
                  {/* Browser Content with Continuous Auto-Scroll */}
                  <div className="flex-1 w-full relative overflow-hidden bg-muted/10">
                    <div className="absolute top-0 left-0 w-full flex flex-col gap-3 p-3 select-none pointer-events-none animate-lce-marquee">
                      {[
                        "Screenshot 2026-06-01 193600.png",
                        "Screenshot 2026-06-01 193607.png",
                        "Screenshot 2026-06-01 193614.png",
                        "Screenshot 2026-06-01 193623.png",
                        "Screenshot 2026-06-01 193629.png",
                        "Screenshot 2026-06-01 193640.png"
                      ].concat([
                        "Screenshot 2026-06-01 193600.png",
                        "Screenshot 2026-06-01 193607.png",
                        "Screenshot 2026-06-01 193614.png",
                        "Screenshot 2026-06-01 193623.png",
                        "Screenshot 2026-06-01 193629.png",
                        "Screenshot 2026-06-01 193640.png"
                      ]).map((img, i) => (
                        <div key={i} className="relative w-full aspect-[16/10] border-2 border-foreground rounded-xl overflow-hidden shadow-md bg-white">
                          <Image 
                            src={`/images/Projects/LCE/${img}`}
                            alt={`LCE Screenshot ${i}`}
                            fill
                            sizes="(max-width: 768px) 95vw, 800px"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </a>

                {/* Security Watermarks */}
                {!windowBlurred && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.06] dark:opacity-[0.1] select-none flex flex-col justify-around py-4 z-30 print:hidden">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="flex justify-around text-[9px] font-black tracking-widest text-foreground uppercase whitespace-nowrap rotate-[-20deg] scale-110"
                        style={{ marginLeft: i % 2 === 0 ? '-30px' : '30px' }}
                      >
                        {Array.from({ length: 4 }).map((_, j) => (
                          <span key={j} className="mx-4 select-none">
                            Cenedy Palma • SECURE PREVIEW • DO NOT COPY
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {/* Blur Intercept Security Message */}
                {windowBlurred && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-md p-4 text-center z-40 pointer-events-auto rounded-3xl">
                    <div className="bg-red-600 text-white font-black text-xs sm:text-sm uppercase px-4 py-2 border-2 border-white shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-sm flex items-center gap-2 mb-3 animate-pulse">
                      ⚠️ SECURITY LOCK ⚠️
                    </div>
                    <p className="text-white font-extrabold text-xs sm:text-sm max-w-[280px]">
                      Project Mockup Protected. Focus lost or screenshot attempt blocked.
                    </p>
                  </div>
                )}

              </div>
            </motion.div>
          )}

          {hoveredProject === 'chat' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-auto md:bg-transparent md:backdrop-blur-none md:pointer-events-none print:hidden select-none"
              onClick={() => {
                setIsOverCard(null);
                setIsOverMockup(null);
                setHoveredProject(null);
              }}
            >
              <div 
                className="relative w-full h-full flex items-center justify-center max-w-[850px] p-4"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Live Interactive Browser Frame */}
                <div 
                  className={`relative w-[95vw] md:w-full aspect-[16/10] bg-white dark:bg-card border-4 border-foreground rounded-2xl shadow-[20px_20px_0px_rgba(0,0,0,1)] dark:shadow-[20px_20px_0px_rgba(255,255,255,0.15)] flex flex-col overflow-hidden transition-all duration-300 pointer-events-auto ${
                    windowBlurred ? "blur-[30px] scale-95 opacity-20" : ""
                  }`}
                  onMouseEnter={() => setIsOverMockup('chat')}
                  onMouseLeave={() => setIsOverMockup(null)}
                >
                  {/* Browser Top bar */}
                  <div className="h-10 border-b-2 border-foreground bg-muted/30 px-4 flex items-center justify-between shrink-0 select-none">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 border border-foreground" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500 border border-foreground" />
                      <div className="w-3 h-3 rounded-full bg-green-500 border border-foreground" />
                    </div>
                    <div className="w-1/2 h-6 rounded-md border border-foreground bg-background px-3 flex items-center text-[10px] text-muted-foreground tracking-wide font-mono select-text">
                      chat-app-typescript.onrender.com
                    </div>
                    <a 
                      href="https://chat-app-typescript.onrender.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary font-bold hover:underline flex items-center gap-1 select-none"
                    >
                      Open Live App <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  
                  {/* Live Iframe App Content */}
                  <div className="flex-1 w-full bg-white dark:bg-zinc-950 relative overflow-hidden select-text pointer-events-auto">
                    <iframe 
                      src="https://chat-app-typescript.onrender.com/"
                      title="Real-Time Chat App Live Preview"
                      className="w-full h-full border-none select-text pointer-events-auto bg-white dark:bg-zinc-950"
                      allow="clipboard-write; camera; microphone"
                    />
                  </div>
                </div>

                {/* Security Watermarks */}
                {!windowBlurred && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04] dark:opacity-[0.07] select-none flex flex-col justify-around py-4 z-30 print:hidden">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="flex justify-around text-[9px] font-black tracking-widest text-foreground uppercase whitespace-nowrap rotate-[-20deg] scale-110"
                        style={{ marginLeft: i % 2 === 0 ? '-30px' : '30px' }}
                      >
                        {Array.from({ length: 4 }).map((_, j) => (
                          <span key={j} className="mx-4 select-none">
                            Cenedy Palma • SECURE PREVIEW • DO NOT COPY
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {/* Blur Intercept Security Message */}
                {windowBlurred && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-md p-4 text-center z-40 pointer-events-auto rounded-3xl">
                    <div className="bg-red-600 text-white font-black text-xs sm:text-sm uppercase px-4 py-2 border-2 border-white shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-sm flex items-center gap-2 mb-3 animate-pulse">
                      ⚠️ SECURITY LOCK ⚠️
                    </div>
                    <p className="text-white font-extrabold text-xs sm:text-sm max-w-[280px]">
                      Project Preview Protected. Focus lost or screenshot attempt blocked.
                    </p>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </SectionWrapper>
  );
}

