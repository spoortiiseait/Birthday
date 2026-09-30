import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, RotateCcw, Music, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { playBlowSound, playCakeCutSound, playHappyBirthdayTune } from '../utils/audio';
import { triggerGoldSparkles, triggerCelebrationCannons, triggerHeartConfetti } from '../utils/confetti';

export default function CakePage() {
  const [candleState, setCandleState] = useState('lit'); // 'lit' | 'blowing' | 'out'
  const [isCakeCut, setIsCakeCut] = useState(false);
  const [isCutting, setIsCutting] = useState(false);
  const [isPlayingTune, setIsPlayingTune] = useState(false);
  const [message, setMessage] = useState("Make a wish and blow the candle!");

  // Blow candle activity
  const handleBlowCandle = () => {
    if (candleState !== 'lit') return;
    setCandleState('blowing');
    playBlowSound();

    setTimeout(() => {
      setCandleState('out');
      triggerGoldSparkles(0.5, 0.4);
      triggerHeartConfetti(0.5, 0.4);
      setMessage("✨ Wish Made! May all your dreams come true, my love! ❤️");
    }, 700);
  };

  const handleRelight = () => {
    setCandleState('lit');
    setMessage("Candle re-lit! Make another wish ✨");
  };

  // Cut cake activity
  const handleCutCake = () => {
    if (isCakeCut || isCutting) return;
    setIsCutting(true);
    playCakeCutSound();

    setTimeout(() => {
      setIsCutting(false);
      setIsCakeCut(true);
      setIsPlayingTune(true);
      triggerCelebrationCannons();
      setMessage("🍰 Happy Birthday Chetan! Here is the sweetest slice for you! 💖");

      playHappyBirthdayTune(() => {
        setIsPlayingTune(false);
      });
    }, 800);
  };

  const handleResetCake = () => {
    setIsCakeCut(false);
    setMessage("Cake ready for the celebration!");
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-center px-4 py-12">
      
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-rose-500 font-bold flex items-center justify-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Celebration Time
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-800">
          Happy Birthday Chetan
        </h2>
        <p className="font-serif text-sm sm:text-base text-rose-600 mt-2 italic">
          Make a wish, blow your candle, and cut the cake 🎂
        </p>
      </div>

      {/* Main Cake Stage Card (Romantic White Card with Pink Shadows) */}
      <div className="relative romantic-pink-card rounded-3xl p-6 sm:p-10 border border-rose-200 max-w-2xl w-full mx-auto shadow-romantic-pink text-center overflow-hidden">
        
        {/* Status Message Pill */}
        <div className="min-h-[42px] flex items-center justify-center mb-6">
          <motion.div
            key={message}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs sm:text-sm font-semibold text-rose-700 flex items-center gap-2 shadow-sm"
          >
            {isPlayingTune && <Music className="w-3.5 h-3.5 text-rose-500 animate-spin" />}
            <span>{message}</span>
          </motion.div>
        </div>

        {/* 2-Tier Pastel Cake Visualization */}
        <div className="relative h-72 sm:h-80 flex flex-col items-center justify-end pb-6 select-none">
          
          {/* Interactive Candle */}
          <div
            onClick={candleState === 'lit' ? handleBlowCandle : handleRelight}
            className="relative z-30 cursor-pointer flex flex-col items-center -mb-1 group"
            title={candleState === 'lit' ? "Click to Blow Candle" : "Click to Re-light"}
          >
            {/* Flame */}
            <div className="relative h-12 flex items-center justify-center">
              <AnimatePresence>
                {candleState === 'lit' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="relative flex items-center justify-center flame-active"
                  >
                    <div className="w-5 h-9 rounded-[50%_50%_20%_20%_/_70%_70%_30%_30%] bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_15px_#ff9900]" />
                    <div className="absolute bottom-1 w-2.5 h-4 rounded-full bg-white/90 blur-[0.5px]" />
                  </motion.div>
                )}

                {candleState === 'blowing' && (
                  <motion.div
                    animate={{ x: [0, 8, -6, 12], opacity: [1, 0.8, 0.3, 0] }}
                    transition={{ duration: 0.6 }}
                    className="w-4 h-8 rounded-full bg-gradient-to-t from-orange-400 to-yellow-200 blur-[2px]"
                  />
                )}

                {candleState === 'out' && (
                  <div className="relative candle-smoke flex flex-col items-center pointer-events-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400/60 blur-[1px]" />
                    <span className="w-3.5 h-3.5 rounded-full bg-slate-300/40 blur-[2px] mt-1" />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Wick */}
            <div className="w-1 h-3 bg-stone-700 rounded-t" />

            {/* Gold Striped Candle Body */}
            <div className="w-4 h-14 rounded-t-sm bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 border border-amber-300 shadow-sm flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.5)_4px,rgba(255,255,255,0.5)_8px)]" />
            </div>
            <div className="w-6 h-2 rounded-full bg-amber-300 shadow-sm -mt-0.5" />
          </div>

          {/* Slicing Knife Animation */}
          <AnimatePresence>
            {isCutting && (
              <motion.div
                initial={{ x: 120, y: -40, rotate: -35, opacity: 0 }}
                animate={{ x: -20, y: 40, rotate: 10, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeInOut" }}
                className="absolute z-40 pointer-events-none top-16"
              >
                <div className="flex items-center">
                  <div
                    className="w-28 h-7 bg-gradient-to-r from-slate-200 via-white to-amber-100 shadow-md border border-amber-300 rounded-r"
                    style={{ clipPath: 'polygon(0% 40%, 85% 0%, 100% 100%, 0% 100%)' }}
                  />
                  <div className="w-12 h-5 bg-gradient-to-r from-amber-800 to-amber-900 rounded-r border border-amber-600" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2-Tier Pastel Cake */}
          <div className="relative flex flex-col items-center">
            
            {/* Top Tier (Pastel Pink Strawberry Cream) */}
            <div className={`relative w-44 sm:w-52 h-20 rounded-t-2xl bg-gradient-to-b from-pink-200 via-rose-300 to-rose-400 border-x-2 border-t-2 border-amber-300 shadow-lg overflow-hidden transition-all duration-700 ${
              isCakeCut ? 'translate-x-3 -rotate-1' : ''
            }`}>
              {/* Dripping White Frosting */}
              <div className="absolute top-0 inset-x-0 h-5 bg-white/95 rounded-b-xl shadow-inner flex justify-around">
                <span className="w-3 h-4 bg-white rounded-b-full shadow-sm" />
                <span className="w-3.5 h-6 bg-white rounded-b-full shadow-sm" />
                <span className="w-3 h-4 bg-white rounded-b-full shadow-sm" />
                <span className="w-4 h-5 bg-white rounded-b-full shadow-sm" />
                <span className="w-3 h-4 bg-white rounded-b-full shadow-sm" />
              </div>

              {/* Gold pearl beads */}
              <div className="absolute bottom-2 inset-x-0 flex justify-center gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="w-2 h-2 rounded-full bg-amber-300 shadow-sm" />
                ))}
              </div>

              {/* Monogram */}
              <div className="absolute inset-0 flex items-center justify-center pt-2">
                <span className="font-serif text-xs font-bold uppercase tracking-widest text-white drop-shadow flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-white fill-white inline" />
                  Chetan
                  <Heart className="w-3.5 h-3.5 text-white fill-white inline" />
                </span>
              </div>
            </div>

            {/* Bottom Tier (Vanilla Cream & Peach Fondant) */}
            <div className="relative w-64 sm:w-76 h-24 rounded-t-3xl bg-gradient-to-b from-peach-100 via-amber-100 to-rose-100 border-x-2 border-t-2 border-amber-300 shadow-xl flex flex-col justify-between overflow-hidden">
              {/* Scallops */}
              <div className="h-5 bg-gradient-to-r from-pink-100 via-rose-200 to-pink-100 shadow-sm flex justify-around items-center px-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-sm" />
                ))}
              </div>

              {/* Cake Text: "Happy Birthday Chethan" ONLY */}
              <div className="flex flex-col items-center justify-center my-auto">
                <span className="font-script text-2xl sm:text-3xl text-rose-600 drop-shadow-sm font-bold">
                  Happy Birthday Chetan
                </span>
                <span className="text-[10px] tracking-widest text-amber-700 uppercase font-semibold">
                  With All My Love ❤️ Pooja
                </span>
              </div>

              {/* Gold Ribbon bottom */}
              <div className="h-2.5 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 border-t border-amber-300" />
            </div>

            {/* Cake Pedestal Plate */}
            <div className="w-72 sm:w-88 h-4 rounded-full bg-gradient-to-r from-slate-200 via-white to-slate-200 shadow-md border border-slate-300 -mt-1" />
            <div className="w-28 h-3 bg-gradient-to-b from-slate-200 to-slate-300 rounded-b-lg shadow-sm" />
          </div>

          {/* Sliced Piece Separation Visual */}
          <AnimatePresence>
            {isCakeCut && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7, x: 60, y: 10 }}
                animate={{ opacity: 1, scale: 1, x: 95, y: -20 }}
                className="absolute right-4 sm:right-12 bottom-6 bg-white p-2.5 rounded-xl border border-rose-300 shadow-md z-30"
              >
                <div className="flex flex-col items-center">
                  <span className="text-xl">🍰</span>
                  <span className="text-[10px] font-bold text-rose-600 uppercase mt-0.5">
                    Chetan's Bite
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Two Buttons Only: "Blow The Candle 🕯️" and "Cut The Cake 🎂" */}
        <div className="mt-8 pt-6 border-t border-rose-100 flex flex-wrap items-center justify-center gap-4">
          
          {/* Button 1: Blow The Candle */}
          {candleState === 'lit' ? (
            <button
              onClick={handleBlowCandle}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-sm tracking-wide shadow-[0_4px_14px_rgba(244,63,94,0.3)] hover:scale-105 active:scale-95 transition-all"
            >
              <Wind className="w-4 h-4 animate-pulse" />
              <span>Blow The Candle 🕯️</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-rose-50 text-rose-600 border border-rose-300 text-xs font-semibold tracking-wide transition-all shadow-sm"
            >
              <span>Re-light Candle 🕯️</span>
            </button>
          )}

          {/* Button 2: Cut The Cake */}
          {!isCakeCut ? (
            <button
              onClick={handleCutCake}
              disabled={isCutting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-900 font-semibold text-sm tracking-wide shadow-[0_4px_14px_rgba(212,175,55,0.35)] hover:scale-105 active:scale-95 transition-all"
            >
              <span>Cut The Cake 🎂</span>
            </button>
          ) : (
            <button
              onClick={handleResetCake}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold tracking-wide transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Cake</span>
            </button>
          )}

        </div>

      </div>

      {/* Navigation to next page */}
      <div className="mt-8">
        <Link
          to="/chetans-best"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-rose-200 text-rose-600 font-semibold text-xs sm:text-sm hover:bg-rose-50 shadow-sm transition-all group"
        >
          <span>See Chetan's Best Photos</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
