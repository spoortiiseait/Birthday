import React, { useMemo } from 'react';

export default function FloatingPetalsBackground() {
  const petals = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.2) % 100}%`,
      delay: (i * 0.4) % 6,
      duration: 7 + (i % 5) * 1.5,
      size: 14 + (i % 4) * 5,
      rotate: (i * 35) % 360,
      isHeart: i % 2 === 0,
      opacity: 0.35 + (i % 3) * 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br from-[#FFF7ED] via-[#FFE4E6]/50 to-[#E9D5FF]/40">
      {/* Soft pastel ambient glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#FFE4E6]/80 blur-[100px]" />
      <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-[#E9D5FF]/70 blur-[120px]" />
      <div className="absolute bottom-10 left-1/4 w-[28rem] h-[28rem] rounded-full bg-[#FFDAB9]/60 blur-[110px]" />

      {/* Floating Petals and Hearts */}
      {petals.map((item) => (
        <div
          key={item.id}
          className="absolute select-none pointer-events-none petal-floating"
          style={{
            left: item.left,
            bottom: '-20px',
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            opacity: item.opacity,
          }}
        >
          {item.isHeart ? (
            <svg
              className="text-rose-400 drop-shadow-sm"
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              className="text-pink-300/80 drop-shadow-sm"
              width={item.size}
              height={item.size * 1.3}
              viewBox="0 0 20 28"
              fill="currentColor"
            >
              <path d="M10 0 C4 6, 0 14, 0 20 C0 25, 4 28, 10 28 C16 28, 20 25, 20 20 C20 14, 16 6, 10 0 Z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
