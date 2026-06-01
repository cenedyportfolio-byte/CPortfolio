"use client";

import { useState, useEffect, useRef } from "react";
import { SectionWrapper, motionItem } from "@/components/layout/SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Lightbulb, Code2, Users, Activity, Sparkles, Send, Bot, MessageSquare } from "lucide-react";

export function AboutSection() {
  const traits = [
    {
      title: "Product Mindset",
      description: "I think beyond code, focused on value.",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "text-primary bg-primary/10",
    },
    {
      title: "Clean & Scalable",
      description: "I write maintainable and scalable code.",
      icon: <Code2 className="w-5 h-5" />,
      color: "text-accent bg-accent/10",
    },
    {
      title: "Collaborative",
      description: "I enjoy working with teams.",
      icon: <Users className="w-5 h-5" />,
      color: "text-secondary bg-secondary/10",
    },
    {
      title: "HealthTech Edge",
      description: "Clinical nursing combined with software engineering.",
      icon: <Activity className="w-5 h-5" />,
      color: "text-success bg-success/10",
    },
  ];

  // AI Assistant Chat States
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Hi! I'm Cenedy AI. I'm trained on Cenedy's career history, technical projects, achievements, and skills. Ask me anything, or select a quick question on the right!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Suggested Prompts
  const suggestedPrompts = [
    "Tell me about Cenedy's experience",
    "Explain the SAVIOR project",
    "What technologies does he use?",
    "Why should I hire Cenedy?",
    "Show his Laravel experience",
    "Tell me about his AI projects",
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingMessage, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setTypingMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) throw new Error("Failed to connect to assistant");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let accumulatedResponse = "";

      setIsLoading(false); // Switch off loading once stream begins

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulatedResponse += chunk;
        setTypingMessage(accumulatedResponse);
      }

      setMessages((prev) => [...prev, { role: "assistant" as const, content: accumulatedResponse }]);
      setTypingMessage("");
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant" as const, content: "I'm sorry, I've run into a technical issue. Please try submitting your question again." },
      ]);
    } finally {
      setIsLoading(false);
      setTypingMessage("");
    }
  };

  return (
    <SectionWrapper id="about" className="bg-background !py-0">
      <div className="flex flex-col lg:flex-row items-stretch border-t border-border">
        
        {/* Left — Sticky Bio (Asymmetric Tension 30%) */}
        <div className="w-full lg:w-[35%] lg:sticky lg:top-0 lg:h-screen lg:max-h-[1000px] border-b lg:border-b-0 lg:border-r border-border bg-muted/20 p-6 md:p-12 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-[30%] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
          
          <motion.div variants={motionItem} className="relative z-10 w-full max-w-sm mx-auto lg:mx-0">
            {/* Brutalist Photo Frame */}
            <div className="relative w-full aspect-[4/5] overflow-hidden border border-foreground shadow-[8px_8px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.05)] mb-8 grayscale hover:grayscale-0 transition-all duration-500">
              <Image
                src="/images/about.png"
                alt="Cenedy Udoy Palma — About"
                fill
                sizes="(max-width: 768px) 100vw, 35vw"
                className="object-cover object-top"
                priority
              />
              <div className="absolute top-4 left-4 bg-background text-foreground text-[10px] font-black uppercase tracking-widest px-3 py-1 border border-foreground">
                Origin
              </div>
            </div>

            {/* Brutalist Bio */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight leading-[0.9] mb-6">
                Beyond <br /><span className="text-primary">Code</span>
              </h2>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed mb-8">
                I turn complex problems into simple, elegant products. I am a Full Stack Developer and Product Builder passionate about writing high-performance code, system architecture, leadership, and continuous learning.
              </p>
              
              {/* Traits Stacked */}
              <div className="space-y-3">
                {traits.map((trait, index) => (
                  <motion.div key={trait.title} variants={motionItem} custom={index} className="flex items-center gap-4 group">
                    <div className={`w-8 h-8 flex items-center justify-center border border-border group-hover:border-foreground transition-colors ${trait.color} bg-background`}>
                      {trait.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-foreground uppercase tracking-wider">{trait.title}</h4>
                      <p className="text-[10px] text-muted-foreground">{trait.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right — AI Portfolio Assistant (Asymmetric Tension 70%) */}
        <div className="w-full lg:w-[65%] p-6 md:p-12 lg:p-20 flex flex-col justify-center min-h-[80vh] bg-background">
          <motion.div variants={motionItem} className="w-full max-w-4xl mx-auto">
            
            <div className="mb-8">
              <h3 className="text-3xl font-black text-foreground uppercase tracking-tight mb-2 flex items-center gap-3">
                Ask Cenedy AI <Sparkles className="w-6 h-6 text-primary" />
              </h3>
              <p className="text-sm text-muted-foreground font-medium">
                Interact with a customized AI assistant trained on Cenedy&apos;s professional background, achievements, and technical projects.
              </p>
            </div>

            {/* Brutalist Chat Container */}
            <div className="w-full h-[600px] border border-foreground flex flex-col shadow-[12px_12px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_rgba(255,255,255,0.1)] bg-card overflow-hidden">
              
              {/* Chat Header */}
              <div className="border-b border-foreground p-4 bg-muted/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-none animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
                    System Ready // Gemini Powered
                  </span>
                </div>
                <div className="hidden sm:flex gap-2">
                  <div className="w-3 h-3 border border-foreground" />
                  <div className="w-3 h-3 border border-foreground" />
                  <div className="w-3 h-3 border border-foreground bg-foreground" />
                </div>
              </div>

              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Center Pane (Chat Area) */}
                <div className="flex-grow min-w-0 flex flex-col h-full bg-background border-r-0 md:border-r border-foreground">
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-6 space-y-6 text-sm scrollbar-thin scrollbar-thumb-foreground scrollbar-track-transparent"
                  >
                    <AnimatePresence initial={false}>
                      {messages.map((msg, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex items-start gap-3 max-w-[90%] ${
                            msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                          }`}
                        >
                          {/* Avatar */}
                          <div className={`w-8 h-8 shrink-0 flex items-center justify-center border border-foreground ${
                            msg.role === "user" ? "bg-foreground text-background" : "bg-background text-primary"
                          }`}>
                            {msg.role === "user" ? <Users className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                          </div>

                          {/* Bubble */}
                          <div className={`p-4 border border-foreground font-medium leading-relaxed whitespace-pre-wrap ${
                            msg.role === "user"
                              ? "bg-foreground text-background"
                              : "bg-card text-foreground markdown-chat shadow-[4px_4px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.05)]"
                          }`}>
                            {msg.content}
                          </div>
                        </motion.div>
                      ))}

                      {/* Stream Output */}
                      {typingMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start gap-3 max-w-[90%] mr-auto"
                        >
                          <div className="w-8 h-8 shrink-0 flex items-center justify-center border border-foreground bg-background text-primary">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div className="p-4 border border-foreground bg-card text-foreground font-medium leading-relaxed whitespace-pre-wrap markdown-chat shadow-[4px_4px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.05)]">
                            {typingMessage}
                          </div>
                        </motion.div>
                      )}

                      {/* Loading Animation */}
                      {isLoading && !typingMessage && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-start gap-3 mr-auto"
                        >
                          <div className="w-8 h-8 shrink-0 flex items-center justify-center border border-foreground bg-background text-primary">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div className="bg-card border border-foreground p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.05)] flex items-center gap-2">
                            <span className="w-2 h-2 bg-foreground animate-ping" />
                            <span className="text-xs font-bold uppercase tracking-widest text-foreground">Processing...</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input Bar */}
                  <div className="p-4 border-t border-foreground bg-muted/30">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                      }}
                      className="relative flex items-center"
                    >
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isLoading ? "THINKING..." : "ASK ABOUT SKILLS, EXPERIENCE, OR PROJECTS..."}
                        disabled={isLoading}
                        className="w-full bg-background border border-foreground focus:border-primary rounded-none py-4 pl-4 pr-16 text-xs font-bold uppercase tracking-wide focus:outline-none transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 p-2 bg-foreground text-background hover:bg-primary hover:text-white disabled:opacity-50 transition-colors cursor-pointer border border-foreground"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>

                {/* Right Pane (Suggested Questions) */}
                <div className="hidden md:flex md:w-64 shrink-0 flex-col bg-muted/10 h-full p-4">
                  <h4 className="text-[10px] font-black text-foreground mb-4 uppercase tracking-widest flex items-center gap-2 border-b border-foreground/20 pb-2">
                    <MessageSquare className="w-3 h-3 text-primary" />
                    Quick Prompts
                  </h4>
                  <div className="flex-1 overflow-y-auto space-y-3">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        disabled={isLoading}
                        onClick={() => handleSend(prompt)}
                        className="w-full text-left bg-background hover:bg-foreground hover:text-background border border-foreground p-3 text-[10px] font-bold uppercase tracking-wider transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </SectionWrapper>
  );
}
