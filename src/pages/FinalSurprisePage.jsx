import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, ArrowRight, RotateCcw, PartyPopper } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import SmartImage from '../components/SmartImage';
import { playPopSound, playSparkleSound, playCelebrationSound } from '../utils/audio';
import { triggerFiveSecondConfettiRain, triggerCelebrationCannons, triggerHeartConfetti } from '../utils/confetti';

export default function FinalSurprisePage() {
  // Stages: 'closed' | 'shaking' | 'bursting' | 'heart-collage' | 'royal-frame'
  const [stage, setStage] = useState('closed');
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [showFinalBanner, setShowFinalBanner] = useState(false);

  const { surpriseMemories, surpriseFinalText, photos } = BIRTHDAY_CONFIG;
  const currentMemory = surpriseMemories[currentFrameIndex];

  // 10 radial trajectory coordinates for the photos bursting from inside the box
  const burstTrajectories = [
    { x: -280, y: -220, rotate: -15 },
    { x: -120, y: -280, rotate: -6 },
    { x: 120, y: -280, rotate: 8 },
    { x: 280, y: -220, rotate: 16 },
    { x: -320, y: 0, rotate: -20 },
    { x: 320, y: 0, rotate: 20 },
    { x: -260, y: 200, rotate: -12 },
    { x: -90, y: 270, rotate: -5 },
    { x: 90, y: 270, rotate: 7 },
    { x: 260, y: 200, rotate: 14 },
  ];

  // Handle clicking the gift box
  const handleOpenBox = () => {
    if (stage !== 'closed') return;
    
    // Step 1: Box shakes 3x
    setStage('shaking');
    playPopSound();

    setTimeout(() => {
      // Step 2: Lid flies up and 10 photos burst OUT from inside the box
      setStage('bursting');
      playCelebrationSound();
      triggerCelebrationCannons();
      triggerFiveSecondConfettiRain(5000);

      // Step 3: Transition to Heart Collage after 2 seconds
      setTimeout(() => {
        setStage('heart-collage');

        // Step 4: Transition to Giant Royal Golden Frame after 2 seconds
        setTimeout(() => {
          setStage('royal-frame');
        }, 2200);
      }, 2200);
    }, 900);
  };

  const handleNextMemory = () => {
    playSparkleSound();
    triggerHeartConfetti(0.5, 0.5);

    if (currentFrameIndex < surpriseMemories.length - 1) {
      setCurrentFrameIndex((prev) => prev + 1);
    } else {
      // Final blast banner
      setShowFinalBanner(true);
      playCelebrationSound();
      triggerCelebrationCannons();
    }
  };

  const handleReplay = () => {
    setStage('closed');
    setCurrentFrameIndex(0);
    setShowFinalBanner(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-8 relative z-20">
        <span className="text-xs uppercase tracking-widest text-rose-500 font-bold flex items-center justify-center gap-1.5 mb-2">
          <PartyPopper className="w-3.5 h-3.5 text-amber-500" />
          The Final Surprise
          <PartyPopper className="w-3.5 h-3.5 text-amber-500" />
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-slate-800 tracking-tight">
          A Special Gift For Chethan
        </h1>
        <p className="font-serif text-sm sm:text-base text-rose-600 mt-2 italic">
          Every memory with you is wrapped with all my love ❤️
        </p>
      </div>

      {/* STAGE: 'closed' or 'shaking' -> BIG 3D PINK GIFT BOX (300px) */}
      {(stage === 'closed' || stage === 'shaking') && (
        <div className="relative flex flex-col items-center justify-center my-6 select-none">
          
          {/* Ambient Glow */}
          <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-rose-300/40 via-pink-200/50 to-amber-200/40 blur-3xl pointer-events-none" />

          {/* Prompt Label Above Box */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="mb-6 px-6 py-2.5 rounded-full bg-white/95 border border-rose-200 shadow-md backdrop-blur-md text-center"
          >
            <span className="font-serif text-sm sm:text-base font-bold text-rose-700 flex items-center gap-2">
              <Gift className="w-4 h-4 text-rose-500 animate-bounce" />
              A Special Gift For You Chethan - Click to Open! 🎁
              <Sparkles className="w-4 h-4 text-amber-500" />
            </span>
          </motion.div>

          {/* 300px BIG 3D PINK GIFT BOX WITH GOLDEN RIBBON */}
          <motion.div
            animate={
              stage === 'shaking'
                ? {
                    x: [-15, 15, -12, 12, -8, 8, 0],
                    rotate: [-6, 6, -5, 5, -2, 2, 0],
                    scale: [1, 1.05, 1, 1.05, 1],
                  }
                : {
                    rotate: [-2, 2, -2],
                    y: [-4, 4, -4],
                  }
            }
            transition={
              stage === 'shaking'
                ? { duration: 0.85, ease: "easeInOut" }
                : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            }
            onClick={handleOpenBox}
            className="relative w-[280px] sm:w-[320px] h-[280px] sm:h-[300px] cursor-pointer group flex flex-col items-center"
          >
            {/* PHOTO CORNERS VISIBLY PEEKING OUT FROM TOP OF THE BOX */}
            <div className="absolute -top-6 inset-x-8 h-12 flex justify-between items-end z-10 pointer-events-none">
              {/* Photo 1 Corner peeking */}
              <div className="w-12 h-14 bg-white rounded-t-md shadow-md border border-rose-300 -rotate-12 overflow-hidden">
                <img src="/photos/1.jpg" alt="" className="w-full h-full object-cover opacity-85" />
              </div>
              {/* Photo 5 Corner peeking */}
              <div className="w-14 h-16 bg-white rounded-t-md shadow-lg border border-amber-300 rotate-6 overflow-hidden">
                <img src="/photos/5.jpg" alt="" className="w-full h-full object-cover opacity-90" />
              </div>
              {/* Photo 3 Corner peeking */}
              <div className="w-12 h-14 bg-white rounded-t-md shadow-md border border-rose-300 rotate-15 overflow-hidden">
                <img src="/photos/3.jpg" alt="" className="w-full h-full object-cover opacity-85" />
              </div>
            </div>

            {/* Gift Box Lid (Pastel Pink + Rose + Gold) */}
            <div className="relative w-full h-20 sm:h-24 rounded-2xl bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 border-2 border-white shadow-[0_10px_30px_rgba(244,63,94,0.35)] z-20 flex items-center justify-center overflow-hidden">
              {/* Gold Ribbon on Lid */}
              <div className="absolute inset-y-0 w-10 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 border-x border-yellow-200 shadow-md" />
              
              {/* Golden 3D Bow on Top */}
              <div className="absolute -top-8 z-30 flex items-center justify-center">
                <div className="w-14 h-12 rounded-full border-4 border-amber-300 bg-amber-400/95 -rotate-25 shadow-lg" />
                <div className="w-14 h-12 rounded-full border-4 border-amber-300 bg-amber-400/95 rotate-25 shadow-lg -ml-5" />
                <div className="absolute w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-100 border border-yellow-200 shadow-[0_0_20px_#ffd700]" />
              </div>
            </div>

            {/* Gift Box Base */}
            <div className="relative w-[92%] h-full -mt-2 rounded-b-3xl bg-gradient-to-b from-rose-500 via-pink-600 to-rose-700 border-x-2 border-b-2 border-white shadow-[0_20px_45px_rgba(244,63,94,0.3)] flex items-center justify-center overflow-hidden">
              {/* Gold Ribbons */}
              <div className="absolute inset-y-0 w-10 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 border-x border-yellow-200 shadow-md" />
              <div className="absolute inset-x-0 h-10 bg-gradient-to-b from-amber-400 via-yellow-200 to-amber-500 border-y border-yellow-200 shadow-md" />

              {/* Monogram Badge */}
              <div className="relative z-10 px-4 py-2.5 rounded-2xl bg-white/95 border border-rose-200 shadow-md text-center backdrop-blur-md">
                <span className="font-serif text-sm font-bold text-rose-700 block">
                  Chethan ❤️ Pooja
                </span>
                <span className="text-[10px] text-amber-700 uppercase tracking-widest font-mono">
                  Birthday Box
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* STAGE: 'bursting' -> 10 PHOTOS BURST OUT FROM INSIDE BOX (SMALL -> BIG) */}
      {stage === 'bursting' && (
        <div className="relative w-full max-w-4xl h-[480px] flex items-center justify-center">
          
          {/* Lid Flying Up */}
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -220, rotate: -30, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute z-40 w-64 h-16 rounded-2xl bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 border-2 border-white shadow-lg"
          />

          {/* Open Box Base at center */}
          <div className="w-56 h-44 rounded-b-3xl bg-gradient-to-b from-rose-400 to-rose-600 border-2 border-white flex items-center justify-center shadow-xl relative">
            <div className="absolute inset-0 bg-yellow-200/30 blur-xl animate-pulse" />
            <span className="font-serif text-sm font-bold text-white z-10 drop-shadow">
              Unleashing Photos... ✨
            </span>
          </div>

          {/* 10 Photos Bursting Out in All Directions Small -> Big */}
          {photos.map((p, idx) => {
            const traj = burstTrajectories[idx];
            return (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, scale: 0.1, opacity: 0 }}
                animate={{
                  x: traj.x,
                  y: traj.y,
                  scale: 1,
                  rotate: traj.rotate,
                  opacity: 1,
                }}
                transition={{
                  duration: 1.1,
                  delay: idx * 0.06,
                  type: "spring",
                  stiffness: 90,
                }}
                className="absolute z-30 w-24 sm:w-28 h-28 sm:h-32 rounded-xl overflow-hidden shadow-2xl border-2 border-amber-300 bg-white"
              >
                <SmartImage
                  src={p.url}
                  alt={p.caption}
                  aspectRatio="aspect-square"
                  containerClassName="w-full h-full"
                  className="w-full h-full"
                  fallbackTitle={`#${p.id}`}
                />
              </motion.div>
            );
          })}
        </div>
      )}

      {/* STAGE: 'heart-collage' -> 10 PHOTOS IN HEART COLLAGE FOR 2 SECONDS */}
      {stage === 'heart-collage' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center my-6"
        >
          <div className="mb-4 text-center">
            <span className="font-serif text-xl sm:text-2xl font-bold text-rose-700 flex items-center gap-2 justify-center">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
              Our Hearts Intertwined
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
            </span>
          </div>

          {/* Heart layout in pink theme */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-10 sm:gap-14">
              {[photos[0], photos[1]].map((p) => (
                <div key={p.id} className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl overflow-hidden border-2 border-rose-300 shadow-md bg-white">
                  <SmartImage src={p.url} alt="" aspectRatio="aspect-square" containerClassName="w-full h-full" />
                </div>
              ))}
            </div>
            <div className="flex gap-2 sm:gap-3">
              {[photos[2], photos[4], photos[5], photos[3]].map((p) => (
                <div key={p.id} className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl overflow-hidden border-2 border-rose-300 shadow-md bg-white">
                  <SmartImage src={p.url} alt="" aspectRatio="aspect-square" containerClassName="w-full h-full" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 sm:gap-4">
              {[photos[6], photos[7], photos[8]].map((p) => (
                <div key={p.id} className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl overflow-hidden border-2 border-rose-300 shadow-md bg-white">
                  <SmartImage src={p.url} alt="" aspectRatio="aspect-square" containerClassName="w-full h-full" />
                </div>
              ))}
            </div>
            <div className="flex">
              <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-lg bg-white">
                <SmartImage src={photos[9].url} alt="" aspectRatio="aspect-square" containerClassName="w-full h-full" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* STAGE: 'royal-frame' -> GIANT ROYAL GOLDEN FRAME WITH 4 PHOTOS (6,7,8,9) ONE-BY-ONE */}
      {stage === 'royal-frame' && (
        <div className="relative z-10 max-w-xl w-full mx-auto flex flex-col items-center">
          
          {/* Memory Counter Badge */}
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-rose-200 text-xs font-semibold text-rose-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Memory {currentFrameIndex + 1} of {surpriseMemories.length}</span>
            <span className="text-slate-300">•</span>
            <span className="text-amber-700 font-mono">Photo #{currentMemory.id}</span>
          </div>

          {/* ONE Giant Royal Golden Frame with Flowers and Contain (NO LEG CUT) */}
          <motion.div
            key={currentMemory.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md"
          >
            {/* Flowers Around The Frame */}
            <div className="absolute -top-5 -left-5 z-20 w-12 h-12 rounded-full bg-white shadow-md border border-rose-200 flex items-center justify-center text-2xl">
              🌸
            </div>
            <div className="absolute -top-5 -right-5 z-20 w-12 h-12 rounded-full bg-white shadow-md border border-rose-200 flex items-center justify-center text-2xl">
              🌹
            </div>
            <div className="absolute -bottom-5 -left-5 z-20 w-12 h-12 rounded-full bg-white shadow-md border border-rose-200 flex items-center justify-center text-2xl">
              🌺
            </div>
            <div className="absolute -bottom-5 -right-5 z-20 w-12 h-12 rounded-full bg-white shadow-md border border-rose-200 flex items-center justify-center text-2xl">
              🌷
            </div>
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-20 text-xl">
              💐
            </div>
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-20 text-xl">
              💐
            </div>

            {/* Royal Golden Frame Container */}
            <div className="p-4 sm:p-5 rounded-[2.5rem] bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 shadow-[0_15px_40px_rgba(212,175,55,0.35)] border-4 border-amber-300">
              <div className="relative aspect-[4/5] rounded-[2.2rem] overflow-hidden bg-white shadow-inner border-2 border-amber-200">
                {/* Contain with blurred background: FULL photo visible, NO leg or head cut */}
                <SmartImage
                  src={currentMemory.url}
                  alt={currentMemory.message}
                  aspectRatio="aspect-[4/5]"
                  containerClassName="w-full h-full rounded-[2.2rem]"
                  className="w-full h-full"
                  fallbackTitle={`Photo #${currentMemory.id}`}
                />

                {/* Message Banner at the bottom */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-12 pb-6 px-4 text-center">
                  <span className="font-script text-3xl sm:text-4xl text-rose-600 font-bold block drop-shadow-sm">
                    "{currentMemory.message}"
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-amber-800 font-semibold block mt-1">
                    Chethan & Pooja • Forever Love ❤️
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Controls: "Next Memory →" button */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleNextMemory}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-sm shadow-[0_6px_20px_rgba(244,63,94,0.35)] hover:scale-105 active:scale-95 transition-all"
            >
              <span>{currentFrameIndex < surpriseMemories.length - 1 ? 'Next Memory' : 'Unleash Final Love'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* FINAL BLAST: 5-Second Confetti Rain + Glowing Love Text */}
          <AnimatePresence>
            {showFinalBanner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.6 }}
                className="mt-10 p-6 sm:p-10 rounded-3xl romantic-pink-card border-2 border-rose-300 shadow-romantic-pink text-center max-w-xl w-full bg-white/95"
              >
                <div className="flex items-center justify-center gap-2 text-rose-500 mb-2">
                  <Heart className="w-6 h-6 fill-rose-500 animate-pulse" />
                  <span className="text-xs uppercase tracking-[0.3em] font-bold text-amber-700">
                    Forever Yours
                  </span>
                  <Heart className="w-6 h-6 fill-rose-500 animate-pulse" />
                </div>

                {/* Exact text: "I LOVE YOU CHETHAN - FOREVER YOURS POOJA" */}
                <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-rose-600 leading-tight drop-shadow-sm">
                  {surpriseFinalText}
                </h2>

                <p className="font-serif text-sm sm:text-base text-slate-600 italic mt-3">
                  "Happiest Birthday to the king of my heart, my handsome husband Chethan!"
                </p>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleReplay}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-all shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay Gift Box Experience 🔄</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}

    </div>
  );
}
