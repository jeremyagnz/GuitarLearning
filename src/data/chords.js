/**
 * Guitar chord data.
 * Each chord has:
 *   name        – display name
 *   strings     – array of 6 numbers (low E → high e):
 *                  -1 = muted (X), 0 = open, 1–5 = fret number
 *   fingers     – fret positions for visual display [[string, fret], ...]
 *   barre       – optional { fret, from, to } for barre chords
 */
const CHORDS = [
  {
    name: 'C',
    strings: [-1, 3, 2, 0, 1, 0],
    fingers: [
      [1, 3],
      [2, 2],
      [4, 1],
    ],
  },
  {
    name: 'D',
    strings: [-1, -1, 0, 2, 3, 2],
    fingers: [
      [3, 2],
      [4, 3],
      [5, 2],
    ],
  },
  {
    name: 'Em',
    strings: [0, 2, 2, 0, 0, 0],
    fingers: [
      [2, 2],
      [3, 2],
    ],
  },
  {
    name: 'G',
    strings: [3, 2, 0, 0, 0, 3],
    fingers: [
      [1, 3],
      [2, 2],
      [6, 3],
    ],
  },
  {
    name: 'Am',
    strings: [-1, 0, 2, 2, 1, 0],
    fingers: [
      [3, 2],
      [4, 2],
      [5, 1],
    ],
  },
  {
    name: 'F',
    strings: [1, 1, 2, 3, 3, 1],
    fingers: [
      [3, 2],
      [4, 3],
    ],
    barre: { fret: 1, from: 1, to: 6 },
  },
  {
    name: 'A',
    strings: [-1, 0, 2, 2, 2, 0],
    fingers: [
      [3, 2],
      [4, 2],
      [5, 2],
    ],
  },
  {
    name: 'E',
    strings: [0, 2, 2, 1, 0, 0],
    fingers: [
      [2, 2],
      [3, 2],
      [4, 1],
    ],
  },
  {
    name: 'Dm',
    strings: [-1, -1, 0, 2, 3, 1],
    fingers: [
      [4, 2],
      [5, 3],
      [6, 1],
    ],
  },
  {
    name: 'Bm',
    strings: [-1, 2, 4, 4, 3, 2],
    fingers: [
      [3, 4],
      [4, 4],
      [5, 3],
    ],
    barre: { fret: 2, from: 1, to: 5 },
  },
];

export default CHORDS;
