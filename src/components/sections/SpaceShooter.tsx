"use client";

import { useEffect, useRef, useState } from 'react';
import { useVisitor } from '@/components/providers/VisitorProvider';
import { Gamepad2, Play, RotateCcw, Shield, Zap, Crosshair, Award, Trophy } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

interface Bullet {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  color: string;
}

interface Enemy {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  points: number;
  type: 'scout' | 'bruiser';
  hp: number;
  maxHp: number;
  hoverOffset: number;
  hoverSpeed: number;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

interface SpaceShooterProps {
  onScoreSubmitted?: () => void;
}

export function SpaceShooter({ onScoreSubmitted }: SpaceShooterProps) {
  const visitor = useVisitor();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
  
  // HUD states
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(1);
  const [energy, setEnergy] = useState(100);
  const [xpEarned, setXpEarned] = useState(0);
  
  // Game Over stats
  const [accuracy, setAccuracy] = useState(0);
  const [enemiesDestroyed, setEnemiesDestroyed] = useState(0);
  
  // Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [playerName, setPlayerName] = useState(visitor?.nickname || '');
  const [playerCountry, setPlayerCountry] = useState(visitor?.country || 'Unknown');
  
  // Achievements
  const [achievements, setAchievements] = useState<string[]>([]);
  const [currentAchievement, setCurrentAchievement] = useState<string | null>(null);

  const stateRef = useRef({
    gameState: 'IDLE',
    score: 0,
    lives: 3,
    combo: 1,
    energy: 100,
    xpEarned: 0,
    shotsFired: 0,
    shotsHit: 0,
    enemiesDestroyed: 0,
    playerX: 210, // Center of 420px
    playerY: 220, // Bottom of 260px
    keys: { ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false, KeyA: false, KeyD: false, KeyW: false, KeyS: false, Space: false },
    bullets: [] as Bullet[],
    enemies: [] as Enemy[],
    particles: [] as Particle[],
    floatingTexts: [] as FloatingText[],
    shockwaves: [] as Shockwave[],
    lastEnemySpawn: 0,
    lastShootTime: 0,
    gridOffset: 0,
    screenFlash: 0,
  });

  useEffect(() => {
    stateRef.current.gameState = gameState;
  }, [gameState]);

  useEffect(() => {
    if (visitor?.nickname && !playerName) {
      setPlayerName(visitor.nickname);
      setPlayerCountry(visitor.country || 'Unknown');
    }
  }, [visitor, playerName]);

  useEffect(() => {
    const saved = localStorage.getItem('spaceshooter_premium_highscore');
    if (saved) setHighScore(parseInt(saved, 10));
    
    const savedAchievements = localStorage.getItem('spaceshooter_achievements');
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
  }, []);

  const triggerAchievement = (name: string) => {
    if (achievements.includes(name)) return;
    const newAchievements = [...achievements, name];
    setAchievements(newAchievements);
    localStorage.setItem('spaceshooter_achievements', JSON.stringify(newAchievements));
    setCurrentAchievement(name);
    setTimeout(() => setCurrentAchievement(null), 3000);
  };

  const startGame = () => {
    setGameState('PLAYING');
    setScore(0);
    setLives(3);
    setCombo(1);
    setEnergy(100);
    setXpEarned(0);
    setSubmitSuccess(false);
    
    stateRef.current = {
      ...stateRef.current,
      gameState: 'PLAYING',
      score: 0,
      lives: 3,
      combo: 1,
      energy: 100,
      xpEarned: 0,
      shotsFired: 0,
      shotsHit: 0,
      enemiesDestroyed: 0,
      playerX: 210,
      playerY: 220,
      bullets: [],
      enemies: [],
      particles: [],
      floatingTexts: [],
      shockwaves: [],
      lastEnemySpawn: performance.now(),
      lastShootTime: 0,
      screenFlash: 0,
    };
  };

  const submitScore = async () => {
    if (isSubmitting || submitSuccess) return;
    setIsSubmitting(true);
    try {
      await fetch('/api/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId: visitor?.visitorId || 'anonymous',
          nickname: playerName || 'Unknown Pilot',
          country: playerCountry,
          score: score,
          accuracy: accuracy,
          enemiesDestroyed: enemiesDestroyed,
        })
      });
      setSubmitSuccess(true);
      if (onScoreSubmitted) {
        onScoreSubmitted();
      }
    } catch (e) {
      console.error("Failed to submit score", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const gState = stateRef.current.gameState;
      if (gState !== 'PLAYING') return;

      const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyA', 'KeyD', 'KeyW', 'KeyS', 'Space'];
      if (keys.includes(e.code)) e.preventDefault();

      if (e.code === 'ArrowLeft' || e.code === 'KeyA') stateRef.current.keys.ArrowLeft = true;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') stateRef.current.keys.ArrowRight = true;
      if (e.code === 'ArrowUp' || e.code === 'KeyW') stateRef.current.keys.ArrowUp = true;
      if (e.code === 'ArrowDown' || e.code === 'KeyS') stateRef.current.keys.ArrowDown = true;
      if (e.code === 'Space') stateRef.current.keys.Space = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') stateRef.current.keys.ArrowLeft = false;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') stateRef.current.keys.ArrowRight = false;
      if (e.code === 'ArrowUp' || e.code === 'KeyW') stateRef.current.keys.ArrowUp = false;
      if (e.code === 'ArrowDown' || e.code === 'KeyS') stateRef.current.keys.ArrowDown = false;
      if (e.code === 'Space') stateRef.current.keys.Space = false;
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationId: number;
    let lastTime = performance.now();

    const drawShip = (x: number, y: number, isPlayer: boolean, type?: 'scout' | 'bruiser') => {
      ctx.save();
      ctx.translate(x, y);
      
      if (isPlayer) {
        // Futuristic Player Ship
        ctx.shadowColor = '#6366f1';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#1e1b4b';
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.moveTo(0, -15);
        ctx.lineTo(10, 10);
        ctx.lineTo(5, 5);
        ctx.lineTo(-5, 5);
        ctx.lineTo(-10, 10);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Core
        ctx.fillStyle = '#22d3ee';
        ctx.shadowColor = '#22d3ee';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(0, -2, 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        if (type === 'scout') {
          // Fast Scout Drone
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 8;
          ctx.fillStyle = '#450a0a';
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 1.5;
          
          ctx.beginPath();
          ctx.moveTo(0, 10);
          ctx.lineTo(8, -5);
          ctx.lineTo(0, -10);
          ctx.lineTo(-8, -5);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else {
          // Heavy Bruiser
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 12;
          ctx.fillStyle = '#451a03';
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2;
          
          ctx.beginPath();
          ctx.moveTo(-12, -8);
          ctx.lineTo(12, -8);
          ctx.lineTo(8, 8);
          ctx.lineTo(-8, 8);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          
          // Details
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(-4, 0, 8, 2);
        }
      }
      ctx.restore();
    };

    const renderLoop = (time: number) => {
      const dt = Math.min(0.1, (time - lastTime) / 1000);
      lastTime = time;
      const state = stateRef.current;

      // 1. Background
      ctx.fillStyle = '#0B1020';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated Grid
      state.gridOffset = (state.gridOffset + 20 * dt) % 30;
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = state.gridOffset - 30; y < canvas.height; y += 30) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      if (state.gameState === 'PLAYING') {
        const speed = 200 * dt;
        
        // Energy Regen
        state.energy = Math.min(100, state.energy + 15 * dt);
        setEnergy(Math.floor(state.energy));

        // Player Movement
        if (state.keys.ArrowLeft) state.playerX = Math.max(15, state.playerX - speed);
        if (state.keys.ArrowRight) state.playerX = Math.min(canvas.width - 15, state.playerX + speed);
        if (state.keys.ArrowUp) state.playerY = Math.max(15, state.playerY - speed);
        if (state.keys.ArrowDown) state.playerY = Math.min(canvas.height - 15, state.playerY + speed);

        // Shooting
        if (state.keys.Space && time - state.lastShootTime > 150 && state.energy >= 5) {
          state.bullets.push({
            x: state.playerX,
            y: state.playerY - 15,
            w: 2,
            h: 12,
            speed: 400,
            color: '#6366f1'
          });
          state.lastShootTime = time;
          state.energy -= 5;
          state.shotsFired++;
          
          // Recoil/Thruster particles
          for(let i=0; i<3; i++) {
             state.particles.push({
               x: state.playerX + (Math.random() - 0.5) * 6,
               y: state.playerY + 10,
               vx: (Math.random() - 0.5) * 20,
               vy: 50 + Math.random() * 50,
               size: Math.random() * 2 + 1,
               color: '#22d3ee',
               alpha: 1,
               life: 0,
               maxLife: 0.3
             });
          }
        }

        // Spawn Enemies
        const spawnRate = Math.max(600, 1500 - state.score * 2);
        if (time - state.lastEnemySpawn > spawnRate) {
          const isBruiser = Math.random() > 0.8 && state.score > 200;
          state.enemies.push({
            x: Math.random() * (canvas.width - 30) + 15,
            y: -20,
            w: isBruiser ? 24 : 16,
            h: isBruiser ? 16 : 20,
            speed: isBruiser ? 60 : 100 + Math.random() * 40,
            points: isBruiser ? 25 : 10,
            type: isBruiser ? 'bruiser' : 'scout',
            hp: isBruiser ? 3 : 1,
            maxHp: isBruiser ? 3 : 1,
            hoverOffset: Math.random() * Math.PI * 2,
            hoverSpeed: Math.random() * 2 + 1
          });
          state.lastEnemySpawn = time;
        }

        // Update Bullets
        for (let i = state.bullets.length - 1; i >= 0; i--) {
          const b = state.bullets[i];
          b.y -= b.speed * dt;
          
          // Draw Bullet
          ctx.shadowColor = b.color;
          ctx.shadowBlur = 8;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(b.x - b.w/2, b.y, b.w, b.h);
          ctx.shadowBlur = 0;

          if (b.y < -20) {
            state.bullets.splice(i, 1);
            state.combo = 1; // Reset combo on miss
            setCombo(1);
          }
        }

        // Update Enemies
        for (let i = state.enemies.length - 1; i >= 0; i--) {
          const e = state.enemies[i];
          e.y += e.speed * dt;
          e.hoverOffset += e.hoverSpeed * dt;
          
          const drawX = e.x + Math.sin(e.hoverOffset) * 15;
          drawShip(drawX, e.y, false, e.type);

          // HP Bar for bruisers
          if (e.type === 'bruiser' && e.hp < e.maxHp) {
             ctx.fillStyle = '#451a03';
             ctx.fillRect(drawX - 10, e.y - 15, 20, 3);
             ctx.fillStyle = '#f59e0b';
             ctx.fillRect(drawX - 10, e.y - 15, 20 * (e.hp / e.maxHp), 3);
          }

          // Player Collision
          const dist = Math.hypot(drawX - state.playerX, e.y - state.playerY);
          if (dist < 20) {
            state.enemies.splice(i, 1);
            state.lives--;
            setLives(state.lives);
            state.combo = 1;
            setCombo(1);
            state.screenFlash = 1;

            state.shockwaves.push({ x: drawX, y: e.y, radius: 5, maxRadius: 100, alpha: 1, color: '#ef4444' });

            for(let p=0; p<20; p++) {
              state.particles.push({
                x: drawX, y: e.y,
                vx: (Math.random() - 0.5) * 200, vy: (Math.random() - 0.5) * 200,
                size: Math.random() * 4 + 1, color: '#ef4444', alpha: 1, life: 0, maxLife: 0.5
              });
            }

            if (state.lives <= 0) {
              setGameState('GAMEOVER');
              setAccuracy(state.shotsFired > 0 ? Math.round((state.shotsHit / state.shotsFired) * 100) : 0);
              setEnemiesDestroyed(state.enemiesDestroyed);
              
              if (state.score > highScore) {
                localStorage.setItem('spaceshooter_premium_highscore', state.score.toString());
                setHighScore(state.score);
              }
            }
            continue;
          }

          if (e.y > canvas.height + 20) {
            state.enemies.splice(i, 1);
            state.combo = 1;
            setCombo(1);
          }
        }

        // Bullet-Enemy Collisions
        for (let bi = state.bullets.length - 1; bi >= 0; bi--) {
          const b = state.bullets[bi];
          let hit = false;

          for (let ei = state.enemies.length - 1; ei >= 0; ei--) {
            const e = state.enemies[ei];
            const drawX = e.x + Math.sin(e.hoverOffset) * 15;

            if (Math.hypot(b.x - drawX, b.y - e.y) < 18) {
              hit = true;
              e.hp--;
              state.shotsHit++;
              
              // Spark particles
              for(let p=0; p<5; p++) {
                state.particles.push({
                  x: b.x, y: b.y,
                  vx: (Math.random() - 0.5) * 100, vy: (Math.random() - 0.5) * 100,
                  size: Math.random() * 2 + 1, color: '#f59e0b', alpha: 1, life: 0, maxLife: 0.2
                });
              }

              if (e.hp <= 0) {
                state.enemies.splice(ei, 1);
                state.enemiesDestroyed++;
                
                const pointsGained = e.points * state.combo;
                state.score += pointsGained;
                setScore(state.score);
                
                state.combo = Math.min(10, state.combo + 1);
                setCombo(state.combo);

                state.shockwaves.push({ x: drawX, y: e.y, radius: 2, maxRadius: e.type === 'bruiser' ? 60 : 40, alpha: 1, color: e.type === 'bruiser' ? '#f59e0b' : '#ef4444' });

                for(let p=0; p<15; p++) {
                  state.particles.push({
                    x: drawX, y: e.y,
                    vx: (Math.random() - 0.5) * 150, vy: (Math.random() - 0.5) * 150,
                    size: Math.random() * 3 + 1, color: e.type === 'bruiser' ? '#f59e0b' : '#ef4444', alpha: 1, life: 0, maxLife: 0.4
                  });
                }

                state.floatingTexts.push({
                  x: drawX, y: e.y, text: `+${pointsGained}`, color: state.combo > 1 ? '#8b5cf6' : '#ffffff', alpha: 1, life: 0, maxLife: 0.8
                });

                // XP logic
                const newMilestone = Math.floor(state.score / 500);
                if (newMilestone > state.xpEarned) {
                  state.xpEarned = newMilestone;
                  setXpEarned(newMilestone * 25);
                  if (visitor?.grantXp) visitor.grantXp(25);
                  
                  state.floatingTexts.push({
                    x: canvas.width/2, y: canvas.height/2, text: `+25 XP!`, color: '#22d3ee', alpha: 1, life: 0, maxLife: 1.5
                  });
                }
              }
              break;
            }
          }
          if (hit) state.bullets.splice(bi, 1);
        }

        // Render Player
        drawShip(state.playerX, state.playerY, true);

        // Achievements check
        if (state.score >= 100) triggerAchievement("Score 100+");
        if (state.score >= 500) triggerAchievement("Score 500+");
        if (state.score >= 1500) triggerAchievement("Elite Defender");
      }

      // Render Particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life += dt;
        p.alpha = 1 - (p.life / p.maxLife);
        
        if (p.life >= p.maxLife) {
          state.particles.splice(i, 1);
        } else {
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // Render Shockwaves
      for (let i = state.shockwaves.length - 1; i >= 0; i--) {
        const s = state.shockwaves[i];
        s.radius += 100 * dt;
        s.alpha = 1 - (s.radius / s.maxRadius);
        
        if (s.radius >= s.maxRadius) {
          state.shockwaves.splice(i, 1);
        } else {
          ctx.globalAlpha = s.alpha;
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // Render Floating Texts
      for (let i = state.floatingTexts.length - 1; i >= 0; i--) {
        const ft = state.floatingTexts[i];
        ft.y -= 30 * dt;
        ft.life += dt;
        ft.alpha = 1 - Math.pow(ft.life / ft.maxLife, 2);
        
        if (ft.life >= ft.maxLife) {
          state.floatingTexts.splice(i, 1);
        } else {
          ctx.globalAlpha = ft.alpha;
          ctx.fillStyle = ft.color;
          ctx.font = 'bold 12px "Geist Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(ft.text, ft.x, ft.y);
        }
      }
      ctx.globalAlpha = 1;

      // Screen Flash
      if (state.screenFlash > 0) {
        ctx.globalAlpha = state.screenFlash;
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        state.screenFlash -= 3 * dt;
        ctx.globalAlpha = 1;
      }

      animationId = requestAnimationFrame(renderLoop);
    };

    animationId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationId);
  }, [visitor, achievements, gameState]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Game Container - Glassmorphism */}
      <div className="relative w-full max-w-3xl mx-auto bg-[#0B1020] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
        
        {/* HUD Overlay */}
        {gameState === 'PLAYING' && (
          <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between z-10 font-mono text-white select-none">
            {/* Top HUD */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <div className="text-2xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                  {score.toString().padStart(6, '0')}
                </div>
                <div className="text-xs text-primary font-bold">
                  {xpEarned > 0 ? `+${xpEarned} XP` : '0 XP'}
                </div>
                {combo > 1 && (
                  <div className="text-sm text-[#8b5cf6] font-black animate-pulse">
                    {combo}x COMBO
                  </div>
                )}
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Shield key={i} className={`w-4 h-4 ${i < lives ? 'text-[#22d3ee] fill-[#22d3ee] drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]' : 'text-white/20'}`} />
                  ))}
                </div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest">
                  High: {highScore}
                </div>
              </div>
            </div>

            {/* Bottom HUD - Energy Bar */}
            <div className="w-full flex items-center gap-3">
              <span className="text-[10px] text-[#22d3ee] font-bold tracking-widest">NRG</span>
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#6366f1] to-[#22d3ee] transition-all duration-75"
                  style={{ width: `${energy}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Canvas */}
        <canvas 
          ref={canvasRef} 
          width={420} 
          height={260} 
          className="w-full h-auto aspect-[420/260] block cursor-crosshair"
          style={{ touchAction: 'none' }}
        />

        {/* IDLE Overlay */}
        {gameState === 'IDLE' && (
          <div className="absolute inset-0 bg-[#0B1020]/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
            <Gamepad2 className="w-16 h-16 text-[#6366f1] drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] mb-4" />
            <h4 className="font-black text-2xl uppercase tracking-widest text-white mb-2">DEFENDER: SPACE SHIELD</h4>
            <p className="text-xs text-white/70 uppercase tracking-wider mb-8 max-w-md leading-relaxed">
              Use arrow keys or WASD to move. Spacebar to fire. <br/> Preserve energy and maintain accuracy for high scores.
            </p>
            <button
              onClick={startGame}
              className="bg-[#6366f1] text-white font-black text-sm uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#8b5cf6] hover:scale-105 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center gap-2"
            >
              <Play className="w-5 h-5 fill-white" /> INITIALIZE
            </button>
          </div>
        )}

        {/* GAMEOVER Overlay */}
        {gameState === 'GAMEOVER' && (
          <div className="absolute inset-0 bg-[#0B1020]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 text-white">
            <h4 className="font-black text-3xl uppercase tracking-tighter text-[#ef4444] drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] mb-6">MISSION FAILED</h4>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8 w-full max-w-xs">
              <div className="flex flex-col items-end border-r border-white/10 pr-4">
                <span className="text-[10px] text-white/50 uppercase tracking-widest">Final Score</span>
                <span className="text-2xl font-black text-[#22d3ee]">{score}</span>
              </div>
              <div className="flex flex-col items-start pl-4">
                <span className="text-[10px] text-white/50 uppercase tracking-widest">Accuracy</span>
                <span className="text-2xl font-black text-white">{accuracy}%</span>
              </div>
              <div className="flex flex-col items-end border-r border-white/10 pr-4">
                <span className="text-[10px] text-white/50 uppercase tracking-widest">Kills</span>
                <span className="text-xl font-bold text-white">{enemiesDestroyed}</span>
              </div>
              <div className="flex flex-col items-start pl-4">
                <span className="text-[10px] text-white/50 uppercase tracking-widest">XP Earned</span>
                <span className="text-xl font-bold text-[#8b5cf6]">{xpEarned > 0 ? `+${xpEarned}` : '0'}</span>
              </div>
            </div>

            {submitSuccess ? (
              <div className="text-[#10b981] font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                <Award className="w-4 h-4" /> Score Submitted Successfully!
              </div>
            ) : (
              <div className="flex flex-col gap-3 w-full max-w-xs mb-6">
                <input 
                  type="text" 
                  value={playerName}
                  onChange={e => setPlayerName(e.target.value)}
                  placeholder="Enter Pilot Name"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#6366f1] transition-colors"
                  maxLength={15}
                />
                <button
                  onClick={submitScore}
                  disabled={isSubmitting || !playerName.trim() || score === 0}
                  className="bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest px-4 py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
                >
                  <Trophy className="w-4 h-4" /> Submit to Leaderboard
                </button>
              </div>
            )}

            <button
              onClick={startGame}
              className="bg-[#6366f1] text-white font-black text-xs uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-[#8b5cf6] transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> PLAY AGAIN
            </button>
          </div>
        )}

        {/* Achievement Slide-in */}
        <div className={`absolute bottom-4 right-4 bg-card/90 backdrop-blur-md border border-[#8b5cf6] p-3 rounded-lg flex items-center gap-3 transition-all duration-500 z-30 ${currentAchievement ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'}`}>
          <div className="w-8 h-8 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-[#8b5cf6]" />
          </div>
          <div>
            <div className="text-[9px] text-[#8b5cf6] uppercase tracking-widest font-bold">Achievement Unlocked</div>
            <div className="text-sm font-black text-white">{currentAchievement}</div>
          </div>
        </div>

      </div>
      
      {/* Mobile touch controls helper */}
      <div className="flex md:hidden justify-between w-full max-w-3xl mx-auto gap-2 px-2">
        <div className="flex gap-2 flex-1">
          <button 
            onTouchStart={() => { stateRef.current.keys.ArrowLeft = true; }}
            onTouchEnd={() => { stateRef.current.keys.ArrowLeft = false; }}
            className="flex-1 bg-card border border-border py-4 rounded-xl flex justify-center active:bg-muted"
          >◀</button>
          <button 
            onTouchStart={() => { stateRef.current.keys.ArrowRight = true; }}
            onTouchEnd={() => { stateRef.current.keys.ArrowRight = false; }}
            className="flex-1 bg-card border border-border py-4 rounded-xl flex justify-center active:bg-muted"
          >▶</button>
        </div>
        <button 
          onTouchStart={() => { stateRef.current.keys.Space = true; }}
          onTouchEnd={() => { stateRef.current.keys.Space = false; }}
          className="flex-1 bg-[#6366f1]/20 border border-[#6366f1]/50 text-[#6366f1] font-black tracking-widest py-4 rounded-xl flex justify-center items-center gap-2 active:bg-[#6366f1]/40"
        >
          <Crosshair className="w-4 h-4" /> FIRE
        </button>
      </div>

    </div>
  );
}

// Subcomponent for the Game Leaderboard
export function GameLeaderboard({ refreshTrigger }: { refreshTrigger: boolean }) {
  const [data, setData] = useState<{
    topScores: Array<{ nickname: string, country: string, score: number }>;
    stats: { totalGames: number, topScore: number };
  } | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/game');
        if (res.ok) {
          setData(await res.json());
        }
      } catch (e) {
        console.error("Failed to load game leaderboard", e);
      }
    }
    fetchLeaderboard();
  }, [refreshTrigger]);

  return (
    <div className="w-full bg-card border border-border p-6 shadow-[4px_4px_0_0_var(--primary)] flex flex-col gap-6 h-full transition-all duration-300">
      
      {/* Top 3 Pilots */}
      <div className="flex-1">
        <h4 className="font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#f59e0b]" /> Hall of Fame
        </h4>
        <div className="flex flex-col gap-3">
          {data?.topScores.length === 0 ? (
            <p className="text-xs text-muted-foreground">No pilots have completed a mission yet.</p>
          ) : (
            data?.topScores.map((score, i) => (
              <div key={i} className="flex justify-between items-center bg-background border border-border p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-black ${i === 0 ? 'text-[#f59e0b]' : i === 1 ? 'text-slate-400' : 'text-amber-700'}`}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                  </span>
                  <div>
                    <div className="text-sm font-bold">{score.nickname}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{score.country}</div>
                  </div>
                </div>
                <div className="text-[#6366f1] font-black">{score.score}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Global Stats */}
      <div className="flex flex-col gap-4">
        <h4 className="font-black uppercase tracking-widest text-sm mb-0 flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" /> Global Stats
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background border border-border p-3 rounded-lg flex flex-col gap-0.5">
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest">Top Score</span>
            <span className="text-lg font-black text-primary">{data?.stats.topScore || 0}</span>
          </div>
          <div className="bg-background border border-border p-3 rounded-lg flex flex-col gap-0.5">
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest">Missions</span>
            <span className="text-lg font-black">{data?.stats.totalGames || 0}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
