import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import SmartImage from '../components/SmartImage';

const DECORATIVE_BALLOONS = [
  { id: 1, x: '8%', y: '18%', color: 'from-pink-300 to-rose-400', size: 'w-12 h-16', delay: 0 },
  { id: 2, x: '18%', y: '65%', color: 'from-amber-200 to-amber-400', size: 'w-10 h-14', delay: 1.2 },
  { id: 3, x: '85%', y: '22%', color: 'from-purple-200 to-purple-400', size: 'w-14 h-18', delay: 0.8 },
  { id: 4, x: '78%', y: '70%', color: 'from-rose-300 to-pink-500', size: 'w-11 h-15', delay: 1.8 },
  { id: 5, x: '4%', y: '82%', color: 'from-orange-200 to-pink-300', size: 'w-12 h-16', delay: 2.2 },
  { id: 6, x: '90%', y: '50%', color: 'from-amber-300 to-yellow-400', size: 'w-10 h-14', delay: 1.5 },
];

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      
      {/* Floating balloons as DECORATION ONLY - NO pop, NO counter, NO game */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {DECORATIVE_BALLOONS.map((b) => (
          <motion.div
            key={b.id}
            animate={{
              y: [-15, 15, -15],
              x: [-6, 6, -6],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 5 + b.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ left: b.x, top: b.y }}
            className="absolute hidden sm:block opacity-65 select-none"
          >
            <div className={`relative ${b.size} rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] bg-gradient-to-t ${b.color} shadow-md border border-white/60`}>
              <div className="absolute top-2 left-2 w-2 h-4 bg-white/60 rounded-full blur-[0.5px] -rotate-12" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-inherit rounded-sm" />
              <div className="absolute -bottom-8 left-1/2 w-[1px] h-8 bg-rose-300/50" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        
        {/* Birthday Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/95 border border-rose-200 shadow-sm mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-xs font-semibold tracking-widest text-rose-700 uppercase">
            Special Birthday Celebration
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </motion.div>

        {/* Title: "Happy Birthday Chethan" gold glitter */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-script text-5xl sm:text-7xl md:text-8xl gold-glitter-text leading-tight drop-shadow-sm py-1 font-bold"
        >
          {BIRTHDAY_CONFIG.heroTitle}
        </motion.h1>

        {/* Subtitle: "From Your Loving Wife Pooja ❤️" only */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-serif text-lg sm:text-2xl text-rose-600 font-medium mt-1 mb-8 tracking-wide"
        >
          {BIRTHDAY_CONFIG.heroSubtitle}
        </motion.p>

        {/* Center: ONLY ONE photo 5.jpg in golden heart frame with flowers & contain (no crop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="relative my-4"
        >
          {/* Floral Embellishments around the frame */}
          <div className="absolute -top-4 -left-4 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-rose-200 flex items-center justify-center text-lg">
            🌸
          </div>
          <div className="absolute -bottom-3 -left-3 z-20 w-9 h-9 rounded-full bg-white shadow-md border border-rose-200 flex items-center justify-center text-base">
            🌺
          </div>
          <div className="absolute -top-4 -right-4 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-rose-200 flex items-center justify-center text-lg">
            🌹
          </div>
          <div className="absolute -bottom-3 -right-3 z-20 w-9 h-9 rounded-full bg-white shadow-md border border-rose-200 flex items-center justify-center text-base">
            🌷
          </div>

          {/* Golden Heart Frame with Soft Pink/Gold Glow */}
          <div className="p-3 sm:p-4 rounded-[2.5rem] bg-gradient-to-tr from-amber-400 via-yellow-200 to-rose-300 shadow-[0_15px_40px_rgba(212,175,55,0.35)] border-2 border-amber-300">
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-[2.2rem] overflow-hidden bg-white shadow-inner relative">
              {/* Exactly ONE single photo 5.jpg rendered with object-fit: contain + blurred background */}
              <SmartImage
                src={BIRTHDAY_CONFIG.heroPhoto}
                alt="Chethan & Pooja"
                containerClassName="w-full h-full rounded-[2.2rem]"
                className="w-full h-full"
                fallbackTitle="Chethan & Pooja"
              />
            </div>
          </div>

          {/* Caption: ONLY "Chethan & Pooja ❤️" */}
          <div className="mt-4 inline-flex items-center gap-1.5 px-6 py-1.5 rounded-full bg-white shadow-sm border border-rose-200 text-sm font-semibold text-rose-700">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>{BIRTHDAY_CONFIG.heroCaption}</span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          </div>
        </motion.div>

        {/* Button "Celebrate His Birthday →" goes to /cake */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8"
        >
          <Link
            to="/cake"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-semibold tracking-wide shadow-[0_10px_25px_rgba(244,63,94,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 text-base"
          >
            <span>Celebrate His Birthday</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
