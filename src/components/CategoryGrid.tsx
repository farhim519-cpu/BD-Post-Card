import React from 'react';
import { CATEGORIES } from '../data/categories';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { PostcardCategory } from '../types';

interface CategoryGridProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="py-12 border-b border-[#c5a059]/20 bg-[#140e0a]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#c5a059] font-serif block mb-1">
            EXPLORE COLLECTIONS
          </span>
          <h2 
            className="text-2xl sm:text-3xl font-bold text-[#fbf6ee] tracking-wide"
            style={{ fontFamily: "'Noto Serif Bengali', serif" }}
          >
            ক্যাটাগরি বেছে নিন
          </h2>
          <div className="w-16 h-[2px] bg-[#c5a059]/40 mx-auto mt-2" />
        </div>

        {/* Category Pills / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`p-3.5 rounded-lg text-center transition-all duration-200 border flex flex-col items-center justify-center gap-1.5 group cursor-pointer ${
                  isSelected
                    ? 'bg-[#3b151b] border-[#d4af37] shadow-lg scale-102 ring-1 ring-[#d4af37]/40'
                    : 'bg-[#1a120c] border-[#c5a059]/25 hover:border-[#c5a059]/60 hover:bg-[#231810]'
                }`}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span 
                  className={`text-xs sm:text-sm font-medium tracking-wide ${
                    isSelected ? 'text-[#fbf6ee] font-semibold' : 'text-[#d6c7b2] group-hover:text-[#fbf6ee]'
                  }`}
                  style={{ fontFamily: "'Noto Serif Bengali', serif" }}
                >
                  {cat.name.replace(/^[^\s]+\s/, '')}
                </span>
                <span className="text-[10px] text-[#c5a059]/80 font-mono">
                  {POSTCARD_TEMPLATES.filter((p) => p.category === cat.name).length} কার্ড
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
