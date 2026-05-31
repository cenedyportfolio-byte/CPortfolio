"use client";

import { SectionWrapper, motionItem } from "@/components/layout/SectionWrapper";
import { motion } from "framer-motion";
import { GraduationCap, Award, Trophy, Star, Medal } from "lucide-react";

export function ExperienceSection() {
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
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
                <p className="text-sm text-primary font-medium mb-2">{exp.company}</p>
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
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {achievement.title}
                    </p>
                    <span className="text-xs text-muted-foreground">{achievement.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
