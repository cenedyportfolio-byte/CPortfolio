"use client";

import { useState } from 'react';
import { Gamepad2, Bot, Beaker, Terminal, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { CommunityLeaderboard } from './CommunityLeaderboard';
import { AiAssistantSection } from './AiAssistantSection';
import { ProblemSolverLab } from './ProblemSolverLab';

type TabId = 'game' | 'chat' | 'lab';

interface TabItem {
  id: TabId;
  label: string;
  sublabel: string;
  icon: React.ComponentType<any>;
  status: string;
  color: string;
}

export function InteractiveConsole() {
  const [activeTab, setActiveTab] = useState<TabId>('game');

  const tabs: TabItem[] = [
    {
      id: 'game',
      label: 'Retro Space Shield',
      sublabel: 'HTML5 Canvas & Particle Loop',
      icon: Gamepad2,
      status: 'MULTIPLAYER ARENA',
      color: '#6366f1'
    },
    {
      id: 'chat',
      label: 'Ask Cenedy AI',
      sublabel: 'Gemini LLM Assistant Profile',
      icon: Bot,
      status: 'AI POWERED',
      color: '#22d3ee'
    },
    {
      id: 'lab',
      label: 'Product Idea Lab',
      sublabel: 'Gemini & Groq Stack Solver',
      icon: Beaker,
      status: 'SYSTEM SOLVER',
      color: '#8b5cf6'
    }
  ];

  return (
    <SectionWrapper id="interactive-console" className="bg-background py-20 border-t border-border">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
        
        {/* Console Master Header */}
        <div className="flex flex-col mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-primary/25 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-wider rounded-md mb-3">
              <Terminal className="w-3.5 h-3.5" /> Interactive Sandbox Suite
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">
              Developer Playground
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
              Explore Cenedy&apos;s technical capabilities through live real-time demonstrations. Shift between the retro canvas simulator, AI conversation companion, and architectural engine.
            </p>
          </div>
        </div>

        {/* Dashboard Console Shell */}
        <div className="flex flex-col gap-8 w-full">
          
          {/* Top Horizontal Navigation Tab Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative text-left p-4 border transition-all duration-300 w-full group overflow-hidden ${
                    isActive 
                      ? 'bg-card border-border shadow-[4px_4px_0_0_var(--primary)] -translate-y-1' 
                      : 'bg-muted/10 border-border hover:bg-card/50 hover:-translate-y-0.5'
                  }`}
                >
                  {/* Neon Bottom Active Bar */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabGlow"
                      className="absolute left-0 right-0 bottom-0 h-[4px]"
                      style={{ backgroundColor: tab.color }}
                    />
                  )}
                  
                  <div className="flex items-center gap-3.5 z-10 relative">
                    <div className={`p-2 border transition-colors duration-300 ${
                      isActive ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-background border-border text-muted-foreground'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[8px] uppercase tracking-widest font-black mb-0.5 opacity-70" style={{ color: isActive ? tab.color : 'inherit' }}>
                        {tab.status}
                      </div>
                      <div className="text-xs font-black uppercase text-foreground transition-colors group-hover:text-primary leading-tight">
                        {tab.label}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Active Slide Display Area - Full Width */}
          <div className="w-full bg-background/30 border border-border p-4 lg:p-8 shadow-[6px_6px_0_0_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col justify-center min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full min-w-0"
              >
                {activeTab === 'game' && <CommunityLeaderboard />}
                {activeTab === 'chat' && <AiAssistantSection />}
                {activeTab === 'lab' && <ProblemSolverLab />}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </SectionWrapper>
  );
}
