import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, X, Maximize2 } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import SmartImage from '../components/SmartImage';
import { triggerHeartConfetti } from '../utils/confetti';

export default function OurLoveStoryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const { ourLoveStory, photos } = BIRTHDAY_CONFIG;

  const handleOpenPhoto = (item) => {
    setSelectedPhoto(item);
    triggerHeartConfetti(0.5, 0.5);
  };

  // Render individual mixed frames in pink romantic theme
  const renderFramedPhoto = (item, index) => {
    switch (item.frameStyle) {
      // 1. Golden Vintage Frame
      case 'vintage-gold':
        return (
          <div className="p-3 bg-gradient-to-tr from-amber-300 via-yellow-100 to-amber-400 rounded-2xl shadow-romantic-pink border-2 border-amber-300">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-white border border-amber-300/80">
              <SmartImage
                src={item.url}
                alt={item.caption}
                aspectRatio="aspect-[4/5]"
                containerClassName="w-full h-full rounded-xl"
                className="w-full h-full"
                fallbackTitle={item.caption}
              />
              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-white/95 text-[10px] font-bold text-amber-800 shadow-sm uppercase tracking-wider">
                Vintage Gold
              </div>
            </div>
          </div>
        );

      // 2. Heart-Shaped Frame
      case 'heart':
        return (
          <div className="p-4 bg-gradient-to-br from-rose-200 via-pink-100 to-rose-300 rounded-3xl shadow-romantic-pink border-2 border-rose-300 relative">
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-rose-500">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div className="relative aspect-square rounded-full overflow-hidden bg-rose-50 border-4 border-white shadow-inner p-1">
              <SmartImage
                src={item.url}
                alt={item.caption}
                aspectRatio="aspect-square"
                containerClassName="w-full h-full rounded-full"
                className="w-full h-full rounded-full"
                fallbackTitle={item.caption}
              />
            </div>
          </div>
        );

      // 3. Filmstrip Frame (Pink Theme)
      case 'filmstrip':
        return (
          <div className="filmstrip-border-pink rounded-xl shadow-romantic-pink">
            <div className="relative aspect-[4/3] rounded overflow-hidden bg-black">
              <SmartImage
                src={item.url}
                alt={item.caption}
                aspectRatio="aspect-[4/3]"
                containerClassName="w-full h-full rounded"
                className="w-full h-full"
                fallbackTitle={item.caption}
              />
              <div className="absolute bottom-1 right-2 text-[9px] text-amber-300 font-mono">
                MEMORIES • 0{item.id}
              </div>
            </div>
          </div>
        );

      // 4. Polaroid White Style (Default)
      case 'polaroid':
      default:
        return (
          <div className="polaroid-white-card p-3.5 pb-5 rounded-2xl relative">
            <div className="polaroid-tape-tilted-right" />
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-rose-50 mb-2 border border-slate-100">
              <SmartImage
                src={item.url}
                alt={item.caption}
                aspectRatio="aspect-[4/5]"
                containerClassName="w-full h-full rounded-xl"
                className="w-full h-full"
                fallbackTitle={item.caption}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] px-4 py-12 max-w-6xl mx-auto">
      
      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-rose-500 font-bold flex items-center justify-center gap-1.5 mb-2">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          Together As One
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-slate-800 tracking-tight">
          Our Love Story
        </h1>
        <p className="font-serif text-sm sm:text-base text-rose-600 mt-2 italic">
          Cherished couple moments in timeless frames
        </p>
      </div>

      {/* MASONRY-STYLE GRID FOR 5.jpg TO 10.jpg (Mixed Frames) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start mb-20">
        {ourLoveStory.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            onClick={() => handleOpenPhoto(item)}
            className="cursor-pointer group flex flex-col"
          >
            {/* The Framed Photo */}
            {renderFramedPhoto(item, index)}

            {/* Simple Romantic Captions */}
            <div className="mt-3 text-center">
              <span className="font-script text-3xl sm:text-4xl text-rose-600 font-bold block drop-shadow-sm group-hover:text-rose-700 transition-colors">
                {item.caption}
              </span>
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">
                Chethan & Pooja ❤️
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SECTION: "Our Collage of Love" - HEART-SHAPE COLLAGE USING ALL 10 PHOTOS */}
      <div className="mt-16 pt-12 border-t border-rose-200 text-center">
        
        <div className="mb-10">
          <span className="text-xs uppercase tracking-widest text-amber-600 font-bold flex items-center justify-center gap-1.5 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Special Visual Keepsake
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800">
            Our Collage of Love
          </h2>
          <p className="font-serif text-xs sm:text-sm text-rose-500 italic mt-1">
            All 10 memories interwoven into one big heart
          </p>
        </div>

        {/* Heart Silhouette Layout with all 10 photos */}
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-3 py-6 px-2">
          
          {/* Heart Row 1 (Top Lobes: 2 tiles) */}
          <div className="flex items-center justify-center gap-10 sm:gap-16">
            {[photos[0], photos[1]].map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.15, zIndex: 30 }}
                onClick={() => handleOpenPhoto(p)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-md border-2 border-rose-300 bg-white cursor-pointer relative group"
              >
                <SmartImage
                  src={p.url}
                  alt={p.caption}
                  aspectRatio="aspect-square"
                  containerClassName="w-full h-full"
                  className="w-full h-full"
                  fallbackTitle={`#${p.id}`}
                />
                <div className="absolute inset-0 bg-rose-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-white text-white" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Heart Row 2 (Widest curve: 4 tiles) */}
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {[photos[2], photos[4], photos[5], photos[3]].map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.15, zIndex: 30 }}
                onClick={() => handleOpenPhoto(p)}
                className="w-16 h-16 sm:w-22 sm:h-22 rounded-2xl overflow-hidden shadow-md border-2 border-rose-300 bg-white cursor-pointer relative group"
              >
                <SmartImage
                  src={p.url}
                  alt={p.caption}
                  aspectRatio="aspect-square"
                  containerClassName="w-full h-full"
                  className="w-full h-full"
                  fallbackTitle={`#${p.id}`}
                />
                <div className="absolute inset-0 bg-rose-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-white text-white" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Heart Row 3 (Tapering middle: 3 tiles) */}
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            {[photos[6], photos[7], photos[8]].map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.15, zIndex: 30 }}
                onClick={() => handleOpenPhoto(p)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-md border-2 border-rose-300 bg-white cursor-pointer relative group"
              >
                <SmartImage
                  src={p.url}
                  alt={p.caption}
                  aspectRatio="aspect-square"
                  containerClassName="w-full h-full"
                  className="w-full h-full"
                  fallbackTitle={`#${p.id}`}
                />
                <div className="absolute inset-0 bg-rose-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-white text-white" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Heart Row 4 (Heart bottom point: 1 tile) */}
          <div className="flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.15, zIndex: 30 }}
              onClick={() => handleOpenPhoto(photos[9])}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-amber-400 bg-white cursor-pointer relative group"
            >
              <SmartImage
                src={photos[9].url}
                alt={photos[9].caption}
                aspectRatio="aspect-square"
                containerClassName="w-full h-full"
                className="w-full h-full"
                fallbackTitle={`#10`}
              />
              <div className="absolute inset-0 bg-rose-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Heart className="w-4 h-4 fill-white text-white" />
              </div>
            </motion.div>
          </div>

        </div>

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
                  Chethan & Pooja • Forever Love
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Page Link */}
      <div className="mt-14 text-center">
        <Link
          to="/collage"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-sm shadow-md hover:scale-105 active:scale-95 transition-all group"
        >
          <span>Next: Collage Wall</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
