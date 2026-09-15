import React, { useState, useMemo } from 'react';
import { QuoteItem } from '../types';
import { QUOTES } from '../data/quotes';
import { CATEGORIES } from '../data/categories';
import { Heart, Sparkles, Dices, Copy, Check, Search, X } from 'lucide-react';

interface QuoteLibraryProps {
  onSelectQuote: (quote: QuoteItem) => void;
  onSurpriseMe: () => void;
  favoriteQuotes: string[];
  onToggleFavoriteQuote: (id: string) => void;
}

export const QuoteLibrary: React.FC<QuoteLibraryProps> = ({
  onSelectQuote,
  onSurpriseMe,
  favoriteQuotes,
  onToggleFavoriteQuote,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(24);

  const filteredQuotes = useMemo(() => {
    return QUOTES.filter((q) => {
      const matchesCategory = selectedCategory ? q.category === selectedCategory : true;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query
        ? true
        : q.text.toLowerCase().includes(query) ||
          (q.author && q.author.toLowerCase().includes(query)) ||
          q.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedQuotes = useMemo(() => {
    return filteredQuotes.slice(0, visibleCount);
  }, [filteredQuotes, visibleCount]);

  const handleCategoryChange = (catName: string | null) => {
    setSelectedCategory(catName);
    setVisibleCount(24);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setVisibleCount(24);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs uppercase tracking-widest text-[#c5a059] font-serif block mb-1">
          ROMANTIC ARCHIVE
        </span>
        <h1 
          className="text-3xl sm:text-4xl font-bold text-[#fbf6ee]"
          style={{ fontFamily: "'Noto Serif Bengali', serif" }}
        >
          রোমান্টিক প্রেমের উক্তি
        </h1>
        <p className="text-sm text-[#d6c7b2] font-serif mt-2">
          বাংলা সাহিত্যের কালজয়ী রোমান্টিক উক্তি ও কবিতা থেকে বেছে নিন আপনার পোস্টকার্ডের জন্য।
        </p>

        {/* Surprise Me Banner Button */}
        <div className="mt-5">
          <button
            onClick={onSurpriseMe}
            className="inline-flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-[#9c2f3d] to-[#671d24] hover:from-[#b23647] hover:to-[#7d242c] text-[#fff8ee] text-sm font-semibold rounded-full shadow-lg border border-[#d4af37]/50 transition-all transform hover:scale-105 active:scale-95 font-serif cursor-pointer"
          >
            <Dices className="w-5 h-5 text-[#dfb76c] animate-spin-slow" />
            <span>🎲 Surprise Me (এলোমেলো পছন্দ)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#18110b] border border-[#c5a059]/30 rounded-lg p-4 mb-8 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c5a059]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="১,৪০০+ উক্তি বা লেখক খুঁজুন (রবীন্দ্রনাথ, নজরুল, গালিব, হুমায়ূন...)..."
              className="w-full bg-[#120c08] border border-[#c5a059]/30 focus:border-[#dfb76c] rounded-md pl-10 pr-8 py-2 text-sm text-[#fbf6ee] placeholder-[#8f7e6e] outline-none font-serif"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8f7e6e] hover:text-[#fbf6ee]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs text-[#dfb76c] font-serif">
            {filteredQuotes.length > 0 ? (
              <span>
                মোট <strong className="text-[#fbf6ee]">{filteredQuotes.length}</strong> টির মধ্যে ১ম থেকে <strong className="text-[#fbf6ee]">{Math.min(visibleCount, filteredQuotes.length)}</strong> টি উক্তি প্রদর্শিত হচ্ছে
              </span>
            ) : (
              <span>কোনো উক্তি পাওয়া যায়নি</span>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs font-serif">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === null
                ? 'bg-[#c5a059] text-[#120c08] font-bold shadow'
                : 'bg-[#221610] text-[#d6c7b2] border border-[#c5a059]/25 hover:border-[#c5a059]'
            }`}
          >
            সকল উক্তি ({QUOTES.length})
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(isSelected ? null : cat.name)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-[#9c2f3d] text-[#fff6e6] font-bold border border-[#d4af37] shadow'
                    : 'bg-[#221610] text-[#d6c7b2] border border-[#c5a059]/25 hover:border-[#c5a059]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name.replace(/^[^\s]+\s/, '')}</span>
                <span className="text-[10px] opacity-75">({cat.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quotes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedQuotes.map((quote) => {
          const isFav = favoriteQuotes.includes(quote.id);
          const isCopied = copiedId === quote.id;

          return (
            <div
              key={quote.id}
              className="bg-[#18110b] border border-[#c5a059]/30 hover:border-[#dfb76c] rounded-lg p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl relative group"
            >
              <div>
                {/* Header of Quote Card */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span 
                    className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-serif text-[#dfb76c] bg-[#241710] border border-[#c5a059]/30"
                  >
                    {quote.category}
                  </span>

                  <div className="flex items-center gap-1">
                    {/* Copy button */}
                    <button
                      onClick={() => handleCopy(quote.id, quote.text)}
                      title="উক্তি কপি করুন"
                      className="p-1.5 rounded text-[#a89582] hover:text-[#fbf6ee] hover:bg-[#251912] transition-colors"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>

                    {/* Favorite button */}
                    <button
                      onClick={() => onToggleFavoriteQuote(quote.id)}
                      title="পছন্দে যোগ করুন"
                      className={`p-1.5 rounded transition-colors ${
                        isFav ? 'text-[#9c2f3d]' : 'text-[#a89582] hover:text-[#dfb76c]'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Quote Text */}
                <div className="my-2">
                  <p 
                    className="text-sm sm:text-base text-[#fbf6ee] leading-relaxed italic"
                    style={{ fontFamily: "'Noto Serif Bengali', serif" }}
                  >
                    “{quote.text}”
                  </p>
                </div>

                {/* Author attribution */}
                {quote.author && (
                  <p className="text-[11px] text-[#c5a059] font-serif text-right mt-2">
                    — {quote.author}
                  </p>
                )}
              </div>

              {/* Action Button: ব্যবহার করুন */}
              <div className="pt-4 mt-4 border-t border-[#c5a059]/15">
                <button
                  onClick={() => onSelectQuote(quote)}
                  className="w-full py-2.5 px-4 bg-[#251710] hover:bg-gradient-to-r hover:from-[#9c2f3d] hover:to-[#671d24] text-[#dfb76c] hover:text-[#fff8ee] text-xs font-semibold rounded border border-[#c5a059]/40 hover:border-[#dfb76c] transition-all flex items-center justify-center gap-1.5 cursor-pointer font-serif"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ব্যবহার করুন</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Pagination / Load More */}
      {filteredQuotes.length > visibleCount && (
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 24)}
            className="py-3 px-8 bg-gradient-to-r from-[#2a1a12] to-[#1f130d] hover:from-[#3a2419] hover:to-[#2b1b12] text-[#dfb76c] hover:text-[#fff8ee] text-sm font-semibold rounded-full border border-[#c5a059]/50 hover:border-[#dfb76c] shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer font-serif"
          >
            <span>আরও ২৪টি উক্তি দেখুন</span>
            <span className="text-xs bg-[#9c2f3d] text-[#fff8ee] px-2 py-0.5 rounded-full font-mono">
              বাকি {filteredQuotes.length - visibleCount}টি
            </span>
          </button>

          <button
            onClick={() => setVisibleCount(filteredQuotes.length)}
            className="py-3 px-6 bg-[#18110b] hover:bg-[#221610] text-[#a89582] hover:text-[#fbf6ee] text-xs font-serif rounded-full border border-[#c5a059]/25 hover:border-[#c5a059]/60 transition-colors cursor-pointer"
          >
            একসাথে সবগুলো দেখুন ({filteredQuotes.length})
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredQuotes.length === 0 && (
        <div className="text-center py-16 bg-[#160f0a] border border-[#c5a059]/20 rounded-xl p-8 max-w-md mx-auto">
          <span className="text-4xl mb-3 block">📜</span>
          <h3 className="text-lg font-bold text-[#fbf6ee] font-serif mb-2">কোনো উক্তি পাওয়া যায়নি</h3>
          <p className="text-xs text-[#a89582] font-serif mb-4">
            ভিন্ন কোনো শব্দ বা ক্যাটাগরি বেছে নিয়ে অনুসন্ধান করুন।
          </p>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery('');
              setVisibleCount(24);
            }}
            className="py-2 px-5 bg-[#9c2f3d] text-[#fff8ee] text-xs font-serif rounded-md hover:bg-[#b23647] transition-all"
          >
            সকল উক্তি রিসেট করুন
          </button>
        </div>
      )}

    </div>
  );
};
