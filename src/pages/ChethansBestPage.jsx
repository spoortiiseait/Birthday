import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, X, Maximize2 } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import SmartImage from '../components/SmartImage';
import { triggerHeartConfetti } from '../utils/confetti';

export default function ChethansBestPage() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const rotations = ['-rotate-2', 'rotate-2', 'rotate-1', '-rotate-2'];
  const tapes = [
    'polaroid-tape-tilted-left',
    'polaroid-tape-tilted-right',
    'polaroid-tape',
    'polaroid-tape-tilted-left',
  ];

  const handleOpenPhoto = (item) => {
    setSelectedPhoto(item);
    triggerHeartConfetti(0.5, 0.5);
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-center px-4 py-12">
      
      {/* Title: ONLY "Chethan's Best" */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest text-rose-500 font-bold flex items-center justify-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Solo Moments
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-slate-800 tracking-tight">
          Chetan's Best
        </h1>
        <p className="font-serif text-sm sm:text-base text-rose-600 mt-2 italic">
          Every handsome smile that makes my heart flutter 💕
        </p>
      </div>

      {/* 2x2 White Polaroid Frames with Pink Shadows & Contain (No Crop) */}
      <div className="max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 p-2">
        {BIRTHDAY_CONFIG.chetansBest.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            onClick={() => handleOpenPhoto(item)}
            className={`relative polaroid-white-card p-4 pb-6 rounded-2xl cursor-pointer group transition-all duration-300 ${rotations[index]}`}
          >
            {/* Washi Tape on Top */}
            <div className={tapes[index]} />

            {/* Photo Container with object-fit: contain + blurred background */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-rose-50 border border-slate-100">
              <SmartImage
                src={item.url}
                alt={item.caption}
                aspectRatio="aspect-[4/5]"
                containerClassName="w-full h-full rounded-xl"
                className="w-full h-full"
                fallbackTitle={`Chetan #${item.id}`}
              />

              {/* View Overlay */}
              <div className="absolute inset-0 bg-rose-900/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 text-rose-600 flex items-center justify-center shadow-md">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Bottom Polaroid Caption: "Handsome", "My King", "Your Smile", "My Love" */}
            <div className="pt-4 text-center">
              <span className="font-script text-3xl sm:text-4xl text-rose-600 font-bold block drop-shadow-sm">
                {item.caption}
              </span>
              <span className="text-[11px] text-slate-400 font-medium tracking-wider uppercase block mt-0.5">
                Photo #{item.id} • Pooja's Favorite
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white p-4 pb-6 rounded-3xl shadow-2xl border border-rose-100"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 z-10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-rose-50 mb-4 border border-rose-100">
                <SmartImage
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  aspectRatio="aspect-[4/5]"
                  containerClassName="w-full h-full rounded-2xl"
                  className="w-full h-full"
                  fallbackTitle={selectedPhoto.caption}
                />
              </div>

              <div className="text-center">
                <h3 className="font-script text-4xl text-rose-600 font-bold">
                  {selectedPhoto.caption}
                </h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  Pooja's Handsome Husband Chetan
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Page Link */}
      <div className="mt-12">
        <Link
          to="/our-story"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-sm shadow-md hover:scale-105 active:scale-95 transition-all group"
        >
          <span>Next: Our Love Story</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
