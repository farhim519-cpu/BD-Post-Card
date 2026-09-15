import React, { useState, useEffect, useRef } from 'react';
import { SPONSOR_URL, SPONSOR_COUNTDOWN_SECONDS } from '../config';
import { Lock, Download, ExternalLink, CheckCircle, ShieldCheck, X } from 'lucide-react';

interface DownloadGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload?: (format: 'png' | 'jpeg') => Promise<void> | void;
  onProceedDownload?: (format?: 'png' | 'jpeg') => Promise<void> | void;
  cardTitle?: string;
}

export const DownloadGateModal: React.FC<DownloadGateModalProps> = ({
  isOpen,
  onClose,
  onDownload,
  onProceedDownload,
  cardTitle = 'Vintage Postcard',
}) => {
  const [hasVisitedSponsor, setHasVisitedSponsor] = useState(false);
  const [countdown, setCountdown] = useState(SPONSOR_COUNTDOWN_SECONDS);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'jpeg'>('png');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset state whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      setHasVisitedSponsor(false);
      setCountdown(SPONSOR_COUNTDOWN_SECONDS);
      setIsCountingDown(false);
      setIsReady(false);
      setIsExporting(false);
      setPopupBlocked(false);
      setErrorMessage(null);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  }, [isOpen]);

  // Handle countdown effect
  useEffect(() => {
    if (isCountingDown && countdown > 0) {
      timerRef.current = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isCountingDown && countdown === 0) {
      setIsCountingDown(false);
      setIsReady(true);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isCountingDown, countdown]);

  if (!isOpen) return null;

  const handleOpenSponsor = () => {
    setPopupBlocked(false);
    try {
      const newTab = window.open(SPONSOR_URL, '_blank', 'noopener,noreferrer');
      if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
        // Popup was blocked by browser
        setPopupBlocked(true);
      }
    } catch {
      setPopupBlocked(true);
    }

    // Mark sponsor visited and begin the 8-second countdown
    setHasVisitedSponsor(true);
    setCountdown(SPONSOR_COUNTDOWN_SECONDS);
    setIsCountingDown(true);
    setIsReady(false);
  };

  const handlePerformDownload = async () => {
    if (!isReady || isExporting) return;
    setIsExporting(true);
    setErrorMessage(null);
    try {
      if (typeof onProceedDownload === 'function') {
        await onProceedDownload(downloadFormat);
      } else if (typeof onDownload === 'function') {
        await onDownload(downloadFormat);
      } else {
        throw new Error('কোনো ডাউনলোড ফাংশন প্রদান করা হয়নি।');
      }
      // Wait a moment then close
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err: any) {
      console.error("Export failed:", err);
      setErrorMessage(err?.message || 'ডাউনলোড সম্পন্ন করতে সমস্যা হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsExporting(false);
    }
  };

  // Calculate circular progress
  const progressPercent = ((SPONSOR_COUNTDOWN_SECONDS - countdown) / SPONSOR_COUNTDOWN_SECONDS) * 100;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-[#18110b] border border-[#d4af37]/50 rounded-lg p-6 sm:p-8 shadow-2xl text-center text-[#fbf6ee] overflow-hidden"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(197, 160, 89, 0.15)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative vintage borders */}
        <div className="absolute inset-1 border border-[#c5a059]/20 pointer-events-none rounded" />
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="বন্ধ করুন"
          className="absolute top-3 right-3 p-1.5 text-[#c5a059] hover:text-[#fbf6ee] hover:bg-[#c5a059]/20 rounded-full transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#3d181c] border border-[#d4af37]/60 text-2xl mb-3 shadow-inner">
            💌
          </div>
          <h3 
            className="text-xl sm:text-2xl font-bold text-[#fbf6ee] tracking-wide"
            style={{ fontFamily: "'Noto Serif Bengali', serif" }}
          >
            আপনার পোস্টকার্ড প্রস্তুত
          </h3>
          <p className="text-xs text-[#c5a059] mt-1 italic">
            “{cardTitle || 'Vintage Postcard'}”
          </p>
        </div>

        {/* State 1: Sponsor Gate Not Clicked Yet */}
        {!hasVisitedSponsor && (
          <div className="space-y-5">
            <div className="p-4 bg-[#231710] border border-[#c5a059]/20 rounded text-sm text-[#e6d8c3] leading-relaxed">
              <p className="font-serif">
                হাই-রেজোলিউশন HD পোস্টকার্ড ডাউনলোড চালু করার আগে একবার <strong>Sponsor Page</strong> দেখুন।
              </p>
              <div className="mt-2 text-xs text-[#c5a059]/80 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                <span>নিরাপদ ও বিজ্ঞাপনদাতা সমর্থিত ডাউনলোড</span>
              </div>
            </div>

            {/* Sponsor Button */}
            <button
              id="sponsor-view-btn"
              onClick={handleOpenSponsor}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-[#9c2f3d] to-[#671d24] hover:from-[#b23647] hover:to-[#7d242c] text-[#fff6e6] font-medium text-base rounded shadow-lg border border-[#d4af37]/40 transition-all transform active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span className="text-lg">👁️</span>
              <span className="font-serif tracking-wider font-semibold">Sponsor দেখুন</span>
              <ExternalLink className="w-4 h-4 text-[#dfb76c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Locked Download Button */}
            <div className="pt-1">
              <button
                disabled
                className="w-full py-3 px-4 bg-[#201813] text-[#7d6c5d] border border-[#3b2b21] rounded cursor-not-allowed text-sm flex items-center justify-center gap-2 font-serif"
              >
                <Lock className="w-4 h-4" />
                <span>🔒 Download Locked (স্পনসর দেখে আনলক করুন)</span>
              </button>
            </div>
          </div>
        )}

        {/* State 2: Countdown in progress (8 seconds) */}
        {hasVisitedSponsor && isCountingDown && (
          <div className="space-y-5 py-2">
            {popupBlocked && (
              <div className="p-2.5 bg-[#4a1c1d] border border-red-500/40 rounded text-xs text-red-200">
                <span>ব্রাউজারে পপ-আপ ব্লক হয়ে থাকতে পারে। </span>
                <a 
                  href={SPONSOR_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline font-bold text-amber-300 ml-1"
                >
                  এখানে ক্লিক করে স্পনসর পেজ খুলুন
                </a>
              </div>
            )}

            <p className="text-sm text-[#e6d8c3] font-serif">
              Download প্রস্তুত হচ্ছে... অনুগ্রহ করে কয়েক সেকেন্ড অপেক্ষা করুন।
            </p>

            {/* Circular / Large Countdown Display */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="#33241b"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="#d4af37"
                  strokeWidth="8"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * progressPercent) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-mono font-bold text-[#dfb76c]">
                  0{countdown}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#a89886]">সেকেন্ড</span>
              </div>
            </div>

            {/* Locked download button */}
            <button
              disabled
              className="w-full py-3.5 px-4 bg-[#251b14] text-[#8c7a68] border border-[#3f2c1f] rounded cursor-not-allowed text-sm flex items-center justify-center gap-2 font-serif font-medium"
            >
              <Lock className="w-4 h-4 animate-pulse text-[#c5a059]" />
              <span>🔒 Download Locked ({countdown}s)</span>
            </button>
          </div>
        )}

        {/* State 3: Countdown Finished -> Download Ready! */}
        {hasVisitedSponsor && isReady && (
          <div className="space-y-4 py-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#253820] border border-[#528a43] rounded-full text-xs text-[#a9df9a] font-medium animate-bounce">
              <CheckCircle className="w-4 h-4 text-[#7cd362]" />
              <span>✓ Download Ready</span>
            </div>

            <p className="text-sm text-[#fbf6ee] font-serif">
              আপনার পোস্টকার্ড এখন প্রস্তুত। ফাইল ফরম্যাট নির্বাচন করে সংগ্রহ করুন:
            </p>

            {/* Format toggle: PNG vs JPEG */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDownloadFormat('png')}
                className={`py-1.5 px-4 rounded text-xs font-mono font-bold transition-all ${
                  downloadFormat === 'png'
                    ? 'bg-[#c5a059] text-[#140e09] shadow-md'
                    : 'bg-[#221811] text-[#c5a059] border border-[#c5a059]/30 hover:border-[#c5a059]'
                }`}
              >
                HD PNG (উচ্চমান)
              </button>
              <button
                onClick={() => setDownloadFormat('jpeg')}
                className={`py-1.5 px-4 rounded text-xs font-mono font-bold transition-all ${
                  downloadFormat === 'jpeg'
                    ? 'bg-[#c5a059] text-[#140e09] shadow-md'
                    : 'bg-[#221811] text-[#c5a059] border border-[#c5a059]/30 hover:border-[#c5a059]'
                }`}
              >
                HD JPG (কম্প্যাক্ট)
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 bg-[#4a1c1d] border border-red-500/50 rounded text-xs text-red-200 font-serif">
                {errorMessage}
              </div>
            )}

            {/* Active Download Button */}
            <button
              id="final-download-btn"
              onClick={handlePerformDownload}
              disabled={isExporting}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#b38628] to-[#8d671b] hover:from-[#c99a34] hover:to-[#9f7622] text-[#120c08] font-bold text-base rounded shadow-xl border border-[#ffe4a0] transition-all transform active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
            >
              {isExporting ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#120c08] border-t-transparent rounded-full animate-spin" />
                  <span className="font-serif">পোস্টকার্ড রেন্ডার হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 text-[#120c08] group-hover:translate-y-0.5 transition-transform" />
                  <span className="font-serif tracking-wider text-base">⬇️ DOWNLOAD NOW</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Footer info note */}
        <div className="mt-5 pt-3 border-t border-[#c5a059]/15 text-[10px] text-[#8f7e6e]">
          <span>BD Post Card • বিশুদ্ধ ভিন্টেজ অনুভূতি ও ভালোবাসা</span>
        </div>
      </div>
    </div>
  );
};
