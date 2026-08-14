import React from 'react';
import { Globe, ArrowRight, Film } from 'lucide-react';
import { Universe, TimelineEntry } from '../types';

interface UniverseCardProps {
  key?: string;
  universe: Universe;
  watchedPercent: number;
  entryCount: number;
  onClick: () => void;
  matchingEntries?: TimelineEntry[];
  onSelectEntry?: (entry: TimelineEntry) => void;
}

export default function UniverseCard({ 
  universe, 
  watchedPercent, 
  entryCount, 
  onClick,
  matchingEntries,
  onSelectEntry
}: UniverseCardProps) {
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
          universe.id === 'mcu' ? 'from-cyan-950/70 via-purple-950/40 to-transparent' :
          universe.id === 'fastfurious' ? 'from-amber-950/70 via-orange-950/40 to-transparent' :
          universe.id === 'starwars' ? 'from-yellow-950/70 via-blue-950/40 to-transparent' :
          universe.id === 'godzilla' ? 'from-red-950/80 via-emerald-950/40 to-transparent' :
          universe.id === 'middleearth' ? 'from-emerald-950/80 via-amber-950/40 to-transparent' :
          universe.id === 'conjuring' ? 'from-stone-900 via-rose-950/70 to-transparent' :
          universe.id === 'dccinematic' ? 'from-blue-950/80 via-indigo-950/40 to-transparent' :
          universe.id === 'xmen' ? 'from-sky-950/80 via-yellow-950/40 to-transparent' :
          universe.id === 'spiderman' ? 'from-rose-950/80 via-red-950/50 to-transparent' :
          universe.id === 'alienpredator' ? 'from-emerald-950/90 via-teal-950/50 to-transparent' :
          universe.id === 'planetoftheapes' ? 'from-emerald-950/80 via-amber-950/60 to-transparent' :
          universe.id === 'jurassic' ? 'from-amber-950/90 via-emerald-950/50 to-transparent' :
          universe.id === 'transformers' ? 'from-blue-950/90 via-red-950/60 to-transparent' :
          universe.id === 'johnwick' ? 'from-rose-950/90 via-slate-950/70 to-transparent' :
          universe.id === 'madmax' ? 'from-orange-950/90 via-amber-950/70 to-transparent' :
          universe.id === 'wizardingworld' ? 'from-amber-950/90 via-amber-900/60 to-transparent' :
          'from-indigo-950/70 via-purple-950/30 to-transparent'
        }`} />
        <div className={`absolute -bottom-8 -right-8 w-48 h-48 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 ${
          universe.id === 'mcu' ? 'bg-cyan-500' :
          universe.id === 'fastfurious' ? 'bg-amber-500' :
          universe.id === 'starwars' ? 'bg-yellow-500' :
          universe.id === 'godzilla' ? 'bg-red-500' :
          universe.id === 'middleearth' ? 'bg-emerald-500' :
          universe.id === 'conjuring' ? 'bg-red-800' :
          universe.id === 'dccinematic' ? 'bg-blue-500' :
          universe.id === 'xmen' ? 'bg-sky-400' :
          universe.id === 'spiderman' ? 'bg-rose-500' :
          universe.id === 'alienpredator' ? 'bg-teal-400' :
          universe.id === 'planetoftheapes' ? 'bg-emerald-600' :
          universe.id === 'jurassic' ? 'bg-amber-500' :
          universe.id === 'transformers' ? 'bg-blue-600' :
          universe.id === 'johnwick' ? 'bg-rose-600' :
          universe.id === 'madmax' ? 'bg-orange-600' :
          universe.id === 'wizardingworld' ? 'bg-amber-600' :
          'bg-purple-500'
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

        {/* Matched Movies Badge (when searching by movie title) */}
        {matchingEntries && matchingEntries.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-[#ffba20] font-semibold flex items-center gap-1 tracking-wider">
              <Film className="w-3 h-3 text-[#ffba20]" /> Matched {matchingEntries.length === 1 ? 'Movie' : 'Movies'}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {matchingEntries.slice(0, 2).map((entry) => (
                <button
                  key={entry.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectEntry) {
                      onSelectEntry(entry);
                    } else {
                      onClick();
                    }
                  }}
                  className="text-[10px] font-sans px-2 py-0.5 rounded bg-[#ffba20]/15 border border-[#ffba20]/30 text-amber-200 hover:bg-[#ffba20] hover:text-black transition-all cursor-pointer truncate max-w-full text-left font-medium"
                  title={`View ${entry.title}`}
                >
                  🎬 {entry.title} ({entry.releaseYear})
                </button>
              ))}
              {matchingEntries.length > 2 && (
                <span className="text-[10px] text-gray-400 font-mono py-0.5 self-center">
                  +{matchingEntries.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
