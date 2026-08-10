import { Bookmark, Check, ArrowRight, Library, ArrowLeft } from 'lucide-react';
import { TimelineEntry } from '../types';
import Footer from './Footer';

interface LibraryViewProps {
  allEntries: TimelineEntry[];
  watchedStates: Record<string, boolean>;
  bookmarkedStates: Record<string, boolean>;
  getUniverseName: (id: string) => string;
  onEntrySelect: (entry: TimelineEntry) => void;
  onClearHistory: () => void;
  onBack?: () => void;
}

export default function LibraryView({
  allEntries,
  watchedStates,
  bookmarkedStates,
  getUniverseName,
  onEntrySelect,
  onClearHistory,
  onBack,
}: LibraryViewProps) {
  // CRITICAL REQUIREMENT:
  // Movies tagged as "Watched" MUST be shown in the library page.
  const watchedEntries = allEntries.filter(entry => !!watchedStates[entry.id]);

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6 bg-[#111318] relative overflow-hidden">
      {/* Atmospheric Gradient Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-950/30 via-emerald-950/20 to-[#111318]" />
        <div className="absolute -top-1/3 -right-1/3 w-[500px] h-[500px] rounded-full blur-2xl opacity-20 bg-[#ffba20]" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full blur-2xl opacity-15 bg-emerald-600" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(17,19,24,0.8)_100%)]" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 space-y-6 pb-20">
        {/* Header Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Library className="w-5 h-5 text-[#ffba20]" />
              <h2 
                className="text-lg font-bold tracking-wider text-white uppercase font-display"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Watched Library
              </h2>
            </div>
            <p className="text-xs text-gray-400 mt-1 font-mono">
              Catalog of your completed movie views across all timelines ({watchedEntries.length} watched)
            </p>
          </div>

          {/* Reset Action Button */}
          {watchedEntries.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-[10px] font-mono tracking-widest text-[#ffb4ab] bg-red-500/10 hover:bg-red-500/25 px-3 py-1.5 rounded transition-all cursor-pointer uppercase font-bold border border-red-500/20 self-start md:self-auto"
            >
              RESET WATCH HISTORY
            </button>
          )}
        </div>

        {/* Watched Movies List */}
        <div className="space-y-4">
          {watchedEntries.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-white/10 rounded-lg select-none bg-white/[0.01]">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-3">
                <Check className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">NO WATCHED MOVIES YET</h4>
              <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1.5 leading-relaxed font-sans">
                Mark movies as <span className="text-emerald-400 font-semibold">"Watched"</span> inside any universe timeline or detail view to add them to your completed library collection.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {watchedEntries.map(entry => (
                <div
                  key={entry.id}
                  onClick={() => onEntrySelect(entry)}
                  className="p-4 rounded-lg bg-[#181c26] border border-white/10 hover:border-emerald-500/40 transition-all flex items-center justify-between gap-4 cursor-pointer group hover:bg-[#1f2432] shadow-sm"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#ffba20] transition-colors truncate">
                        {entry.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-[10px] font-mono tracking-wider text-[#ffba20] bg-[#ffba20]/10 px-1.5 py-0.5 rounded border border-[#ffba20]/20 uppercase">
                          {getUniverseName(entry.universeId)}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          In-Story: {entry.inStoryDate.split('/')[0].trim()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {bookmarkedStates[entry.id] && (
                      <Bookmark className="w-4 h-4 text-[#ffba20] fill-[#ffba20]" />
                    )}
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {onBack && (
        <div className="fixed bottom-20 left-4 md:left-6 z-40">
          <button 
            onClick={onBack}
            className="px-3.5 py-2 rounded-full bg-[#181d2a]/90 hover:bg-[#ffba20] hover:text-black border border-[#ffba20]/40 text-white shadow-2xl backdrop-blur-md transition-all cursor-pointer flex items-center gap-2 text-xs font-mono font-bold tracking-wider active:scale-95 group"
          >
            <ArrowLeft className="w-4 h-4 text-[#ffba20] group-hover:text-black transition-colors" />
            <span>BACK TO HOME</span>
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

