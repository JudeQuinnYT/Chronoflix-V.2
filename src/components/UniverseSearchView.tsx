import { useState } from 'react';
import { Search, X, LayoutGrid, ArrowLeft, Sparkles, Filter } from 'lucide-react';
import { Universe } from '../types';
import UniverseCard from './UniverseCard';
import Footer from './Footer';

interface UniverseSearchViewProps {
  universes: Universe[];
  getWatchedPercent: (univId: any) => number;
  getEntryCount: (univId: any) => number;
  onSelectUniverse: (univId: any) => void;
  onBack?: () => void;
}

export default function UniverseSearchView({
  universes,
  getWatchedPercent,
  getEntryCount,
  onSelectUniverse,
  onBack,
}: UniverseSearchViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter universes based on search query
  const filteredUniverses = universes.filter((u) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    return (
      u.name.toLowerCase().includes(query) ||
      u.tagline.toLowerCase().includes(query) ||
      u.description.toLowerCase().includes(query) ||
      u.badge.toLowerCase().includes(query) ||
      u.id.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex-1 flex flex-col pb-20 select-none min-h-[calc(100vh-64px)] bg-[#111318]">
      {/* Top Banner / Search Header */}
      <div className="bg-[#181d2a] border-b border-white/5 p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-[#ffba20]" />
              <h2 
                className="text-xl md:text-2xl font-bold tracking-wider text-white uppercase font-display"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Find Cinematic Universe
              </h2>
            </div>
            <span className="text-xs font-mono text-[#ffdca1]/80 bg-white/5 px-2.5 py-1 rounded border border-white/10">
              {filteredUniverses.length} {filteredUniverses.length === 1 ? 'Universe' : 'Universes'}
            </span>
          </div>

          <p className="text-xs md:text-sm text-gray-400 font-sans max-w-xl">
            Search across all cinematic franchises. Type a universe title or keyword to filter and jump straight into its chronological timeline.
          </p>

          {/* Search Bar Input */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4 text-[#ffba20]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search universe name, genre, or keyword (e.g. Marvel, Fast, Star Wars)..."
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-[#111318] border border-white/15 text-white placeholder-gray-500 text-xs md:text-sm font-sans focus:outline-none focus:border-[#ffba20] focus:ring-1 focus:ring-[#ffba20] transition-all shadow-inner"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Popular Tag Quick Filters */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-[10px] font-mono uppercase text-gray-500 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Quick Filter:
            </span>
            {['Marvel', 'DC', 'Star Wars', 'Fast', 'Middle-Earth', 'Conjuring', 'Monsterverse'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className={`text-[10px] font-mono px-2.5 py-1 rounded transition-all cursor-pointer border ${
                  searchQuery.toLowerCase() === tag.toLowerCase()
                    ? 'bg-[#ffba20] text-black font-bold border-[#ffba20]'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
                }`}
              >
                {tag}
              </button>
            ))}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[10px] font-mono px-2.5 py-1 rounded bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-all cursor-pointer"
              >
                Show All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        {filteredUniverses.length > 0 ? (
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-gray-400">
              <LayoutGrid className="w-4 h-4 text-[#ffba20]" />
              <span>
                {searchQuery
                  ? `FOUND ${filteredUniverses.length} MATCHING ${filteredUniverses.length === 1 ? 'UNIVERSE' : 'UNIVERSES'}`
                  : 'ALL CINEMATIC UNIVERSES'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredUniverses.map((universe) => (
                <UniverseCard
                  key={universe.id}
                  universe={universe}
                  watchedPercent={getWatchedPercent(universe.id)}
                  entryCount={getEntryCount(universe.id)}
                  onClick={() => onSelectUniverse(universe.id)}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Empty Search Results State */
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
              <Search className="w-8 h-8 text-gray-500" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white uppercase font-display tracking-wide">
                No Universes Found
              </h3>
              <p className="text-xs text-gray-400 max-w-md font-sans">
                We couldn't find any cinematic universe matching "<span className="text-amber-300">{searchQuery}</span>". Try searching for another franchise title or keyword.
              </p>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-[#ffba20] text-black font-mono font-bold text-xs rounded hover:bg-white transition-all cursor-pointer uppercase shadow-lg"
            >
              Clear Search Query
            </button>
          </div>
        )}
      </div>

      {/* Floating Back Button */}
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
