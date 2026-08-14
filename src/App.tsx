import { useState, useEffect } from 'react';
import { LayoutGrid, Waypoints, BookOpen, Bookmark, ChevronLeft, ChevronRight, Play, Info } from 'lucide-react';
import Header from './components/Header';
import UniverseCard from './components/UniverseCard';
import TimelineView from './components/TimelineView';
import MovieDetailView from './components/MovieDetailView';
import BlogView from './components/BlogView';
import LibraryView from './components/LibraryView';
import UniverseGridAdUnit from './components/UniverseGridAdUnit';
import Footer from './components/Footer';
import { UNIVERSES, TIMELINE_ENTRIES } from './data';
import { UniverseId, TimelineEntry } from './types';

// Default initial checked watch list representing states in screenshots
const DEFAULT_WATCHED: Record<string, boolean> = {
  // MCU (80% / 4 of 5 entries watched as initial default)
  'mcu_1': true,
  'mcu_2': true,
  'mcu_3': true,
  'mcu_23': true,
  'mcu_32': false,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'universes' | 'timeline' | 'blog' | 'library'>('universes');
  const [selectedUniverseId, setSelectedUniverseId] = useState<UniverseId | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null);
  
  // Storage states with synchronous local caching initialization
  const [watchedStates, setWatchedStates] = useState<Record<string, boolean>>(() => {
    try {
      const savedWatched = localStorage.getItem('chronos_watched');
      if (savedWatched) {
        return JSON.parse(savedWatched);
      } else {
        localStorage.setItem('chronos_watched', JSON.stringify(DEFAULT_WATCHED));
        return DEFAULT_WATCHED;
      }
    } catch (e) {
      return DEFAULT_WATCHED;
    }
  });

  const [bookmarkedStates, setBookmarkedStates] = useState<Record<string, boolean>>(() => {
    try {
      const savedBookmarked = localStorage.getItem('chronos_bookmarked');
      if (savedBookmarked) {
        return JSON.parse(savedBookmarked);
      } else {
        const sampleBookmarks = { 'mcu_3': true };
        localStorage.setItem('chronos_bookmarked', JSON.stringify(sampleBookmarks));
        return sampleBookmarks;
      }
    } catch (e) {
      return { 'mcu_3': true };
    }
  });

  // Helpers to update state and persistence
  const toggleWatched = (id: string) => {
    setWatchedStates((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem('chronos_watched', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedStates((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem('chronos_bookmarked', JSON.stringify(updated));
      return updated;
    });
  };

  const clearBookmarks = () => {
    if (window.confirm("Are you sure you want to clear your bookmarked library?")) {
      setBookmarkedStates({});
      localStorage.setItem('chronos_bookmarked', JSON.stringify({}));
    }
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to reset your watch history to defaults?")) {
      setWatchedStates(DEFAULT_WATCHED);
      localStorage.setItem('chronos_watched', JSON.stringify(DEFAULT_WATCHED));
    }
  };

  // Dynamically calculate actual watched percent per universe
  const getWatchedPercent = (univId: UniverseId): number => {
    const univEntries = TIMELINE_ENTRIES.filter(e => e.universeId === univId);
    if (univEntries.length === 0) return 0;
    const watchedCount = univEntries.filter(e => !!watchedStates[e.id]).length;
    return Math.round((watchedCount / univEntries.length) * 100);
  };

  const getEntryCount = (univId: UniverseId): number => {
    return TIMELINE_ENTRIES.filter(e => e.universeId === univId).length;
  };

  const getUniverseName = (univId: string): string => {
    return UNIVERSES.find(u => u.id === univId)?.name || 'Unknown';
  };

  // Reset window scroll position when switching views or selecting items
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedUniverseId, selectedEntry, activeTab]);

  // Carousel states for the Universe timelines
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  useEffect(() => {
    if (activeTab !== 'universes' || selectedEntry || selectedUniverseId || isCarouselHovered) return;

    const timer = setTimeout(() => {
      setCarouselIndex((prev) => (prev + 1) % UNIVERSES.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [carouselIndex, activeTab, selectedEntry, selectedUniverseId, isCarouselHovered]);

  // Find MCU Guardians 3 for reference if needed
  const mcuHeroEntry = TIMELINE_ENTRIES.find(e => e.id === 'mcu_guardians_3') || TIMELINE_ENTRIES[0];

  return (
    <div className="min-h-screen bg-[#111318] text-[#e2e2e8] flex flex-col font-sans select-none overflow-x-hidden">
      {/* Header element */}
      {selectedEntry ? (
        <Header 
          onBack={() => setSelectedEntry(null)}
          backLabel="BACK"
          subtitle={`DETAILS • ${getUniverseName(selectedEntry.universeId)}`}
        />
      ) : activeTab === 'timeline' && selectedUniverseId ? (
        <Header 
          onBack={() => setSelectedUniverseId(null)}
          backLabel="UNIVERSES"
          subtitle={`${UNIVERSES.find(u => u.id === selectedUniverseId)?.name || 'TIMELINE'} UNIVERSE`}
        />
      ) : activeTab === 'blog' ? (
        <Header 
          onBack={() => setActiveTab('universes')}
          backLabel="HOME"
          subtitle="BLOG & LORE TRIVIA HUB"
        />
      ) : activeTab === 'library' ? (
        <Header 
          onBack={() => setActiveTab('universes')}
          backLabel="HOME"
          subtitle="WATCHLIST & LIBRARY"
        />
      ) : (
        <Header />
      )}

      {/* Main viewport with dynamic switching content */}
      <main className="flex-1 flex flex-col">
          {selectedEntry ? (
          /* Movie Detail View overlay screen */
          <MovieDetailView 
            entry={selectedEntry}
            universeName={getUniverseName(selectedEntry.universeId)}
            isWatched={!!watchedStates[selectedEntry.id]}
            isBookmarked={!!bookmarkedStates[selectedEntry.id]}
            onToggleWatched={() => toggleWatched(selectedEntry.id)}
            onToggleBookmark={() => toggleBookmark(selectedEntry.id)}
            onSelectNext={(nextId) => {
              const next = TIMELINE_ENTRIES.find(e => e.id === nextId);
              if (next) setSelectedEntry(next);
            }}
            onBack={() => setSelectedEntry(null)}
            allEntries={TIMELINE_ENTRIES}
          />
        ) : activeTab === 'timeline' && selectedUniverseId ? (
          /* Full Timeline View Screen */
          <TimelineView 
            universe={UNIVERSES.find(u => u.id === selectedUniverseId) || UNIVERSES[0]}
            entries={TIMELINE_ENTRIES.filter(e => e.universeId === selectedUniverseId)}
            watchedStates={watchedStates}
            onToggleWatched={toggleWatched}
            onEntrySelect={(entry) => setSelectedEntry(entry)}
            onBack={() => setSelectedUniverseId(null)}
          />
        ) : activeTab === 'blog' ? (
          /* Blog & Lore Hub View */
          <BlogView 
            universes={UNIVERSES}
            onSelectUniverse={(univId) => {
              setSelectedUniverseId(univId);
              setActiveTab('timeline');
              setSelectedEntry(null);
            }}
            onBack={() => setActiveTab('universes')}
          />
        ) : activeTab === 'library' ? (
          /* Library bookmarks & watch logs screen */
          <LibraryView 
            allEntries={TIMELINE_ENTRIES}
            watchedStates={watchedStates}
            bookmarkedStates={bookmarkedStates}
            getUniverseName={getUniverseName}
            onEntrySelect={(entry) => setSelectedEntry(entry)}
            onClearHistory={clearHistory}
            onBack={() => setActiveTab('timeline')}
          />
        ) : (
          /* --- Home / Universes Tab --- */
          <div className="flex-1 flex flex-col pb-16 md:pb-20">
            
            {/* Universe timelines auto-rotating Carousel */}
            <div 
              onMouseEnter={() => setIsCarouselHovered(true)}
              onMouseLeave={() => setIsCarouselHovered(false)}
              className="relative min-h-[330px] sm:min-h-[340px] md:min-h-[360px] flex flex-col justify-end p-4 md:p-6 select-none overflow-hidden group bg-[#0a0c10]"
            >
              {UNIVERSES.map((universe, idx) => {
                const isActive = idx === carouselIndex;
                const watchedPercent = getWatchedPercent(universe.id);
                const entryCount = getEntryCount(universe.id);

                return (
                  <div
                    key={universe.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex flex-col justify-end p-4 pb-14 sm:p-6 sm:pb-12 md:p-8 ${
                      isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    {/* Atmospheric Gradient Backdrop */}
                    <div className="absolute inset-0 z-0 overflow-hidden bg-[#111318]">
                      {/* Base theme gradient glow */}
                      <div className={`absolute inset-0 bg-gradient-to-tr ${
                        universe.id === 'mcu' ? 'from-cyan-950/80 via-purple-950/40 to-[#111318]' :
                        universe.id === 'fastfurious' ? 'from-amber-950/80 via-orange-950/40 to-[#111318]' :
                        universe.id === 'starwars' ? 'from-yellow-950/70 via-blue-950/50 to-[#111318]' :
                        universe.id === 'godzilla' ? 'from-red-950/80 via-emerald-950/40 to-[#111318]' :
                        universe.id === 'middleearth' ? 'from-emerald-950/80 via-amber-950/40 to-[#111318]' :
                        universe.id === 'conjuring' ? 'from-stone-900 via-rose-950/70 to-[#111318]' :
                        universe.id === 'dccinematic' ? 'from-blue-950/80 via-indigo-950/40 to-[#111318]' :
                        universe.id === 'xmen' ? 'from-sky-950/80 via-yellow-950/40 to-[#111318]' :
                        universe.id === 'spiderman' ? 'from-rose-950/80 via-red-950/50 to-[#111318]' :
                        universe.id === 'alienpredator' ? 'from-emerald-950/90 via-teal-950/50 to-[#111318]' :
                        universe.id === 'planetoftheapes' ? 'from-emerald-950/80 via-amber-950/60 to-[#111318]' :
                        universe.id === 'jurassic' ? 'from-amber-950/90 via-emerald-950/50 to-[#111318]' :
                        universe.id === 'transformers' ? 'from-blue-950/90 via-red-950/60 to-[#111318]' :
                        universe.id === 'johnwick' ? 'from-rose-950/90 via-slate-950/70 to-[#111318]' :
                        universe.id === 'madmax' ? 'from-orange-950/90 via-amber-950/70 to-[#111318]' :
                        universe.id === 'wizardingworld' ? 'from-amber-950/90 via-amber-900/60 to-[#111318]' :
                        'from-indigo-950/70 via-purple-950/30 to-[#111318]'
                      }`} />

                      {/* Accent radial light source */}
                      <div className={`absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-30 ${
                        universe.id === 'mcu' ? 'bg-cyan-500' :
                        universe.id === 'fastfurious' ? 'from-amber-500 to-orange-500 bg-gradient-to-r' :
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

                      <div className={`absolute -bottom-10 -left-10 w-96 h-96 rounded-full blur-3xl opacity-25 ${
                        universe.id === 'mcu' ? 'bg-purple-600' :
                        universe.id === 'fastfurious' ? 'bg-yellow-500' :
                        universe.id === 'starwars' ? 'bg-blue-600' :
                        universe.id === 'godzilla' ? 'bg-emerald-600' :
                        universe.id === 'middleearth' ? 'bg-amber-600' :
                        universe.id === 'conjuring' ? 'bg-rose-900' :
                        universe.id === 'dccinematic' ? 'bg-indigo-600' :
                        universe.id === 'xmen' ? 'bg-yellow-500' :
                        universe.id === 'spiderman' ? 'bg-red-600' :
                        universe.id === 'alienpredator' ? 'bg-emerald-600' :
                        universe.id === 'planetoftheapes' ? 'bg-amber-600' :
                        universe.id === 'jurassic' ? 'bg-emerald-600' :
                        universe.id === 'transformers' ? 'bg-red-600' :
                        universe.id === 'johnwick' ? 'bg-amber-600' :
                        universe.id === 'madmax' ? 'bg-amber-600' :
                        universe.id === 'wizardingworld' ? 'bg-amber-500' :
                        'bg-indigo-600'
                      }`} />

                      {/* Vignette & texture shading overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-black/40" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(17,19,24,0.6)_100%)]" />
                    </div>

                    {/* Content overlays */}
                    <div className="relative z-10 max-w-2xl space-y-3">
                      {/* Badge and Stats */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span 
                          className="text-[9px] font-semibold tracking-[0.2em] bg-white/10 text-white px-2.5 py-1 rounded font-mono border border-white/10 uppercase"
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                        >
                          {universe.badge}
                        </span>
                        <span className="text-gray-500 font-mono text-xs">•</span>
                        <span className="text-xs text-[#ffdca1] font-mono tracking-wider">
                          {entryCount} Entries
                        </span>
                        <span className="text-gray-500 font-mono text-xs">•</span>
                        <span className="text-xs text-emerald-400 font-mono tracking-wider font-semibold">
                          {watchedPercent}% COMPLETED
                        </span>
                      </div>

                      {/* Universe Name */}
                      <h2 
                        className="text-2xl md:text-5xl font-black tracking-tight text-white uppercase"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {universe.name}
                      </h2>

                      {/* Tagline / Subtitle */}
                      <p className="text-xs md:text-sm text-[#ffdca1]/80 font-mono tracking-wide">
                        {universe.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-xl font-sans line-clamp-2">
                        {universe.description}
                      </p>

                      {/* Explore Button */}
                      <div className="pt-2 flex gap-3">
                        <button 
                          onClick={() => {
                            setSelectedUniverseId(universe.id);
                            setActiveTab('timeline');
                          }}
                          className="px-6 py-2.5 rounded bg-[#ffba20] text-[#111318] font-bold text-xs tracking-wider hover:bg-white transition-all flex items-center gap-1.5 cursor-pointer uppercase shadow-lg shadow-[#ffba20]/10"
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          Explore Timeline
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Navigation Arrows (Visible on hover) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCarouselIndex((prev) => (prev - 1 + UNIVERSES.length) % UNIVERSES.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 border border-white/5 text-white/80 hover:text-white hover:bg-black/60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer focus:outline-none"
                aria-label="Previous universe"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCarouselIndex((prev) => (prev + 1) % UNIVERSES.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 border border-white/5 text-white/80 hover:text-white hover:bg-black/60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer focus:outline-none"
                aria-label="Next universe"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
                {UNIVERSES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      idx === carouselIndex ? 'bg-[#ffba20] w-5' : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Cinematic Universes Grid list header */}
            <div className="px-4 pt-6 pb-6 md:px-6 md:pt-8 md:pb-8 select-none max-w-[1400px] mx-auto w-full">
              <div className="flex items-center gap-2 mb-4">
                <LayoutGrid className="w-5 h-5 text-[#ffba20]" />
                <h3 
                  className="text-lg font-bold tracking-wider text-white uppercase font-display"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Cinematic Universes
                </h3>
              </div>

              {/* Universe Card Grids + Side Ad Banner on Desktop */}
              <div className="flex flex-col lg:flex-row gap-5 items-start">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 w-full">
                  {UNIVERSES.map((universe) => (
                    <UniverseCard 
                      key={universe.id}
                      universe={universe}
                      watchedPercent={getWatchedPercent(universe.id)}
                      entryCount={getEntryCount(universe.id)}
                      onClick={() => {
                        setSelectedUniverseId(universe.id);
                        setActiveTab('timeline');
                      }}
                    />
                  ))}
                </div>

                {/* Ad Banner on the right side of Universe Cards for Desktop Web */}
                <UniverseGridAdUnit />
              </div>
            </div>

            <Footer />
          </div>
        )}
      </main>

      {/* Persistent Bottom Tabbed Bar element */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#141720] border-t border-white/10 z-40 flex justify-around items-center px-4 shadow-lg">
        
        {/* Universes Tab button */}
        <button
          onClick={() => {
            setActiveTab('universes');
            setSelectedUniverseId(null);
            setSelectedEntry(null);
          }}
          className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all cursor-pointer select-none focus:outline-none ${
            activeTab === 'universes' || activeTab === 'timeline' ? 'text-[#ffba20]' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span 
            className="text-[9px] font-semibold tracking-wider uppercase font-mono"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Universes
          </span>
        </button>

        {/* Blog & Trivia Hub Tab button */}
        <button
          onClick={() => {
            setActiveTab('blog');
            setSelectedUniverseId(null);
            setSelectedEntry(null);
          }}
          className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all cursor-pointer select-none focus:outline-none ${
            activeTab === 'blog' ? 'text-[#ffba20]' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span 
            className="text-[9px] font-semibold tracking-wider uppercase font-mono"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Blog & Trivia
          </span>
        </button>

        {/* Library Tab button */}
        <button
          onClick={() => {
            setActiveTab('library');
            setSelectedUniverseId(null);
            setSelectedEntry(null);
          }}
          className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all cursor-pointer select-none focus:outline-none ${
            activeTab === 'library' ? 'text-[#ffba20]' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span 
            className="text-[9px] font-semibold tracking-wider uppercase font-mono"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Library
          </span>
        </button>
      </nav>
    </div>
  );
}
