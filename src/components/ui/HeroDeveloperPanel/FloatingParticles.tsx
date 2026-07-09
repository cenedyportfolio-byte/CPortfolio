"use client";

import { useRef, useEffect } from "react";

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = 300 * dpr;
    canvas.height = 600 * dpr;
    ctx.scale(dpr, dpr);

    interface Mote {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      life: number;
    }

    const motes: Mote[] = Array.from({ length: 12 }, () => ({
      x: Math.random() * 300,
      y: Math.random() * 600,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.1 - Math.random() * 0.15,
      size: 1 + Math.random() * 2,
      opacity: 0.04 + Math.random() * 0.06,
      life: Math.random() * 500,
    }));

    let raf: number;

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, 300, 600);

      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        m.life++;

        if (m.y < -10 || m.life > 600) {
          m.x = Math.random() * 300;
          m.y = 600 + Math.random() * 20;
          m.life = 0;
        }

        const fade = Math.min(m.life / 60, 1) * Math.max(1 - m.life / 600, 0);
        ctx.globalAlpha = m.opacity * fade;
        ctx.fillStyle = "#6366f1";
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);

    const handleVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(animate);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none rounded-[28px]"
      style={{ width: 300, height: 600 }}
      aria-hidden="true"
    />
  );
}
