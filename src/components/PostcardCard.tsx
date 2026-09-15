import React from 'react';
import { PostcardTemplate } from '../types';
import { VintageArtwork, PostalStamp } from './VintageArtwork';
import { Heart, Sparkles, Send } from 'lucide-react';

interface PostcardCardProps {
  postcard: PostcardTemplate;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectCard: (postcard: PostcardTemplate) => void;
}

export const PostcardCard: React.FC<PostcardCardProps> = ({
  postcard,
  isFavorite,
  onToggleFavorite,
  onSelectCard,
}) => {
  return (
    <div className="group relative bg-[#18110b] border border-[#c5a059]/30 hover:border-[#dfb76c] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between">
      
      {/* Top Artwork Area with Vintage Aspect Ratio & Subtle Filter */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#110c08] border-b border-[#c5a059]/20">
        <VintageArtwork
          type={postcard.illustrationType}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          accentColor={postcard.accentColor}
        />

        {/* Vintage vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#18110b] via-transparent to-black/40 pointer-events-none" />

        {/* Category Tag Badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span 
            className="inline-flex items-center px-2.5 py-1 rounded bg-[#160f0a]/90 backdrop-blur-xs text-[11px] font-medium text-[#dfb76c] border border-[#c5a059]/40 shadow-sm"
            style={{ fontFamily: "'Noto Serif Bengali', serif" }}
          >
            {postcard.category}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(postcard.id);
          }}
          aria-label={isFavorite ? "পছন্দ থেকে সরান" : "পছন্দে যোগ করুন"}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-xs transition-all ${
            isFavorite
              ? 'bg-[#9c2f3d] text-white shadow-md'
              : 'bg-[#160f0a]/80 text-[#d4af37] hover:text-white hover:bg-[#9c2f3d]/80 border border-[#c5a059]/30'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Mini Postal Stamp in bottom-right corner of artwork */}
        <div className="absolute bottom-2 right-2 scale-60 origin-bottom-right pointer-events-none opacity-90 drop-shadow-md">
          <PostalStamp type={postcard.stampType} accentColor={postcard.accentColor} />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Card Title */}
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <h3 
              className="text-base font-semibold text-[#fbf6ee] group-hover:text-[#dfb76c] transition-colors"
              style={{ fontFamily: "'Noto Serif Bengali', serif" }}
            >
              {postcard.titleBn}
            </h3>
            <span className="text-[10px] text-[#a89582] font-mono">
              #{postcard.id}
            </span>
          </div>

          {/* Quote Preview */}
          <p 
            className="text-xs text-[#d6c7b2] line-clamp-2 leading-relaxed italic border-l-2 border-[#c5a059]/40 pl-2.5 my-2"
            style={{ fontFamily: "'Noto Serif Bengali', serif" }}
          >
            “{postcard.defaultQuote}”
          </p>
        </div>

        {/* Action Button: ব্যবহার করুন */}
        <div className="pt-2 border-t border-[#c5a059]/15">
          <button
            onClick={() => onSelectCard(postcard)}
            className="w-full py-2.5 px-4 bg-[#231710] hover:bg-gradient-to-r hover:from-[#9c2f3d] hover:to-[#671d24] text-[#dfb76c] hover:text-[#fff8ee] text-xs font-semibold rounded border border-[#c5a059]/40 hover:border-[#dfb76c] transition-all flex items-center justify-center gap-1.5 group/btn cursor-pointer"
            style={{ fontFamily: "'Noto Serif Bengali', serif" }}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#dfb76c] group-hover/btn:rotate-12 transition-transform" />
            <span>ব্যবহার করুন</span>
          </button>
        </div>

      </div>

    </div>
  );
};
