import { useState } from 'react';
import { BookOpen, Sparkles, Filter, Search, ArrowLeft, Clock, User, Tag, HelpCircle, ChevronDown, ChevronUp, Play, Share2, CheckCircle2 } from 'lucide-react';
import { BlogPost, UniverseId, Universe } from '../types';
import { BLOG_POSTS } from '../data/blogData';
import Footer from './Footer';

interface BlogViewProps {
  universes: Universe[];
  onSelectUniverse: (univId: UniverseId) => void;
  onBack?: () => void;
}

export default function BlogView({
  universes,
  onSelectUniverse,
  onBack,
}: BlogViewProps) {
  const [selectedUnivFilter, setSelectedUnivFilter] = useState<UniverseId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [revealedTrivia, setRevealedTrivia] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  // Categories list
  const categories = ['all', 'Watch Order', 'Franchise Lore', 'Trivia Deep-Dive', 'Behind The Scenes', 'Timeline Guide'];

  // Filter posts
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const query = searchQuery.toLowerCase().trim();

    const matchesUniv = selectedUnivFilter === 'all' || post.universeId === selectedUnivFilter;
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.subtitle.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some((t) => t.toLowerCase().includes(query)) ||
      post.trivia.some(
        (tr) => tr.question.toLowerCase().includes(query) || tr.answer.toLowerCase().includes(query)
      );

    return matchesUniv && matchesCategory && matchesSearch;
  });

  const toggleTriviaAnswer = (key: string) => {
    setRevealedTrivia((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getUniverseName = (univId: UniverseId) => {
    return universes.find((u) => u.id === univId)?.name || univId.toUpperCase();
  };

  const getUniverseBadge = (univId: UniverseId) => {
    return universes.find((u) => u.id === univId)?.badge || 'FRANCHISE';
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#111318] text-[#e2e2e8]">
      {/* Article Detail View Modal */}
      {activeArticle ? (
        <div className="min-h-screen bg-[#111318] pb-24">
          {/* Article Header Banner */}
          <div className="relative w-full h-[320px] md:h-[450px] overflow-hidden border-b border-white/10">
            <img
              src={activeArticle.featuredImage}
              alt={activeArticle.title}
              className="w-full h-full object-cover object-center filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-[#111318]/70 to-black/40" />

            {/* Back Button */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
              <button
                onClick={() => setActiveArticle(null)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-black/60 hover:bg-[#ffba20] hover:text-black text-white text-xs font-mono font-bold uppercase transition-all border border-white/20 backdrop-blur-md cursor-pointer shadow-xl"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog & Trivia
              </button>
            </div>

            {/* Title Overlay Info */}
            <div className="absolute bottom-6 left-4 right-4 md:left-8 md:right-8 max-w-4xl mx-auto z-10 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#ffba20] text-black font-mono font-bold text-[10px] uppercase tracking-wider shadow">
                  {getUniverseBadge(activeArticle.universeId)}
                </span>
                <span className="px-2.5 py-1 rounded bg-white/15 text-white font-mono font-medium text-[10px] uppercase tracking-wider backdrop-blur-sm border border-white/10">
                  {activeArticle.category}
                </span>
                <span className="text-[11px] font-mono text-gray-300 flex items-center gap-1 ml-auto">
                  <Clock className="w-3.5 h-3.5 text-[#ffba20]" />
                  {activeArticle.readTime}
                </span>
              </div>

              <h1
                className="text-2xl md:text-4xl font-extrabold text-white leading-tight font-display tracking-wide"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {activeArticle.title}
              </h1>

              <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed max-w-3xl">
                {activeArticle.subtitle}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10 text-xs text-gray-400 font-mono">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#ffba20]" />
                  <span>{activeArticle.author}</span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] transition-all cursor-pointer border border-white/10"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#ffba20]" />
                  {copiedLink ? 'Link Copied!' : 'Share Article'}
                </button>
              </div>
            </div>
          </div>

          {/* Article Main Content Container */}
          <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8 space-y-8 font-sans">
            {/* Quick Action: Explore Universe Timeline CTA */}
            <div className="p-4 md:p-5 rounded-xl bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-black/60 border border-[#ffba20]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div>
                <h4 className="text-sm font-bold text-amber-200 font-display flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#ffba20]" />
                  Want to watch this in chronological order?
                </h4>
                <p className="text-xs text-gray-300">
                  Explore all feature films in the <strong className="text-white">{getUniverseName(activeArticle.universeId)}</strong> timeline with watched tracking.
                </p>
              </div>
              <button
                onClick={() => {
                  onSelectUniverse(activeArticle.universeId);
                }}
                className="px-5 py-2.5 rounded bg-[#ffba20] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-all cursor-pointer shrink-0 flex items-center gap-1.5 shadow-lg"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Explore {getUniverseBadge(activeArticle.universeId)} Timeline
              </button>
            </div>

            {/* Introduction */}
            <div className="prose prose-invert max-w-none">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-sans bg-white/5 p-5 rounded-xl border border-white/10 italic">
                "{activeArticle.introduction}"
              </p>
            </div>

            {/* Key Takeaways Box */}
            <div className="p-5 md:p-6 rounded-xl bg-[#141822] border border-amber-500/20 space-y-3 shadow-lg">
              <h3 className="text-xs md:text-sm font-mono font-bold text-[#ffba20] uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Key Editorial Takeaways & Summary
              </h3>
              <ul className="space-y-2 text-xs md:text-sm text-gray-300">
                {activeArticle.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#ffba20] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Sections */}
            <div className="space-y-8">
              {activeArticle.mainContent.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h2
                    className="text-lg md:text-2xl font-bold text-white font-display border-b border-white/10 pb-2 flex items-center gap-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <span className="text-[#ffba20] text-sm font-mono font-normal">0{idx + 1}.</span>
                    {section.heading}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans whitespace-pre-line">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Interactive Trivia Section */}
            {activeArticle.trivia && activeArticle.trivia.length > 0 && (
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#ffba20]" />
                  <h3
                    className="text-lg font-bold text-white uppercase font-display tracking-wider"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Mind-Blowing {getUniverseBadge(activeArticle.universeId)} Trivia
                  </h3>
                </div>

                <div className="space-y-3">
                  {activeArticle.trivia.map((t, idx) => {
                    const key = `${activeArticle.id}-tr-${idx}`;
                    const isRevealed = !!revealedTrivia[key];
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#181c26] border border-white/10 space-y-3 transition-all"
                      >
                        <div
                          onClick={() => toggleTriviaAnswer(key)}
                          className="flex items-center justify-between cursor-pointer select-none group"
                        >
                          <span className="text-xs md:text-sm font-semibold text-white font-sans group-hover:text-[#ffba20] transition-colors flex items-center gap-2">
                            <span className="text-amber-400 font-mono text-xs">Q{idx + 1}:</span>
                            {t.question}
                          </span>
                          <button className="p-1 rounded bg-white/10 text-gray-300 group-hover:text-white shrink-0 ml-2">
                            {isRevealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>

                        {isRevealed ? (
                          <div className="pt-2 border-t border-white/10 space-y-2 text-xs md:text-sm">
                            <p className="text-amber-200 font-medium font-sans">
                              <strong className="text-[#ffba20]">Answer:</strong> {t.answer}
                            </p>
                            <p className="text-gray-300 bg-black/40 p-3 rounded-lg border border-amber-500/20 font-sans italic">
                              💡 <strong>Fun Fact:</strong> {t.funFact}
                            </p>
                          </div>
                        ) : (
                          <button
                            onClick={() => toggleTriviaAnswer(key)}
                            className="text-[11px] font-mono text-[#ffba20] hover:underline cursor-pointer"
                          >
                            Click to reveal answer & fun fact →
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Timeline Recommendation Banner */}
            <div className="p-5 rounded-xl bg-black/60 border border-white/15 space-y-2">
              <span className="text-[10px] font-mono text-[#ffba20] uppercase tracking-wider font-bold">
                CHRONOLOGICAL RECOMMENDATION
              </span>
              <p className="text-xs md:text-sm text-gray-300 font-sans">
                {activeArticle.timelineRecommendation}
              </p>
            </div>

            {/* Footer Back Button */}
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-3 rounded-xl bg-[#ffba20] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-all cursor-pointer shadow-lg"
              >
                Return to All Articles & Lore
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Blog List Main Landing Page */
        <div className="flex-1 max-w-[1400px] w-full mx-auto px-4 md:px-6 py-6 md:py-8 space-y-8 select-none">
          {/* Header Bar */}
          <div className="space-y-3 border-b border-white/10 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[#ffba20]" />
                <h2
                  className="text-xl md:text-3xl font-extrabold tracking-wider text-white uppercase font-display"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  ChronoFlix Lore & Trivia Hub
                </h2>
              </div>
              {onBack && (
                <button
                  onClick={onBack}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#ffba20] hover:text-black text-white text-xs font-mono font-bold transition-all border border-white/15 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> HOME
                </button>
              )}
            </div>

            <p className="text-xs md:text-sm text-gray-400 font-sans max-w-2xl">
              Deep editorial watch guides, in-universe timeline breakdowns, trivia facts, and behind-the-scenes lore for all 16 major cinematic universes.
            </p>

            {/* Search Input Bar */}
            <div className="pt-2">
              <div className="relative max-w-2xl">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, trivia questions, or universe keywords (e.g. Tokyo Drift, Valak, BBY, Tesseract)..."
                  className="w-full pl-10 pr-10 py-3 rounded-lg bg-[#111318] border border-white/15 text-white placeholder-gray-500 text-xs md:text-sm font-sans focus:outline-none focus:border-[#ffba20] focus:ring-1 focus:ring-[#ffba20] transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Universe & Category Filters */}
          <div className="space-y-4">
            {/* Universe Filter Chips */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase text-gray-400 flex items-center gap-1 font-semibold">
                <Filter className="w-3 h-3 text-[#ffba20]" /> Filter by Universe:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedUnivFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-all cursor-pointer ${
                    selectedUnivFilter === 'all'
                      ? 'bg-[#ffba20] text-black font-bold shadow-md'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
                  }`}
                >
                  All Universes ({BLOG_POSTS.length})
                </button>

                {universes.map((univ) => {
                  const count = BLOG_POSTS.filter((p) => p.universeId === univ.id).length;
                  return (
                    <button
                      key={univ.id}
                      onClick={() => setSelectedUnivFilter(univ.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedUnivFilter === univ.id
                          ? 'bg-[#ffba20] text-black font-bold shadow-md'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
                      }`}
                    >
                      <span>{univ.badge}</span>
                      {count > 0 && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-black/40 text-amber-200">
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Article Category Chips */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-white/5">
              <span className="text-[10px] font-mono uppercase text-gray-400 flex items-center gap-1 font-semibold self-center mr-2">
                <Tag className="w-3 h-3 text-[#ffba20]" /> Topic:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-[11px] font-sans font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat === 'all' ? 'All Topics' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Article Spotlight (when no filters applied) */}
          {selectedUnivFilter === 'all' && selectedCategory === 'all' && !searchQuery && BLOG_POSTS.length > 0 && (
            <div
              onClick={() => setActiveArticle(BLOG_POSTS[0])}
              className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#181c26] group cursor-pointer shadow-2xl transition-all hover:border-[#ffba20]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto min-h-[280px] overflow-hidden">
                  <img
                    src={BLOG_POSTS[0].featuredImage}
                    alt={BLOG_POSTS[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#181c26] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#ffba20] text-black font-mono font-bold text-xs uppercase shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> FEATURED ARTICLE
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                      <span className="px-2 py-0.5 rounded bg-white/10 text-amber-300 font-bold uppercase">
                        {getUniverseBadge(BLOG_POSTS[0].universeId)}
                      </span>
                      <span>•</span>
                      <span>{BLOG_POSTS[0].readTime}</span>
                    </div>

                    <h3
                      className="text-xl md:text-2xl font-bold text-white group-hover:text-[#ffba20] transition-colors leading-tight font-display"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {BLOG_POSTS[0].title}
                    </h3>

                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans line-clamp-3">
                      {BLOG_POSTS[0].excerpt}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs font-mono">
                    <span className="text-gray-400">{BLOG_POSTS[0].author}</span>
                    <span className="text-[#ffba20] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      READ FULL ARTICLE & TRIVIA →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Grid List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono uppercase text-gray-400 font-bold tracking-wider">
                Articles & Lore ({filteredPosts.length})
              </h3>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setActiveArticle(post)}
                    className="flex flex-col bg-[#181c26] border border-white/10 rounded-xl overflow-hidden hover:border-[#ffba20]/60 transition-all cursor-pointer group shadow-lg"
                  >
                    {/* Thumbnail Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-black">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#181c26] via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[#ffba20] border border-[#ffba20]/30 font-mono text-[10px] font-bold uppercase">
                          {getUniverseBadge(post.universeId)}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/20 backdrop-blur-md text-white font-mono text-[10px] font-medium uppercase">
                          {post.category}
                        </span>
                      </div>

                      <div className="absolute bottom-2 right-3 z-10 flex items-center gap-1 text-[10px] font-mono text-gray-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                        <Clock className="w-3 h-3 text-[#ffba20]" />
                        {post.readTime}
                      </div>
                    </div>

                    {/* Article Info Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h4
                          className="text-base font-bold text-white group-hover:text-[#ffba20] transition-colors leading-snug font-display line-clamp-2"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Trivia Preview Count Badge */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                        <span className="text-[11px] text-amber-200/80 flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5 text-[#ffba20]" />
                          {post.trivia.length} Trivia Facts
                        </span>
                        <span className="text-[11px] text-[#ffba20] font-bold group-hover:translate-x-1 transition-transform">
                          Read Article →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-[#181c26] rounded-2xl border border-white/10 space-y-3">
                <BookOpen className="w-10 h-10 text-gray-500 mx-auto" />
                <h4 className="text-base font-bold text-white uppercase font-display">
                  No Articles Found
                </h4>
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  We couldn't find any articles or trivia matching your filters. Try selecting another universe or clearing your search.
                </p>
                <button
                  onClick={() => {
                    setSelectedUnivFilter('all');
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-lg bg-[#ffba20] text-black font-mono font-bold text-xs uppercase cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
}
