"use client";

import { SectionWrapper, motionItem } from "@/components/layout/SectionWrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import { Lightbulb, Code2, Users, Activity } from "lucide-react";

export function AboutSection() {
  const traits = [
    {
      title: "Product Mindset",
      description: "I think beyond code, focused on value and usability.",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "text-primary bg-primary/10",
    },
    {
      title: "Clean & Scalable Code",
      description: "I write maintainable and scalable code that lasts.",
      icon: <Code2 className="w-6 h-6" />,
      color: "text-accent bg-accent/10",
    },
    {
      title: "Collaborative",
      description: "I enjoy working with teams and delivering together.",
      icon: <Users className="w-6 h-6" />,
      color: "text-secondary bg-secondary/10",
    },
    {
      title: "HealthTech Edge",
      description: "Combining licensed clinical nursing experience with scalable software engineering.",
      icon: <Activity className="w-6 h-6" />,
      color: "text-success bg-success/10",
    },
  ];

  return (
    <SectionWrapper id="about" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left — Photo + Headline */}
        <motion.div variants={motionItem} className="lg:col-span-5">
          {/* Photo */}
          <div className="relative w-full max-w-sm mx-auto lg:mx-0 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl mb-8 group">
            <Image
              src="/images/about.png"
              alt="Cenedy Udoy Palma — About"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="bg-muted rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-foreground mb-3">About Me</h2>
            <p className="text-2xl md:text-3xl font-bold text-foreground leading-snug mb-4">
              I love turning complex problems into simple solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {"I'm a Full Stack Developer and Product Builder passionate about coding, research, leadership and continuous learning."}
            </p>
          </div>
        </motion.div>

        {/* Right — Trait Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {traits.map((trait, index) => (
            <motion.div key={trait.title} variants={motionItem} custom={index}>
              <div className="bg-background rounded-2xl border border-border p-6 h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${trait.color} group-hover:scale-110 transition-transform`}>
                  {trait.icon}
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">{trait.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{trait.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
