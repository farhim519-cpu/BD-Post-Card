import React from 'react';
import { PostcardTemplate, FontStyleCategory, VintageEffect, ExportFormat } from '../types';
import { VintageArtwork, PostalStamp } from './VintageArtwork';

export interface PostcardPreviewProps {
  postcard: PostcardTemplate;
  recipient: string;
  quoteText: string;
  sender: string;
  date: string;
  fontCategory: FontStyleCategory;
  fontSize: number;
  isBold: boolean;
  isItalic: boolean;
  textAlign: 'left' | 'center' | 'right';
  letterSpacing: number;
  lineHeight: number;
  textColor: string;
  textPosition: 'top' | 'middle' | 'bottom' | 'custom';
  vintageEffect: VintageEffect;
  exportFormat: ExportFormat;
  id?: string;
  innerRef?: React.RefObject<HTMLDivElement | null>;
}

export const getFontFamilyCSS = (category: FontStyleCategory): string => {
  switch (category) {
    case 'Elegant Bengali':
      return "'Noto Serif Bengali', serif";
    case 'Handwritten':
      return "'Caveat', 'Tiro Bangla', cursive";
    case 'Vintage Serif':
      return "'Playfair Display', 'Noto Serif Bengali', serif";
    case 'Typewriter':
      return "'Special Elite', 'Courier Prime', monospace";
    case 'Classic':
      return "'Hind Siliguri', sans-serif";
    case 'Calligraphy':
      return "'Tiro Bangla', 'Noto Serif Bengali', serif";
    case 'Old Newspaper':
      return "'Cinzel', 'Noto Serif Bengali', serif";
    default:
      return "'Noto Serif Bengali', serif";
  }
};

