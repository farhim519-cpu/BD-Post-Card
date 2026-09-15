import React, { useState, useRef } from 'react';
import { 
  PostcardTemplate, 
  FontStyleCategory, 
  VintageEffect, 
  ExportFormat, 
  QuoteItem 
} from '../../types';
import { POSTCARD_TEMPLATES } from '../../data/postcards';
import { QUOTES } from '../../data/quotes';
import { CATEGORIES } from '../../data/categories';
import { PostcardPreview } from '../PostcardPreview';
import { VintageArtwork } from '../VintageArtwork';
import { 
  Download, 
  Sparkles, 
  Dices, 
  RotateCcw, 
  Type, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Bold, 
  Italic, 
  Sliders, 
  Palette, 
  Share2, 
  Maximize2,
  Check
} from 'lucide-react';

interface PostcardGeneratorProps {
  initialPostcard?: PostcardTemplate;
  initialQuote?: QuoteItem | null;
  onDownloadRequest: (
    previewElement: HTMLElement, 
    cardTitle: string, 
    format: 'png' | 'jpeg'
  ) => void;
}

export const PostcardGenerator: React.FC<PostcardGeneratorProps> = ({
  initialPostcard,
  initialQuote,
  onDownloadRequest,
}) => {
  // 1. Postcard selection state
  const [selectedPostcard, setSelectedPostcard] = useState<PostcardTemplate>(
    initialPostcard || POSTCARD_TEMPLATES[0]
  );
  const [cardCategoryFilter, setCardCategoryFilter] = useState<string | null>(null);
  const [quoteCategoryFilter, setQuoteCategoryFilter] = useState<string | null>(null);
  const [quoteSearch, setQuoteSearch] = useState<string>('');

  // 2. Text fields
  const [recipient, setRecipient] = useState<string>(
    selectedPostcard.defaultRecipient || 'প্রিয়তমা'
  );
  const [quoteText, setQuoteText] = useState<string>(
    initialQuote?.text || selectedPostcard.defaultQuote
  );
  const [sender, setSender] = useState<string>(
    selectedPostcard.defaultSender || 'ইতি, তোমার...'
  );
  const [date, setDate] = useState<string>(
    selectedPostcard.defaultDate || '১২ কার্তিক, ঢাকা'
  );
  const [customInputText, setCustomInputText] = useState<string>('');

  // 3. Text styling state
  const [fontCategory, setFontCategory] = useState<FontStyleCategory>(
    selectedPostcard.style.fontFamily || 'Elegant Bengali'
  );
  const [fontSize, setFontSize] = useState<number>(
    selectedPostcard.style.fontSize || 24
  );
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>(
    selectedPostcard.textPosition.align || 'center'
  );
  const [letterSpacing, setLetterSpacing] = useState<number>(0.5);
  const [lineHeight, setLineHeight] = useState<number>(1.6);
  const [textColor, setTextColor] = useState<string>('#fcf8ee');
  const [textPosition, setTextPosition] = useState<'top' | 'middle' | 'bottom' | 'custom'>('middle');

  // 4. Vintage effect & export format
  const [vintageEffect, setVintageEffect] = useState<VintageEffect>('warm-vintage');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('postcard');

  // Preview ref for html-to-image capture
  const previewRef = useRef<HTMLDivElement | null>(null);

  // Active subtab inside generator editor
  const [editorTab, setEditorTab] = useState<'template' | 'quote' | 'custom' | 'style' | 'effects'>('template');

  // Font choices
  const fontFamilies: FontStyleCategory[] = [
    'Elegant Bengali',
    'Handwritten',
    'Vintage Serif',
    'Typewriter',
    'Classic',
    'Calligraphy',
    'Old Newspaper',
  ];

  // Color palette
  const vintageColors = [
    { label: 'Warm Cream', hex: '#fcf8ee' },
    { label: 'Antique Gold', hex: '#dfb76c' },
    { label: 'Pale Parchment', hex: '#faedd7' },
    { label: 'Burgundy Rose', hex: '#e8b4b8' },
    { label: 'Soft Ivory', hex: '#ffffff' },
    { label: 'Sepia Brown', hex: '#d2b48c' },
    { label: 'Deep Charcoal', hex: '#2b231d' },
  ];

  // Vintage effects
  const vintageEffects: { id: VintageEffect; label: string }[] = [
    { id: 'original', label: 'Original' },
    { id: 'warm-vintage', label: 'Warm Vintage' },
    { id: 'sepia', label: 'Sepia' },
    { id: 'old-paper', label: 'Old Paper' },
    { id: 'faded', label: 'Faded' },
    { id: 'black-and-white', label: 'Black & White' },
    { id: 'film-grain', label: 'Film Grain' },
    { id: 'dust', label: 'Dust & Scratch' },
    { id: 'coffee-stain', label: 'Coffee Stain' },
  ];

  // Export formats
  const exportFormats: { id: ExportFormat; label: string; ratio: string }[] = [
    { id: 'postcard', label: 'Postcard', ratio: '3:2' },
    { id: 'square', label: 'Instagram Square', ratio: '1:1' },
    { id: 'story', label: 'Instagram Story', ratio: '9:16' },
    { id: 'facebook', label: 'Facebook Post', ratio: '1.91:1' },
    { id: 'whatsapp', label: 'WhatsApp Status', ratio: '9:16' },
  ];

  // Surprise Me randomizer
  const handleSurpriseMe = () => {
    const randomCard = POSTCARD_TEMPLATES[Math.floor(Math.random() * POSTCARD_TEMPLATES.length)];
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    const randomFont = fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
    const effects: VintageEffect[] = ['warm-vintage', 'sepia', 'old-paper', 'film-grain'];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];

    setSelectedPostcard(randomCard);
    setQuoteText(randomQuote.text);
    setFontCategory(randomFont);
    setVintageEffect(randomEffect);
    if (randomCard.defaultRecipient) setRecipient(randomCard.defaultRecipient);
    if (randomCard.defaultSender) setSender(randomCard.defaultSender);
  };

  // Reset text style
  const handleResetStyle = () => {
    setFontCategory(selectedPostcard.style.fontFamily || 'Elegant Bengali');
    setFontSize(selectedPostcard.style.fontSize || 24);
    setIsBold(false);
    setIsItalic(false);
    setTextAlign('center');
    setLetterSpacing(0.5);
    setLineHeight(1.6);
    setTextColor('#fcf8ee');
    setTextPosition('middle');
  };

  // Apply custom text
  const handleApplyCustomText = () => {
    if (customInputText.trim()) {
      setQuoteText(customInputText.trim());
      setCustomInputText('');
    }
  };

  // Switch postcard template and preserve or adopt styles
  const handleSelectTemplate = (template: PostcardTemplate) => {
    setSelectedPostcard(template);
    setQuoteText(template.defaultQuote);
    if (template.defaultRecipient) setRecipient(template.defaultRecipient);
    if (template.defaultSender) setSender(template.defaultSender);
    if (template.defaultDate) setDate(template.defaultDate);
    setFontCategory(template.style.fontFamily);
    setFontSize(template.style.fontSize);
  };

  // Filtered postcard thumbnails
  const filteredTemplates = cardCategoryFilter
    ? POSTCARD_TEMPLATES.filter((p) => p.category === cardCategoryFilter)
    : POSTCARD_TEMPLATES;

  // Filtered quotes list
  const filteredQuotesList = React.useMemo(() => {
    return QUOTES.filter((q) => {
      const matchCat = quoteCategoryFilter ? q.category === quoteCategoryFilter : true;
      const query = quoteSearch.trim().toLowerCase();
      const matchQuery = !query
        ? true
        : q.text.toLowerCase().includes(query) ||
          (q.author && q.author.toLowerCase().includes(query)) ||
          q.category.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });
  }, [quoteCategoryFilter, quoteSearch]);

  // Trigger HD Download via DownloadGateModal
  const triggerDownload = () => {
    const el = document.getElementById('generator-live-postcard-preview');
    if (el) {
      onDownloadRequest(el, selectedPostcard.titleBn, 'png');
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Title & Tagline */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241710] border border-[#c5a059]/30 text-xs font-serif text-[#dfb76c] mb-2">
          <span>💌 Vintage Postcard Generator</span>
        </div>
        <h1 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#fbf6ee]"
          style={{ fontFamily: "'Noto Serif Bengali', serif" }}
        >
          পোস্টকার্ড তৈরি করুন
        </h1>
        <p className="text-xs sm:text-sm text-[#d6c7b2] font-serif mt-1">
          ডিজাইন পছন্দ করুন → উক্তি নির্বাচন বা লিখুন → কাস্টমাইজ করুন → প্রিভিউ দেখে HD ডাউনলোড করুন
        </p>
      </div>

      {/* Main Grid: Preview on Left/Top + Control Panel on Right/Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: LIVE POSTCARD PREVIEW (Sticky on desktop) */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
          
          <div className="bg-[#140e09] border border-[#c5a059]/40 rounded-lg p-4 sm:p-6 shadow-2xl">
            
            {/* Top Preview Controls Bar */}
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#c5a059]/20 text-xs">
              <span className="font-serif text-[#dfb76c] flex items-center gap-1.5 font-medium">
                <span>👁️ লাইভ পোস্টকার্ড প্রিভিউ</span>
              </span>

              {/* Format pill indicator */}
              <span className="px-2.5 py-0.5 rounded bg-[#221610] text-[#c5a059] font-mono text-[10px] border border-[#c5a059]/30 uppercase">
                {exportFormat} ({exportFormats.find(f => f.id === exportFormat)?.ratio})
              </span>
            </div>

            {/* Postcard Preview Frame */}
            <div className="flex items-center justify-center p-2 sm:p-4 bg-[#0d0906] rounded border border-[#c5a059]/20 overflow-hidden min-h-[320px]">
              <PostcardPreview
                id="generator-live-postcard-preview"
                postcard={selectedPostcard}
                recipient={recipient}
                quoteText={quoteText}
                sender={sender}
                date={date}
                fontCategory={fontCategory}
                fontSize={fontSize}
                isBold={isBold}
                isItalic={isItalic}
                textAlign={textAlign}
                letterSpacing={letterSpacing}
                lineHeight={lineHeight}
                textColor={textColor}
                textPosition={textPosition}
                vintageEffect={vintageEffect}
                exportFormat={exportFormat}
              />
            </div>

            {/* Format Aspect Ratio Selector Pills */}
            <div className="mt-4 pt-3 border-t border-[#c5a059]/20">
              <span className="text-[11px] font-serif text-[#a89582] block mb-2">
                এক্সপোর্ট অনুপাত / ফরম্যাট নির্বাচন করুন:
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-xs font-serif">
                {exportFormats.map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setExportFormat(fmt.id)}
                    className={`py-1.5 px-2 rounded text-[11px] transition-all truncate text-center ${
                      exportFormat === fmt.id
                        ? 'bg-[#c5a059] text-[#140e0a] font-bold shadow'
                        : 'bg-[#1e140d] text-[#d6c7b2] border border-[#c5a059]/20 hover:border-[#c5a059]'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Download Button */}
            <div className="mt-5">
              <button
                id="generator-download-cta-btn"
                onClick={triggerDownload}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-[#9c2f3d] via-[#b23647] to-[#7d242c] hover:from-[#b23647] hover:to-[#9c2f3d] text-[#fff8ee] text-base font-bold rounded shadow-xl border border-[#d4af37]/60 transition-all transform active:scale-95 flex items-center justify-center gap-2.5 font-serif cursor-pointer"
              >
                <Download className="w-5 h-5 text-[#dfb76c]" />
                <span>⬇️ HD পোস্টকার্ড ডাউনলোড করুন</span>
              </button>
              <p className="text-[10px] text-center text-[#c5a059]/70 font-serif mt-2">
                * ডাউনলোড করার আগে ৮-সেকেন্ডের স্পনসর পেজ গেট সম্পন্ন হবে
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: STEP CONTROLS & EDITORS */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Step Selector Navigation Tabs */}
          <div className="bg-[#18110b] p-1.5 rounded-lg border border-[#c5a059]/30 flex flex-wrap gap-1 text-xs sm:text-sm font-serif">
            <button
              onClick={() => setEditorTab('template')}
              className={`flex-1 py-2 px-3 rounded text-center transition-all flex items-center justify-center gap-1.5 ${
                editorTab === 'template'
                  ? 'bg-[#c5a059] text-[#140e0a] font-bold shadow'
                  : 'text-[#d6c7b2] hover:text-[#fbf6ee]'
              }`}
            >
              <span>১. ডিজাইন</span>
            </button>

            <button
              onClick={() => setEditorTab('quote')}
              className={`flex-1 py-2 px-3 rounded text-center transition-all flex items-center justify-center gap-1.5 ${
                editorTab === 'quote'
                  ? 'bg-[#c5a059] text-[#140e0a] font-bold shadow'
                  : 'text-[#d6c7b2] hover:text-[#fbf6ee]'
              }`}
            >
              <span>২. উক্তি</span>
            </button>

            <button
              onClick={() => setEditorTab('custom')}
              className={`flex-1 py-2 px-3 rounded text-center transition-all flex items-center justify-center gap-1.5 ${
                editorTab === 'custom'
                  ? 'bg-[#c5a059] text-[#140e0a] font-bold shadow'
                  : 'text-[#d6c7b2] hover:text-[#fbf6ee]'
              }`}
            >
              <span>✍️ নিজের লেখা</span>
            </button>

            <button
              onClick={() => setEditorTab('style')}
              className={`flex-1 py-2 px-3 rounded text-center transition-all flex items-center justify-center gap-1.5 ${
                editorTab === 'style'
                  ? 'bg-[#c5a059] text-[#140e0a] font-bold shadow'
                  : 'text-[#d6c7b2] hover:text-[#fbf6ee]'
              }`}
            >
              <span>ফন্ট ও স্টাইল</span>
            </button>

            <button
              onClick={() => setEditorTab('effects')}
              className={`flex-1 py-2 px-3 rounded text-center transition-all flex items-center justify-center gap-1.5 ${
                editorTab === 'effects'
                  ? 'bg-[#c5a059] text-[#140e0a] font-bold shadow'
                  : 'text-[#d6c7b2] hover:text-[#fbf6ee]'
              }`}
            >
              <span>ইফেক্ট</span>
            </button>
          </div>

          {/* Quick Surprise Me Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSurpriseMe}
              className="py-1.5 px-3 bg-[#241710] hover:bg-[#342217] border border-[#c5a059]/40 rounded text-xs text-[#dfb76c] font-serif flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <Dices className="w-4 h-4 text-[#dfb76c]" />
              <span>🎲 Surprise Me (এলোমেলো নির্বাচন)</span>
            </button>
          </div>

          {/* TAB 1: SELECT POSTCARD */}
          {editorTab === 'template' && (
            <div className="bg-[#18110b] border border-[#c5a059]/30 rounded-lg p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-2">
                <h2 className="text-base font-bold text-[#fbf6ee] font-serif">
                  ১. পোস্টকার্ড নির্বাচন করুন
                </h2>
                <span className="text-xs text-[#c5a059] font-serif">
                  নির্বাচিত: {selectedPostcard.titleBn}
                </span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-serif no-scrollbar">
                <button
                  onClick={() => setCardCategoryFilter(null)}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap ${
                    cardCategoryFilter === null
                      ? 'bg-[#c5a059] text-[#120c08] font-bold'
                      : 'bg-[#221610] text-[#d6c7b2] border border-[#c5a059]/20'
                  }`}
                >
                  সবগুলো ({POSTCARD_TEMPLATES.length})
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCardCategoryFilter(cardCategoryFilter === cat.name ? null : cat.name)}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap flex items-center gap-1 ${
                      cardCategoryFilter === cat.name
                        ? 'bg-[#9c2f3d] text-white font-bold'
                        : 'bg-[#221610] text-[#d6c7b2] border border-[#c5a059]/20'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name.replace(/^[^\s]+\s/, '')}</span>
                  </button>
                ))}
              </div>

              {/* Postcard Thumbnails Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-1 no-scrollbar">
                {filteredTemplates.map((template) => {
                  const isSelected = selectedPostcard.id === template.id;
                  return (
                    <div
                      key={template.id}
                      onClick={() => handleSelectTemplate(template)}
                      className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#dfb76c] shadow-lg ring-2 ring-[#dfb76c]/40 scale-[1.02]'
                          : 'border-[#c5a059]/30 hover:border-[#c5a059]/80 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="aspect-[3/2] w-full bg-[#120c08]">
                        <VintageArtwork
                          type={template.illustrationType}
                          className="w-full h-full object-cover"
                          accentColor={template.accentColor}
                        />
                      </div>
                      <div className="p-2 bg-[#1b120c] text-[11px] font-serif truncate">
                        <span className="font-semibold text-[#fbf6ee] block truncate">
                          {template.titleBn}
                        </span>
                        <span className="text-[10px] text-[#c5a059] block truncate">
                          {template.category}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#c5a059] text-[#120c08] flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: SELECT QUOTE */}
          {editorTab === 'quote' && (
            <div className="bg-[#18110b] border border-[#c5a059]/30 rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-2">
                <h2 className="text-base font-bold text-[#fbf6ee] font-serif">
                  ২. উক্তি নির্বাচন করুন
                </h2>
                <span className="text-xs text-[#dfb76c] font-serif">
                  মোট {filteredQuotesList.length} টি উক্তি
                </span>
              </div>

              {/* Search Box */}
              <div className="relative">
                <input
                  type="text"
                  value={quoteSearch}
                  onChange={(e) => setQuoteSearch(e.target.value)}
                  placeholder="উক্তি বা লেখক খুঁজুন (রবীন্দ্রনাথ, নজরুল, গালিব, হুমায়ূন...)"
                  className="w-full bg-[#120c08] border border-[#c5a059]/30 focus:border-[#dfb76c] rounded p-2 text-xs text-[#fbf6ee] font-serif outline-none"
                />
              </div>

              {/* Quote Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-serif no-scrollbar">
                <button
                  onClick={() => setQuoteCategoryFilter(null)}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap ${
                    quoteCategoryFilter === null
                      ? 'bg-[#c5a059] text-[#120c08] font-bold'
                      : 'bg-[#221610] text-[#d6c7b2] border border-[#c5a059]/20'
                  }`}
                >
                  সবগুলো ({QUOTES.length})
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setQuoteCategoryFilter(quoteCategoryFilter === cat.name ? null : cat.name)}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap flex items-center gap-1 ${
                      quoteCategoryFilter === cat.name
                        ? 'bg-[#9c2f3d] text-white font-bold'
                        : 'bg-[#221610] text-[#d6c7b2] border border-[#c5a059]/20'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name.replace(/^[^\s]+\s/, '')}</span>
                  </button>
                ))}
              </div>

              {/* Quotes List */}
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1 no-scrollbar">
                {filteredQuotesList.slice(0, 50).map((q) => {
                  const isCurrent = quoteText === q.text;
                  return (
                    <div
                      key={q.id}
                      className={`p-3.5 rounded-lg border transition-all ${
                        isCurrent
                          ? 'bg-[#251811] border-[#dfb76c] ring-1 ring-[#dfb76c]/40'
                          : 'bg-[#1b120c] border-[#c5a059]/25 hover:border-[#c5a059]/60'
                      }`}
                    >
                      <p className="text-xs sm:text-sm text-[#fbf6ee] font-serif italic leading-relaxed">
                        “{q.text}”
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#c5a059]/15">
                        <span className="text-[10px] text-[#c5a059] font-serif">
                          {q.category} {q.author ? `• ${q.author}` : ''}
                        </span>
                        <button
                          onClick={() => setQuoteText(q.text)}
                          className={`py-1 px-2.5 rounded text-xs font-serif font-medium transition-colors ${
                            isCurrent
                              ? 'bg-[#c5a059] text-[#140e0a] font-bold'
                              : 'bg-[#251710] hover:bg-[#9c2f3d] text-[#dfb76c] hover:text-white border border-[#c5a059]/30'
                          }`}
                        >
                          {isCurrent ? '✓ ব্যবহৃত হচ্ছে' : 'ব্যবহার করুন'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: WRITE YOUR OWN */}
          {editorTab === 'custom' && (
            <div className="bg-[#18110b] border border-[#c5a059]/30 rounded-lg p-5 space-y-4">
              <div className="border-b border-[#c5a059]/20 pb-2">
                <h2 className="text-base font-bold text-[#fbf6ee] font-serif">
                  ✍️ অথবা নিজের লেখা লিখুন
                </h2>
                <p className="text-xs text-[#a89582] font-serif mt-0.5">
                  প্রাপক, মূল বার্তা, প্রেরকের নাম ও তারিখ আপনার মতো সাজান।
                </p>
              </div>

              {/* Field: প্রাপক */}
              <div className="space-y-1">
                <label className="text-xs font-serif text-[#dfb76c] block">
                  প্রাপক (To)
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="যেমন: প্রিয়তমা, আমার নদী..."
                  className="w-full bg-[#120c08] border border-[#c5a059]/30 focus:border-[#dfb76c] rounded p-2.5 text-sm text-[#fbf6ee] font-serif outline-none"
                />
              </div>

              {/* Field: মূল লেখা */}
              <div className="space-y-1">
                <label className="text-xs font-serif text-[#dfb76c] block">
                  মূল বার্তা / উক্তি
                </label>
                <textarea
                  rows={4}
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  placeholder="এখানে আপনার নিজের লেখা লিখুন..."
                  className="w-full bg-[#120c08] border border-[#c5a059]/30 focus:border-[#dfb76c] rounded p-2.5 text-sm text-[#fbf6ee] font-serif outline-none leading-relaxed"
                />
              </div>

              {/* Field: প্রেরক & তারিখ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-serif text-[#dfb76c] block">
                    প্রেরক (From)
                  </label>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    placeholder="যেমন: ইতি, তোমার মেঘপিয়ন..."
                    className="w-full bg-[#120c08] border border-[#c5a059]/30 focus:border-[#dfb76c] rounded p-2.5 text-sm text-[#fbf6ee] font-serif outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-serif text-[#dfb76c] block">
                    তারিখ (Date - Optional)
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="যেমন: ১২ কার্তিক, ঢাকা"
                    className="w-full bg-[#120c08] border border-[#c5a059]/30 focus:border-[#dfb76c] rounded p-2.5 text-sm text-[#fbf6ee] font-serif outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TEXT CUSTOMIZATION */}
          {editorTab === 'style' && (
            <div className="bg-[#18110b] border border-[#c5a059]/30 rounded-lg p-5 space-y-5">
              <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-2">
                <h2 className="text-base font-bold text-[#fbf6ee] font-serif">
                  টেক্সট কাস্টমাইজেশন
                </h2>
                <button
                  onClick={handleResetStyle}
                  className="text-xs text-[#c5a059] hover:text-[#dfb76c] font-serif flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Text Style</span>
                </button>
              </div>

              {/* Font Family Selection */}
              <div className="space-y-2">
                <label className="text-xs font-serif text-[#dfb76c] block">
                  ফন্ট স্টাইল (Font Family)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {fontFamilies.map((font) => (
                    <button
                      key={font}
                      onClick={() => setFontCategory(font)}
                      className={`p-2 rounded text-xs border transition-all text-center ${
                        fontCategory === font
                          ? 'bg-[#c5a059] text-[#140e0a] font-bold border-[#d4af37]'
                          : 'bg-[#1b120c] text-[#d6c7b2] border-[#c5a059]/30 hover:border-[#c5a059]'
                      }`}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-serif">
                  <span className="text-[#dfb76c]">ফন্ট সাইজ (Font Size)</span>
                  <span className="text-[#fbf6ee] font-mono">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min={16}
                  max={36}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-[#c5a059] cursor-pointer"
                />
              </div>

              {/* Formatting buttons: Bold, Italic, Alignment */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-serif text-[#dfb76c] block">
                    টেক্সট ফরম্যাট
                  </label>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setIsBold(!isBold)}
                      className={`p-2 flex-1 rounded border flex items-center justify-center ${
                        isBold
                          ? 'bg-[#c5a059] text-[#120c08] border-[#dfb76c]'
                          : 'bg-[#1c130d] text-[#d6c7b2] border-[#c5a059]/30'
                      }`}
                      title="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsItalic(!isItalic)}
                      className={`p-2 flex-1 rounded border flex items-center justify-center ${
                        isItalic
                          ? 'bg-[#c5a059] text-[#120c08] border-[#dfb76c]'
                          : 'bg-[#1c130d] text-[#d6c7b2] border-[#c5a059]/30'
                      }`}
                      title="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-serif text-[#dfb76c] block">
                    অ্যালাইনমেন্ট
                  </label>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setTextAlign('left')}
                      className={`p-2 flex-1 rounded border flex items-center justify-center ${
                        textAlign === 'left'
                          ? 'bg-[#c5a059] text-[#120c08] border-[#dfb76c]'
                          : 'bg-[#1c130d] text-[#d6c7b2] border-[#c5a059]/30'
                      }`}
                    >
                      <AlignLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setTextAlign('center')}
                      className={`p-2 flex-1 rounded border flex items-center justify-center ${
                        textAlign === 'center'
                          ? 'bg-[#c5a059] text-[#120c08] border-[#dfb76c]'
                          : 'bg-[#1c130d] text-[#d6c7b2] border-[#c5a059]/30'
                      }`}
                    >
                      <AlignCenter className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setTextAlign('right')}
                      className={`p-2 flex-1 rounded border flex items-center justify-center ${
                        textAlign === 'right'
                          ? 'bg-[#c5a059] text-[#120c08] border-[#dfb76c]'
                          : 'bg-[#1c130d] text-[#d6c7b2] border-[#c5a059]/30'
                      }`}
                    >
                      <AlignRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Text Position (Vertical) */}
              <div className="space-y-1">
                <label className="text-xs font-serif text-[#dfb76c] block">
                  টেক্সটের অবস্থান (Text Position)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['top', 'middle', 'bottom'] as const).map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setTextPosition(pos)}
                      className={`py-1.5 rounded text-xs capitalize font-serif border ${
                        textPosition === pos
                          ? 'bg-[#c5a059] text-[#140e0a] font-bold border-[#dfb76c]'
                          : 'bg-[#1c130d] text-[#d6c7b2] border-[#c5a059]/30'
                      }`}
                    >
                      {pos === 'top' ? 'উপরে' : pos === 'middle' ? 'মাঝামাঝি' : 'নিচে'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Color Palette */}
              <div className="space-y-1">
                <label className="text-xs font-serif text-[#dfb76c] block">
                  টেক্সট রঙ (Text Color)
                </label>
                <div className="flex flex-wrap gap-2 items-center">
                  {vintageColors.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setTextColor(c.hex)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        textColor === c.hex ? 'scale-115 border-[#dfb76c] ring-2 ring-white/50' : 'border-black/50'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              {/* Sliders: Letter Spacing & Line Height */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-serif">
                    <span className="text-[#dfb76c]">অক্ষরের ফাঁক</span>
                    <span className="text-[#fbf6ee] font-mono">{letterSpacing}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={3}
                    step={0.2}
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(Number(e.target.value))}
                    className="w-full accent-[#c5a059] cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-serif">
                    <span className="text-[#dfb76c]">লাইনের দূরত্ব</span>
                    <span className="text-[#fbf6ee] font-mono">{lineHeight}</span>
                  </div>
                  <input
                    type="range"
                    min={1.2}
                    max={2.2}
                    step={0.1}
                    value={lineHeight}
                    onChange={(e) => setLineHeight(Number(e.target.value))}
                    className="w-full accent-[#c5a059] cursor-pointer"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: VINTAGE EFFECTS */}
          {editorTab === 'effects' && (
            <div className="bg-[#18110b] border border-[#c5a059]/30 rounded-lg p-5 space-y-4">
              <div className="border-b border-[#c5a059]/20 pb-2">
                <h2 className="text-base font-bold text-[#fbf6ee] font-serif">
                  ভিন্টেজ ফিল্টার ও ইফেক্ট
                </h2>
                <p className="text-xs text-[#a89582] font-serif mt-0.5">
                  পুরনো কাগজের আবহ ও চলচ্চিত্রের মতো অনুভূতি যোগ করুন।
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {vintageEffects.map((eff) => {
                  const isSelected = vintageEffect === eff.id;
                  return (
                    <button
                      key={eff.id}
                      onClick={() => setVintageEffect(eff.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-[#281812] border-[#dfb76c] ring-1 ring-[#dfb76c]/40'
                          : 'bg-[#1b120c] border-[#c5a059]/30 hover:border-[#c5a059]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-serif text-[#fbf6ee] font-medium">
                          {eff.label}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#dfb76c]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Mobile Sticky Bottom Download Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#120c08]/95 backdrop-blur-md border-t border-[#c5a059]/30 p-3 flex items-center justify-between gap-3 shadow-2xl">
        <div className="min-w-0">
          <span className="text-xs font-serif font-bold text-[#fbf6ee] block truncate">
            {selectedPostcard.titleBn}
          </span>
          <span className="text-[10px] text-[#c5a059] block -mt-0.5 font-mono">
            {exportFormat.toUpperCase()} HD
          </span>
        </div>

        <button
          onClick={triggerDownload}
          className="py-2.5 px-5 bg-gradient-to-r from-[#9c2f3d] to-[#671d24] text-[#fff8ee] text-xs font-bold rounded shadow-lg border border-[#d4af37]/60 flex items-center gap-1.5 font-serif shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#dfb76c]" />
          <span>ডাউনলোড করুন</span>
        </button>
      </div>

    </div>
  );
};
