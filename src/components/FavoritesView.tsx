import React, { useState } from 'react';
import { PostcardTemplate, QuoteItem, GalleryItem } from '../types';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { QUOTES } from '../data/quotes';
import { VINTAGE_GALLERY } from '../data/gallery';
import { PostcardCard } from './PostcardCard';
import { Heart, Sparkles, Trash2, ArrowRight } from 'lucide-react';

interface FavoritesViewProps {
  favoritePostcardIds: string[];
  favoriteQuoteIds: string[];
  favoriteGalleryIds: string[];
  onToggleFavoritePostcard: (id: string) => void;
  onToggleFavoriteQuote: (id: string) => void;
  onToggleFavoriteGallery: (id: string) => void;
  onSelectPostcard: (postcard: PostcardTemplate) => void;
  onSelectQuote: (quote: QuoteItem) => void;
  onNavigate: (view: string) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoritePostcardIds,
  favoriteQuoteIds,
  favoriteGalleryIds,
  onToggleFavoritePostcard,
  onToggleFavoriteQuote,
  onToggleFavoriteGallery,
  onSelectPostcard,
  onSelectQuote,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'postcards' | 'quotes' | 'gallery'>('postcards');

  const favoritePostcards = POSTCARD_TEMPLATES.filter((p) => favoritePostcardIds.includes(p.id));
  const favoriteQuotes = QUOTES.filter((q) => favoriteQuoteIds.includes(q.id));
  const favoriteGallery = VINTAGE_GALLERY.filter((g) => favoriteGalleryIds.includes(g.id));

  const totalFavorites = favoritePostcards.length + favoriteQuotes.length + favoriteGallery.length;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#3d151c] border border-[#d4af37]/50 text-2xl mb-3 shadow-inner text-[#dfb76c]">
          ♡
        </div>
        <h1 
          className="text-3xl sm:text-4xl font-bold text-[#fbf6ee]"
          style={{ fontFamily: "'Noto Serif Bengali', serif" }}
        >
          আমার পছন্দ
        </h1>
        <p className="text-sm text-[#d6c7b2] font-serif mt-2">
          আপনার সংরক্ষিত পোস্টকার্ড, প্রেমের উক্তি ও আর্টওয়ার্কের ব্যক্তিগত সংগ্রহশালা।
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-[#18110b] p-1 rounded-lg border border-[#c5a059]/30 flex gap-1 text-xs sm:text-sm font-serif">
          <button
            onClick={() => setActiveTab('postcards')}
            className={`py-2 px-4 rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'postcards'
                ? 'bg-[#c5a059] text-[#120c08] font-bold shadow'
                : 'text-[#d6c7b2] hover:text-[#fbf6ee]'
            }`}
          >
            <span>পোস্টকার্ড</span>
            <span className="text-[11px] opacity-80">({favoritePostcards.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`py-2 px-4 rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'quotes'
                ? 'bg-[#c5a059] text-[#120c08] font-bold shadow'
                : 'text-[#d6c7b2] hover:text-[#fbf6ee]'
            }`}
          >
            <span>উক্তি</span>
            <span className="text-[11px] opacity-80">({favoriteQuotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-2 px-4 rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'gallery'
                ? 'bg-[#c5a059] text-[#120c08] font-bold shadow'
                : 'text-[#d6c7b2] hover:text-[#fbf6ee]'
            }`}
          >
            <span>গ্যালারি আর্ট</span>
            <span className="text-[11px] opacity-80">({favoriteGallery.length})</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'postcards' && (
        <>
          {favoritePostcards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoritePostcards.map((card) => (
                <PostcardCard
                  key={card.id}
                  postcard={card}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavoritePostcard}
                  onSelectCard={onSelectPostcard}
                />
              ))}
            </div>
          ) : (
            <EmptyFavoritesState
              message="আপনার পছন্দের কোনো পোস্টকার্ড সংরক্ষিত নেই।"
              actionText="পোস্টকার্ড কালেকশন দেখুন"
              onAction={() => onNavigate('postcards')}
            />
          )}
        </>
      )}

      {activeTab === 'quotes' && (
        <>
          {favoriteQuotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="bg-[#18110b] border border-[#c5a059]/30 rounded-lg p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-serif text-[#dfb76c] px-2 py-0.5 rounded bg-[#241710] border border-[#c5a059]/30">
                        {quote.category}
                      </span>
                      <button
                        onClick={() => onToggleFavoriteQuote(quote.id)}
                        className="text-[#9c2f3d] hover:text-[#b23647] p-1"
                        title="পছন্দ থেকে সরান"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p 
                      className="text-base text-[#fbf6ee] leading-relaxed italic"
                      style={{ fontFamily: "'Noto Serif Bengali', serif" }}
                    >
                      “{quote.text}”
                    </p>

                    {quote.author && (
                      <p className="text-xs text-[#c5a059] font-serif text-right mt-2">
                        — {quote.author}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#c5a059]/15">
                    <button
                      onClick={() => onSelectQuote(quote)}
                      className="w-full py-2 px-4 bg-[#231710] hover:bg-[#9c2f3d] text-[#dfb76c] hover:text-white text-xs font-serif font-semibold rounded border border-[#c5a059]/30 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>পোস্টকার্ডে ব্যবহার করুন</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyFavoritesState
              message="আপনার পছন্দের কোনো উক্তি সংরক্ষিত নেই।"
              actionText="উক্তি কালেকশন দেখুন"
              onAction={() => onNavigate('quotes')}
            />
          )}
        </>
      )}

      {activeTab === 'gallery' && (
        <>
          {favoriteGallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteGallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#18110b] border border-[#c5a059]/30 rounded-lg p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-serif text-[#dfb76c]">
                        {item.category}
                      </span>
                      <button
                        onClick={() => onToggleFavoriteGallery(item.id)}
                        className="text-[#9c2f3d] hover:text-[#b23647] p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="text-base font-bold text-[#fbf6ee] mb-2 font-serif">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#d6c7b2] italic font-serif">
                      “{item.quote}”
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyFavoritesState
              message="আপনার পছন্দের কোনো গ্যালারি আর্ট সংরক্ষিত নেই।"
              actionText="ভিন্টেজ গ্যালারি দেখুন"
              onAction={() => onNavigate('gallery')}
            />
          )}
        </>
      )}

    </div>
  );
};

const EmptyFavoritesState: React.FC<{
  message: string;
  actionText: string;
  onAction: () => void;
}> = ({ message, actionText, onAction }) => (
  <div className="text-center py-16 bg-[#160f0a] border border-[#c5a059]/20 rounded-lg max-w-md mx-auto p-8 space-y-4">
    <div className="text-4xl text-[#c5a059]">♡</div>
    <p className="text-sm text-[#d6c7b2] font-serif">
      {message}
    </p>
    <button
      onClick={onAction}
      className="inline-flex items-center gap-1.5 py-2.5 px-5 bg-[#251710] hover:bg-[#9c2f3d] text-[#dfb76c] hover:text-white text-xs font-serif font-semibold rounded border border-[#c5a059]/40 transition-colors"
    >
      <span>{actionText}</span>
      <ArrowRight className="w-3.5 h-3.5" />
    </button>
  </div>
);
