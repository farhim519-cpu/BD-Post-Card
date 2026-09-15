import React, { useState } from 'react';
import { VINTAGE_GALLERY } from '../data/gallery';
import { GalleryItem } from '../types';
import { VintageArtwork } from './VintageArtwork';
import { Download, Heart, Eye, Sparkles } from 'lucide-react';

interface VintageGalleryViewProps {
  favoriteGallery: string[];
  onToggleFavoriteGallery: (id: string) => void;
  onRequestDownload: (galleryItem: GalleryItem) => void;
}

export const VintageGalleryView: React.FC<VintageGalleryViewProps> = ({
  favoriteGallery,
  onToggleFavoriteGallery,
  onRequestDownload,
}) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest text-[#c5a059] font-serif block mb-1">
          CURATED ARTWORK ARCHIVE
        </span>
        <h1 
          className="text-3xl sm:text-4xl font-bold text-[#fbf6ee]"
          style={{ fontFamily: "'Noto Serif Bengali', serif" }}
        >
          🖼️ Vintage Quote Gallery
        </h1>
        <p className="text-sm text-[#d6c7b2] font-serif mt-2">
          প্রি-ডিজাইন করা স্থির ভিন্টেজ উক্তি চিত্রশালা। এগুলোতে কোনো সম্পাদনার প্রয়োজন নেই—সরাসরি দেখুন ও HD ফরম্যাটে সংগ্রহ করুন।
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {VINTAGE_GALLERY.map((item) => {
          const isFav = favoriteGallery.includes(item.id);

          return (
            <div
              key={item.id}
              className="bg-[#18110b] border border-[#c5a059]/30 hover:border-[#dfb76c] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group"
            >
              {/* Pre-designed Artwork Visual Frame */}
              <div 
                className="relative aspect-square w-full p-6 flex flex-col justify-between items-center text-center overflow-hidden"
                style={{ backgroundColor: item.colorScheme.bg }}
              >
                {/* Background Vintage Vignette & Texture */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.85) 100%)`
                  }}
                />

                {/* Corner filigree accents */}
                <div className="absolute top-2 left-2 text-[#c5a059]/40 text-xs select-none">❦</div>
                <div className="absolute top-2 right-2 text-[#c5a059]/40 text-xs select-none">❦</div>
                <div className="absolute bottom-2 left-2 text-[#c5a059]/40 text-xs select-none">❦</div>
                <div className="absolute bottom-2 right-2 text-[#c5a059]/40 text-xs select-none">❦</div>

                {/* Subtle Background Illustration */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                  <VintageArtwork 
                    type={item.illustrationType}
                    accentColor={item.colorScheme.accent}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Category pill */}
                <div className="relative z-10">
                  <span className="text-[10px] tracking-widest uppercase font-serif text-[#c5a059] px-2 py-0.5 rounded bg-black/40 border border-[#c5a059]/30">
                    {item.category}
                  </span>
                </div>

                {/* Core Pre-written Quote text */}
                <div className="relative z-10 my-auto px-2">
                  <div className="text-[#c5a059]/60 text-lg mb-1 select-none">❝</div>
                  <p 
                    className="text-sm sm:text-base font-semibold leading-relaxed tracking-wide drop-shadow-md"
                    style={{ 
                      color: item.colorScheme.text,
                      fontFamily: "'Noto Serif Bengali', 'Playfair Display', serif"
                    }}
                  >
                    {item.quote}
                  </p>
                  <div className="text-[#c5a059]/60 text-lg mt-1 select-none">❞</div>
                </div>

                {/* Author attribution */}
                <div className="relative z-10 text-[10px] text-[#c5a059] italic font-serif">
                  — {item.author || 'Vintage Archive'}
                </div>

                {/* Favorite button */}
                <button
                  onClick={() => onToggleFavoriteGallery(item.id)}
                  title="পছন্দে যোগ করুন"
                  className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-xs transition-all ${
                    isFav
                      ? 'bg-[#9c2f3d] text-white shadow-md'
                      : 'bg-[#18110b]/80 text-[#c5a059] hover:text-white hover:bg-[#9c2f3d]/80 border border-[#c5a059]/30'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Action Bar */}
              <div className="p-3.5 bg-[#140e0a] border-t border-[#c5a059]/20 flex items-center justify-between gap-2">
                <div className="text-xs font-serif text-[#d6c7b2] truncate font-medium">
                  {item.title}
                </div>

                <button
                  onClick={() => onRequestDownload(item)}
                  className="py-1.5 px-3 bg-[#241710] hover:bg-[#9c2f3d] text-[#dfb76c] hover:text-white text-xs font-serif font-medium rounded border border-[#c5a059]/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ডাউনলোড</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
