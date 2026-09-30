// Web Audio API Sound Effects & Synthesized Melodies
// No external mp3 dependencies needed, instant zero-latency playback

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Balloon Pop Sound
export function playPopSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Pop oscillator (pitch sweep down)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.08);

    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);

    // Pop noise snap
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.01));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.6, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
  } catch (e) {
    console.warn("Audio pop error:", e);
  }
}

// 2. Candle Blow Sound (Gentle wind breath)
export function playBlowSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const duration = 0.8;

    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(700, now);
    filter.frequency.linearRampToValueAtTime(300, now + duration);
    filter.Q.value = 1.8;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
  } catch (e) {
    console.warn("Audio blow error:", e);
  }
}

// 3. Knife Slicing / Cake Cut Chime
export function playCakeCutSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Sweet chime chord
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.25, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.9);
    });
  } catch (e) {
    console.warn("Audio cake cut error:", e);
  }
}

// 4. Happy Birthday Melody synthesizer
let currentMelodyTimeout = null;
export function playHappyBirthdayTune(onComplete) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    // Stop any previously playing tune
    if (currentMelodyTimeout) {
      clearTimeout(currentMelodyTimeout);
      currentMelodyTimeout = null;
    }

    // Happy Birthday notes and durations (in quarter beats, 120 bpm -> 1 beat = 0.5s)
    // Notes: C4, D4, E4, F4, G4, A4, Bb4, B4, C5
    const N = {
      C4: 261.63,
      D4: 293.66,
      E4: 329.63,
      F4: 349.23,
      G4: 392.00,
      A4: 440.00,
      Bb4: 466.16,
      B4: 493.88,
      C5: 523.25,
      D5: 587.33,
      E5: 659.25,
      F5: 698.46,
      G5: 783.99,
      A5: 880.00,
    };

    const song = [
      // Hap-py Birth-day to you
      { note: N.C4, dur: 0.35, delay: 0.4 },
      { note: N.C4, dur: 0.15, delay: 0.2 },
      { note: N.D4, dur: 0.5, delay: 0.6 },
      { note: N.C4, dur: 0.5, delay: 0.6 },
      { note: N.F4, dur: 0.5, delay: 0.6 },
      { note: N.E4, dur: 0.9, delay: 1.0 },

      // Hap-py Birth-day to you
      { note: N.C4, dur: 0.35, delay: 0.4 },
      { note: N.C4, dur: 0.15, delay: 0.2 },
      { note: N.D4, dur: 0.5, delay: 0.6 },
      { note: N.C4, dur: 0.5, delay: 0.6 },
      { note: N.G4, dur: 0.5, delay: 0.6 },
      { note: N.F4, dur: 0.9, delay: 1.0 },

      // Hap-py Birth-day dear Che-than
      { note: N.C4, dur: 0.35, delay: 0.4 },
      { note: N.C4, dur: 0.15, delay: 0.2 },
      { note: N.C5, dur: 0.6, delay: 0.6 },
      { note: N.A4, dur: 0.6, delay: 0.6 },
      { note: N.F4, dur: 0.5, delay: 0.6 },
      { note: N.E4, dur: 0.5, delay: 0.6 },
      { note: N.D4, dur: 0.8, delay: 0.9 },

      // Hap-py Birth-day to you
      { note: N.Bb4, dur: 0.35, delay: 0.4 },
      { note: N.Bb4, dur: 0.15, delay: 0.2 },
      { note: N.A4, dur: 0.6, delay: 0.6 },
      { note: N.F4, dur: 0.6, delay: 0.6 },
      { note: N.G4, dur: 0.6, delay: 0.6 },
      { note: N.F4, dur: 1.2, delay: 1.3 },
    ];

    let t = ctx.currentTime + 0.05;
    song.forEach((item) => {
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc2.type = 'sine';
      osc.frequency.setValueAtTime(item.note, t);
      osc2.frequency.setValueAtTime(item.note * 2, t);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + item.dur);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc2.start(t);
      osc.stop(t + item.dur);
      osc2.stop(t + item.dur);

      t += item.delay;
    });

    const totalDuration = (t - ctx.currentTime) * 1000;
    if (onComplete) {
      currentMelodyTimeout = setTimeout(onComplete, totalDuration);
    }
  } catch (e) {
    console.warn("Audio birthday tune error:", e);
  }
}

// 5. Romantic Chime / Sparkle
export function playSparkleSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [659.25, 880, 987.77, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.18, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.6);
    });
  } catch (e) {
    console.warn("Audio sparkle error:", e);
  }
}

// 6. Celebration Fanfare
export function playCelebrationSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const chord = [392.00, 523.25, 659.25, 783.99, 1046.50];
    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.25, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 1.2);
    });
  } catch (e) {
    console.warn("Celebration sound error:", e);
  }
}

// 7. Background Romantic Music Generator (Infinite soft acoustic chime loop)
let bgMusicInterval = null;
let isBgMusicPlaying = false;

export function toggleBackgroundMusic(callback) {
  if (isBgMusicPlaying) {
    stopBackgroundMusic();
    if (callback) callback(false);
    return false;
  } else {
    startBackgroundMusic();
    if (callback) callback(true);
    return true;
  }
}

export function startBackgroundMusic() {
  if (isBgMusicPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  isBgMusicPlaying = true;

  // Gentle romantic arpeggios in E-flat major / C-minor
  const chords = [
    [261.63, 329.63, 392.00, 523.25], // C major
    [220.00, 261.63, 329.63, 440.00], // A minor
    [174.61, 220.00, 261.63, 349.23], // F major
    [196.00, 246.94, 293.66, 392.00], // G major
  ];

  let chordIndex = 0;
  function playChordLoop() {
    if (!isBgMusicPlaying) return;
    const currentChord = chords[chordIndex % chords.length];
    chordIndex++;

    currentChord.forEach((freq, noteIdx) => {
      const t = ctx.currentTime + noteIdx * 0.35;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.07, t);
      gain.gain.exponentialRampToValueAtTime(0.0005, t + 1.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 1.6);
    });
  }

  playChordLoop();
  bgMusicInterval = setInterval(playChordLoop, 1600);
}

export function stopBackgroundMusic() {
  isBgMusicPlaying = false;
  if (bgMusicInterval) {
    clearInterval(bgMusicInterval);
    bgMusicInterval = null;
  }
}

export function getBgMusicStatus() {
  return isBgMusicPlaying;
}
