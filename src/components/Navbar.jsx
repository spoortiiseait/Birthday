import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Volume2, VolumeX, Heart, Sparkles, Menu, X } from 'lucide-react';
import { toggleBackgroundMusic } from '../utils/audio';

export default function Navbar({ isMusicPlaying, setIsMusicPlaying }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMusicToggle = () => {
    const newState = toggleBackgroundMusic((active) => {
      setIsMusicPlaying(active);
    });
    setIsMusicPlaying(newState);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Cake", path: "/cake" },
    { label: "Chetan's Best", path: "/chetans-best" },
    { label: "Our Love Story", path: "/our-story" },
    { label: "Collage Wall", path: "/collage" },
    { label: "Love Letter", path: "/letter" },
    { label: "Final Surprise", path: "/surprise" },
  ];

  return (
    <nav className="sticky top-0 z-50 px-4 py-3 bg-white/85 backdrop-blur-md border-b border-rose-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 p-[1.5px] shadow-sm">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="font-serif text-sm font-bold text-rose-600 group-hover:scale-110 transition-transform">
                C&P
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm md:text-base font-bold text-slate-800 tracking-wide">
              Chetan & Pooja
            </span>
            <span className="text-[10px] text-rose-500 flex items-center gap-1 font-medium tracking-wider uppercase">
              Birthday Edition <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500 inline" />
            </span>
          </div>
        </NavLink>

        {/* Desktop Nav Links */}
        <div className="hidden xl:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-[0_2px_10px_rgba(244,63,94,0.3)]'
                    : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50/80'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Medium Screen Nav Links */}
        <div className="hidden lg:flex xl:hidden items-center gap-1">
          {navLinks.slice(0, 5).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/surprise"
            className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 hover:bg-amber-200"
          >
            Surprise 🎁
          </NavLink>
        </div>

        {/* Right Controls: Music Toggle & Mobile Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Music Toggle */}
          <button
            onClick={handleMusicToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
              isMusicPlaying
                ? 'bg-rose-50 text-rose-600 border-rose-300 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:border-rose-300'
            }`}
            title={isMusicPlaying ? "Mute Music" : "Play Romantic Music"}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-rose-500 animate-pulse" />
                <span className="hidden sm:inline">Music ON</span>
                <div className="flex items-end gap-0.5 h-3 ml-0.5">
                  <span className="w-0.5 h-3 bg-rose-500 animate-pulse" />
                  <span className="w-0.5 h-2 bg-rose-500 animate-ping" />
                  <span className="w-0.5 h-3 bg-rose-500 animate-pulse" />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline">Music</span>
              </>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200/80 hover:bg-rose-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden pt-3 pb-2 px-2 border-t border-rose-100 mt-2 grid grid-cols-2 gap-1.5">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-xl text-xs font-semibold text-center transition-colors ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'bg-rose-50/60 text-slate-700 hover:bg-rose-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
