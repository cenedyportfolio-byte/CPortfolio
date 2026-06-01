"use client";

import { useState } from "react";
import { SectionWrapper, motionItem } from "@/components/layout/SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Award, Trophy, Star, Medal, Eye } from "lucide-react";

export function ExperienceSection() {
  const [hoveredCert, setHoveredCert] = useState<'blockchain' | 'internship' | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    // Boundary safety: shift position left/up if tooltip hits viewport edge
    const tooltipWidth = 360;
    const tooltipHeight = 270;
    const xOffset = e.clientX + tooltipWidth > window.innerWidth ? -(tooltipWidth + 20) : 20;
    const yOffset = e.clientY + tooltipHeight > window.innerHeight ? -(tooltipHeight + 20) : 20;

    setMousePos({
      x: e.clientX + xOffset,
      y: e.clientY + yOffset,
    });
  };

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
    },
    {
      role: "Programmer Intern",
      company: "Business Automation Ltd.",
      period: "Jul – Sep 2024",
      description: "Worked on enterprise-level backend modules using PHP and Laravel.",
      color: "bg-secondary",
      hasCert: true,
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
    },
    {
      degree: "BSc in Computer Science & Engineering",
      institution: "Notre Dame University Bangladesh",
      period: "2018 – 2022",
    },
  ];

  const achievements = [
    {
      title: "Finalist – Blockchain Olympiad Bangladesh (Professional Category)",
      year: "2022",
      icon: <Trophy className="w-5 h-5 text-warning" />,
      hasCert: true,
    },
    {
      title: "Second Runner-Up – NDUB CSE FEST Programming Contest",
      year: "2021",
      icon: <Medal className="w-5 h-5 text-accent" />,
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
            <a href="#" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
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
                    onMouseEnter={() => setHoveredCert('internship')}
                    onMouseLeave={() => setHoveredCert(null)}
                    onMouseMove={handleMouseMove}
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
                <div key={index} className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
                  <h3 className="text-base font-bold text-foreground mb-1">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{edu.institution}</p>
                  <span className="text-xs text-primary font-medium">{edu.period}</span>
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
                        onMouseEnter={() => setHoveredCert('blockchain')}
                        onMouseLeave={() => setHoveredCert(null)}
                        onMouseMove={handleMouseMove}
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

      {/* Dynamic Floating Certificate Tooltip Preview */}
      <AnimatePresence>
        {hoveredCert && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9999] rounded-xl overflow-hidden border border-white/20 shadow-2xl p-2.5 glass w-[280px] sm:w-[360px] aspect-[4/3] flex flex-col gap-2"
            style={{
              left: mousePos.x,
              top: mousePos.y,
            }}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden border border-border">
              <Image 
                src={hoveredCert === 'blockchain' ? '/images/cert-blockchain.jpg' : '/images/cert-internship.jpg'}
                alt="Certificate Preview"
                fill
                sizes="(max-width: 768px) 260px, 340px"
                className="object-contain bg-[#0F172A]"
                priority
              />
            </div>
            <div className="text-[8px] font-black uppercase tracking-widest text-center text-muted-foreground">
              Verify Credentials // Interactive Preview
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
