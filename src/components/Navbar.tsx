import React, { useState } from 'react';
import { Menu, X, Heart, Search, Sparkles, Image as GalleryIcon, Quote, BookOpen, Layers } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, filterCategory?: string) => void;
  favoritesCount: number;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  favoritesCount,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', labelBn: 'হোম', icon: BookOpen },
    { id: 'generator', label: 'Create', labelBn: 'পোস্টকার্ড তৈরি', icon: Sparkles },
    { id: 'postcards', label: 'Postcards', labelBn: 'পোস্টকার্ডসমূহ', icon: Layers },
    { id: 'quotes', label: 'Quotes', labelBn: 'উক্তিসমূহ', icon: Quote },
    { id: 'gallery', label: 'Vintage Gallery', labelBn: 'গ্যালারি', icon: GalleryIcon },
    { id: 'categories', label: 'Categories', labelBn: 'ক্যাটাগরি', icon: BookOpen },
    { id: 'favorites', label: 'Favorites', labelBn: 'পছন্দ', icon: Heart, badge: favoritesCount },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#120c08]/90 backdrop-blur-md border-b border-[#c5a059]/25 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3b151b] to-[#1c110b] border border-[#d4af37]/60 flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
            💌
          </div>
          <div>
            <span 
              className="text-lg sm:text-xl font-bold text-[#fbf6ee] tracking-wider block"
              style={{ fontFamily: "'Noto Serif Bengali', 'Playfair Display', serif" }}
            >
              BD Post Card
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#c5a059] block -mt-1 font-serif">
              পুরনো দিনের অনুভূতি
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-all relative flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#dfb76c] bg-[#221610] border border-[#c5a059]/40 shadow-inner'
                    : 'text-[#d6c7b2] hover:text-[#fbf6ee] hover:bg-[#1a120d]'
                }`}
                style={{ fontFamily: "'Noto Serif Bengali', serif" }}
              >
                <span>{item.labelBn}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="w-4 h-4 bg-[#9c2f3d] text-white text-[10px] rounded-full flex items-center justify-center font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA and Search Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-full text-[#c5a059] hover:text-[#fbf6ee] hover:bg-[#221610] border border-[#c5a059]/30 transition-all flex items-center gap-1.5 text-xs"
            title="সার্চ করুন"
          >
            <Search className="w-4 h-4" />
            <span className="hidden md:inline font-serif text-[11px]">সার্চ</span>
          </button>

          {/* Primary Create CTA */}
          <button
            onClick={() => handleNavClick('generator')}
            className="hidden sm:inline-flex items-center gap-2 py-2.5 px-4 sm:px-5 bg-gradient-to-r from-[#9c2f3d] to-[#671d24] hover:from-[#b23647] hover:to-[#7d242c] text-[#fff6e6] text-xs sm:text-sm font-medium rounded shadow-md border border-[#d4af37]/40 transition-all transform active:scale-95 group"
            style={{ fontFamily: "'Noto Serif Bengali', serif" }}
          >
            <Sparkles className="w-4 h-4 text-[#dfb76c] group-hover:rotate-12 transition-transform" />
            <span>✨ পোস্টকার্ড তৈরি করুন</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-[#c5a059] hover:text-[#fbf6ee] hover:bg-[#221610] border border-[#c5a059]/30"
            aria-label="মেনু খুলুন"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#150e09] border-b border-[#c5a059]/30 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-2xl">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 p-3 rounded text-sm text-left font-serif transition-colors ${
                    isActive
                      ? 'bg-[#2a1b14] text-[#dfb76c] border border-[#c5a059]/40'
                      : 'bg-[#1b120c] text-[#d6c7b2] hover:text-[#fbf6ee]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#c5a059]" />
                  <span>{item.labelBn}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-auto w-4 h-4 bg-[#9c2f3d] text-white text-[10px] rounded-full flex items-center justify-center font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handleNavClick('generator')}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#9c2f3d] to-[#671d24] text-[#fff6e6] text-sm font-semibold rounded shadow-md border border-[#d4af37]/40 flex items-center justify-center gap-2 font-serif"
          >
            <Sparkles className="w-4 h-4 text-[#dfb76c]" />
            <span>✨ পোস্টকার্ড তৈরি করুন</span>
          </button>
        </div>
      )}
    </header>
  );
};
