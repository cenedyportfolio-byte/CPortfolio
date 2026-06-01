"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { SectionWrapper, motionItem } from "@/components/layout/SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Award, Trophy, Star, Medal, Eye } from "lucide-react";

export function ExperienceSection() {
  const [hoveredCert, setHoveredCert] = useState<'blockchain' | 'internship' | 'edge' | 'ndub' | null>(null);
  const [mounted, setMounted] = useState(false);
  const [windowBlurred, setWindowBlurred] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleBlur = () => {
      if (hoveredCert) setWindowBlurred(true);
    };
    const handleFocus = () => setWindowBlurred(false);

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [hoveredCert]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hoveredCert) return;

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
  }, [hoveredCert]);

  const experiences = [
    {
      role: "Backend Developer & Product Researcher",
      company: "Betopia Group",
      period: "2025 – Present",
      description: "Building scalable REST APIs, payment integrations (Stripe, Authorize.net), Docker deployments and AI-integrated backend systems.",
      color: "bg-primary",
    },
    {
      role: "Operations Associate",
      company: "EDGE Project (Funded by World Bank)",
      period: "2023 – 2025",
      description: "Conducted ICT training for 5,519+ trainees, 119 companies, developed internal tools and managed project reporting.",
      color: "bg-accent",
      hasCert: true,
      certType: "edge",
    },
    {
      role: "Programmer Intern",
      company: "Business Automation Ltd.",
      period: "Jul – Sep 2024",
      description: "Worked on enterprise-level backend modules using PHP and Laravel.",
      color: "bg-secondary",
      hasCert: true,
      certType: "internship",
    },
    {
      role: "Junior Programmer Intern",
      company: "Urban Hill",
      period: "2021 – 2022",
      description: "Developed full stack e-commerce platform with admin panel and recommendation system.",
      color: "bg-success",
    },
  ];

  const education = [
    {
      degree: "Master of Information Technology (MIT)",
      institution: "Institute of Information Technology, University of Dhaka",
      period: "2023 – 2025",
      logo: "/images/du_logo_official.png",
    },
    {
      degree: "BSc in Computer Science & Engineering",
      institution: "Notre Dame University Bangladesh",
      period: "2018 – 2022",
      logo: "/images/ndub_logo_official.png",
    },
  ];

  const achievements = [
    {
      title: "Finalist – Blockchain Olympiad Bangladesh (Professional Category)",
      year: "2022",
      icon: <Trophy className="w-5 h-5 text-warning" />,
      hasCert: true,
      certType: "blockchain",
    },
    {
      title: "Second Runner-Up – NDUB CSE FEST Programming Contest",
      year: "2021",
      icon: <Medal className="w-5 h-5 text-accent" />,
      hasCert: true,
      certType: "ndub",
    },
    {
      title: "Merit-Based Scholarship – Notre Dame University Bangladesh",
      year: "2020 – 2021",
      icon: <Star className="w-5 h-5 text-primary" />,
    },
    {
      title: "Outstanding Performance Award – Traffic Control Volunteer Service",
      year: "2018",
      icon: <Award className="w-5 h-5 text-success" />,
    },
  ];

  return (
    <SectionWrapper id="experience" className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        
        {/* Left — Experience Timeline */}
        <motion.div variants={motionItem} className="lg:col-span-7">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Experience
            </h2>
            <a href="https://www.linkedin.com/in/cenedy-palma-9560a7253/" target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
              View Full Experience →
            </a>
          </div>

          <div className="relative border-l-2 border-muted ml-3 pl-8 space-y-10">
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={motionItem} custom={index} className="relative">
                {/* Timeline Dot */}
                <div className={`absolute -left-[37px] top-1.5 w-4 h-4 rounded-full ${exp.color} ring-4 ring-background`} />
                
                {/* Period Badge */}
                <span className="inline-block text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-2">
                  {exp.period}
                </span>
                
                <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                
                {exp.hasCert ? (
                  <p 
                    onMouseEnter={() => setHoveredCert(exp.certType as any)}
                    onMouseLeave={() => setHoveredCert(null)}
                    className="text-sm text-primary font-medium mb-2 hover:text-primary/80 transition-colors cursor-help inline-flex items-center gap-1.5"
                  >
                    {exp.company}
                    <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-primary/10 rounded-full border border-primary/20">
                      <Eye className="w-2.5 h-2.5" /> Hover to view Cert 📄
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-primary font-medium mb-2">{exp.company}</p>
                )}

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — Education + Achievements */}
        <div className="lg:col-span-5 space-y-10">
          {/* Education */}
          <motion.div variants={motionItem}>
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold text-foreground">Education</h2>
            </div>
            <div className="space-y-5">
              {education.map((edu, index) => (
                <div key={index} className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-shadow flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-foreground mb-1">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{edu.institution}</p>
                    <span className="text-xs text-primary font-medium">{edu.period}</span>
                  </div>
                  {edu.logo && (
                    <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border border-border bg-white flex items-center justify-center p-1 shadow-sm">
                      <Image
                        src={edu.logo}
                        alt={`${edu.institution} Logo`}
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={motionItem} id="achievements">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-warning" />
              <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
            </div>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="mt-0.5 shrink-0">
                    {achievement.icon}
                  </div>
                  <div>
                    {achievement.hasCert ? (
                      <p 
                        onMouseEnter={() => setHoveredCert(achievement.certType as any)}
                        onMouseLeave={() => setHoveredCert(null)}
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors cursor-help inline-flex items-center gap-2 flex-wrap"
                      >
                        {achievement.title}
                        <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-warning/10 text-warning rounded-full border border-warning/20">
                          <Eye className="w-2.5 h-2.5" /> Hover to view Cert 📄
                        </span>
                      </p>
                    ) : (
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {achievement.title}
                      </p>
                    )}
                    <span className="text-xs text-muted-foreground block mt-0.5">{achievement.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>

      {/* Dynamic Centered Certificate Overlay Preview via Portal */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {hoveredCert && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] pointer-events-none bg-card border-4 border-foreground shadow-[16px_16px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_rgba(255,255,255,0.15)] p-4 select-none print:hidden ${
                hoveredCert === 'edge' 
                  ? "h-[85vh] max-h-[750px] aspect-[1/1.414]" 
                  : "w-[92vw] sm:w-[85vw] max-w-[800px] aspect-[1.414/1]"
              }`}
            >
              <div className="relative w-full h-full border-2 border-foreground bg-muted/20 overflow-hidden select-none pointer-events-none print:hidden">
                <Image 
                  src={
                    hoveredCert === 'blockchain' ? '/images/cert-blockchain.jpg' :
                    hoveredCert === 'internship' ? '/images/cert-internship.jpg' :
                    hoveredCert === 'edge' ? '/images/cert-edge.jpg' :
                    '/images/cert-ndub.jpg'
                  }
                  alt="Certificate Preview"
                  fill
                  sizes={hoveredCert === 'edge' ? "(max-height: 750px) 530px, 85vh" : "(max-width: 768px) 92vw, 800px"}
                  className={`object-contain transition-all duration-300 pointer-events-none select-none ${
                    windowBlurred ? "blur-[30px] scale-95 opacity-20" : ""
                  }`}
                  priority
                  onDragStart={(e) => e.preventDefault()}
                />

                {/* Blur Intercept Security Message */}
                {windowBlurred && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-md p-4 text-center z-20 pointer-events-auto">
                    <div className="bg-red-600 text-white font-black text-xs sm:text-sm uppercase px-4 py-2 border-2 border-white shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-sm flex items-center gap-2 mb-3 animate-pulse">
                      ⚠️ SECURITY LOCK ⚠️
                    </div>
                    <p className="text-white font-extrabold text-xs sm:text-sm max-w-[280px]">
                      Credential Preview Protected. Focus lost or screenshot attempt blocked.
                    </p>
                  </div>
                )}

                {/* Dynamic Security Watermark Grid Overlay */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.09] dark:opacity-[0.14] select-none flex flex-col justify-around py-4 z-10 print:hidden">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="flex justify-around text-[10px] sm:text-xs font-black tracking-widest text-foreground uppercase whitespace-nowrap rotate-[-20deg] scale-110"
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </SectionWrapper>
  );
}
