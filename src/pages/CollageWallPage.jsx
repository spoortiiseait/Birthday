import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Sparkles, Heart, ArrowRight, Camera, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import { BIRTHDAY_CONFIG } from '../config';
import SmartImage from '../components/SmartImage';
import { triggerCelebrationCannons } from '../utils/confetti';

export default function CollageWallPage() {
  const wallRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Handwritten cursive stickers (NO anniversary or 1 year text!)
  const stickText1 = "You & Me";
  const stickText2 = "Love";

  // Individual rotations & pin styles for each of the 10 photos
  const polaroidStyles = [
    { rotate: '-rotate-3', pin: 'pin', tape: null },
    { rotate: 'rotate-2', pin: null, tape: 'polaroid-tape-tilted-left' },
    { rotate: '-rotate-2', pin: 'pin', tape: null },
    { rotate: 'rotate-3', pin: null, tape: 'polaroid-tape-tilted-right' },
    { rotate: '-rotate-1', pin: 'pin', tape: null },
    { rotate: 'rotate-2', pin: null, tape: 'polaroid-tape' },
    { rotate: '-rotate-3', pin: 'pin', tape: null },
    { rotate: 'rotate-1', pin: null, tape: 'polaroid-tape-tilted-left' },
    { rotate: '-rotate-2', pin: 'pin', tape: null },
    { rotate: 'rotate-3', pin: null, tape: 'polaroid-tape-tilted-right' },
  ];

  const handleDownloadCollage = async () => {
    if (!wallRef.current || isDownloading) return;
    setIsDownloading(true);
    setDownloadSuccess(false);

    try {
      const canvas = await html2canvas(wallRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: '#FFF1F2',
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'Chetan-and-Pooja-Collage-Wall.png';
      link.href = dataUrl;
      link.click();

      setIsDownloading(false);
      setDownloadSuccess(true);
      triggerCelebrationCannons();

      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error("Collage download error:", err);
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] px-4 py-12 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-rose-500 font-bold flex items-center justify-center gap-1.5 mb-2">
          <Camera className="w-3.5 h-3.5 text-amber-500" />
          Interactive Keepsake
          <Camera className="w-3.5 h-3.5 text-amber-500" />
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-slate-800 tracking-tight">
          Collage Wall
        </h1>
        <p className="font-serif text-sm sm:text-base text-rose-600 mt-2 italic">
          Every special memory pinned together with love
        </p>

        {/* Download Button */}
        <div className="mt-6 flex items-center justify-center">
          <button
            onClick={handleDownloadCollage}
            disabled={isDownloading}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-800" />
                <span>Downloaded Successfully! 🎉</span>
              </>
            ) : isDownloading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Creating Your Collage Image...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Our Collage 📸</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* THE MEMORIES WALL (Pink Watercolor Background Target for html2canvas) */}
      <div
        ref={wallRef}
        className="relative rounded-3xl p-6 sm:p-12 shadow-romantic-pink border-2 border-rose-200/90 bg-gradient-to-br from-[#FFF1F2] via-[#FAF5FF] to-[#FFF8F1] overflow-hidden"
      >
        {/* Watercolor ambient glows */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-purple-200/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-amber-200/40 blur-3xl pointer-events-none" />

        {/* Wall Title Plaque */}
        <div className="text-center mb-10 relative z-10">
          <div className="inline-block px-6 py-2 rounded-2xl bg-white/95 shadow-sm border border-rose-200">
            <span className="font-serif text-lg sm:text-xl font-bold text-slate-800">
              Chetan & Pooja • Forever Memories
            </span>
          </div>
        </div>

        {/* Scattered 10 Photos Grid with Real Polaroid Pin & Tape Effects */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10 items-center justify-items-center">
          
          {BIRTHDAY_CONFIG.photos.map((photo, index) => {
            const style = polaroidStyles[index];

            return (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                transition={{ duration: 0.25 }}
                className={`relative polaroid-white-card p-3 pb-5 rounded-2xl w-full max-w-[220px] transition-transform ${style.rotate}`}
              >
                {/* Push Pin or Washi Tape */}
                {style.pin === 'pin' && <div className="push-pin" />}
                {style.tape && <div className={style.tape} />}

                {/* Photo with contain and blurred background */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-rose-50 mb-2 border border-slate-100">
                  <SmartImage
                    src={photo.url}
                    alt={photo.caption}
                    aspectRatio="aspect-square"
                    containerClassName="w-full h-full rounded-xl"
                    className="w-full h-full"
                    fallbackTitle={`#${photo.id}`}
                  />
                </div>

                {/* Handwritten Polar Caption */}
                <div className="text-center">
                  <span className="font-script text-2xl sm:text-3xl text-rose-600 font-bold leading-tight block">
                    {photo.caption}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono tracking-wider">
                    #{photo.id}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* Handwritten Cursive Text Stickers Between Photos */}
          
          {/* Sticker 1: "You & Me" */}
          <div className="col-span-1 flex items-center justify-center p-4">
            <div className="p-4 rounded-2xl bg-gradient-to-tr from-pink-100 to-rose-200 shadow-sm border border-pink-300/70 rotate-6 select-none">
              <span className="font-script text-4xl sm:text-5xl text-rose-700 font-bold block drop-shadow-sm">
                "{stickText1}"
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-rose-500 text-center block mt-1">
                Always & Forever ❤️
              </span>
            </div>
          </div>

          {/* Sticker 2: "Love" */}
          <div className="col-span-1 flex items-center justify-center p-4">
            <div className="p-4 rounded-2xl bg-gradient-to-tr from-amber-100 to-yellow-200 shadow-sm border border-amber-300/80 -rotate-6 select-none">
              <span className="font-script text-4xl sm:text-5xl text-amber-800 font-bold block drop-shadow-sm">
                "{stickText2}"
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 text-center block mt-1">
                With All My Heart ✨
              </span>
            </div>
          </div>

        </div>

        {/* Sweet Birthday Banner at Bottom of Wall */}
        <div className="mt-8 text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/95 shadow-sm border border-rose-200">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
            <span className="font-script text-3xl sm:text-4xl text-rose-600 font-bold">
              Happy Birthday My Everything
            </span>
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
          </div>
        </div>

      </div>

      {/* Next Page Link */}
      <div className="mt-12 text-center">
        <Link
          to="/letter"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-sm shadow-md hover:scale-105 active:scale-95 transition-all group"
        >
          <span>Next: Love Letter from Pooja</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