export const PostcardPreview: React.FC<PostcardPreviewProps> = ({
  postcard,
  recipient,
  quoteText,
  sender,
  date,
  fontCategory,
  fontSize,
  isBold,
  isItalic,
  textAlign,
  letterSpacing,
  lineHeight,
  textColor,
  textPosition,
  vintageEffect,
  exportFormat,
  id = "live-postcard-preview",
  innerRef,
}) => {
  // Format aspect ratio wrapper classes
  const getFormatDimensions = () => {
    switch (exportFormat) {
      case 'square':
        return 'aspect-square max-w-[580px]';
      case 'story':
      case 'whatsapp':
        return 'aspect-[9/16] max-w-[420px]';
      case 'facebook':
        return 'aspect-[1.91/1] max-w-[650px]';
      case 'postcard':
      default:
        return 'aspect-[3/2] max-w-[640px]';
    }
  };

  // Border styles
  const getBorderClasses = () => {
    switch (postcard.borderStyle) {
      case 'gold-filigree':
        return 'border-2 border-[#d4af37]/60 ring-4 ring-[#221811] ring-offset-2 ring-offset-[#c5a059]/40';
      case 'vintage-post':
        return 'border-4 border-dashed border-[#8a6842]/70';
      case 'double-thin':
        return 'border border-[#d4af37]/40 ring-1 ring-[#d4af37]/30 ring-offset-4 ring-offset-[#1b140e]';
      case 'postage-perforated':
        return 'border-2 border-dotted border-[#b48342]/80';
      case 'aged-stamp':
        return 'border-2 border-[#684b31] shadow-inner';
      case 'classic':
      default:
        return 'border border-[#c5a059]/50';
    }
  };

  // Filter effects
  const getFilterStyle = (): React.CSSProperties => {
    switch (vintageEffect) {
      case 'sepia':
        return { filter: 'sepia(0.55) contrast(1.05) brightness(0.95)' };
      case 'old-paper':
        return { filter: 'sepia(0.35) contrast(1.1) brightness(0.92) hue-rotate(-10deg)' };
      case 'faded':
        return { filter: 'contrast(0.85) brightness(1.1) saturate(0.7)' };
      case 'black-and-white':
        return { filter: 'grayscale(1) contrast(1.2) brightness(0.95)' };
      case 'film-grain':
        return { filter: 'contrast(1.15) brightness(0.95) saturate(1.1)' };
      case 'dust':
      case 'scratch':
        return { filter: 'contrast(1.2) brightness(0.93) sepia(0.2)' };
      case 'coffee-stain':
        return { filter: 'sepia(0.4) contrast(1.15) hue-rotate(-20deg)' };
      case 'warm-vintage':
        return { filter: 'sepia(0.25) saturate(1.2) contrast(1.05)' };
      case 'original':
      default:
        return {};
    }
  };

  // Vertical text position
  const getVerticalPositionClass = () => {
    switch (textPosition) {
      case 'top':
        return 'justify-start pt-6';
      case 'bottom':
        return 'justify-end pb-8';
      case 'middle':
      case 'custom':
      default:
        return 'justify-center';
    }
  };

  return (
    <div
      id={id}
      ref={innerRef}
      style={getFilterStyle()}
      className={`relative w-full mx-auto ${getFormatDimensions()} bg-[#18120d] text-[#fbf6ee] rounded-md overflow-hidden shadow-2xl transition-all duration-300 select-none`}
    >
      {/* Background Vintage Texture & Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.85) 100%), 
            repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 2px)`
        }}
      />

      {/* Subtle Dust / Film Grain Texture Simulation */}
      {(vintageEffect === 'film-grain' || vintageEffect === 'dust' || vintageEffect === 'scratch') && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(#fff 0.75px, transparent 0.75px)`,
            backgroundSize: '4px 4px'
          }}
        />
      )}

      {/* Coffee stain simulation */}
      {vintageEffect === 'coffee-stain' && (
        <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border-8 border-[#52331c]/25 blur-[1px] pointer-events-none transform rotate-12" />
      )}

      {/* Main Postcard Inner Container with Decorative Vintage Border */}
      <div className={`relative w-full h-full p-4 sm:p-6 flex flex-col justify-between ${getBorderClasses()} m-1.5 box-border`}>
        
        {/* Top Header Row: Recipient, Postmark & Stamp */}
        <div className="flex items-start justify-between gap-2 z-10">
          
          {/* Recipient Greeting (প্রাপক) */}
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs tracking-widest text-[#c5a059] uppercase font-serif flex items-center gap-1">
              <span className="inline-block w-3 h-[1px] bg-[#c5a059]"></span>
              TO / প্রাপক
            </span>
            <span 
              className="text-sm sm:text-lg text-[#fbf6ee] font-semibold tracking-wide drop-shadow-sm"
              style={{ fontFamily: "'Noto Serif Bengali', serif" }}
            >
              {recipient || 'প্রিয়তমা'}
            </span>
          </div>

          {/* Postal Markings & Stamp */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Vintage Postmark Seal */}
            <div className="hidden xs:flex flex-col items-center opacity-70">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#c5a059]/40 flex flex-col items-center justify-center text-[7px] text-[#c5a059] font-mono leading-none">
                <span className="font-bold">BD-POST</span>
                <span>★ ★ ★</span>
                <span>{date || '১৯৭৪'}</span>
              </div>
            </div>

            {/* Authentic Postage Stamp */}
            <div className="scale-75 sm:scale-90 origin-top-right">
              <PostalStamp type={postcard.stampType} accentColor={postcard.accentColor} />
            </div>
          </div>
        </div>

        {/* Central Content Area: Vintage Artwork & Quote */}
        <div className={`relative flex-1 flex flex-col ${getVerticalPositionClass()} my-2 sm:my-3 z-10 px-2 sm:px-6`}>
          
          {/* Background Illustration Artwork (subtle watermark or graphic) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25 overflow-hidden">
            <VintageArtwork 
              type={postcard.illustrationType} 
              className="w-full h-full object-contain filter drop-shadow-lg" 
              accentColor={postcard.accentColor} 
            />
          </div>

          {/* Quote Container */}
          <div className="relative z-10 text-center max-w-xl mx-auto w-full">
            {/* Vintage quote mark ornament */}
            <div className="text-center text-[#c5a059]/40 text-xl sm:text-2xl font-serif mb-1 leading-none select-none">
              ❝
            </div>

            <p
              className="transition-all duration-150 drop-shadow-md"
              style={{
                fontFamily: getFontFamilyCSS(fontCategory),
                fontSize: `${Math.max(16, fontSize)}px`,
                fontWeight: isBold ? 'bold' : 'normal',
                fontStyle: isItalic ? 'italic' : 'normal',
                textAlign: textAlign,
                letterSpacing: `${letterSpacing}px`,
                lineHeight: lineHeight,
                color: textColor || '#fbf6ee',
              }}
            >
              {quoteText || postcard.defaultQuote}
            </p>

            <div className="text-center text-[#c5a059]/40 text-xl sm:text-2xl font-serif mt-1 leading-none select-none">
              ❞
            </div>
          </div>
        </div>

        {/* Bottom Row: Date, Sender (প্রেরক) & Antique Filigree */}
        <div className="flex items-end justify-between gap-2 z-10 pt-2 border-t border-[#c5a059]/20 text-[11px] sm:text-xs">
          {/* Date */}
          <div className="flex items-center gap-1.5 text-[#c5a059]">
            <span className="text-xs">📅</span>
            <span className="font-serif italic tracking-wider">
              {date || '১২ কার্তিক, ঢাকা'}
            </span>
          </div>

          {/* Center decorative divider */}
          <div className="hidden sm:flex items-center gap-2 text-[#c5a059]/50 select-none">
            <span>❖</span>
            <span className="w-12 h-[1px] bg-[#c5a059]/30"></span>
            <span>BD Post Card</span>
            <span className="w-12 h-[1px] bg-[#c5a059]/30"></span>
            <span>❖</span>
          </div>

          {/* Sender (প্রেরক) */}
          <div className="flex flex-col items-end">
            <span className="text-[9px] sm:text-[10px] tracking-wider text-[#c5a059] uppercase font-serif">
              FROM / প্রেরক
            </span>
            <span 
              className="text-xs sm:text-sm text-[#fbf6ee] font-medium italic"
              style={{ fontFamily: getFontFamilyCSS(fontCategory) }}
            >
              {sender || 'ইতি, তোমার...'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
