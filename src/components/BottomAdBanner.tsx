import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export default function BottomAdBanner() {
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

    // 2. Push AdSense request only when container is visible with non-zero width
    const tryPushAd = () => {
      if (pushedRef.current) return;
      if (adRef.current && adRef.current.offsetWidth > 0) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushedRef.current = true;
        } catch (err) {
          console.debug('Bottom AdSense init notice:', err);
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
    <div className="w-full my-2">
      <div className="w-full bg-[#141720] border border-white/10 rounded-2xl p-3 sm:p-4 relative overflow-hidden shadow-xl">
        {/* Header label */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
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

        {/* AdSense Ins element */}
        <div 
          ref={adRef}
          className="w-full rounded-xl bg-black/40 border border-white/5 p-2 min-h-[90px] flex flex-col items-center justify-center relative overflow-hidden"
        >
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', minHeight: '90px' }}
            data-ad-client="ca-pub-5703716061044467"
            data-ad-slot="6052088781"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />

          {/* Fallback label while script loads */}
          <div className="absolute inset-0 pointer-events-none -z-10 flex flex-col items-center justify-center p-3 text-center">
            <span className="text-xs font-mono font-semibold text-gray-400/80 uppercase tracking-widest mb-1">
              Google AdSense
            </span>
            <span className="text-[10px] text-gray-500/80 font-mono leading-relaxed">
              Supporting free timeline guides & resources
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
