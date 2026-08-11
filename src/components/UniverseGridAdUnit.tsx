import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export default function UniverseGridAdUnit() {
  const adRef = useRef<HTMLDivElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    // 1. Ensure Google AdSense script is present in head
    const scriptId = 'google-adsense-script';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5703716061044467';
      scriptEl.async = true;
      scriptEl.crossOrigin = 'anonymous';
      document.head.appendChild(scriptEl);
    }

    // 2. Push AdSense request only when element is visible with non-zero width
    const tryPushAd = () => {
      if (pushedRef.current) return;
      if (adRef.current && adRef.current.offsetWidth > 0) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushedRef.current = true;
        } catch (err) {
          console.debug('Universe Grid AdSense init notice:', err);
        }
      }
    };

    let observer: ResizeObserver | null = null;
    if (adRef.current && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 0) {
            tryPushAd();
          }
        }
      });
      observer.observe(adRef.current);
    } else {
      const timer = setTimeout(tryPushAd, 300);
      return () => clearTimeout(timer);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <aside 
      className="hidden lg:flex flex-col w-[280px] xl:w-[320px] shrink-0 bg-[#141720] border border-white/10 rounded-2xl p-4 justify-between relative overflow-hidden shadow-xl self-stretch min-h-[300px]"
      aria-label="Sponsored advertisement"
    >
      {/* Sleek Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span 
            className="text-[10px] font-bold tracking-[0.2em] text-gray-400 font-mono uppercase"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            SPONSORED
          </span>
        </div>
      </div>

      {/* Google AdSense Square Banner Slot */}
      <div 
        ref={adRef}
        className="w-full flex-1 my-3 rounded-xl bg-black/40 border border-white/5 p-2 flex flex-col items-center justify-center relative overflow-hidden min-h-[220px]"
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%', minHeight: '220px' }}
          data-ad-client="ca-pub-5703716061044467"
          data-ad-slot="8032364809"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />

        {/* Placeholder Fallback while script loads */}
        <div className="absolute inset-0 pointer-events-none -z-10 flex flex-col items-center justify-center p-4 text-center">
          <span className="text-xs font-mono font-semibold text-gray-400/80 uppercase tracking-widest mb-1">
            Google AdSense
          </span>
          <span className="text-[10px] text-gray-500/80 font-mono leading-relaxed max-w-[180px]">
            Supporting free timeline guides
          </span>
        </div>
      </div>

      {/* Sleek Footer */}
      <div className="flex items-center justify-between text-[9px] font-mono text-gray-500 pt-1 border-t border-white/5">
        <span>Slot #8032364809</span>
        <span className="text-gray-400">Desktop Web</span>
      </div>
    </aside>
  );
}
