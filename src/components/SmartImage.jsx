import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function SmartImage({
  src,
  alt = "Celebration Photo",
  className = "",
  containerClassName = "",
  aspectRatio = "aspect-square",
  fallbackTitle = "Special Memory",
  onClick,
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden bg-rose-50/60 group ${containerClassName}`}
      onClick={onClick}
    >
      {/* Skeleton while loading */}
      {!isLoaded && !hasError && (
        <div className={`w-full h-full ${aspectRatio} flex items-center justify-center bg-rose-100/40 animate-pulse`}>
          <Sparkles className="w-5 h-5 text-amber-500/50 animate-spin" />
        </div>
      )}

      {hasError ? (
        /* Elegant pink romantic placeholder with heart icon */
        <div className={`w-full ${aspectRatio} flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 border border-pink-200/60`}>
          <div className="w-14 h-14 rounded-full bg-rose-100/90 border border-rose-300 flex items-center justify-center mb-2 shadow-sm">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-400 animate-pulse" />
          </div>
          <span className="font-serif text-xs font-semibold text-rose-800 tracking-wide">
            {fallbackTitle}
          </span>
          <span className="text-[10px] text-rose-400 mt-0.5">
            Chetan & Pooja ❤️
          </span>
        </div>
      ) : (
        <div className={`relative w-full h-full ${aspectRatio} flex items-center justify-center overflow-hidden`}>
          {/* Blurred ambient background behind image so full photo is 100% visible with NO awkward crop */}
          <img
            src={src}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-30 pointer-events-none transition-opacity duration-500 ${
              isLoaded ? 'opacity-30' : 'opacity-0'
            }`}
          />
          
          {/* Foreground photo: object-fit: contain (100% full photo visible, no leg/head cuts) */}
          <img
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`relative z-10 w-full h-full object-contain p-1 transition-transform duration-500 group-hover:scale-105 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
          />
        </div>
      )}
    </div>
  );
}
