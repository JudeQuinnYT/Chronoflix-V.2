import { useEffect } from 'react';
import { ArrowLeft, Check, Bookmark, Calendar, Clock, Film, ListOrdered } from 'lucide-react';
import { TimelineEntry } from '../types';
import Footer from './Footer';

interface MovieDetailViewProps {
  entry: TimelineEntry;
  universeName: string;
  isWatched: boolean;
  isBookmarked: boolean;
  onToggleWatched: () => void;
  onToggleBookmark: () => void;
  onSelectNext: (nextId: string) => void;
  onBack: () => void;
  allEntries: TimelineEntry[]; // Needed to find "next" card details
}

export default function MovieDetailView({
  entry,
  universeName,
  isWatched,
  isBookmarked,
  onToggleWatched,
  onToggleBookmark,
  onSelectNext,
  onBack,
  allEntries
}: MovieDetailViewProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [entry.id]);
  const getUniverseGlow = () => {
    switch (entry.universeId) {
      case 'mcu':
        return 'from-[#00e0ff]/10';
      case 'starwars':
        return 'from-[#ffba20]/10';
      case 'middleearth':
        return 'from-[#ffb29b]/10';
      case 'conjuring':
        return 'from-[#ffb4ab]/10';
      default:
        return 'from-yellow-500/10';
    }
  };

  // Find the next entry to display at the bottom
  const nextEntry = entry.nextEntryId 
    ? allEntries.find(e => e.id === entry.nextEntryId)
    : null;

  return (
    <div className="flex-1 pb-24 text-white">
      {/* Background Banner - Atmospheric Gradient Style */}
      <div className="relative min-h-[220px] pt-14 flex flex-col justify-end border-b border-white/5 overflow-hidden">
        {/* Atmospheric Gradient Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#111318]">
          <div className={`absolute inset-0 bg-gradient-to-tr ${
            entry.universeId === 'mcu' ? 'from-cyan-950/80 via-purple-950/40 to-[#111318]' :
            entry.universeId === 'dccinematic' ? 'from-blue-950/80 via-indigo-950/40 to-[#111318]' :
            entry.universeId === 'xmen' ? 'from-cyan-950/80 via-blue-950/40 to-[#111318]' :
            entry.universeId === 'spiderman' ? 'from-rose-950/80 via-red-950/40 to-[#111318]' :
            entry.universeId === 'fastfurious' ? 'from-amber-950/80 via-orange-950/40 to-[#111318]' :
            entry.universeId === 'starwars' ? 'from-amber-950/60 via-blue-950/50 to-[#111318]' :
            entry.universeId === 'godzilla' ? 'from-red-950/80 via-emerald-950/40 to-[#111318]' :
            entry.universeId === 'alienpredator' ? 'from-emerald-950/80 via-teal-950/40 to-[#111318]' :
            'from-amber-950/60 via-purple-950/40 to-[#111318]'
          }`} />

          <div className={`absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-35 ${
            entry.universeId === 'mcu' ? 'bg-cyan-500' :
            entry.universeId === 'dccinematic' ? 'bg-blue-500' :
            entry.universeId === 'xmen' ? 'bg-cyan-400' :
            entry.universeId === 'spiderman' ? 'bg-rose-500' :
            entry.universeId === 'fastfurious' ? 'from-amber-500 to-orange-500 bg-gradient-to-r' :
            entry.universeId === 'starwars' ? 'bg-[#ffba20]' :
            entry.universeId === 'godzilla' ? 'bg-red-500' :
            entry.universeId === 'alienpredator' ? 'bg-emerald-500' :
            'bg-amber-500'
          }`} />

          <div className={`absolute -bottom-10 -left-10 w-96 h-96 rounded-full blur-3xl opacity-25 ${
            entry.universeId === 'mcu' ? 'bg-purple-600' :
            entry.universeId === 'dccinematic' ? 'bg-indigo-600' :
            entry.universeId === 'xmen' ? 'bg-blue-600' :
            entry.universeId === 'spiderman' ? 'bg-red-600' :
            entry.universeId === 'fastfurious' ? 'bg-yellow-500' :
            entry.universeId === 'starwars' ? 'bg-amber-600' :
            entry.universeId === 'godzilla' ? 'bg-emerald-600' :
            entry.universeId === 'alienpredator' ? 'bg-teal-600' :
            'bg-purple-600'
          }`} />

          <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(17,19,24,0.5)_100%)]" />
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-20">
          <button 
            onClick={onBack}
            className="p-2 rounded-full bg-black/40 border border-white/5 text-white/85 hover:text-white hover:bg-black/60 transition-all cursor-pointer flex items-center gap-1 text-xs font-mono tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK
          </button>
        </div>

        {/* Top-right floating indicator */}
        <div className="absolute top-4 right-4 z-20">
          <span className="text-[10px] font-mono tracking-widest text-[#d5c4ab] bg-white/5 px-2.5 py-1 rounded border border-white/10 uppercase">
            CHRONO-POINT {entry.chronologicalPosition}
          </span>
        </div>

        {/* Hero Details Text overlay */}
        <div className="relative z-10 px-6 pb-6 select-none max-w-4xl">
          {/* Breadcrumb / Universe Pill */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-semibold tracking-[0.15em] text-[#ffba20] bg-[#ffba20]/10 px-2.5 py-1 rounded border border-[#ffba20]/20 font-mono uppercase">
              {universeName}
            </span>
            <span className="text-gray-500 font-mono text-xs">•</span>
            <span className="text-xs text-gray-300 font-mono tracking-wider">{entry.parentSeries}</span>
          </div>

          {/* Film Title */}
          <h2 
            className="text-2xl md:text-5xl font-black tracking-tight mb-3"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {entry.title}
          </h2>

          {/* Synopsis */}
          <p className="text-[#e2e2e8] text-sm leading-relaxed max-w-2xl font-sans text-gray-200">
            {entry.synopsis}
          </p>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="px-6 py-4 flex flex-wrap gap-3 border-b border-white/5 bg-[#111318]">
        {/* Watched Button */}
        <button 
          onClick={onToggleWatched}
          className={`px-5 py-3 rounded text-sm font-bold tracking-wider transition-all flex items-center gap-2 border cursor-pointer uppercase ${
            isWatched 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
              : 'bg-white/5 text-white hover:bg-white/10 border-white/10'
          }`}
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          <Check className={`w-4 h-4 stroke-[2.5] ${isWatched ? 'text-emerald-400 animate-pulse' : 'text-white'}`} />
          {isWatched ? 'WATCHED' : 'MARK AS WATCHED'}
        </button>

        {/* Bookmark Button */}
        <button 
          onClick={onToggleBookmark}
          className={`p-3 rounded transition-all border cursor-pointer ${
            isBookmarked 
              ? 'bg-[#00e0ff]/10 text-[#00e0ff] border-[#00e0ff]/30 shadow-[0_0_10px_rgba(0,224,255,0.15)]'
              : 'bg-white/5 text-gray-300 hover:text-white border-white/10 hover:bg-white/10'
          }`}
          title={isBookmarked ? "Remove from Library" : "Bookmark / Add to Library"}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-[#00e0ff]' : ''}`} />
        </button>
      </div>

      {/* Info Metadata Block Grid */}
      <div className="px-6 py-8 flex flex-col gap-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Position Info */}
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5 flex gap-4 items-center backdrop-blur-sm select-none">
            <div className="p-3 rounded bg-white/5 border border-white/10 text-[#ffba20]">
              <ListOrdered className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-wider text-gray-500 block uppercase">
                Chronological Movie Number
              </span>
              <h4 className="text-sm font-bold mt-0.5">
                Movie {entry.chronologicalPosition}
              </h4>
              {entry.precededBy && (
                <span className="text-[10px] text-gray-400 block truncate max-w-[210px] mt-0.5 font-sans">
                  Preceded by: {entry.precededBy}
                </span>
              )}
            </div>
          </div>

          {/* In Story Timeline Date */}
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5 flex gap-4 items-center backdrop-blur-sm select-none">
            <div className="p-3 rounded bg-white/5 border border-white/10 text-[#00e0ff]">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-wider text-gray-500 block uppercase">
                In-Story Date
              </span>
              <h4 className="text-sm font-bold mt-0.5 truncate max-w-[210px]">
                {entry.inStoryDate.split('/')[0].trim()}
              </h4>
              <span className="text-[10px] text-gray-400 block mt-0.5 font-sans">
                Timeline Period: {entry.era}
              </span>
            </div>
          </div>

          {/* Release and Runtime Details */}
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5 flex gap-4 items-center backdrop-blur-sm select-none">
            <div className="p-3 rounded bg-white/5 border border-white/10 text-rose-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-wider text-gray-500 block uppercase">
                Theatrical Release
              </span>
              <h4 className="text-sm font-bold mt-0.5 truncate max-w-[210px]">
                {entry.releaseDate}
              </h4>
              <span className="text-[10px] text-gray-400 block mt-0.5 font-sans flex items-center gap-1">
                <Clock className="w-3 h-3" /> Runtime: {entry.runtime}
              </span>
            </div>
          </div>
        </div>



        {/* Next in Timeline Continuous Exploration section */}
        {nextEntry && (
          <div className="mt-8">
            <h3 
              className="text-xs tracking-[0.15em] text-[#ffba20] font-mono font-bold uppercase mb-4"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              ➔ NEXT IN TIMELINE
            </h3>

            <div 
              onClick={() => onSelectNext(nextEntry.id)}
              className="group p-5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-[#ffba20]/30 hover:bg-white/[0.05] transition-all cursor-pointer flex gap-5 items-center"
            >
              {/* Minimal Text Indicator */}
              <div className="w-12 h-12 rounded bg-white/5 border border-white/5 flex items-center justify-center text-xs font-mono font-bold text-[#ffba20] select-none flex-shrink-0">
                #{nextEntry.chronologicalPosition}
              </div>

              {/* Text briefs */}
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono tracking-widest text-[#ffba20] block uppercase mb-1">
                  Chronological Movie {nextEntry.chronologicalPosition}
                </span>
                <h4 
                  className="text-lg font-bold text-white group-hover:text-[#ffdca1] transition-colors leading-snug line-clamp-1"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {nextEntry.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                  {nextEntry.synopsis}
                </p>
                <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-gray-400 uppercase">
                  <span>{nextEntry.type}</span>
                  <span>•</span>
                  <span>{nextEntry.releaseYear}</span>
                </div>
              </div>
            </div>
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
          <span>BACK</span>
        </button>
      </div>

      <Footer />
    </div>
  );
}

