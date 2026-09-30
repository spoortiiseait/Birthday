import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-8 px-4 border-t border-rose-200/80 bg-white/75 backdrop-blur-md text-center z-20">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
        
        {/* Monogram */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 p-[1.5px] shadow-sm">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            <span className="font-serif text-sm font-bold text-rose-600">
              C&P
            </span>
          </div>
        </div>

        {/* Required Footer Text: "Made with ❤️ by Pooja for Chethan" */}
        <p className="font-serif text-sm sm:text-base text-slate-800 font-medium flex items-center justify-center gap-1.5 flex-wrap">
          <span>Made with</span>
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline" />
          <span>by <strong className="text-rose-600 font-bold">Pooja</strong> for <strong className="text-rose-600 font-bold">Chethan</strong></span>
        </p>

        {/* Back To Top Button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-semibold tracking-wide transition-all shadow-sm group mt-1"
        >
          <span>Back To Top</span>
          <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </div>
    </footer>
  );
}
