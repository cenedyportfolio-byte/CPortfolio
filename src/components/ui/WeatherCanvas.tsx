"use client";

import { useRef, useEffect, useCallback } from "react";

interface WeatherCanvasProps {
  weatherCode: number;
  isDay: boolean;
  isLoading: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  angle?: number;
  drift?: number;
  length?: number;
  brightness?: number;
}

type WeatherType = "clear" | "cloudy" | "fog" | "rain" | "snow" | "storm" | "heavyRain";

function getWeatherType(code: number): WeatherType {
  if (code <= 1) return "clear";
  if (code <= 3) return "cloudy";
  if (code >= 45 && code <= 48) return "fog";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 95) return "storm";
  if (code >= 80 && code <= 82) return "heavyRain";
  if (code >= 51 && code <= 67) return "rain";
  return "clear";
}

function getParticleCount(type: WeatherType, isMobile: boolean): number {
  const counts: Record<WeatherType, [number, number]> = {
    clear: [30, 15],
    cloudy: [12, 6],
    fog: [15, 8],
    rain: [120, 60],
    snow: [60, 30],
    storm: [160, 80],
    heavyRain: [200, 100],
  };
  const [desktop, mobile] = counts[type];
  return isMobile ? mobile : desktop;
}

function createParticle(
  type: WeatherType,
  width: number,
  height: number,
  isDay: boolean
): Particle {
  const base: Particle = {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: 0,
    vy: 0,
    size: 2,
    opacity: 0.3,
    life: 0,
    maxLife: 1000,
  };

  switch (type) {
    case "clear": {
      // Sun ray motes — golden particles floating gently
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.15 + Math.random() * 0.3;
      return {
        ...base,
        x: width * 0.3 + Math.random() * width * 0.4,
        y: Math.random() * height * 0.6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.1,
        size: 1.5 + Math.random() * 3,
        opacity: 0.1 + Math.random() * 0.25,
        life: Math.random() * 400,
        maxLife: 400 + Math.random() * 300,
        brightness: isDay ? (0.85 + Math.random() * 0.15) : (0.4 + Math.random() * 0.3),
      };
    }

    case "cloudy": {
      // Cloud puffs drifting horizontally
      return {
        ...base,
        x: -100 + Math.random() * (width + 200),
        y: Math.random() * height * 0.5,
        vx: 0.2 + Math.random() * 0.4,
        vy: Math.sin(Math.random() * Math.PI) * 0.05,
        size: 40 + Math.random() * 60,
        opacity: 0.03 + Math.random() * 0.05,
        life: Math.random() * 800,
        maxLife: 800 + Math.random() * 400,
      };
    }

    case "fog": {
      // Slow horizontal fog wisps
      return {
        ...base,
        x: -200 + Math.random() * (width + 400),
        y: Math.random() * height,
        vx: 0.1 + Math.random() * 0.2,
        vy: 0,
        size: 80 + Math.random() * 120,
        opacity: 0.02 + Math.random() * 0.04,
        life: Math.random() * 600,
        maxLife: 600 + Math.random() * 600,
      };
    }

    case "rain":
    case "heavyRain": {
      const isHeavy = type === "heavyRain";
      return {
        ...base,
        x: Math.random() * (width + 100) - 50,
        y: -20 - Math.random() * 100,
        vx: isHeavy ? 1.5 + Math.random() : 0.5 + Math.random() * 0.5,
        vy: isHeavy ? 12 + Math.random() * 8 : 6 + Math.random() * 4,
        size: isHeavy ? 1.5 + Math.random() * 1 : 1 + Math.random() * 0.5,
        opacity: isHeavy ? 0.15 + Math.random() * 0.15 : 0.1 + Math.random() * 0.1,
        life: 0,
        maxLife: 200,
        length: isHeavy ? 18 + Math.random() * 12 : 10 + Math.random() * 8,
      };
    }

    case "snow": {
      const drift = (Math.random() - 0.5) * 0.8;
      return {
        ...base,
        x: Math.random() * width,
        y: -10 - Math.random() * 60,
        vx: drift,
        vy: 0.5 + Math.random() * 1.2,
        size: 2 + Math.random() * 4,
        opacity: 0.2 + Math.random() * 0.4,
        life: 0,
        maxLife: 500,
        drift,
        angle: Math.random() * Math.PI * 2,
      };
    }

    case "storm": {
      // Storm = rain + lightning flashes
      return {
        ...base,
        x: Math.random() * (width + 100) - 50,
        y: -20 - Math.random() * 100,
        vx: 2 + Math.random() * 1.5,
        vy: 14 + Math.random() * 8,
        size: 1.5 + Math.random() * 1,
        opacity: 0.15 + Math.random() * 0.2,
        life: 0,
        maxLife: 150,
        length: 20 + Math.random() * 15,
      };
    }

    default:
      return base;
  }
}

