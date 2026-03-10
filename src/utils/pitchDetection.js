/**
 * Pitch detection utilities using autocorrelation.
 * Works with the Web Audio API AnalyserNode.
 */

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * Convert a frequency (Hz) to a note name and cents deviation.
 * Returns null if frequency is invalid.
 */
export const frequencyToNote = (frequency) => {
  if (!frequency || frequency <= 0) return null;
  // A4 = 440 Hz = MIDI note 69
  const noteNum = 12 * Math.log2(frequency / 440) + 69;
  const rounded = Math.round(noteNum);
  const note = NOTE_NAMES[((rounded % 12) + 12) % 12];
  const cents = Math.round((noteNum - rounded) * 100);
  return { note, cents, frequency: Math.round(frequency) };
};

/**
 * Autocorrelation-based pitch detector.
 * @param {Float32Array} buf   Time-domain audio buffer
 * @param {number}       sampleRate
 * @returns {number}  Detected fundamental frequency in Hz, or -1 if no pitch found
 */
export const autoCorrelate = (buf, sampleRate) => {
  const SIZE = buf.length;

  // Check RMS – reject silence
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1;

  // Trim leading / trailing silence to reduce noise
  let start = 0;
  let end = SIZE - 1;
  const TRIM_THRESHOLD = 0.2;
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buf[i]) >= TRIM_THRESHOLD) { start = i; break; }
  }
  for (let i = SIZE - 1; i >= SIZE / 2; i--) {
    if (Math.abs(buf[i]) >= TRIM_THRESHOLD) { end = i; break; }
  }

  const slice = buf.slice(start, end + 1);
  const len = slice.length;
  if (len < 2) return -1;

  // Compute autocorrelation
  const c = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i; j++) {
      c[i] += slice[j] * slice[j + i];
    }
  }

  // Find the first valley (dip) in the autocorrelation
  let d = 0;
  while (d < len - 1 && c[d] > c[d + 1]) d++;

  // Find the highest peak after the dip
  let maxVal = -Infinity;
  let maxPos = d;
  for (let i = d; i < len; i++) {
    if (c[i] > maxVal) { maxVal = c[i]; maxPos = i; }
  }

  if (maxPos === 0) return -1;

  // Parabolic interpolation for sub-sample accuracy
  let T0 = maxPos;
  if (maxPos > 0 && maxPos < len - 1) {
    const x1 = c[maxPos - 1];
    const x2 = c[maxPos];
    const x3 = c[maxPos + 1];
    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    if (a !== 0) T0 = maxPos - b / (2 * a);
  }

  const freq = sampleRate / T0;

  // Guitar fundamental range: ~75 Hz (low D) – ~1200 Hz (high frets)
  if (freq < 70 || freq > 1300) return -1;

  return freq;
};
