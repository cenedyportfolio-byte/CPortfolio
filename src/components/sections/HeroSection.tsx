"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { RabbitAnimation } from "@/components/ui/RabbitAnimation";
import { ArrowRight, Mail, Briefcase, FolderGit, Cpu, Trophy, Zap } from "lucide-react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaXTwitter,
  FaPhp,
  FaPython,
  FaAws,
  FaAndroid,
  FaLaravel,
  FaNodeJs,
  FaReact,
  FaDocker
} from "react-icons/fa6";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiMongodb, 
  SiPostgresql, 
  SiMysql, 
  SiTailwindcss,
  SiJavascript
} from "react-icons/si";

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  const techItems = [
    { name: "PHP", icon: <FaPhp className="w-5 h-5 text-[#777BB4]" /> },
    { name: "Laravel", icon: <FaLaravel className="w-5 h-5 text-[#FF2D20]" /> },
    { name: "Python", icon: <FaPython className="w-5 h-5 text-[#3776AB]" /> },
    { name: "AWS", icon: <FaAws className="w-5 h-5 text-[#FF9900]" /> },
    { name: "Android", icon: <FaAndroid className="w-5 h-5 text-[#3DDC84]" /> },
    { name: "React", icon: <FaReact className="w-5 h-5 text-[#61DAFB]" /> },
    { name: "Next.js", icon: <SiNextdotjs className="w-5 h-5 text-foreground" /> },
    { name: "Node.js", icon: <FaNodeJs className="w-5 h-5 text-[#339933]" /> },
    { name: "TypeScript", icon: <SiTypescript className="w-5 h-5 text-[#3178C6]" /> },
    { name: "JavaScript", icon: <SiJavascript className="w-5 h-5 text-[#F7DF1E]" /> },
    { name: "Docker", icon: <FaDocker className="w-5 h-5 text-[#2496ED]" /> },
    { name: "MongoDB", icon: <SiMongodb className="w-5 h-5 text-[#47A248]" /> },
    { name: "MySQL", icon: <SiMysql className="w-5 h-5 text-[#4479A1]" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="w-5 h-5 text-[#4169E1]" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" /> },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background pt-24 pb-20">
      {/* Brutalist Background Elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-primary/5 blur-[120px] rounded-none pointer-events-none will-change-transform" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-accent/5 blur-[100px] rounded-none pointer-events-none will-change-transform" />

      <div className="container mx-auto px-4 md:px-8 max-w-[1400px] relative z-10 flex-1 flex flex-col justify-center">
        
        <motion.div
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex justify-center items-center mt-12 md:mt-16 mb-20 md:mb-32"
        >
          <h1 className={`text-[clamp(2.8rem,19.5vw,15.5rem)] leading-[0.95] font-black tracking-tight uppercase relative pointer-events-none select-none text-center drop-shadow-2xl whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHovered ? 'z-0 blur-[12px] opacity-30 scale-[0.98]' : 'z-0 blur-none opacity-100 scale-100'}`}>
            <span className="block bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text text-transparent dark:from-white dark:via-white/90 dark:to-indigo-300">
              CENEDY
            </span>
            <span className="block bg-gradient-to-r from-primary via-[#6366f1] to-accent bg-clip-text text-transparent dark:from-indigo-400 dark:via-cyan-400 dark:to-teal-300">
              PALMA
            </span>
          </h1>
          
          {/* Overlapping Hero Image Fragment */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[65vw] md:w-[33vw] lg:w-[34vw] max-w-[440px] aspect-square cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHovered ? 'z-50 scale-[1.08]' : 'z-10 scale-100'}`}
          >
            <motion.div
              initial={{ scale: 0.95, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative group"
            >
              <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-4">
                <Image
                  src="/images/hero.png"
                  alt="Cenedy Udoy Palma"
                  fill
                  sizes="(max-width: 768px) 60vw, 26vw"
                  className="object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] transition-all duration-700 group-hover:drop-shadow-[0_30px_45px_rgba(0,0,0,0.4)]"
                  priority
                />
              </div>

            {/* Brutalist Floating Elements */}
            <motion.div
              initial={{ x: -15, y: -10 }}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
              className="absolute -top-4 -left-2 md:-top-6 md:-left-6 w-16 h-16 md:w-20 md:h-20 bg-foreground text-background flex items-center justify-center text-2xl md:text-3xl font-mono font-black shadow-2xl z-40 hover:rotate-12 transition-transform duration-300"
            >
              {"</>"}
            </motion.div>

            <motion.div
              initial={{ x: 15, y: 10 }}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
              className="absolute -bottom-4 -right-2 md:-bottom-8 md:-right-8 bg-background border border-foreground px-4 py-3 md:px-6 md:py-4 shadow-[6px_6px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_rgba(255,255,255,1)] md:dark:shadow-[8px_8px_0px_rgba(255,255,255,1)] z-40 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_rgba(255,255,255,1)] transition-all duration-300"
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
          </div>

        </motion.div>

        {/* Asymmetric Bottom Content */}
        <div className="pt-10 pb-8 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-10 relative z-30">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-xl w-full"
          >
            <div className="border-l-4 border-primary pl-6">
              <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight mb-3">
                Software Engineer <span className="text-primary"> & </span> Product Builder
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
              <a href="https://github.com/cenedypalma" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors duration-300" aria-label="GitHub">
                <FaGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/cenedy-palma-9560a7253/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors duration-300" aria-label="LinkedIn">
                <FaLinkedin size={24} />
              </a>
              <a href="https://x.com/cenedypalma" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors duration-300" aria-label="X/Twitter">
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
        className="w-full border-y border-foreground/10 bg-muted/30 backdrop-blur-sm py-4 md:py-6 relative z-40 overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 md:gap-8">
            {[
              { value: `${String(new Date().getFullYear() - 2021).padStart(2, '0')}+`, label: "Years Experience", icon: <Briefcase className="w-4 h-4" /> },
              { value: "10+", label: "Projects Delivered", icon: <FolderGit className="w-4 h-4" /> },
              { value: "06+", label: "Core Technologies", icon: <Cpu className="w-4 h-4" /> },
              { value: "∞", label: "Problems Solved", icon: <Trophy className="w-4 h-4" /> },
            ].map((stat, index) => (
              <div key={stat.label} className={`flex items-center gap-3 ${index === 0 ? '' : index === 2 ? 'md:border-l md:border-foreground/10 md:pl-8' : 'border-l border-foreground/10 pl-4 md:pl-8'}`}>
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

      {/* Infinite Tech Sliding Marquee */}
      <div className="w-full border-b border-foreground/10 bg-muted/5 py-4 overflow-hidden relative z-40 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-background after:to-transparent mt-4">
        <div className="flex w-max gap-8 animate-infinite-slide">
          {/* Tripled list for a perfectly seamless sliding animation loop */}
          {[...techItems, ...techItems, ...techItems].map((tech, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-background border border-border px-3.5 py-2 rounded-lg shadow-sm hover:border-primary/50 transition-all duration-300">
              <div className="shrink-0">{tech.icon}</div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      <RabbitAnimation className="top-[35%] -translate-y-1/2" />
    </section>
  );
}
