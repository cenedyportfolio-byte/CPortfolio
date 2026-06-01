"use client";

import { useState } from 'react';
import { useVisitor } from '@/components/providers/VisitorProvider';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Beaker, Settings, Database, Code2, Loader2 } from 'lucide-react';

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
    <SectionWrapper id="problem-solver-lab" className="bg-muted/30">
      <div className="max-w-5xl mx-auto w-full">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 flex items-center justify-center gap-4">
            <Beaker className="w-12 h-12 text-primary" /> Product Idea Lab
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Describe a product or software idea you have. My AI (powered by Gemini) will analyze it and instantly generate a recommended system architecture and tech stack.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Area */}
          <div className="bg-card border border-border p-6 flex flex-col">
            <h3 className="font-bold text-xl uppercase tracking-wider mb-4 border-b border-border pb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" /> Describe Your Idea
            </h3>
            <form onSubmit={handleAnalyze} className="flex flex-col flex-1 gap-4">
              <textarea
                className="flex-1 bg-background border border-border p-4 focus:outline-none focus:border-primary resize-none min-h-[200px]"
                placeholder="E.g., I want to build a real-time collaborative whiteboard app for remote teams, with video chat integration..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                disabled={isAnalyzing}
              />
              <button
                type="submit"
                disabled={isAnalyzing || !idea.trim()}
                className="bg-primary text-primary-foreground font-bold uppercase tracking-wider py-4 hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</>
                ) : (
                  "Analyze Architecture"
                )}
              </button>
            </form>
            {error && <p className="text-destructive mt-4 text-sm">{error}</p>}
          </div>

          {/* Results Area */}
          <div className="bg-card border border-border p-6 flex flex-col min-h-[400px]">
            <h3 className="font-bold text-xl uppercase tracking-wider mb-4 border-b border-border pb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" /> AI Analysis
            </h3>
            
            {!result && !isAnalyzing && (
               <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground text-center">
                 <Database className="w-16 h-16 opacity-20 mb-4" />
                 <p>Awaiting your idea input to generate an architecture plan.</p>
               </div>
            )}

            {isAnalyzing && (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                   <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                   <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <p className="text-sm uppercase tracking-widest mt-4">Computing optimal stack...</p>
              </div>
            )}

            {result && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Complexity Level</h4>
                  <div className={`inline-block px-3 py-1 font-bold text-sm border ${result.complexity === 'Extreme' ? 'bg-destructive/20 text-destructive border-destructive' : result.complexity === 'High' ? 'bg-orange-500/20 text-orange-500 border-orange-500' : 'bg-green-500/20 text-green-500 border-green-500'}`}>
                    {result.complexity}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Recommended Architecture</h4>
                  <p className="leading-relaxed bg-background p-4 border border-border">
                    {result.architecture}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Suggested Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.techStack.map((tech, i) => (
                      <span key={i} className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-sm font-medium">
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
    </SectionWrapper>
  );
}
