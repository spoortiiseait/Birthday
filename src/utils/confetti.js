import confetti from 'canvas-confetti';

// Golden & Blush color palettes
const LUXURY_GOLD = ['#FFD700', '#FFA500', '#FCE205', '#F5D061', '#E6C280'];
const ROMANTIC_BLUSH = ['#FF4081', '#FF80AB', '#F50057', '#FF1744', '#FFB6C1', '#FF69B4'];
const MIXED_CELEBRATION = [...LUXURY_GOLD, ...ROMANTIC_BLUSH, '#FFFFFF'];

// Single pop burst
export function triggerPopConfetti(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 35,
    spread: 60,
    origin: { x, y },
    colors: MIXED_CELEBRATION,
    ticks: 150,
    gravity: 0.9,
    scalar: 0.9,
    shapes: ['circle', 'square'],
  });
}

// Heart shape confetti burst
export function triggerHeartConfetti(x = 0.5, y = 0.5) {
  try {
    const heart = confetti.shapeFromPath({
      path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
    });
    confetti({
      shapes: [heart, 'circle'],
      particleCount: 40,
      spread: 70,
      origin: { x, y },
      colors: ROMANTIC_BLUSH,
      scalar: 1.3,
      gravity: 0.7,
    });
  } catch (e) {
    triggerPopConfetti(x, y);
  }
}

// Gold star / glitter sparkle burst
export function triggerGoldSparkles(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 50,
    spread: 80,
    origin: { x, y },
    colors: LUXURY_GOLD,
    ticks: 180,
    gravity: 0.8,
    scalar: 1.1,
  });
}

// Multi-cannon celebration
export function triggerCelebrationCannons() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti(Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    }));
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: LUXURY_GOLD
  });
  fire(0.2, {
    spread: 60,
    colors: ROMANTIC_BLUSH
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: MIXED_CELEBRATION
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#FFF', '#FFD700']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ROMANTIC_BLUSH
  });
}

// 5-Second Confetti Rain for Final Gift Box
export function triggerFiveSecondConfettiRain(durationMs = 5000) {
  const animationEnd = Date.now() + durationMs;
  const colors = MIXED_CELEBRATION;

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / durationMs);

    // Left edge
    confetti({
      particleCount: Math.floor(particleCount),
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: colors,
      gravity: 0.9,
    });
    // Right edge
    confetti({
      particleCount: Math.floor(particleCount),
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: colors,
      gravity: 0.9,
    });
    // Center sky
    confetti({
      particleCount: Math.floor(particleCount * 0.7),
      angle: 90,
      spread: 90,
      origin: { x: 0.5, y: 0.1 },
      colors: colors,
      gravity: 0.6,
      scalar: 1.1,
    });
  }, 220);

  return () => clearInterval(interval);
}
