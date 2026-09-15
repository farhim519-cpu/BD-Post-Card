import React, { useState, useEffect } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import { PostcardTemplate, QuoteItem, GalleryItem } from './types';
import { POSTCARD_TEMPLATES } from './data/postcards';
import { QUOTES } from './data/quotes';
import { VINTAGE_GALLERY } from './data/gallery';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedSections } from './components/FeaturedSections';
import { PostcardLibrary } from './components/PostcardLibrary';
import { QuoteLibrary } from './components/QuoteLibrary';
import { VintageGalleryView } from './components/VintageGalleryView';
import { FavoritesView } from './components/FavoritesView';
import { PostcardGenerator } from './components/PostcardGenerator/PostcardGenerator';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { DownloadGateModal } from './components/DownloadGateModal';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation state
  const [currentView, setCurrentView] = useState<string>('home');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Selected item states for generator
  const [selectedPostcard, setSelectedPostcard] = useState<PostcardTemplate>(POSTCARD_TEMPLATES[0]);
  const [selectedQuote, setSelectedQuote] = useState<QuoteItem | null>(null);

  // Search Modal state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Download Sponsor Gate state
  const [isGateOpen, setIsGateOpen] = useState<boolean>(false);
  const [pendingDownload, setPendingDownload] = useState<{
    element?: HTMLElement;
    filename: string;
    format: 'png' | 'jpeg';
    isGallery?: boolean;
    galleryItem?: GalleryItem;
  } | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // LocalStorage favorites
  const [favoritePostcards, setFavoritePostcards] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bd_fav_postcards');
      return saved ? JSON.parse(saved) : ['vp001', 'vp005'];
    } catch {
      return ['vp001', 'vp005'];
    }
  });

  const [favoriteQuotes, setFavoriteQuotes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bd_fav_quotes');
      return saved ? JSON.parse(saved) : ['q001', 'q004'];
    } catch {
      return ['q001', 'q004'];
    }
  });

  const [favoriteGallery, setFavoriteGallery] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bd_fav_gallery');
      return saved ? JSON.parse(saved) : ['gal001'];
    } catch {
      return ['gal001'];
    }
  });

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bd_fav_postcards', JSON.stringify(favoritePostcards));
    } catch (e) {
      console.error(e);
    }
  }, [favoritePostcards]);

  useEffect(() => {
    try {
      localStorage.setItem('bd_fav_quotes', JSON.stringify(favoriteQuotes));
    } catch (e) {
      console.error(e);
    }
  }, [favoriteQuotes]);

  useEffect(() => {
    try {
      localStorage.setItem('bd_fav_gallery', JSON.stringify(favoriteGallery));
    } catch (e) {
      console.error(e);
    }
  }, [favoriteGallery]);

  // Global keyboard shortcut to open search (Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Favorite toggle helpers
  const handleToggleFavoritePostcard = (id: string) => {
    setFavoritePostcards((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? 'পছন্দ তালিকা থেকে সরানো হয়েছে' : 'পছন্দ তালিকায় যুক্ত করা হয়েছে');
      return updated;
    });
  };

  const handleToggleFavoriteQuote = (id: string) => {
    setFavoriteQuotes((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? 'উক্তিটি পছন্দ তালিকা থেকে সরানো হয়েছে' : 'উক্তিটি পছন্দ তালিকায় যোগ করা হয়েছে');
      return updated;
    });
  };

  const handleToggleFavoriteGallery = (id: string) => {
    setFavoriteGallery((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? 'গ্যালারি আর্ট পছন্দ থেকে সরানো হয়েছে' : 'গ্যালারি আর্ট পছন্দ তালিকায় যোগ হয়েছে');
      return updated;
    });
  };

  // Navigations with optional category filter
  const handleNavigate = (view: string, filter?: string) => {
    setCurrentView(view);
    if (filter !== undefined) {
      setCategoryFilter(filter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select postcard from card or library -> Open Generator
  const handleSelectPostcardForCreate = (postcard: PostcardTemplate) => {
    setSelectedPostcard(postcard);
    setCurrentView('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select quote -> Open Generator
  const handleSelectQuoteForCreate = (quote: QuoteItem) => {
    setSelectedQuote(quote);
    setCurrentView('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Surprise Me Handler
  const handleSurpriseMe = () => {
    const randomCard = POSTCARD_TEMPLATES[Math.floor(Math.random() * POSTCARD_TEMPLATES.length)];
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setSelectedPostcard(randomCard);
    setSelectedQuote(randomQuote);
    setCurrentView('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('🎲 এলোমেলো রোমান্টিক কম্বিনেশন তৈরি হয়েছে!');
  };

  // Trigger Download Gate for generator
  const handleRequestDownload = (
    previewElement: HTMLElement,
    cardTitle: string,
    format: 'png' | 'jpeg' = 'png'
  ) => {
    setPendingDownload({
      element: previewElement,
      filename: `${cardTitle.replace(/\s+/g, '-').toLowerCase()}-bdpostcard`,
      format,
    });
    setIsGateOpen(true);
  };

  // Trigger Download Gate for gallery
  const handleRequestGalleryDownload = (galleryItem: GalleryItem) => {
    setPendingDownload({
      filename: `${galleryItem.title.replace(/\s+/g, '-').toLowerCase()}-vintage-quote`,
      format: 'png',
      isGallery: true,
      galleryItem,
    });
    setIsGateOpen(true);
  };

  // Execute Actual Download when 8-second sponsor timer finishes
  const handleExecuteDownload = async (chosenFormat?: 'png' | 'jpeg') => {
    if (!pendingDownload) return;
    setIsDownloading(true);

    const exportFormat = chosenFormat || pendingDownload.format || 'png';

    try {
      if (pendingDownload.element) {
        // Ensure browser fonts are fully rendered before rasterization
        if (typeof document !== 'undefined' && 'fonts' in document) {
          try {
            await (document as any).fonts.ready;
          } catch (_) {
            // Ignore font loading errors if any
          }
        }

        // High-res capture using html-to-image with skipFonts: true to prevent cross-origin CSSStyleSheet access errors
        const exportOptions = {
          pixelRatio: 2.5,
          skipFonts: true,
          cacheBust: true,
        };

        const dataUrl =
          exportFormat === 'jpeg'
            ? await toJpeg(pendingDownload.element, { ...exportOptions, quality: 0.95 })
            : await toPng(pendingDownload.element, { ...exportOptions, quality: 1.0 });

        const link = document.createElement('a');
        link.download = `${pendingDownload.filename}.${exportFormat}`;
        link.href = dataUrl;
        link.click();
      } else if (pendingDownload.isGallery && pendingDownload.galleryItem) {
        // Download pre-designed gallery artwork via SVG Canvas
        const item = pendingDownload.galleryItem;
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 1200;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Fill background
          ctx.fillStyle = item.colorScheme.bg;
          ctx.fillRect(0, 0, 1200, 1200);

          // Vintage borders
          ctx.strokeStyle = item.colorScheme.accent;
          ctx.lineWidth = 8;
          ctx.strokeRect(40, 40, 1120, 1120);

          ctx.lineWidth = 2;
          ctx.strokeRect(55, 55, 1090, 1090);

          // Quote text
          ctx.fillStyle = item.colorScheme.text;
          ctx.font = 'bold 44px "Noto Serif Bengali", serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Word wrap quote
          const words = item.quote.split(' ');
          const lines: string[] = [];
          let currentLine = words[0];

          for (let i = 1; i < words.length; i++) {
            const width = ctx.measureText(currentLine + ' ' + words[i]).width;
            if (width < 900) {
              currentLine += ' ' + words[i];
            } else {
              lines.push(currentLine);
              currentLine = words[i];
            }
          }
          lines.push(currentLine);

          const startY = 600 - (lines.length * 60) / 2;
          lines.forEach((line, idx) => {
            ctx.fillText(line, 600, startY + idx * 60);
          });

          // Brand tagline at bottom
          ctx.fillStyle = item.colorScheme.accent;
          ctx.font = '24px "Noto Serif Bengali", serif';
          ctx.fillText('BD Post Card • পুরনো দিনের অনুভূতি', 600, 1050);

          const mimeType = exportFormat === 'jpeg' ? 'image/jpeg' : 'image/png';
          const dataUrl = canvas.toDataURL(mimeType, exportFormat === 'jpeg' ? 0.95 : 1.0);
          const link = document.createElement('a');
          link.download = `${pendingDownload.filename}.${exportFormat}`;
          link.href = dataUrl;
          link.click();
        }
      }

      showToast('💌 পোস্টকার্ড সফলভাবে ডাউনলোড হয়েছে!');
    } catch (err) {
      console.error('Download error:', err);
      showToast('ডাউনলোড সম্পন্ন করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।');
    } finally {
      setIsDownloading(false);
      setIsGateOpen(false);
      setPendingDownload(null);
    }
  };

  const totalFavoritesCount =
    favoritePostcards.length + favoriteQuotes.length + favoriteGallery.length;

  return (
    <div className="min-h-screen bg-[#110b07] text-[#fbf6ee] flex flex-col selection:bg-[#9c2f3d] selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        favoritesCount={totalFavoritesCount}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* VIEW: HOME */}
        {currentView === 'home' && (
          <>
            <Hero
              onCreateClick={() => handleNavigate('generator')}
              onGalleryClick={() => handleNavigate('gallery')}
            />
            <CategoryGrid
              selectedCategory={categoryFilter}
              onSelectCategory={(cat) => {
                setCategoryFilter(cat);
                handleNavigate('postcards', cat);
              }}
            />
            <FeaturedSections
              favorites={favoritePostcards}
              onToggleFavorite={handleToggleFavoritePostcard}
              onSelectCard={handleSelectPostcardForCreate}
              onViewAll={(filter) => handleNavigate('postcards', filter)}
            />
          </>
        )}

        {/* VIEW: POSTCARD GENERATOR */}
        {currentView === 'generator' && (
          <PostcardGenerator
            initialPostcard={selectedPostcard}
            initialQuote={selectedQuote}
            onDownloadRequest={handleRequestDownload}
          />
        )}

        {/* VIEW: POSTCARD LIBRARY */}
        {currentView === 'postcards' && (
          <PostcardLibrary
            initialCategory={categoryFilter}
            favorites={favoritePostcards}
            onToggleFavorite={handleToggleFavoritePostcard}
            onSelectCard={handleSelectPostcardForCreate}
          />
        )}

        {/* VIEW: QUOTES LIBRARY */}
        {currentView === 'quotes' && (
          <QuoteLibrary
            onSelectQuote={handleSelectQuoteForCreate}
            onSurpriseMe={handleSurpriseMe}
            favoriteQuotes={favoriteQuotes}
            onToggleFavoriteQuote={handleToggleFavoriteQuote}
          />
        )}

        {/* VIEW: VINTAGE GALLERY */}
        {currentView === 'gallery' && (
          <VintageGalleryView
            favoriteGallery={favoriteGallery}
            onToggleFavoriteGallery={handleToggleFavoriteGallery}
            onRequestDownload={handleRequestGalleryDownload}
          />
        )}

        {/* VIEW: CATEGORIES */}
        {currentView === 'categories' && (
          <div className="py-8">
            <CategoryGrid
              selectedCategory={categoryFilter}
              onSelectCategory={(cat) => {
                setCategoryFilter(cat);
                handleNavigate('postcards', cat);
              }}
            />
            <PostcardLibrary
              initialCategory={categoryFilter}
              favorites={favoritePostcards}
              onToggleFavorite={handleToggleFavoritePostcard}
              onSelectCard={handleSelectPostcardForCreate}
            />
          </div>
        )}

        {/* VIEW: FAVORITES */}
        {currentView === 'favorites' && (
          <FavoritesView
            favoritePostcardIds={favoritePostcards}
            favoriteQuoteIds={favoriteQuotes}
            favoriteGalleryIds={favoriteGallery}
            onToggleFavoritePostcard={handleToggleFavoritePostcard}
            onToggleFavoriteQuote={handleToggleFavoriteQuote}
            onToggleFavoriteGallery={handleToggleFavoriteGallery}
            onSelectPostcard={handleSelectPostcardForCreate}
            onSelectQuote={handleSelectQuoteForCreate}
            onNavigate={handleNavigate}
          />
        )}

      </main>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPostcard={handleSelectPostcardForCreate}
        onSelectQuote={handleSelectQuoteForCreate}
        onSelectCategory={(cat) => {
          setCategoryFilter(cat);
          handleNavigate('postcards', cat);
        }}
      />

      {/* Sponsor 8-Second Download Gate Modal */}
      <DownloadGateModal
        isOpen={isGateOpen}
        onClose={() => {
          if (!isDownloading) {
            setIsGateOpen(false);
            setPendingDownload(null);
          }
        }}
        cardTitle={pendingDownload?.filename || 'Vintage Postcard'}
        onDownload={handleExecuteDownload}
        onProceedDownload={handleExecuteDownload}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c120c] border border-[#d4af37] text-[#fbf6ee] px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-serif animate-bounce-short">
          <CheckCircle2 className="w-4 h-4 text-[#dfb76c] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
