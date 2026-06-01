"use client";

import { useState, useRef, useEffect } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { 
  Search, 
  Map, 
  Palette, 
  Layout, 
  Server, 
  Cloud, 
  LineChart, 
  Sparkles, 
  Send, 
  CheckCircle, 
  Cpu
} from "lucide-react";
import { motion } from "framer-motion";

export function ProblemSolverSection() {
  const steps = [
    {
      id: "01",
      title: "Research",
      subtitle: "Markets & Requirements",
      icon: <Search className="w-5 h-5" />,
      experience: "During the development of the Pokemon Trading Platform, Cenedy conducted in-depth user surveys and researched Shopify collection integrations to identify core gaps in online high-volume collectible trading. This analysis formed the basis for a friction-free transactional flow.",
    },
    {
      id: "02",
      title: "Planning",
      subtitle: "System Architecture",
      icon: <Map className="w-5 h-5" />,
      experience: "At Betopia Group, Cenedy mapped out complex technical specifications, designing secure Stripe and Authorize.net multi-tiered billing flows, data modeling in MySQL/PostgreSQL, and API contracts before a single line of backend was written.",
    },
    {
      id: "03",
      title: "UI/UX Design",
      subtitle: "Intuitive Interfaces",
      icon: <Palette className="w-5 h-5" />,
      experience: "For the SAVIOR intelligent security app, Cenedy designed user-friendly voice control triggers and rapid-action emergency alerts, validating usability guidelines to ensure the layout remains functional even during high-panic user scenarios.",
    },
    {
      id: "04",
      title: "Frontend Dev",
      subtitle: "Rich Component Systems",
      icon: <Layout className="w-5 h-5" />,
      experience: "Cenedy builds fluid, highly-performant web applications using React and Next.js (App Router), leveraging Tailwind CSS for precise modern layout styling and Framer Motion to craft fluid transition states.",
    },
    {
      id: "05",
      title: "Backend Arch",
      subtitle: "REST APIs & WebSockets",
      icon: <Server className="w-5 h-5" />,
      experience: "Cenedy engineered robust backend platforms utilizing Laravel (PHP) and Node.js. He implemented Socket.IO WebSocket protocols for low-latency messaging, integrated payment gateways, and wrote modular, clean, and highly secure REST API routes.",
    },
    {
      id: "06",
      title: "Deployment",
      subtitle: "DevOps & VPS Cloud",
      icon: <Cloud className="w-5 h-5" />,
      experience: "At Betopia Group, Cenedy deployed containerized multi-service applications using Docker, managing VPS hosts on Linux environments, setting up automated CI/CD code shipment routes, and optimizing server uptime statistics.",
    },
    {
      id: "07",
      title: "Product Growth",
      subtitle: "Telemetry & Iteration",
      icon: <LineChart className="w-5 h-5" />,
      experience: "As Operations Associate for the EDGE Project (World Bank), Cenedy directed massive technical training tracks for 5,519+ trainees and 119 companies. He analyzed user growth telemetry, scaling platform delivery models to drive national training efforts.",
    },
  ];

  // AI Problem Solver States
  const [problem, setProblem] = useState("");
  const [isSolving, setIsSolving] = useState(false);
  const [solutionOutput, setSolutionOutput] = useState("");
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const suggestedProblems = [
    "I want a food delivery app",
    "My website is slow",
    "I need a secure SaaS subscription model",
  ];

  // Localized Inner Container Auto Scroll for Solution Output
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [solutionOutput]);

  const handleSolve = async (selectedProblem?: string) => {
    const inputProblem = selectedProblem || problem;
    if (!inputProblem.trim() || isSolving) return;

    setProblem(inputProblem);
    setIsSolving(true);
    setSolutionOutput("");

    try {
      const response = await fetch("/api/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Use placeholder if visitorId is not yet loaded, though typically it should be
        body: JSON.stringify({ idea: inputProblem, visitorId: 'anonymous' }),
      });

      if (!response.ok) throw new Error("Failed to process solution");

      const data = await response.json();
      
      const formattedOutput = `**Recommended Architecture**\n${data.architecture}\n\n**Tech Stack**\n${data.techStack.join(' • ')}\n\n**Estimated Complexity**\n${data.complexity}`;
      
      // Simulate typing effect
      let i = 0;
      setSolutionOutput("");
      const interval = setInterval(() => {
        setSolutionOutput(formattedOutput.substring(0, i));
        i++;
        if (i > formattedOutput.length) {
          clearInterval(interval);
          setIsSolving(false);
        }
      }, 10);
      return; // Early return so we don't set isSolving(false) in finally before typing finishes
    } catch (err) {
      console.error(err);
      setSolutionOutput("An error occurred while compiling your architecture proposal. Please try again.");
      setIsSolving(false);
    }
  };

  return (
    <SectionWrapper id="process" className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-[12vw] md:text-[8vw] font-black tracking-tighter text-foreground leading-[0.85] uppercase mb-6 mix-blend-difference">
            SOLVER <br /> ENGINE
          </h2>
          <p className="text-sm md:text-base font-bold uppercase tracking-widest text-muted-foreground max-w-2xl mx-auto border-y border-foreground py-4">
            I own the engineering lifecycle. Bringing structure, rigor, and premium technology to every bottleneck.
          </p>
        </div>

        <div className="flex flex-col gap-12 relative">
          
          {/* Layer 1: The AI Solver Playground (Sticky) */}
          <div className="relative lg:sticky lg:top-24 z-40 bg-background/80 backdrop-blur-xl border border-foreground p-6 md:p-10 shadow-[16px_16px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_rgba(255,255,255,0.1)] mb-10 transition-all duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-foreground/20 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary text-background flex items-center justify-center font-black">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight">
                    Architect Playground
                  </h3>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    Describe your engineering bottleneck
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 md:max-w-xs justify-end">
                {suggestedProblems.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleSolve(p)}
                    disabled={isSolving}
                    className="bg-background hover:bg-foreground hover:text-background border border-foreground px-3 py-1.5 text-[9px] font-black uppercase tracking-wider transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSolve();
              }}
              className="relative flex flex-col md:flex-row items-stretch md:items-end gap-4"
            >
              <textarea
                rows={2}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="e.g. 'I want to build a real-time messaging server that scales'..."
                disabled={isSolving}
                className="w-full bg-background border-2 border-foreground focus:border-primary p-4 text-xs font-bold uppercase tracking-wider focus:outline-none transition-colors resize-none placeholder:text-muted-foreground/50"
              />
              <button
                type="submit"
                disabled={isSolving || !problem.trim()}
                className="w-full md:w-auto shrink-0 h-14 md:h-[72px] px-8 bg-foreground text-background hover:bg-primary font-black uppercase tracking-widest disabled:opacity-50 transition-colors flex items-center justify-center gap-2 border-2 border-foreground"
              >
                Execute <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Response Stream */}
            {(solutionOutput || isSolving) && (
              <div 
                ref={scrollContainerRef}
                className="mt-8 border-2 border-foreground bg-card p-6 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-foreground shadow-inner"
              >
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-foreground/10">
                  <Cpu className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">System Output</span>
                </div>
                <div className="markdown-solver text-xs font-medium leading-relaxed text-foreground whitespace-pre-wrap">
                  {solutionOutput}
                </div>
                {isSolving && !solutionOutput && (
                  <div className="flex items-center gap-2 text-muted-foreground font-black uppercase tracking-widest text-[10px] mt-4">
                    <span className="w-2 h-2 bg-primary rounded-none animate-ping" />
                    Calculating Vectors...
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Layer 2: Scrolling Fragmented Case Studies */}
          <div className="relative z-10 grid gap-6 md:gap-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-card border border-foreground p-6 md:p-10 flex flex-col md:flex-row gap-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.1)] hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="shrink-0 md:w-1/4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-foreground/20 pb-6 md:pb-0 md:pr-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-black text-primary/40">{step.id}</span>
                    <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-tight text-foreground">{step.title}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{step.subtitle}</span>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-sm md:text-base font-medium leading-relaxed text-foreground/90">
                    {step.experience}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-success">
                    <CheckCircle className="w-4 h-4" /> Validated Protocol
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}
