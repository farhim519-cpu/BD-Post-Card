import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, ArrowRight, Layers, Quote, Image as GalleryIcon } from 'lucide-react';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { QUOTES } from '../data/quotes';
import { VINTAGE_GALLERY } from '../data/gallery';
import { CATEGORIES } from '../data/categories';
import { PostcardTemplate, QuoteItem, GalleryItem } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPostcard: (postcard: PostcardTemplate) => void;
  onSelectQuote: (quote: QuoteItem) => void;
  onSelectCategory: (category: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPostcard,
  onSelectQuote,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingCategories = trimmed
    ? CATEGORIES.filter((c) => c.name.toLowerCase().includes(trimmed) || c.description.toLowerCase().includes(trimmed))
    : [];

  const matchingPostcards = trimmed
    ? POSTCARD_TEMPLATES.filter(
        (p) =>
          p.title.toLowerCase().includes(trimmed) ||
          p.titleBn.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.defaultQuote.toLowerCase().includes(trimmed)
      ).slice(0, 6)
    : [];

  const matchingQuotes = trimmed
    ? QUOTES.filter(
        (q) =>
          q.text.toLowerCase().includes(trimmed) ||
          q.category.toLowerCase().includes(trimmed) ||
          (q.author && q.author.toLowerCase().includes(trimmed))
      ).slice(0, 6)
    : [];

  const matchingGallery = trimmed
    ? VINTAGE_GALLERY.filter(
        (g) =>
          g.title.toLowerCase().includes(trimmed) ||
          g.quote.toLowerCase().includes(trimmed) ||
          g.category.toLowerCase().includes(trimmed)
      ).slice(0, 4)
    : [];

  const totalResults =
    matchingCategories.length +
    matchingPostcards.length +
    matchingQuotes.length +
    matchingGallery.length;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-[#18110b] border border-[#c5a059]/40 rounded-lg shadow-2xl overflow-hidden text-[#fbf6ee]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#c5a059]/20 flex items-center gap-3 bg-[#120c08]">
          <Search className="w-5 h-5 text-[#c5a059]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="উক্তি বা পোস্টকার্ড খুঁজুন... (যেমন: বৃষ্টি, বিরহ, প্রেমপত্র)"
            className="flex-1 bg-transparent text-sm sm:text-base text-[#fbf6ee] placeholder-[#8f7e6e] outline-none font-serif"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-[#8f7e6e] hover:text-[#fbf6ee]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 bg-[#231710] border border-[#c5a059]/30 rounded text-[#dfb76c] font-mono"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills if no query */}
        {!trimmed && (
          <div className="p-6 text-center space-y-4">
            <span className="text-xs text-[#a89582] font-serif block">জনপ্রিয় অনুসন্ধান ও প্রিয় লেখক:</span>
            <div className="flex flex-wrap justify-center gap-2">
              {['রবীন্দ্রনাথ', 'কাজী নজরুল', 'মির্জা গালিব', 'হুমায়ূন আহমেদ', 'জীবনানন্দ দাশ', 'সুনীল', 'রুদ্র', 'বৃষ্টি', 'প্রেমপত্র', 'গোলাপ'].map((item) => (
                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  className="px-3 py-1.5 rounded-full bg-[#221610] hover:bg-[#322016] border border-[#c5a059]/30 text-xs font-serif text-[#dfb76c] transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results Area */}
        {trimmed && (
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6 no-scrollbar">
            
            {/* 1. Matching Categories */}
            {matchingCategories.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#c5a059] font-serif uppercase tracking-wider mb-2">
                  <span>ক্যাটাগরি</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {matchingCategories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCategory(c.name);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded bg-[#251710] hover:bg-[#382218] border border-[#c5a059]/40 text-xs font-serif text-[#fbf6ee] flex items-center gap-1.5"
                    >
                      <span>{c.icon}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Matching Postcards */}
            {matchingPostcards.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#c5a059] font-serif uppercase tracking-wider mb-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>পোস্টকার্ড ({matchingPostcards.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {matchingPostcards.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onSelectPostcard(p);
                        onClose();
                      }}
                      className="p-2.5 rounded bg-[#1f150e] hover:bg-[#2c1d14] border border-[#c5a059]/25 hover:border-[#dfb76c] cursor-pointer transition-all flex items-center justify-between gap-2 group"
                    >
                      <div className="min-w-0">
                        <span className="text-xs font-serif font-bold text-[#fbf6ee] block group-hover:text-[#dfb76c]">
                          {p.titleBn}
                        </span>
                        <span className="text-[11px] text-[#a89582] line-clamp-1 italic font-serif">
                          “{p.defaultQuote}”
                        </span>
                      </div>
                      <Sparkles className="w-4 h-4 text-[#dfb76c] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Matching Quotes */}
            {matchingQuotes.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#c5a059] font-serif uppercase tracking-wider mb-2">
                  <Quote className="w-3.5 h-3.5" />
                  <span>উক্তি ({matchingQuotes.length})</span>
                </div>
                <div className="space-y-2">
                  {matchingQuotes.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => {
                        onSelectQuote(q);
                        onClose();
                      }}
                      className="p-3 rounded bg-[#1f150e] hover:bg-[#2c1d14] border border-[#c5a059]/25 hover:border-[#dfb76c] cursor-pointer transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="min-w-0">
                        <p className="text-xs text-[#fbf6ee] italic font-serif leading-relaxed line-clamp-2">
                          “{q.text}”
                        </p>
                        <span className="text-[10px] text-[#c5a059] font-serif">
                          {q.category} {q.author ? `• ${q.author}` : ''}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#dfb76c] font-serif shrink-0 px-2 py-1 rounded bg-[#291a11] group-hover:bg-[#9c2f3d] group-hover:text-white transition-colors">
                        ব্যবহার করুন
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Matching Gallery */}
            {matchingGallery.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#c5a059] font-serif uppercase tracking-wider mb-2">
                  <GalleryIcon className="w-3.5 h-3.5" />
                  <span>গ্যালারি আর্ট ({matchingGallery.length})</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {matchingGallery.map((g) => (
                    <div
                      key={g.id}
                      className="p-2.5 rounded bg-[#1f150e] border border-[#c5a059]/20 text-xs font-serif"
                    >
                      <span className="font-bold text-[#fbf6ee] block">{g.title}</span>
                      <span className="text-[10px] text-[#c5a059]">{g.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {totalResults === 0 && (
              <div className="text-center py-8 text-xs text-[#a89582] font-serif">
                “{query}” দিয়ে কোনো ফলাফল মেলেনি।
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
