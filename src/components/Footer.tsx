import { useState } from 'react';
import PrivacyPolicyModal from './PrivacyPolicyModal';

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="w-full py-6 px-4 border-t border-white/5 bg-[#0e1015] text-left select-none">
        <div className="max-w-6xl mx-auto space-y-1 text-xs md:text-[13px] font-sans leading-relaxed">
          <p className="text-gray-400">
            © 2026 <span className="font-bold text-[#2563eb]">Chronoflix</span>. All rights reserved.
          </p>
          <p className="text-gray-300">
            Developed by <span className="font-bold text-white">JN Web Labs</span> <span className="text-gray-500">—</span> <span className="italic text-gray-400">Digital Innovation</span>
          </p>
          <p className="flex items-center gap-3 flex-wrap">
            <a 
              href="mailto:jn.weblabs@gmail.com" 
              className="text-[#2563eb] hover:text-blue-400 underline transition-colors"
            >
              jn.weblabs@gmail.com
            </a>
            <span className="text-gray-600">•</span>
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="text-gray-400 hover:text-white underline cursor-pointer transition-colors"
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </footer>

      <PrivacyPolicyModal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
      />
    </>
  );
}

