"use client";

import { useEffect, useState } from 'react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Trophy, Users, Globe, Activity, Medal } from 'lucide-react';
import { useVisitor } from '@/components/providers/VisitorProvider';

interface TopVisitor {
  nickname: string;
  xp: number;
  country: string;
}

interface AnalyticsData {
  metrics: {
    page_views: number;
    unique_visitors: number;
    total_chats: number;
  };
  topVisitors: TopVisitor[];
}

export function CommunityLeaderboard() {
  const visitor = useVisitor();
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/analytics');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (e) {
        console.error("Failed to fetch analytics", e);
      }
    }
    fetchLeaderboard();
  }, [visitor?.xp]); // Re-fetch if current visitor gains XP

  return (
    <SectionWrapper id="community" className="bg-background">
      <div className="max-w-6xl mx-auto w-full">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 flex items-center justify-center gap-4">
            <Trophy className="w-12 h-12 text-primary" /> Community Pulse
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            This portfolio is a living product. Watch the live analytics and see who tops the visitor leaderboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Live Analytics */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="bg-card border border-border p-6 shadow-[4px_4px_0_0_var(--primary)] h-full">
              <h3 className="font-bold text-xl uppercase tracking-wider mb-8 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" /> Live Metrics
              </h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-end border-b border-border/50 pb-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-muted-foreground" />
                    <span className="font-medium uppercase tracking-widest text-sm text-muted-foreground">Unique Visitors</span>
                  </div>
                  <span className="text-4xl font-black">{data?.metrics.unique_visitors || '...'}</span>
                </div>
                
                <div className="flex justify-between items-end border-b border-border/50 pb-4">
                  <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-muted-foreground" />
                    <span className="font-medium uppercase tracking-widest text-sm text-muted-foreground">Total Page Views</span>
                  </div>
                  <span className="text-4xl font-black">{data?.metrics.page_views || '...'}</span>
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <Activity className="w-6 h-6 text-muted-foreground" />
                    <span className="font-medium uppercase tracking-widest text-sm text-muted-foreground">AI Conversations</span>
                  </div>
                  <span className="text-4xl font-black">{data?.metrics.total_chats || '...'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="md:col-span-7">
            <div className="bg-card border border-border p-6 shadow-[4px_4px_0_0_var(--primary)] h-full">
               <h3 className="font-bold text-xl uppercase tracking-wider mb-6 flex items-center gap-2">
                <Medal className="w-5 h-5 text-primary" /> Top Visitors Leaderboard
               </h3>

               {(!data || !data.topVisitors.length) ? (
                 <div className="text-center text-muted-foreground py-8">
                   No visitors yet. Be the first to earn XP!
                 </div>
               ) : (
                 <div className="flex flex-col gap-4">
                   {data.topVisitors.map((v, i) => (
                     <div 
                       key={i} 
                       className={`flex items-center justify-between p-4 border ${v.nickname === visitor?.nickname ? 'border-primary bg-primary/5' : 'border-border bg-background'}`}
                     >
                       <div className="flex items-center gap-4">
                         <div className={`w-8 h-8 flex items-center justify-center font-black text-sm ${i === 0 ? 'bg-yellow-500 text-black' : i === 1 ? 'bg-slate-300 text-black' : i === 2 ? 'bg-amber-700 text-white' : 'bg-muted text-muted-foreground'}`}>
                           #{i + 1}
                         </div>
                         <div>
                           <div className="font-bold flex items-center gap-2">
                             {v.nickname}
                             {v.nickname === visitor?.nickname && <span className="text-[10px] uppercase tracking-widest bg-primary text-primary-foreground px-2 py-0.5 rounded-full">You</span>}
                           </div>
                           <div className="text-xs text-muted-foreground uppercase tracking-wider">{v.country}</div>
                         </div>
                       </div>
                       <div className="font-black text-xl text-primary">
                         {v.xp} <span className="text-sm text-muted-foreground font-normal">XP</span>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}
