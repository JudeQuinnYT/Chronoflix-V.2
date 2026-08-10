import { useState } from 'react';
import { ArrowLeft, Check, Play, Clock, Calendar, Zap, RefreshCw, AlertTriangle } from 'lucide-react';
import { Universe, TimelineEntry } from '../types';
import Footer from './Footer';

interface TimelineViewProps {
  universe: Universe;
  entries: TimelineEntry[];
  watchedStates: Record<string, boolean>;
  onToggleWatched: (id: string) => void;
  onEntrySelect: (entry: TimelineEntry) => void;
  onBack: () => void;
}

export default function TimelineView({
  universe,
  entries,
  watchedStates,
  onToggleWatched,
  onEntrySelect,
  onBack,
}: TimelineViewProps) {
  const [selectedEra, setSelectedEra] = useState<string>('ALL');

  // Filter entries based on selected Era
  const filteredEntries = entries.filter((entry) => {
    if (selectedEra === 'ALL') return true;
    const cleanEra = selectedEra.toUpperCase().replace('ALL ', '').trim();
    const cleanEntryEra = entry.era.toUpperCase().trim();
    return cleanEntryEra.includes(cleanEra) || cleanEra.includes(cleanEntryEra);
  });

  // Theme styles based on active universe color theme
  const getThemeStyles = () => {
    switch (universe.colorTheme) {
      case 'primary': // gold
        return {
          accentText: 'text-[#ffba20]',
          accentBg: 'bg-[#ffba20]',
          accentBorder: 'border-[#ffba20]',
          accentGlow: 'shadow-[0_0_12px_rgba(255,186,32,0.5)]',
          lineColor: 'border-[#ffba20]/60',
          radialGlow: 'from-[#ffba20]/15',
        };
      case 'secondary': // neon blue
        return {
          accentText: 'text-[#00e0ff]',
          accentBg: 'bg-[#00e0ff]',
          accentBorder: 'border-[#00e0ff]',
          accentGlow: 'shadow-[0_0_12px_rgba(0,224,255,0.5)]',
          lineColor: 'border-[#00e0ff]/60',
          radialGlow: 'from-[#00e0ff]/15',
        };
      case 'tertiary': // warm sunset
        return {
          accentText: 'text-[#ffb29b]',
          accentBg: 'bg-[#ffb29b]',
          accentBorder: 'border-[#ffb29b]',
          accentGlow: 'shadow-[0_0_12px_rgba(255,178,155,0.5)]',
          lineColor: 'border-[#ffb29b]/60',
          radialGlow: 'from-[#ffb29b]/15',
        };
      case 'error': // crimson horror
        return {
          accentText: 'text-[#ffb4ab]',
          accentBg: 'bg-[#ffb4ab]',
          accentBorder: 'border-[#ffb4ab]',
          accentGlow: 'shadow-[0_0_12px_rgba(255,180,171,0.5)]',
          lineColor: 'border-[#ffb4ab]/60',
          radialGlow: 'from-[#ffb4ab]/15',
        };
      case 'info': // electric royal blue
      default:
        return {
          accentText: 'text-[#3b82f6]',
          accentBg: 'bg-[#3b82f6]',
          accentBorder: 'border-[#3b82f6]',
          accentGlow: 'shadow-[0_0_12px_rgba(59,130,246,0.5)]',
          lineColor: 'border-[#3b82f6]/60',
          radialGlow: 'from-[#3b82f6]/15',
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <div className="flex-1 pb-16">
      {/* Immersive Header with Atmospheric Gradient Backdrop */}
      <div className="relative min-h-[220px] pt-12 flex flex-col justify-end border-b border-white/5 overflow-hidden">
        {/* Atmospheric Gradient Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#111318]">
          <div className={`absolute inset-0 bg-gradient-to-tr ${
            universe.id === 'mcu' ? 'from-cyan-950/80 via-purple-950/40 to-[#111318]' :
            universe.id === 'dccinematic' ? 'from-blue-950/80 via-indigo-950/40 to-[#111318]' :
            universe.id === 'fastfurious' ? 'from-amber-950/80 via-orange-950/40 to-[#111318]' :
            universe.id === 'starwars' ? 'from-amber-950/60 via-blue-950/50 to-[#111318]' :
            universe.id === 'godzilla' ? 'from-red-950/80 via-emerald-950/40 to-[#111318]' :
            universe.id === 'spiderman' ? 'from-rose-950/80 via-red-950/40 to-[#111318]' :
            universe.id === 'alienpredator' ? 'from-emerald-950/80 via-teal-950/40 to-[#111318]' :
            'from-amber-950/60 via-purple-950/40 to-[#111318]'
          }`} />

          <div className={`absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-35 ${
            universe.id === 'mcu' ? 'bg-cyan-500' :
            universe.id === 'dccinematic' ? 'bg-blue-500' :
            universe.id === 'fastfurious' ? 'from-amber-500 to-orange-500 bg-gradient-to-r' :
            universe.id === 'starwars' ? 'bg-[#ffba20]' :
            universe.id === 'godzilla' ? 'bg-red-500' :
            universe.id === 'spiderman' ? 'bg-rose-500' :
            universe.id === 'alienpredator' ? 'bg-emerald-500' :
            'bg-amber-500'
          }`} />

          <div className={`absolute -bottom-10 -left-10 w-96 h-96 rounded-full blur-3xl opacity-25 ${
            universe.id === 'mcu' ? 'bg-purple-600' :
            universe.id === 'dccinematic' ? 'bg-indigo-600' :
            universe.id === 'fastfurious' ? 'bg-yellow-500' :
            universe.id === 'starwars' ? 'bg-amber-600' :
            universe.id === 'godzilla' ? 'bg-emerald-600' :
            universe.id === 'spiderman' ? 'bg-red-600' :
            universe.id === 'alienpredator' ? 'bg-teal-600' :
            'bg-purple-600'
          }`} />

          <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(17,19,24,0.5)_100%)]" />
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-20">
          <button 
            onClick={onBack}
            className="p-2 rounded-full bg-black/40 border border-white/5 text-white/80 hover:text-white hover:bg-black/60 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK
          </button>
        </div>

        {/* Header Content text */}
        <div className="relative z-10 px-6 pb-6 select-none max-w-3xl">
          {/* Badge */}
          <span 
            className={`inline-block text-[10px] font-semibold tracking-[0.2em] px-2.5 py-1 rounded bg-black/40 border ${theme.accentBorder} ${theme.accentText} font-mono mb-3 uppercase`}
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            ✦ {universe.badge}
          </span>

          {/* Title */}
          <h2 
            className="text-2xl md:text-4xl font-black text-white tracking-tight mb-2 uppercase"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {universe.name} Universe
          </h2>

          {/* Description */}
          <p className="text-sm text-[#d5c4ab] leading-relaxed font-sans">
            {universe.description}
          </p>

          {universe.id === 'godzilla' && (
            <div className="mt-4 p-4 bg-red-950/20 border border-red-500/20 rounded-lg text-xs text-red-300 leading-relaxed font-mono">
              ⚠️ <span className="font-bold uppercase tracking-wider text-red-200">Multiverse & Continuity Distinction:</span> Unlike franchises with a single unbroken timeline, the Godzilla film franchise spans multiple distinct, independent continuities. Each era or continuity has its own internal timeline. Use the era filters below to navigate between them!
            </div>
          )}

          {universe.id === 'dccinematic' && (
            <div className="mt-4 p-4 bg-blue-950/30 border border-blue-500/30 rounded-lg text-xs text-blue-200 leading-relaxed font-mono shadow-lg">
              ⚡ <span className="font-bold uppercase tracking-wider text-blue-100">Timeline & Multiverse Distinction:</span> The DC Cinematic Universe is divided into two major continuity eras: the original <span className="text-blue-300 font-semibold">DC Extended Universe (DCEU, 2013–2023)</span> and James Gunn's rebooted <span className="text-blue-300 font-semibold">New DC Universe (DCU Chapter 1: Gods and Monsters, 2025+)</span>, with <span className="italic text-blue-100">The Flash (2023)</span> serving as the multiverse reset bridge. Standalone Elseworlds films (such as <em>The Batman</em> and <em>Joker</em>) exist in isolated parallel realities outside both main timelines. Use the era filters below to navigate!
            </div>
          )}

          {universe.id === 'xmen' && (
            <div className="mt-4 p-4 bg-cyan-950/30 border border-cyan-500/30 rounded-lg text-xs text-cyan-200 leading-relaxed font-mono shadow-lg">
              🧬 <span className="font-bold uppercase tracking-wider text-cyan-100">X-Men Timeline & Multiverse Key:</span> The 20th Century Fox X-Men saga features two distinct timelines due to time travel in <em>X-Men: Days of Future Past (1973)</em> erasing Timeline 1 and forging Timeline 2. <em>Deadpool & Wolverine (2024)</em> bridges Earth-10005 with the MCU via the TVA. Use the era filters below to toggle timelines!
            </div>
          )}

          {universe.id === 'spiderman' && (
            <div className="mt-4 p-4 bg-rose-950/30 border border-rose-500/30 rounded-lg text-xs text-rose-200 leading-relaxed font-mono shadow-lg">
              🕷️ <span className="font-bold uppercase tracking-wider text-rose-100">Multiverse & Crossover Key:</span> Sony's Spider-Man Universe (SSU, Earth-688) follows anti-heroes like Venom, Morbius, and Kraven, with post-credit events linking to MCU Earth-616 in <em>Spider-Man: No Way Home</em>. The animated <em>Spider-Verse</em> trilogy explores Miles Morales (Earth-1610) traversing dimensions and connecting both live-action and animated realities. Use the era filters below to toggle!
            </div>
          )}

          {universe.id === 'alienpredator' && (
            <div className="mt-4 p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-xs text-emerald-200 leading-relaxed font-mono shadow-lg">
              ☣️ <span className="font-bold uppercase tracking-wider text-emerald-100">Timeline & Continuity Key:</span> Spanning 1719 to 2381, this mega-timeline unites the <em>Predator</em> series, the <em>Alien vs. Predator (AVP)</em> crossovers, Ridley Scott's <em>Prometheus</em> prequels, and the classic <em>Alien</em> saga. Note: <em>Prey (1719)</em> links to <em>Predator 2 (1997)</em> via the 1719 flintlock pistol, while the AVP films form a standalone crossover branch from Ridley Scott's Weyland Corp prequel timeline. Use the era filters below to navigate!
            </div>
          )}
        </div>
      </div>

      {/* Eras Filter Pills */}
      <div className="px-6 py-4 bg-[#111318] sticky top-[72px] z-30 border-b border-white/5 flex gap-2 overflow-x-auto scrollbar-none no-scrollbar">
        {universe.eras.map((era) => {
          const isSelected = 
            (era === 'ALL' || era.startsWith('ALL ')) 
              ? selectedEra === 'ALL' 
              : selectedEra === era;

          return (
            <button
              key={era}
              onClick={() => setSelectedEra(era === 'ALL' || era.startsWith('ALL ') ? 'ALL' : era)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider font-semibold uppercase select-none cursor-pointer transition-all ${
                isSelected 
                  ? `${theme.accentBg} text-[#111318] ${theme.accentGlow}`
                  : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {era}
            </button>
          );
        })}
      </div>

      {/* Vertical Timeline container */}
      <div className="px-6 py-8 relative max-w-4xl mx-auto">
        {/* The Timeline Line */}
        <div className={`absolute left-9 top-10 bottom-10 w-[2px] border-l-2 ${theme.lineColor} z-0`} />

        {/* Timeline Event list */}
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 text-gray-500 font-mono text-sm">
            No entries found in this era.
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {filteredEntries.map((entry, index) => {
              const isWatched = !!watchedStates[entry.id];
              const prevEntry = index > 0 ? filteredEntries[index - 1] : null;
              const isEraTransition = prevEntry && prevEntry.era !== entry.era;

              const isDCReset = universe.id === 'dccinematic' && entry.era === 'NEW DCU (CHAPTER 1)';
              const isXMenPivot = universe.id === 'xmen' && entry.era === 'REVISED TIMELINE (NEW)';
              const isXMenCrossover = universe.id === 'xmen' && entry.era === 'MULTIVERSE CROSSOVER';
              const isSpiderVerse = universe.id === 'spiderman' && entry.era === 'ANIMATED SPIDER-VERSE TRILOGY';
              const isAvpShift = universe.id === 'alienpredator' && entry.era === 'AVP CROSSOVER ERA';
              const isAlienPrequel = universe.id === 'alienpredator' && entry.era === 'PREQUEL ERA (PROMETHEUS)';
              const isClassicAlien = universe.id === 'alienpredator' && entry.era === 'CLASSIC SCI-FI SAGA';

              return (
                <div key={entry.id} className="flex flex-col gap-10">
                  {/* Continuity / Universe Reset Divider Line */}
                  {isEraTransition && (
                    <div className="my-2 relative flex items-center gap-4 z-20">
                      {/* Node marker on vertical line */}
                      <div className="w-6 flex justify-center items-center">
                        <div className={`w-3.5 h-3.5 rounded-full ${
                          isDCReset ? 'bg-blue-400 ring-4 ring-blue-500/30 animate-pulse' :
                          isXMenPivot ? 'bg-cyan-400 ring-4 ring-cyan-500/30 animate-pulse' :
                          isXMenCrossover ? 'bg-purple-400 ring-4 ring-purple-500/30 animate-pulse' :
                          isSpiderVerse ? 'bg-rose-400 ring-4 ring-rose-500/30 animate-pulse' :
                          isAvpShift || isAlienPrequel || isClassicAlien ? 'bg-emerald-400 ring-4 ring-emerald-500/30 animate-pulse' :
                          'bg-amber-400 ring-2 ring-amber-400/30'
                        } shadow-lg`} />
                      </div>

                      {/* Glowing Divider Banner */}
                      <div className={`flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border backdrop-blur-md transition-all ${
                        isDCReset
                          ? 'bg-gradient-to-r from-blue-950/90 via-indigo-950/90 to-blue-950/90 border-blue-400/60 shadow-[0_0_25px_rgba(59,130,246,0.35)]'
                          : isXMenPivot
                          ? 'bg-gradient-to-r from-cyan-950/90 via-blue-950/90 to-cyan-950/90 border-cyan-400/60 shadow-[0_0_25px_rgba(6,182,212,0.35)]'
                          : isXMenCrossover
                          ? 'bg-gradient-to-r from-purple-950/90 via-fuchsia-950/90 to-purple-950/90 border-purple-400/60 shadow-[0_0_25px_rgba(168,85,247,0.35)]'
                          : isSpiderVerse
                          ? 'bg-gradient-to-r from-rose-950/90 via-red-950/90 to-rose-950/90 border-rose-400/60 shadow-[0_0_25px_rgba(244,63,94,0.35)]'
                          : isAvpShift || isAlienPrequel || isClassicAlien
                          ? 'bg-gradient-to-r from-emerald-950/90 via-teal-950/90 to-emerald-950/90 border-emerald-400/60 shadow-[0_0_25px_rgba(16,185,129,0.35)]'
                          : 'bg-[#181c26] border-amber-500/30 shadow-md'
                      }`}>
                        <div className="flex items-center gap-3">
                          {isDCReset ? (
                            <span className="p-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/40">
                              <Zap className="w-4 h-4 text-blue-300 animate-bounce" />
                            </span>
                          ) : isXMenPivot ? (
                            <span className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                              <RefreshCw className="w-4 h-4 text-cyan-300 animate-spin" />
                            </span>
                          ) : isXMenCrossover ? (
                            <span className="p-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-400/40">
                              <Zap className="w-4 h-4 text-purple-300 animate-pulse" />
                            </span>
                          ) : isSpiderVerse ? (
                            <span className="p-2 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-400/40">
                              <Zap className="w-4 h-4 text-rose-300 animate-pulse" />
                            </span>
                          ) : isAvpShift || isAlienPrequel || isClassicAlien ? (
                            <span className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                              <Zap className="w-4 h-4 text-emerald-300 animate-pulse" />
                            </span>
                          ) : (
                            <span className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              <RefreshCw className="w-4 h-4 text-amber-300" />
                            </span>
                          )}

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-xs font-mono font-extrabold tracking-widest uppercase ${
                                isDCReset ? 'text-blue-300' :
                                isXMenPivot ? 'text-cyan-300' :
                                isXMenCrossover ? 'text-purple-300' :
                                isSpiderVerse ? 'text-rose-300' :
                                isAvpShift || isAlienPrequel || isClassicAlien ? 'text-emerald-300' :
                                'text-amber-200'
                              }`}>
                                {isDCReset
                                  ? '⚡ UNIVERSE RESET — START OF NEW DC UNIVERSE (DCU)'
                                  : isXMenPivot
                                  ? '⏳ TIMELINE REWRITE — REVISED TIMELINE (POST-1973)'
                                  : isXMenCrossover
                                  ? '🌌 MULTIVERSE BRIDGE — FOX X-MEN TO MCU'
                                  : isSpiderVerse
                                  ? '🕷️ MULTIVERSE SHIFT — ANIMATED SPIDER-VERSE TRILOGY'
                                  : isAvpShift
                                  ? '⚔️ CROSSOVER ERA — ALIEN VS. PREDATOR'
                                  : isAlienPrequel
                                  ? '🔬 PREQUEL ERA — RIDLEY SCOTT PROMETHEUS SAGA'
                                  : isClassicAlien
                                  ? '🚀 SCI-FI HORROR SAGA — CLASSIC ALIEN CONTINUITY'
                                  : `CONTINUITY & ERA SHIFT`
                                }
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-gray-200 uppercase tracking-wider font-semibold border border-white/10">
                                {entry.era}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-300 font-sans mt-0.5 leading-snug">
                              {isDCReset
                                ? 'James Gunn\'s rebooted DC Universe starts here with Superman (2025), resetting from the original DCEU continuity.'
                                : isXMenPivot
                                ? 'Wolverine\'s time-travel intervention in 1973 altered history, creating a new timeline and erasing previous events.'
                                : isXMenCrossover
                                ? 'The TVA pulls Wade Wilson into the wider Marvel Cinematic Multiverse, connecting Earth-10005 to Earth-616.'
                                : isSpiderVerse
                                ? 'Transitioning from live-action Sony Spider-Man Universe (Earth-688) to Miles Morales\' animated Spider-Verse (Earth-1610).'
                                : isAvpShift
                                ? 'Earth-bound 2004 crossover where Predators ritualistically hunt Xenomorphs beneath Antarctic ice.'
                                : isAlienPrequel
                                ? 'Peter Weyland\'s expedition on Prometheus (2093) seeks the Engineers, leading to the creation of biological horrors.'
                                : isClassicAlien
                                ? 'From the Nostromo on LV-426 in 2122 to the USM Auriga in 2381, Ellen Ripley\'s battle against the Xenomorph species.'
                                : `Timeline shift from "${prevEntry?.era}" to "${entry.era}"`
                              }
                            </p>
                          </div>
                        </div>

                        <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1 self-end sm:self-center bg-black/40 px-2.5 py-1 rounded border border-white/5 whitespace-nowrap">
                          <span>Timeline Shift</span>
                          <span className={isDCReset ? 'text-blue-400' : isXMenPivot ? 'text-cyan-400' : isXMenCrossover ? 'text-purple-400' : isSpiderVerse ? 'text-rose-400' : isAvpShift || isAlienPrequel || isClassicAlien ? 'text-emerald-400' : 'text-amber-400'}>↓</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="relative flex gap-6 z-10">
                  {/* Timeline circular node marker */}
                  <div className="flex justify-center items-start mt-2">
                    <button
                      onClick={() => onToggleWatched(entry.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer z-15 ${
                        isWatched 
                          ? `${theme.accentBorder} ${theme.accentBg} ${theme.accentGlow} text-[#111318]`
                          : 'bg-[#111318] border-gray-600 text-transparent hover:border-white'
                      }`}
                      title={isWatched ? "Mark Unwatched" : "Mark Watched"}
                    >
                      <Check className={`w-3.5 h-3.5 stroke-[3] ${isWatched ? 'text-[#111318] block' : 'opacity-0 hover:opacity-10'}`} />
                    </button>
                  </div>

                  {/* Main card */}
                  <div className="flex-1 flex flex-col">
                    {/* Event Dates & Subtitle info */}
                    <div className="mb-2 pl-1 select-none">
                      <span 
                        className={`text-xs font-bold tracking-widest font-mono uppercase ${theme.accentText}`}
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {entry.inStoryDate}
                      </span>
                      <h4 
                        className="text-[10px] text-gray-500 tracking-[0.1em] font-mono mt-0.5 uppercase"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {entry.parentSeries} • {entry.era} • Movie {entry.chronologicalPosition}
                      </h4>
                    </div>

                    {/* Glassmorphic Event Card */}
                    <div 
                      onClick={() => onEntrySelect(entry)}
                      className="group flex gap-4 p-4 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-md cursor-pointer hover:bg-white/[0.05]"
                    >
                      {/* Info on Right */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <span className="text-[9px] font-mono tracking-widest text-gray-400 block uppercase mb-1">
                            {entry.type} • {entry.releaseYear}
                          </span>
                          <h3 
                            className="text-base font-bold text-white leading-snug group-hover:text-[#ffdca1] transition-colors line-clamp-2"
                            style={{ fontFamily: 'Montserrat, sans-serif' }}
                          >
                            {entry.title}
                          </h3>
                        </div>

                        {/* Watch checkbox status pill */}
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
                          <span className="text-[11px] text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            {entry.runtime}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleWatched(entry.id);
                            }}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                              isWatched 
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                : 'bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <Check className={`w-3.5 h-3.5 stroke-[3] ${isWatched ? 'text-emerald-400' : 'text-gray-400'}`} />
                            {isWatched ? 'WATCHED' : 'MARK WATCHED'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        )}
      </div>

      {/* Floating Quick Back Button when scrolling */}
      <div className="fixed bottom-20 left-4 md:left-6 z-40">
        <button 
          onClick={onBack}
          className="px-3.5 py-2 rounded-full bg-[#181d2a]/90 hover:bg-[#ffba20] hover:text-black border border-[#ffba20]/40 text-white shadow-2xl backdrop-blur-md transition-all cursor-pointer flex items-center gap-2 text-xs font-mono font-bold tracking-wider active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 text-[#ffba20] group-hover:text-black transition-colors" />
          <span>BACK TO UNIVERSES</span>
        </button>
      </div>

      <Footer />
    </div>
  );
}

