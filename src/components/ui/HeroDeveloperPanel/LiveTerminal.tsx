"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, CheckCircle2 } from "lucide-react";

const commands = [
  { cmd: "git commit", result: "Production Ready" },
  { cmd: "docker compose up", result: "Running" },
  { cmd: "npm run build", result: "Success" },
  { cmd: "git push origin main", result: "Completed" },
  { cmd: "deploy production", result: "Live" },
];

interface TermLine {
  typed: string;
  result: string;
  done: boolean;
}

export function LiveTerminal() {
  const [lines, setLines] = useState<TermLine[]>([]);
  const [cursorOn, setCursorOn] = useState(true);

  // Blink cursor
  useEffect(() => {
    const blink = setInterval(() => setCursorOn((v) => !v), 520);
    return () => clearInterval(blink);
  }, []);

  // Typing loop
  const runLoop = useCallback(async () => {
    for (let round = 0; ; round++) {
      setLines([]);
      for (let i = 0; i < commands.length; i++) {
        const { cmd, result } = commands[i];
        for (let c = 0; c <= cmd.length; c++) {
          await new Promise((r) => setTimeout(r, 40 + Math.random() * 25));
          setLines((prev) => {
            const updated = [...prev];
            updated[i] = { typed: cmd.slice(0, c), result, done: false };
            return updated;
          });
        }
        await new Promise((r) => setTimeout(r, 350));
        setLines((prev) => {
          const updated = [...prev];
          updated[i] = { typed: cmd, result, done: true };
          return updated;
        });
        await new Promise((r) => setTimeout(r, 500));
      }
      // Pause before restarting
      await new Promise((r) => setTimeout(r, 3000));
    }
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    runLoop();
    return () => ctrl.abort();
  }, [runLoop]);

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2.5">
        <TerminalIcon className="w-3.5 h-3.5 text-primary/60" />
        <span className="text-[11px] font-semibold text-foreground/60 uppercase tracking-[0.12em]">
          Live Terminal
        </span>
      </div>

      <div
        className="bg-[#0c0c0c] dark:bg-black/80 rounded-xl px-3 py-2.5 font-mono text-[10.5px] leading-[1.7] overflow-hidden border border-white/[0.04] min-h-[72px]"
        role="log"
        aria-label="Live terminal output"
      >
        {lines.map((line, i) => (
          <div key={`${i}-${line.typed}`} className="mb-0.5 last:mb-0">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400/70 select-none">$</span>
              <span className="text-zinc-300">
                {line.typed}
                {!line.done && (
                  <span
                    className="inline-block w-[5px] h-[12px] ml-[2px] -mb-[1px] bg-emerald-400/80 rounded-[1px]"
                    style={{ opacity: cursorOn ? 1 : 0 }}
                  />
                )}
              </span>
            </div>
            {line.done && (
              <motion.div
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1.5 ml-[18px]"
              >
                <CheckCircle2 className="w-[10px] h-[10px] text-emerald-400/90" />
                <span className="text-emerald-400/80 text-[10px]">{line.result}</span>
              </motion.div>
            )}
          </div>
        ))}
        {lines.length === 0 && (
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400/70 select-none">$</span>
            <span
              className="inline-block w-[5px] h-[12px] bg-emerald-400/80 rounded-[1px]"
              style={{ opacity: cursorOn ? 1 : 0 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
