import { Film, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onProfileClick?: () => void;
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  backLabel?: string;
}

export default function Header({
  title = 'CHRONOFLIX',
  subtitle = 'THE ULTIMATE TIMELINE GUIDE',
  onBack,
  backLabel = 'BACK',
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-white/5 bg-[#111318]/95 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-3 md:gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#ffba20] hover:text-black text-white text-xs font-mono font-bold tracking-wider transition-all border border-white/15 cursor-pointer shadow-md active:scale-95 group shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-[#ffba20] group-hover:text-black transition-colors" />
            <span className="uppercase hidden sm:inline">{backLabel}</span>
            <span className="uppercase sm:hidden">BACK</span>
          </button>
        )}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-[#ffba20] shrink-0" />
            <h1 
              className="text-base md:text-xl font-bold tracking-[0.15em] text-white font-display select-none truncate"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {title}
            </h1>
          </div>
          {subtitle && (
            <span 
              className="text-[9px] md:text-[10px] tracking-[0.2em] text-[#d5c4ab] font-medium font-mono uppercase truncate"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

