"use client";

import { useEffect, useState } from 'react';
import { Trophy, Users, Globe, Activity, Medal, Zap } from 'lucide-react';
import { useVisitor } from '@/components/providers/VisitorProvider';
import { SpaceShooter, GameLeaderboard } from './SpaceShooter';

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
  const [gameRefreshTrigger, setGameRefreshTrigger] = useState(false);

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
  }, [visitor?.xp]);

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Row 1: Unified 3-Column Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Card 1: Interactive Coding Challenge (Description) */}
        <div className="bg-card border border-border p-6 shadow-[4px_4px_0_0_var(--primary)] flex flex-col justify-between h-full transition-all duration-300">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="text-primary w-5 h-5" />
              <h3 className="font-black text-sm uppercase tracking-wider">Interactive Showcase</h3>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed mb-4">
              This game utilizes HTML5 Canvas 2D render loops, framerate-independent physics, vector mathematics, dynamic collision boundaries, and MongoDB full-stack leaderboard state.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {['Canvas API', 'Mongoose', 'Game Physics', 'Particles'].map(tech => (
              <span key={tech} className="text-[9px] uppercase tracking-wider font-bold bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-md">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Card 2: Live Metrics */}
        <div className="bg-card border border-border p-6 shadow-[4px_4px_0_0_var(--primary)] flex flex-col justify-between h-full transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="text-primary w-5 h-5" />
            <h3 className="font-black text-sm uppercase tracking-wider">Live Platform Metrics</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-0.5 border-r border-border/50 pr-2">
              <span className="text-[8px] text-muted-foreground uppercase tracking-widest font-bold">Views</span>
              <span className="text-xl font-black">{data?.metrics.page_views ?? '...'}</span>
            </div>
            <div className="flex flex-col gap-0.5 border-r border-border/50 px-2">
              <span className="text-[8px] text-muted-foreground uppercase tracking-widest font-bold">Visitors</span>
              <span className="text-xl font-black text-primary">{data?.metrics.unique_visitors ?? '...'}</span>
            </div>
            <div className="flex flex-col gap-0.5 pl-2">
              <span className="text-[8px] text-muted-foreground uppercase tracking-widest font-bold">Chats</span>
              <span className="text-xl font-black text-purple-600">{data?.metrics.total_chats ?? '...'}</span>
            </div>
          </div>
          
          <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-semibold pt-3 border-t border-border/50 flex items-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Connection Established
          </div>
        </div>

        {/* Card 3: Top Visitors Leaderboard */}
        <div className="bg-card border border-border p-6 shadow-[4px_4px_0_0_var(--primary)] flex flex-col h-full transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Medal className="text-primary w-5 h-5" />
            <h3 className="font-black text-sm uppercase tracking-wider">Top Active Visitors</h3>
          </div>

          {(!data || !data.topVisitors.length) ? (
            <div className="text-center text-muted-foreground text-xs py-4">
              No active session profiles found.
            </div>
          ) : (
            <div className="flex flex-col gap-2 flex-1 justify-center">
              {data.topVisitors.slice(0, 3).map((v, i) => (
                <div 
                  key={i} 
                  className={`flex items-center justify-between p-2 rounded border ${v.nickname === visitor?.nickname ? 'border-primary/40 bg-primary/5' : 'border-border bg-background'}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold ${i === 0 ? 'bg-yellow-500 text-black' : i === 1 ? 'bg-slate-300 text-black' : 'bg-amber-700 text-white'}`}>
                      {i + 1}
                    </span>
                    <div className="truncate max-w-[100px]">
                      <div className="text-xs font-bold truncate flex items-center gap-1">
                        {v.nickname}
                        {v.nickname === visitor?.nickname && <span className="text-[7px] uppercase tracking-wider bg-primary/20 text-primary border border-primary/30 px-1 rounded">You</span>}
                      </div>
                      <div className="text-[8px] text-muted-foreground uppercase tracking-widest">{v.country}</div>
                    </div>
                  </div>
                  <div className="font-black text-xs text-primary">
                    {v.xp} <span className="text-[8px] text-muted-foreground font-normal">XP</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Row 2: Space Shooter + Game Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Column 1 & 2: Space Shooter */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <SpaceShooter onScoreSubmitted={() => setGameRefreshTrigger(prev => !prev)} />
        </div>

        {/* Column 3: Game Leaderboard (Hall of Fame) */}
        <div className="lg:col-span-1">
          <GameLeaderboard refreshTrigger={gameRefreshTrigger} />
        </div>

      </div>

    </div>
  );
}
