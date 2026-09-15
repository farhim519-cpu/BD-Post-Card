import React from 'react';
import { PostcardTemplate } from '../types';
import { PostcardCard } from './PostcardCard';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { ArrowRight, Flame, Sparkles, Heart, CloudRain, Mail, BookOpen } from 'lucide-react';

interface FeaturedSectionsProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectCard: (postcard: PostcardTemplate) => void;
  onViewAll: (categoryFilter?: string) => void;
}

export const FeaturedSections: React.FC<FeaturedSectionsProps> = ({
  favorites,
  onToggleFavorite,
  onSelectCard,
  onViewAll,
}) => {
  // Collections filtering
  const popularCards = POSTCARD_TEMPLATES.filter(p => p.collection === 'popular' || p.id === 'vp001').slice(0, 4);
  const authorCards = POSTCARD_TEMPLATES.filter(p => 
    p.category === '📜 রবীন্দ্রনাথ ঠাকুর' || 
    p.category === '🪶 কাজী নজরুল ইসলাম' || 
    p.category === '✒️ মির্জা গালিব' || 
    p.category === '🌙 হুমায়ূন আহমেদ' || 
    p.category === '🌾 জীবনানন্দ দাশ' || 
    p.category === '🥀 সুনীল গঙ্গোপাধ্যায়' || 
    p.category === '🍂 রুদ্র মুহম্মদ শহিদুল্লাহ'
  ).slice(0, 4);
  const newCards = POSTCARD_TEMPLATES.filter(p => p.collection === 'new' || p.id === 'vp002').slice(0, 4);
  const romanticCards = POSTCARD_TEMPLATES.filter(p => p.category === '❤️ প্রেম' || p.category === '🌹 রোমান্টিক').slice(0, 4);
  const rainyCards = POSTCARD_TEMPLATES.filter(p => p.category === '🌧️ বৃষ্টি').slice(0, 4);
  const vintageLetterCards = POSTCARD_TEMPLATES.filter(p => p.category === '💌 প্রেমপত্র' || p.category === '🇧🇩 Bengali Vintage').slice(0, 4);

  const renderSectionHeader = (
    title: string, 
    icon: React.ReactNode, 
    filterParam?: string,
    subtitle?: string
  ) => (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 border-b border-[#c5a059]/20 pb-3">
      <div>
        <div className="flex items-center gap-2">
          {icon}
          <h2 
            className="text-xl sm:text-2xl font-bold text-[#fbf6ee]"
            style={{ fontFamily: "'Noto Serif Bengali', serif" }}
          >
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-xs text-[#a89582] font-serif mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      <button
        onClick={() => onViewAll(filterParam)}
        className="text-xs text-[#dfb76c] hover:text-[#fbf6ee] font-serif font-medium flex items-center gap-1 group self-start sm:self-auto py-1"
      >
        <span>সবগুলো দেখুন</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );

  return (
    <div className="py-10 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. 🔥 জনপ্রিয় পোস্টকার্ড */}
      <section>
        {renderSectionHeader('জনপ্রিয় পোস্টকার্ড', <Flame className="w-6 h-6 text-[#e07a5f]" />, undefined, 'সবচেয়ে বেশি ব্যবহৃত রোমান্টিক ডিজাইনসমূহ')}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCards.map((card) => (
            <PostcardCard
              key={card.id}
              postcard={card}
              isFavorite={favorites.includes(card.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectCard={onSelectCard}
            />
          ))}
        </div>
      </section>

      {/* 2. 📜 বিখ্যাত সাহিত্যিকদের অমর প্রেমপত্র */}
      <section>
        {renderSectionHeader('বিখ্যাত লেখকদের অমর প্রেমপত্র', <BookOpen className="w-6 h-6 text-[#c5a059]" />, '📜 রবীন্দ্রনাথ ঠাকুর', 'রবীন্দ্রনাথ, নজরুল, গালিব, হুমায়ূন আহমেদ ও জীবনানন্দের অমর সাহিত্যের ছোঁয়া')}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {authorCards.map((card) => (
            <PostcardCard
              key={card.id}
              postcard={card}
              isFavorite={favorites.includes(card.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectCard={onSelectCard}
            />
          ))}
        </div>
      </section>

      {/* 3. ✨ নতুন পোস্টকার্ড */}
      <section>
        {renderSectionHeader('নতুন পোস্টকার্ড', <Sparkles className="w-6 h-6 text-[#dfb76c]" />, undefined, 'সম্প্রতি সংগৃহীত ক্লাসিক ভিন্টেজ আর্টওয়ার্ক')}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newCards.map((card) => (
            <PostcardCard
              key={card.id}
              postcard={card}
              isFavorite={favorites.includes(card.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectCard={onSelectCard}
            />
          ))}
        </div>
      </section>

      {/* 3. ❤️ Romantic Collection */}
      <section>
        {renderSectionHeader('Romantic Collection', <Heart className="w-6 h-6 text-[#9c2f3d]" />, '🌹 রোমান্টিক', 'গোলাপ, প্রেম ও হৃদয়ের না-বলা সব অনুভূতি')}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {romanticCards.map((card) => (
            <PostcardCard
              key={card.id}
              postcard={card}
              isFavorite={favorites.includes(card.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectCard={onSelectCard}
            />
          ))}
        </div>
      </section>

      {/* 4. 🌧️ Rainy Love Collection */}
      <section>
        {renderSectionHeader('Rainy Love Collection', <CloudRain className="w-6 h-6 text-[#95b8d1]" />, '🌧️ বৃষ্টি', 'ঝুম বৃষ্টি, কদম ফুল আর মেঘেদের ডাক')}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rainyCards.map((card) => (
            <PostcardCard
              key={card.id}
              postcard={card}
              isFavorite={favorites.includes(card.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectCard={onSelectCard}
            />
          ))}
        </div>
      </section>

      {/* 5. 💌 Vintage Letter Collection */}
      <section>
        {renderSectionHeader('Vintage Letter Collection', <Mail className="w-6 h-6 text-[#d4af37]" />, '💌 প্রেমপত্র', 'ঐতিহাসিক ডাকটিকিট ও হাতে লেখা প্রেমপত্র')}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vintageLetterCards.map((card) => (
            <PostcardCard
              key={card.id}
              postcard={card}
              isFavorite={favorites.includes(card.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectCard={onSelectCard}
            />
          ))}
        </div>
      </section>

    </div>
  );
};
