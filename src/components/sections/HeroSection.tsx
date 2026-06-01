"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Briefcase, FolderGit, Cpu, Trophy, Zap } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background pt-24 pb-20">
      {/* Brutalist Background Elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-primary/5 blur-[120px] rounded-none pointer-events-none will-change-transform" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-accent/5 blur-[100px] rounded-none pointer-events-none will-change-transform" />

      <div className="container mx-auto px-4 md:px-8 max-w-[1400px] relative z-10 flex-1 flex flex-col justify-center">
        
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex justify-center items-center mt-12 md:mt-16 mb-20 md:mb-32"
        >
          <h1 className={`text-[16vw] md:text-[14vw] lg:text-[15vw] leading-[0.85] font-black tracking-tighter text-foreground uppercase relative pointer-events-none select-none text-center drop-shadow-xl whitespace-nowrap transition-all duration-500 ${isHovered ? 'z-30 scale-105' : 'z-0'}`}>
            CENEDY<br />PALMA
          </h1>
          
          {/* Overlapping Hero Image Fragment */}
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[30vw] lg:w-[32vw] max-w-[480px] aspect-[4/5] z-10 shadow-2xl group cursor-pointer"
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <Image
                src="/images/hero.png"
                alt="Cenedy Udoy Palma"
                fill
                sizes="(max-width: 768px) 60vw, 26vw"
                className="object-cover object-top transition-all duration-700"
                priority
              />

              {/* Blue Glass Overlay */}
              <div className="absolute inset-0 bg-blue-500/25 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 pointer-events-none border border-white/20" />
            </div>

            {/* Brutalist Floating Elements */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 150 }}
              className="absolute -top-6 -left-6 w-20 h-20 bg-foreground text-background flex items-center justify-center text-3xl font-mono font-black shadow-2xl z-40 hover:rotate-12 transition-transform duration-300"
            >
              {"</>"}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, type: "spring", stiffness: 120 }}
              className="absolute -bottom-8 -right-8 bg-background border border-foreground px-6 py-4 shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,1)] z-40 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_rgba(255,255,255,1)] transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-primary fill-primary animate-pulse" />
                <div>
                  <p className="text-sm font-black text-foreground uppercase tracking-widest">Problem Solver</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">By Architecture</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>

        {/* Asymmetric Bottom Content */}
        <div className="pt-10 pb-8 w-full flex flex-col md:flex-row justify-between items-end gap-10 relative z-30">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-xl w-full"
          >
            <div className="border-l-4 border-primary pl-6">
              <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight mb-3">
                Software Engineer <span className="text-primary">X</span> Product Builder
              </h2>
              <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed max-w-md">
                I build scalable backend systems and seamlessly integrate AI into high-performance SaaS applications. No templates. No safe harbors. Pure engineering.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto"
          >
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#projects"
                className="bg-foreground text-background font-bold uppercase tracking-wider text-sm px-8 py-4 border border-transparent hover:bg-background hover:text-foreground hover:border-foreground transition-all duration-300 flex items-center gap-2"
              >
                View My Work <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#contact"
                className="bg-background text-foreground font-bold uppercase tracking-wider text-sm px-8 py-4 border border-foreground hover:bg-foreground hover:text-background transition-all duration-300 flex items-center gap-2"
              >
                Contact <Mail className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center gap-5">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors duration-300" aria-label="GitHub">
                <FaGithub size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors duration-300" aria-label="LinkedIn">
                <FaLinkedin size={24} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors duration-300" aria-label="X/Twitter">
                <FaXTwitter size={24} />
              </a>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Brutalist Stats Marquee/Bar at absolute bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="w-full border-y border-foreground/10 bg-muted/30 backdrop-blur-sm py-4 relative z-40 overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 divide-x divide-foreground/10">
            {[
              { value: "04+", label: "Years Experience", icon: <Briefcase className="w-4 h-4" /> },
              { value: "10+", label: "Projects Delivered", icon: <FolderGit className="w-4 h-4" /> },
              { value: "05+", label: "Core Technologies", icon: <Cpu className="w-4 h-4" /> },
              { value: "∞", label: "Problems Solved", icon: <Trophy className="w-4 h-4" /> },
            ].map((stat, index) => (
              <div key={stat.label} className={`flex items-center gap-4 ${index !== 0 ? 'pl-4 md:pl-8' : ''}`}>
                <div className="text-primary hidden sm:block">{stat.icon}</div>
                <div>
                  <p className="text-xl md:text-2xl font-black text-foreground font-mono leading-none">{stat.value}</p>
                  <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
