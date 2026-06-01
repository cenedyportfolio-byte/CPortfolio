"use client";

import { useState } from 'react';
import { useVisitor } from '@/components/providers/VisitorProvider';
import { Settings, Database, Code2, Loader2, Sparkles } from 'lucide-react';

interface AnalysisResult {
  architecture: string;
  techStack: string[];
  complexity: string;
}

export function ProblemSolverLab() {
  const visitor = useVisitor();
  const [idea, setIdea] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, visitorId: visitor?.visitorId || 'anonymous' })
      });

      if (!res.ok) throw new Error("Analysis failed");

      const data = await res.json();
      setResult(data);
    } catch {
      setError("An error occurred while analyzing your idea. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header and Info inside the panel */}
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-3 flex items-center gap-2">
          Product Idea Lab <Sparkles className="text-primary w-6 h-6" />
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
          Describe any SaaS, mobile app, or systems architecture idea you have. My AI (powered by Gemini with Groq fallback) will compile a recommended technology stack and high-level architectural plan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-stretch">
        
        {/* Input Area */}
        <div className="bg-card border border-border p-6 shadow-[4px_4px_0_0_var(--primary)] flex flex-col h-full">
          <h3 className="font-bold text-sm uppercase tracking-wider mb-4 border-b border-border pb-4 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-primary" /> Describe Your Idea
          </h3>
          <form onSubmit={handleAnalyze} className="flex flex-col flex-1 gap-4">
            <textarea
              className="flex-1 bg-background border border-border p-4 focus:outline-none focus:border-primary resize-none min-h-[220px] text-xs leading-relaxed"
              placeholder="E.g., I want to build a real-time collaborative whiteboard app for remote teams, with video chat integration..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              disabled={isAnalyzing}
            />
            <button
              type="submit"
              disabled={isAnalyzing || !idea.trim()}
              className="bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider py-4 hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
              ) : (
                "Analyze Architecture"
              )}
            </button>
          </form>
          {error && <p className="text-destructive mt-4 text-xs">{error}</p>}
        </div>

        {/* Results Area */}
        <div className="bg-card border border-border p-6 shadow-[4px_4px_0_0_var(--primary)] flex flex-col min-h-[400px] h-full justify-between">
          <div className="flex flex-col flex-1">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 border-b border-border pb-4 flex items-center gap-2">
              <Settings className="w-4 h-4 text-primary" /> AI Analysis
            </h3>
            
            {!result && !isAnalyzing && (
               <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground text-center py-12">
                 <Database className="w-12 h-12 opacity-20 mb-3 text-primary" />
                 <p className="text-xs">Awaiting your idea input to generate an architecture plan.</p>
               </div>
            )}

            {isAnalyzing && (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground py-12">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                   <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                   <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <p className="text-[10px] uppercase tracking-widest mt-3 font-bold">Computing optimal stack...</p>
              </div>
            )}

            {result && (
              <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Complexity Level</h4>
                  <div className={`inline-block px-2.5 py-0.5 font-bold text-xs border ${result.complexity === 'Extreme' ? 'bg-destructive/10 text-destructive border-destructive/20' : result.complexity === 'High' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>
                    {result.complexity}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Recommended Architecture</h4>
                  <p className="text-xs leading-relaxed bg-background p-3.5 border border-border text-foreground">
                    {result.architecture}
                  </p>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Suggested Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.techStack.map((tech, i) => (
                      <span key={i} className="bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 text-xs font-semibold rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