function drawParticle(
  ctx: CanvasRenderingContext2D,
  p: Particle,
  type: WeatherType,
  isDay: boolean
) {
  const fadeIn = Math.min(p.life / 30, 1);
  const fadeOut = Math.max(1 - p.life / p.maxLife, 0);
  const alpha = p.opacity * fadeIn * fadeOut;

  if (alpha <= 0) return;

  ctx.globalAlpha = alpha;

  switch (type) {
    case "clear": {
      const b = p.brightness || 0.9;
      const r = Math.round(255 * b);
      const g = Math.round(220 * b);
      const bv = Math.round(100 * b);
      ctx.fillStyle = isDay
        ? `rgb(${r}, ${g}, ${bv})`
        : `rgb(${Math.round(180 * b)}, ${Math.round(200 * b)}, ${Math.round(255 * b)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Glow effect
      ctx.globalAlpha = alpha * 0.3;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case "cloudy":
    case "fog": {
      const gradient = ctx.createRadialGradient(
        p.x, p.y, 0,
        p.x, p.y, p.size
      );
      const color = isDay ? "180, 190, 205" : "100, 110, 130";
      gradient.addColorStop(0, `rgba(${color}, ${alpha * 1.5})`);
      gradient.addColorStop(0.5, `rgba(${color}, ${alpha * 0.8})`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case "rain":
    case "heavyRain":
    case "storm": {
      const len = p.length || 12;
      const color = isDay ? `rgba(120, 160, 200, ${alpha})` : `rgba(150, 180, 220, ${alpha})`;
      ctx.strokeStyle = color;
      ctx.lineWidth = p.size;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.vx * 1.5, p.y - len);
      ctx.stroke();
      break;
    }

    case "snow": {
      ctx.fillStyle = isDay
        ? `rgba(200, 210, 230, ${alpha})`
        : `rgba(220, 230, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Soft glow
      ctx.globalAlpha = alpha * 0.2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  ctx.globalAlpha = 1;
}

export function WeatherCanvas({ weatherCode, isDay, isLoading }: WeatherCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const lightningRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const animate = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Throttle to ~60fps
      const delta = timestamp - lastTimeRef.current;
      if (delta < 14) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = timestamp;

      const { width, height } = canvas;
      const type = getWeatherType(weatherCode);
      const isMobile = width < 768;

      ctx.clearRect(0, 0, width, height);

      // Lightning flash for storms
      if (type === "storm" && lightningRef.current > 0) {
        const flashAlpha = lightningRef.current * 0.12;
        ctx.fillStyle = `rgba(220, 230, 255, ${flashAlpha})`;
        ctx.fillRect(0, 0, width, height);
        lightningRef.current = Math.max(0, lightningRef.current - 0.08);
      }

      // Trigger random lightning
      if (type === "storm" && Math.random() < 0.003) {
        lightningRef.current = 1;
      }

      const targetCount = getParticleCount(type, isMobile);
      const particles = particlesRef.current;

      // Remove dead particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.life > p.maxLife || p.y > height + 50 || p.x > width + 200 || p.x < -200) {
          particles.splice(i, 1);
        }
      }

      // Spawn new particles to maintain count
      while (particles.length < targetCount) {
        particles.push(createParticle(type, width, height, isDay));
      }

      // Update & draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Snow drift oscillation
        if (type === "snow" && p.drift !== undefined) {
          p.x += Math.sin(p.life * 0.02) * p.drift;
        }

        drawParticle(ctx, p, type, isDay);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    },
    [weatherCode, isDay]
  );

  // Handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Start/stop animation
  useEffect(() => {
    if (isLoading) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Reset particles when weather type changes
    particlesRef.current = [];
    lightningRef.current = 0;

    animFrameRef.current = requestAnimationFrame(animate);

    // Pause when tab is hidden
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animFrameRef.current);
      } else {
        lastTimeRef.current = 0;
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isLoading, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}
