import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';
import { Universe } from '../types';

interface UniverseCardProps {
  key?: string;
  universe: Universe;
  watchedPercent: number;
  entryCount: number;
  onClick: () => void;
}

export default function UniverseCard({ universe, watchedPercent, entryCount, onClick }: UniverseCardProps) {
  // Theme color maps for the progress bars and card accents
  const themeColors = {
    primary: {
      bar: 'bg-[#ffba20]',
      glow: 'shadow-[0_0_10px_rgba(255,186,32,0.5)]',
      text: 'text-[#ffba20]',
      bgGradient: 'from-[#ffba20]/10 via-transparent to-transparent',
      borderHover: 'hover:border-[#ffba20]/30',
    },
    secondary: {
      bar: 'bg-[#00e0ff]',
      glow: 'shadow-[0_0_10px_rgba(0,224,255,0.5)]',
      text: 'text-[#00e0ff]',
      bgGradient: 'from-[#00e0ff]/10 via-transparent to-transparent',
      borderHover: 'hover:border-[#00e0ff]/30',
    },
    tertiary: {
      bar: 'bg-[#ffb29b]',
      glow: 'shadow-[0_0_10px_rgba(255,178,155,0.5)]',
      text: 'text-[#ffb29b]',
      bgGradient: 'from-[#ffb29b]/10 via-transparent to-transparent',
      borderHover: 'hover:border-[#ffb29b]/30',
    },
    error: {
      bar: 'bg-[#ffb4ab]',
      glow: 'shadow-[0_0_10px_rgba(255,180,171,0.5)]',
      text: 'text-[#ffb4ab]',
      bgGradient: 'from-[#ffb4ab]/10 via-transparent to-transparent',
      borderHover: 'hover:border-[#ffb4ab]/30',
    },
    info: {
      bar: 'bg-[#3b82f6]',
      glow: 'shadow-[0_0_10px_rgba(59,130,246,0.5)]',
      text: 'text-[#3b82f6]',
      bgGradient: 'from-[#3b82f6]/10 via-transparent to-transparent',
      borderHover: 'hover:border-[#3b82f6]/30',
    }
  };

  const style = themeColors[universe.colorTheme] || themeColors.primary;

  return (
    <div 
      onClick={onClick}
      id={`universe-card-${universe.id}`}
      className={`relative group overflow-hidden rounded-lg border border-white/5 bg-[#141720]/80 cursor-pointer ${style.borderHover} transition-all duration-300 transform hover:-translate-y-1`}
    >
      {/* Atmospheric Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#141720]">
        <div className={`absolute inset-0 bg-gradient-to-tr ${
          universe.id === 'mcu' ? 'from-cyan-950/60 via-purple-950/20 to-transparent' :
          universe.id === 'dccinematic' ? 'from-blue-950/70 via-indigo-950/30 to-transparent' :
          universe.id === 'fastfurious' ? 'from-amber-950/60 via-orange-950/20 to-transparent' :
          universe.id === 'starwars' ? 'from-amber-950/50 via-blue-950/30 to-transparent' :
          universe.id === 'middleearth' ? 'from-yellow-950/50 via-emerald-950/20 to-transparent' :
          universe.id === 'conjuring' ? 'from-stone-900 via-zinc-900/60 to-transparent' :
          'from-red-950/60 via-emerald-950/20 to-transparent'
        }`} />
        <div className={`absolute -bottom-8 -right-8 w-48 h-48 rounded-full blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-500 ${
          universe.id === 'mcu' ? 'bg-[#00e0ff]' :
          universe.id === 'dccinematic' ? 'bg-[#3b82f6]' :
          universe.id === 'fastfurious' ? 'bg-amber-500' :
          universe.id === 'starwars' ? 'bg-[#ffba20]' :
          universe.id === 'middleearth' ? 'bg-emerald-500' :
          universe.id === 'conjuring' ? 'bg-red-700' :
          'bg-red-500'
        }`} />
      </div>

      {/* Background radial accent glow */}
      <div className={`absolute inset-0 z-1 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] ${style.bgGradient} transition-opacity duration-300 group-hover:opacity-100 opacity-60`} />

      {/* Content */}
      <div className="relative z-20 p-5 flex flex-col justify-end min-h-[165px] md:min-h-[180px] h-full">
        {/* Badge */}
        <div className="mb-1.5">
          <span 
            className="text-[9px] font-semibold tracking-[0.15em] bg-white/10 text-white px-2 py-0.5 rounded font-mono"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {universe.badge}
          </span>
        </div>

        {/* Title & Arrow */}
        <div className="flex items-center justify-between mb-1.5">
          <h3 
            className="text-lg md:text-xl font-bold text-white tracking-wide group-hover:text-[#ffdca1] transition-colors duration-300"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {universe.name}
          </h3>
          <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
        </div>

        {/* Tagline */}
        <p className="text-xs text-gray-400 mb-2.5 line-clamp-2 leading-relaxed">
          {universe.description}
        </p>

        {/* Progress Metrics */}
        <div className="mt-2 flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[11px] font-semibold tracking-wide font-mono">
            <span className="text-white/60">
              {entryCount} Entries
            </span>
            <span className={style.text}>
              {watchedPercent}% WATCHED
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full ${style.bar} ${style.glow} rounded-full transition-all duration-500`}
              style={{ width: `${watchedPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
