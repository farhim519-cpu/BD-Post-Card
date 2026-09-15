import React, { useState, useMemo } from 'react';
import { PostcardTemplate } from '../types';
import { PostcardCard } from './PostcardCard';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { CATEGORIES } from '../data/categories';
import { Search, Filter, Sparkles, X } from 'lucide-react';

interface PostcardLibraryProps {
  initialCategory?: string | null;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectCard: (postcard: PostcardTemplate) => void;
}

export const PostcardLibrary: React.FC<PostcardLibraryProps> = ({
  initialCategory = null,
  favorites,
  onToggleFavorite,
  onSelectCard,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [visibleCount, setVisibleCount] = useState<number>(24);

  const filteredCards = useMemo(() => {
    return POSTCARD_TEMPLATES.filter((card) => {
      // Category check
      const matchesCategory = selectedCategory ? card.category === selectedCategory : true;

      // Search query check
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query
        ? true
        : card.title.toLowerCase().includes(query) ||
          card.titleBn.toLowerCase().includes(query) ||
          card.category.toLowerCase().includes(query) ||
          card.defaultQuote.toLowerCase().includes(query) ||
          card.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedCards = useMemo(() => {
    if (selectedCategory) {
      return filteredCards;
    }
    return filteredCards.slice(0, visibleCount);
  }, [filteredCards, selectedCategory, visibleCount]);

  const handleCategoryChange = (cat: string | null) => {
    setSelectedCategory(cat);
    setVisibleCount(24);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setVisibleCount(24);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs uppercase tracking-widest text-[#c5a059] font-serif block mb-1">
          ARCHIVE COLLECTION
        </span>
        <h1 
          className="text-3xl sm:text-4xl font-bold text-[#fbf6ee]"
          style={{ fontFamily: "'Noto Serif Bengali', serif" }}
        >
          পোস্টকার্ড লাইব্রেরি
        </h1>
        <p className="text-sm text-[#d6c7b2] font-serif mt-2">
          আপনার ভালোবাসার অনুভূতির সাথে মানানসই ভিন্টেজ পোস্টকার্ডটি খুঁজে নিন।
        </p>
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
              placeholder="পোস্টকার্ড খুঁজুন..."
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

          {/* Active Filter Clear & Count */}
          <div className="flex items-center gap-3 text-xs text-[#c5a059] font-serif">
            <span>মোট {filteredCards.length} টি পোস্টকার্ড পাওয়া গেছে</span>
            {selectedCategory && (
              <button
                onClick={() => handleCategoryChange(null)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#3b151b] text-[#fbf6ee] border border-[#d4af37]/40 hover:bg-[#4d1c24] transition-colors"
              >
                <span>{selectedCategory}</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

        </div>

        {/* Category Filter Pills scrollable */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs font-serif">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === null
                ? 'bg-[#c5a059] text-[#120c08] font-bold shadow'
                : 'bg-[#221610] text-[#d6c7b2] border border-[#c5a059]/25 hover:border-[#c5a059]'
            }`}
          >
            সব ক্যাটাগরি
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
                <span className="text-[10px] opacity-75">
                  ({POSTCARD_TEMPLATES.filter((c) => c.category === cat.name).length})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards Grid */}
      {displayedCards.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedCards.map((card) => (
              <PostcardCard
                key={card.id}
                postcard={card}
                isFavorite={favorites.includes(card.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectCard={onSelectCard}
              />
            ))}
          </div>

          {!selectedCategory && filteredCards.length > visibleCount && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + 24, filteredCards.length))}
                className="px-6 py-2.5 rounded bg-[#2a1a12] hover:bg-[#3b2419] text-[#dfb76c] border border-[#c5a059]/40 font-serif text-sm shadow transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>আরও পোস্টকার্ড দেখুন</span>
                <span className="text-xs text-[#c5a059]/80 font-mono">
                  ({visibleCount} / {filteredCards.length})
                </span>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-[#160f0a] border border-[#c5a059]/20 rounded-lg max-w-lg mx-auto p-8 space-y-3">
          <div className="text-4xl">💌</div>
          <h3 
            className="text-lg font-semibold text-[#fbf6ee]"
            style={{ fontFamily: "'Noto Serif Bengali', serif" }}
          >
            কোনো পোস্টকার্ড পাওয়া যায়নি
          </h3>
          <p className="text-xs text-[#a89582] font-serif">
            “{searchQuery}” দিয়ে কোনো ফলাফল মেলেনি। অন্য কি-ওয়ার্ড দিয়ে খুঁজে দেখুন।
          </p>
          <button
            onClick={() => {
              handleSearchChange('');
              handleCategoryChange(null);
            }}
            className="mt-2 px-4 py-2 bg-[#221610] hover:bg-[#302016] text-[#dfb76c] text-xs font-serif rounded border border-[#c5a059]/30"
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      )}

    </div>
  );
};
