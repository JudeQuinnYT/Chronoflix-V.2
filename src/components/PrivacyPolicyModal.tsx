import { X, ShieldCheck, Mail } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#141822] border border-white/10 rounded-xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#181d2a]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2563eb]/20 border border-[#2563eb]/40 flex items-center justify-center text-[#3b82f6]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide font-display">Privacy Policy</h2>
              <p className="text-xs text-gray-400">Chronoflix — Developed by JN Web Labs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-gray-300 text-xs md:text-sm leading-relaxed font-sans scrollbar-thin">
          <div className="bg-[#2563eb]/10 border border-[#2563eb]/20 rounded-lg p-3.5 text-xs text-blue-200">
            <strong>Effective Date:</strong> August 2026 | Last updated by JN Web Labs for Chronoflix.
          </div>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-white/5 pb-1">1. Introduction</h3>
            <p>
              Welcome to <strong>Chronoflix</strong> ("we," "our," or "us"), operated and developed by <strong>JN Web Labs</strong>. Your privacy is important to us. This Privacy Policy outlines how we collect, use, and safeguard information when you visit and interact with our application.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-white/5 pb-1">2. Information Collection and Storage</h3>
            <p>
              Chronoflix is designed to respect your privacy. We do not require account registration or personal identity details to browse movie timelines.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-400">
              <li><strong>Local Storage:</strong> Your watch history, timeline progress, and bookmarked movies are stored locally on your device via browser Local Storage (<code className="text-blue-300">localStorage</code>). This data remains on your device and can be reset at any time.</li>
              <li><strong>Log Data & Diagnostics:</strong> Like most websites, our servers may automatically collect standard internet log data, including browser type, device information, and operational timestamps.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-white/5 pb-1">3. Google AdSense & Third-Party Advertising</h3>
            <p>
              We may utilize <strong>Google AdSense</strong> and other third-party advertising partners to serve advertisements when you visit Chronoflix.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>
                <strong>Cookies & Ad Serving:</strong> Third-party vendors, including Google, use cookies (such as the DoubleClick or DART cookie) to serve ads based on your prior visits to our website or other websites across the internet.
              </li>
              <li>
                <strong>Personalized Ads:</strong> Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to Chronoflix and/or other sites on the Internet.
              </li>
              <li>
                <strong>Opt-Out Options:</strong> You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300">Google Ads Settings</a>. Alternatively, you can opt out of third-party vendors' use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300">www.aboutads.info</a>.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-white/5 pb-1">4. Cookies and Web Beacons</h3>
            <p>
              Chronoflix may use cookies and similar tracking technologies to enhance user experience and measure traffic. You can choose to disable cookies through your individual browser options; however, doing so may affect certain features of the site.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-white/5 pb-1">5. Children's Information</h3>
            <p>
              We prioritize protecting children's privacy online. Chronoflix does not knowingly collect any personally identifiable information from children under the age of 13. If you believe your child has provided personal information on our site, please contact us immediately.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-white/5 pb-1">6. Changes to This Privacy Policy</h3>
            <p>
              JN Web Labs reserves the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with an updated effective date.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-white/5 pb-1">7. Contact Us</h3>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy, please contact <strong>JN Web Labs</strong>:
            </p>
            <div className="flex items-center gap-2 mt-2 text-blue-400 font-mono">
              <Mail className="w-4 h-4" />
              <a href="mailto:jn.weblabs@gmail.com" className="underline hover:text-blue-300">
                jn.weblabs@gmail.com
              </a>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#181d2a] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
