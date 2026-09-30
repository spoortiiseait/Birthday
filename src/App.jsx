import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import FloatingPetalsBackground from './components/FloatingPetalsBackground';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import CakePage from './pages/CakePage';
import ChethansBestPage from './pages/ChethansBestPage';
import OurLoveStoryPage from './pages/OurLoveStoryPage';
import CollageWallPage from './pages/CollageWallPage';
import LoveLetterPage from './pages/LoveLetterPage';
import FinalSurprisePage from './pages/FinalSurprisePage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen bg-gradient-to-br from-[#FFF7ED] via-[#FFE4E6]/50 to-[#E9D5FF]/40 text-slate-800 overflow-x-hidden selection:bg-rose-200 selection:text-rose-800 flex flex-col justify-between">
        
        {/* Floating Petals and Pastel Ambient Lights (NO BLACK) */}
        <FloatingPetalsBackground />

        {/* Multi-Page Navigation Bar */}
        <Navbar
          isMusicPlaying={isMusicPlaying}
          setIsMusicPlaying={setIsMusicPlaying}
        />

        {/* Main Multi-Page Route Outlet */}
        <main className="relative z-10 flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cake" element={<CakePage />} />
            <Route path="/chetans-best" element={<ChethansBestPage />} />
            <Route path="/chethans-best" element={<ChethansBestPage />} />
            <Route path="/our-story" element={<OurLoveStoryPage />} />
            <Route path="/collage" element={<CollageWallPage />} />
            <Route path="/letter" element={<LoveLetterPage />} />
            <Route path="/surprise" element={<FinalSurprisePage />} />
            {/* Catch-all redirect to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
