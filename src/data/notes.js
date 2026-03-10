/**
 * Guitar fretboard note data.
 *
 * Standard tuning (low → high): E2  A2  D3  G3  B3  E4
 *
 * openFrequencies[i] = base frequency of string i (0 = low E, 5 = high e)
 * For fret n: freq = openFrequency * 2^(n/12)
 */

export const NOTE_NAMES = [
  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',
];

/** Index into NOTE_NAMES for each open string (low E → high e) */
const OPEN_NOTE_INDICES = [0, 5, 10, 3, 7, 0];

/** Base frequencies (Hz) for each open string (low E → high e) */
export const OPEN_FREQUENCIES = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];

/** String label shown in the UI (low E → high e) */
export const STRING_LABELS = ['E', 'A', 'D', 'G', 'B', 'e'];

/** Number of frets to display (fret 0 = open string) */
export const FRET_COUNT = 13; // 0..12

/**
 * Return the note name for a given string and fret.
 * @param {number} stringIndex  0 = low E, 5 = high e
 * @param {number} fret         0 = open, 1-12 = frets
 */
export const getFretNote = (stringIndex, fret) =>
  NOTE_NAMES[(OPEN_NOTE_INDICES[stringIndex] + fret) % 12];

/**
 * Return the frequency (Hz) for a given string and fret.
 */
export const getFretFrequency = (stringIndex, fret) =>
  OPEN_FREQUENCIES[stringIndex] * Math.pow(2, fret / 12);
