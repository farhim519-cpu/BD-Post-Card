import React from 'react';
import { Sparkles, Image as GalleryIcon, Heart, Send } from 'lucide-react';
import { PostcardPreview } from './PostcardPreview';
import { POSTCARD_TEMPLATES } from '../data/postcards';

interface HeroProps {
  onCreateClick: () => void;
  onGalleryClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCreateClick, onGalleryClick }) => {
  const featuredCard = POSTCARD_TEMPLATES[0]; // Rainy Love

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#c5a059]/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#9c2f3d]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#d4af37]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Vintage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#20150e] border border-[#c5a059]/40 text-xs text-[#dfb76c] shadow-sm font-serif">
              <span className="w-2 h-2 rounded-full bg-[#dfb76c] animate-pulse"></span>
              <span>ডিজিটাল ভিন্টেজ প্রেমপত্র ও পোস্টকার্ড আর্কাইভ</span>
            </div>

            {/* Main Headline */}
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-[#fbf6ee] leading-tight tracking-wide"
              style={{ fontFamily: "'Noto Serif Bengali', serif" }}
            >
              “পুরনো দিনের অনুভূতি, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfb76c] via-[#f7e3af] to-[#c5a059]">
                আজকের ভালোবাসার জন্য।”
              </span>
            </h1>

            {/* Subheadline */}
            <p 
              className="text-base sm:text-lg text-[#d8c8b4] leading-relaxed max-w-xl mx-auto lg:mx-0 font-serif"
            >
              আপনার প্রিয় মানুষটির জন্য তৈরি করুন একটি সুন্দর Vintage Postcard। রবীন্দ্রনাথ, নজরুল, গালিব, হুমায়ূন আহমেদসহ ২১টি সমৃদ্ধ ক্যাটাগরিতে ৫২৫+ ভিন্টেজ ডিজাইন ও ১,৪০০+ কালজয়ী উক্তি থেকে বেছে নিয়ে উপহার দিন চিরন্তন ভালোবাসার পরশ।
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onCreateClick}
                className="w-full sm:w-auto py-3.5 px-7 bg-gradient-to-r from-[#9c2f3d] to-[#671d24] hover:from-[#b23647] hover:to-[#7d242c] text-[#fff8ee] text-base font-semibold rounded-md shadow-xl border border-[#d4af37]/50 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2.5 font-serif group cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-[#dfb76c] group-hover:rotate-12 transition-transform" />
                <span>✨ পোস্টকার্ড তৈরি করুন</span>
              </button>

              <button
                onClick={onGalleryClick}
                className="w-full sm:w-auto py-3.5 px-6 bg-[#1f150f] hover:bg-[#2a1d15] text-[#dfb76c] hover:text-[#fbf6ee] text-base font-semibold rounded-md border border-[#c5a059]/40 transition-all flex items-center justify-center gap-2 font-serif cursor-pointer"
              >
                <GalleryIcon className="w-4 h-4 text-[#c5a059]" />
                <span>🖼️ Vintage Gallery দেখুন</span>
              </button>
            </div>

            {/* Quick Micro-stats / Trust Features */}
            <div className="pt-4 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 border-t border-[#c5a059]/15 text-xs text-[#a99988] font-serif">
              <div className="flex items-center gap-2">
                <span className="text-[#c5a059] text-base">💌</span>
                <span>৫২৫+ ভিন্টেজ ডিজাইন</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#c5a059] text-base">📜</span>
                <span>১৪০০+ উক্তি লাইব্রেরি</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#c5a059] text-base">⬇️</span>
                <span>HD কার্ড ডাউনলোড</span>
              </div>
            </div>

          </div>

          {/* Right Hero Realistic Vintage Postcard Preview */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-lg group">
              {/* Antique wooden desk or warm backdrop glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#c5a059]/20 to-[#9c2f3d]/20 rounded-xl blur-lg group-hover:blur-xl transition-all opacity-70" />
              
              {/* Stacked vintage cards illusion in background */}
              <div className="absolute inset-0 bg-[#251b13] border border-[#c5a059]/30 rounded-md transform rotate-3 scale-95 opacity-60 pointer-events-none" />
              <div className="absolute inset-0 bg-[#1f1610] border border-[#c5a059]/20 rounded-md transform -rotate-2 scale-98 opacity-75 pointer-events-none" />

              {/* Realistic Postcard Card */}
              <div className="relative transform transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]">
                <PostcardPreview
                  postcard={featuredCard}
                  recipient="প্রিয়তমা"
                  quoteText="তোমার কথা মনে পড়লে বৃষ্টিও যেন চিঠি হয়ে নামে কাঁচের জানালায়।"
                  sender="ইতি, তোমার মেঘপিয়ন..."
                  date="শ্রাবণ ১৪৩২"
                  fontCategory="Elegant Bengali"
                  fontSize={22}
                  isBold={false}
                  isItalic={false}
                  textAlign="center"
                  letterSpacing={0.5}
                  lineHeight={1.6}
                  textColor="#fcf8ee"
                  textPosition="middle"
                  vintageEffect="warm-vintage"
                  exportFormat="postcard"
                  id="hero-preview-postcard"
                />

                {/* Floating "ব্যবহার করুন" badge over hero card */}
                <div className="absolute bottom-4 right-4 z-20">
                  <button
                    onClick={onCreateClick}
                    className="py-2 px-3.5 bg-[#140e09]/90 hover:bg-[#20150e] border border-[#d4af37]/60 text-xs text-[#dfb76c] font-serif rounded shadow-lg flex items-center gap-1.5 transition-all"
                  >
                    <span>এই ডিজাইনটি ব্যবহার করুন</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
