import React, { useState } from 'react';
import { X, Heart, Mail, Shield, FileText } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'contact' | null>(null);

  return (
    <footer className="bg-[#0f0a07] border-t border-[#c5a059]/20 text-[#d8c8b4] font-serif pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">💌</span>
              <span className="text-xl font-bold text-[#fbf6ee] tracking-wide">
                BD Post Card
              </span>
            </div>
            <p className="text-sm text-[#c5a059] italic">
              “পুরনো দিনের অনুভূতি, আজকের ভালোবাসার জন্য।”
            </p>
            <p className="text-xs text-[#a89582] leading-relaxed max-w-md">
              একটি ডিজিটাল ভিন্টেজ প্রেমের পোস্টকার্ড সংগ্রহশালা ও জেনারেটর। ভালোবাসার মানুষকে চিঠি পাঠানোর হারিয়ে যাওয়া সোনালী দিনগুলোকে ফিরিয়ে আনার এক আন্তরিক প্রয়াস।
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2 text-xs">
            <h4 className="text-sm font-bold text-[#fbf6ee] mb-3 uppercase tracking-wider text-[#dfb76c]">
              আর্কাইভ লিংক
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-[#dfb76c] transition-colors"
                >
                  হোম (Home)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('generator')} 
                  className="hover:text-[#dfb76c] transition-colors"
                >
                  পোস্টকার্ড তৈরি করুন (Create)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('postcards')} 
                  className="hover:text-[#dfb76c] transition-colors"
                >
                  পোস্টকার্ড গ্যালারি (Postcards)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('quotes')} 
                  className="hover:text-[#dfb76c] transition-colors"
                >
                  প্রেমের উক্তি (Quotes)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('gallery')} 
                  className="hover:text-[#dfb76c] transition-colors"
                >
                  ভিন্টেজ গ্যালারি (Gallery)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Support */}
          <div className="space-y-2 text-xs">
            <h4 className="text-sm font-bold text-[#fbf6ee] mb-3 uppercase tracking-wider text-[#dfb76c]">
              সহায়তা ও নীতি
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setModalType('privacy')} 
                  className="hover:text-[#dfb76c] transition-colors"
                >
                  Privacy Policy (গোপনীয়তা নীতি)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setModalType('terms')} 
                  className="hover:text-[#dfb76c] transition-colors"
                >
                  Terms of Service (শর্তাবলী)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setModalType('contact')} 
                  className="hover:text-[#dfb76c] transition-colors"
                >
                  যোগাযোগ (Contact Us)
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-6 border-t border-[#c5a059]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8f7e6e]">
          <div>
            © BD Post Card. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-[#c5a059]">
            <span>হৃদয় দিয়ে নির্মিত</span>
            <Heart className="w-3.5 h-3.5 text-[#9c2f3d] fill-current" />
            <span>বাংলাদেশ</span>
          </div>
        </div>

      </div>

      {/* Simple Information Modal (Privacy / Terms / Contact) */}
      {modalType && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          onClick={() => setModalType(null)}
        >
          <div 
            className="w-full max-w-lg bg-[#18110b] border border-[#c5a059]/50 rounded-lg p-6 text-[#fbf6ee] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalType(null)}
              className="absolute top-3 right-3 p-1 text-[#c5a059] hover:text-[#fbf6ee]"
            >
              <X className="w-5 h-5" />
            </button>

            {modalType === 'privacy' && (
              <div className="space-y-3 text-xs leading-relaxed">
                <div className="flex items-center gap-2 text-base font-bold text-[#dfb76c]">
                  <Shield className="w-5 h-5" />
                  <span>Privacy Policy (গোপনীয়তা নীতি)</span>
                </div>
                <p>
                  BD Post Card আপনার গোপনীয়তাকে সর্বোচ্চ সম্মান করে। এই অ্যাপ্লিকেশনটি ব্যবহার করার জন্য কোনো অ্যাকাউন্ট বা লগইনের প্রয়োজন নেই।
                </p>
                <p>
                  আপনার পছন্দের পোস্টকার্ড ও উক্তি শুধুমাত্র আপনার ডিভাইসের লোকাল স্টোরেজে (localStorage) সংরক্ষিত থাকে। কোনো ব্যক্তিগত চিঠি বা নাম আমাদের সার্ভারে জমা রাখা হয় না।
                </p>
                <p>
                  বিজ্ঞাপন বা স্পনসর পেজ ভিজিটের সময় সংশ্লিষ্ট বাহ্যিক সাইটের নিজস্ব গোপনীয়তা নীতি প্রযোজ্য হবে।
                </p>
              </div>
            )}

            {modalType === 'terms' && (
              <div className="space-y-3 text-xs leading-relaxed">
                <div className="flex items-center gap-2 text-base font-bold text-[#dfb76c]">
                  <FileText className="w-5 h-5" />
                  <span>Terms of Service (ব্যবহারের শর্তাবলী)</span>
                </div>
                <p>
                  BD Post Card এর সকল ভিন্টেজ আর্টওয়ার্ক ও পোস্টকার্ড ডিজাইন ব্যক্তিগত ও অবাণিজ্যিক ব্যবহারের জন্য উন্মুক্ত।
                </p>
                <p>
                  ব্যবহারকারীরা বিনামূল্যে হাই-রেজোলিউশন পোস্টকার্ড তৈরি এবং ডাউনলোড করতে পারবেন। ডাউনলোড কার্যক্রমে স্পনসর পেজ পরিদর্শন সমর্থিত গেট রয়েছে।
                </p>
                <p>
                  অনলাইন শিষ্টাচার ও নৈতিকতা বজায় রেখে ভালোবাসা প্রকাশ করতে এটি ব্যবহার করুন।
                </p>
              </div>
            )}

            {modalType === 'contact' && (
              <div className="space-y-3 text-xs leading-relaxed">
                <div className="flex items-center gap-2 text-base font-bold text-[#dfb76c]">
                  <Mail className="w-5 h-5" />
                  <span>যোগাযোগ (Contact)</span>
                </div>
                <p>
                  BD Post Card সম্পর্কিত যেকোনো মতামত, নতুন উক্তি বা ডিজাইন পরামর্শের জন্য আমাদের সাথে যোগাযোগ করতে পারেন:
                </p>
                <div className="p-3 bg-[#221610] rounded border border-[#c5a059]/30 text-[#dfb76c]">
                  <p>ইমেইল: <strong>contact@bdpostcard.com</strong></p>
                  <p>স্থান: ঢাকা, বাংলাদেশ</p>
                </div>
              </div>
            )}

            <div className="mt-5 text-right">
              <button
                onClick={() => setModalType(null)}
                className="py-1.5 px-4 bg-[#251710] hover:bg-[#342017] text-[#dfb76c] text-xs rounded border border-[#c5a059]/30"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
