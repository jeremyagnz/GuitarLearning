import { Platform } from 'react-native';

let audioContext = null;
let activeOscillators = [];

const getAudioContext = () => {
  if (Platform.OS !== 'web') return null;
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume context if suspended (browser autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
};

/**
 * Play a single note at the given frequency.
 * Uses a sawtooth oscillator through a low-pass filter to mimic a plucked
 * guitar string.  Falls back silently on non-web platforms.
 */
export const playNote = (frequency, duration = 1.5) => {
  if (Platform.OS !== 'web') return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sawtooth';
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(frequency * 6, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(
      frequency * 2,
      ctx.currentTime + duration * 0.4
    );

    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    activeOscillators.push(osc);
    osc.onended = () => {
      activeOscillators = activeOscillators.filter((n) => n !== osc);
    };

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio unavailable – fail silently
  }
};

/**
 * Immediately stop all currently playing notes.
 * Useful for implementing a pause/stop feature in song playback.
 */
export const stopAllNotes = () => {
  if (Platform.OS !== 'web') return;
  activeOscillators.forEach((osc) => {
    try {
      osc.stop();
    } catch {
      // Already stopped – ignore
    }
  });
  activeOscillators = [];
};

/**
 * Play multiple notes as an arpeggiated chord strum.
 * @param {number[]} frequencies - array of frequencies (low → high)
 * @param {number}   strumDelay  - milliseconds between each note
 */
export const playChord = (frequencies, strumDelay = 55) => {
  if (Platform.OS !== 'web') return;
  frequencies.forEach((freq, i) => {
    setTimeout(() => playNote(freq, 2.2), i * strumDelay);
  });
};
