"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface VisitorContextType {
  visitorId: string | null;
  nickname: string | null;
  xp: number;
  country: string | null;
  visits: number;
  grantXp: (amount: number) => Promise<void>;
}

const VisitorContext = createContext<VisitorContextType | undefined>(undefined);

export function VisitorProvider({ children }: { children: React.ReactNode }) {
  const [visitorData, setVisitorData] = useState({
    visitorId: null as string | null,
    nickname: null as string | null,
    xp: 0,
    country: null as string | null,
    visits: 0
  });

  const grantXp = async (amount: number) => {
    if (!visitorData.visitorId) return;
    try {
      const res = await fetch('/api/visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId: visitorData.visitorId, action: 'grant_xp' })
      });
      if (res.ok) {
        const data = await res.json();
        setVisitorData(prev => ({
          ...prev,
          xp: data.xp
        }));
      }
    } catch (e) {
      console.error("Failed to grant XP", e);
    }
  };

  useEffect(() => {
    async function initVisitor() {
      // Check localStorage for visitorId
      let vId = localStorage.getItem('visitorId');
      if (!vId) {
        vId = crypto.randomUUID();
        localStorage.setItem('visitorId', vId);
      }

      try {
        const res = await fetch('/api/visitor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitorId: vId, action: 'page_load' })
        });
        
        if (res.ok) {
          const data = await res.json();
          setVisitorData({
            visitorId: vId,
            nickname: data.nickname,
            xp: data.xp,
            country: data.country,
            visits: data.visits
          });
        }
      } catch (e) {
        console.error("Failed to init visitor", e);
      }
    }

    initVisitor();
  }, []);

  return (
    <VisitorContext.Provider value={{ ...visitorData, grantXp }}>
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitor() {
  const context = useContext(VisitorContext);
  if (context === undefined) {
    throw new Error('useVisitor must be used within a VisitorProvider');
  }
  return context;
}
