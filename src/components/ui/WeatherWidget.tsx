"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
  MapPin,
  Loader2,
} from "lucide-react";

interface WeatherWidgetProps {
  temperature: number;
  weatherCode: number;
  weatherLabel: string;
  isDay: boolean;
  location: string;
  isLoading: boolean;
  error: string | null;
}

function getWeatherIcon(code: number, isDay: boolean) {
  if (code <= 1) return isDay ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-300" />;
  if (code <= 3) return <Cloud className="w-4 h-4 text-slate-400" />;
  if (code >= 45 && code <= 48) return <CloudFog className="w-4 h-4 text-slate-400" />;
  if (code >= 51 && code <= 57) return <CloudDrizzle className="w-4 h-4 text-blue-400" />;
  if (code >= 61 && code <= 67) return <CloudRain className="w-4 h-4 text-blue-500" />;
  if (code >= 71 && code <= 77) return <CloudSnow className="w-4 h-4 text-sky-300" />;
  if (code >= 80 && code <= 86) return <CloudRain className="w-4 h-4 text-blue-600" />;
  if (code >= 95) return <CloudLightning className="w-4 h-4 text-yellow-500" />;
  return <Sun className="w-4 h-4 text-amber-500" />;
}

export function WeatherWidget({
  temperature,
  weatherCode,
  weatherLabel,
  isDay,
  location,
  isLoading,
  error,
}: WeatherWidgetProps) {
  if (error && !isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-28 md:top-32 right-4 md:right-8 z-30 flex justify-end"
      >
        <div className="relative group cursor-default">
          {/* Subtle animated glow behind the pill */}
          <div className="absolute inset-0 bg-primary/20 dark:bg-primary/10 rounded-full blur-xl group-hover:bg-primary/30 transition-colors duration-500" />
          
          <div className="relative flex items-center h-10 md:h-12 bg-background/60 dark:bg-black/40 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:bg-background/80 dark:hover:bg-black/60">
            
            {isLoading ? (
              <div className="flex items-center gap-2 px-6">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground">Detecting environment...</span>
              </div>
            ) : (
              <>
                {/* Weather Section */}
                <div className="flex items-center gap-2.5 pl-4 pr-3 py-1 bg-gradient-to-r from-transparent to-black/5 dark:to-white/5 h-full">
                  <motion.div 
                    animate={{ y: [0, -2, 0] }} 
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="flex items-center justify-center drop-shadow-md"
                  >
                    {getWeatherIcon(weatherCode, isDay)}
                  </motion.div>
                  <div className="flex flex-col justify-center">
                    <span className="text-sm font-bold text-foreground leading-none">{temperature}°C</span>
                    <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-widest mt-0.5">{weatherLabel}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-[1px] h-3/5 bg-black/10 dark:bg-white/10" />

                {/* Location Section */}
                <div className="flex items-center gap-2 pl-3 pr-5 py-1 h-full">
                  <MapPin className="w-3.5 h-3.5 text-primary/80" />
                  <span className="text-xs font-semibold text-foreground tracking-wide">{location || "Unknown"}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
