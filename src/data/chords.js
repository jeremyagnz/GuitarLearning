/**
 * Guitar chord data.
 * Each chord has:
 *   name        – display name
 *   category    – 'Major' | 'Minor' | 'Seventh' | 'Extended'
 *   notes       – chord tones (e.g. ['C', 'E', 'G'])
 *   strings     – array of 6 numbers (low E → high e):
 *                  -1 = muted (X), 0 = open, 1–5 = fret number
 *   fingers     – fret positions for visual display [[string, fret], ...]
 *   barre       – optional { fret, from, to } for barre chords
 */
const CHORDS = [
  // ── Major ─────────────────────────────────────────────────────────────────
  {
    name: 'C',
    category: 'Major',
    notes: ['C', 'E', 'G'],
    strings: [-1, 3, 2, 0, 1, 0],
    fingers: [[1, 3], [2, 2], [4, 1]],
  },
  {
    name: 'D',
    category: 'Major',
    notes: ['D', 'F#', 'A'],
    strings: [-1, -1, 0, 2, 3, 2],
    fingers: [[3, 2], [4, 3], [5, 2]],
  },
  {
    name: 'E',
    category: 'Major',
    notes: ['E', 'G#', 'B'],
    strings: [0, 2, 2, 1, 0, 0],
    fingers: [[2, 2], [3, 2], [4, 1]],
  },
  {
    name: 'F',
    category: 'Major',
    notes: ['F', 'A', 'C'],
    strings: [1, 1, 2, 3, 3, 1],
    fingers: [[3, 2], [4, 3]],
    barre: { fret: 1, from: 1, to: 6 },
  },
  {
    name: 'G',
    category: 'Major',
    notes: ['G', 'B', 'D'],
    strings: [3, 2, 0, 0, 0, 3],
    fingers: [[1, 3], [2, 2], [6, 3]],
  },
  {
    name: 'A',
    category: 'Major',
    notes: ['A', 'C#', 'E'],
    strings: [-1, 0, 2, 2, 2, 0],
    fingers: [[3, 2], [4, 2], [5, 2]],
  },
  {
    name: 'B',
    category: 'Major',
    notes: ['B', 'D#', 'F#'],
    strings: [-1, 2, 4, 4, 4, 2],
    fingers: [[3, 4], [4, 4], [5, 4]],
    barre: { fret: 2, from: 1, to: 5 },
  },

  // ── Minor ─────────────────────────────────────────────────────────────────
  {
    name: 'Cm',
    category: 'Minor',
    notes: ['C', 'Eb', 'G'],
    strings: [-1, 3, 5, 5, 4, 3],
    fingers: [[3, 5], [4, 5], [5, 4]],
    barre: { fret: 3, from: 1, to: 5 },
  },
  {
    name: 'Dm',
    category: 'Minor',
    notes: ['D', 'F', 'A'],
    strings: [-1, -1, 0, 2, 3, 1],
    fingers: [[4, 2], [5, 3], [6, 1]],
  },
  {
    name: 'Em',
    category: 'Minor',
    notes: ['E', 'G', 'B'],
    strings: [0, 2, 2, 0, 0, 0],
    fingers: [[2, 2], [3, 2]],
  },
  {
    name: 'Fm',
    category: 'Minor',
    notes: ['F', 'Ab', 'C'],
    strings: [1, 3, 3, 1, 1, 1],
    fingers: [[3, 3], [4, 3]],
    barre: { fret: 1, from: 1, to: 6 },
  },
  {
    name: 'Gm',
    category: 'Minor',
    notes: ['G', 'Bb', 'D'],
    strings: [3, 5, 5, 3, 3, 3],
    fingers: [[3, 5], [4, 5]],
    barre: { fret: 3, from: 1, to: 6 },
  },
  {
    name: 'Am',
    category: 'Minor',
    notes: ['A', 'C', 'E'],
    strings: [-1, 0, 2, 2, 1, 0],
    fingers: [[3, 2], [4, 2], [5, 1]],
  },
  {
    name: 'Bm',
    category: 'Minor',
    notes: ['B', 'D', 'F#'],
    strings: [-1, 2, 4, 4, 3, 2],
    fingers: [[3, 4], [4, 4], [5, 3]],
    barre: { fret: 2, from: 1, to: 5 },
  },

  // ── Seventh ───────────────────────────────────────────────────────────────
  {
    name: 'C7',
    category: 'Seventh',
    notes: ['C', 'E', 'G', 'Bb'],
    strings: [-1, 3, 2, 3, 1, 0],
    fingers: [[1, 3], [2, 2], [3, 3], [4, 1]],
  },
  {
    name: 'D7',
    category: 'Seventh',
    notes: ['D', 'F#', 'A', 'C'],
    strings: [-1, -1, 0, 2, 1, 2],
    fingers: [[3, 2], [5, 1], [6, 2]],
  },
  {
    name: 'E7',
    category: 'Seventh',
    notes: ['E', 'G#', 'B', 'D'],
    strings: [0, 2, 0, 1, 0, 0],
    fingers: [[2, 2], [4, 1]],
  },
  {
    name: 'G7',
    category: 'Seventh',
    notes: ['G', 'B', 'D', 'F'],
    strings: [3, 2, 0, 0, 0, 1],
    fingers: [[1, 3], [2, 2], [6, 1]],
  },
  {
    name: 'A7',
    category: 'Seventh',
    notes: ['A', 'C#', 'E', 'G'],
    strings: [-1, 0, 2, 0, 2, 0],
    fingers: [[3, 2], [5, 2]],
  },

  // ── Extended ──────────────────────────────────────────────────────────────
  {
    name: 'Cmaj7',
    category: 'Extended',
    notes: ['C', 'E', 'G', 'B'],
    strings: [-1, 3, 2, 0, 0, 0],
    fingers: [[1, 3], [2, 2]],
  },
  {
    name: 'Cm7',
    category: 'Extended',
    notes: ['C', 'Eb', 'G', 'Bb'],
    strings: [-1, 3, 5, 3, 4, 3],
    fingers: [[3, 5], [5, 4]],
    barre: { fret: 3, from: 1, to: 5 },
  },
  {
    name: 'Csus4',
    category: 'Extended',
    notes: ['C', 'F', 'G'],
    strings: [-1, 3, 3, 0, 1, 3],
    fingers: [[1, 3], [2, 3], [4, 1], [6, 3]],
  },
];

export default CHORDS;

/** Helper: return chords filtered by category */
export const chordsByCategory = (category) =>
  CHORDS.filter((c) => c.category === category);

export const CATEGORIES = ['Major', 'Minor', 'Seventh', 'Extended'];
