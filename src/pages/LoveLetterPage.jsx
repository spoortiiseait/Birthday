import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Feather, ArrowRight } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import { playSparkleSound } from '../utils/audio';
import { triggerHeartConfetti, triggerGoldSparkles } from '../utils/confetti';

export default function LoveLetterPage() {
  const [isSealStamped, setIsSealStamped] = useState(false);

  const { loveLetter } = BIRTHDAY_CONFIG;

  const handleStampClick = () => {
    setIsSealStamped(!isSealStamped);
    playSparkleSound();
    triggerHeartConfetti(0.5, 0.6);
    triggerGoldSparkles(0.5, 0.6);
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-center px-4 py-12">
      
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-rose-500 font-bold flex items-center justify-center gap-1.5 mb-2">
          <Feather className="w-3.5 h-3.5 text-amber-500" />
          A Personal Birthday Note
          <Feather className="w-3.5 h-3.5 text-amber-500" />
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-slate-800 tracking-tight">
          Love Letter from Pooja
        </h1>
        <p className="font-serif text-sm sm:text-base text-rose-600 mt-2 italic">
          Straight from the heart of your loving wife
        </p>
      </div>

      {/* Romantic Pink Glass Parchment Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative romantic-pink-card rounded-3xl p-8 sm:p-14 border border-rose-200/90 shadow-romantic-pink max-w-2xl w-full mx-auto overflow-hidden bg-white/95"
      >
        {/* Decorative corner flourishes */}
        <div className="absolute top-4 left-4 text-rose-300 pointer-events-none select-none text-2xl font-serif">
          ❧
        </div>
        <div className="absolute top-4 right-4 text-rose-300 pointer-events-none select-none text-2xl font-serif">
          ☙
        </div>
        <div className="absolute bottom-4 left-4 text-rose-300 pointer-events-none select-none text-2xl font-serif">
          ☙
        </div>
        <div className="absolute bottom-4 right-4 text-rose-300 pointer-events-none select-none text-2xl font-serif">
          ❧
        </div>

        {/* Letter Date & Tag */}
        <div className="flex items-center justify-between border-b border-rose-100 pb-4 mb-8">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Chethan's Special Day
          </span>
          <span className="text-xs font-serif italic text-slate-400">
            With All My Love
          </span>
        </div>

        {/* Salutation */}
        <h2 className="font-serif text-2xl sm:text-3xl text-slate-800 font-bold mb-6 tracking-wide">
          {loveLetter.salutation}
        </h2>

        {/* Exact Birthday Letter Body */}
        <p className="font-serif text-base sm:text-xl text-slate-700 leading-relaxed sm:leading-loose tracking-wide">
          {loveLetter.content}
        </p>

        {/* Sign-off */}
        <div className="mt-8 flex flex-col items-end">
          <span className="font-script text-3xl sm:text-4xl text-rose-600 font-bold">
            {loveLetter.signOff}
          </span>
          <span className="text-xs text-rose-400 tracking-wider mt-1 flex items-center gap-1 font-medium">
            Forever Yours <Heart className="w-3 h-3 fill-rose-500 text-rose-500 inline" />
          </span>
        </div>

        {/* "Sealed with Love ❤️" Stamp Section */}
        <div className="mt-12 pt-8 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-medium block">
              Official Stamp of Pooja's Heart
            </span>
            <span className="text-xs text-rose-500 italic">
              Tap the wax seal to inspect the stamp!
            </span>
          </div>

          {/* Interactive Wax Stamp */}
          <motion.button
            onClick={handleStampClick}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative cursor-pointer select-none group"
            title="Click to stamp"
          >
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full wax-seal border-2 border-yellow-200/60 flex flex-col items-center justify-center p-2 text-center shadow-md">
              <div className="w-full h-full rounded-full border border-yellow-200/50 flex flex-col items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white animate-pulse drop-shadow" />
                <span className="font-serif text-[9px] uppercase font-black tracking-widest text-white drop-shadow mt-0.5">
                  {loveLetter.stampText}
                </span>
              </div>
            </div>
            
            {/* Ripple Pulse */}
            <span className="absolute inset-0 rounded-full bg-rose-400/25 animate-ping -z-10" />
          </motion.button>
        </div>

        {/* Note revealed after clicking stamp */}
        <AnimatePresence>
          {isSealStamped && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center"
            >
              <p className="font-serif text-sm text-rose-700 italic">
                "Chethan, celebrating you today and loving you forever is my greatest joy in this world! ❤️"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>

      {/* Next Page Link */}
      <div className="mt-10">
        <Link
          to="/surprise"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-sm shadow-md hover:scale-105 active:scale-95 transition-all group"
        >
          <span>Next: Final Surprise 🎁</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
