"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Briefcase, FolderGit, Cpu, Trophy } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export function HeroSection() {
  return (
    <section className="relative pt-28 pb-0 md:pt-36 overflow-hidden bg-background">
      {/* Subtle background gradients — GPU-optimized with will-change */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[80px] rounded-full pointer-events-none will-change-transform" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-accent/5 blur-[60px] rounded-full pointer-events-none will-change-transform" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">
          
          {/* Left — Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <p className="text-lg text-muted-foreground mb-2">{"Hi, I'm"}</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08] mb-4">
              Cenedy Udoy<br />Palma
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-foreground/80 mb-5">
              Software Engineer &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Product Builder
              </span>
            </p>
            <p className="text-base text-muted-foreground mb-8 max-w-lg leading-relaxed">
              I build scalable backend systems and seamlessly integrate AI into high-performance SaaS applications.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Link
                href="#projects"
                className={`${buttonVariants({ size: "lg" })} rounded-full h-12 px-7 text-base shadow-lg shadow-primary/20 gap-2`}
              >
                View My Work <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#contact"
                className={`${buttonVariants({ size: "lg", variant: "outline" })} rounded-full h-12 px-7 text-base gap-2`}
              >
                Contact Me <Mail className="w-4 h-4" />
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all duration-300" aria-label="GitHub">
                <FaGithub size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all duration-300" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all duration-300" aria-label="X/Twitter">
                <FaXTwitter size={20} />
              </a>
              <a href="mailto:cenedypalma@gmail.com" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all duration-300" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

          {/* Right — Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-[320px] h-[380px] md:w-[400px] md:h-[480px]">
              {/* Photo container with gradient background */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary via-primary/80 to-accent overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero.png"
                  alt="Cenedy Udoy Palma — Full Stack Developer and Product Builder"
                  fill
                  sizes="(max-width: 768px) 320px, 400px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Floating Code Icon — one-time entrance, then gentle CSS hover */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 200 }}
                className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl font-mono font-bold shadow-xl z-10 hover:scale-110 transition-transform duration-300"
              >
                {"</>"}
              </motion.div>

              {/* Floating "Problem Solver" Card — one-time entrance */}
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0, type: "spring", stiffness: 180 }}
                className="absolute -bottom-3 -right-6 glass rounded-2xl px-5 py-3 shadow-xl z-10 flex items-center gap-2 hover:scale-105 transition-transform duration-300"
              >
                <span className="text-lg">🧩</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Problem Solver</p>
                  <p className="text-xs text-muted-foreground">by Nature</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "4+", label: "Years Experience", icon: <Briefcase className="w-5 h-5" />, color: "bg-primary/10 text-primary" },
            { value: "10+", label: "Projects Delivered", icon: <FolderGit className="w-5 h-5" />, color: "bg-accent/10 text-accent" },
            { value: "5+", label: "Technologies Mastered", icon: <Cpu className="w-5 h-5" />, color: "bg-secondary/10 text-secondary" },
            { value: "∞", label: "Problems Solved", icon: <Trophy className="w-5 h-5" />, color: "bg-success/10 text-success" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="bg-white rounded-2xl border border-border p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-extrabold text-foreground leading-none mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
