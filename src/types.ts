/**
 * Shared Type Definitions for BD Post Card
 */

export type PostcardCategory = 
  | 'প্রেম'
  | 'রোমান্টিক'
  | 'বিরহ'
  | 'মিস করা'
  | 'বৃষ্টি'
  | 'রাতের অনুভূতি'
  | 'প্রেমপত্র'
  | 'প্রপোজ'
  | 'জন্মদিন'
  | 'Anniversary'
  | 'একতরফা প্রেম'
  | 'স্মৃতি'
  | 'Classic Vintage'
  | 'Bengali Vintage'
  | 'রবীন্দ্রনাথ ঠাকুর'
  | 'কাজী নজরুল ইসলাম'
  | 'মির্জা গালিব'
  | 'হুমায়ূন আহমেদ'
  | 'জীবনানন্দ দাশ'
  | 'সুনীল গঙ্গোপাধ্যায়'
  | 'রুদ্র মুহম্মদ শহিদুল্লাহ'
  | '❤️ প্রেম'
  | '🌹 রোমান্টিক'
  | '💔 বিরহ'
  | '🥺 মিস করা'
  | '🌧️ বৃষ্টি'
  | '🌙 রাতের অনুভূতি'
  | '💌 প্রেমপত্র'
  | '💍 প্রপোজ'
  | '🎂 জন্মদিন'
  | '💑 Anniversary'
  | '🖤 একতরফা প্রেম'
  | '🌸 স্মৃতি'
  | '🎞️ Classic Vintage'
  | '🇧🇩 Bengali Vintage'
  | '📜 রবীন্দ্রনাথ ঠাকুর'
  | '🪶 কাজী নজরুল ইসলাম'
  | '✒️ মির্জা গালিব'
  | '🌙 হুমায়ূন আহমেদ'
  | '🌾 জীবনানন্দ দাশ'
  | '🥀 সুনীল গঙ্গোপাধ্যায়'
  | '🍂 রুদ্র মুহম্মদ শহিদুল্লাহ';

export type FontStyleCategory =
  | 'Elegant Bengali'
  | 'Handwritten'
  | 'Vintage Serif'
  | 'Typewriter'
  | 'Classic'
  | 'Calligraphy'
  | 'Old Newspaper';

export type VintageEffect = 
  | 'original'
  | 'sepia'
  | 'old-paper'
  | 'faded'
  | 'black-and-white'
  | 'film-grain'
  | 'dust'
  | 'scratch'
  | 'coffee-stain'
  | 'warm-vintage';

export type ExportFormat = 
  | 'postcard'
  | 'square'
  | 'story'
  | 'facebook'
  | 'whatsapp';

export type StampType = 
  | 'dhaka-gpo' 
  | 'vintage-rose' 
  | 'love-seal' 
  | 'royal-mail' 
  | 'chittagong-post' 
  | 'wax-seal';

export type BorderStyle = 
  | 'classic'
  | 'gold-filigree'
  | 'vintage-post'
  | 'double-thin'
  | 'postage-perforated'
  | 'aged-stamp';

export interface PostcardTemplate {
  id: string;
  title: string;
  titleBn: string;
  category: PostcardCategory;
  collection?: 'popular' | 'new' | 'romantic' | 'rainy' | 'vintage-letter';
  defaultQuote: string;
  defaultRecipient?: string;
  defaultSender?: string;
  defaultDate?: string;
  textPosition: {
    x: number; // percentage from left
    y: number; // percentage from top
    align: 'left' | 'center' | 'right';
  };
  style: {
    fontFamily: FontStyleCategory;
    fontSize: number;
    textColor: string;
    bold?: boolean;
    italic?: boolean;
    letterSpacing?: number;
    lineHeight?: number;
  };
  borderStyle: BorderStyle;
  stampType: StampType;
  accentColor: string;
  bgPattern: string; // pattern identifier or gradient
  illustrationType: 
    | 'rainy-umbrella'
    | 'vintage-rose'
    | 'old-letter'
    | 'moonlight-night'
    | 'railway-station'
    | 'old-cafe'
    | 'vintage-house'
    | 'cinema-nostalgia'
    | 'boat-river'
    | 'sunset-warmth'
    | 'coffee-cup'
    | 'newspaper-retro'
    | 'gramophone-melody'
    | 'post-box'
    | 'lantern-night'
    | 'bengali-kadam';
  description: string;
}

export interface QuoteItem {
  id: string;
  text: string;
  category: PostcardCategory;
  author?: string;
  mood?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  quote: string;
  category: string;
  illustrationType: string;
  colorScheme: {
    bg: string;
    accent: string;
    text: string;
  };
  author?: string;
}

export interface CategoryInfo {
  id: string;
  name: PostcardCategory;
  icon: string;
  count: number;
  description: string;
}
